from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, abort
from app.models import Listing, Amenity
from app import db
from datetime import datetime
import re
import json
from app.utils import geocode_address

# Create a blueprint for listing routes
listing_bp = Blueprint('listing', __name__, url_prefix='/listing')

@listing_bp.route('/<int:listing_id>')
def view(listing_id):
    """View a single listing's details"""
    listing = Listing.query.get_or_404(listing_id)
    return render_template('listing/detail.html', listing=listing)

@listing_bp.route('/new', methods=['GET', 'POST'])
def new():
    """Form for submitting a new listing"""
    if request.method == 'POST':
        # Get form data
        title = request.form.get('title')
        description = request.form.get('description')
        address = request.form.get('address')
        price = request.form.get('price')
        is_multi_unit = 'is_multi_unit' in request.form
        property_type = request.form.get('property_type')
        available_date = request.form.get('available_date')
        contact_email = request.form.get('contact_email')
        contact_phone = request.form.get('contact_phone')
        amenity_ids = request.form.getlist('amenities')
        
        # Basic validation
        errors = []
        if not title or not description or not address or not price:
            errors.append("Required fields missing")
        if not re.match(r"[^@]+@[^@]+\.[^@]+", contact_email):
            errors.append("Invalid email address")
        
        if errors:
            # If validation fails, return to form with errors
            amenities = Amenity.query.all()
            return render_template('listing/new.html', 
                                  amenities=amenities, 
                                  errors=errors, 
                                  form=request.form)
        
        # Convert string values to appropriate types
        try:
            price = float(price)
            available_date = datetime.strptime(available_date, '%Y-%m-%d').date() if available_date else None
            
            # Handle regular vs. multi-unit property differently
            if not is_multi_unit:
                bedrooms = int(request.form.get('bedrooms'))
                bathrooms = float(request.form.get('bathrooms'))
                square_feet = int(request.form.get('square_feet')) if request.form.get('square_feet') else None
            else:
                # For multi-unit properties, get min/max values
                min_bedrooms = int(request.form.get('min_bedrooms')) if request.form.get('min_bedrooms') else None
                max_bedrooms = int(request.form.get('max_bedrooms')) if request.form.get('max_bedrooms') else None
                min_bathrooms = float(request.form.get('min_bathrooms')) if request.form.get('min_bathrooms') else None
                max_bathrooms = float(request.form.get('max_bathrooms')) if request.form.get('max_bathrooms') else None
                # Default values for required fields
                bedrooms = min_bedrooms or 1
                bathrooms = min_bathrooms or 1.0
                square_feet = None
                
                # Process unit options if available
                unit_options_json = request.form.get('unit_options')
                unit_options = json.loads(unit_options_json) if unit_options_json else []
        except ValueError:
            amenities = Amenity.query.all()
            return render_template('listing/new.html', 
                                  amenities=amenities, 
                                  errors=["Invalid numeric values"], 
                                  form=request.form)
        except json.JSONDecodeError:
            amenities = Amenity.query.all()
            return render_template('listing/new.html', 
                                  amenities=amenities, 
                                  errors=["Invalid unit options format"], 
                                  form=request.form)
        
        # Geocode the address to get latitude and longitude
        lat, lng = geocode_address(address)
        
        # Create new listing
        listing = Listing(
            title=title,
            description=description,
            address=address,
            price=price,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
            square_feet=square_feet,
            property_type=property_type,
            available_date=available_date,
            latitude=lat,
            longitude=lng,
            contact_email=contact_email,
            contact_phone=contact_phone,
            is_multi_unit=is_multi_unit
        )
        
        # Add multi-unit specific fields if applicable
        if is_multi_unit:
            listing.min_bedrooms = min_bedrooms
            listing.max_bedrooms = max_bedrooms
            listing.min_bathrooms = min_bathrooms
            listing.max_bathrooms = max_bathrooms
            if unit_options:
                listing.unit_options_list = unit_options
        
        # Add amenities
        if amenity_ids:
            amenities = Amenity.query.filter(Amenity.id.in_(amenity_ids)).all()
            listing.amenities = amenities
        
        # Save to database
        db.session.add(listing)
        db.session.commit()
        
        flash("Listing successfully created!", "success")
        return redirect(url_for('listing.view', listing_id=listing.id))
    
    # GET request - show form
    amenities = Amenity.query.all()
    return render_template('listing/new.html', amenities=amenities)

@listing_bp.route('/<int:listing_id>/edit', methods=['GET', 'POST'])
def edit(listing_id):
    """Edit an existing listing"""
    listing = Listing.query.get_or_404(listing_id)
    
    # Verify ownership (could be based on session data, email verification, etc.)
    # This is a placeholder for future authentication
    # In a real app, you would check if the current user owns the listing
    
    if request.method == 'POST':
        # Get form data
        title = request.form.get('title')
        description = request.form.get('description')
        address = request.form.get('address')
        price = request.form.get('price')
        is_multi_unit = 'is_multi_unit' in request.form
        property_type = request.form.get('property_type')
        available_date = request.form.get('available_date')
        contact_email = request.form.get('contact_email')
        contact_phone = request.form.get('contact_phone')
        amenity_ids = request.form.getlist('amenities')
        
        # Basic validation
        errors = []
        if not title or not description or not address or not price:
            errors.append("Required fields missing")
        if not re.match(r"[^@]+@[^@]+\.[^@]+", contact_email):
            errors.append("Invalid email address")
        
        if errors:
            # If validation fails, return to form with errors
            amenities = Amenity.query.all()
            return render_template('listing/edit.html', 
                                  listing=listing,
                                  amenities=amenities, 
                                  errors=errors, 
                                  form=request.form)
        
        # Convert string values to appropriate types
        try:
            price = float(price)
            available_date = datetime.strptime(available_date, '%Y-%m-%d').date() if available_date else None
            
            # Handle regular vs. multi-unit property differently
            if not is_multi_unit:
                bedrooms = int(request.form.get('bedrooms'))
                bathrooms = float(request.form.get('bathrooms'))
                square_feet = int(request.form.get('square_feet')) if request.form.get('square_feet') else None
            else:
                # For multi-unit properties, get min/max values
                min_bedrooms = int(request.form.get('min_bedrooms')) if request.form.get('min_bedrooms') else None
                max_bedrooms = int(request.form.get('max_bedrooms')) if request.form.get('max_bedrooms') else None
                min_bathrooms = float(request.form.get('min_bathrooms')) if request.form.get('min_bathrooms') else None
                max_bathrooms = float(request.form.get('max_bathrooms')) if request.form.get('max_bathrooms') else None
                # Default values for required fields
                bedrooms = min_bedrooms or 1
                bathrooms = min_bathrooms or 1.0
                square_feet = None
                
                # Process unit options if available
                unit_options_json = request.form.get('unit_options')
                unit_options = json.loads(unit_options_json) if unit_options_json else []
        except ValueError:
            amenities = Amenity.query.all()
            return render_template('listing/edit.html', 
                                  listing=listing,
                                  amenities=amenities, 
                                  errors=["Invalid numeric values"], 
                                  form=request.form)
        except json.JSONDecodeError:
            amenities = Amenity.query.all()
            return render_template('listing/edit.html', 
                                  listing=listing,
                                  amenities=amenities, 
                                  errors=["Invalid unit options format"], 
                                  form=request.form)
        
        # Only geocode if address has changed
        if address != listing.address:
            lat, lng = geocode_address(address)
            listing.latitude = lat
            listing.longitude = lng
        
        # Update listing details
        listing.title = title
        listing.description = description
        listing.address = address
        listing.price = price
        listing.property_type = property_type
        listing.available_date = available_date
        listing.contact_email = contact_email
        listing.contact_phone = contact_phone
        
        # Update multi-unit specific fields
        listing.is_multi_unit = is_multi_unit
        if is_multi_unit:
            listing.bedrooms = bedrooms
            listing.bathrooms = bathrooms
            listing.square_feet = square_feet
            listing.min_bedrooms = min_bedrooms
            listing.max_bedrooms = max_bedrooms
            listing.min_bathrooms = min_bathrooms
            listing.max_bathrooms = max_bathrooms
            if unit_options:
                listing.unit_options_list = unit_options
            else:
                listing.unit_options = None
        else:
            # Clear multi-unit fields if no longer a multi-unit property
            listing.bedrooms = bedrooms
            listing.bathrooms = bathrooms
            listing.square_feet = square_feet
            listing.min_bedrooms = None
            listing.max_bedrooms = None
            listing.min_bathrooms = None
            listing.max_bathrooms = None
            listing.unit_options = None
        
        # Update amenities
        if amenity_ids:
            amenities = Amenity.query.filter(Amenity.id.in_(amenity_ids)).all()
            listing.amenities = amenities
        else:
            listing.amenities = []
        
        # Save changes
        db.session.commit()
        
        flash("Listing successfully updated!", "success")
        return redirect(url_for('listing.view', listing_id=listing.id))
    
    # GET request - show form with current values
    amenities = Amenity.query.all()
    # Pre-populate the form with existing listing data
    form = {
        'title': listing.title,
        'description': listing.description,
        'address': listing.address,
        'price': listing.price,
        'bedrooms': listing.bedrooms,
        'bathrooms': listing.bathrooms,
        'square_feet': listing.square_feet,
        'property_type': listing.property_type,
        'is_multi_unit': listing.is_multi_unit,
        'min_bedrooms': listing.min_bedrooms,
        'max_bedrooms': listing.max_bedrooms,
        'min_bathrooms': listing.min_bathrooms,
        'max_bathrooms': listing.max_bathrooms,
        'available_date': listing.available_date.strftime('%Y-%m-%d') if listing.available_date else '',
        'contact_email': listing.contact_email,
        'contact_phone': listing.contact_phone,
        'amenities': [str(amenity.id) for amenity in listing.amenities]
    }
    
    return render_template('listing/edit.html', listing=listing, amenities=amenities, form=form)

@listing_bp.route('/<int:listing_id>/delete', methods=['POST'])
def delete(listing_id):
    """Delete a listing"""
    listing = Listing.query.get_or_404(listing_id)
    
    # Verify ownership (could be based on session data, email verification, etc.)
    # This is a placeholder for future authentication
    # In a real app, you would check if the current user owns the listing
    
    db.session.delete(listing)
    db.session.commit()
    
    flash("Listing has been deleted!", "success")
    return redirect(url_for('home.index'))
