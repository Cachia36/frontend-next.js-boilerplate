import { NextResponse } from "next/server";
import { authService } from "@/lib/auth/domain/authService";
import { HttpError } from "@/lib/core/errors";
import { logAuthEvent } from "@/lib/core/logger";
import { withApiRoute } from "@/lib/http/withApiRoute";

const handler = async (req: Request): Promise<Response> => {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";

    const accessToken = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1];

    // Not authenticated → just return user: null with 200
    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await authService.getUserFromAccessToken(accessToken);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    // Token invalid or user missing → treat as logged out
    if (error instanceof HttpError && (error.statusCode === 401 || error.statusCode === 404)) {
      logAuthEvent("me_token_invalid_or_user_missing", {
        statusCode: error.statusCode,
        code: error.code,
      });

      return NextResponse.json({ user: null }, { status: 200 });
    }

    // For any other errors, let the global handler + logger handle it
    throw error;
  }
};

export const GET = withApiRoute(handler);
