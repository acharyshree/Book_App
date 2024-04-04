
// import React, { useEffect, useState } from 'react';
// import { Link ,useNavigate} from 'react-router-dom';
// import "./home.css";
// import BookCard from './BookCard.jsx'; 
// import axios from 'axios';


// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [userDetails, setUserDetails] = useState({});

//   const [allBooks,setAllBooks] = useState([]); 

//   const [refresh,setRefresh] = useState(false);

//   const navigate = useNavigate()

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/getAllBooks");
//         setAllBooks(response.data.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, [refresh]);

 


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = localStorage.getItem("user");
//         const parsedData = JSON.parse(userData);

//         const response = await axios.post("http://localhost:4000/api/login", {
//           email: parsedData.email,
//           password: parsedData.password,
//         });
//         console.log(response.data.user);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         setUserDetails(response.data.user);

//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchData();
//   }, [refresh]); 

//   const handleBorrow = async (bookId) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/borrowbook", {
//         useremail: userDetails.email,
//         bookid: bookId
//       });
  
//       console.log("Borrow successful:", response.data);
//       setRefresh(!refresh)
//     } catch (error) {
//       console.error("Error borrowing book:", error);
//     }
//   };

//   const handleReturn = async (bookId) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/returnBook", {
//         useremail: userDetails.email,
//         bookid: bookId
//       });
  
//       console.log("Return successful:", response.data); 
//       setRefresh(!refresh)
//     } catch (error) {
//       console.error("Error Returning book:", error);
//     }
  
//   };

//   const handleBookdelete = async (bookID) =>{

//     try {
//       const response = await axios.post("http://localhost:4000/api/deletebook",{bookid:bookID});
//       console.log(response.data.data)
//       setRefresh(!refresh);
//     } catch (error) {
//       console.log("error",error);
//     }

//   }

//   const handleMybooks = ()=>{
    
//     console.log("mybooks")
//     navigate('/mybooks');
//   }

//   return (
//     <>
//       <div className="navbar-nav">
//         <div className="nav-item">
//           <Link to="/" className="nav-link" >
//             <span style={{margin:"12px"}}> Books</span>
//             </Link>
//         </div>
//         <div className="nav-item" style={{ display: "flex" ,margin:"12px"}}>
//           {isLoggedIn ? (
//             <>
//               {userDetails?.isAdmin && (
//                 <div style={{ paddingRight: "30px" }}>
//                   <Link to="/addbook" className="nav-link">Add Book</Link>
//                 </div>
//               )}

//               {!userDetails?.isAdmin && (
//               <span className="nav-link" style={{  color: "white",cursor:"pointer" ,margin:"0px 10px"}} onClick={handleMybooks}>My Books</span>
//               )}

//               <span className="nav-link" style={{  color: "black",cursor:"pointer" }} onClick={handleLogout}>Logout</span>
//             </>
//           ) : (
//             <>
//               <div style={{ paddingRight: "30px" }}>
//                 <Link to="/login" className="nav-link">Login</Link>
//               </div>
//               <div>
//                 <Link to="/signup" className="nav-link">Sign Up</Link>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {allBooks.map((book) => (
//           <BookCard
//             key={book.id}
//             book={book}
//             user={userDetails}
//             onBorrow={handleBorrow}
//             onReturn={handleReturn}
//             onDelete={handleBookdelete}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./home.css";
import BookCard from './BookCard.jsx';
import axios from 'axios';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [allBooks, setAllBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]); // Define filteredBooks state
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
  useEffect(() => {
    setFilteredBooks(allBooks); // Set filteredBooks to allBooks initially
  }, [allBooks]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user");
        const parsedData = JSON.parse(userData);

        const response = await axios.post("http://localhost:4000/api/login", {
          email: parsedData.email,
          password: parsedData.password,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUserDetails(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [refresh]);


  
  const handleBorrow = async (bookId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/borrowbook", {
        useremail: userDetails.email,
        bookid: bookId
      });
      console.log("Borrow successful:", response.data);
      setRefresh(!refresh)
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

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

  const handleBookdelete = async (bookID) => {
    try {
      const response = await axios.post("http://localhost:4000/api/deletebook", { bookid: bookID });
      console.log(response.data.data);
      setRefresh(!refresh);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleMybooks = () => {
    console.log("mybooks");
    navigate('/mybooks');
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    // If search term is empty, display all books
    if (searchTerm === '') {
      setFilteredBooks(allBooks);
    } else {
      // Otherwise, filter books based on search term
      console.log("Search Term:", searchTerm); // Log the search term

      const filteredBooks = allBooks.filter(book => {
        const title = book.title && typeof book.title === 'string' ? book.title.toLowerCase() : "";
        console.log("Book Title:", title); // Log each book title
        return title.includes(searchTerm);
      });
    
      console.log("Filtered Books:", filteredBooks); // Log the filtered books array
    
      setFilteredBooks(filteredBooks);
    }};


  
  
 
  return (
    <>
      <div className="navbar-nav">
        <div className="nav-item">
          <Link to="/" className="nav-link" >
            <span style={{ margin: "12px" }}> Books</span>
          </Link>
        </div>
        <div className="nav-item" style={{ display: "flex", margin: "12px" }}>
          {isLoggedIn ? (
            <>
              {!userDetails?.isAdmin && (
                <div style={{ paddingRight: "30px" }}>
                  <input
                    type="text"
                    placeholder="Search by title"
                    onChange={handleSearch}
                  />
                </div>
              )}
              {!userDetails?.isAdmin && (
                <span className="nav-link" style={{ color: "white", cursor: "pointer", margin: "0px 10px" }} onClick={handleMybooks}>My Books</span>
              )}
              <span className="nav-link" style={{ color: "black", cursor: "pointer" }} onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <>
              <div style={{ paddingRight: "30px" }}>
                <Link to="/login" className="nav-link">Login</Link>
              </div>
              <div>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            user={userDetails}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
            onDelete={handleBookdelete}
          />
        ))}
      </div>
    </>
  );
}

export default Home;

