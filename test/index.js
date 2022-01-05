'use strict';

const assert = require('assert');
const nock = require('nock');
const {verify} = require('../index');

// disable internet access to ensure we are stubbing all reqs
nock.disableNetConnect();

describe('hCaptcha', function () {
  describe('verify', function () {
    const secret = 'mysecret';
    const token = 'token';

    it('resolves on success', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token')
        .reply(200, '{"success":true}');
      verify(secret, token)
        .then((data) => {
          assert.deepStrictEqual(data, {success: true});
          done();
        })
        .catch(done.fail);
    });

    it('resolves on success with ip', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token&remoteip=1.3.3.7')
        .reply(200, '{"success":true}');
      verify(secret, token, '1.3.3.7')
        .then((data) => {
          assert.deepStrictEqual(data, {success: true});
          done();
        })
        .catch(done.fail);
    });

    it('resolves on success with sitekey', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token&sitekey=mysite')
        .reply(200, '{"success":true}');
      verify(secret, token, null, 'mysite')
        .then((data) => {
          assert.deepStrictEqual(data, {success: true});
          done();
        })
        .catch(done.fail);
    });

    it('resolves on success with ip and sitekey', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token&remoteip=1.3.3.7&sitekey=mysite')
        .reply(200, '{"success":true}');
      verify(secret, token, '1.3.3.7', 'mysite')
        .then((data) => {
          assert.deepStrictEqual(data, {success: true});
          done();
        })
        .catch(done.fail);
    });

    it('resolves on failure', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token')
        .reply(200, '{"success":false}');
      verify(secret, token)
        .then((data) => {
          assert.deepStrictEqual(data, {success: false});
          done();
        })
        .catch(done.fail);
    });

    it('throws on invalid json response', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token')
        .reply(200, '<html lang="en">...');
      verify(secret, token)
        .then(done.fail)
        .catch(error => {
          assert.strictEqual(error.message, 'Unexpected token < in JSON at position 0')
          done()
        });
    });

    it('throws on http failure', function (done) {
      nock('https://hcaptcha.com')
        .post('/siteverify', 'secret=mysecret&response=token')
        .replyWithError('failboat');
      verify(secret, token)
        .then(done.fail)
        .catch(() => done());
    });
  });
});
