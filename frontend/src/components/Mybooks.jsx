import React, { useEffect, useState } from 'react'
import UserBookCard from './UserBookCard.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";
const Mybooks = () => {
    const [userDetails, setUserDetails] = useState({});
    const [allBooks, setAllBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const navigate=useNavigate();


    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const userData = localStorage.getItem("user");
            const parsedData = JSON.parse(userData);
    
            const response = await axios.post("http://localhost:4000/api/login", {
              email: parsedData.email,
              password: parsedData.password,
            });
            console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUserDetails(response.data.user);
    
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        fetchData();
      }, [refresh]); 


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/getAllBooks");
                setAllBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [refresh]);


    const handleReturn = async (bookId) => {
        try {
            const response = await axios.post("http://localhost:4000/api/returnBook", {
                useremail: userDetails.email,
                bookid: bookId
            });

            console.log("Return successful:", response.data);
            setRefresh(!refresh)
        } catch (error) {
            console.error("Error Returning book:", error);
        }

    };

    const handleback = ()=>{
        navigate('/')
    }

    return (
<div>
    {userDetails && allBooks && (
        <div style={{padding:"20px", textAlign:"center"}}>
            <div className="btn"  onClick={handleback}>
                Back
            </div>
        </div>
    )}

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {allBooks.map((book) => {
            if (userDetails?.books.includes(book.id)) {
                return <UserBookCard key={book.id} book={book} onReturn={handleReturn} />;
            }
            return null;
        })}
    </div>
</div>

    );
}

export default Mybooks
