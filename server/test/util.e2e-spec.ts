import { SHA256 } from 'crypto-js';

describe('Test SHA256', () => {
  test('1234', () => {
    const tc = '1234';

    expect(SHA256(tc).toString()).toBe(
      '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
    );
  });
});
