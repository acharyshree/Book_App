import React from 'react'
import './home.css';
const UserBookCard = ({ book, onReturn }) => {

    const isBookAvailable = book.count > 0;
    return (
        <>

            <div className="card">
                <div className="card-content">
                    <div>
                        <img src="https://source.unsplash.com/random/900x700?book" alt="book image" style={{ height: "9rem", width: "100%", objectFit: "cover" }} />
                    </div>
                    <h2>{book.title}</h2>
                    <p>Name: {book.name}</p>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Availability: {book.count > 0 ? "Available" : "Not Available"}</p>
                </div>

                <button className='but' onClick={isBookAvailable ? () => onReturn(book.id) : null} disabled={!isBookAvailable}>Return</button>


            </div>

        </>
    )
}

export default UserBookCard
