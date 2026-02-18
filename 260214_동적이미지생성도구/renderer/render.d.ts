declare module './render.mjs' {
  export function parseArgs(argv: string[]): Record<string, string>;
  export function run(argv: string[]): Promise<void>;
}
