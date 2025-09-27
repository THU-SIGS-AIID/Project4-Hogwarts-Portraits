// Format large numbers like 1.2K/3.4M
export function formatCount(n) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K';
  return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'M';
}

