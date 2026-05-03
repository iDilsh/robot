import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface QuoteSubmission {
  services: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  requirements: string;
  fullName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
}

/* ── Send email notification via Resend ── */
async function sendEmailNotification(data: QuoteSubmission) {
  const serviceList = data.services.split(',').map((s) => `<li>${s.trim()}</li>`).join('');

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%); padding: 28px 32px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Quote Request</h1>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">iDilsh Network — Someone wants to work with you!</p>
      </div>

      <!-- Body -->
      <div style="padding: 28px 32px;">
        <!-- Client Info Card -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #1e293b;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 6px 0; color: #1e293b; font-weight: 600;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Email</td>
              <td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${data.email}</a></td>
            </tr>
            ${data.company ? `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;">Company</td><td style="padding: 6px 0; color: #1e293b;">${data.company}</td></tr>` : ''}
            <tr>
              <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Country</td>
              <td style="padding: 6px 0; color: #1e293b;">${data.country}</td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 6px 0; color: #64748b; vertical-align: top;">Phone</td><td style="padding: 6px 0; color: #1e293b;">${data.phone}</td></tr>` : ''}
          </table>
        </div>

        <!-- Project Info Card -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #1e293b;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 120px; vertical-align: top;">Services</td>
              <td style="padding: 6px 0;">
                <ul style="margin: 0; padding-left: 18px; color: #1e293b;">${serviceList}</ul>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Timeline</td>
              <td style="padding: 6px 0; color: #1e293b; font-weight: 500;">${data.timeline || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Budget</td>
              <td style="padding: 6px 0; color: #1e293b; font-weight: 500;">${data.budget || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <!-- Description -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 10px; font-size: 16px; font-weight: 700; color: #1e293b;">Project Description</h2>
          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.projectDescription}</p>
        </div>

        ${data.requirements ? `
        <!-- Requirements -->
        <div style="background: #f8fafc; border-radius: 10px; padding: 20px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 10px; font-size: 16px; font-weight: 700; color: #1e293b;">Specific Requirements</h2>
          <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.requirements}</p>
        </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div style="padding: 16px 32px; background: #f1f5f9; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">This notification was sent by iDilsh Network Quote System</p>
      </div>
    </div>
  `;

  await getResend().emails.send({
    from: 'iDilsh Network <onboarding@resend.dev>',
    to: NOTIFICATION_EMAIL!,
    subject: `New Quote Request from ${data.fullName}`,
    html,
  });
}

/* ── Save to Google Sheets ── */
async function saveToGoogleSheets(data: QuoteSubmission) {
  if (!GOOGLE_SHEET_URL) {
    console.warn('GOOGLE_SHEET_URL not configured — skipping Google Sheets save');
    return;
  }

  try {
    // Google Apps Script Web Apps require a special approach:
    // Google returns a 302 redirect on POST, which we need to follow manually
    // because Node.js fetch() doesn't forward the body to the redirect URL.

    // Step 1: Send POST — Google will return a 302 redirect
    const postResponse = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
      redirect: 'manual', // Don't auto-follow the redirect
    });

    // Step 2: If we get a redirect, follow it with GET
    if (postResponse.status === 302 || postResponse.status === 301) {
      const redirectUrl = postResponse.headers.get('location');
      if (redirectUrl) {
        const finalResponse = await fetch(redirectUrl, {
          method: 'GET',
          redirect: 'follow',
        });
        const result = await finalResponse.text();
        console.log('Google Sheets response (via redirect):', result);
        return;
      }
    }

    // Step 3: If no redirect, check the direct response
    if (postResponse.ok) {
      const result = await postResponse.text();
      console.log('Google Sheets response (direct):', result);
      return;
    }

    // Fallback: Try GET with query parameters as alternative method
    console.log('POST method did not work, trying GET with query params...');
    const queryString = new URLSearchParams({ data: JSON.stringify(data) }).toString();
    const getResponse = await fetch(`${GOOGLE_SHEET_URL}?${queryString}`, {
      method: 'GET',
      redirect: 'follow',
    });
    const getResult = await getResponse.text();
    console.log('Google Sheets response (via GET):', getResult);

  } catch (error) {
    console.error('Google Sheets save error:', error);
    throw error;
  }
}

/* ── API Route Handler ── */
export async function POST(request: NextRequest) {
  try {
    const data: QuoteSubmission = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.services) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Run both in parallel — email + Google Sheets
    const results = await Promise.allSettled([
      sendEmailNotification(data),
      saveToGoogleSheets(data),
    ]);

    // Check for failures
    const emailFailed = results[0].status === 'rejected';
    const sheetsFailed = results[1].status === 'rejected';

    if (emailFailed && results[0].status === 'rejected') {
      console.error('Email failed:', results[0].reason);
    }
    if (sheetsFailed && results[1].status === 'rejected') {
      console.error('Google Sheets failed:', results[1].reason);
    }

    // Return success even if one fails — the user already submitted
    return NextResponse.json({
      success: true,
      emailSent: !emailFailed,
      sheetsSaved: !sheetsFailed,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
