import React, {Component} from 'react'
import {comment, uncomment} from "./apiMatch"
import {isAuthenticated} from '../core/Navbar'
import {Link} from 'react-router-dom'

class Comment extends Component{

    state ={
        text: "",
        error: ""
    }

    handleChange = event =>{
        this.setState({ text: event.target.value})
    }

    isValid = () =>{
        const {text} = this.state
        if(!text.length > 5 || text.length > 200){
            this.setState({error: "Comment needs to be between 5 and 200 characters"})
            return false
        }
        return true
    }

    addComment = e =>{
        e.preventDefault()
        if(!isAuthenticated()){
            this.setState({error: "Please signin to leave a comment"})
            return false
        }
        if(this.isValid()){
            const userId = isAuthenticated().user._id
            const matchId = this.props.matchId
            const token = isAuthenticated().token
            const commentvar = {comment: this.state.text}

            comment(userId, token, matchId, commentvar)
            .then(data =>{
                if(data.error){
                    console.log(data.error)
                }
                else {
                    this.setState({text: ""})
                    this.props.getAllcomments(data.comments)
                }
            })
    }
    }
    
    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const matchId = this.props.matchId;

        uncomment(userId, token, matchId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.getAllcomments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };
    render(){
        const {comments} = this.props
        const {error} = this.state
        return(
            <div>
                <h2>Leave a comment</h2>
                <form onSubmit={this.addComment}>
                <div className="form-group">
                    <input type="text" onChange={this.handleChange} value={this.state.text}></input>
                    <button className="btn btn-succes">Post</button>
                    </div>
                </form>
                <div className="alert" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <div >
                        <h3 className="text-primary">{comments.length} Comments</h3>
                        <hr />
                        {comments.map((comment, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${comment.postedBy}`}>
                                        <div style={{border:"4px"}}>
                                        <img src={`https://avatars.dicebear.com/api/bottts/:${[comment.postedBy]}.svg`}
                                                    className="img-fluid"
                                                    style={{ height: "100px", width: "120px"}} />
                                           
                                        <p >{comment.comment}</p>
                                        </div>
                                    </Link>
                                </div>
                                <span>
                                {isAuthenticated().user && isAuthenticated().user._id == comment.postedBy && (
                        <>
                        <button
                            onClick ={this.deleteConfirmed}
                            className="btn btn-raised btn-danger btn-sm"
                        >
                            Remove
                        </button>
                        </>)}
                                </span>
                            </div>
                        ))}
                        <hr/>
                    </div>
            </div>
        )
    }
}

export default Comment 