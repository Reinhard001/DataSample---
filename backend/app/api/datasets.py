"""
Datasets API Endpoints
Handles dataset management
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Dataset, Experiment, AccuracyResult
from app.schemas.schemas import DatasetResponse

router = APIRouter()

@router.get("/", response_model=List[DatasetResponse])
async def get_datasets(db: Session = Depends(get_db)):
    """
    Get all datasets
    """
    try:
        datasets = db.query(Dataset).all()
        return datasets
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving datasets: {str(e)}")


@router.get("/{dataset_id}", response_model=DatasetResponse)
async def get_dataset(dataset_id: int, db: Session = Depends(get_db)):
    """
    Get specific dataset by ID
    """
    try:
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")
        
        return dataset
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving dataset: {str(e)}")


@router.get("/{dataset_id}/experiments")
async def get_dataset_experiments(dataset_id: int, db: Session = Depends(get_db)):
    """
    Get all experiments for a specific dataset
    """
    try:
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")
        
        experiments = db.query(Experiment).filter(Experiment.dataset_id == dataset_id).all()
        
        result = []
        for exp in experiments:
            exp_data = {
                "id": exp.id,
                "method_id": exp.method_id,
                "method_name": exp.sampling_method.method_name,
                "sample_fraction": exp.sample_fraction,
                "execution_time": exp.execution_time,
                "memory_usage": exp.memory_usage,
                "cpu_usage": exp.cpu_usage,
                "scalability_score": exp.scalability_score,
                "sample_size": exp.sample_size,
                "experiment_date": exp.experiment_date
            }
            
            if exp.accuracy_results:
                accuracy = exp.accuracy_results[0]
                exp_data["accuracy_results"] = {
                    "original_mean": accuracy.original_mean,
                    "sample_mean": accuracy.sample_mean,
                    "error_margin": accuracy.error_margin,
                    "accuracy_percentage": accuracy.accuracy_percentage,
                    "f1_score": accuracy.f1_score,
                    "precision": accuracy.precision,
                    "recall": accuracy.recall
                }
            
            result.append(exp_data)
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving experiments: {str(e)}")


@router.delete("/{dataset_id}")
async def delete_dataset(dataset_id: int, db: Session = Depends(get_db)):
    """
    Delete a dataset and its associated experiments
    """
    try:
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")
        
        # Delete associated accuracy results
        experiments = db.query(Experiment).filter(Experiment.dataset_id == dataset_id).all()
        for exp in experiments:
            db.query(AccuracyResult).filter(AccuracyResult.experiment_id == exp.id).delete()
        
        # Delete associated experiments
        db.query(Experiment).filter(Experiment.dataset_id == dataset_id).delete()
        
        # Delete dataset
        db.delete(dataset)
        db.commit()
        
        return {"message": "Dataset deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting dataset: {str(e)}")


@router.get("/{dataset_id}/summary")
async def get_dataset_summary(dataset_id: int, db: Session = Depends(get_db)):
    """
    Get summary statistics for a dataset
    """
    try:
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")
        
        experiments = db.query(Experiment).filter(Experiment.dataset_id == dataset_id).all()
        
        if not experiments:
            return {
                "dataset_id": dataset.id,
                "dataset_name": dataset.name,
                "dataset_size": dataset.size_rows,
                "total_experiments": 0,
                "average_accuracy": 0,
                "best_method": None,
                "experiments": []
            }
        
        total_experiments = len(experiments)
        avg_accuracy = sum([
            exp.accuracy_results[0].accuracy_percentage 
            if exp.accuracy_results else 0 
            for exp in experiments
        ]) / total_experiments if experiments else 0
        
        best_experiment = max(
            experiments,
            key=lambda x: (x.accuracy_results[0].accuracy_percentage if x.accuracy_results else 0)
        ) if experiments else None
        
        return {
            "dataset_id": dataset.id,
            "dataset_name": dataset.name,
            "dataset_size": dataset.size_rows,
            "dataset_size_mb": round(dataset.size_mb, 2),
            "upload_date": dataset.upload_date,
            "total_experiments": total_experiments,
            "average_accuracy": round(avg_accuracy, 2),
            "best_method": best_experiment.sampling_method.method_name if best_experiment else None,
            "best_accuracy": round(
                best_experiment.accuracy_results[0].accuracy_percentage if best_experiment and best_experiment.accuracy_results else 0,
                2
            ),
            "best_scalability": round(
                max([exp.scalability_score for exp in experiments]) if experiments else 0,
                2
            )
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving summary: {str(e)}")
