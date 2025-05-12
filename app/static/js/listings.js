/**
 * UCR HousingConnect - Listings Management
 * Handles loading, filtering, and displaying listings
 */

// DOM elements
const listingsContainer = document.getElementById('listings-container');
const allListingsView = document.getElementById('all-listings-view');
const listingsCount = document.getElementById('listings-count');
const filterForm = document.getElementById('filter-form');
const mapToggle = document.getElementById('toggle-map');
const mapContainer = document.querySelector('.map-container');
const viewToggleButtons = document.querySelectorAll('.view-toggle');

// Global variables for map integration
const UCR_CAMPUS = { lat: 33.9737, lng: -117.3281 };
let markers = [];
let directionsService;

// Create a listing card element
function createListingCard(listing) {
    // Get template
    const template = document.getElementById('listing-template');
    if (!template) {
        console.error('Listing template not found');
        return null;
    }

    // Clone template
    const card = template.content.cloneNode(true);
    
    // Set listing data
    card.querySelector('.listing-title').textContent = listing.title;
    card.querySelector('.listing-price').textContent = '$' + listing.price.toFixed(2);
    card.querySelector('.listing-address-text').textContent = listing.address;
    card.querySelector('.listing-bedrooms-text').textContent = listing.bedrooms + ' bed';
    card.querySelector('.listing-bathrooms-text').textContent = listing.bathrooms + ' bath';
    card.querySelector('.listing-property-type-text').textContent = listing.property_type;
    card.querySelector('.listing-description').textContent = listing.description;
    
    // Set link
    const linkElement = card.querySelector('.listing-link');
    if (linkElement) linkElement.href = '/listing/' + listing.id;
    
    // Set available date if exists
    const dateElement = card.querySelector('.listing-available-date');
    if (dateElement && listing.available_date) {
        const date = new Date(listing.available_date);
        dateElement.textContent = 'Available: ' + date.toLocaleDateString();
    }
    
    // Store listing ID for marker connection
    const cardElement = card.querySelector('.listing-item');
    if (cardElement) cardElement.dataset.id = listing.id;
    
    // Highlight marker on hover
    cardElement.addEventListener('mouseenter', () => highlightMarker(listing.id));
    cardElement.addEventListener('mouseleave', () => unhighlightMarker(listing.id));
    
    return card;
}

// Load listings and add markers
async function loadListings(filters = {}) {
    // Show loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    
    // Clear containers
    if (listingsContainer) listingsContainer.innerHTML = '';
    if (allListingsView) allListingsView.innerHTML = '';
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters.min_price) queryParams.append('min_price', filters.min_price);
    if (filters.max_price) queryParams.append('max_price', filters.max_price);
    if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
    if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms);
    if (filters.property_type) queryParams.append('property_type', filters.property_type);
    if (filters.amenities) {
        filters.amenities.forEach(id => queryParams.append('amenities', id));
    }
    
    try {
        // Fetch listings from API
        const response = await fetch(`/api/listings?${queryParams.toString()}`);
        const listings = await response.json();
        
        // Clear existing markers
        clearMarkers();
        
        // Update the count display
        if (listingsCount) {
            const countText = listings.length === 0 ? 'No listings found' : 
                            listings.length === 1 ? '1 listing found' : 
                            `${listings.length} listings found`;
            listingsCount.innerHTML = `<i class="fas fa-list-ul text-ucr-blue-500 mr-1"></i> ${countText}`;
        }
        
        // Display message if no listings found
        if (listings.length === 0) {
            const noListingsMsg = `
                <div class="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-md text-center border border-yellow-200 dark:border-yellow-800">
                    <div class="text-yellow-600 dark:text-yellow-400 text-4xl mb-3">
                        <i class="fas fa-search"></i>
                    </div>
                    <p class="text-yellow-700 dark:text-yellow-300 font-medium">No listings found matching your criteria.</p>
                    <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Try adjusting your filters or check back later.</p>
                </div>
            `;
            
            if (listingsContainer) listingsContainer.innerHTML = noListingsMsg;
            if (allListingsView) allListingsView.innerHTML = noListingsMsg;
            
            if (loadingIndicator) loadingIndicator.classList.add('hidden');
            return;
        }
        
        // Process each listing
        listings.forEach((listing) => {
            // Create marker if coordinates exist and map is initialized
            if (listing.latitude && listing.longitude && typeof map !== 'undefined') {
                addPropertyMarker(listing);
            }
            
            // Create listing card for regular view
            if (listingsContainer) {
                const listingCard = createListingCard(listing);
                listingsContainer.appendChild(listingCard);
            }
            
            // Create listing card for all listings view
            if (allListingsView) {
                const allListingCard = createListingCard(listing);
                allListingsView.appendChild(allListingCard);
            }
        });
        
        // Fit map to show all markers
        if (typeof map !== 'undefined' && markers.length > 0) {
            fitMapToMarkers();
        }
        
    } catch (error) {
        console.error('Error loading listings:', error);
        const errorMsg = `
            <div class="bg-red-50 dark:bg-red-900/30 p-6 rounded-md text-center border border-red-200 dark:border-red-800">
                <div class="text-red-600 dark:text-red-400 text-4xl mb-3">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <p class="text-red-700 dark:text-red-300 font-medium">Failed to load listings.</p>
                <p class="text-sm text-red-600 dark:text-red-400 mt-1">Please try again later.</p>
            </div>
        `;
        
        if (listingsContainer) listingsContainer.innerHTML = errorMsg;
        if (allListingsView) allListingsView.innerHTML = errorMsg;
    } finally {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
}

// Google Maps integration functions
function addPropertyMarker(listing) {
    if (!map || !listing || !listing.latitude || !listing.longitude) return null;
    
    const position = { lat: listing.latitude, lng: listing.longitude };
    
    // Create marker
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: listing.title,
        animation: google.maps.Animation.DROP,
        id: listing.id
    });

    // Create info window content
    const content = `
        <div class="popup-content">
            <div class="font-bold text-ucr-blue-700">${listing.title}</div>
            <div class="text-ucr-gold-600 font-medium">$${listing.price.toFixed(2)}</div>
            <div class="text-sm text-gray-600">${listing.bedrooms} bed · ${listing.bathrooms} bath</div>
            <a href="/listing/${listing.id}" class="text-ucr-blue-500 hover:underline text-sm font-medium">View Details</a>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: content
    });

    // Add click listener
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Store marker for later access
    markers.push(marker);
    
    return marker;
}

// Clear all markers from the map
function clearMarkers() {
    if (markers.length > 0) {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
    }
}

// Fit map to show all markers
function fitMapToMarkers() {
    if (!map || markers.length === 0) return;
    
    const bounds = new google.maps.LatLngBounds();
    
    // Add UCR campus to bounds
    bounds.extend(UCR_CAMPUS);
    
    // Add all markers to bounds
    markers.forEach(marker => bounds.extend(marker.getPosition()));
    
    // Fit the map to the bounds
    map.fitBounds(bounds);
    
    // Don't zoom in too far
    const zoom = map.getZoom();
    if (zoom > 15) map.setZoom(15);
}

// Highlight marker when hovering on listing
function highlightMarker(listingId) {
    const marker = markers.find(m => m.id === parseInt(listingId));
    if (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 750);
    }
}

// Remove highlight from marker
function unhighlightMarker(listingId) {
    const marker = markers.find(m => m.id === parseInt(listingId));
    if (marker) {
        marker.setAnimation(null);
    }
}

// Calculate distance from UCR to a property
async function calculateDistanceToUCR(lat, lng) {
    if (typeof google === 'undefined' || !google.maps || !google.maps.DirectionsService) {
        return { distance: 'Unknown', duration: 'Unknown' };
    }
    
    if (!directionsService) {
        directionsService = new google.maps.DirectionsService();
    }
    
    const request = {
        origin: { lat, lng },
        destination: UCR_CAMPUS,
        travelMode: google.maps.TravelMode.DRIVING
    };

    try {
        return new Promise((resolve, reject) => {
            directionsService.route(request, function(result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0].legs[0];
                    resolve({
                        distance: route.distance.text,
                        duration: route.duration.text
                    });
                } else {
                    console.error('Error calculating distance:', status);
                    reject(new Error('Unable to calculate distance'));
                }
            });
        });
    } catch (error) {
        console.error('Error calculating distance:', error);
        return { distance: 'Error', duration: 'Error' };
    }
}

// Handle filter form submission
if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather filter values
        const filters = {
            min_price: document.getElementById('min_price').value,
            max_price: document.getElementById('max_price').value,
            bedrooms: document.getElementById('bedrooms').value,
            bathrooms: document.getElementById('bathrooms').value,
            property_type: document.getElementById('property_type').value,
            amenities: Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(el => el.value)
        };
        
        // Load filtered listings
        loadListings(filters);
    });
}

// Handle map toggle if it exists
if (mapToggle && mapContainer) {
    mapToggle.addEventListener('click', function() {
        mapContainer.classList.toggle('hidden');
        this.textContent = mapContainer.classList.contains('hidden') 
            ? 'Show Map' : 'Hide Map';
    });
}

// Handle view toggle between map and all listings
const listingsViewToggle = document.getElementById('listings-view');
if (listingsViewToggle && allListingsView) {
    listingsViewToggle.addEventListener('click', function() {
        if (allListingsView.classList.contains('active')) {
            // Switch to map view
            allListingsView.classList.remove('active');
            if (listingsContainer) listingsContainer.style.display = '';
            this.innerHTML = '<i class="fas fa-list mr-1"></i> View All Listings';
        } else {
            // Switch to all listings view
            allListingsView.classList.add('active');
            if (listingsContainer) listingsContainer.style.display = 'none';
            this.innerHTML = '<i class="fas fa-map mr-1"></i> View Map';
        }
    });
}

// Initialize function to be called when map is ready
function initializeListings() {
    console.log("Map is ready, loading listings");
    loadListings();
}

// If map is already initialized, load listings immediately
if (typeof map !== 'undefined') {
    initializeListings();
} else {
    // Otherwise wait for map ready event
    document.addEventListener('map_ready', initializeListings);
} 