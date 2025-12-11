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
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha verification is required." },
        { status: 400 }
      );
    }

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

    // ================== SAVE TO STRAPI BACKEND ==================
    const strapiUrl = "http://shark-app-tmqz4.ondigitalocean.app";

    const strapiPayload = {
      data: {
        body: {
          name: `${firstName} ${lastName}`,
          email: businessEmail,
          phone: phone,
          title: jobTitle,
          organization_name: companyName,
          message: message,
          isSaveApollo: true,
        },
        name: "Contact Us Form",
        key: "contact_us_form",
      },
    };

    const strapiRes = await fetch(`${strapiUrl}/api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strapiPayload),
    });

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text();
      console.error("Strapi API failed:", strapiRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to save contact form." },
        { status: 500 }
      );
    }

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
