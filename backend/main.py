from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.core.config import settings
from app.api import analysis, datasets

# Initialize FastAPI app
app = FastAPI(
    title="Big Data Sampling Analysis API",
    description="Backend API for analyzing data sampling methods (Random, Stratified, Cluster)",
    version="1.0.0"
)

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(datasets.router, prefix="/api/datasets", tags=["Datasets"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Big Data Sampling Analysis API",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "sampling-analysis-backend"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
