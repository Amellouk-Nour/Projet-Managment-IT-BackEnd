export function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function isTokenExpired(payload) {
  return payload?.exp && Date.now() / 1000 > payload.exp;
}

export function getUserFromToken(token) {
  const payload = decodeToken(token);
  if (!payload || isTokenExpired(payload)) {
    localStorage.removeItem('token');
    return null;
  }
  return { id: payload.id, username: payload.sub, role: payload.role };
}
