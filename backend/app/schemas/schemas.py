from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# Dataset schemas
class DatasetCreate(BaseModel):
    name: str
    description: Optional[str] = None

class DatasetResponse(BaseModel):
    id: int
    name: str
    size_rows: int
    size_mb: float
    upload_date: datetime
    description: Optional[str]
    
    class Config:
        from_attributes = True

# Sampling Method schemas
class SamplingMethodResponse(BaseModel):
    id: int
    method_name: str
    description: Optional[str]
    
    class Config:
        from_attributes = True

# Accuracy Result schemas
class AccuracyResultResponse(BaseModel):
    original_mean: float
    sample_mean: float
    error_margin: float
    accuracy_percentage: float
    f1_score: float
    precision: float
    recall: float
    
    class Config:
        from_attributes = True

# Experiment schemas
class ExperimentCreate(BaseModel):
    dataset_id: int
    method_id: int
    sample_fraction: float

class ExperimentResponse(BaseModel):
    id: int
    dataset_id: int
    method_id: int
    sample_fraction: float
    execution_time: float
    memory_usage: float
    cpu_usage: float
    scalability_score: float
    sample_size: int
    experiment_date: datetime
    accuracy_results: Optional[AccuracyResultResponse]
    
    class Config:
        from_attributes = True

# Analysis request schema
class AnalysisRequest(BaseModel):
    name: str
    analysis_type: str  # 'random', 'stratified', 'cluster', 'combined'
    sample_fraction: float = 0.2
    target_column: Optional[str] = None  # For stratified sampling

class AnalysisResponse(BaseModel):
    execution_time: float
    memory_usage: float
    cpu_usage: float
    sample_size: int
    original_size: int
    accuracy: float
    method_used: str
    results: dict
    
    class Config:
        from_attributes = True

# Combined Analysis Results (for all methods)
class CombinedAnalysisResponse(BaseModel):
    dataset_name: str
    dataset_size: int
    random_sampling: AnalysisResponse
    stratified_sampling: Optional[AnalysisResponse] = None
    cluster_sampling: Optional[AnalysisResponse] = None
    
    class Config:
        from_attributes = True
