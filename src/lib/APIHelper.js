export default function createAPI(baseURL = (import.meta.env.VITE_API_URL || '')) {
  let token = null;
  let apiKey = null;

  function setToken(t) { token = t; }
  function setApiKey(k) { apiKey = k; }

  async function request(method, path, data = null, opts = {}) {
    // Construir URL de forma segura. Si no hay baseURL, usar path relativo (para proxy de Vite)
    const buildUrl = () => {
      if (!baseURL) return path;
      const b = String(baseURL).replace(/\/$/, '');
      const p = String(path).startsWith('/') ? path : '/' + path;
      return b + p;
    };
    const urlString = buildUrl();
    if (opts.params) {
      Object.keys(opts.params).forEach(k => url.searchParams.append(k, opts.params[k]));
    }

    const headers = Object.assign({}, opts.headers || {});
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (apiKey) headers['X-API-Key'] = apiKey;
    if (data && !(data instanceof FormData)) headers['Content-Type'] = 'application/json';

    const res = await fetch(urlString, {
      method: method.toUpperCase(),
      headers,
      body: data && !(data instanceof FormData) ? JSON.stringify(data) : data
    });

    const text = await res.text();
    let content = null;
    if (text) {
      try {
        content = JSON.parse(text);
      } catch (e) {
        // si no es JSON válido, devolver texto plano
        content = text;
      }
    }

    if (!res.ok) {
      const err = new Error(content?.message || `HTTP ${res.status}`);
      err.status = res.status;
      err.body = content;
      throw err;
    }

    return content;
  }

  async function login(email, password) {
    const data = await request('post', '/api/v1/auth/login', { email, password });
    if (data?.token) setToken(data.token);
    if (data?.apiKey) setApiKey(data.apiKey);
    return data;
  }

  return {
    setToken,
    setApiKey,
    login,
    request,
    get(path, opts) { return request('get', path, null, opts); },
    post(path, body, opts) { return request('post', path, body, opts); },
    put(path, body, opts) { return request('put', path, body, opts); },
    delete(path, opts) { return request('delete', path, null, opts); }
  };
}
