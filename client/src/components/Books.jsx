import React from 'react';
import './Books.css'; 

const Books = () => {
  // Sample book data
  const books = [
    {
      id: 1,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father - a crusading local lawyer - risks everything to defend a black man unjustly accused of a terrible crime.",
      image: "https://images.moviesanywhere.com/3440e3c7a40ff47a723959babc8ee4d4/6f8d7bef-6d1c-4618-9dac-114225f36567.webp?h=375&resize=fit&w=250"
    },
    {
      id: 2,
      name: "1984",
      author: "George Orwell",
      description: "Among the seminal texts of the 20th century, 1984 is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
      image: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg"
    },
    {
      id: 3,
      name: "The Power of Your Subconscious Mind",
      author: "Joseph Murphy",
      description: "In this book, Dr. Joseph Murphy explains how to harness the power of your subconscious mind to achieve success, happiness, and prosperity. Through practical techniques and real-life examples, he shows you how to reprogram your subconscious mind for positive change.",
      image: "https://miro.medium.com/v2/resize:fit:512/1*eU1lRRO4abpfs3gXBcKjyg.jpeg"
    },
    {
      id: 4,
      name: "The 48 Laws of Power",
      author: "Robert Greene",
      description: "The 48 Laws of Power examines how to gain power, preserve it, and use it ethically and effectively. Drawing on historical examples and philosophical insights, Robert Greene provides timeless lessons on strategy, manipulation, and human nature.",
      image: "https://rukminim2.flixcart.com/image/300/400/xif0q/regionalbooks/g/m/t/the-48-laws-of-power-original-imaggw57dgbukgjd.jpeg?q=90&crop=false"
    },
    {
      id: 5,
      name: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      description: "Rich Dad Poor Dad is a personal finance classic that challenges conventional wisdom about money. It presents the teachings of the author's two fathers: one, his biological father (the 'poor dad') and the other, the father of his best friend (the 'rich dad'). Through their contrasting philosophies, Kiyosaki shares insights on wealth-building and financial independence.",
      image: "https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg"
    },
    // Add more books here...
    {
      id: 6,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "The Great Gatsby is a novel by American author F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession with Nick's cousin Daisy Buchanan.",
      image: "https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_DpWeblab_.jpg"
    },
    {
      id: 7,
      name: "The Catcher in the Rye",
      author: "J.D. Salinger",
      description: "The Catcher in the Rye is a story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society.",
      image: "https://m.media-amazon.com/images/I/7108sdEUEGL._SY466_.jpg"
    },
    {
      id: 8,
      name: "The Alchemist",
      author: "Paulo Coelho",
      description: "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it has been translated into many languages. The book follows a young Andalusian shepherd named Santiago in his journey to Egypt, after having a recurring dream of finding treasure there.",
      image: "https://m.media-amazon.com/images/I/51BBCrLdH6L.jpg"
    },
    {
      id: 9,
      name: "Think and Grow Rich",
      author: "Napoleon Hill",
      description: "Think and Grow Rich is a motivational personal development and self-help book written by Napoleon Hill and inspired by a suggestion from Scottish-American businessman Andrew Carnegie. While the title implies that this book deals only with how to get rich, the author explains that the philosophy taught in the book can be used to help people succeed in all lines of work and to do or be almost anything they want.",
      image: "https://m.media-amazon.com/images/I/61CIKpN5QjL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 10,
      name: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      description: "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life is the second book by blogger and author Mark Manson. In it, Manson argues that life's struggles give it meaning, and that the mindless positivity of typical self-help books is neither practical nor helpful. It was a bestseller.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28lZ8J_Onye7HG2kNl84inO9ZzpkvKzNpIYwNMxiahw&s"
    }
  ];

  return (
    <>
      <div className="bookstore">
        <h1>BOOK STORE</h1>
      </div>
      <div className="booklist">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <img src={book.image} alt={book.name} className="book-image" />
            <div className="book-details">
              <h2 className="book-title">{book.name}</h2>
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <p className="book-description">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
