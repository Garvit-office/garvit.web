import nodemailer from 'nodemailer';

const senderAddress = process.env.GMAIL_USER;
const receiverAddress = process.env.RECEIVER_EMAIL || senderAddress;

if (!senderAddress || !process.env.GMAIL_APP_PASSWORD) {
  console.warn('Gmail credentials are not fully configured. Email delivery will fail until GMAIL_USER and GMAIL_APP_PASSWORD are set.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderAddress,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendNotificationEmail = async (type, data) => {
  try {
    let subject = "";
    let html = "";

    if (type === 'like') {
      subject = `New Like on Your Content - ${data.visitorName}`;
      html = `
        <h2>Someone liked your content 👍</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Content:</strong> ${data.postContent}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    if (type === 'comment') {
      subject = `New Comment - ${data.visitorName}`;
      html = `
        <h2>New comment received 💬</h2>
        <p><strong>Visitor:</strong> ${data.visitorName}</p>
        <p><strong>Comment:</strong> ${data.commentText}</p>
        <p><strong>Content:</strong> ${data.postContent}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    await transporter.sendMail({
      from: senderAddress,
      to: receiverAddress,
      subject,
      html
    });

  } catch (err) {
    console.error("Email error:", err);
  }
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!name || !email || !subject || !message)
    throw new Error("All fields required");
  await transporter.sendMail({
    from: senderAddress,
    to: receiverAddress,
    replyTo: email,
    subject: `New Portfolio Contact: ${subject}`,
    html: `
      <h2>Portfolio Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `
  });
};
