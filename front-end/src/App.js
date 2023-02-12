import React, { useState } from "react";
import { Oval } from  'react-loader-spinner'
import axios from "axios";
import Swal from 'sweetalert2';
import './App.css';


function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post('http://localhost:3002/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if(response.status === 200){
      setTimeout(() => {
        setLoading(false);
        Swal.fire({
          title: 'File Uploded Successfully!',
          text: 'Thanks For Uploading Document',
          icon: 'success',
          button: 'OK',
        }
        ).then(() => {
          window.location.reload();
        });
        
      }, 2000);
      setLoading(true)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File not Uploading!',
      })
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File not Uploading!',
      }).then(() => {
        window.location.reload();
      });
    }
    
  };

  return (
    <>
    
    {loading &&
    <div className="loading">
       <Oval
      ariaLabel="loading-indicator"
      height={100}
      width={100}
      strokeWidth={2}
      strokeWidthSecondary={2}
      color="blue"
      secondaryColor="#bfbfbf"
    />
        </div>
        }

     <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="file">Select a file to upload:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Upload</button>
    </form>
    </>
    );
}

export default App;
