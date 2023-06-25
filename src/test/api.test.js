import { App } from "../app.js";
import { expect } from 'chai';
import supertest from 'supertest';

describe('Test API', () => {
  let server;
  let app;
  let request;

  beforeEach(async () => {
    server = new App(3006);
    app = server.start();
    request = supertest(app);
  });

  afterEach(() => {
    server.stop();
  });

  describe('Petición GET a productos sin JWT', () => {
    it('Debería retornar un status 401 ya que no se tiene el token de autenticación', async () => {
      const response = await request.get('/products');
      expect(response.status).to.eql(401);
    });
  });

  describe('Creacion de usuario administrador', () => {
    it('Debería autenticar al usuario administrador para obtener un JWT válido y poder crear otro usuario administrador', async () => {
      const authResponse = await request.post('/users/login').send({
        email: 'lucas@gmail.com',
        password: '1234',
      });
      expect(authResponse.status).to.eql(200);
      const token = authResponse.body.user.token;

      const signUpResponse = await request.post('/users/signup').send({
        "names": "Test",
        "last_name": "Test",
        "phone": "45678910",
        "active": true,
        "role": "admin",
        "email": "test@gmail.com",
        "password": "1234567"
      })
        .set('Authorization', token);

      expect(signUpResponse.status).to.eql(201);
    });
  });

  describe('Autenticación de usuario y peticion GET a productos', () => {
    it('Debería autenticar al usuario para obtener un JWT válido y hacer una peticion GET a productos con éxito', async () => {
      const authResponse = await request.post('/users/login').send({
        email: 'test@gmail.com',
        password: '1234567',
      });

      expect(authResponse.status).to.eql(200);
      const token = authResponse.body.user.token;

      const response = await request.get('/products')
        .set('Authorization', token);

      expect(response.status).to.eql(200);
    });
  });

  describe('Eliminacion de usuario', () => {
    it('Debería autenticar al usuario administrador para obtener un JWT válido y eliminarlo', async () => {
      const authResponse = await request.post('/users/login').send({
        email: 'test@gmail.com',
        password: '1234567',
      });

      expect(authResponse.status).to.eql(200);
      const userId = authResponse.body.user.id
      const token = authResponse.body.user.token;

      const response = await request.delete(`/users/${userId}`)
        .set('Authorization', token);

      expect(response.status).to.eql(204);
    });
  });
});
