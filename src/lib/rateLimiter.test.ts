import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { checkRateLimit } from "./rateLimiter";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0); // start all tests at time = 0
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ---------------------------------------------------------------------------
  // First request
  // ---------------------------------------------------------------------------

  it("allows the first request and initializes counter", () => {
    const result = checkRateLimit("ip-1");

    expect(result).toEqual({ allowed: true });
  });

  // ---------------------------------------------------------------------------
  // Within rate limit
  // ---------------------------------------------------------------------------

  it("allows requests under the max limit", () => {
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit("ip-2", { max: 5, windowMs: 60_000 });
      expect(result.allowed).toBe(true);
    }
  });

  // ---------------------------------------------------------------------------
  // Exceeding rate limit
  // ---------------------------------------------------------------------------

  it("blocks requests when max is exceeded and returns retryAfterSeconds", () => {
    const key = "ip-3";

    // Max = 3
    checkRateLimit(key, { max: 3, windowMs: 60_000 });
    checkRateLimit(key, { max: 3, windowMs: 60_000 });
    checkRateLimit(key, { max: 3, windowMs: 60_000 });

    // 4th request should be blocked
    const result = checkRateLimit(key, { max: 3, windowMs: 60_000 });

    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeDefined();
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // Window expiration
  // ---------------------------------------------------------------------------

  it("resets the counter after windowMs has passed", () => {
    const key = "ip-4";

    checkRateLimit(key, { max: 1, windowMs: 60_000 });

    // Move time forward past the window
    vi.advanceTimersByTime(60_001);

    const result = checkRateLimit(key, { max: 1, windowMs: 60_000 });

    expect(result.allowed).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Exact retryAfterSeconds calculation
  // ---------------------------------------------------------------------------

  it("returns correct retryAfterSeconds when blocked", () => {
    const key = "ip-5";

    // max 1 per 60 seconds
    checkRateLimit(key, { max: 1, windowMs: 60_000 });

    // 30 seconds pass
    vi.advanceTimersByTime(30_000);

    const result = checkRateLimit(key, { max: 1, windowMs: 60_000 });

    expect(result.allowed).toBe(false);

    // 30 seconds remaining → ceil(30000 / 1000) = 30
    expect(result.retryAfterSeconds).toBe(30);
  });

  // ---------------------------------------------------------------------------
  // Separate keys do not affect each other
  // ---------------------------------------------------------------------------

  it("tracks rate limits independently per key", () => {
    const result1 = checkRateLimit("ip-A", { max: 1 });
    const result2 = checkRateLimit("ip-B", { max: 1 });

    expect(result1.allowed).toBe(true);
    expect(result2.allowed).toBe(true);

    // Second call for ip-A should be blocked
    const blockedA = checkRateLimit("ip-A", { max: 1 });

    // ip-B still allowed
    const allowedB = checkRateLimit("ip-B", { max: 2 });

    expect(blockedA.allowed).toBe(false);
    expect(allowedB.allowed).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Default options
  // ---------------------------------------------------------------------------

  it("uses default max=10 and windowMs=60000 when no options are provided", () => {
    const key = "ip-default";

    for (let i = 0; i < 10; i++) {
      const result = checkRateLimit(key);
      expect(result.allowed).toBe(true);
    }

    // 11th request should be blocked
    const result = checkRateLimit(key);

    expect(result.allowed).toBe(false);
  });
});
