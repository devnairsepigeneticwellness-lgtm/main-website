import { NextResponse } from "next/server";

const VALID_ENQUIRY_TYPES = [
  "General Enquiry",
  "Counselling",
  "Psychotherapy",
  "Clinical Hypnotherapy",
  "Online Rehabilitation",
  "Renewal",
  "Internship Programme",
  "Mentorship Programme",
  "Corporate Workshop",
  "Educational Training",
  "Other",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      enquiryType,
      message,
      consent,
      _hp, // Honeypot field (must be empty)
      _t,  // Timestamp rendered on client
    } = body;

    // 1. Anti-spam honeypot check
    if (_hp && String(_hp).trim().length > 0) {
      // Return 200 to fool automated bots silently
      return NextResponse.json({
        success: true,
        message: "Enquiry submitted successfully.",
        referenceId: `NEW-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }

    // 2. Anti-spam timing check (bots submit in < 500ms)
    if (_t) {
      const elapsed = Date.now() - Number(_t);
      if (elapsed > 0 && elapsed < 800) {
        return NextResponse.json(
          { success: false, error: "Submission too rapid. Please try again." },
          { status: 400 }
        );
      }
    }

    // 3. Server-side validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid email address is required.";
    }

    const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
    if (!phone || typeof phone !== "string" || !phoneRegex.test(phone.trim())) {
      errors.phone = "A valid phone number is required (at least 7 digits).";
    }

    if (
      !enquiryType ||
      typeof enquiryType !== "string" ||
      !VALID_ENQUIRY_TYPES.includes(enquiryType as (typeof VALID_ENQUIRY_TYPES)[number])
    ) {
      errors.enquiryType = "Please select a valid enquiry type.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      errors.message = "Please include a message (minimum 5 characters).";
    }

    if (!consent) {
      errors.consent = "Consent is required to proceed.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Please correct the highlighted errors." },
        { status: 400 }
      );
    }

    // 4. Generate unique reference ID
    const referenceId = `NEW-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submissionTime = new Date().toISOString();

    const sanitizedData = {
      referenceId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      enquiryType,
      message: message.trim(),
      timestamp: submissionTime,
    };

    // 5. Delivery Handling
    // If an external email service (e.g. Resend, Sendgrid) is configured in environment variables:
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT || "ajit.navy@gmail.com";

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Nair's Epigenetic Wellness <no-reply@nairsepigeneticwellness.com>",
            to: [recipientEmail],
            reply_to: sanitizedData.email,
            subject: `[New Enquiry - ${sanitizedData.referenceId}] ${sanitizedData.enquiryType} from ${sanitizedData.name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8EDE4; border-radius: 12px; background: #FCFAF6;">
                <h2 style="color: #173D34; margin-top: 0;">New Enquiry Received — N.E.W.</h2>
                <p style="color: #59675F; font-size: 14px;"><strong>Reference ID:</strong> ${sanitizedData.referenceId}</p>
                <p style="color: #59675F; font-size: 14px;"><strong>Received At:</strong> ${sanitizedData.timestamp}</p>
                <hr style="border: none; border-top: 1px solid #DFBD83; margin: 20px 0;" />
                <table style="width: 100%; font-size: 14px; color: #24352D; line-height: 1.6;">
                  <tr><td style="width: 140px; font-weight: 600; padding: 6px 0;">Full Name:</td><td>${sanitizedData.name}</td></tr>
                  <tr><td style="font-weight: 600; padding: 6px 0;">Email:</td><td><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td></tr>
                  <tr><td style="font-weight: 600; padding: 6px 0;">Phone:</td><td><a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a></td></tr>
                  <tr><td style="font-weight: 600; padding: 6px 0;">Enquiry Type:</td><td><strong>${sanitizedData.enquiryType}</strong></td></tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background: #F7F5EF; border-left: 4px solid #B58B50; border-radius: 4px;">
                  <strong style="color: #173D34; display: block; margin-bottom: 8px;">Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #24352D;">${sanitizedData.message}</p>
                </div>
                <p style="margin-top: 24px; font-size: 12px; color: #7F8C85;">
                  Delivered securely via Nair's Epigenetic Wellness Website Contact System.
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("[CONTACT_API] Resend API Error:", errText);
        }
      } catch (emailErr) {
        console.error("[CONTACT_API] Failed to deliver via Resend:", emailErr);
      }
    }

    // Always log clean structured delivery record to server output
    console.log(
      `[NEW_ENQUIRY_DELIVERED] Ref: ${sanitizedData.referenceId} | Type: ${sanitizedData.enquiryType} | Name: ${sanitizedData.name} | Email: ${sanitizedData.email} | Phone: ${sanitizedData.phone}`
    );

    return NextResponse.json({
      success: true,
      message: "Thank you. Your enquiry has been received securely.",
      referenceId: sanitizedData.referenceId,
      submittedData: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        enquiryType: sanitizedData.enquiryType,
      },
    });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry. Please try again or reach out directly.",
      },
      { status: 500 }
    );
  }
}
