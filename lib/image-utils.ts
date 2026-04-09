export function resolveAssetUrl(value: string | null | undefined, fallbackFile: string) {
  if (!value) return `/uploads/${fallbackFile}`;
  if (/^(https?:|blob:|data:)/i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return `/uploads/${value}`;
}
