import React, { useEffect, useState } from 'react';
import './home.css';

const BookCard = ({ book, onBorrow, onReturn, user , onDelete}) => {
  const isBookAvailable = book.count > 0;
 
  return (
    <div className="card">
      <div className="card-content">
        <div>
            <img src="https://source.unsplash.com/random/900x700?book" alt="book image"  style={{height:"9rem",width:"100%",objectFit:"cover"}}/>
        </div>
        <h2>{book.title}</h2>
        <p>Name: {book.name}</p>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Availability: {book.count>0 ? "Available" : "Not Available"}</p>
      </div>
      {
        user.isAdmin ? (
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div>{book.count}</div>
            <div>
              <button onClick={() => onDelete(book.id)}>Delete</button>
            </div>
        </div>

        ):(
          <div className="card-actions">
          {user?.books?.includes(book.id) ? (
          <button  className="but" onClick={isBookAvailable ? () => onReturn(book.id) : null} disabled={!isBookAvailable}>Return</button>
        ) : (
          <button   className="but" onClick={isBookAvailable ? () => onBorrow(book.id) : null} disabled={!isBookAvailable}>Borrow</button>
        )}
        </div>
        )
      }
      
    </div>
  )
}

export default BookCard;
