export default class Liaison {
  constructor(data) {
    let datum;
    for (datum in data) {
      this[datum] = data[datum];
    }
  }
}
export default function load_component(module, data) {
  new window[module](data);
}
