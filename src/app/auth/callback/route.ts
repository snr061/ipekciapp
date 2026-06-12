import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/workspace";

  if (!code) {
    return NextResponse.redirect(
      new URL("/workspace/login?error=missing_code", origin),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/workspace/login?error=${encodeURIComponent(error.message)}`, origin),
    );
  }

  return NextResponse.redirect(new URL(next, origin));
}
