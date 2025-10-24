import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, projectType, timeline, budgetRange, message } = body

    // Validate required fields
    if (!name || !email || !projectType || !timeline || !budgetRange || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send email notification using Resend
    if (resend && process.env.RESEND_TO_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'contact@anipotts.com',
        to: process.env.RESEND_TO_EMAIL,
        subject: `New Project Inquiry from ${name}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>Budget Range:</strong> ${budgetRange}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      })
    }

    // In a real implementation, you would also save this to Payload CMS
    // For now, we'll just return success
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

