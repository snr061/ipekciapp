const RAW = process.env.WORKSPACE_ALLOWED_EMAILS ?? "snr061@gmail.com";

const ALLOWED = new Set(
  RAW.split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

export function isAllowedEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return ALLOWED.has(email.toLowerCase());
}
