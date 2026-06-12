import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { isAllowedEmail } from "@/lib/auth";

const LOGIN_PATH = "/workspace/login";
const MFA_PATH = "/workspace/mfa";
const CALLBACK_PATH = "/auth/callback";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/workspace") && !pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    if (pathname === "/workspace") return NextResponse.next();
    const home = new URL("/workspace", request.url);
    return NextResponse.redirect(home);
  }

  const { supabase, response } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`);
  const isCallback = pathname.startsWith(CALLBACK_PATH);
  const isMfaRoute = pathname === MFA_PATH || pathname.startsWith(`${MFA_PATH}/`);

  if (!user) {
    if (isLoginRoute || isCallback) return response;
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (!isAllowedEmail(user.email)) {
    await supabase.auth.signOut();
    const home = new URL("/", request.url);
    home.searchParams.set("workspace_error", "not_allowed");
    return NextResponse.redirect(home);
  }

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const needsMfa =
    aal?.nextLevel === "aal2" && aal.currentLevel === "aal1";

  if (needsMfa) {
    if (isMfaRoute || isCallback) return response;
    return NextResponse.redirect(new URL(MFA_PATH, request.url));
  }

  if (isLoginRoute) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/workspace/:path*", "/auth/:path*"],
};
