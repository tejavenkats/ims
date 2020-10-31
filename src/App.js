import React from "react";
import {Route,Switch} from "react-router-dom";
import BookShelfForInventory from "./components/BookShelfForInventory";
import BookShelfForSearchResults from "./components/BookShelfForSearchResults";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact
        render={()=>
          <BookShelfForInventory getRoute="http://localhost:5000/getAllBooks"/>
        }/>
        <Route path="/search" exact 
        render={(props)=><BookShelfForSearchResults {...props.location.state} /> }/>
      </Switch>
      
    </div>
  );
}

export default App;
