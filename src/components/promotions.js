import React, { useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import '../App.css';

function Promotion() {
    const [values, setName] = useState({ name: '', filename: null });

    const onsubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3003/outlets', formatFormData(values))
            .then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
    }

    const formatFormData = (values) => {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append("file", values.filename)
        return formData
    }

    const handleFile = (e) => {
        setName({ ...values, [e.target.name]: e.target.files[0] })
    }

    const onChange = (e) => {
        setName({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <div>
                    <div style={{ marginBottom: '10px' }}>Create Radar</div>
                    <form onSubmit={onsubmit}>
                        <input value={values.name} onChange={onChange} type='text' name='name' placeholder='Promotion name' /><br/>
                        <input value={values.name} onChange={onChange} type='text' name='name' placeholder='Promotion name' /><br />
                        <input onChange={handleFile} accept='image/*' type='file' name='filename' /><br />
                        <input type='submit' value='Upload' />
                    </form>
                </div>
            </header>
        </div>
    );
}

export default Promotion