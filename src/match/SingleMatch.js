import React, {Component} from 'react'
import { getMatch } from './apiMatch'
import Defaultimg from '../images/logo.jpg'
import { Link } from 'react-router-dom'

class SingleMatch extends Component{
    state ={
        match: ""
    }

    componentDidMount = () => {
        const matchId = this.props.match.params.matchId
        getMatch(matchId).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({match: data})
            }
        })
    }

    renderMatch = (match) => {
        const userId = match.postedBy ? `/user/${match.postedBy._id}` : ""
        const userName = match.postedBy ? `/user/${match.postedBy.username}` : "Unknown"
        
        return (
            <div className="row">
                <div className="card col-md-4">
                    <div className="card-body">
                        <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/matches/image/${match._id}`} 
                            onError={i =>(i.target.src = `${Defaultimg}`)}
                            className="img-thunbnail mb-3"
                            style={{ height: "200px", width: "100%" }}
                        />
                        <h5 className="card-title">{match.title}</h5>
                        <h5 className="card-title">{match.game}</h5>
                        <p className="card-text">
                            {match.body}
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
                            to={`/matches`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to all matches
                        </Link>
                    </div>
                </div>
                    )
            </div>
        )
            }

    render(){
        const {match} = this.state
        return(
            <div>
                <h2>{match.title}</h2>
                {this.renderMatch(match)}
            </div>
        )
    }
}


export default SingleMatch