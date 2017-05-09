// const db = require('./db');
// const request = require('./request');
// const assert = require('chai').assert;

// describe('auth tests', () => {
//   // let token = '';

//   before(db.drop);

//   // const user = {
//   //   email: 'coolemail@me.com',
//   //   password: 'yipee'
//   // };

//   describe('user management', () => {

//     const badRequest = (url, data, code, error) => {
//       return request
//         .post(url)
//         .send(data)
//         .then(
//         () => { throw new Error('status should be not ok'); },
//         res => {
//           assert.equal(res.status, code);
//           assert.equal(res.response.body.error, error);
//         });
//     };

//     it('signup requires email', () => {
//       return badRequest('/auth/signup', { password: 'yipee' }, 400, 'email and password required');
//     });
//   });
// });