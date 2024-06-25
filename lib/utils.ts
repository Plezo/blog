import { type ClassValue, clsx } from "clsx";
import { JWTPayload, decodeJwt, jwtVerify } from "jose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const today = new Date();
  const year = date.getFullYear();
  const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });
  const day = date.getDate();
  const month = monthFormatter.format(date);

  const formattedDate =
    year < today.getFullYear() ? `${month} ${day} ${year}` : `${month} ${day}`;

  return formattedDate;
}

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

export function objectToJWTPayload<T extends object>(obj: T): JWTPayload {
  const payload: JWTPayload = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      payload[key] = obj[key]?.toString();
    }
  }

  return payload;
}
