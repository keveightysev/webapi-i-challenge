import React from 'react';
import axios from 'axios';

export default class AddPerson extends React.Component {
    state = {
        name: '',
        bio: '',
    }

    addPerson = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', this.state)
        this.props.updatePeople();
        this.setState({
            name: '',
            bio: '',
        });
    }

    handleChanges = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <form onSubmit={this.addPerson}>
                <input type="text" name="name" onChange={this.handleChanges} value={this.state.name} />
                <input type="text" name="bio" onChange={this.handleChanges} value={this.state.bio} />
                <button>Add Person</button>
            </form>
        );
    }
}