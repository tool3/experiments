const http = require("http");
const https = require("https");

const colorMap = {
  GET: "\x1b[32m",
  POST: "\x1b[34m",
  PUT: "\x1b[93m",
  DELETE: "\x1b[31m",
  OPTIONS: "\x1b[35m",
  RESET: "\x1b[0m",
};

function sniff() {
  const originalRequest = http.request;
  const originalSRequest = https.request;

  http.request = function wrapMethodRequest(req) {
    const { host, method, path, query, hostname } =
      typeof req === "string" ? { host: req, method: "GET", path: "" } : req;
    const url = hostname || host;
    if (url) {
      const color = colorMap[method];
      const reset = colorMap.RESET;
      const formattedMethod = `[${color.replace("m", ";1m")}${method}]${reset}`;
      const queryPath = query ? `?${query}` : "";
      const urlPath = path === "/" || !path ? "" : path;
      const href = `${color}http://${url}${urlPath}${queryPath}${reset}`;
      const formatted = `${formattedMethod} ${href}`;
      console.log(formatted);
    }

    return originalRequest.apply(this, arguments);
  };

  https.request = function wrapMethodRequest(req) {
    console.log(req)
    const { host, method, path, query, hostname } =
      typeof req === "string" ? { host: req, method: "GET", path: "" } : req;
    const url = hostname || host;
    if (url) {
      const color = colorMap[method];
      const reset = colorMap.RESET;
      const formattedMethod = `[${color.replace("m", ";1m")}${method}]${reset}`;
      const queryPath = query ? `?${query}` : "";
      const urlPath = path === "/" || !path ? "" : path;
      const href = `${color}https://${url}${urlPath}${queryPath}${reset}`;
      const formatted = `${formattedMethod} ${href}`;
      console.log(formatted);
    }

    return originalSRequest.apply(this, arguments);
  };
}

module.exports = sniff();
