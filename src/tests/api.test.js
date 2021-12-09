const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste: Accounts', () => {
  const DBServer = new MongoMemoryServer();

  before(async () => {
    const URLMock = await DBServer.getUri();
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('When a new bank account is created', () => {
    it('When create account successfully', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '11111111111',
          password: '123456',
        });
      expect(newAccount).to.have.status(201);
      expect(newAccount.body).to.have.property('name');
      expect(newAccount.body.name).to.be.equal('Rodrigo Ruan');
    });
  });

  describe('When a new bank account is not created succesfully', () => {
    it('When post body doesn\'t include "name"', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          cpf: '11111111111',
          password: '123456',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"name" is required');
    });

    it('When "name" is empty', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: '',
          cpf: '11111111111',
          password: '123456',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal(
        '"name" is not allowed to be empty',
      );
    });

    it('When post body doesn\'t include "cpf"', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          password: '123456',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"cpf" is required');
    });

    it('When "cpf" is empty', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '',
          password: '123456',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"cpf" is not allowed to be empty');
    });

    it('When "cpf" doens\'t have length of 11', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '123',
          password: '123456',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"cpf" length must be 11 characters long');
    });

    it('When post body doesn\'t include "password"', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '11111111111',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"password" is required');
    });

    it('When "password" is empty', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '12312312312',
          password: '',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"password" is not allowed to be empty');
    });

    it('When "password" doesn\'t have length of 6', async () => {
      const newAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '12312312312',
          password: '1231',
        });
      expect(newAccount).to.have.status(401);
      expect(newAccount.body).to.have.property('message');
      expect(newAccount.body.message).to.be.equal('"password" length must be 6 characters long');
    });

    it('When "cpf" is already registered', async () => {
      await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '11111111111',
          password: '1231',
        });

      const repeatedAccount = await chai
        .request(server)
        .post('/account/register')
        .send({
          name: 'Rodrigo Ruan',
          cpf: '11111111111',
          password: '123112',
        });

      expect(repeatedAccount).to.have.status(401);
      expect(repeatedAccount.body).to.have.property('message');
      expect(repeatedAccount.body.message).to.be.equal('Account already exists');
    });
  });
});
