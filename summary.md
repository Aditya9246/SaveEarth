# Application Summary

This document provides a summary of the SaveEarth application, including its functionality, machine learning model, and Firebase integration.

## Application Functionality

The SaveEarth application is a mobile app designed to encourage and reward users for taking positive environmental actions. The app has the following main features:

- **User Authentication:** Users can create an account and log in using their email and password.
- **Challenges:** Users can view a list of challenges, each with a description, category, and point value.
- **Proof Submission:** To complete a challenge, users must submit a photo as proof of their action.
- **Image Validation:** The app uses a machine learning model to validate the submitted photos.
- **Passport:** Users have a "passport" that displays their completed challenges (stamps) and their overall impact.
- **Rewards:** Users can redeem their earned points for rewards.
- **Community Feed:** A feed where users can see the completed challenges of other users.
- **Team:** Users can see their team's progress and leaderboard.
- **Resource Hub:** A collection of articles and guides on how to reduce plastic and protect the oceans.

## Machine Learning Model

The application uses a machine learning model to validate the photos submitted by users as proof of completing a challenge.

- **Model:** The model used is `Xenova/owlv2-base-patch16`, a zero-shot object detection model from Hugging Face. This model can detect objects in an image based on text descriptions (queries) without being explicitly trained on those objects.

- **Validation Process:**
    1.  When a user uploads a photo, it is sent to the server along with a set of queries related to the challenge.
    2.  The server uses the machine learning model to detect objects in the photo that match the queries.
    3.  The model returns a list of detected objects with a confidence score for each.
    4.  The server checks if the confidence score of the detected objects is above a certain threshold.
    5.  If the score is high enough, the submission is considered valid, and the user is awarded the points for the challenge.

- **Server-Side Implementation:**
    - The validation logic is implemented in an Express.js server (`src/server/server.js`).
    - The server uses the `multer` library to handle file uploads.
    - The machine learning model is loaded using the `@xenova/transformers` library. A singleton pattern is used to ensure the model is loaded only once.
    - A script (`src/server/download-model.mjs`) is provided to download and cache the model locally.

## Firebase Integration

The application uses Firebase for user authentication and as a real-time database for storing the challenges.

- **Firebase Authentication:**
    - The `firebase/auth` module is used to handle user authentication.
    - The `OnboardingScreen.tsx` component provides the UI for users to sign up and sign in with their email and password.
    - The `createUserWithEmailAndPassword` and `signInWithEmailAndPassword` functions are used to create and authenticate users.

- **Firebase Realtime Database:**
    - The `firebase/database` module is used to interact with the Realtime Database.
    - The list of challenges is stored in the database.
    - The `useChallenges.ts` custom hook fetches the challenges from the database using the `onValue` function, which listens for real-time updates.
    - This allows the challenges to be updated in the app without requiring a full app update.