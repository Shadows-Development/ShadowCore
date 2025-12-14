import { signToken, verifyToken } from "../../security";

export class TokenService {
  constructor(private readonly secret: string) {}

  sign(payload: object, expiresIn = "15m"): string {
    return signToken(payload, this.secret, expiresIn);
  }

  verify<T = any>(token: string): T {
    const result = verifyToken<T>(token, this.secret);
    if (!result) throw new Error("Invalid token");
    return result;
  }
}