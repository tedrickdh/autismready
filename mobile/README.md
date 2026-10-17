# AutismReady Expo app
Run from repository root:
```sh
cd mobile
npm install
npx expo start
```
For iOS builds:
```sh
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform ios --profile preview
```
This is a first mobile shell for testing, not a store-ready native product. The current website Stripe checkout is not configured for app-store digital-goods requirements. Add native features, branding, in-app purchase handling and thorough testing before submission.