#!/usr/bin/env python
import os
import argparse
from datetime import datetime
from dotenv import load_dotenv
from app import create_app

# Load environment variables from .env file
load_dotenv()

# Check for Google Maps API key
google_maps_api_key = os.environ.get('GOOGLE_MAPS_API_KEY', '')
if not google_maps_api_key:
    print("\033[93mWARNING: Google Maps API key not found. Maps functionality will not work.\033[0m")
    print("To enable Google Maps functionality, add your API key to the .env file:")
    print("GOOGLE_MAPS_API_KEY=your-google-maps-api-key")
    print("See docs/GOOGLE_MAPS_SETUP.md for setup instructions.")
else:
    # Mask the key for security
    masked_key = google_maps_api_key[:5] + '*****' + google_maps_api_key[-3:] if len(google_maps_api_key) > 8 else '*****'
    print(f"Google Maps API key found: {masked_key}")

# Create app instance
app = create_app()

# Add context processor for template variables
@app.context_processor
def inject_now():
    return {'now': datetime.utcnow()}

if __name__ == '__main__':
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Run the HousingConnect Flask application')
    parser.add_argument('--host', default=os.environ.get('HOST', 'localhost'), help='Host to bind the server to')
    parser.add_argument('--port', type=int, default=int(os.environ.get('PORT', 5001)), help='Port to bind the server to')
    args = parser.parse_args()
    
    # Use environment variables or default values for host and port
    host = args.host
    port = args.port
    debug = os.environ.get('FLASK_ENV', 'development') == 'development'
    
    print(f"\nStarting UCR HousingConnect on http://{host}:{port}")
    print(f"Debug mode: {'ON' if debug else 'OFF'}")
    print(f"Press CTRL+C to stop the server\n")
    
    app.run(host=host, port=port, debug=debug) 