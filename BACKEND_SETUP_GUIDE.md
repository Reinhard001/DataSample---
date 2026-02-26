# Big Data Sampling Analysis - Complete Setup Guide

## 📁 Project Structure

Your project now has:

```
app/
├── frontend/              (React/Vite - already exists)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── backend/              (NEW - FastAPI)
    ├── app/
    │   ├── api/
    │   ├── core/
    │   ├── models/
    │   └── schemas/
    ├── main.py
    ├── requirements.txt
    ├── .env.example
    ├── setup.bat
    ├── setup.sh
    └── README.md
```

## 🚀 Quick Start

### Option 1: Windows (Recommended)

```bash
# Navigate to backend folder
cd backend

# Run setup script
setup.bat

# After setup, install PostgreSQL if needed:
# Download from: https://www.postgresql.org/download/windows/

# Create database
createdb sampling_analysis

# Create tables
python -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"

# Start backend
uvicorn main:app --reload
```

### Option 2: Linux/Mac

```bash
# Navigate to backend folder
cd backend

# Run setup script
chmod +x setup.sh
./setup.sh

# After setup, install PostgreSQL if needed:
# Ubuntu: sudo apt-get install postgresql
# Mac: brew install postgresql

# Create database
createdb sampling_analysis

# Create tables
python3 -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"

# Start backend
uvicorn main:app --reload
```

## 📋 Database Setup

### Install PostgreSQL

**Windows:**
- Download: https://www.postgresql.org/download/windows/
- Run installer and remember the password

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### Create Database

```bash
# Using PostgreSQL command line
psql -U postgres

# Inside psql
CREATE DATABASE sampling_analysis;
\q
```

Or using createdb:
```bash
createdb -U postgres sampling_analysis
```

### Configure .env

Copy `.env.example` to `.env` and update:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sampling_analysis
```

## 🔶 Backend Server Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Create Database Tables

```bash
python -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"
```

### 3. Start Server

```bash
uvicorn main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Press CTRL+C to quit
```

### 4. Test API

Visit: `http://127.0.0.1:8000/docs`

You'll see **Swagger UI** with all API endpoints.

## 🎯 Frontend Integration

The frontend (React) is already configured to communicate with the backend.

### Start Frontend

In another terminal:

```bash
# From root app folder
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 📡 API Endpoints Reference

### Dataset Management

```
POST   /api/datasets/upload-dataset     - Upload CSV/JSON
GET    /api/datasets/                   - Get all datasets
GET    /api/datasets/{id}               - Get specific dataset
DELETE /api/datasets/{id}               - Delete dataset
GET    /api/datasets/{id}/summary       - Get dataset summary
```

### Analysis

```
POST   /api/analysis/analyze/{id}       - Run analysis
```

## 🔄 Data Flow

```
Frontend (React)
      ↓
  User uploads data
      ↓
POST /api/analysis/upload-dataset
      ↓
Backend saves to PostgreSQL
      ↓
Returns dataset ID
      ↓
Frontend sends analysis request
      ↓
POST /api/analysis/analyze/{dataset_id}
      ↓
Backend runs sampling methods
      ↓
Calculates metrics
      ↓
Stores in PostgreSQL
      ↓
Returns results JSON
      ↓
Frontend displays on Analysis Output page
```

## 🧪 Testing the System

### 1. Create Sample Data

Create `test_data.csv`:
```csv
id,value,category,score
1,100,A,85
2,200,B,90
3,150,A,78
4,250,B,92
5,120,A,88
6,300,B,95
```

### 2. Upload via API

Use the Swagger UI at `http://127.0.0.1:8000/docs`

Or curl:
```bash
curl -X POST "http://127.0.0.1:8000/api/analysis/upload-dataset" \
  -F "file=@test_data.csv" \
  -F "name=Test Data"
```

### 3. Run Analysis

```bash
curl -X POST "http://127.0.0.1:8000/api/analysis/analyze/1?analysis_type=random"
```

### 4. Check Results in Frontend

Go to `http://localhost:5173`
- Navigate to Analysis page
- Upload dataset
- Select sampling method
- Click "Start Analysis"
- View results on Analysis Output page

## 🐛 Troubleshooting

### Error: "No module named 'X'"

```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Error: "Cannot connect to database"

1. Check PostgreSQL is running:
```bash
# Windows
pg_isready

# Linux/Mac
pg_isready -h localhost -p 5432
```

2. Verify .env file has correct credentials

3. Create database if it doesn't exist:
```bash
createdb sampling_analysis
```

### Error: "Tables don't exist"

```bash
python -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"
```

### Error: CORS issues

CORS is configured in `app/core/config.py` for:
- http://localhost:5173 (frontend)
- http://localhost:3000 (alternative)

### Error: Port 8000 already in use

```bash
# Use different port
uvicorn main:app --reload --port 8001

# Update frontend API URL to http://localhost:8001/api/
```

## 📚 Backend Code Architecture

### Sampling Methods (`app/core/sampling.py`)

```python
# Random sampling
SamplingMethods.random_sampling(df, frac=0.2)

# Stratified sampling
SamplingMethods.stratified_sampling(df, target_column, frac=0.2)

# Cluster sampling
SamplingMethods.cluster_sampling(df, cluster_column)

# Combined analysis
SamplingMethods.combined_sampling(df, frac=0.2, target_column, cluster_column)
```

### Performance Metrics (`app/core/performance.py`)

```python
# Calculate accuracy
PerformanceMetrics.calculate_accuracy_metrics(original_df, sampled_df)

# Calculate scalability
PerformanceMetrics.calculate_scalability_score(exec_time, memory, cpu, frac)

# Compare methods
PerformanceMetrics.compare_methods(results)
```

## 🔐 Security Considerations

Current implementation is for **academic/development only**.

For production, add:

1. **Environment Variables**
   - Already using .env file

2. **Database Security**
   - Use strong password
   - Connect via VPN/firewall

3. **API Security**
   - Add authentication (JWT)
   - Rate limiting
   - Input validation (already implemented)

4. **File Security**
   - Validate uploaded files
   - Scan for malware
   - Limit file size

## 📊 Performance Considerations

### Current Limitations

- SQLite/PostgreSQL choice: PostgreSQL recommended
- In-memory processing: Suitable for < 10GB datasets
- Single server: Scale with load balancer for production

### For Large Datasets

Use PySpark integration:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("sampling").getOrCreate()
df = spark.read.csv("data.csv")
```

## 🎓 For Your Defense

**You can explain:**

"The backend is built using FastAPI, a modern Python web framework optimized for performance and ease of development. It implements three distinct sampling extraction methods:

1. **Random Sampling** - Provides fast, unbiased uniform sampling
2. **Stratified Sampling** - Preserves class proportions for balanced representation
3. **Cluster Sampling** - Enables efficient sampling of partitioned data

The system measures performance across three dimensions:

- **Efficiency**: Execution time, memory usage, CPU utilization
- **Accuracy**: Statistical measures including F1 score, precision, recall
- **Scalability**: Performance metrics across varying dataset sizes

All data is persisted in PostgreSQL using SQLAlchemy ORM with a well-designed schema featuring users, datasets, sampling methods, experiments, and accuracy results. The API is RESTful with comprehensive CORS support for seamless frontend integration."

## 🚀 Next Steps

1. ✅ Backend created
2. ✅ Database models defined
3. ✅ API endpoints ready
4. Now: **Test the full system end-to-end**

## 📞 Support

- API Documentation: `http://127.0.0.1:8000/docs`
- Backend README: `backend/README.md`
- FastAPI Docs: https://fastapi.tiangolo.com/
- SQLAlchemy Docs: https://docs.sqlalchemy.org/

---

Your backend is **production-ready for academic purposes**! 🎉
