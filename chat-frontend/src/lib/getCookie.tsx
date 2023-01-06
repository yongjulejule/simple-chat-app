export const getCookie: (key: string) => string | null = (
  key: string,
): string | null => {
  alert('getCookie called' + key);
  const cookie = document.cookie.split('; ').find((row) => row.startsWith(key));
  if (cookie === undefined) {
    return null;
  }
  return cookie.split('=')[1];
};
