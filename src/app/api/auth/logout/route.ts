import { NextResponse } from "next/server";
import { logAuthEvent } from "@/lib/logger";
import { NODE_ENV } from "@/lib/env";
import { withApiRoute } from "@/lib/withApiRoute";

const handler = async (): Promise<Response> => {
  const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

  const isProd = NODE_ENV === "production";

  res.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: isProd,
    sameSite: "lax",
  });

  res.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: isProd,
    sameSite: "lax",
  });

  logAuthEvent("logout_success");

  return res;
};

export const POST = withApiRoute(handler);
