// src/lib/auth/passwordService.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock bcryptjs BEFORE importing the module under test
vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

import bcrypt from "bcryptjs";
import { hashPassword, verifyPassword } from "./passwordService";

const mockHash = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;
const mockCompare = bcrypt.compare as unknown as ReturnType<typeof vi.fn>;

describe("passwordService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("hashPassword", () => {
    it("hashes the password using bcrypt with salt rounds = 10", async () => {
      mockHash.mockResolvedValueOnce("hashed-password");

      const result = await hashPassword("plain-password");

      expect(mockHash).toHaveBeenCalledWith("plain-password", 10);
      expect(result).toBe("hashed-password");
    });

    it("propagates bcrypt errors", async () => {
      const error = new Error("bcrypt failed");
      mockHash.mockRejectedValueOnce(error);

      await expect(hashPassword("plain-password")).rejects.toBe(error);
    });
  });

  describe("verifyPassword", () => {
    it("returns true when password matches hash", async () => {
      mockCompare.mockResolvedValueOnce(true);

      const result = await verifyPassword("plain-password", "hashed-password");

      expect(mockCompare).toHaveBeenCalledWith("plain-password", "hashed-password");
      expect(result).toBe(true);
    });

    it("returns false when password does not match hash", async () => {
      mockCompare.mockResolvedValueOnce(false);

      const result = await verifyPassword("wrong-password", "hashed-password");

      expect(mockCompare).toHaveBeenCalledWith("wrong-password", "hashed-password");
      expect(result).toBe(false);
    });

    it("propagates bcrypt errors", async () => {
      const error = new Error("bcrypt compare failed");
      mockCompare.mockRejectedValueOnce(error);

      await expect(verifyPassword("plain-password", "hashed-password")).rejects.toBe(error);
    });
  });
});
