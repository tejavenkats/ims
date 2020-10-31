import {useState,useEffect} from "react";
import BookTile from "./BookTile";
import Axios from "axios";

function BookShelfForInventory(props){
    const [responseArr,setResponseArr] = useState([])

    useEffect(()=>{
        Axios.get(props.getRoute).then(res=>{
            const resArr = res.data
            console.log(resArr);
            setResponseArr(resArr);
        })
    },[props.getRoute])
    return (<div>
         {responseArr.map((book,index)=>{
             return <BookTile key={index}
             thumbnailUrl={book.book_thumbnail} 
                            bookTitle={book.book_title}
                            bookAuthors={book.book_authors}
                            bookDescription={book.book_description}
                            inventoryCount={book.book_inventoryCount}

             />
         })}
    </div>)
}

export default BookShelfForInventory;