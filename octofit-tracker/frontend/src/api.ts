const API_PORT = 8000;

function getCodespaceName(): string | undefined {
  if (typeof import.meta !== 'undefined') {
    const env = import.meta.env as Record<string, string | undefined>;
    if (env.CODESPACE_NAME) {
      return env.CODESPACE_NAME;
    }
    if (env.VITE_CODESPACE_NAME) {
      return env.VITE_CODESPACE_NAME;
    }
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const codespaceMatch = hostname.match(/^(.+)-\d+\.app\.github\.dev$/);
    if (codespaceMatch?.[1]) {
      return codespaceMatch[1];
    }
  }

  return undefined;
}

const codespaceName = getCodespaceName();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-${API_PORT}.app.github.dev`
  : `http://localhost:${API_PORT}`;

export async function fetchUsers() {
  return fetch(`${API_BASE_URL}/api/users`).then((res) => res.json());
}

export async function fetchActivities() {
  return fetch(`${API_BASE_URL}/api/activities`).then((res) => res.json());
}
