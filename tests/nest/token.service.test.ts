import { TokenService } from '../../src/nest/services/token.service';

describe('TokenService', () => {
  const secret = 'test-secret';
  const service = new TokenService(secret);

  it('signs and verifies a payload', () => {
    const token = service.sign({ id: 1 });
    const decoded = service.verify<{ id: number }>(token);
    expect(decoded.id).toBe(1);
  });

  it('throws on invalid token', () => {
    expect(() => service.verify('invalid')).toThrow('Invalid token');
  });
});
