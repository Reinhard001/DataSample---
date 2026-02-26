@echo off
REM Setup script for Big Data Sampling Analysis Backend

echo ============================================
echo Big Data Sampling Analysis - Backend Setup
echo ============================================

REM Check if Python is installed
python --version > nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

echo.
echo Step 1: Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo Error: Failed to create virtual environment
    exit /b 1
)

echo Step 1: Complete ✓
echo.

echo Step 2: Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo Error: Failed to activate virtual environment
    exit /b 1
)

echo Step 2: Complete ✓
echo.

echo Step 3: Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    exit /b 1
)

echo Step 3: Complete ✓
echo.

echo Step 4: Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created from .env.example - Please update with your database credentials
)

echo Step 4: Complete ✓
echo.

echo Setup Complete! ✓
echo.
echo Next steps:
echo 1. Update .env file with your PostgreSQL credentials
echo 2. Create PostgreSQL database: createdb sampling_analysis
echo 3. Run: python -c "from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)"
echo 4. Start server: uvicorn main:app --reload
echo.
echo API Documentation: http://127.0.0.1:8000/docs
