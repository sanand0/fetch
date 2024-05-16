const routes = {
  "/lta/(.*)": (request, groups, env) => {
    const headers = new Headers(request.headers);
    headers.set("AccountKey", env.LTA_API_KEY);
    headers.set("Content-Type", "application/json");
    const options = { method: request.method, headers };
    if (options.body) options.body = request.body;
    return new Request(`http://datamall2.mytransport.sg/ltaodataservice/${groups[1]}`, options);
  },
};

export default {
  async fetch(request, env) {
    for (const [route, modify] of Object.entries(routes)) {
      // Find the first route that matches the request URL
      const groups = new RegExp(route).exec(request.url);
      // Modify the request and stream the response
      if (groups) {
        const response = await fetch(modify(request, groups, env));
        // Enable CORS from anywhere, all methods, common headers, cookies, and cached preflight response
        const headers = new Headers(response.headers);
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        headers.set(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization, X-Requested-With, Accept, Origin, Accept-Language, Accept-Encoding, Cache-Control, Referer, User-Agent, X-Forwarded-For, X-Frame-Options, X-CSRF-Token",
        );
        headers.set("Access-Control-Allow-Credentials", "true");
        headers.set("Access-Control-Max-Age", "86400");
        // Stream the response with CORS headers
        return new Response(response.body, { ...response, headers });
      }
    }
    return new Response("Not Found", { status: 404 });
  },
};
