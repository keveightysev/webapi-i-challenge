import React from 'react';
import axios from 'axios';


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

  render() {
    return (
      <div className="App">
        <h1>People!</h1>
        {this.state.people && this.state.people.map(person => <h2>{person.name}</h2>)}
      </div>
    );
  }
}

export default App;
