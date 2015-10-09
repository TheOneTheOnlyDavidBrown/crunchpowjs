export default class Liaison {
  constructor(data) {
    for (const datum in data) {
      if (datum) {
        this[datum] = data[datum];
      }
    }
  }
}
export default function loadComponent(module, data) {
  return new window[module](data);
}
