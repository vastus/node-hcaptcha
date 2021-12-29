const https = require('https');

const HOST = 'hcaptcha.com';
const PATH = '/siteverify';

const makeQuerystring = (payload = {}) => {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(payload)) {
    params.append(name, value);
  }
  return params.toString();
};

const makeOptions = (data) => ({
  host: HOST,
  path: PATH,
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': Buffer.byteLength(data),
  },
});

const fetch = (data, options) =>
  new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let buffer = '';
      response
        .on('error', reject)
        .on('data', (chunk) => (buffer += chunk))
        .on('end', () => {
          const object = JSON.parse(buffer);
          resolve(object);
        });
    });
    request.on('error', reject);
    request.write(data);
    request.end();
  });

const verify = (secret, token, remoteip, sitekey) => {
  const payload = { secret, response: token };
  if (remoteip) {
    payload.remoteip = remoteip;
  }
  if (sitekey) {
    payload.sitekey = sitekey;
  }

  const data = makeQuerystring(payload);
  const options = makeOptions(data);
  return fetch(data, options);
};

module.exports = {
  verify,
};
