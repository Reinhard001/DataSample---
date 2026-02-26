"""
Sampling Methods Module
Implements Random, Stratified, and Cluster sampling techniques
"""

import pandas as pd
import numpy as np
from typing import Tuple, Dict, Any
import time
import psutil
import os
from sklearn.preprocessing import LabelEncoder

class SamplingMethods:
    """Class containing all sampling methods"""
    
    @staticmethod
    def random_sampling(df: pd.DataFrame, frac: float = 0.2) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        """
        Random Sampling: Randomly selects rows from the dataset
        
        Args:
            df: DataFrame to sample from
            frac: Fraction of data to sample (0-1)
            
        Returns:
            Tuple of (sampled_dataframe, metrics_dict)
        """
        start_time = time.time()
        process = psutil.Process(os.getpid())
        memory_before = process.memory_info().rss / 1024 / 1024  # MB
        
        try:
            sampled_df = df.sample(frac=frac, random_state=42)
            
            end_time = time.time()
            memory_after = process.memory_info().rss / 1024 / 1024
            
            metrics = {
                "execution_time": end_time - start_time,
                "memory_usage": memory_after - memory_before,
                "cpu_usage": process.cpu_percent(interval=0.1),
                "sample_size": len(sampled_df),
                "original_size": len(df),
                "method": "Random Sampling"
            }
            
            return sampled_df, metrics
        except Exception as e:
            raise ValueError(f"Error in random sampling: {str(e)}")
    
    @staticmethod
    def stratified_sampling(df: pd.DataFrame, target_column: str, frac: float = 0.2) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        """
        Stratified Sampling: Preserves class proportions by sampling from each stratum
        
        Args:
            df: DataFrame to sample from
            target_column: Column name to stratify on
            frac: Fraction of data to sample from each stratum (0-1)
            
        Returns:
            Tuple of (sampled_dataframe, metrics_dict)
        """
        start_time = time.time()
        process = psutil.Process(os.getpid())
        memory_before = process.memory_info().rss / 1024 / 1024
        
        try:
            if target_column not in df.columns:
                raise ValueError(f"Column '{target_column}' not found in dataset")
            
            # Perform stratified sampling by grouping and sampling from each group
            sampled_df = df.groupby(target_column, group_keys=False).apply(
                lambda x: x.sample(frac=min(frac, 1.0), random_state=42)
            ).reset_index(drop=True)
            
            end_time = time.time()
            memory_after = process.memory_info().rss / 1024 / 1024
            
            metrics = {
                "execution_time": end_time - start_time,
                "memory_usage": memory_after - memory_before,
                "cpu_usage": process.cpu_percent(interval=0.1),
                "sample_size": len(sampled_df),
                "original_size": len(df),
                "method": "Stratified Sampling"
            }
            
            return sampled_df, metrics
        except Exception as e:
            raise ValueError(f"Error in stratified sampling: {str(e)}")
    
    @staticmethod
    def cluster_sampling(df: pd.DataFrame, cluster_column: str) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        """
        Cluster Sampling: Divides data into clusters and randomly selects entire clusters
        
        Args:
            df: DataFrame to sample from
            cluster_column: Column to use for creating clusters
            
        Returns:
            Tuple of (sampled_dataframe, metrics_dict)
        """
        start_time = time.time()
        process = psutil.Process(os.getpid())
        memory_before = process.memory_info().rss / 1024 / 1024
        
        try:
            if cluster_column not in df.columns:
                raise ValueError(f"Column '{cluster_column}' not found in dataset")
            
            # Get unique clusters
            clusters = df[cluster_column].unique()
            
            if len(clusters) == 0:
                raise ValueError("No clusters found in the specified column")
            
            # Randomly select approximately 50% of clusters
            num_clusters_to_select = max(1, len(clusters) // 2)
            selected_clusters = np.random.choice(clusters, size=num_clusters_to_select, replace=False)
            
            # Sample all data from selected clusters
            sampled_df = df[df[cluster_column].isin(selected_clusters)].reset_index(drop=True)
            
            end_time = time.time()
            memory_after = process.memory_info().rss / 1024 / 1024
            
            metrics = {
                "execution_time": end_time - start_time,
                "memory_usage": memory_after - memory_before,
                "cpu_usage": process.cpu_percent(interval=0.1),
                "sample_size": len(sampled_df),
                "original_size": len(df),
                "method": "Cluster Sampling"
            }
            
            return sampled_df, metrics
        except Exception as e:
            raise ValueError(f"Error in cluster sampling: {str(e)}")
    
    @staticmethod
    def combined_sampling(df: pd.DataFrame, frac: float = 0.2, 
                         target_column: str = None, cluster_column: str = None) -> Dict[str, Any]:
        """
        Combined Analysis: Runs all three sampling methods and compares results
        
        Args:
            df: DataFrame to sample from
            frac: Fraction of data to sample
            target_column: Column for stratified sampling
            cluster_column: Column for cluster sampling
            
        Returns:
            Dictionary containing results from all three methods
        """
        results = {}
        
        # Random Sampling
        try:
            random_sample, random_metrics = SamplingMethods.random_sampling(df, frac)
            results['random_sampling'] = {
                'metrics': random_metrics,
                'sample': random_sample
            }
        except Exception as e:
            results['random_sampling'] = {'error': str(e)}
        
        # Stratified Sampling
        try:
            if target_column and target_column in df.columns:
                stratified_sample, stratified_metrics = SamplingMethods.stratified_sampling(
                    df, target_column, frac
                )
                results['stratified_sampling'] = {
                    'metrics': stratified_metrics,
                    'sample': stratified_sample
                }
        except Exception as e:
            results['stratified_sampling'] = {'error': str(e)}
        
        # Cluster Sampling
        try:
            if cluster_column and cluster_column in df.columns:
                cluster_sample, cluster_metrics = SamplingMethods.cluster_sampling(df, cluster_column)
                results['cluster_sampling'] = {
                    'metrics': cluster_metrics,
                    'sample': cluster_sample
                }
        except Exception as e:
            results['cluster_sampling'] = {'error': str(e)}
        
        return results
