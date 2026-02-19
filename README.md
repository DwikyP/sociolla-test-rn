# sociolla-test-rn

Quick setup for the React Native (Expo) demo app.

## Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Expo CLI (optional, but helpful): `npm install -g expo-cli`

## Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Install Expo packages used by the app (if prompted):

```bash
npx expo install expo-clipboard
```

(If you add other Expo native packages later, use `npx expo install` for compatibility.)

## Environment

Create a `.env` file in the project root with the server URL (you can copy `.env.example` if present):

```
EXPO_PUBLIC_SERVER_URL=http://localhost:5000
```

Note: `.env` is ignored by git by default in this project.

If you change `.env`, restart the Expo/Metro server to pick up the change.

## Run the app

Start the development server:

```bash
npx expo start
# or
npm start
```

Open on device/emulator:

```bash
npm run android
# or
npm run ios
#
npm run web
```

You can also open the project in the Expo Go app by scanning the QR code shown by `npm expo start`.

## Notes

- The project uses `expo-clipboard` for copy-to-clipboard functionality.
- Mobile-specific notifications use `ToastAndroid` (Android) and `Alert` (iOS). On web a `window.alert` is used.
- If you need a toast library for web/native styling, install one and I can wire it up.

Problems or questions? Tell me what platform you're running and any errors and I'll help debug.