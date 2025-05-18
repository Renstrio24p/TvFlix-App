import { defineConfig, Plugin } from "vite";
import { IncomingMessage, ServerResponse } from "http";
import checker from "vite-plugin-checker";

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
          "default-src 'self'; " +
          "script-src 'self' 'nonce-rAnd0m123' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://securepubads.g.doubleclick.net https://www.google-analytics.com https://www.gstatic.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "object-src 'none'; " +
          "frame-src 'self' https://www.youtube.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com; " +
          "img-src 'self' data: blob: https://image.tmdb.org https://blogger.googleusercontent.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; " +
          "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; " +
          "connect-src 'self' https://api.themoviedb.org https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; " +
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
  plugins: [securityHeadersPlugin(), checker({ typescript: true })],
});
