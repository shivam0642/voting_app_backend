const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db');

dotenv.config();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

connectDB();

app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/user",require("./routes/userRoutes"))
app.use("/api/v1/candidate",require("./routes/candidateRoutes"))

app.get('/', (req, res) => {
  res.send('API is working! 🚀');
});


PORT = process.env.PORT || 3000

app.listen(PORT ,() => {
    console.log(`Server is running on port ${PORT}`);
})
