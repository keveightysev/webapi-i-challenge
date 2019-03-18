import React from 'react';
import axios from 'axios';
import PeopleList from './components/PeopleList';
import AddPerson from './components/AddPerson';


class App extends React.Component {
  state = {
    people: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://localhost:4000/api/users');
      this.setState({
        people: res.data
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  updatePeople = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/users');
      this.setState({
        people: res.data
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>People!</h1>
        <AddPerson updatePeople={this.updatePeople} />
        <PeopleList people={this.state.people} updatePeople={this.updatePeople} />
      </div>
    );
  }
}

export default App;
