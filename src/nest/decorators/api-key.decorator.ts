import { SetMetadata } from "@nestjs/common";

export const ApiKey = (permissions: string[] = []) =>
  SetMetadata("api_key_permissions", permissions);