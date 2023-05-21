import Note from "../components/Note";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Row from 'react-bootstrap/Row';

function ArchivedNotes() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = React.useState([]); // Estado inicial de las notas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/archived`);//Agregar url a la variable de entorno
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='container header'>
      <h1>Archived</h1>
      <Link to="/">
        My Notes
      </Link>
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
    </div>
  )
}

export default ArchivedNotes;