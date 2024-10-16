export class JsonService {
  static stringify(data) {
    return JSON.stringify(data);
  }

  static parse(data) {
    return JSON.parse(data);
  }
}
