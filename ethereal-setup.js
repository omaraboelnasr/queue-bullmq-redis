const nodemailer = require('nodemailer');

(async () => {
  let testAccount = await nodemailer.createTestAccount();
  console.log('Ethereal test account:', testAccount);
})();
