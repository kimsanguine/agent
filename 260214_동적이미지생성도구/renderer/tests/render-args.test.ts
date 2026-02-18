import {describe, expect, it} from 'vitest';
import {parseArgs} from '../src/render-args';

describe('parseArgs', () => {
  it('parses required args', () => {
    const parsed = parseArgs(['--input', 'graph.json', '--out', 'video.mp4', '--still', 'thumb.png']);
    expect(parsed.input).toBe('graph.json');
    expect(parsed.out).toBe('video.mp4');
    expect(parsed.still).toBe('thumb.png');
  });

  it('parses optional multi-format output args', () => {
    const parsed = parseArgs([
      '--input',
      'graph.json',
      '--out',
      'video.mp4',
      '--still',
      'thumb.png',
      '--webm',
      'video.webm',
      '--gif',
      'video.gif',
    ]);

    expect(parsed.webm).toBe('video.webm');
    expect(parsed.gif).toBe('video.gif');
  });
});
