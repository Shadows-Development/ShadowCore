import { ExecutionContext } from '@nestjs/common';
import { CurrentUser } from '../../src/nest/decorators/current-user.decorator';

describe('CurrentUser decorator', () => {
  it('is a function that returns a decorator', () => {
    expect(typeof CurrentUser).toBe('function');
    const decorator = CurrentUser();
    expect(typeof decorator).toBe('function');
  });
});
