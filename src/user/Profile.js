import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { isAuthenticated } from '../core/Navbar'
import Defaultimg from '../images/logo.jpg'
import DeleteUser from './DeleteUser'
import {getMatchbyUser} from '../match/apiMatch'

class Profile extends Component{
    constructor(){
        super()
        this.state = {
            user: "",
            redirect: false,
            matches: []
        }
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
            else{
            this.setState({user: data})
            this.loadMatches(data._id)
            }
        })
    }

    loadMatches = userId =>{
        const token = isAuthenticated().token
        getMatchbyUser(userId, token).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({match: data})
            }
        })
        
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    render(){
        const {redirect, user, matches} = this.state
        if(redirect)
        return <Redirect to="/signin"></Redirect>


        return (
            <div className="containter">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row lead mt-5 mb-5">
                    <p>Hello {user.username}</p>
                    <img
                        src={Defaultimg}
                        className="img-fluid"
                        />
                    <p>Email: {user.email}</p>
                    <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    <p>Discord Id: {user.discord_id}</p>
                    <p>Favourite game: {user.favourite_game}</p>

                </div>
                <hr/>
                <div className="row lead md-12 mt-5 mb-5">
                <p>About: {user.about}</p>
                <hr/>
                </div>
                <div>
                    {isAuthenticated().user && isAuthenticated().user._id == user._id && (
                        <div className="d-inline-block mt-5">
                            <Link className="btn btn-raised btn-succes mr-5" to={`/user/edit/${user._id}`}>
                                Edit Profile
                            </Link>
                            <DeleteUser userId={user._id} />
                        </div>
                    )}                
                </div>
                <div className="col-md-4">
                        <h3 className="text-primary">{matches.length} Matches</h3>
                        <hr />
                        {matches.map((match, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/matches/${match._id}`}>
                                        <div>
                                            <p className="lead">{match.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}

export default Profile