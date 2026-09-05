const enc = new TextEncoder();
const b64 = (a: Uint8Array) =>
  btoa(String.fromCharCode(...a))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
const bytes = (s: string) =>
  Uint8Array.from(atob(s.replaceAll('-', '+').replaceAll('_', '/')), (c) =>
    c.charCodeAt(0),
  );
async function key(secret: string) {
  if (secret.length < 32) throw new Error('Session key unavailable');
  return crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', enc.encode(secret)),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );
}
export async function seal(value: unknown, secret: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    await key(secret),
    enc.encode(JSON.stringify(value)),
  );
  return b64(iv) + '.' + b64(new Uint8Array(encrypted));
}
export async function unseal(
  value: string,
  secret: string,
): Promise<any | null> {
  try {
    if (value.length > 6000) return null;
    const [iv, data] = value.split('.');
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: bytes(iv) },
      await key(secret),
      bytes(data),
    );
    const result = JSON.parse(new TextDecoder().decode(plain));
    return Number.isFinite(result.until) && result.until > Date.now()
      ? result
      : null;
  } catch {
    return null;
  }
}
