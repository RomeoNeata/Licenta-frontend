import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { isAuthenticated } from '../core/Navbar'
import Defaultimg from '../images/defaultProfile.png'
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
                this.setState({matches: data.matches})
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
            <div  style={{textAlign: 'center', alignSelf: 'center'}} className="containter">
                <div className="row lead mt-5 mb-5" >
                    <p >Hello {user.username}</p>
                    <div className="d-flex justify-content-center align-items-center border border-light p-5">
                    <img
                        src={`https://avatars.dicebear.com/api/bottts/:${user._id}.svg`}
                        style={{ height: "30%", width: "30%", display:"center"}}
                        className="img-fluid "
                        />
                        </div>
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
                
                <div >
                        <h3 className="text-primary">{matches.length} Matches</h3>
                        <hr />
                        {matches.map((match, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/matches/${match._id}`}>
                                        <div style={{border:"4px"}}>
                                            <p className="lead">{match.title} </p>
                                            <p className="text-wrap">{match.game}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <hr/>
                    </div>
            </div>
        )
    }
}

export default Profile