#!/bin/bash

# Setup script for Big Data Sampling Analysis Backend

echo "============================================"
echo "Big Data Sampling Analysis - Backend Setup"
echo "============================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Error: Python3 is not installed"
    exit 1
fi

echo ""
echo "Step 1: Creating virtual environment..."
python3 -m venv venv
if [ $? -ne 0 ]; then
    echo "Error: Failed to create virtual environment"
    exit 1
fi

echo "Step 1: Complete ✓"
echo ""

echo "Step 2: Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "Error: Failed to activate virtual environment"
    exit 1
fi

echo "Step 2: Complete ✓"
echo ""

echo "Step 3: Installing dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo "Step 3: Complete ✓"
echo ""

echo "Step 4: Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created from .env.example - Please update with your database credentials"
fi

echo "Step 4: Complete ✓"
echo ""

echo "Setup Complete! ✓"
echo ""
echo "Next steps:"
echo "1. Update .env file with your PostgreSQL credentials"
echo "2. Create PostgreSQL database: createdb sampling_analysis"
echo "3. Run: python -c \"from app.core.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine)\""
echo "4. Start server: uvicorn main:app --reload"
echo ""
echo "API Documentation: http://127.0.0.1:8000/docs"
