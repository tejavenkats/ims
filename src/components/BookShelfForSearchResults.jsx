import {React,useState,useEffect} from "react";
import Axios from "axios";
import BookTile from "./BookTile";

function BookShelfForSearchResults(props){
    const [responseArrFromSearch,setResponseArrFromSearch] = useState([]);
   
    useEffect( ()=>{
        const fetchData = async () =>{
        const response = await Axios.get(props.getRoute);
        setResponseArrFromSearch(response.data.items); }
        fetchData();
    },[props.getRoute])


    return (<div>
         {responseArrFromSearch.map((book,index)=>{
             return <BookTile key={index}
                            thumbnailUrl={book.volumeInfo.imageLinks.thumbnail} 
                            bookTitle={book.volumeInfo.title}
                            bookAuthors={book.volumeInfo.authors}
                            bookDescription={book.volumeInfo.description}
                            isSearchRequest={true}

             />
         })}
    </div>)
}

export default BookShelfForSearchResults;