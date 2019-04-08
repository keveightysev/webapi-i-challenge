import React from 'react';
import axios from 'axios';

export default class Person extends React.Component {
    state = {
        clicked: false,
        name: this.props.person.name,
        bio: this.props.person.bio,
        id: this.props.person.id
    }

    deletePerson = async (e, id) => {
        e.preventDefault();
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        this.props.updatePeople();
    }

    openEdit = e => {
        e.preventDefault();
        this.setState({ clicked: !this.state.clicked })
    }

    handleChanges = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    editPerson = async (e, id) => {
        e.preventDefault();
        const person = {
            name: this.state.name,
            bio: this.state.bio
        }
        try {
            await axios.put(`http://localhost:4000/api/users/${id}`, person)
        } catch (err) {
            console.log(err);
        }
        this.props.updatePeople();
        this.setState({ clicked: false });
    }

    render () {
        return (
            <>
            <h2>{this.state.name}</h2>
            <p>{this.state.bio}</p>
            <p>Created at: {this.props.person.created_at}</p>
            <p>Modified at: {this.props.person.updated_at}</p>
            <button onClick={e => this.deletePerson(e, this.state.id)}>Delete Person</button>
            <button onClick={this.openEdit}>Update Info</button>
            {this.state.clicked && 
            <form onSubmit={e => this.editPerson(e, this.state.id)}>
                <input value={this.state.name} name="name" onChange={this.handleChanges}/>
                <input value={this.state.bio} name="bio" onChange={this.handleChanges}/>
                <button>Save Info</button>
            </form>}
            </>
        );
    }
}