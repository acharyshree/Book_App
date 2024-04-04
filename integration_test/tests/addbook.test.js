const request = require('supertest');
const baseUrl = 'http://backend:4000/api';
describe('POST /addBook', () => {
    test('should add a new book successfully (assuming success)', async () => {
      const newBookData = {
        id: 1, 
        name: 'Test Book',
        description: 'This is a test book description',
        count: 5,
        author: 'Test Author',
        genre: 'Fiction',
      };
  
      const response = await request(baseUrl)
        .post('/addBook')
        .send(newBookData);
  
      expect(response.status).toBe(201); 
      expect(response.body).toHaveProperty('message');
    },10000);
  
    test('should return error for invalid request (assuming error handling)', async () => {
      const invalidData = { name: 'Missing data' }; // Invalid book data
  
      const response = await request(baseUrl)
        .post('/addBook')
        .send(invalidData);
  
      expect(response.status).toBeGreaterThanOrEqual(400); // Expect error code (400 or above)
      expect(response.body).toHaveProperty('message'); // May contain error message
    },10000);
  });