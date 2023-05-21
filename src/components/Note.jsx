import './../styles/note.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import React, { useState } from 'react';
import ModalDelete from './ModalDelete';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import dayjs from 'dayjs';

const Note = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id, title, content, lastUpdated, isActive } = props;
  const date = dayjs(lastUpdated)
  const day = date.date();
  const monthIndex = date.month();
  const year = date.year();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const estiloCard = {
    width: '19rem',
    minHeight: '14rem',
    height: 'fit-content',
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthName = monthNames[monthIndex];

  const handleDeleteNote = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      if (response.status === 200) {
        console.log('Note deleted successfully');
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleArchiveNote = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/${id}`, { isActive: false });
      if (response.status === 200) {
        alert('Note archived successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnarchiveNote = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/${id}`, { isActive: true });
      if (response.status === 200) {
        alert('Note unarchived successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Col>
      <Card border="secondary" style={estiloCard} className='card'>
        <Card.Body>
          <Card.Title className='titleCard'>{title}</Card.Title>
          <Card.Text className='contentCard'>{content}</Card.Text>
          <Card.Text className='lastEdited'><b>Last edited:</b> {day}/{monthName}/{year}</Card.Text>
          <Card.Body>
            <div className="containerButtonsCard">
              {
                isActive ?
                  <Button variant="warning" className='buttonNote' onClick={handleArchiveNote}>Archive</Button> :
                  <Button variant="warning" className='buttonNote unarchiveBtn' onClick={handleUnarchiveNote}>Unarchive</Button>
              }
              <Link to={`/edit/${id}`}>
                <Button variant="secondary" className='buttonNote'>Edit</Button>
              </Link>
              <Button variant="danger" className='buttonNote' onClick={handleShow}>Delete</Button>
            </div>
          </Card.Body>
        </Card.Body>
        <ModalDelete show={show} handleClose={handleClose} handleDelete={handleDeleteNote} />
      </Card>
    </Col>
    // <div className='g-col-4 card'>
    //   <div className="note">
    //     <div className="card-body">
    //       <h5 className="card-title"></h5>
    //       <p className="card-text"></p>
    //       <p className="card-text"><b>Last Edited:</b> {day}/{monthName}/{year}</p>



    //     </div>
    //   </div>

    // </div>
  )
}

export default Note