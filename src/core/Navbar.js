import React, { Component } from 'react'
import './main.css'



export const signout = (next) => {
    if(typeof window !== "undefine") localStorage.removeItem("jwt")
    next()
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`,{
        method: "GET"
    })
    .then(response => {
        console.log('signout', response)
        return Response.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}



class Navbar extends Component{
    
     dropdownMenu(){
        var x = document.getElementById("dropdown")
        if (x.className === "topnav") {
            x.className += " responsive"
        } else{
            x.className = "topnav"                
        }
    }
    
    render(){
    
    

        return (

    <div>
    <nav className = "header-nav">
    
    <ul className="topnav" id="dropdown">
        <li><a href="/">PerfecTTeam</a></li>
        <li><a href="/users">Gamers</a></li>
        <li><a href="/matches">Matches</a></li>
        <li><a href={`/matches/game/${isAuthenticated().user.favourite_game}`}>Matches for you</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
        {!isAuthenticated() && (
        <div>
        <li className="topnav-right"><a href="/signup">Signup</a></li>
        <li className="topnav-right"><a href="/signin">Signin</a></li>
        </div>
        )}
        {isAuthenticated() && (
        <div>
        <li><a href="/matches/new">Add new Match</a></li>
        <li className="topnav-right"><a href="/" onClick={() => signout()}>Signout</a></li>
        <li className="topnav-right"><a href={`/user/${isAuthenticated().user._id}`}>{isAuthenticated().user.username}'s Profile</a></li>
        </div>
        )}

        <li className="dropdownIcon"><a onClick= {this.dropdownMenu}>&#9776;</a></li>
    </ul>
</nav>
</div>
    )
    }
}


export default Navbar