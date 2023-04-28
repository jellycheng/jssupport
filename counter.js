"use strict";                                                                                                                                                                          

class Counter {

  constructor() {
    this.n = 0;
  }

  nextId() {
    let ret = this.n;
    if (this.n === 0xFFFFFFFF) {
      this.n = 0;
    } else {
      ++this.n;
    }
    return ret;
  }

}

module.exports = Counter;
