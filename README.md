A secure and scalable backend for a voting web application. This project is built using Node.js, Express.js, and MongoDB. It includes user authentication, protected routes, and voting functionality to ensure fair and transparent elections.

**Features**

>>User Authentication
1.Signup & Login with JWT-based authentication
2.Password hashing using bcrypt

>>Voting System
1.One vote per user per election
2.Protected voting route with middleware

>>Prevents duplicate voting
1.User Roles
2.User: can vote
3.Admin: can create elections, add candidates, view results

>>Results
1.Real-time vote count for candidates
2.Restricted to admin access

>>Security
1.JWT authentication
2.Input validation
3.Middleware-protected routes


**Tech Stack**

>>Backend Framework: Node.js, Express.js
>>Database: MongoDB (Mongoose ODM)
>>Authentication: JWT, bcrypt
>>Environment Management: dotenv
>>API Testing: Postman


voting-app-backend
├── 📁 config        # Database connection & environment configs
├── 📁 controllers  # Route logic (auth, voting, election, etc.)
├── 📁 middlewares  # Auth middleware, validation
├── 📁 models       # Mongoose schemas (User, Election, Candidate, Vote)
├── 📁 routes       # API routes
├── server.js       # Entry point of the application
├── package.json
└── .env.example 

**Installation & Setup**

>>Clone the repository

git clone https://github.com/your-username/voting-app-backend.git
cd voting-app-backend

>>Install dependencies

npm install


>>Setup environment variables

Create a .env file in the root folder

Add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


>>Run the server

npm start


Server will run at: http://localhost:5000


**API Endpoints**

>>Authentication
-POST /api/auth/signup → Register a new user
-POST /api/auth/login → Login and get JWT token

>>Voting
-POST /api/vote/:electionId/:candidateId → Cast a vote (auth required)

>>Elections (Admin only)
-POST /api/elections → Create a new election
-GET /api/elections/:id/results → Get election results


**Testing**

>>Use Postman to test the APIs:
-Import the routes
-Generate a token via login
-Use the token in Authorization: Bearer <token> header for protected routes

**License**
This project is licensed under the MIT License.
