# hcaptcha

Verify hCaptcha token validity; simply w/ no dependencies.

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
  .then((data) => {
    if (data.success === true) {
      console.log('success!', data);
    } else {
      console.log('verification failed');
    }
  })
  .catch(console.error);
```
