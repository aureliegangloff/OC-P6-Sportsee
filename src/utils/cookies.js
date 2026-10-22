// Create the cookie
export function setCookie(name, value, days = 1) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

// Read the cookie
export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const foundCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  if (!foundCookie) {
    return null;
  }

  return decodeURIComponent(foundCookie.split("=")[1]);
}

// Expire (delete) the cookie
export function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
