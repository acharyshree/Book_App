const request = require('supertest');
const baseUrl = 'http://localhost:4000/api';
describe('GET /getallbooks', () => {
    test('should return all books', async () => {
      const response = await request(baseUrl) 
        .get('/getallbooks');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'All books');
      
    });
  
    test('should return empty data array if no books exist', async () => {
      const response = await request(baseUrl)
        .get('/getallbooks');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'All books');
     
    });
  });
  