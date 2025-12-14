import { hash, verify, argon2id } from "argon2";


export async function hashPassword(password: string): Promise<string> {
  return await hash(password, {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  try {
    return await verify(hashed, password);
  } catch {
    return false;
  }
}
