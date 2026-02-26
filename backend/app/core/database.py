from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=5,
    max_overflow=10
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
