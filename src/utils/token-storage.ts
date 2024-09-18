export function getAccessToken(): string | null {
  return localStorage.getItem("session-token");
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem("session-token", accessToken);
}

export function hasAccessToken(): boolean {
  return getAccessToken() !== null;
}

export function clearAccessToken(): void {
  localStorage.removeItem("session-token");
}
