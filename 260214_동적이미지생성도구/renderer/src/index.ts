import React from 'react';
import {Composition, registerRoot} from 'remotion';

import {Infographic} from './Infographic';
import type {Graph} from './types';

const defaultGraph: Graph = {
  nodes: [],
  edges: [],
  timeline: [],
};

const RemotionRoot: React.FC = () => {
  return React.createElement(Composition, {
    id: 'Infographic',
    component: Infographic as React.ComponentType<Record<string, unknown>>,
    durationInFrames: 150,
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: {graph: defaultGraph},
  });
};

registerRoot(RemotionRoot);
