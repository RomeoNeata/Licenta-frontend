import React, {Component} from 'react'
import { getMatch, update } from './apiMatch'
import { isAuthenticated } from '../core/Navbar'
import {Redirect} from "react-router-dom"
import Defaultimg from '../images/logo.jpg'

class EditMatch extends Component{
    constructor(){
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            image: '',
            game: '',
            error: '', 
            fileSize: 0,
            redirect: false
        }
    }

    init = (matchId) => {
        getMatch(matchId)
        .then(data =>{
            if(data.error){
                this.setState({redirect: true})
            }
            else
            this.setState({id: data._id,
                id: data._id, 
                title: data.title,
                body: data.body,
                game: data.game,
                error: ''    
            })
        })
    }

    componentDidMount(){
        this.matchData = new FormData()
        const matchId = this.props.match.params.matchId
        this.init(matchId)
    }

    clickSubmit = event =>{
        event.preventDefault()
        
        if(this.isValid()){
        const matchId = this.state.id
        const token = isAuthenticated().token

        update(matchId, token, this.matchData).then(data => {
                console.log(data)
                if(data.error) this.setState({error: data.error})
                else
                this.setState({title: '', body: '', game: '', redirect: true})
                
            })
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


    render(){
        const{ id, title, body, game, redirect, error} = this.state
        if(redirect){
            return <Redirect to={`/matches`}></Redirect>
        }
        return(
            <div>
                <h2>{title}</h2>
                <div className="container">
                <h2 className="mt-4 mb-4">Create a new match</h2>   
                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>        
                <img src={`${process.env.REACT_APP_BACKEND_URL}/matches/image/${id}`} 
                    onError={i =>(i.target.src = `${Defaultimg}`)}
                    style={{ height: "auto", width: "30%" }}
                        />
                <form>
                    <div className="form-group">
                        <label className="text-muted">Image</label>
                        <input onChange={this.handleChange("image")} type ="file" accept="image/*" className="form-control"  ></input>
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
                            <option>Starcraft</option>
                            <option>Counter-Strike Global Offensive</option>
                            <option>Dota</option>
                            <option>Team Fortress 2</option>
                            <option>Overwatch</option>
                            <option>Diablo</option>
                            <option>Knockout City</option>
                            <option>Fifa</option>
                            <option>NBA 2k</option>
                            <option>World of Warcraft</option>
                            <option>Heroes of the storm</option>
                        </select>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Match</button>
                </form>

            </div>
            </div>
        )
    }
}

export default EditMatch