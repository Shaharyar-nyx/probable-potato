// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";

type SubscribeBody = {
  email: string;
};

// Optional: make sure this runs on the server every time
export const dynamic = "force-dynamic";

async function getAccessToken() {
  const tenantId = process.env.M365_TENANT_ID;
  const clientId = process.env.M365_CLIENT_ID;
  const clientSecret = process.env.M365_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    console.error("Missing Microsoft 365 OAuth env vars");
    throw new Error("Missing Microsoft 365 OAuth environment variables");
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
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

  if (!res.ok || !json.access_token) {
    console.error("Failed to obtain token:", json);
    throw new Error("Failed to obtain Microsoft access token");
  }

  return json.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubscribeBody;

    const { email } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) {
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
      <p>You received a new newsletter subscription from the Nyxlab website:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <p>This user has subscribed to receive the latest cybersecurity insights and threat intelligence updates.</p>
    `;

    const payload = {
      message: {
        subject: "New newsletter subscription - Nyxlab website",
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

    const sendRes = await fetch(graphEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (sendRes.status !== 202) {
      const errorText = await sendRes.text();
      console.error("Graph sendMail failed:", sendRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to send subscription notification." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Subscribe API error:", err);
    return NextResponse.json(
      { error: "Failed to process subscription.", err },
      { status: 500 }
    );
  }
}
