# Big Data Sampling Analysis - Backend

FastAPI-based backend for sampling extraction method analysis system.

## Features

- ✅ Multiple Sampling Methods (Random, Stratified, Cluster)
- ✅ Performance Metrics Calculation (Efficiency, Accuracy, Scalability)
- ✅ PostgreSQL Database Integration
- ✅ RESTful API endpoints
- ✅ CORS support for frontend integration
- ✅ Comprehensive logging and error handling

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── analysis.py      # Analysis endpoints
│   │   └── datasets.py      # Dataset management endpoints
│   ├── core/
│   │   ├── config.py        # Configuration settings
│   │   ├── database.py      # Database setup
│   │   ├── sampling.py      # Sampling algorithms
│   │   └── performance.py   # Performance metrics
│   ├── models/
│   │   └── models.py        # SQLAlchemy models
│   └── schemas/
│       └── schemas.py       # Pydantic schemas
├── requirements.txt
├── main.py
└── .env.example
```

## Installation

### 1. Prerequisites
- Python 3.8+
- PostgreSQL 12+

### 2. Setup Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Database

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sampling_analysis
```

### 5. Create Database

```bash
# Create PostgreSQL database
createdb sampling_analysis

# Or using psql
psql -U postgres
CREATE DATABASE sampling_analysis;
```

### 6. Create Tables

```python
from app.core.database import engine
from app.models.models import Base

# Create all tables
Base.metadata.create_all(bind=engine)
```

Or run:

```bash
python -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"
```

## Running the Server

```bash
# Start development server
uvicorn main:app --reload

# Or using Python
python main.py
```

Server will run at: `http://127.0.0.1:8000`

API Documentation: `http://127.0.0.1:8000/docs`

## API Endpoints

### Analysis

- **POST** `/api/analysis/upload-dataset` - Upload CSV/JSON file
- **POST** `/api/analysis/analyze/{dataset_id}` - Run analysis

### Datasets

- **GET** `/api/datasets/` - Get all datasets
- **GET** `/api/datasets/{dataset_id}` - Get specific dataset
- **GET** `/api/datasets/{dataset_id}/experiments` - Get experiments for dataset
- **GET** `/api/datasets/{dataset_id}/summary` - Get dataset summary
- **DELETE** `/api/datasets/{dataset_id}` - Delete dataset

## Sampling Methods

### Random Sampling
Randomly selects rows from the dataset. Fast and simple but may not be representative.

### Stratified Sampling
Preserves class proportions by sampling from each stratum. Better for imbalanced datasets.

### Cluster Sampling
Divides data into clusters and samples entire clusters. Excellent for large distributed datasets.

## Database Schema

### users
- id (Primary Key)
- name
- email
- hashed_password
- created_at

### datasets
- id (Primary Key)
- user_id (Foreign Key)
- name
- file_path
- size_rows
- size_mb
- upload_date

### sampling_methods
- id (Primary Key)
- method_name
- description

### experiments
- id (Primary Key)
- dataset_id (Foreign Key)
- method_id (Foreign Key)
- sample_fraction
- execution_time
- memory_usage
- cpu_usage
- scalability_score
- sample_size

### accuracy_results
- id (Primary Key)
- experiment_id (Foreign Key)
- original_mean
- sample_mean
- error_margin
- accuracy_percentage
- f1_score
- precision
- recall

## Integration with Frontend

The backend API is configured for CORS and will accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (alternative dev server)

Frontend should make requests to: `http://localhost:8000/api/`

## Technologies Used

- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **Pandas** - Data processing
- **NumPy** - Numerical computing
- **Scikit-learn** - ML utilities
- **Psutil** - System metrics
- **PySpark** - (Optional) Scalable computing

## Performance Metrics

- **Efficiency**: Execution time, memory usage, CPU usage
- **Accuracy**: Mean deviation, error margin, F1 score, precision, recall
- **Scalability**: Score based on resource usage patterns

## Error Handling

All endpoints include comprehensive error handling with meaningful error messages.

## Future Enhancements

- User authentication and authorization
- Data visualization exports
- Advanced scalability testing with PySpark
- Real-time progress updates with WebSockets
- Experiment comparison and history
- Export results to PDF/Excel

## Author

Created as part of Big Data Sampling Analysis research project.

## License

MIT License
