/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LINKEDIN_USER_ID?: string;
  readonly VITE_LINKEDIN_PROFILE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
