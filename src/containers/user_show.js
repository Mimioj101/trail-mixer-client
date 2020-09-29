import React from "react"
import HikeForm from '../components/hike_form'
import HikeContainer from './hike_container'
import FavoriteContainer from './favorite_container'


class User extends React.Component {

    state = {
        user: {}
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/users/3")
        .then(resp => resp.json())
        .then(user => this.setState({user: user}))
    }

    hikeEditHandler = (id, state) => {
        let formData = new FormData()
        if (state.photo) {
            formData.append('hike[photo]', state.photo)
        }
        formData.append('hike[name]', state.name)
        formData.append('hike[length]', state.length)
        formData.append('hike[start]', state.start)
        formData.append('hike[end]', state.end)
        formData.append('hike[trail_id]', state.trail_id)
        formData.append('hike[user_id]', 3)

        fetch(`http://localhost:3000/hikes/${id}`, {
            method: "PATCH", 
            body: formData
        }).then(response => response.json())
        .then(result => {
          console.log('result:', result);
        let newArray = this.state.user.hikes
        let index = newArray.findIndex(hike => hike.id === id)
        newArray.splice(index, 1, result)
        this.setState({user: {hikes: newArray}})
        alert('Your changes have been saved!')
        })
    }

    formSubmitHandler = (e, state) => {
        e.preventDefault()        
        let trail = () => this.props.trails.find(trail => trail.name === state.trail)

        let formData = new FormData()
        if (state.photo) {
            formData.append('hike[photo]', state.photo)
        }
        formData.append('hike[name]', state.name)
        formData.append('hike[length]', state.length)
        formData.append('hike[start]', state.start)
        formData.append('hike[end]', state.end)
        formData.append('hike[trail_id]', trail().id)
        formData.append('hike[user_id]', 3)
        
        fetch('http://localhost:3000/hikes', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
          console.log('result:', result);
        let newArray = this.state.user.hikes
        newArray.push(result)
        this.setState({user: {hikes: newArray}})
        })
    }

    render() {
        return (
            this.state.user.hikes
            ?
            <>
            <h1>Welcome, {this.state.user.username}!</h1>
            <img src={this.state.user.image} alt={this.state.user.username}/>
            <h4>About Me: {this.state.user.bio}</h4>
            <FavoriteContainer faves={this.props.faves} faveHandler={this.props.faveHandler}/>
            <HikeForm trails={this.props.trails} editHandler={this.hikeEditHandler} submitHandler={this.formSubmitHandler} />
            <HikeContainer hikes={this.state.user.hikes} trails={this.props.trails} editHandler={this.hikeEditHandler}/>
            </>
            :
            "loading" 
        )
    }
        
}

export default User;