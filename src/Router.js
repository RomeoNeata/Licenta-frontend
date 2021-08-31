import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Navbar from './core/Navbar'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import NewMatch from './match/NewMatch'
import AllMatches from './match/AllMatches'
import SingleMatch from './match/SingleMatch'
import MatchesbyGame from './match/MatchesbyGame'

const Router = () => (
    <div>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/matches/game/:gameId" component={MatchesbyGame}/>
            <Route exact path="/matches" component={AllMatches}/>
            <Route exact path="/matches/new" component={NewMatch}/>
            <Route exact path="/matches/:matchId" component={SingleMatch} /> 
            <Route exact path="/users" component={Users}/>
            <Route exact path="/signup" component={Signup} /> 
            <Route exact path="/signin" component={Signin} /> 
            <Route exact path="/user/:userId" component={Profile} /> 
            <Route exact path="/user/edit/:userId" component={EditProfile} /> 
            
            
        </Switch>
    </div>
)

export default Router