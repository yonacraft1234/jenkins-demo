import { describe, expect, it } from 'vitest';
import { increment } from './counter.js';

describe('increment', () => {
  it('adds one', () => {
    expect(increment(0)).toBe(1);
    expect(increment(41)).toBe(42);
  });
});
