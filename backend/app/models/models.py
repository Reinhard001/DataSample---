from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    """User model for authentication"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    datasets = relationship("Dataset", back_populates="user")

class Dataset(Base):
    """Dataset model to track uploaded files"""
    __tablename__ = "datasets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(255), nullable=False)
    file_path = Column(Text, nullable=False)
    size_rows = Column(Integer, nullable=False)
    size_mb = Column(Float, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    description = Column(Text, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="datasets")
    experiments = relationship("Experiment", back_populates="dataset")

class SamplingMethod(Base):
    """Sampling method model"""
    __tablename__ = "sampling_methods"
    
    id = Column(Integer, primary_key=True, index=True)
    method_name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    experiments = relationship("Experiment", back_populates="sampling_method")

class Experiment(Base):
    """Core experiment model - stores each analysis run"""
    __tablename__ = "experiments"
    
    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False)
    method_id = Column(Integer, ForeignKey("sampling_methods.id"), nullable=False)
    sample_fraction = Column(Float, nullable=False)
    execution_time = Column(Float, nullable=False)  # in seconds
    memory_usage = Column(Float, nullable=False)    # in MB
    cpu_usage = Column(Float, nullable=False)       # in percentage
    scalability_score = Column(Float, nullable=False)
    sample_size = Column(Integer, nullable=False)
    experiment_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)
    
    # Relationships
    dataset = relationship("Dataset", back_populates="experiments")
    sampling_method = relationship("SamplingMethod", back_populates="experiments")
    accuracy_results = relationship("AccuracyResult", back_populates="experiment")

class AccuracyResult(Base):
    """Accuracy metrics for each experiment"""
    __tablename__ = "accuracy_results"
    
    id = Column(Integer, primary_key=True, index=True)
    experiment_id = Column(Integer, ForeignKey("experiments.id"), nullable=False)
    original_mean = Column(Float, nullable=False)
    sample_mean = Column(Float, nullable=False)
    error_margin = Column(Float, nullable=False)
    accuracy_percentage = Column(Float, nullable=False)
    f1_score = Column(Float, nullable=False)
    precision = Column(Float, nullable=False)
    recall = Column(Float, nullable=False)
    
    # Relationships
    experiment = relationship("Experiment", back_populates="accuracy_results")
