import React, { Component } from 'react'
import axios from 'axios'
//import 'react-datepicker/dist/react-datepicker.css'

export default class VoteUser extends Component {
    
    state = {
        // users: [],
        //userSelected: '',
        user: '',
        valuevote:0,
        statusvote:'',
        ismoderator:'',
        roomname:'',
        project:'',
        userstory:'',
        //date: new Date(),
        _id: '',
        _roomid:''
    }
    async componentDidMount(){
        
        /*const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username,
            _id: this.props.match.params.id
        });
        */
        const res1 = await axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
        //console.log(res1.data)
        this.setState({
            user: res1.data.user,
            valuevote: res1.data.valuevote,
            statusvote: res1.data.statusvote,
            ismoderator: res1.data.ismoderator,
            roomname: res1.data.roomname,
            //userSelected: res1.data.author,
            _id: this.props.match.params.id
        })
        this.getRoomData();
    }

    getRoomData = async () => {
        const res = await axios.get('http://localhost:4000/api/rooms');
        const rooms = res.data;
        let roomid = '';
        let project = '';
        let userstory = '';
        rooms.forEach(element => {
            if(element.roomname === this.state.roomname){
                roomid = element._id;
                project = element.project;
                userstory = element.userstory;
            }
        });
        
        this.setState({
            _roomid: roomid,
            project: project,
            userstory: userstory
        });
    }

    
    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            user: this.state.user,
            valuevote: parseInt(this.state.valuevote),
            statusvote: true,
            ismoderator: this.state.ismoderator,
            roomname: this.state.roomname
        }
        console.log(this.state._id);
        await axios.put('http://localhost:4000/api/users/' + this.state._id, newUser)
        
        window.location.href = '/ResultRoom';
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
                            placeholder="Vote Value"
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
