# Recruiter-App

Welcome to the Candidate Management System! This application allows you to manage candidates efficiently, including adding, updating, and deleting candidates, along with calculating a computed score based on their experience.

## Setup Instructions

Follow these steps to set up and run the application locally:

### Prerequisites

- Node.js installed on your machine
- PostgreSQL database server running locally or accessible remotely
- Internet connection to fetch dependencies

### Backend Setup

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/goyalkunal151/Recruiter-App/.git

2. Navigate to the backend directory:

   ```bash
   cd Recruiter-App/server

3. Install dependencies:

   ```bash
   npm install

4. Set up the .env file:
   Create a .env file in the backend directory with the following contents:

   ```plaintext
   DB_USER="your_database_username"
   DB_PASSWORD="your_database_password"
   DB_HOST="your_database_host"
   DB_PORT=5432
   DB_NAME="your_database_name"
   PORT=4000

Replace "your_database_username", "your_database_password", "your_database_host", and "your_database_name" with your PostgreSQL database credentials.

5. Create the candidates table:
   Run the following command to create the candidates table in your database:

   ```bash
   node db.js

6. Start the backend server:

   ```bash
   nodemon index.js

   The server will start running on port 4000 by default.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../client

2. Install dependencies:

   ```bash
   npm install

3. Start the frontend development server:

   ```bash
   npm start

The frontend server will start running on port 3000 by default.

4. Open your web browser and navigate to http://localhost:3000 to access the application.

### Usage

1. Once the application is running, you can add new candidates by filling out the form on the homepage.
2. View the list of candidates with their details and computed scores.
3. Update the status of a candidate or delete a candidate as needed.


