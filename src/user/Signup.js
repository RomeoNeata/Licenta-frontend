import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component{
    constructor(){
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            discord_id: "",
            favourite_game: "",
            error: "",
            open: false
        }
    }


handleChange = (username) => (event) => {
    this.setState({error: ""})
    this.setState({ [username]: event.target.value })
}

clickSubmit = event =>{
    event.preventDefault()
    const {username, email, password, discord_id, favourite_game} = this.state
    const user = {
        username,
        email,
        password,
        discord_id,
        favourite_game
    }

    this.signup(user)
    .then(data => {
        if(data.error) this.setState({error: data.error})
            else
            this.setState({
                error: "",
                username: "",
                email: "",
                password: "",
                discord_id: "",
                favourite_game: "",
                open: true
            })
    })
}

signup = user =>{
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


    render(){
        const {username, email, password, discord_id, favourite_game, error, open} = this.state
        return(
            <div className="container">
                <h2 className="mt-4 mb-4">Signup</h2>

                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <div className="alert" style={{display: open ? "" : "none"}}>
                    Sign up succesfull. Please <Link to="/signin">Sign In</Link>
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Username</label>
                        <input onChange={this.handleChange("username")} type ="email" className="form-control" value={username}></input>
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type ="email" className="form-control" value={email}></input>
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type ="password" className="form-control" value={password}></input>
                    </div>
                    <div class="col-auto">
                        <span id="textExample2" class="form-text"> Password must contain at least 6 characters and a number  </span>
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div className="form-group">
                        <label className="text-muted">Discord Id</label>
                        <input onChange={this.handleChange("discord_id")} type ="text" className="form-control" value={discord_id}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Favourite Game</label>
                        <select onChange={this.handleChange("favourite_game")} id="games" name="games" value={favourite_game} >
                            <option>None</option>
                            <option>League of Legends</option>
                            <option>Valorant</option>
                        </select>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup