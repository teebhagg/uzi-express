


const brevoApiKey = process.env.BREVO_API_KEY;

export async function sendEmail(to: string, subject: string, text: string) {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const headers = {
    'Content-Type': 'application/json',
    'api-key': brevoApiKey ?? "",
  };
  const data = {
    sender: { email: 'no-reply@uzi-express.com', name: 'UZI Express' },
    to: [{ email: to }],
    subject: subject,
    textContent: text,
  };

  try {
    let res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error('Error sending email:', res.statusText);
      throw new Error(res.statusText);
    }
    const resData = await res.json();
    console.log('Email sent successfully:', resData);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}