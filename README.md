### SeaScore / SaveEarth 🌍

An eco-conscious mobile app that rewards users for taking real environmental action.

## 🚀 Project Overview

SeaScore (also called SaveEarth) is a mobile app designed to encourage users to reduce plastic waste and protect the oceans. Users complete real-world sustainability challenges, upload photo proof, earn points, unlock rewards, and join a community of environmentally active people.

The goal:
Turn sustainability into a fun, social, and rewarding experience.

## 🧰 Tech Stack

Frontend: React Native (Expo)
Backend: Node.js + Express
Machine Learning: Xenova OWLv2 Zero-Shot Detection
Auth & Database: Firebase Authentication + Firebase Realtime Database
Deployment: Docker + Docker Compose
Upload Handling: multer
Model Runtime: @xenova/transformers
Design: Figma UI

## ⚙️ Setup Instructions
Prerequisites

Node.js + npm

## Docker + Docker Compose

1. Clone the repository
git clone https://github.com/your-username/SaveEarth.git
cd SaveEarth

2. Install dependencies

Client:

npm install


Server:

cd src/server
npm install
cd ../..

3. Download the ML model
node src/server/download-model.mjs

4. Run locally
npm start

## 🐳 Running with Docker

Make sure the model is downloaded first:

node src/server/download-model.mjs
docker-compose up -d


App will be available at:
http://localhost:3000
---

## 🌟 Key Features

### 👤 User Authentication

Users sign up and log in using Firebase Auth.

### 🏆 Challenge System

Each challenge includes:

* A description
* A category (example: recycling, cleanup)
* A point value

### 📸 Proof Submission + ML Validation

Users upload a photo to complete challenges. The backend uses a zero-shot model to verify the action before awarding points.

### 🧠 Zero-Shot Object Detection Model

* Model: `Xenova/owlv2-base-patch16`
* Can detect objects based on text prompts
* Does *not* require retraining for each challenge

### ✈️ Passport

Users collect stamps for completed challenges and see their total impact.

### 🎁 Rewards

Points can be exchanged for rewards.

### 📣 Community Feed

Real-time feed showing completed challenges across the community.

### 👥 Team Leaderboard

Users can join teams and compete on scoreboards.

### 📚 Resource Hub

Educational content for reducing plastic waste and protecting the oceans.

---

## 🧠 How Image Validation Works

1. User uploads image
2. Server receives image + challenge keywords
3. ML model runs zero-shot detection
4. The model returns a confidence score
5. If above threshold → challenge is marked complete

### Server Implementation

* Express.js API
* `multer` handles file uploads
* `@xenova/transformers` loads ML model
* Singleton pattern ensures performance
* Script: `src/server/download-model.mjs` caches model locally

---

## 🔥 Challenges & Future Enhancements

### Challenges

* Efficient ML inference on low-power devices
* Handling edge case submissions
* Balancing strictness vs usability in validation
* Optimizing performance and model load times

### Future Enhancements

* Train a custom sustainability-focused model
* AI-based suggestions & challenge personalization
* Offline mode
* Public sharing of completed challenges
* Better reward marketplace
* Brand partnerships for eco-rewards
* Carbon impact tracker
* Team chat system

---

## 🎨 Design Reference

Figma UI:
[https://www.figma.com/design/8LZeuVJY5Hvdr1lU6qBlnK/EcoPassport-Mobile-App-UI](https://www.figma.com/design/8LZeuVJY5Hvdr1lU6qBlnK/EcoPassport-Mobile-App-UI)

---
