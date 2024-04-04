const request = require('supertest');
const baseUrl = 'http://localhost:4000/api'; // Adjust path to your backend server

describe('POST /signup', () => {
  test('should register a user with valid credentials', async () => {
    const credentials = {
      name: "tests",
      email: 'tests@gmail.com',
      password: 'tests',
    };

    // Use the correct endpoint for signup
    const response = await request(baseUrl)
      .post('/signup') // Use '/registerUser' instead of '/signup'
      .send(credentials)
      .expect(201);

    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('user');
  });

  test('should return 400 for missing required fields', async () => {
    // Provide a more relevant test case for missing fields
    const incompleteCredentials = {
      email: 'test7@gmail.com',
      // Missing name and password
    };

    const response = await request(baseUrl)
      .post('/signup')
      .send(incompleteCredentials)
      .expect(400);

    expect(response.body).toHaveProperty('message', 'Enter valid credentials');
  });

  test('should return 400 for duplicate email', async () => {
    // Include a test for duplicate email
    const credentials = {
      name: "tests",
      email: 'tests@gmail.com',
      password: 'tests',
    };

    // Register the user first
    await request(baseUrl)
      .post('/signup')
      .send(credentials);

    const response = await request(baseUrl)
      .post('/signup')
      .send(credentials)
      .expect(400);

    expect(response.body).toHaveProperty('message', 'User with this email already exists');
  });
});
