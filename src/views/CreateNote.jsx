import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function CreateNote() {
  let navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = async () => {
    try {
      const response = await axios.post(`${apiUrl}`, {
        title,
        content
      });
      if (response.status === 201) {
        alert('Note created successfully');
        setTitle('');
        setContent('');
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <h1>Create note</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Note title</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e) => setContent(e.target.value)} rows="3"></textarea>
          </div>
          <Button variant="primary" className='buttonNote' onClick={handleCreateNote}>Create</Button>
          <Link to="/">
            <Button variant="danger" className='buttonNote'>Cancel</Button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default CreateNote;