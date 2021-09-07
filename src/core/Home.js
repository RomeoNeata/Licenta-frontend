import React from "react"
import Defaultimg from '../images/logo.jpg'
import Esports from '../images/esports.jpg'
import Esports2 from '../images/esports2.jpg'

const Home = () => (
    <div  className="jumbotron text-center" style={{font:'message-box' }}>
        <h2>Welcome to </h2>
        <img src={Defaultimg} style={{width: '80%'}}></img>
        <br/><br/><br/>
        <hr />
        <p className="lead" >An apllication ready to help gamers find their perfect teammates</p>
        <p>We recommend <a href="https://discord.com/download"> installing discord </a> and joining <a href="https://discord.gg/KxhK4cEM"> our server</a> to make it easier to contact eachother </p>
        <hr />
        <p>Is the place where you get your latest Esports news</p>
        <div style={{backgroundColor:"black"}}  className="row">
        <div  className="column">    
        <img src={Esports} style={{width: 'auto'}}></img>
        </div><div className="column">    
        <img src={Esports2} style={{width: '80%'}}></img>
        </div>
        <p>Supports a variety of games</p>
        </div>
    </div>
)

export default Home