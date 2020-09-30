import React from "react"
import TrailCard from '../components/TrailCard'
import SearchTrails from '../components/search_trail_form'
import SearchTrailLocations from '../components/SearchTrailLocations'

export default class TrailsContainer extends React.Component {

    searchHandler = (searchValue) => {
        this.props.searchHandler(searchValue)
    }
    
    trailGenerator = () => {
        return this.props.trails.map(trail => <TrailCard key={trail.id} trail={trail} faveHandler={this.faveHandler}/>)
    }

    faveHandler = (faveTrail) => {
        this.props.faveHandler(faveTrail)
    }

    locationSearchHandler = (searchTerm) => {
        this.props.locationSearchHandler(searchTerm)
    }

    render() {
        return (
            <div className="trails-container">
                <SearchTrailLocations locationSearchHandler={this.locationSearchHandler}/>
                <SearchTrails searchHandler={this.searchHandler}/>
                {this.trailGenerator()}
            </div>
        )
    }

}