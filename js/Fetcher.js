export default class Fetcher {
  static async me() {
    const response = await fetch("assets/me.json");
    return await response.json();
  }
}
