import React from 'react';
import Person from './Person';

const PeopleList = props => {
    return (
        <div>
            {props.people && props.people.map(person => <Person key={person.id} person={person} updatePeople = {props.updatePeople} />)}
        </div>
    );
}

export default PeopleList;