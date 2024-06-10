import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  });

  return Response.redirect(authorizationUrl);
}
