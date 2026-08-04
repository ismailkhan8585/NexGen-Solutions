export function isDemoProject(liveUrl: string | null | undefined): boolean {
  if (!liveUrl) return false;
  try {
    const hostname = new URL(liveUrl).hostname.toLowerCase();
    return hostname === 'example.com' || hostname.endsWith('.example.com');
  } catch {
    return false;
  }
}

export function getSafeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}
