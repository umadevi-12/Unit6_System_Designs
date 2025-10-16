
class Book {
  title: string;
  author: string;
  reviews: string[];

  constructor(title: string, author: string, reviews: string[]) {
    this.title = title;
    this.author = author;
    this.reviews = [...reviews];
  }

  clone(): Book {

    const clonedReviews = [...this.reviews];
    return new Book(this.title, this.author, clonedReviews);
  }

  
  printBook(): void {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Reviews: ${this.reviews.join(", ")}`);
  }
}

function main() {
  const original = new Book("TypeScript Patterns", "Jane Doe", [
    "Great book",
    "Very informative",
  ]);

  const cloned = original.clone();
  cloned.title = "TypeScript Patterns - Clone";
  cloned.reviews.push("Must-read for devs");

  console.log("Original Book:");
  original.printBook();

  console.log("\nCloned Book:");
  cloned.printBook();

  console.log("\nAre original and clone same instance?", original === cloned);
}

main();
