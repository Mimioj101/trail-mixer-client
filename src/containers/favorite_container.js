import React from "react"
import TrailCard from '../components/TrailCard'

export default class FavoriteContainer extends React.Component {
    
    state = {
        faveArray: [],
        favedTrails: []
    }
    
    mapFaves = () => {
        console.log('faveArray;',this.state.faveArray)
        return this.state.faveArray.map(fave => 
            fetch("http://localhost:3000/trails/" + fave.trail_id, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(resp => resp.json())
            .then(trail => {
                    this.setState({favedTrails: [...this.state.favedTrails, trail]})           
            })
                // this.setState({favedTrails: [...this.state.favedTrails, trail]})
            // .then(console.log)
        )
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/favorites", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(resp => resp.json())
        .then(faves => {
            let favorites = faves.filter(fave => {return fave.user_id === this.props.user.id})
            this.setState(() => ({faveArray: favorites}), () => {this.mapFaves()})
        })
        // this.setState({faveArray: this.props.faves})
    }

    faveHandler = (trail) => {
        let newArray = this.state.favedTrails
        let index = newArray.findIndex(stateTrail => stateTrail.id === trail.id)
        newArray.splice(index, 1)
        this.setState({favedTrails: newArray})
        this.props.faveHandler(trail)
    }


    mapFavedTrails = () => {
        return this.state.favedTrails.map(trail => <TrailCard user={this.props.user} key={trail.id} trail={trail} faves={this.props.faves} faveHandler={this.faveHandler}/>)
    }



    
    render() {
        console.log("faves in faves", this.state.favedTrails)
        return(
            <>
                <h3 className='fav-head'>Bookmarked Trails:</h3>
                <div className='favorite-container'>
                    {this.mapFavedTrails()}
                </div>
            </>
        )
    }

}