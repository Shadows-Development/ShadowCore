export interface ApiKey {
  id: string;
  keyHash: string;
  label?: string;
  permissions: string[];
  revoked: boolean;
  lastUsedAt: Date;
}

export interface ApiKeyCreateInput {
  label?: string;
  permissions?: string[];
}
export interface ApiKeyUpdateInput {
  label?: string;
  permissions?: string[];
}

export interface ApiKeyProvider {
  create(input: ApiKeyCreateInput): Promise<{rawKey: string; stored: ApiKey}>;
  validate(rawKey: string): Promise<ApiKey | null>;
  revoke(id: string): Promise<void>;
  update(id: string, input: ApiKeyUpdateInput): Promise<ApiKey>;
  findById(id: string): Promise<ApiKey | null>;
}