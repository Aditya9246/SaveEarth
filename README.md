# SaveEarth: An Eco-Conscious Mobile App

This is the repository for the SaveEarth mobile application, a platform designed to encourage and reward users for taking positive environmental actions. Users can participate in challenges, track their progress, and earn rewards for their contributions to a healthier planet.

The original project design can be found on Figma at [https://www.figma.com/design/8LZeuVJY5Hvdr1lU6qBlnK/EcoPassport-Mobile-App-UI](https://www.figma.com/design/8LZeuVJY5Hvdr1lU6qBlnK/EcoPassport-Mobile-App-UI).

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm: [https://nodejs.org/](https://nodejs.org/)
- Docker and Docker Compose: [https://www.docker.com/get-started](https://www.docker.com/get-started)

### Installation and Running the App

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/SaveEarth.git
    cd SaveEarth
    ```

2.  **Install client-side dependencies:**
    ```bash
    npm install
    ```

3.  **Install server-side dependencies:**
    ```bash
    cd src/server
    npm install
    cd ../..
    ```

4.  **Download the machine learning model:**
    The validation server uses a machine learning model to verify user submissions. Download the model using the provided script:
    ```bash
    node src/server/download-model.mjs
    ```


## Running with Docker

This project can be run in a Docker container.

1.  **Build the Docker image and run the container:**
    Make sure you have downloaded the model first by running `node src/server/download-model.mjs`.
    ```bash
    docker-compose up -d
    ```
2.  The application will be available at [http://localhost:3000](http://localhost:3001).