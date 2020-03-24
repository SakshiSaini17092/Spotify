import React, { Component } from "react";
import "./App.css";
import SearchExampleStandard from "./components/searchBar"
import HeaderExampleUsersIcon from "./components/header"

let items;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: [] };
    }
    
    callAPI() {
        fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => {

            res = JSON.parse(res);                
            this.setState({ apiResponse: res })
            }
        )
        .catch(err => err);   
    }

    componentDidMount() {
        this.callAPI()
    }

    render() {
        return (
            <div>
                <HeaderExampleUsersIcon/>
                <SearchExampleStandard/>
            </div>
            
    )}
}

export default App;
