const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'konulnecefli914@gmail.com',
      pass: 'cjobuzhopsnfxyai',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Dr. Konul Necefli" <konulnecefli914@gmail.com>',
      to: 'arzumanorucov98@gmail.com',
      subject: 'Rezervasiya Test',
      html: '<h2>Bu test mesajidir!</h2><p>Email sistemi isleyir.</p>',
    });
    console.log('SUCCESS! Message ID:', info.messageId);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

testEmail();
