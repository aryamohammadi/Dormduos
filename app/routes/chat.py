from flask import Blueprint, render_template, request, jsonify, current_app
from app.models import Listing
from app import db
import os
import json
import traceback
from app.matching import ListingMatcher

# Create a blueprint for chat routes
chat_bp = Blueprint('chat', __name__, url_prefix='/chat')

# Initialize the rule-based matching system
matcher = ListingMatcher()

@chat_bp.route('', methods=['GET'])
def chat_interface():
    """Render the chat interface"""
    return render_template('chat/index.html')

@chat_bp.route('/ask', methods=['POST'])
def ask():
    """Process a question from the user and return matching listings using rule-based matching"""
    # Get the question from the request
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400
    
    user_message = data['message']
    
    # Get all listings from database
    listings = Listing.query.all()
    listings_data = [listing.to_dict() for listing in listings]
    
    try:
        # Find matching listings using the rule-based system
        matches = matcher.find_matches(user_message, listings_data, top_n=5)
        
        # Generate response message
        response_message = matcher.generate_response(user_message, matches)
        
        # Get the top listing objects for the response
        top_listings = [match['listing'] for match in matches]
        
        # Return the response
        return jsonify({
            'message': response_message,
            'listings': top_listings[:3]  # Return up to 3 listings for display
        })
        
    except Exception as e:
        # Print full exception details for debugging
        print(f"Error in chat endpoint: {str(e)}")
        print(traceback.format_exc())
        
        # Handle any errors by returning a generic response
        return jsonify({
            'message': f"I'm sorry, I couldn't process that request due to an error. Please try a different search.",
            'listings': listings_data[:3] if listings_data else []
        }), 500
