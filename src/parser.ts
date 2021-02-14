import YAML from 'yaml';

export class Parser {
  static parse(obj: string) {
    return new Parser(YAML.parse(obj));
  }

  private constructor(private obj: Object) {}
}
