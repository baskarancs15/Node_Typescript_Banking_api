import request from 'supertest';
import app from '../app';



let id = '';
//Post-createOneUser
describe('POST /add', () => {
  it('responds with an inserted object', async () =>
    request(app)
      .post('/add')
      .set('Accept', 'application/json')
      .send({
        "email": "baskaran215@gmail.com",
        "firstName": "Baskaran",
        "lastName": "Krishnamurthy",
        "dob": "14-05-1991",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data).toHaveProperty('email');
        expect(response.body.data).toHaveProperty('firstName');
        expect(response.body.data).toHaveProperty('lastName');
      }),
  );
});


//get-userById
describe('GET /getoneuser/:id', () => {
  id = '6355020e02ac08e45a96b5c3'; 
  it('responds get with one user', async() => 
    request(app)
      .get(`/getoneuser/${id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual('User Fetched Successfully');
        // expect(response.body._id).toBe(id);
        expect(response.body.data).toHaveProperty('email');
        expect(response.body.data).toHaveProperty('firstName');
        expect(response.body.data).toHaveProperty('lastName');
        expect(response.body.data).toHaveProperty('dob');
      }),
  );
  it('responds with an invalid ObjectId error', (done) => {
    id = 'adsfadsfasdfasdf'; 
    request(app)
      .get(`/getoneuser/${id}`)
      .set('Accept', 'application/json')
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    id = '6306d061477bdb46f9c57fa4'; 
    request(app)
      .get(`/getoneuser/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

//delete-userById 
describe('DELETE /deleteoneuser/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    id = 'adsfadsfasdfasdf'; 
    request(app)
      .delete(`/deleteoneuser/${id}`)
      .set('Accept', 'application/json')
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/deleteoneuser/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});




