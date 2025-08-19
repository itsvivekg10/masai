import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export const sendResetEmail = async (to, link) => {
  await transporter.sendMail({
    from: '"Dish Booking" <no-reply@dishbooking.local>',
    to, subject: 'Reset your password',
    text: `Click to reset: ${link}`,
    html: `<p>Click to reset: <a href="${link}">${link}</a></p>`
  });
};
