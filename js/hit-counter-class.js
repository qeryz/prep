// Hits counter
class HitCounter {
  constructor() {
    this.timestamps = new Array(300).fill(0);
    this.counts = new Array(300).fill(0);
    this.WINDOW = 300;
  }

  hit(timestamp) {
    let index = timestamp % this.WINDOW;
    this.counts[index] = (this.counts[index] || 0) + 1;
    this.timestamps[index] = timestamp;
  }

  getHits(timestamp) {
    let totalHits = 0;

    for (let i = 0; i < this.WINDOW; i++) {
      if (timestamp - this.timestamps[i] <= this.WINDOW) {
        totalHits += this.counts[i];
      }
    }
    return totalHits;
  }
}

counter = new HitCounter();

// hit at timestamp 1.
counter.hit(1);

// hit at timestamp 2.
counter.hit(2);

// hit at timestamp 3.
counter.hit(3);

// get hits at timestamp 4, should return 3.
console.log(counter.getHits(4));

// hit at timestamp 300.
counter.hit(300);

// get hits at timestamp 301, should return 4.
console.log(counter.getHits(301));

// get hits at timestamp 301, should return 3.
console.log(counter.getHits(302));
