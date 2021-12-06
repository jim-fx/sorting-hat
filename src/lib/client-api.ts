const { VITE_API_URL = "" } = import.meta.env as unknown as { VITE_API_URL: string };

async function send(_url: string, method: string, body?: any): Promise<Response> {
  const options = { method }
  if (body) {
    options["body"] = JSON.stringify(body);
    options["headers"] = {
      "Content-Type": "application/json"
    }
  }

  let url = VITE_API_URL +"/"+ _url;
  if (VITE_API_URL && VITE_API_URL.length) {
    url = "https://thingproxy.freeboard.io/fetch/" + url
  }

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
