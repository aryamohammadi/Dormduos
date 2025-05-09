from app import db
from datetime import datetime
import json

# Many-to-many relationship table for listings and amenities
listing_amenities = db.Table('listing_amenities',
    db.Column('listing_id', db.Integer, db.ForeignKey('listing.id'), primary_key=True),
    db.Column('amenity_id', db.Integer, db.ForeignKey('amenity.id'), primary_key=True)
)

class Listing(db.Model):
    """Housing listing model representing available properties"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Float, nullable=False)
    
    # New fields for multi-unit properties (apartment complexes)
    min_bedrooms = db.Column(db.Integer, nullable=True)
    max_bedrooms = db.Column(db.Integer, nullable=True)
    min_bathrooms = db.Column(db.Float, nullable=True)
    max_bathrooms = db.Column(db.Float, nullable=True)
    is_multi_unit = db.Column(db.Boolean, default=False)
    unit_options = db.Column(db.Text, nullable=True)  # Stored as JSON
    
    square_feet = db.Column(db.Integer, nullable=True)
    property_type = db.Column(db.String(50), nullable=False)  # apartment, house, room, etc.
    available_date = db.Column(db.Date, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    contact_email = db.Column(db.String(100), nullable=False)
    contact_phone = db.Column(db.String(20), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    amenities = db.relationship('Amenity', secondary=listing_amenities, 
                                lazy='subquery', backref=db.backref('listings', lazy=True))
    
    def __repr__(self):
        return f'<Listing {self.title} - ${self.price}>'
    
    @property
    def unit_options_list(self):
        """Returns the unit options as a list of dictionaries"""
        if not self.unit_options:
            return []
        try:
            return json.loads(self.unit_options)
        except:
            return []
    
    @unit_options_list.setter
    def unit_options_list(self, options):
        """Sets the unit options from a list of dictionaries"""
        if options:
            self.unit_options = json.dumps(options)
        else:
            self.unit_options = None
    
    def to_dict(self):
        """Convert listing to dictionary for JSON responses"""
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'address': self.address,
            'price': self.price,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'square_feet': self.square_feet,
            'property_type': self.property_type,
            'available_date': self.available_date.isoformat() if self.available_date else None,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'amenities': [amenity.name for amenity in self.amenities],
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
        
        # Add multi-unit data if applicable
        if self.is_multi_unit:
            data.update({
                'is_multi_unit': True,
                'min_bedrooms': self.min_bedrooms,
                'max_bedrooms': self.max_bedrooms,
                'min_bathrooms': self.min_bathrooms,
                'max_bathrooms': self.max_bathrooms,
                'unit_options': self.unit_options_list
            })
        
        return data

class Amenity(db.Model):
    """Amenity model for housing features like parking, laundry, etc."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    icon = db.Column(db.String(50), nullable=True)  # For potential UI icons
    
    def __repr__(self):
        return f'<Amenity {self.name}>'
