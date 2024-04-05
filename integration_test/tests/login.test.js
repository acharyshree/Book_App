const request = require('supertest');
const baseUrl = 'http://localhost:4000/api';  // Adjust path to your backend server

describe('POST /login', () => {
    test('should login a user with valid credentials', async () => {
        const credentials = { email: 'test1@gmail.com', password: 'test1' };
        const response = await request(baseUrl)
            .post('/login')
            .send(credentials)
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('user');
    },10000);

    test('should return 401 for invalid credentials', async () => {
        const invalidCredentials = { email: 'invalid@example.com', password: 'wrongpassword' };
        const response = await request(baseUrl)
            .post('/login')
            .send(invalidCredentials)
            .expect(404);

        expect(response.body).toHaveProperty('message', 'Invalid Email or password');
    },10000);
    
    test('should return 401 for invalid credentials', async () => {
        const invalidCredentials = { email: 'invalid@example.com', password: 'wrongpassword' };
        const response = await request(baseUrl)
            .post('/login')
            .send(invalidCredentials)
            .expect(404);

        expect(response.body).toHaveProperty('message', 'Invalid Email or password');
    },10000);
    
});
