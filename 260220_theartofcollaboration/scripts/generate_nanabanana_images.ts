import { config as loadEnv } from "dotenv";
import { generateImages } from "./src/utils/gemini.ts";

loadEnv({ path: "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260206_gemini_image_gen/.env" });

const prompts = [
  `Nanabanana-inspired premium editorial illustration of a small AI-native product team collaborating with multiple autonomous agents in a modern studio, teal and navy palette, high contrast lighting, depth, no text, no watermark`,
  `Nanabanana-inspired data-story illustration showing speed gains vs review overhead trade-off, abstract charts and workflow nodes, cinematic yet clean, teal/navy/coral accents, no text, no watermark`,
  `Nanabanana-inspired product engineering concept art: design-to-code workflow, interface frames, API/data flow, deployment pipeline, modern Korean tech vibe, premium composition, no text, no watermark`
];

const all: string[] = [];

for (const prompt of prompts) {
  const paths = await generateImages(prompt, 1, undefined, "16:9");
  if (paths.length > 0) all.push(paths[0]);
}

console.log(JSON.stringify(all, null, 2));