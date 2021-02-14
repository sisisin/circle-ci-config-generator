import { Parser } from './parser';
import fs from 'fs';
import path from 'path';
function fixture(file: string) {
  const fixtureDir = path.resolve(__dirname, 'fixtures');
  return fs.readFileSync(path.resolve(fixtureDir, file)).toString();
}
test('instantiate', () => {
  const config = fixture('simple.yml');
  expect(Parser.parse(config)).toBeTruthy();
});
