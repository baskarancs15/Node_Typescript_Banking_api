import request from 'supertest';
import app from '../app';


//Post-createAccount
describe('POST /createAccount', () => {
  it('responds with an inserted object', async () =>
    request(app)
      .post('/createAccount')
      .set('Accept', 'application/json')
      .send({
        "name": "Baskaran"
      })
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual('Account Created for Baskaran Successfully');
        expect(response.body.data).toHaveProperty('name');
        expect(response.body.data).toHaveProperty('userId');
      }),
  );
  it('responds with a not found error', (done) => {
    request(app)
    .post('/createAccount')
      .set('Accept', 'application/json')
      .send({
        "name": ""
      })
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});


//Post-deposit
describe('POST /deposit', () => {
 
  it('responds with an error message', async () =>
    request(app)
      .post('/deposit')
      .set('Accept', 'application/json')
      .send({
        "accountNo":"UID_1001",
        "amount":100
       })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual('Minimum deposit amount is 500');
      }),
  );

  it('responds with an error message', async () =>
    request(app)
      .post('/deposit')
      .set('Accept', 'application/json')
      .send({
        "accountNo":"UID_1001",
        "amount":51000
       })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual('Maximum deposit amount is 50000');
      }),
  );

  it('responds with an error message', async () =>
  request(app)
    .post('/deposit')
    .set('Accept', 'application/json')
    .send({
      "accountNo":"UID_1002",
      "amount":1500
     })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toEqual('Only 3 deposits are allowed in a day');
    }),
);

it('responds with status code 200', async () =>
request(app)
  .post('/deposit')
  .set('Accept', 'application/json')
  .send({
    "accountNo":"UID_1001",
    "amount":1000
   })
  .expect(200)
  .then((response) => {
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('data');
  }),
);


  
});


// get-userById
describe('GET /getUserBalanceById/:userId', () => {
  let userId = 'UID_1001'
  it('responds get with one user balance', async() => 
    request(app)
      .get(`/getUserBalanceById/UID_1001`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual('Your Balance is Fetched Successfully');
      }),
  );
  userId = 'UID_100800'
  it('responds with error message if user not found', async() => 
  request(app)
    .get(`/getUserBalanceById/${userId}`)
    .set('Accept', 'application/json')
    .expect(404)
    .then((response) => {
      expect(response.body.message).toEqual('User with id UID_100800 not Found');
    }),
);
});


//Put-withdrawal
describe('PUT /withdraw', () => {
  it('responds with an error message-Minimum withdrawal amount is 1000', async () =>
  request(app)
    .put('/withdraw')
    .set('Accept', 'application/json')
    .send({
      "accountNo":"UID_1001",
      "withdrawAmount":999
    })
    .expect(404)
    .then((response) => {
     expect(response.body.message).toEqual('Minimum withdrawal amount is 1000');
    }),
);

  it('responds with an error message- Maximum withdrawal amount is 25000', async () =>
    request(app)
      .put('/withdraw')
      .set('Accept', 'application/json')
      .send({
        "accountNo":"UID_1001",
        "withdrawAmount":30000
      })
      .expect(404)
      .then((response) => {
       expect(response.body.message).toEqual('Maximum withdrawal amount is 25000');
      }),
  );


  it('responds with an error message- Only 3 withdrawals are allowed in a day', async () =>
  request(app)
    .put('/withdraw')
    .set('Accept', 'application/json')
    .send({
      "accountNo":"UID_1002",
      "withdrawAmount":2000
    })
    .expect(404)
    .then((response) => {
     expect(response.body.message).toEqual('Only 3 withdrawals are allowed in a day');
    }),
);


  it('responds with an inserted object', async () =>
  request(app)
    .put('/withdraw')
    .set('Accept', 'application/json')
    .send({
      "accountNo":"UID_1001",
      "amount":2000
     })
    .expect(200)
);
 
});





