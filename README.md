# Volunteam App

## Project Scope
This project provides a mobile application that enables users to browse, view, and interact with event-related information. It integrates map functionality, user authentication, caching utilities, and external APIs for retrieving data and uploading images.

Key components:
- Interactive map for event visualization
- Login and authentication flow
- Local caching fallback for network requests
- Image upload support through external providers

## Setting up the fake API (json-server)

Update the file `src/services/api.ts`.

Before running your 'json-server', get your computer's IP address and update your baseURL to `http://your_ip_address_here:3333` and then run:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth
```

To access your server online without running json-server locally, you can set your baseURL to:

```
https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>
```

To use `my-json-server`, make sure your `db.json` is located at the repo root.

## Setting up the image upload API

Update the file `src/services/imageApi.ts`.

You can use any hosting service of your preference. In this case, we will use ImgBB API: https://api.imgbb.com/.
Sign up for free at https://imgbb.com/signup, get your API key and add it to the .env file in your root folder.

To run the app in your local environment, you will need to set the IMGBB_API_KEY when starting the app using:

```
IMGBB_API_KEY="insert_your_api_key_here" npx expo start
```

When creating your app build or publishing, import your secret values to EAS running:

```
eas secret:push
```

## Running the App in Development
To run the application in a local development environment:

1. Ensure the fake API is running using the json-server instructions above.
2. Start the Expo development server:
   IMGBB_API_KEY="insert_your_api_key_here" npx expo start

1. 
## Running the App
Once the development environment is active:

1. Use Expo Go (mobile app) to scan the QR code shown in the terminal or browser.
2. The app will load and connect to your configured mock API.
3. Ensure your device is on the same network as your development machine to avoid connection issues.
