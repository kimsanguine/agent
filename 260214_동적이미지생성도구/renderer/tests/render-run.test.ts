import {beforeEach, describe, expect, it, vi} from 'vitest';

const mockBundle = vi.fn();
const mockSelectComposition = vi.fn();
const mockRenderMedia = vi.fn();
const mockRenderStill = vi.fn();
const mockReadFile = vi.fn();

vi.mock('@remotion/bundler', () => ({
  bundle: mockBundle,
}));

vi.mock('@remotion/renderer', () => ({
  selectComposition: mockSelectComposition,
  renderMedia: mockRenderMedia,
  renderStill: mockRenderStill,
}));

vi.mock('node:fs/promises', () => ({
  readFile: mockReadFile,
}));

describe('render.mjs run', () => {
  beforeEach(() => {
    mockBundle.mockReset();
    mockSelectComposition.mockReset();
    mockRenderMedia.mockReset();
    mockRenderStill.mockReset();
    mockReadFile.mockReset();

    mockReadFile.mockResolvedValue('{}');
    mockBundle.mockResolvedValue('http://localhost:3000');
    mockSelectComposition.mockResolvedValue({id: 'Infographic'});
    mockRenderMedia.mockResolvedValue(undefined);
    mockRenderStill.mockResolvedValue(undefined);
  });

  it('renders optional webm and gif outputs when provided', async () => {
    // @ts-ignore - ESM runtime module imported directly in test
    const {run} = await import('../render.mjs');

    await run([
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

    expect(mockRenderMedia).toHaveBeenCalledTimes(3);
    expect(mockRenderMedia).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        codec: 'h264',
        outputLocation: 'video.mp4',
      }),
    );
    expect(mockRenderMedia).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        codec: 'webm',
        outputLocation: 'video.webm',
      }),
    );
    expect(mockRenderMedia).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        codec: 'gif',
        outputLocation: 'video.gif',
      }),
    );
  });

  it('keeps default single media render when optional outputs are absent', async () => {
    // @ts-ignore - ESM runtime module imported directly in test
    const {run} = await import('../render.mjs');

    await run(['--input', 'graph.json', '--out', 'video.mp4', '--still', 'thumb.png']);

    expect(mockRenderMedia).toHaveBeenCalledTimes(1);
    expect(mockRenderMedia).toHaveBeenCalledWith(
      expect.objectContaining({
        codec: 'h264',
        outputLocation: 'video.mp4',
      }),
    );
    expect(mockRenderStill).toHaveBeenCalledTimes(1);
  });
});
