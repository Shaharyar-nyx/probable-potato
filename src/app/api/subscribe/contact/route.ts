// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  jobTitle?: string;
  companyName?: string;
  businessEmail?: string;
  message?: string;
  captchaToken?: string;
};

// async function verifyTurnstileToken(token: string): Promise<boolean> {
//   const secretKey = process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAACDzQTqm-gWUTDUCECTNTQW362o";
//   if (!secretKey) {
//     console.error("Missing TURNSTILE_SECRET_KEY environment variable");
//     return false;
//   }

//   const res = await fetch(
//     "https://challenges.cloudflare.com/turnstile/v0/siteverify",
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         secret: secretKey,
//         response: token,
//       }),
//     }
//   );

//   const data = (await res.json()) as { success: boolean };
//   return data.success;
// }

// Optional: make sure this runs on the server every time
export const dynamic = "force-dynamic";

async function getAccessToken() {
  const tenantId = process.env.M365_TENANT_ID;
  const clientId = process.env.M365_CLIENT_ID;
  const clientSecret = process.env.M365_CLIENT_SECRET;

  // if (!tenantId || !clientId || !clientSecret) {
  //   console.error("Missing Microsoft 365 OAuth env vars");
  //   throw new Error("Missing Microsoft 365 OAuth environment variables");
  // }

  const params = new URLSearchParams();
  // params.append("client_id", clientId);
  // params.append("client_secret", clientSecret);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("grant_type", "client_credentials");

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  const json = (await res.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  // if (!res.ok || !json.access_token) {
  //   console.error("Failed to obtain token:", json);
  //   throw new Error("Failed to obtain Microsoft access token");
  // }

  return json.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    const {
      firstName,
      lastName,
      phone,
      jobTitle,
      companyName,
      businessEmail,
      message,
      captchaToken,
    } = body;

    // Captcha temporarily disabled
    // if (!captchaToken) {
    //   return NextResponse.json(
    //     { error: "Captcha verification is required." },
    //     { status: 400 }
    //   );
    // }

    // const isCaptchaValid = await verifyTurnstileToken(captchaToken);
    // if (!isCaptchaValid) {
    //   return NextResponse.json(
    //     { error: "Captcha verification failed. Please try again." },
    //     { status: 400 }
    //   );
    // }

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !jobTitle ||
      !companyName ||
      !businessEmail ||
      !message
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(businessEmail)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // ================== MS GRAPH SEND ==================
    const accessToken = await getAccessToken();

    const sender = process.env.M365_SENDER || "info@nyxlab.com";
    const notifyTo = process.env.M365_NOTIFY_TO || "info@nyxlab.com";

    const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      sender
    )}/sendMail`;

    const htmlBody = `
      <p>You received a new contact request from the Nyxlab website:</p>
      <ul>
        <li><strong>First Name:</strong> ${firstName}</li>
        <li><strong>Last Name:</strong> ${lastName}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Job Title:</strong> ${jobTitle}</li>
        <li><strong>Company Name:</strong> ${companyName}</li>
        <li><strong>Business Email:</strong> ${businessEmail}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    const payload = {
      message: {
        subject: "New contact form submission - Nyxlab website",
        body: {
          contentType: "HTML",
          content: htmlBody,
        },
        toRecipients: [
          {
            emailAddress: {
              address: notifyTo,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // const sendRes = await fetch(graphEndpoint, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (sendRes.status !== 202) {
    //   const errorText = await sendRes.text();
    //   console.error("Graph sendMail failed:", sendRes.status, errorText);
    //   return NextResponse.json(
    //     { error: "Failed to send contact email." },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      { success: true, message: "Contact request submitted." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to submit contact form.", err },
      { status: 500 }
    );
  }
}
