export class Liaison {
  constructor(data) {
    var datum
    for (datum in data) {
      this[datum] = data[datum];
    }
  }
}
export function load_component(module, data) {
  new window[module](data);
}
