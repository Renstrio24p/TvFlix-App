/// <reference types="vite/client" />

// Interface for environment variables exposed by Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
