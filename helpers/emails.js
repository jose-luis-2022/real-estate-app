const nodemailer = require("nodemailer");
require("dotenv").config();

const signUpUser = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { fullname, email, token } = data;

  await transport.sendMail({
    from: "RealEstates.com",
    to: email,
    subject: "Confirm your account in RealEstates.com",
    text: "Confirm your account in RealEstates.com",
    html: `
                  <p> Hi <strong> ${fullname} </strong> 👋, confirm your account in RealEstates.com </p>
  
                  <p> Your account is already ready, just confirm it in the following link:
                      <a href="${process.env.BACKEND_URL}/auth/confirm/${token}">
                          Confirm your Account
                      </a> 
                  </p>
  
                  <p> If you didn't create this account, <strong> skip this message </strong> </p>
                `,
  });
};

const forgotPasswordUser = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { fullname, email, token } = data;

  await transport.sendMail({
    from: "RealEstates.com",
    to: email,
    subject: "Reset password in RealEstates.com",
    text: "Reset password in RealEstates.com",
    html: `
                  <p> Hi <strong> ${fullname} </strong> 👋, you have requested to reset the password of your account in RealEstates.com </p>
  
                  <p> Please follow the next link:
                      <a href="${process.env.BACKEND_URL}/auth/reset-password/${token}">
                          Reset your password
                      </a> 
                  </p>
  
                  <p> If you didn't request to reset the password of this account, <strong> skip this message </strong> </p>
                `,
  });
};

const passwordReseted = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { fullname, email } = data;

  await transport.sendMail({
    from: "RealEstates.com",
    to: email,
    subject: "Password updated in RealEstates.com",
    text: "Password updated in your account in RealEstates.com",
    html: `
                <p> Hi <strong> ${fullname} </strong> 👋,  the password in your account in RealEstates.com has been updated </p>

                <p> If you didn't request to update the password of this account, <strong> skip this message </strong> </p>
              `,
  });
};

const updatedPassword = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { fullname, email } = data;

  await transport.sendMail({
    from: "RealEstates.com",
    to: email,
    subject: "Password updated in RealEstates.com",
    text: "Password updated in your account in RealEstates.com",
    html: `
                  <p> Hi <strong> ${fullname} </strong> 👋,  the password in your account in RealEstates.com has been updated </p>

                  <p> If you didn't request to update the password of this account, <strong> skip this message </strong> </p>
              `,
  });
};

const updatedEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { fullname, email, token } = data;

  await transport.sendMail({
    from: "RealEstates.com",
    to: email,
    subject: "Confirm your account in RealEstates.com",
    text: "Confirm your account in RealEstates.com",
    html: `
                <p> Hi <strong> ${fullname} </strong> 👋, confirm your new email of your account in RealEstates.com </p>

                <p> Your account is already ready, just confirm it in the following link:
                    <a href="${process.env.BACKEND_URL}/auth/confirm/${token}">
                        Confirm your Account
                    </a> 
                </p>

                <p> If you didn't request to change the email of this account,  <strong> skip this message </strong> </p>
              `,
  });
};

module.exports = { signUpUser, forgotPasswordUser, passwordReseted, updatedPassword, updatedEmail };
