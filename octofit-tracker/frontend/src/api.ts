const DEFAULT_API_PORT = 8000;

interface ImportMetaEnv {
  readonly VITE_CODESPACE_NAME?: string;
  readonly CODESPACE_NAME?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
}

export function getApiBaseUrl() {
  const env = (import.meta as ImportMeta).env;
  const codespaceName = env?.VITE_CODESPACE_NAME || env?.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${DEFAULT_API_PORT}.app.github.dev`;
  }

  return `http://localhost:${DEFAULT_API_PORT}`;
}

export function normalizeCollection(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object' && 'results' in payload) {
    const results = (payload as { results?: unknown }).results;
    return Array.isArray(results) ? results : [];
  }

  return [];
}
