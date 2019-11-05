import React, { useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import storage from './Firebase'
import '../App.css';

function Outlet() {
  const [state, setState] = useState({ name: '', filename: null, image: null, url: '', progress:0, success: false });

  // const formatFormData = (values) => {
  //   const formData = new FormData()
  //   formData.append('name', values.name)
  //   formData.append("file", values.filename)
  //   return formData
  // }

  const handleFile = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0], image: e.target.files[0] })
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const { image } = state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setState({ ...state, progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            axios.post('https://mfuko-api.herokuapp.com/outlets', {name:state.name, imageUrl: url})
              .then(result => {
                setState({ ...state, url, success: true });
              }).catch(error => {
                console.log(error)
                setState({ ...state, success: false });
              })
          });
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <progress value={state.progress} max="100" className="progress" />
        {state.success && <div>Successfully created Outlet</div>}
        <div>
          <div style={{marginBottom: '10px'}}>Create Radar</div>
          <form onSubmit={handleUpload}>
            <input value={state.name} onChange={onChange} type='text' name='name' placeholder='Outlet Name' />
            <input onChange={handleFile} accept='image/*' type='file' name='filename' /><br />
            <input type='submit' value='Upload' />
          </form>
        </div>
      </header>
    </div>
  );
}

export default Outlet