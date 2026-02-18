import {bundle, renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {readFile} from 'node:fs/promises';

const parseArgs = (argv) => {
  const args = {};

  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace('--', '');
    const value = argv[i + 1];

    if (key && value) {
      args[key] = value;
    }
  }

  return args;
};

export {parseArgs};

export const run = async (argv) => {
  const {input, out, still, webm, gif} = parseArgs(argv);
  const graph = JSON.parse(await readFile(input, 'utf-8'));

  const serveUrl = await bundle({entryPoint: './src/index.ts'});
  const composition = await selectComposition({
    serveUrl,
    id: 'Infographic',
    inputProps: {graph},
  });

  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation: out,
    inputProps: {graph},
  });

  if (webm) {
    await renderMedia({
      composition,
      serveUrl,
      codec: 'webm',
      outputLocation: webm,
      inputProps: {graph},
    });
  }

  if (gif) {
    await renderMedia({
      composition,
      serveUrl,
      codec: 'gif',
      outputLocation: gif,
      inputProps: {graph},
    });
  }

  await renderStill({
    composition,
    serveUrl,
    output: still,
    inputProps: {graph},
  });
};

if (import.meta.url === `file://${process.argv[1]}`) {
  run(process.argv.slice(2));
}
