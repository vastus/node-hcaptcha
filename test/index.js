const assert = require('assert');
const nock = require('nock');
const {verify} = require('../index');

// mock the request
nock('https://hcaptcha.com')
  .post('/siteverify', 'secret=secret&response=token')
  .reply(200, '{"success":true}')

describe('hCaptcha', function () {
  describe('verify', function () {
    const secret = 'secret';
    const token = 'token';

    it('resolves on success', function (done) {
      verify(secret, token)
        .then((data) => {
          assert.deepStrictEqual(data, {success: true});
          done();
        })
        .catch(done);
    });
  });
});
