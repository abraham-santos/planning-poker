import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ResultRoom extends Component {

    state = {
        totalusers: [],
        totalusers2: [],
        user: '',
        valuevote: 0,
        statusvote: false,
        ismoderator: false,
        roomname: '',
        _id: '',
    }

    async componentDidMount() {
        const res1 = await axios.get('http://localhost:4000/api/users/' + this.props.match.params.id)
        this.setState({
            user: res1.data.user,
            valuevote: res1.data.valuevote,
            statusvote: res1.data.statusvote,
            ismoderator: res1.data.ismoderator,
            roomname: res1.data.roomname,
            _id: this.props.match.params.id
        });
        this.getUsers();
        
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        const users = res.data;       
        this.setState({
            totalusers: users
        });
        this.prepareData();
    }

    prepareData() {
        let done = this.state.totalusers.filter(item => item.roomname === this.state.roomname);
        let done2 = [];
        done.forEach(element => {
            let newstatus = '';
            if (element.statusvote === false) {
                newstatus = 'Pending';
            }else{
                newstatus = 'Done';
            }
            const newUser = {
                user: element.user,
                valuevote: element.valuevote,
                statusvote: newstatus,
                ismoderator: element.ismoderator,
                roomname: element.roomname
            }
            done2.push(newUser);
        });
        
        this.setState({
            totalusers2: done2
        });
        
    }

    render() {
        const taskTableRows = () => {
            return this.state.totalusers2.map(item => (
                <tr key={item.user}>
                    <td>{item.user}</td>
                    <td>{item.statusvote}</td>
                    <td>{item.valuevote}</td>
                </tr>
            ))
        };

        return (

            <div>
                <h1>Results</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Status Vote</th>
                            <th>Estimation Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {taskTableRows()}
                    </tbody>
                </table>
            </div>

        )
    }
}
