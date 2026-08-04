const remoteImageHosts = new Set([
  'res.cloudinary.com',
  'images.unsplash.com',
  'images.pexels.com',
]);

export function isSupportedImageUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('..')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && remoteImageHosts.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}
