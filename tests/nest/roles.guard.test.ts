import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../src/nest/guards/roles.guard';

describe('RolesGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;

  const guard = new RolesGuard(reflector);

  const createContext = (roles?: string[] | undefined) => ({
    switchToHttp: () => ({
      getRequest: () => ({ user: { roles } }),
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  }) as unknown as ExecutionContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows when no roles required', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(undefined);
    const ctx = createContext();
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('allows when user has required role', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['admin']);
    const ctx = createContext(['admin']);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('throws when user lacks role', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['admin']);
    const ctx = createContext(['user']);
    expect(() => guard.canActivate(ctx)).toThrow('Insufficient role permissions');
  });

  it('throws when user roles missing', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['admin']);
    const ctx = createContext(undefined as any);
    expect(() => guard.canActivate(ctx)).toThrow('Roles not found on user object.');
  });
});
