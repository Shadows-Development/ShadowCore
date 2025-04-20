import jwt, { SignOptions } from "jsonwebtoken";

export function signToken(
  payload: object,
  secret: string,
  expiresIn = "1h"
): string {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
    algorithm: "HS256",
  };
  return jwt.sign(payload, secret, options);
}

export function verifyToken<T = any>(token: string, secret: string): T | null {
  try {
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}

export function decodeToken<T = any>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch {
    return null;
  }
}