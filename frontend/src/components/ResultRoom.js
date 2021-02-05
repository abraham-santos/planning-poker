import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class ResultRoom extends Component {

    state = {
        _id: '',
        user: '',
        valuevote: 0,
        statusvote: false,
        ismoderator: false,
        roomname: '',

        project: '',
        userstory: '',
        estimation: 0,
        showcards: false,
        roomid: '',

        totalusers: []

    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:4000/api/users/' + this.props.match.params.id);
        const res = await axios.get('http://localhost:4000/api/rooms');

        var _roomid = '';
        var _project = '';
        var _userstory = '';
        var _showcards = false;
        var _estimation = 0;
        res.data.forEach(element => {
            if (element.roomname === response.data.roomname) {
                _roomid = element._id;
                _project = element.project;
                _userstory = element.userstory;
                _showcards = element.showcards;
                _estimation = element.estimation;
            }
        });

        const resp = await axios.get('http://localhost:4000/api/users');

        let userresults = resp.data.filter(item => item.roomname === response.data.roomname);
        var showdata = [];
        userresults.forEach(element => {
            let newstatus = '';
            if (element.statusvote === false) {
                newstatus = 'Pending';
            } else {
                newstatus = 'Done';
            }

            let showstatuscard = '';
            if (_showcards === false) {
                showstatuscard = 'Hidden';
            } else {
                showstatuscard = element.valuevote
            }
            let valueUser = {
                user: element.user,
                valuevote: showstatuscard,
                statusvote: newstatus,
                ismoderator: element.ismoderator,
                roomname: element.roomname
            }
            showdata.push(valueUser);
        });


        this.setState({
            user: response.data.user,
            valuevote: response.data.valuevote,
            statusvote: response.data.statusvote,
            ismoderator: response.data.ismoderator,
            roomname: response.data.roomname,
            _id: this.props.match.params.id,

            roomid: _roomid,
            project: _project,
            userstory: _userstory,
            showcards: _showcards,
            estimation: _estimation,
            totalusers: showdata
        });
        console.log("1:" + _estimation);
    }


    onSubmit = async (e) => {
        e.preventDefault();
        let esti = 0;
        let sum = 0;
        var est = 0;
        this.state.totalusers.forEach(element => {
            sum = sum + element.valuevote
        });
        esti = sum / this.state.totalusers.length;
        est = parseInt(Number(esti.toFixed(1)));
        console.log("2:"+est)
        this.setState({
            showcards: true,
            estimation: est
        });
        const updateRoom = {
            roomname: this.state.roomname,
            project: this.state.project,
            userstory: this.state.userstory,
            estimation: est,
            showcards: true
        }

        await axios.put('http://localhost:4000/api/rooms/' + this.state.roomid, updateRoom)

        window.location.href = '/result/' + this.state._id;
    }

    
    render() {

        const taskTableRows = () => {
            return this.state.totalusers.map(item => (
                <tr key={item.user}>
                    <td>{item.user}</td>
                    <td>{item.statusvote}</td>
                    <td>{item.valuevote}</td>
                </tr>
            ))
        };

        return (

            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Results</h4>

                    <div className="form-group">
                        <b>Project:</b> <input
                            type="text"
                            className="form-control"
                            name="project"

                            value={this.state.project}
                            readOnly
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <b>User Story:</b> <input
                            type="text"
                            className="form-control"
                            name="userstory"
                            value={this.state.userstory}
                            readOnly
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <b>Estimation:</b> <input
                            type="text"
                            className="form-control"
                            name="estimation"
                            value={this.state.estimation || 0}
                            readOnly
                        >
                        </input>
                    </div>

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Voting status</th>
                                <th>Estimation Value</th>
                            </tr>
                        </thead>

                        <tbody>
                            {taskTableRows()}
                        </tbody>
                    </table>

                    <form onSubmit={this.onSubmit}>
                        <button
                            className="btn btn-primary"
                            hidden={this.state.ismoderator ? false : true} >
                            Show Cards
                        </button>

                    </form>
                    
                </div>
            </div>

        )
    }
}
