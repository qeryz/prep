// Popularity class
class ContentPopularity {
  constructor() {
    this.likes = {};
  }

  increasePopularity(id) {
    this.likes[id] = this.likes[id] ?? 0;
    this.likes[id]++;
  }

  decreasePopularity(id) {
    this.likes[id] = this.likes[id] ?? 0;
    this.likes[id]--;
  }

  mostPopular() {
    const sortedLikes = Object.entries(this.likes).sort((a, b) => b[1] - a[1]);
    return sortedLikes?.[0]?.[0] ?? -1;
  }
}

const popular = new ContentPopularity();

popular.increasePopularity(1);
popular.increasePopularity(1);
popular.increasePopularity(2);
popular.decreasePopularity(1);
popular.decreasePopularity(1);

console.log(popular.mostPopular()); // 2

//To get a guaranteed best-case time complexity, you would need a Max Heap.
// Method                     Time Complexity (with Max Heap)     Notes
// increasePopularity(id)     O(log N)                            Update score in map, then update item position in the heap (sift-up).
// decreasePopularity(id)     O(\log N)                           Update score in map, then update item position in the heap (sift-down).
// mostPopular()              O(1)                                The root of the heap is the most popular item.
