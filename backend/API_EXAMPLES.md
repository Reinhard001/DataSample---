# API Usage Examples

## 🌐 Base URL
```
http://localhost:8000/api
```

## 📤 Upload Dataset

### Request
```bash
curl -X POST "http://localhost:8000/api/analysis/upload-dataset" \
  -F "file=@data.csv" \
  -F "name=My Dataset"
```

### Response
```json
{
  "id": 1,
  "name": "My Dataset",
  "size_rows": 1000,
  "size_mb": 0.05,
  "column_names": ["id", "value", "category"],
  "data_types": {
    "id": "int64",
    "value": "float64",
    "category": "object"
  }
}
```

---

## 🔬 Run Random Sampling Analysis

### Request
```bash
curl -X POST "http://localhost:8000/api/analysis/analyze/1?analysis_type=random"
```

### Response
```json
{
  "method": "Random Sampling",
  "execution_time": 0.0125,
  "memory_usage": 1.23,
  "cpu_usage": 45.5,
  "sample_size": 200,
  "original_size": 1000,
  "scalability_score": 94.25,
  "accuracy": 98.5,
  "f1_score": 0.9823,
  "precision": 0.9854,
  "recall": 0.9792
}
```

---

## 📊 Run Stratified Sampling Analysis

### Request
```bash
curl -X POST "http://localhost:8000/api/analysis/analyze/1?analysis_type=stratified&target_column=category"
```

### Response
```json
{
  "method": "Stratified Sampling",
  "execution_time": 0.0185,
  "memory_usage": 1.89,
  "cpu_usage": 52.3,
  "sample_size": 200,
  "original_size": 1000,
  "scalability_score": 92.15,
  "accuracy": 99.2,
  "f1_score": 0.9921,
  "precision": 0.9945,
  "recall": 0.9898
}
```

---

## 🎯 Run Cluster Sampling Analysis

### Request
```bash
curl -X POST "http://localhost:8000/api/analysis/analyze/1?analysis_type=cluster&cluster_column=region"
```

### Response
```json
{
  "method": "Cluster Sampling",
  "execution_time": 0.0095,
  "memory_usage": 0.75,
  "cpu_usage": 38.9,
  "sample_size": 450,
  "original_size": 1000,
  "scalability_score": 96.8,
  "accuracy": 97.1,
  "f1_score": 0.9701,
  "precision": 0.9734,
  "recall": 0.9668
}
```

---

## 🔄 Run Combined Analysis (All Methods)

### Request
```bash
curl -X POST "http://localhost:8000/api/analysis/analyze/1?analysis_type=combined&target_column=category&cluster_column=region"
```

### Response
```json
{
  "dataset_name": "My Dataset",
  "dataset_size": 1000,
  "methods": {
    "Random Sampling": {
      "execution_time": 0.0125,
      "memory_usage": 1.23,
      "cpu_usage": 45.5,
      "sample_size": 200,
      "original_size": 1000,
      "scalability_score": 94.25,
      "accuracy": 98.5,
      "f1_score": 0.9823,
      "precision": 0.9854,
      "recall": 0.9792
    },
    "Stratified Sampling": {
      "execution_time": 0.0185,
      "memory_usage": 1.89,
      "cpu_usage": 52.3,
      "sample_size": 200,
      "original_size": 1000,
      "scalability_score": 92.15,
      "accuracy": 99.2,
      "f1_score": 0.9921,
      "precision": 0.9945,
      "recall": 0.9898
    },
    "Cluster Sampling": {
      "execution_time": 0.0095,
      "memory_usage": 0.75,
      "cpu_usage": 38.9,
      "sample_size": 450,
      "original_size": 1000,
      "scalability_score": 96.8,
      "accuracy": 97.1,
      "f1_score": 0.9701,
      "precision": 0.9734,
      "recall": 0.9668
    }
  },
  "comparison": {
    "methods_compared": [
      "Random Sampling",
      "Stratified Sampling",
      "Cluster Sampling"
    ],
    "best_efficiency": "Cluster Sampling",
    "best_accuracy": "Stratified Sampling",
    "best_scalability": "Cluster Sampling",
    "overall_best": "Cluster Sampling"
  }
}
```

---

## 📋 Get All Datasets

### Request
```bash
curl -X GET "http://localhost:8000/api/datasets/"
```

### Response
```json
[
  {
    "id": 1,
    "name": "My Dataset",
    "size_rows": 1000,
    "size_mb": 0.05,
    "upload_date": "2024-02-26T10:30:00",
    "description": null
  },
  {
    "id": 2,
    "name": "Sales Data Q1",
    "size_rows": 5000,
    "size_mb": 0.15,
    "upload_date": "2024-02-25T14:20:00",
    "description": "Q1 sales data"
  }
]
```

---

## 📊 Get Dataset Summary

### Request
```bash
curl -X GET "http://localhost:8000/api/datasets/1/summary"
```

### Response
```json
{
  "dataset_id": 1,
  "dataset_name": "My Dataset",
  "dataset_size": 1000,
  "dataset_size_mb": 0.05,
  "upload_date": "2024-02-26T10:30:00",
  "total_experiments": 3,
  "average_accuracy": 98.27,
  "best_method": "Stratified Sampling",
  "best_accuracy": 99.2,
  "best_scalability": 96.8
}
```

---

## 📈 Get Dataset Experiments

### Request
```bash
curl -X GET "http://localhost:8000/api/datasets/1/experiments"
```

### Response
```json
[
  {
    "id": 1,
    "method_id": 1,
    "method_name": "Random Sampling",
    "sample_fraction": 0.2,
    "execution_time": 0.0125,
    "memory_usage": 1.23,
    "cpu_usage": 45.5,
    "scalability_score": 94.25,
    "sample_size": 200,
    "experiment_date": "2024-02-26T10:35:00",
    "accuracy_results": {
      "original_mean": 150.5,
      "sample_mean": 149.8,
      "error_margin": 0.7,
      "accuracy_percentage": 98.5,
      "f1_score": 0.9823,
      "precision": 0.9854,
      "recall": 0.9792
    }
  },
  {
    "id": 2,
    "method_id": 2,
    "method_name": "Stratified Sampling",
    "sample_fraction": 0.2,
    "execution_time": 0.0185,
    "memory_usage": 1.89,
    "cpu_usage": 52.3,
    "scalability_score": 92.15,
    "sample_size": 200,
    "experiment_date": "2024-02-26T10:36:00",
    "accuracy_results": {
      "original_mean": 150.5,
      "sample_mean": 150.2,
      "error_margin": 0.3,
      "accuracy_percentage": 99.2,
      "f1_score": 0.9921,
      "precision": 0.9945,
      "recall": 0.9898
    }
  }
]
```

---

## 🗑️ Delete Dataset

### Request
```bash
curl -X DELETE "http://localhost:8000/api/datasets/1"
```

### Response
```json
{
  "message": "Dataset deleted successfully"
}
```

---

## 🧪 Testing with Python

```python
import requests
import json

BASE_URL = "http://localhost:8000/api"

# Upload dataset
with open("data.csv", "rb") as f:
    files = {"file": f}
    data = {"name": "Test Dataset"}
    response = requests.post(f"{BASE_URL}/analysis/upload-dataset", files=files, data=data)
    dataset = response.json()
    dataset_id = dataset["id"]
    print(f"Uploaded dataset ID: {dataset_id}")

# Run analysis
response = requests.post(
    f"{BASE_URL}/analysis/analyze/{dataset_id}",
    params={
        "analysis_type": "combined",
        "target_column": "category",
        "cluster_column": "region"
    }
)
results = response.json()
print(json.dumps(results, indent=2))

# Get summary
response = requests.get(f"{BASE_URL}/datasets/{dataset_id}/summary")
summary = response.json()
print(json.dumps(summary, indent=2))
```

---

## 🔗 Using with Frontend

The frontend (`src/pages/Analysis.tsx`) will make these API calls:

```typescript
// Upload dataset
const uploadResponse = await fetch('http://localhost:8000/api/analysis/upload-dataset', {
  method: 'POST',
  body: formData
})

// Run analysis
const analysisResponse = await fetch(`http://localhost:8000/api/analysis/analyze/${datasetId}?analysis_type=${type}`, {
  method: 'POST'
})

// Get results
const results = await analysisResponse.json()
// Display on AnalysisOutput page
```

---

## ✅ Expected Status Codes

- **200** - Successful request
- **400** - Bad request (missing parameters)
- **404** - Resource not found (dataset ID doesn't exist)
- **500** - Server error

---

## 🔍 View All Endpoints

Visit Swagger UI: `http://localhost:8000/docs`

All endpoints are documented with interactive testing capability!
