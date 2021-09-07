import React, {Component} from 'react'
import { comment, getMatch, remove } from './apiMatch'
import Defaultimg from '../images/logo.jpg'
import { Link, Redirect } from 'react-router-dom'
import Comment from './Comment'
import {isAuthenticated} from '../core/Navbar'

class SingleMatch extends Component{
    state ={
        match: "",
        comments: [],
        deleted: false
    }

    componentDidMount = () => {
        const matchId = this.props.match.params.matchId
        getMatch(matchId).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({match: data, comments: data.comments})
            }
        })
    }

    removeMatch = () => {
        const matchId = this.props.match.params.matchId
        const token = isAuthenticated().token
        remove(matchId, token).then(data => {
            if(data.error){
                console.lof(data.error)
            }
            else{
                this.setState({deleted: true})
            }
        })
    }

    delete = () => {
        let prompt = window.confirm("Are you sure you want to delete your account?")
        if(prompt){
            this.removeMatch()
        }
    }
    

    getAllcomments = comments =>{
        this.setState({comments : comments})
    }
    renderMatch = (match) => {
        const userId = match.postedBy ? `/user/${match.postedBy._id}` : ""
        const userName = match.postedBy ? `/user/${match.postedBy.username}` : "Unknown"
        const matchPostedby = match.postedBy ? `${match.postedBy._id}` : ""
        return (
            <div style={{textAlign: 'center'}}>
                <div >
                    <div className="card-body">
                        <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/matches/image/${match._id}`} 
                            onError={i =>(i.target.src = `${Defaultimg}`)}
                            style={{ height: "auto", width: "65%" }}
                        />
                        <h5 className="card-title">{match.title}</h5>
                        <h6 className="card-title">{match.game}</h6>
                        <p className="card-text"> {match.body}</p>
                        <br />
                        <p className="font-italic mark">
                            Posted by{" "}
                            <Link to={`${userId}`}>
                                {userName}{" "}
                            </Link>
                            on {new Date(match.created).toDateString()}
                        </p>
                        <div className="d-inline">
                        <Link
                            to={`/matches`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to all matches
                        </Link>
                        {isAuthenticated().user && isAuthenticated().user._id == matchPostedby && (
                        <>
                        <Link
                            to={`/matches/edit/${match._id}`}
                            className="btn btn-raised btn-warning btn-sm"
                        >
                            Edit Match
                        </Link>
                        <button
                            onClick ={this.delete}
                            className="btn btn-raised btn-danger btn-sm"
                        >
                            Delete Match
                        </button>
                        </>)}
                        </div>
                    </div>
                </div>
                    
            </div>
        )
            }

    render(){
        if(this.state.deleted){
            return <Redirect to="/" />
        }
        const {match, comments} = this.state
        return(
            <div style={{textAlign: 'center'}}>
                <h2 style={{textAlign: 'center'}}>{match.title}</h2>
                {this.renderMatch(match)}
                <Comment matchId={match._id} comments={comments}  getAllcomments={this.getAllcomments}/>
            </div>
        )
    }
}


export default SingleMatch