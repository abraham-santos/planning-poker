import React, { Component } from 'react'
import axios from 'axios'

export default class VoteUser extends Component {
    
    state = {
        user: '',
        valuevote: '',
        statusvote: false,
        ismoderator: false,
        roomname: '',
        project: '',
        userstory: '',
        _id: '',
        roomid: ''
    }
    async componentDidMount(){
        // Get the data of the user that was created before
        const response = await axios.get('http://localhost:4000/api/users/' + this.props.match.params.id);
        // Get all rooms available
        const res = await axios.get('http://localhost:4000/api/rooms');

        var _roomid = '';
        var _project = '';
        var _userstory = '';
        // Look for the room that belong to the user
        res.data.forEach(element => {
            if(element.roomname === response.data.roomname){
                _roomid = element._id;
                _project = element.project;
                _userstory = element.userstory;
            }
        });
        
        this.setState({
            user: response.data.user,
            valuevote: response.data.valuevote,
            ismoderator: response.data.ismoderator,
            roomname: response.data.roomname,
            _id: this.props.match.params.id,
            roomid: _roomid,
            project: _project,
            userstory: _userstory
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        // Update user with the vote
        const updateUser = {
            valuevote: parseInt(this.state.valuevote),
            statusvote: true,
            ismoderator: this.state.ismoderator,
            roomname: this.state.roomname
        }
        await axios.put('http://localhost:4000/api/users/' + this.state._id, updateUser)
        // Go to result page
        window.location.href = '/result/' + this.state._id;
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
                    
                    <h4>Submit estimate</h4>
                    
                    <div className="form-group">
                    <b>Project:</b> <input
                            type="text"
                            className="form-control" 
                            placeholder="Project" 
                            name="project"
                            value={this.state.project}
                            readOnly
                        >
                        </input>
                    </div>

                    <div className="form-group">
                    <b>User Story:</b><input 
                            type="text" 
                            className="form-control"
                            placeholder="User Story"
                            name="userstory"
                            value={this.state.userstory}
                            readOnly
                            >
                        </input>
                    </div>
                    
                    <div className="form-group">
                    <b>Estimation: [0, 1 , 2, 3, 5, 8, 13, 21, 34, 55, 89]</b><input 
                            type="text" 
                            className="form-control"
                            placeholder="0, 1 , 2, 3, 5, 8, 13, 21, 34, 55, 89"
                            name="valuevote"
                            onChange={this.onInputChange}
                            value={this.state.valuevote}
                            required
                            >
                        </input>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">
                            Vote
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
