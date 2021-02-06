import React, { Component } from 'react'
import axios from 'axios'

export default class CreateRoom extends Component {
    
    state = {
        roomname: '',
        project: '',
        userstory: '',
        estimation: 0,
        showcards: false,
        user: '',
        _id: ''
    }
    
    // Get the user id of the user created
    getUserId = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        const users = res.data;
        let userid = '';
        users.forEach(element => {
            if(element.user === this.state.user){
                userid = element._id;
            }
        });
        this.setState({_id: userid});
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newRoom = {
            roomname: this.state.roomname,
            project: this.state.project,
            userstory: this.state.userstory,
            estimation: 0,
            showcards: false
        }
        const newUser = {
            user: this.state.user,
            valuevote: 0,
            statusvote: false,
            ismoderator: true,
            roomname: this.state.roomname
        }
        // Save the new room and the new user
        await axios.post('http://localhost:4000/api/rooms', newRoom);
        await axios.post('http://localhost:4000/api/users', newUser);
        await this.getUserId();
        // Go to Estimation page
        window.location.href = '/user/'+ this.state._id;
    }
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    
                    <h4>Create a Room</h4>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control" 
                            placeholder="Room Name" 
                            name="roomname"
                            onChange={this.onInputChange}
                            value={this.state.roomname}
                            required
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Project"
                            name="project" 
                            onChange={this.onInputChange}
                            value={this.state.project}
                            required
                            >
                        </input>
                    </div>
                    
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="User Story"
                            name="userstory" 
                            onChange={this.onInputChange}
                            value={this.state.userstory}
                            required
                            >
                        </input>
                    </div>

                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            name="user" 
                            onChange={this.onInputChange}
                            value={this.state.user}
                            required
                            >
                        </input>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">
                            Save Room
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
