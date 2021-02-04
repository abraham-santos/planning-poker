import React, { Component } from 'react'
import axios from 'axios'
//import 'react-datepicker/dist/react-datepicker.css'

export default class JoinRoom extends Component {
    
    state = {
        //users: [],
        //userSelected: '',
        roomname: '',
        //project: '',
        //userstory: '',
        //unhiddenvotes: false,
        //estimation: 0,
        user: '',
        //editing: false,
        _id: ''
    }
    async componentDidMount(){
        /*const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        });*/
        /*if(this.props.match.params.id){
            const res = await axios.get('http://localhost:4000/api/rooms/' + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }*/
    }

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
        //const newRoom = {
        //    roomname: this.state.roomname,
            
            
            
            
            //author:this.state.userSelected
        //}
        const newUser = {
            user: this.state.user,
            valuevote: 0,
            statusvote: false,
            ismoderator: false,
            roomname: this.state.roomname
        }
        //if(this.state.editing){
        //    await axios.put('http://localhost:4000/api/rooms/' + this.state._id, newRoom)
        //}else{
            //await axios.post('http://localhost:4000/api/rooms', newRoom);
        await axios.post('http://localhost:4000/api/users', newUser);
        await this.getUserId();
       // }
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
                    
                    <h4>Join a Room</h4>

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
                            Join Room
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
