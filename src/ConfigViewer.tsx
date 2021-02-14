import React from 'react';
import simpleConfig from './fixtures/simple.yml';

import { CircleCi, getJobs } from './parser';
// const config = parse(simpleConfig);
const config = simpleConfig as CircleCi.Config;

export const ConfigViewer: React.FC = () => {
  return (
    <div>
      <pre>{JSON.stringify(config, null, '  ')}</pre>
    </div>
  );
};
