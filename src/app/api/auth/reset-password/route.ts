import { NextResponse } from "next/server";
import { authService } from "@/lib/auth/authService";
import { repo } from "@/lib/auth/currentRepo";
import { passwordSchema } from "@/lib/validation/authSchemas";
import { HttpError } from "@/lib/errors";
import { logAuthEvent } from "@/lib/logger";
import { withApiRoute } from "@/lib/withApiRoute";

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { token, password } = body ?? {};

  if (!token) {
    // Business-level validation (not just field shape)
    throw new HttpError(400, "Token is required", "VALIDATION_ERROR");
  }

  const parsedPassword = passwordSchema.parse(password);

  const user = await repo.findByPasswordResetToken(token);
  if (!user) {
    throw new HttpError(400, "Invalid or expired reset token", "TOKEN_INVALID");
  }

  await authService.resetPassword(user.id, parsedPassword);

  logAuthEvent("password_reset_completed", { userId: user.id });

  return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
};

export const POST = withApiRoute(handler);
