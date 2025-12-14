import crypto from "crypto";

export function generateSecureToken(length = 48): string {
  return crypto.randomBytes(length).toString("hex");
}

export function generateApiKey(prefix = "sck", byteLength = 32): string {
  const raw = crypto.randomBytes(byteLength).toString("base64url");
  return `${prefix}_${raw}`;
}

export function signHMAC(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export function verifyHMAC(
  data: string,
  secret: string,
  signature: string
): boolean {
  const expected = signHMAC(data, secret);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
