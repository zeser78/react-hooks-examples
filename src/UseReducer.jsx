import React, {useState, useReducer, useEffect } from 'react';

let data = [{id: 1, name: "Nadia"}, {id: 2, name: "Sergio"}]

//reducer function

const reducer = (state, action) => {
console.log(state, action)
if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload
    ]
    return {...state,
        people: newPeople, 
        isModalOpen: true,
        modalContent: 'item added'};
};
if (action.type === "NO_VALUE") {
    return {...state, isModalOpen: true, modalContent: 'please enter value'}
}
if (action.type === "CLOSE_MODAL") {
    return {...state, isModalOpen: false}
}
if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter((person) => person.id !== action.payload
    );
    return {...state, people: newPeople}
}
throw new Error('no macthing action type')
}

const defaultState = {
    people: [],
    isModalOpen: false,
    modalContent: ''
}

const UseReducer = () => {
    const [name, setName] = useState('');
    const [state, dispatch] = useReducer(reducer, defaultState)
    // changing to UseReducer
    // const [people, setPeople] = useState(data);
    // const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
e.preventDefault();
if (name) {
    const newItem = {id: new Date().getTime().toString(), name}
    dispatch({type: 'ADD_ITEM', payload: newItem})
    setName('')
    // setShowModal(true)
    // setPeople([...people, {id: new Date().getTime().toString(), name}]);
    // setName('')

} else {
    // setShowModal(true)
    dispatch({type: "NO_VALUE"})
}
    }
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
    }

    return (
        <>
<h2>UseReducer</h2>
{/* {showModal && <Modal />} */}
{state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent} />}
<form onSubmit={handleSubmit}>
<div>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
</div>
<button type="submit">add</button>
</form>
{/* {people.map((person) => { */}
{state.people.map((person) => {
    return (
       <div key={person.id}>
           <h4>{person.name}</h4>
           <button onClick={() => dispatch({type: 'REMOVE_ITEM', payload: person.id})}>remove</button>
       </div>
    )
})}
    </>
)
}

export default UseReducer

const Modal = ({modalContent, closeModal}) => {
    useEffect(() => {
        setTimeout(() => [
            closeModal()
        ], 3000)
    })
    console.log(modalContent)

    return (
        <>
        <h2><p>{ modalContent}</p></h2>
        </>
    )
}