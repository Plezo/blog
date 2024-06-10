import { decodeJwt, jwtVerify } from "jose";

export async function verifyJWT(token: string, secret: string): Promise<any> {
  const encoder = new TextEncoder();
  const key = encoder.encode(secret);

  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function getUserFromJWT(token: string): any {
  try {
    const payload = decodeJwt(token);
    return payload;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
