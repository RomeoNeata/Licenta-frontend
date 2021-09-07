import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Navbar from './core/Navbar'
import Profile from './user/Profile'
import Users from './user/Users'
import FindUsers from './user/Users'
import EditProfile from './user/EditProfile'
import NewMatch from './match/NewMatch'
import AllMatches from './match/AllMatches'
import SingleMatch from './match/SingleMatch'
import MatchesbyGame from './match/MatchesbyGame'
import UpdateMatch from './match/UpdateMatch'

const Router = () => (
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />   
            <Route exact path="/matches" component={AllMatches}/>
            <Route exact path="/matches/new" component={NewMatch}/>
            <Route exact path="/matches/:matchId" component={SingleMatch} /> 
            <Route exact path="/matches/edit/:matchId" component={UpdateMatch} /> 
            <Route exact path="/matches/game/:gameId" component={MatchesbyGame} />  
            <Route exact path="/users" component={Users}/>
            <Route exact path="/signup" component={Signup} /> 
            <Route exact path="/signin" component={Signin} /> 
            <Route exact path="/user/:userId" component={Profile} /> 
            <Route exact path="/user/edit/:userId" component={EditProfile} /> 
            <Route exact path="/user/findUsers/:userId" component={FindUsers} /> 
        </Switch>
    </div>
)

export default Router