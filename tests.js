// test.js - Additional test cases for the BFHL API
const testCases = [
  {
    name: "Test Case 1 - Mixed data with multi-character strings",
    input: {
      "data": ["M", "1", "334", "4", "B", "@", "z", "7", "hello", "!"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": ["1", "7"],
      "even_numbers": ["334", "4"],
      "alphabets": ["M", "B", "Z", "HELLO"],
      "special_characters": ["@", "!"],
      "sum": "346",
      "concat_string": "oLlEhZbM" // reverse: hello,z,B,M -> h,e,l,l,o,z,b,m -> o,L,l,E,h,Z,b,M
    }
  },
  
  {
    name: "Test Case 2 - Only numbers",
    input: {
      "data": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999", 
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": ["1", "3", "5", "7", "9"],
      "even_numbers": ["2", "4", "6", "8", "10"],
      "alphabets": [],
      "special_characters": [],
      "sum": "55",
      "concat_string": ""
    }
  },
  
  {
    name: "Test Case 3 - Only alphabets",
    input: {
      "data": ["a", "B", "c", "D", "hello", "WORLD"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com", 
      "roll_number": "ABCD123",
      "odd_numbers": [],
      "even_numbers": [],
      "alphabets": ["A", "B", "C", "D", "HELLO", "WORLD"],
      "special_characters": [],
      "sum": "0",
      "concat_string": "dLrOwOlLeDcBa" // reverse: world,hello,D,c,B,a -> d,L,r,O,w,O,l,L,e,D,c,B,a
    }
  },
  
  {
    name: "Test Case 4 - Only special characters",
    input: {
      "data": ["@", "#", "$", "%", "&", "*", "(", ")", "-", "+"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123", 
      "odd_numbers": [],
      "even_numbers": [],
      "alphabets": [],
      "special_characters": ["@", "#", "$", "%", "&", "*", "(", ")", "-", "+"],
      "sum": "0",
      "concat_string": ""
    }
  },
  
  {
    name: "Test Case 5 - Complex mixed data",
    input: {
      "data": ["X", "99", "hello123", "!", "2", "world", "@", "7", "A1B2", "#"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": ["99", "7"],
      "even_numbers": ["2"],
      "alphabets": ["X", "WORLD", "A1B2"],
      "special_characters": ["hello123", "!", "@", "#"],
      "sum": "108",
      "concat_string": "bAbDlRoWx" // reverse: A1B2,world,X -> b,A,b,d,l,r,o,w,x -> b,A,b,D,l,R,o,W,x
    }
  },
  
  {
    name: "Test Case 6 - Empty array",
    input: {
      "data": []
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": [],
      "even_numbers": [],
      "alphabets": [],
      "special_characters": [],
      "sum": "0",
      "concat_string": ""
    }
  },
  
  {
    name: "Test Case 7 - Large numbers",
    input: {
      "data": ["1000", "2001", "xyz", "@", "500", "a"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": ["2001"],
      "even_numbers": ["1000", "500"],
      "alphabets": ["XYZ", "A"],
      "special_characters": ["@"],
      "sum": "3501",
      "concat_string": "aZyX" // reverse: a,xyz -> a,z,y,x -> a,Z,y,X
    }
  },
  
  {
    name: "Test Case 8 - Single character elements",
    input: {
      "data": ["z", "9", "A", "*", "3", "b", "&", "1"]
    },
    expected: {
      "is_success": true,
      "user_id": "john_doe_17091999",
      "email": "john@xyz.com",
      "roll_number": "ABCD123",
      "odd_numbers": ["9", "3", "1"],
      "even_numbers": [],
      "alphabets": ["Z", "A", "B"],
      "special_characters": ["*", "&"],
      "sum": "13",
      "concat_string": "bAz" // reverse: b,A,z -> b,A,z
    }
  }
];

// Function to run tests (for local testing)
async function runTests() {
  const axios = require('axios'); // You'll need to install axios for testing
  const baseURL = 'http://localhost:3000';
  
  console.log('Running test cases...\n');
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`Running ${testCase.name}:`);
    console.log('Input:', JSON.stringify(testCase.input, null, 2));
    
    try {
      const response = await axios.post(`${baseURL}/bfhl`, testCase.input);
      console.log('Actual Response:', JSON.stringify(response.data, null, 2));
      console.log('Expected Response:', JSON.stringify(testCase.expected, null, 2));
      console.log('---\n');
    } catch (error) {
      console.error('Test failed:', error.message);
      console.log('---\n');
    }
  }
}

module.exports = { testCases, runTests };

// To run tests, uncomment the following line and run: node test.js
runTests();