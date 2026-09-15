import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key';
const resend = new Resend(resendApiKey);

// Define the schema for validation
const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  projectType: z.string().min(2, 'Project type is required'),
  description: z.string().min(10, 'Please provide more details').max(2000),
  objectives: z.string().max(1000).optional(),
  features: z.string().max(1000).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  additionalInfo: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate incoming data
    const validatedData = inquirySchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating email sending.');
      // If no key is set, we simulate success for development purposes
      return NextResponse.json(
        { message: 'Inquiry received successfully (Simulated)' },
        { status: 200 }
      );
    }

    // Send the real email
    const { data, error } = await resend.emails.send({
      from: 'ZTech Contact <onboarding@resend.dev>', // Update this to your verified domain when in production
      to: 'zackhbl400@gmail.com', // The official ZTech email
      subject: `New Project Inquiry from ${validatedData.fullName} | ZTech`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h1 style="border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 20px;">ZTECH | NEW INQUIRY</h1>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Client Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${validatedData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${validatedData.email}" style="color: #2563eb;">${validatedData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${validatedData.company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Project Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${validatedData.projectType}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${validatedData.budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Timeline</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${validatedData.timeline || 'Not specified'}</td>
              </tr>
            </tbody>
          </table>

          <h2 style="margin-top: 30px; font-size: 16px; text-transform: uppercase;">Project Description</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0;">${validatedData.description}</p>
          </div>

          ${validatedData.objectives ? `
            <h2 style="margin-top: 20px; font-size: 16px; text-transform: uppercase;">Objectives</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${validatedData.objectives}</p>
            </div>
          ` : ''}

          ${validatedData.features ? `
            <h2 style="margin-top: 20px; font-size: 16px; text-transform: uppercase;">Desired Features</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${validatedData.features}</p>
            </div>
          ` : ''}

          ${validatedData.additionalInfo ? `
            <h2 style="margin-top: 20px; font-size: 16px; text-transform: uppercase;">Additional Information</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${validatedData.additionalInfo}</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px;">
            Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Casablanca' })} (Casablanca Time)
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Inquiry sent successfully', data }, { status: 200 });

  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
