import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../core/Navbar'
import {create} from "./apiMatch"

class NewMatch extends Component{

    constructor(){
        super()
        this.state={
            title: '',
            body: '',
            image: '',
            game: '',
            error: '',
            user:{},
            fileSize: 0,
            redirect: false

        }
    }
    
    handleChange = text => event => {
        this.setState({error: ""})
        const value = text === "image" ? event.target.files[0] : event.target.value
        const fileSize = text === "image" ? event.target.files[0].size : 0
        this.matchData.set(text, value)
        this.setState({[text]: value, fileSize })
    }
    
    isValid = () => {
        const { title, body, game, fileSize } = this.state;
        if (fileSize > 1000000) {
          this.setState({
            error: "File size should be less than 100kb",
            loading: false
          });
          return false;
        }
        if (title.length === 0) {
          this.setState({ error: "Title is required" });
          return false;
        }
        if (body.length === 0) {
            this.setState({ error: "Body is required" });
            return false;
          }
        if (game.length === 0) {
            this.setState({ error: "Game is required"});
            return false;
          }
          return true
      };

    
    clickSubmit = event =>{
        event.preventDefault()
        
        if(this.isValid()){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        console.log(this.matchData)
        create(userId, token, this.matchData).then(data => {
                console.log(data)
                if(data.error) this.setState({error: data.error})
                else
                this.setState({title: '', body: '', game: '', redirect: true})
                
            })
        }
    }


    // updateUser = (user, next) => {
    //     if(typeof window !== "undefined"){
    //         if(localStorage.getItem("jwt")){
    //             let auth = JSON.parse(localStorage.getItem("jwt"))
    //             auth.user = user
    //             localStorage.setItem("jwt", JSON.stringify(auth)) 
    //             next()               
    //         }
    //     }
    // }

    componentDidMount(){
        this.matchData = new FormData()
        this.setState({user: isAuthenticated().user})
    }
    
    render(){
        const {title, body, game, image, user, error, redirect} = this.state

        if(redirect){
            return <Redirect to={`/user/${user._id}`}></Redirect>
        }

        return (
            <div className="container">
                <h2 className="mt-4 mb-4">Create a new match</h2>           
                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Image</label>
                        <input onChange={this.handleChange("image")} type ="file" accept="image/*" className="form-control" ></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input onChange={this.handleChange("title")} type ="text" className="form-control" value={title}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Description:</label>
                        <textarea onChange={this.handleChange("body")} type ="text" className="form-control" value={body}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Game</label>
                        <select onChange={this.handleChange("game")} id="games" name="games" value={game} >
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

export default NewMatch