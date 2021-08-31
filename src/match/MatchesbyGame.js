import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Defaultimg from '../images/logo.jpg'
import {getMatchesbyGame} from './apiMatch'

class MatchesbyGame extends Component{
    constructor(){
        super()
        this.state = {
            matches: []
        }
    }


    componentDidMount(){
        getMatchesbyGame("Valorant").then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({matches: data.matches})
            }
        })
    }

    renderMatches = matches => {
        return (
            <div className="row">
                {matches.map((match, i) => {
                    const userId = match.postedBy ? `/user/${match.postedBy._id}` : ""
                    const userName = match.postedBy ? `/user/${match.postedBy.username}` : "Unknown"
     
                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/matches/image/${match._id}`}
                                    alt={match.title}
                                    onError={i =>
                                        (i.target.src = `${Defaultimg}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{match.title}</h5>
                                <p className="card-text">
                                    {match.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="font-italic mark">
                                    Posted by{" "}
                                    <Link to={`${userId}`}>
                                        {userName}{" "}
                                    </Link>
                                    on {new Date(match.created).toDateString()}
                                </p>
                                <Link
                                    to={`/matches/${match._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    };

    render(){
        const {matches} = this.state
        return(
            <div className="container">
            {this.renderMatches(matches)}
            </div>
        )
    }
}
export default MatchesbyGame