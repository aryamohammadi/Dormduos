#!/usr/bin/env node

/**
 * Seed script to create sample listings for demonstration purposes
 * These listings are visible to recruiters and showcase the platform
 */

const path = require('path');

// Change to backend directory to use its node_modules
const backendPath = path.join(__dirname, '..', 'backend');
process.chdir(backendPath);

// Now require modules from backend
require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require(path.join(backendPath, 'models', 'Listing'));
const Landlord = require(path.join(backendPath, 'models', 'Landlord'));
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI or MONGO_URL not found in environment variables');
  console.error('Please set MONGODB_URI in backend/.env or as an environment variable');
  process.exit(1);
}

// Sample listings data with realistic UCR area addresses
const sampleListings = [
  {
    title: 'Spacious 2BR Apartment Near UCR Campus',
    description: 'Beautiful 2-bedroom, 1-bathroom apartment located just 0.3 miles from UCR campus. Walking distance to campus, grocery stores, and restaurants. Recently renovated with modern appliances. Perfect for students looking for a quiet, comfortable living space. Includes parking space and utilities.',
    price: 1250,
    bedrooms: 2,
    bathrooms: 1,
    address: '1245 University Avenue, Riverside, CA 92507',
    distance_from_campus: '0.3 miles',
    amenities: ['parking', 'wifi', 'utilities_included', 'air_conditioning', 'heating', 'laundry'],
    lease_terms: ['semester', 'academic_year'],
    parking_type: 'driveway',
    campus_proximity: {
      walking_distance: true,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-01-15')
  },
  {
    title: 'Modern 3BR House with Garage - Great for Roommates',
    description: 'Large 3-bedroom, 2-bathroom house perfect for a group of students. Features include garage parking, large backyard, updated kitchen with dishwasher, and in-unit laundry. Located in a quiet neighborhood just 0.8 miles from campus. Close to public transportation and shopping centers.',
    price: 2400,
    bedrooms: 3,
    bathrooms: 2,
    address: '2847 Canyon Crest Drive, Riverside, CA 92507',
    distance_from_campus: '0.8 miles',
    amenities: ['parking', 'wifi', 'utilities_included', 'furnished', 'laundry', 'air_conditioning', 'heating', 'dishwasher', 'microwave'],
    lease_terms: ['academic_year', 'yearly'],
    parking_type: 'garage',
    campus_proximity: {
      walking_distance: false,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-02-01')
  },
  {
    title: 'Cozy 1BR Studio Apartment - Perfect for Graduate Students',
    description: 'Compact and affordable 1-bedroom studio apartment ideal for graduate students or single professionals. Includes all utilities, high-speed internet, and access to on-site laundry facilities. Located 0.5 miles from campus with easy access to bus routes. Pet-friendly building with bike storage available.',
    price: 950,
    bedrooms: 1,
    bathrooms: 1,
    address: '892 Magnolia Avenue, Riverside, CA 92501',
    distance_from_campus: '0.5 miles',
    amenities: ['wifi', 'utilities_included', 'laundry', 'air_conditioning', 'heating', 'bike_storage', 'pet_friendly'],
    lease_terms: ['semester', 'monthly'],
    parking_type: 'street',
    campus_proximity: {
      walking_distance: true,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-01-20')
  },
  {
    title: 'Luxury 4BR Home with Pool - Premium Student Housing',
    description: 'Stunning 4-bedroom, 3-bathroom home with private pool and large backyard. Perfect for students who want premium living. Features include garage parking for 2 cars, fully furnished rooms, modern kitchen with all appliances, and spacious common areas. Located 1.2 miles from campus in an upscale neighborhood.',
    price: 3200,
    bedrooms: 4,
    bathrooms: 3,
    address: '4563 Canyon View Drive, Riverside, CA 92507',
    distance_from_campus: '1.2 miles',
    amenities: ['parking', 'wifi', 'utilities_included', 'furnished', 'laundry', 'air_conditioning', 'heating', 'dishwasher', 'microwave', 'pool', 'gym_access'],
    lease_terms: ['academic_year', 'yearly'],
    parking_type: 'garage',
    campus_proximity: {
      walking_distance: false,
      bike_friendly: true,
      near_bus_stop: false
    },
    available_date: new Date('2025-02-15')
  },
  {
    title: 'Affordable 2BR Duplex - Great Value Near Campus',
    description: 'Well-maintained 2-bedroom, 1-bathroom duplex unit offering excellent value. Includes covered parking, utilities, and high-speed internet. Located 0.6 miles from campus with easy walking or biking access. Quiet neighborhood with friendly neighbors. Perfect for students on a budget.',
    price: 1100,
    bedrooms: 2,
    bathrooms: 1,
    address: '1873 Blaine Street, Riverside, CA 92507',
    distance_from_campus: '0.6 miles',
    amenities: ['parking', 'wifi', 'utilities_included', 'air_conditioning', 'heating'],
    lease_terms: ['semester', 'academic_year'],
    parking_type: 'covered',
    campus_proximity: {
      walking_distance: true,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-01-25')
  },
  {
    title: 'Charming 3BR Bungalow with Yard - Family Friendly',
    description: 'Beautiful 3-bedroom, 2-bathroom bungalow with large front and back yards. Ideal for students with families or those who want extra space. Features include driveway parking, updated kitchen, hardwood floors, and plenty of storage. Located 1.0 mile from campus in a family-friendly neighborhood.',
    price: 2200,
    bedrooms: 3,
    bathrooms: 2,
    address: '3298 Lemon Street, Riverside, CA 92501',
    distance_from_campus: '1.0 mile',
    amenities: ['parking', 'wifi', 'utilities_included', 'laundry', 'air_conditioning', 'heating', 'dishwasher', 'pet_friendly'],
    lease_terms: ['academic_year', 'yearly'],
    parking_type: 'driveway',
    campus_proximity: {
      walking_distance: false,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-02-10')
  },
  {
    title: 'Efficient 1BR Apartment - All Utilities Included',
    description: 'Modern 1-bedroom apartment with all utilities and internet included in rent. Features updated appliances, central air conditioning, and on-site laundry facilities. Located 0.4 miles from campus with excellent walkability score. Close to restaurants, coffee shops, and grocery stores.',
    price: 1050,
    bedrooms: 1,
    bathrooms: 1,
    address: '2156 University Avenue, Riverside, CA 92507',
    distance_from_campus: '0.4 miles',
    amenities: ['wifi', 'utilities_included', 'laundry', 'air_conditioning', 'heating', 'microwave'],
    lease_terms: ['semester', 'monthly'],
    parking_type: 'street',
    campus_proximity: {
      walking_distance: true,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-01-30')
  },
  {
    title: 'Roommate-Friendly 4BR House - Split the Cost',
    description: 'Large 4-bedroom, 2.5-bathroom house perfect for a group of 4 roommates. Each bedroom is spacious with good natural light. Shared kitchen and living areas are well-maintained. Includes garage parking, backyard, and all major appliances. Located 0.9 miles from campus.',
    price: 2800,
    bedrooms: 4,
    bathrooms: 2.5,
    address: '5127 Canyon Crest Drive, Riverside, CA 92507',
    distance_from_campus: '0.9 miles',
    amenities: ['parking', 'wifi', 'utilities_included', 'laundry', 'air_conditioning', 'heating', 'dishwasher', 'microwave', 'study_room'],
    lease_terms: ['academic_year', 'yearly'],
    parking_type: 'garage',
    campus_proximity: {
      walking_distance: false,
      bike_friendly: true,
      near_bus_stop: true
    },
    available_date: new Date('2025-02-05')
  }
];

async function seedListings() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000
    });
    console.log('✅ Connected to MongoDB');

    // Find or create admin landlord
    let adminLandlord = await Landlord.findOne({ email: 'admin@test.com' });
    
    if (!adminLandlord) {
      console.log('👤 Creating admin landlord account...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      adminLandlord = new Landlord({
        email: 'admin@test.com',
        password: hashedPassword,
        name: 'Admin User',
        phone: '(555) 123-4567',
        isActive: true
      });
      await adminLandlord.save();
      console.log('✅ Admin landlord created');
    } else {
      console.log('✅ Admin landlord already exists');
    }

    // Delete existing listings from admin@test.com
    const deletedCount = await Listing.deleteMany({ 
      contact_email: 'admin@test.com' 
    });
    console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing listings from admin@test.com`);

    // Create new listings
    console.log(`📝 Creating ${sampleListings.length} sample listings...`);
    const createdListings = [];

    for (const listingData of sampleListings) {
      const listing = new Listing({
        ...listingData,
        landlord: adminLandlord._id,
        contact_email: 'admin@test.com',
        contact_phone: adminLandlord.phone,
        status: 'active',
        views: Math.floor(Math.random() * 50), // Random views between 0-50
        featured: Math.random() > 0.7 // 30% chance of being featured
      });

      await listing.save();
      createdListings.push(listing);
      console.log(`  ✅ Created: ${listing.title}`);
    }

    console.log(`\n🎉 Successfully created ${createdListings.length} listings!`);
    console.log(`📊 Summary:`);
    console.log(`   - Total listings: ${createdListings.length}`);
    console.log(`   - Price range: $${Math.min(...createdListings.map(l => l.price))} - $${Math.max(...createdListings.map(l => l.price))}`);
    console.log(`   - Bedrooms: ${[...new Set(createdListings.map(l => l.bedrooms))].join(', ')}`);
    console.log(`   - All listings are active and visible`);
    console.log(`\n🔗 View listings at: https://www.dormduos.com/listings`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding listings:', error);
    console.error('Error details:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

seedListings();

