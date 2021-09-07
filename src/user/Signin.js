import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import val from '../images/val.jpg'

class Signin extends Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false
        }
    }


authenticate(jwt, next) {
    //Check if window is available
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}

handleChange = (username) => (event) => {
    this.setState({error: ""})
    this.setState({ [username]: event.target.value })
}

clickSubmit = event =>{
    event.preventDefault()
    this.setState({loading: true})
    const {email, password} = this.state
    const user = {
        email,
        password
    }

    this.signin(user)
    .then(data => {
        if(data.error) this.setState({error: data.error, loading: false})
            else{
            //auth
            this.authenticate(data, () =>{
                this.setState({redirect: true})
            })
        }
    })
}

signin = user =>{
    
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
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
        const {email, password, error, redirect, loading} = this.state
        if(redirect){
            return <Redirect to="/" />
        }
        return(
            <div className="container">
                <h2 className="mt-4 mb-4">Signin</h2>

                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                    </div> : ""}
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type ="email" className="form-control" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type ="password" className="form-control" value={password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
                <img className="img-wrapper" src={val} style={{width:"100%"}}></img>

            </div>
        )
    }
}

export default Signin