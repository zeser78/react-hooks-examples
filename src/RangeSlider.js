import React,{useState, useEffect, useRef} from 'react'
import "./rangeslider.css"

const RangeSlider = () => {

const [value, setValue] = useState(0);
const valueRef = useRef()

const handleChange = (e) => {
console.log(e.target.value)
setValue(e.target.value)
}

useEffect(() => {
console.log(valueRef.current.value)
})

return (
<>
<h1>Range Slider</h1>
<div className="slider-parent">
<input  type="range" min="0" max="500" step="100" ref={valueRef} value={value} onChange={handleChange}/>
</div>
<div className="bubble"> 
{value}
</div>
</>
)
}

export default RangeSlider;
