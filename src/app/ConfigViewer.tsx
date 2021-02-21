import React from 'react';
import { parse, toJsonGraph } from './parser';
import Graph from 'react-json-graph';
import { buildAndTestAndDeploy, multiTestAndDeploy, testAndDeploy } from './fixtures/workflow';

const config1 = parse(testAndDeploy());
const config2 = parse(multiTestAndDeploy());
const config3 = parse(buildAndTestAndDeploy());

export const ConfigViewer: React.FC = () => {
  const [json, setJson] = React.useState(toJsonGraph(config2, 'main'));
  return (
    <div>
      <Graph
        width={1600}
        height={600}
        json={json}
        onChange={(newGraphJSON: any) => {
          setJson(newGraphJSON);
        }}
        scale={1}
        // minScale={0.5}
        isVertical
        shouldNodeFitContent
      />
      <pre>{JSON.stringify(json, null, '  ')}</pre>
    </div>
  );
};
