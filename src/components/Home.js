import React from "react"
import Iframe from 'react-iframe'

function Home() {


    return(
    <div>
        <h1>Welcome to TrailMixer!</h1>
        <h1>Conditions:</h1>
        {/* technically hardcoded for colorado rn */}
        <Iframe url="https://www.hikingproject.com/widget/conditions?v=3&x=-11670542&y=4700361&z=2&height=400"
        width="1200px"
        height="450px"
        id="conditionsWidget"
        className="widget"
        display="initial"
        position="relative"/>

        <h1>Hikes Near You:</h1>
        <Iframe url="https://www.hikingproject.com/widget/map?favs=1&location=ip&x=-8305802&y=4775862&z=6.5&h=500"
        width="1200px"
        height="500px"
        id="conditionsWidget"
        className="widget"
        display="initial"
        position="relative"/>
    </div>
    )
}
export default Home;