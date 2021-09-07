import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../core/Navbar'

class EditProfile extends Component{

    constructor(){
        super()
        this.state={
            id: "",
            username: "",
            email: "",
            discord_id: "",
            favourite_game: "",
            password: "",
            error: "",
            redirect: false,
            about: ""
        }
    }
    
    handleChange = (username) => (event) => {
        this.setState({error: ""})
        this.setState({ [username]: event.target.value })
    }
    

    init = (userId) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}` ,{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data =>{
            if(data.error){
                this.setState({redirect: true})
            }
            else
            this.setState({id: data._id,
                username: data.username,
                email: data.email,
                discord_id: data.discord_id, 
                facourite_game: data.facourite_game,
                about: data.about,
                error: ''    
            })
        })
    }

    isValid = () => {
        const { name, email, password } = this.state;
        if (name.length === 0) {
          this.setState({ error: "Name is required", loading: false });
          return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "A valid Email is required",
            loading: false
          });
          return false;
        }
        if (password.length >= 1 && password.length <= 5) {
          this.setState({
            error: "Password must be at least 6 characters long",
            loading: false
          });
          return false;
        }
        return true;
      };

    update = (userId, token, user) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}` ,{
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    
    clickUpdate = event =>{
        event.preventDefault()
        const {username, email, password, discord_id, favourite_game, about} = this.state
        const user = {
            username,
            email,
            password: password || undefined ,
            discord_id,
            favourite_game,
            about
        }
        const userId = this.props.match.params.userId
        const token = isAuthenticated().token

        this.update(userId, token, user).then(data => {
                if(data.error) this.setState({error: data.error})
                else
                this.updateUser(data, () =>{
                    this.setState({
                        redirect: true
                    }) 
                })
                
            })
    }


    updateUser = (user, next) => {
        if(typeof window !== "undefined"){
            if(localStorage.getItem("jwt")){
                let auth = JSON.parse(localStorage.getItem("jwt"))
                auth.user = user.user
                localStorage.setItem("jwt", JSON.stringify(auth)) 
                next()               
            }
        }
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }
    
    render(){
        const {id, username, email, password, discord_id,favourite_game, about, redirect, error} = this.state

        if(redirect){
            return <Redirect to={`/user/${id}`}></Redirect>
        }

        return (
            <div className="container">
                <h2 className="mt-4 mb-4">Edit Profile</h2>           
                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Username</label>
                        <input onChange={this.handleChange("username")} type ="text" className="form-control" value={username}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type ="email" className="form-control" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type ="password" className="form-control" value={password}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Discord Id</label>
                        <input onChange={this.handleChange("discord_id")} type ="text" className="form-control" value={discord_id}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About:</label>
                        <textarea onChange={this.handleChange("about")} type ="text" className="form-control" value={about}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Favourite Game</label>
                        <select onChange={this.handleChange("favourite_game")} id="games" name="games" value={favourite_game} >
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
                    <button onClick={this.clickUpdate} className="btn btn-raised btn-primary">Update</button>
                </form>
            </div>
        )
    }
}

export default EditProfile