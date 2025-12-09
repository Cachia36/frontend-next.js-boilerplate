import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ----------------------
// Mocks (before imports)
// ----------------------

// Mock NextResponse
vi.mock("next/server", () => {
  class MockNextResponse {
    body: any;
    status: number;
    headers: Headers;

    constructor(body: any, init?: any) {
      this.body = body;
      this.status = init?.status ?? 200;
      this.headers = new Headers(init?.headers);
    }

    static json(body: any, init?: any) {
      return new MockNextResponse(body, init);
    }
  }

  return {
    NextResponse: MockNextResponse,
  };
});

// ----------------------
// Imports (after mocks)
// ----------------------

import { GET } from "./route";

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns status ok, timestamp and 200", async () => {
    const res: any = await GET();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      timestamp: "2024-01-01T12:00:00.000Z",
    });
  });
});
