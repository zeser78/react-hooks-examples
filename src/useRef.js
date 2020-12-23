import React, { useEffect, useState, useRef } from 'react';

const UseRef = () => {

    // useRef doesn't cause a component to re-update when it change

    const [name, setName ] = useState('')
    // const [renderCount, setRenderCount ] = useState(0)
    const renderCount = useRef(1)

    useEffect(() => {
        // setRenderCount(prevRenderCount => prevRenderCount + 1)
         // with useState re-render infinity loop
         renderCount.current = renderCount.current + 1

    })
    // using ot save the preview data
    const prevName = useRef('')
    useEffect(() => {
prevName.current = name;
    }, [name])

    return (
        <>
        <input value={name} onChange={e => setName(e.target.value)} />
    <div>My name us {name}</div>
    <div> I rendered {renderCount.current} times</div>
    <div>M y name is {name} and it used to be {prevName.current}</div>

        </>
    )
}

export default UseRef