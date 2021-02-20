import fs from 'fs';
import path from 'path';
import { toJsonGraph, parse } from './parser';
import { buildAndTestAndDeploy, multiTestAndDeploy, testAndDeploy } from './fixtures/workflow';
export function fixture(file: string) {
  const fixtureDir = path.resolve(__dirname, 'fixtures');
  return fs.readFileSync(path.resolve(fixtureDir, file)).toString();
}

describe('toJsonGraph', () => {
  describe('one to many to one', () => {
    const config = parse(buildAndTestAndDeploy());
    const subject = toJsonGraph(config, 'main');
    it('edge', () => {
      expect(subject.edges).toStrictEqual([
        { source: 'build', target: 'acceptance_test_1' },
        { source: 'build', target: 'acceptance_test_2' },
        { source: 'build', target: 'acceptance_test_3' },
        { source: 'build', target: 'acceptance_test_4' },
        { source: 'acceptance_test_1', target: 'deploy' },
        { source: 'acceptance_test_2', target: 'deploy' },
        { source: 'acceptance_test_3', target: 'deploy' },
        { source: 'acceptance_test_4', target: 'deploy' },
      ]);
    });
    it.skip('node', () => {
      expect(subject.nodes).toStrictEqual([
        { id: 'build', label: 'build', position: { x: 0, y: 0 } },
        { id: 'acceptance_test_1', label: 'acceptance_test_1', position: { x: 220, y: 0 } },
        { id: 'acceptance_test_2', label: 'acceptance_test_2', position: { x: 220, y: 50 } },
        { id: 'acceptance_test_3', label: 'acceptance_test_3', position: { x: 220, y: 100 } },
        { id: 'acceptance_test_4', label: 'acceptance_test_4', position: { x: 220, y: 150 } },
        { id: 'deploy', label: 'deploy', position: { x: 440, y: 0 } },
      ]);
    });
  });
  it('multi requires', () => {
    const config = parse(multiTestAndDeploy());
    expect(toJsonGraph(config, 'main')).toStrictEqual({
      edges: [
        { source: 'acceptance_test_1', target: 'deploy' },
        { source: 'acceptance_test_2', target: 'deploy' },
        { source: 'acceptance_test_3', target: 'deploy' },
        { source: 'acceptance_test_4', target: 'deploy' },
      ],
      nodes: [
        { id: 'acceptance_test_1', label: 'acceptance_test_1', position: { x: 0, y: 0 } },
        { id: 'acceptance_test_2', label: 'acceptance_test_2', position: { x: 0, y: 50 } },
        { id: 'acceptance_test_3', label: 'acceptance_test_3', position: { x: 0, y: 100 } },
        { id: 'acceptance_test_4', label: 'acceptance_test_4', position: { x: 0, y: 150 } },
        { id: 'deploy', label: 'deploy', position: { x: 220, y: 0 } },
      ],
    });
  });
  it('simple case', () => {
    const config = parse(testAndDeploy());
    expect(toJsonGraph(config, 'main')).toStrictEqual({
      edges: [{ source: 'test', target: 'deploy' }],
      nodes: [
        { id: 'test', label: 'test', position: { x: 0, y: 0 } },
        { id: 'deploy', label: 'deploy', position: { x: 220, y: 0 } },
      ],
    });
  });
});
