import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { API_KEY_PROVIDER } from "../tokens/api-key.token";
import { ApiKeyProvider } from "../../types/apikey.type";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(API_KEY_PROVIDER) private readonly provider: ApiKeyProvider,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawKey = req.headers["x-api-key"]

    if(!rawKey) {
      return false; // No API key provided
    }

    const key = await this.provider.validate(rawKey);
    if (!key || key.revoked) return false;

    const required = this.reflector.get<string[]>(
      "api_key_permissions",
      context.getHandler(),
    ) || [];

    if(!required.every(p => key.permissions.includes(p))) return false;

    req.apiKey = key;
    return true;
  }
}