import Note from './../components/Note'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyNotes = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = React.useState([]); // Estado inicial de las notas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/active`);//Agregar url a la variable de entorno
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='container header'>
        <h1 className='title'>My notes</h1>
        <p className='subtitle'><i>Manage notes by @ccmendezt</i></p>
        <Link to="/create">
          <div className="btnCreateNote">
            <button type="button" className="btn btn-primary">Create note</button>
          </div>
        </Link>
        <Link to="/archived">
          Archived notes
        </Link>
      </div>
      
      <div className="container text-center contNotes">
        <Row md={4}>
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              lastUpdated={note.lastUpdated}
              isActive={note.isActive}
            />
          ))}
        </Row>
      </div>
    </>
  )
}

export default MyNotes;