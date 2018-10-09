# hcaptcha

Verify hCaptcha token validity.

## Install

```
npm install --save hcaptcha
```

## Usage

```js
const {verify} = require('hcaptcha');

const secret = 'my hcaptcha secret from hcaptcha.com';
const token = 'token from widget';

verify(secret, token)
  .then((data) => console.log('success!', data))
  .catch(console.error);
```
