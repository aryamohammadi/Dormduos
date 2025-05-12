import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    
    # Database configuration - SQLite for development, PostgreSQL for production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///instance/housing.sqlite')
    # Fix for SQLAlchemy/Heroku compatibility 
    if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace('postgres://', 'postgresql://', 1)
    # Fallback to SQLite for development
    if not SQLALCHEMY_DATABASE_URI:
        SQLALCHEMY_DATABASE_URI = 'sqlite:///housing.sqlite'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Google Maps configuration
    GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY', '')
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    SESSION_COOKIE_SECURE = FLASK_ENV == 'production'  # Only send cookies over HTTPS in production
    SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript from accessing cookies
    SESSION_COOKIE_SAMESITE = 'Lax'  # Restrict cookies to same site
    
    # Security headers
    PREFERRED_URL_SCHEME = 'https'  # Prefer HTTPS
    
    # Development mode
    DEBUG = FLASK_ENV == 'development'
    
    # NLTK configuration
    NLTK_DATA_PATH = os.path.expanduser('~/nltk_data')
    
    # Server settings
    PORT = int(os.environ.get('PORT', 5000))
    HOST = os.environ.get('HOST', 'localhost')

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    FLASK_ENV = 'development'

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    """Production configuration."""
    FLASK_ENV = 'production'
    DEBUG = False
    
    # Production should always have these set
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("No SECRET_KEY set for production environment")

# Determine which configuration to use
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Get the current configuration object based on environment."""
    env = os.environ.get('FLASK_ENV', 'default')
    return config.get(env, config['default']) 