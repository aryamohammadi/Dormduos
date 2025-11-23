#!/usr/bin/env node

/**
 * Test script to create a listing in production
 * Usage: node scripts/test-create-listing.js <email> <password>
 */

const API_BASE_URL = process.env.API_URL || 'https://backend-api-production-cc33.up.railway.app/api';

async function testCreateListing() {
  const email = process.argv[2] || 'aryamshahi@gmail.com';
  const password = process.argv[3] || 'A1382rya@';

  console.log('🧪 Testing listing creation in production...\n');
  console.log('API Base URL:', API_BASE_URL);
  console.log('Email:', email);
  console.log('');

  try {
    // Step 1: Login to get token
    console.log('📝 Step 1: Logging in...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.error('❌ Login failed:', error);
      process.exit(1);
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login successful');
    console.log('Token preview:', token.substring(0, 20) + '...');
    console.log('');

    // Step 2: Create a test listing
    console.log('📝 Step 2: Creating test listing...');
    const listingData = {
      title: 'Test Listing - ' + new Date().toISOString(),
      description: 'This is a test listing created by the test script',
      price: 1200,
      bedrooms: 2,
      bathrooms: 1,
      address: '123 Test Street, Riverside, CA 92507',
      distance_from_campus: '0.5 miles',
      parking_type: 'street',
      amenities: ['wifi', 'parking'],
      lease_terms: ['semester', 'academic_year'],
    };

    console.log('Listing data:', JSON.stringify(listingData, null, 2));
    console.log('');

    const createResponse = await fetch(`${API_BASE_URL}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(listingData),
    });

    console.log('Response status:', createResponse.status, createResponse.statusText);
    console.log('Response headers:', Object.fromEntries(createResponse.headers.entries()));
    console.log('');

    const responseData = await createResponse.json();
    
    if (!createResponse.ok) {
      console.error('❌ Failed to create listing:');
      console.error(JSON.stringify(responseData, null, 2));
      process.exit(1);
    }

    console.log('✅ Listing created successfully!');
    console.log(JSON.stringify(responseData, null, 2));

    // Step 3: Verify by fetching my listings
    console.log('');
    console.log('📝 Step 3: Verifying listing was created...');
    const myListingsResponse = await fetch(`${API_BASE_URL}/listings/my`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (myListingsResponse.ok) {
      const myListings = await myListingsResponse.json();
      console.log('✅ Found', myListings.listings?.length || 0, 'listings');
      if (myListings.listings && myListings.listings.length > 0) {
        console.log('Latest listing:', myListings.listings[0].title);
      }
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testCreateListing();

