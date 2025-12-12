import { NextResponse } from "next/server";
import { NODE_ENV } from "@/lib/core/env";
import { withApiRoute } from "@/lib/http/withApiRoute";

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

  return res;
};

export const POST = withApiRoute(handler);
