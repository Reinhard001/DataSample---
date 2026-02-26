from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "Big Data Sampling Analysis"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Database settings
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "postgres")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", "5432")
    DB_NAME: str = os.getenv("DB_NAME", "sampling_analysis")
    
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative dev server
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Upload settings
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    UPLOAD_DIR: str = "uploads"
    
    # Sampling settings
    SAMPLING_FRACTIONS: List[float] = [0.1, 0.2, 0.5]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
