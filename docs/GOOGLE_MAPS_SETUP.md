# Setting Up Google Maps Integration

UCR HousingConnect uses Google Maps to display property listings on an interactive map. This guide will help you set up Google Maps for your local development environment.

## Getting a Google Maps API Key (Required)

For the full Google Maps experience with all features like satellite view and distance calculations, follow these steps:

1. **Create a Google Cloud Project**:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Required APIs**:

   - In your project, go to "APIs & Services" > "Library"
   - Search for and enable the following APIs:
     - Maps JavaScript API
     - Directions API
     - Places API (if you're using address autocomplete)

3. **Create API Key**:

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Your new API key will appear in a popup

4. **Set Restrictions** (for security):

   - After creating the key, click "Edit API key"
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domains (for local development, add `localhost`, `127.0.0.1`)
   - Under "API restrictions", restrict the key to the APIs you enabled

5. **Add to Environment Variables**:
   - Copy your API key
   - Add it to your `.env` file:
   ```
   GOOGLE_MAPS_API_KEY=your-api-key-here
   ```

## Troubleshooting

### Maps Not Loading

1. **Check your API key**: Make sure it's correctly set in your `.env` file
2. **Check API restrictions**: If you've restricted your API key, make sure your domain/IP is allowed
3. **Check console errors**: Open browser developer tools to see any JavaScript errors
4. **Check API quotas**: If you've exceeded your free quota, you may need to enable billing

### "For development purposes only" Watermark

If you see a watermark on your map saying "For development purposes only", it means either:

- You haven't set up billing for your Google Cloud project
- You recently set up the project and it's still in the verification period

For local development, this watermark is harmless and can be ignored.

## Usage in Templates

The Google Maps integration is already set up in the application templates. You don't need to make any changes unless you want to customize the map appearance or behavior.

To add a map to a new page:

1. Create a container element with an ID (e.g., `<div id="map" style="height: 400px;"></div>`)
2. Include the Google Maps script with your API key
3. Initialize the map in your JavaScript

See the existing templates for examples of how to implement maps in different scenarios.
