import React, {useState, useContext} from 'react';

// UseContext when you try to pass data or function to lower component or child component

let data = [{id: 1, name: "Nadia"}, {id: 2, name: "Sergio"}]

const PersonContext = React.createContext();
// two components => Provider, Consumer



const UseContext = () => {

    const [people, setPeople] = useState(data)

    const removePerson = (id) => {
        setPeople((people) => {
            return people.filter((person) => person.id !== id)
        })
    };

    return (
        <PersonContext.Provider value={{removePerson}}>
        <h3>UseContext</h3>
        <List people={people} />
        </PersonContext.Provider>
    )
   
}

const List = ({people}) => {
    return (
        <>
        {people.map((person) => {
            return (
                <div key={person.id}>
                    <SinglePerson key={person.id} {...person}/>
           
                </div>
        )}
            )}
        </>
    )
}

const SinglePerson = ({id, name}) => {
    const {removePerson} = useContext(PersonContext)
    // console.log(data)
    return (
        <div>
            <h4>{name}</h4>
            <button onClick={() => removePerson(id)}>remove</button>
        </div>
    )
}

export default UseContext