import React, { useEffect, useRef, useState } from 'react'

const UseStatePrev = () => {
const [number, setNumber] = useState(1)
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        
        // const random =  setInterval(() => {
        //     setCount(c => Math.random() )
        // }, 10000)
        // return () => clearInterval(random)
    }, [])
    
    const prevCountRef = useRef();
    useEffect(() => {
        console.log(prevCount)
         prevCountRef.current = number;
    })


    const prevCount = prevCountRef.current

    console.log(count, prevCount)

    const handlerButton = (e) => {
console.log(e.target.value)
    }
    
    // const usePrevious(value)

    return (
        <>
            <h1>Previous value</h1>
            <select onChange={e => setNumber(e.target.value)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </select>
            <button value="1" onClick={handlerButton}>Click</button>
            <Storage count={count} prevCount={prevCount} />
            
            </>
    )
}

export default UseStatePrev

const Storage = ({count, prevCount }) => {
    return (
<>
            <div> <h2>Now{count} - before { prevCount}</h2></div>
            </>
    )
}