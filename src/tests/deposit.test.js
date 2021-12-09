// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const { MongoClient, Db } = require('mongodb');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const server = require('../index');

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Teste: Deposit', () => {
//   const DBServer = new MongoMemoryServer();

//   before(async () => {
//     const URLMock = await DBServer.getUri();
//     const OPTIONS = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };
//     const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

//     sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//   });

//   after(async () => {
//     MongoClient.connect.restore();
//     await DBServer.stop();
//   });

//   describe('When deposited sucessfully', () => {
//     it('When user do a deposit', async () => {
//       const newAccount = await chai.request(server)
//         .post('/account/register')
//         .send({
//           name: 'Rodrigo Ruan',
//           cpf: '11111111111',
//           password: '123456',
//         });

//       const { token } = newAccount;
//     });
//   });
// });
