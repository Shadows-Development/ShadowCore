import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../src/nest/guards/jwt-auth.guard';
import { TokenService } from '../../src/nest/services/token.service';

describe('JwtAuthGuard', () => {
  const secret = 'secret';
  const service = new TokenService(secret);
  const guard = new JwtAuthGuard(service);

  const createContext = (token?: string) => {
    const req: any = { cookies: { access_token: token } };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;
  };

  it('allows valid token and attaches user', () => {
    const token = service.sign({ id: 2 });
    const ctx = createContext(token);
    expect(guard.canActivate(ctx)).toBe(true);
    const req = ctx.switchToHttp().getRequest();
    expect(req.user.id).toBe(2);
  });

  it('throws when no token present', () => {
    const ctx = createContext(undefined);
    expect(() => guard.canActivate(ctx)).toThrow('No token provided');
  });

  it('throws on invalid token', () => {
    const ctx = createContext('bad');
    expect(() => guard.canActivate(ctx)).toThrow('Invalid token');
  });
});
