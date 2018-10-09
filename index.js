const https = require('https');
const querystring = require('querystring');

const host = 'hcaptcha.com';
const path = '/siteverify';

// verifies the given token by doing an HTTP POST request
// to the hcaptcha.com/siteverify endpoint by passing the
// hCaptcha secret key and token as the payload.
const verify = (secret, token) => {
  return new Promise(function verifyPromise(resolve, reject) {
    // stringify the payload
    const data = querystring.stringify({secret, response: token});

    // set up options for the request
    // note that we're using form data here instead of sending JSON
    const options = {
      host,
      path,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(data),
      },
    };

    // make the request, add response chunks to buffer, and finally resolve
    // with the response. if any errors arise call the promise's reject
    // function with the error.
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');

      var buffer = '';

      response
        .on('error', reject)
        .on('data', (chunk) => buffer += chunk)
        .on('end', () => resolve(JSON.parse(buffer)))
    });

    request.on('error', reject);
    request.write(data);
    request.end();
  });
};

module.exports = {
  verify,
};
