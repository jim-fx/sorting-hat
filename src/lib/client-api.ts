const { VITE_API_URL = "" } = import.meta.env as unknown as { VITE_API_URL: string };

async function send(_url: string, method: string, body?: unknown): Promise<Response> {
  const options = { method }
  if (body) {
    options["body"] = JSON.stringify(body);
  }

  const url = VITE_API_URL +"/"+ _url;

  return fetch(url, options)
}

export function get(apiPath: string): Promise<Response> {
  return send(apiPath, "GET");
}

// To wake up the heroku instance
get("api/houses");

export function post(apiPath: string, body: unknown): Promise<Response> {
  return send(apiPath, "POST", body)
}
