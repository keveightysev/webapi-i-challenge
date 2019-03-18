import React from 'react';

const PeopleList = props => {
    return (
        <div>
            {props.people && props.people.map(person => <h2 key={person.id}>{person.name}</h2>)}
        </div>
    );
}

export default PeopleList;