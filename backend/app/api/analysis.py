"""
Analysis API Endpoints
Handles analysis requests from frontend
"""

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
import io
import os
import uuid
from typing import Optional
from app.core.database import get_db
from app.core.sampling import SamplingMethods
from app.core.performance import PerformanceMetrics
from app.schemas.schemas import AnalysisResponse, CombinedAnalysisResponse
from app.models.models import Dataset, Experiment, AccuracyResult, SamplingMethod
from app.core.config import settings

router = APIRouter()

@router.post("/upload-dataset")
async def upload_dataset(
    file: UploadFile = File(...),
    name: str = "Uploaded Dataset",
    db: Session = Depends(get_db)
):
    """
    Upload a CSV or JSON file for analysis
    """
    try:
        # Validate file extension
        if not file.filename.endswith(('.csv', '.json')):
            raise HTTPException(status_code=400, detail="Only CSV and JSON files are supported")
        
        # Create uploads directory if not exists
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        
        # Read file
        contents = await file.read()
        
        # Parse based on file type
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        else:  # JSON
            df = pd.read_json(io.BytesIO(contents))
        
        # Validate dataframe
        if df.empty:
            raise HTTPException(status_code=400, detail="Dataset is empty")
        
        # Save file
        file_id = str(uuid.uuid4())
        file_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}_{file.filename}")
        
        with open(file_path, 'wb') as f:
            f.write(contents)
        
        # Calculate file size
        size_mb = len(contents) / (1024 * 1024)
        
        # Create dataset record
        dataset = Dataset(
            name=name,
            file_path=file_path,
            size_rows=len(df),
            size_mb=size_mb
        )
        db.add(dataset)
        db.commit()
        db.refresh(dataset)
        
        return {
            "id": dataset.id,
            "name": dataset.name,
            "size_rows": dataset.size_rows,
            "size_mb": round(dataset.size_mb, 2),
            "column_names": df.columns.tolist(),
            "data_types": df.dtypes.astype(str).to_dict()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")


@router.post("/analyze/{dataset_id}")
async def analyze_dataset(
    dataset_id: int,
    analysis_type: str,
    sample_fraction: float = 0.2,
    target_column: Optional[str] = None,
    cluster_column: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Perform analysis on uploaded dataset using specified sampling method(s)
    
    Parameters:
    - dataset_id: ID of the uploaded dataset
    - analysis_type: Type of analysis ('random', 'stratified', 'cluster', 'combined')
    - sample_fraction: Fraction of data to sample (0-1)
    - target_column: Column for stratified sampling
    - cluster_column: Column for cluster sampling
    """
    try:
        # Get dataset from database
        dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="Dataset not found")
        
        # Load the dataset
        if dataset.file_path.endswith('.csv'):
            df = pd.read_csv(dataset.file_path)
        else:
            df = pd.read_json(dataset.file_path)
        
        # Perform analysis based on type
        if analysis_type == 'random':
            return await _random_analysis(df, dataset, db)
        elif analysis_type == 'stratified':
            if not target_column:
                raise HTTPException(status_code=400, detail="target_column required for stratified sampling")
            return await _stratified_analysis(df, dataset, target_column, db)
        elif analysis_type == 'cluster':
            if not cluster_column:
                raise HTTPException(status_code=400, detail="cluster_column required for cluster sampling")
            return await _cluster_analysis(df, dataset, cluster_column, db)
        elif analysis_type == 'combined':
            return await _combined_analysis(df, dataset, sample_fraction, target_column, cluster_column, db)
        else:
            raise HTTPException(status_code=400, detail="Invalid analysis_type")
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing dataset: {str(e)}")


async def _random_analysis(df: pd.DataFrame, dataset: Dataset, db: Session):
    """Random sampling analysis"""
    sampled_df, metrics = SamplingMethods.random_sampling(df, 0.2)
    
    accuracy_metrics = PerformanceMetrics.calculate_accuracy_metrics(df, sampled_df)
    scalability_score = PerformanceMetrics.calculate_scalability_score(
        metrics['execution_time'],
        metrics['memory_usage'],
        metrics['cpu_usage'],
        0.2
    )
    
    # Store in database
    method = db.query(SamplingMethod).filter(
        SamplingMethod.method_name == "Random Sampling"
    ).first()
    if not method:
        method = SamplingMethod(method_name="Random Sampling", description="Randomly samples rows from dataset")
        db.add(method)
        db.commit()
        db.refresh(method)
    
    experiment = Experiment(
        dataset_id=dataset.id,
        method_id=method.id,
        sample_fraction=0.2,
        execution_time=metrics['execution_time'],
        memory_usage=metrics['memory_usage'],
        cpu_usage=metrics['cpu_usage'],
        scalability_score=scalability_score,
        sample_size=metrics['sample_size']
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    
    accuracy_result = AccuracyResult(
        experiment_id=experiment.id,
        original_mean=accuracy_metrics['original_mean'],
        sample_mean=accuracy_metrics['sample_mean'],
        error_margin=accuracy_metrics['error_margin'],
        accuracy_percentage=accuracy_metrics['accuracy_percentage'],
        f1_score=accuracy_metrics['f1_score'],
        precision=accuracy_metrics['precision'],
        recall=accuracy_metrics['recall']
    )
    db.add(accuracy_result)
    db.commit()
    
    return {
        "method": "Random Sampling",
        "execution_time": round(metrics['execution_time'], 4),
        "memory_usage": round(metrics['memory_usage'], 2),
        "cpu_usage": round(metrics['cpu_usage'], 2),
        "sample_size": metrics['sample_size'],
        "original_size": metrics['original_size'],
        "scalability_score": scalability_score,
        "accuracy": accuracy_metrics['accuracy_percentage'],
        "f1_score": accuracy_metrics['f1_score'],
        "precision": accuracy_metrics['precision'],
        "recall": accuracy_metrics['recall']
    }


async def _stratified_analysis(df: pd.DataFrame, dataset: Dataset, target_column: str, db: Session):
    """Stratified sampling analysis"""
    sampled_df, metrics = SamplingMethods.stratified_sampling(df, target_column, 0.2)
    
    accuracy_metrics = PerformanceMetrics.calculate_accuracy_metrics(df, sampled_df)
    scalability_score = PerformanceMetrics.calculate_scalability_score(
        metrics['execution_time'],
        metrics['memory_usage'],
        metrics['cpu_usage'],
        0.2
    )
    
    # Store in database
    method = db.query(SamplingMethod).filter(
        SamplingMethod.method_name == "Stratified Sampling"
    ).first()
    if not method:
        method = SamplingMethod(method_name="Stratified Sampling", description="Preserves class proportions")
        db.add(method)
        db.commit()
        db.refresh(method)
    
    experiment = Experiment(
        dataset_id=dataset.id,
        method_id=method.id,
        sample_fraction=0.2,
        execution_time=metrics['execution_time'],
        memory_usage=metrics['memory_usage'],
        cpu_usage=metrics['cpu_usage'],
        scalability_score=scalability_score,
        sample_size=metrics['sample_size']
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    
    accuracy_result = AccuracyResult(
        experiment_id=experiment.id,
        original_mean=accuracy_metrics['original_mean'],
        sample_mean=accuracy_metrics['sample_mean'],
        error_margin=accuracy_metrics['error_margin'],
        accuracy_percentage=accuracy_metrics['accuracy_percentage'],
        f1_score=accuracy_metrics['f1_score'],
        precision=accuracy_metrics['precision'],
        recall=accuracy_metrics['recall']
    )
    db.add(accuracy_result)
    db.commit()
    
    return {
        "method": "Stratified Sampling",
        "execution_time": round(metrics['execution_time'], 4),
        "memory_usage": round(metrics['memory_usage'], 2),
        "cpu_usage": round(metrics['cpu_usage'], 2),
        "sample_size": metrics['sample_size'],
        "original_size": metrics['original_size'],
        "scalability_score": scalability_score,
        "accuracy": accuracy_metrics['accuracy_percentage'],
        "f1_score": accuracy_metrics['f1_score'],
        "precision": accuracy_metrics['precision'],
        "recall": accuracy_metrics['recall']
    }


async def _cluster_analysis(df: pd.DataFrame, dataset: Dataset, cluster_column: str, db: Session):
    """Cluster sampling analysis"""
    sampled_df, metrics = SamplingMethods.cluster_sampling(df, cluster_column)
    
    accuracy_metrics = PerformanceMetrics.calculate_accuracy_metrics(df, sampled_df)
    scalability_score = PerformanceMetrics.calculate_scalability_score(
        metrics['execution_time'],
        metrics['memory_usage'],
        metrics['cpu_usage'],
        len(sampled_df) / len(df)
    )
    
    # Store in database
    method = db.query(SamplingMethod).filter(
        SamplingMethod.method_name == "Cluster Sampling"
    ).first()
    if not method:
        method = SamplingMethod(method_name="Cluster Sampling", description="Samples entire clusters")
        db.add(method)
        db.commit()
        db.refresh(method)
    
    experiment = Experiment(
        dataset_id=dataset.id,
        method_id=method.id,
        sample_fraction=len(sampled_df) / len(df),
        execution_time=metrics['execution_time'],
        memory_usage=metrics['memory_usage'],
        cpu_usage=metrics['cpu_usage'],
        scalability_score=scalability_score,
        sample_size=metrics['sample_size']
    )
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    
    accuracy_result = AccuracyResult(
        experiment_id=experiment.id,
        original_mean=accuracy_metrics['original_mean'],
        sample_mean=accuracy_metrics['sample_mean'],
        error_margin=accuracy_metrics['error_margin'],
        accuracy_percentage=accuracy_metrics['accuracy_percentage'],
        f1_score=accuracy_metrics['f1_score'],
        precision=accuracy_metrics['precision'],
        recall=accuracy_metrics['recall']
    )
    db.add(accuracy_result)
    db.commit()
    
    return {
        "method": "Cluster Sampling",
        "execution_time": round(metrics['execution_time'], 4),
        "memory_usage": round(metrics['memory_usage'], 2),
        "cpu_usage": round(metrics['cpu_usage'], 2),
        "sample_size": metrics['sample_size'],
        "original_size": metrics['original_size'],
        "scalability_score": scalability_score,
        "accuracy": accuracy_metrics['accuracy_percentage'],
        "f1_score": accuracy_metrics['f1_score'],
        "precision": accuracy_metrics['precision'],
        "recall": accuracy_metrics['recall']
    }


async def _combined_analysis(df: pd.DataFrame, dataset: Dataset, sample_fraction: float,
                            target_column: Optional[str], cluster_column: Optional[str], db: Session):
    """Combined analysis of all three methods"""
    results = SamplingMethods.combined_sampling(df, sample_fraction, target_column, cluster_column)
    
    combined_results = {
        "dataset_name": dataset.name,
        "dataset_size": len(df),
        "methods": {}
    }
    
    for method_name, method_data in results.items():
        if 'error' in method_data:
            continue
        
        sampled_df = method_data['sample']
        metrics = method_data['metrics']
        
        accuracy_metrics = PerformanceMetrics.calculate_accuracy_metrics(df, sampled_df)
        scalability_score = PerformanceMetrics.calculate_scalability_score(
            metrics['execution_time'],
            metrics['memory_usage'],
            metrics['cpu_usage'],
            len(sampled_df) / len(df)
        )
        
        combined_results["methods"][metrics['method']] = {
            "execution_time": round(metrics['execution_time'], 4),
            "memory_usage": round(metrics['memory_usage'], 2),
            "cpu_usage": round(metrics['cpu_usage'], 2),
            "sample_size": metrics['sample_size'],
            "original_size": metrics['original_size'],
            "scalability_score": scalability_score,
            "accuracy": accuracy_metrics['accuracy_percentage'],
            "f1_score": accuracy_metrics['f1_score'],
            "precision": accuracy_metrics['precision'],
            "recall": accuracy_metrics['recall']
        }
    
    # Add comparison summary
    comparison = PerformanceMetrics.compare_methods(results)
    combined_results["comparison"] = comparison
    
    return combined_results
