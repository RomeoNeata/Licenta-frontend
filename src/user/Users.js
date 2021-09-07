import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Defaultimg from '../images/defaultProfile.png'

class Users extends Component{
    constructor(){
        super()
        this.state = {
            users: []

        }
    }

     list = () => {
       return fetch(`${process.env.REACT_APP_BACKEND_URL}/users` ,{
            method: "GET",
        })
        .then(response => {
            return response.json()
        })
    }
    componentDidMount(){
        this.list().then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({users: data})
            }
        })
    }

    render(){
        const {users} = this.state
        return(
            <div className="container">
            <h2 className="mt-5 mb-5">Gamers that signed up on PerfectTeam</h2>
            <div className ="row text-center">
                {users.map((user, i) => (
                    <div className="bg-image hover-overlay ripple" >
                    <img
                      src={`https://avatars.dicebear.com/api/bottts/:${user._id}.svg`}
                      className="img-fluid"
                      style={{ height: "100px", width: "120px"}}
                    />
                    <div classname="mask"></div>
                    <div className="card col-md-4" style={{width: "18rem"}} key ={i}>
                        <h5 className="card-title">{user.username} </h5>
                        <h6 className="card-title">Discord: {user.discord_id}</h6>
                        <p className="card-text" >
                            {user.favourite_game}
                        </p>
                        <hr/>
                    </div>
                    <Link to={`/user/${user._id}`} class="btn btn-raised btn btn-primary btn-sm">View Profile</Link>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}
export default Users