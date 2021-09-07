import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Defaultimg from '../images/logo.jpg'
import {getAllMatches} from './apiMatch'

class AllMatches extends Component{
    constructor(){
        super()
        this.state = {
            matches: []
        }
    }


    componentDidMount(){
        getAllMatches().then(data => {
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
                    const userId = match.postedBy ? `${match.postedBy._id}` : ""
                    const userName = match.postedBy ? `${match.postedBy.username}` : "Unknown"
       
                    return (
                        <div className="card col-md-4" key={i}>
                            <div style={{textAlign: 'center'}} className="card-body">
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/matches/image/${match._id}`}
                                    alt={match.title}
                                    onError={i =>(i.target.src = `${Defaultimg}`)
                                    }
                                    className="img-thunbnail mb-3 hover-overlay ripple"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{match.title}</h5>
                                <h6 className="card-title">{match.game}</h6>
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
export default AllMatches