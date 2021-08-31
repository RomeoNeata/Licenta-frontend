import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Defaultimg from '../images/logo.jpg'

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
            <h2 className="mt-5 mb-5">Users</h2>
            <div className ="row">
                {users.map((user, i) => (
                    <div className="bg-image hover-overlay ripple" >
                    <img
                      src={Defaultimg}
                      className="img-fluid"
                    />
                    <div classname="mask"></div>
                    <div className="card col-md-4" style={{width: "18rem"}} key ={i}>
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text" >
                            {user.created}
                        </p>
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