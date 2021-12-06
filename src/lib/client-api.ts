const { VITE_API_URL = "" } = import.meta.env;

async function send(url: string, method: string, body?: any) {
  const options = { method }
  if (body) {
    options["body"] = JSON.stringify(body);
    options["headers"] = {
      "Content-Type": "application/json"
    }
  }
  return fetch(VITE_API_URL + "/" + url, options)
}

export function get(apiPath: string) {
  return send(apiPath, "GET");
}

// To wake up the heroku instance
get("api/houses");

export function post(apiPath: string, body: unknown) {
  return send(apiPath, "POST", body)
}
