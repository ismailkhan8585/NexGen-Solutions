export function isDemoProject(liveUrl: string | null | undefined): boolean {
  if (!liveUrl) return false;
  try {
    const hostname = new URL(liveUrl).hostname.toLowerCase();
    return hostname === 'example.com' || hostname.endsWith('.example.com');
  } catch {
    return false;
  }
}
