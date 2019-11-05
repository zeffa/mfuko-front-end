import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Category() {
    const [values, setName] = useState({ name: '' });

    const onsubmit = (e) => {
        e.preventDefault()
        axios.post('https://mfuko-api.herokuapp.com/categories', values)
            .then(result => {
                console.log(result)
                if(result){
                    setName({ ...values, name: '' })
                }
            }).catch(error => {
                console.log(error)
            })
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
                        <input required value={values.name} onChange={onChange} type='text' name='name' placeholder='Category Name' />
                        <input type='submit' value='Save' />
                    </form>
                </div>
            </header>
        </div>
    );
}

export default Category