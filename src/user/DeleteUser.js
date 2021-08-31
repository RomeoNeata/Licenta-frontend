import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated, signout } from '../core/Navbar'

class DeleteUser extends Component{
    
    remove = (userId, token) =>{
        return  fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}` ,{
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }


    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        this.remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                //signout user
                signout(() => console.log("User is deleted"))
                //redirect
                this.setState({redirect: true})
            }
        })
    }
    
    delete = () => {
        let prompt = window.confirm("Are you sure you want to delete your account?")
        if(prompt){
            this.deleteAccount()
        }
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to='/'></Redirect>
        }
        return(
            <button onClick={this.delete} className="btn btn-raised btn-danger">Delete profile</button>
        )
    }
}

export default DeleteUser