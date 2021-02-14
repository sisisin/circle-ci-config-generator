import fs from 'fs';
import path from 'path';
import { getJobs, getNext, parse } from './parser';

function fixture(file: string) {
  const fixtureDir = path.resolve(__dirname, 'fixtures');
  return fs.readFileSync(path.resolve(fixtureDir, file)).toString();
}

test('getJobs', () => {
  const config = parse(fixture('simple.yml'));
  const result = getJobs(config, 'tests');
  expect(result.map((j) => j.key)).toStrictEqual(['test', 'deploy']);
});

describe('getNext', () => {
  const config = parse(fixture('simple.yml'));
  it('deploy has no next job', () => {
    const result = getNext(getJobs(config, 'tests'), 'deploy');
    expect(result).toStrictEqual([]);
  });
  it('test has next `deploy` job', () => {
    const result = getNext(getJobs(config, 'tests'), 'test');
    expect(result).toStrictEqual(['deploy']);
  });
});

describe('toJsonGraph', () => {});
