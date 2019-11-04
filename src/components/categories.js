import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Category() {
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
                    <div style={{ marginBottom: '10px' }}>Create Category</div>
                    <form onSubmit={onsubmit}>
                        <input value={values.name} onChange={onChange} type='text' name='name' placeholder='Category Name' />
                        <input type='submit' value='Upload' />
                    </form>
                </div>
            </header>
        </div>
    );
}

export default Category