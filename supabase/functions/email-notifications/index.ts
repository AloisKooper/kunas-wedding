import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend';

// Initialize Resend client from the environment variable
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

// Get the couple's email from the environment variable
const coupleEmail = Deno.env.get('COUPLE_EMAIL')!;

// Use the Resend sandbox domain for development. 
// IMPORTANT: Before going live, replace this with your own verified domain from Resend (e.g., 'rsvp@kunas-wedding.com')
const fromEmail = 'onboarding@resend.dev';

serve(async (req) => {
  // This is an example of a POST request handler
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // The trigger sends the new database row in the `record` property.
    const { record } = await req.json();

    // --- 1. Send Confirmation Email to the Guest ---
    // We only send an email if the guest provided an email address.
    if (record.email) {
      await resend.emails.send({
        from: fromEmail,
        to: record.email, // The guest's email address
        subject: 'We\'ve Received Your RSVP for Kuna & Kadeen\'s Wedding!',
        html: `
          <h1>Thank You, ${record.name}!</h1>
          <p>We\'re so excited that you\'ve responded for our wedding. Here are the details you provided:</p>
          <ul>
            <li><strong>Attending:</strong> ${record.attending ? 'Yes' : 'No'}</li>
            ${record.attending ? `<li><strong>Guests:</strong> ${record.guest_count}</li>` : ''}
          </ul>
          <p>If you need to make any changes, please contact us directly.</p>
          <p>With love,</p>
          <p>Kuna & Kadeen</p>
        `,
      });
    }

    // --- 2. Send Notification Email to the Couple ---
    await resend.emails.send({
      from: fromEmail,
      to: coupleEmail, // Your email address
      subject: `New RSVP from ${record.name}! 🎉`,
      html: `
        <h1>New RSVP Submission</h1>
        <p>You have a new response from <strong>${record.name}</strong>.</p>
        <ul>
          <li><strong>Name:</strong> ${record.name}</li>
          <li><strong>Email:</strong> ${record.email || 'Not provided'}</li>
          <li><strong>Attending:</strong> ${record.attending ? 'Yes' : 'No'}</li>
          ${record.attending ? `<li><strong>Total Guests:</strong> ${record.guest_count}</li>` : ''}
          ${record.dietary_restrictions ? `<li><strong>Dietary Restrictions:</strong> ${record.dietary_restrictions}</li>` : ''}
          ${record.message ? `<li><strong>Message:</strong> ${record.message}</li>` : ''}
        </ul>
      `,
    });

    return new Response(JSON.stringify({ message: 'Notifications sent successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Notification Error:', error);
    return new Response(error.message || 'Internal Server Error', { status: 500 });
  }
});
