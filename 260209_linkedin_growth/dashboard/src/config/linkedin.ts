const DEFAULT_LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/sanguinekim/';

function extractLinkedInHandle(url: string): string | null {
  const match = url.match(/linkedin\.com\/in\/([^/?#]+)/i);
  return match?.[1] ?? null;
}

const envProfileUrl = import.meta.env.VITE_LINKEDIN_PROFILE_URL?.trim();
const envUserId = import.meta.env.VITE_LINKEDIN_USER_ID?.trim();

export const LINKEDIN_PROFILE_URL = envProfileUrl || DEFAULT_LINKEDIN_PROFILE_URL;
export const LINKEDIN_USER_ID = envUserId || extractLinkedInHandle(LINKEDIN_PROFILE_URL) || 'mock-user';
