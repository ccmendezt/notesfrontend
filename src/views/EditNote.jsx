import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const EditNote = () => {
	let navigate = useNavigate();
	const apiUrl = import.meta.env.VITE_API_URL;
	const { id } = useParams();
	const [note, setNote] = React.useState(""); // Estado inicial de la nota
	const [title, setTitle] = React.useState(""); // Estado inicial del titulo
	const [content, setContent] = React.useState(""); // Estado inicial del contenido

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiUrl}/${id}`);//Agregar url a la variable de entorno
				setNote(response.data);
				setTitle(response.data.title);
				setContent(response.data.content);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	const handleChangeNote = async () => {
		try {
			const response = await axios.patch(`${apiUrl}/${id}`, { title, content });
			setTitle('')
			setContent('')
			if (response.status === 200) {
				alert('Note updated successfully');
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='container'>
			<h1>Edit Note</h1>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Note title</label>
					<input type="email" className="form-control" id="exampleFormControlInput1" value={title} onChange={(e) => setTitle(e.target.value)}/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
				</div>
				<Button variant="primary" className='buttonNote' onClick={handleChangeNote}>Save</Button>
				<Link to="/">
					<Button variant="danger" className='buttonNote'>Cancel</Button>
				</Link>
			</form>
		</div>
	)
}

export default EditNote;