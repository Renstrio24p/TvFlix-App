import { defineConfig, Plugin } from "vite";
import { IncomingMessage, ServerResponse } from "http";

// Custom plugin to set CSP and CORS headers
const securityHeadersPlugin = (): Plugin => ({
  name: "security-headers-plugin",
  configureServer(server) {
    server.middlewares.use(
      (
        _req: IncomingMessage,
        res: ServerResponse,
        next: (err?: any) => void
      ) => {
        // Set Content Security Policy headers
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self' https://www.youtube.com https://api.themoviedb.org https://googleads.g.doubleclick.net; " +
            "script-src 'self' 'nonce-rAnd0m123' 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline' https://www.youtube.com; " +
            "object-src 'none'; " +
            "frame-src 'self' https://www.youtube.com; " + // Add semicolon here
            "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; " +
            "img-src 'self' https://blogger.googleusercontent.com https://image.tmdb.org https://googleads.g.doubleclick.net https://www.youtube.com; " +
            "connect-src 'self' https://api.themoviedb.org https://fonts.googleapis.com https://fonts.gstatic.com https://www.google.com/maps/ https://www.youtube.com/embed/ https://github.com https://googleads.g.doubleclick.net; " +
            "base-uri 'self'; " +
            "report-uri /csp-report;"
        );

        // Set CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");

        next();
      }
    );
  },
});

export default defineConfig({
  plugins: [securityHeadersPlugin()],
});
