import React from 'react'
import './MainPage.css';
import { useState } from "react";
import Ent from '../ent/Ent';
// import asxios;
function MainPage() {
    const [txt, setTxt] = useState()
    const submit = () => {
        //axios.get....
        // send data to backend
        console.log("success");
    }
    const handleInputChange = (event) => {
        setTxt(event.target.value);
    }


    return (
        <div className='wrapper'>
            <div className='container-fluid custom_size' />
            <div class="mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" placeholder="Input text here..." onChange={handleInputChange} ></textarea>
                {/* <input class="form-control" id="exampleFormControlTextarea1" rows="7" onChange = {(event)=>setTxt(event.value)}></input> */}
                <div className='right addMargin'>
                    <button type="button" class="btn btn-primary" onClick={submit}>Submit</button>
                </div>
            </div>
            <div className='center addPad' />
            <div class="container-fluid custom_size ">
                <Ent></Ent>
            </div>
        </div>
    )
}

export default MainPage
