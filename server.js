// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
//mongodb+srv://abc:123@cluster0.lzqc63u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// MongoDB connection (using default localhost)
mongoose.connect('mongodb+srv://abc:123@cluster0.lzqc63u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User details (replace with your actual details)
const USER_DETAILS = {
  full_name: "yash_kumar", // lowercase
  birth_date: "30122003", // ddmmyyyy
  email: "yashk6767@gmail.com",
  roll_number: "22BCT0349"
};

// Helper function to generate user_id
function generateUserId() {
  return `${USER_DETAILS.full_name}_${USER_DETAILS.birth_date}`;
}

// Helper function to categorize array elements
function categorizeData(data) {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  const allAlphabets = [];

  data.forEach(item => {
    const trimmed = item.toString().trim();
    
    // Check if it's a number
    if (/^\d+$/.test(trimmed)) {
      const num = parseInt(trimmed);
      sum += num;
      
      if (num % 2 === 0) {
        evenNumbers.push(trimmed);
      } else {
        oddNumbers.push(trimmed);
      }
    }
    // Check if it's alphabetic (single character or string)
    else if (/^[a-zA-Z]+$/.test(trimmed)) {
      alphabets.push(trimmed.toUpperCase());
      // Store individual characters for concatenation
      for (let char of trimmed) {
        allAlphabets.push(char.toLowerCase());
      }
    }
    // Special characters (anything that's not a number or alphabet)
    else {
      specialCharacters.push(trimmed);
    }
  });

  // Create alternating caps concatenation in reverse order
  const reversedAlphabets = allAlphabets.reverse();
  let concatString = '';
  reversedAlphabets.forEach((char, index) => {
    if (index % 2 === 0) {
      concatString += char.toLowerCase();
    } else {
      concatString += char.toUpperCase();
    }
  });

  return {
    oddNumbers,
    evenNumbers,
    alphabets,
    specialCharacters,
    sum: sum.toString(), // return as string
    concatString
  };
}

// POST /bfhl route
app.post('/bfhl', async (req, res) => {
  try {
    // Validate request body
    if (!req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' should be an array"
      });
    }

    const { data } = req.body;
    const categorized = categorizeData(data);

    const response = {
      is_success: true,
      user_id: generateUserId(),
      email: USER_DETAILS.email,
      roll_number: USER_DETAILS.roll_number,
      odd_numbers: categorized.oddNumbers,
      even_numbers: categorized.evenNumbers,
      alphabets: categorized.alphabets,
      special_characters: categorized.specialCharacters,
      sum: categorized.sum,
      concat_string: categorized.concatString
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// GET /bfhl route (for verification)
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "API is running",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;