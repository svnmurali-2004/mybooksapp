import React from 'react';
import "./Card.css";
//import " ../assets/book1.jpg";

 // Assuming Card.jsx is in the same directory

const Card = () => {
    return (
        <div>
            <h1>Books</h1>
            <Card
                imageUrl="/src/assets/book1"
                description="A captivating novel about..."
                bookName="Book Title"
                author="Author Name"
            />
        </div>
    );
};

export default Card;

