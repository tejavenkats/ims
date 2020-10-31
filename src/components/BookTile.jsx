
import "./components.css"

function BookTile(props){

    return (
        // <div>hello</div>
        <div className="tile-container">
            <p className="title">{props.bookTitle}</p>
            <p className="authors">Authors: {props.bookAuthors}</p> 
            <img className="thumbnail" src={props.thumbnailUrl} alt="thumbnail for the book" />
            {props.isSearchRequest?<div></div> : <p className="stock"><span>No of Books in Inventory:</span> {props.inventoryCount}</p>     
}
            <p className="description"><span>Description: </span>{props.bookDescription !== undefined ? props.bookDescription.substring(0,90) + "....." : "No description available"} </p>
        </div>
    )
    
}

export default BookTile;