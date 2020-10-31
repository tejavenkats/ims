import {React} from "react";
import {Route} from "react-router-dom";
function Navbar(){

    
    return (
        <div className="navbar">
            <Route render={({history})=>(
                    <p onClick={()=>{
                        history.push("/")
                    }} className="brand">BOOKS</p>
            )}/>
            <input placeholder="Search New Books" className="search-bar" type="text" name="search" id="search"/>
            <Route render={({history}) => (
                <button onClick={()=>{
                    let searchBarInput = document.getElementById("search").value
                    history.push({
                        pathname:"/search",
                        state:{getRoute:"https://www.googleapis.com/books/v1/volumes?q=" + searchBarInput +"&maxResults=20"}})
                        document.getElementById("search").value = ""
                    }} className="search-btn" type="button">GO</button>
            )}/>
            
        </div>
    )
}

export default Navbar;