import React, { useEffect, useState } from 'react'
import "./Home.css"
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]); // State to store user's notes
  const [editTitle, setEditTitle] = useState(''); // State for editing title
  const [editDescription, setEditDescription] = useState(''); // State for editing description
  const [editNoteId, setEditNoteId] = useState(null);
  let navigate = useNavigate();

  // -----------------------Save Note---------------------------
  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to add a note.');
        return;
      }
      const data = {
        title,
        description,
      };
      const config = {
        headers: {
          authorization: `ahmed_${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/note', data, config);
      console.log(data);
      console.log(response);
      if (response.data.message === 'Done') {
        toast.success('Note added successfully.');
        // Optionally, you can clear the form inputs after successful submission.
        setTitle('');
        setDescription('');
        displayNote()
      }
    } catch (error) {
      toast.error('An error occurred while adding the note. Please try again.');
      console.error(error);
    }
  };
// -----------------------display Note---------------------------
const displayNote = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Please log in to view your notes.');
  }
  const config = {
    headers: {
      authorization: `ahmed_${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:5000/note/allNote`, config);
    console.log(response);
    if (response.data.message === 'Done') {
      setNotes(response.data.notes);
    }
  } catch (error) {
    toast.error('An error occurred while fetching your notes. Please try again.');
    console.error(error);
  }
};

// -----------------------update Note---------------------------
const handleEditNote = (noteId) => {
  const noteToEdit = notes.find((note) => note._id === noteId);
  if (noteToEdit) {
    setEditNoteId(noteId);
    setEditTitle(noteToEdit.title);
    setEditDescription(noteToEdit.description);
  }
};
const handleUpdateNote = async (noteId) => {
  console.log(noteId);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to update a note.');
      return navigate("/login");
    }
    const data = {
      title: editTitle, // Use the edited title
      description: editDescription, // Use the edited description
    };
    const config = {
      headers: {
        authorization: `ahmed_${token}`,
      },
    };

    const response = await axios.put(`http://localhost:5000/note/${noteId}`, data, config);
    console.log(response);
    if (response.data.message === "not auth user") {
      toast.error('Not authorized user.');
    } else if (response.data.message === 'Done') {
      toast.success('Note updated successfully.');
      handleClearEdit();
      displayNote();
    } else {
      toast.error('An error occurred while updating the note. Please try again.');
    }
  } catch (error) {
    toast.error('An error occurred while updating the note. Please try again.');
    console.error(error);
  }
};

const handleClearEdit = () => {
  setEditNoteId(null);
  setEditTitle('');
  setEditDescription('');
};

// -----------------------delete Note---------------------------
// -----------------------delete Note---------------------------
const handleDeleteNote = async (noteId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to delete a note.');
      return navigate('/login');
    }

    const config = {
      headers: {
        authorization: `ahmed_${token}`,
      },
    };

    const response = await axios.delete(`http://localhost:5000/note/${noteId}`, config);

    if (response.data.message === 'Done') {
      toast.success('Note deleted successfully.');
      // Refresh the list of notes after deletion
      displayNote();
    } else if (response.data.message === 'not auth user') {
      toast.error('Not authorized to delete the note.');
    } else {
      toast.error('An error occurred while deleting the note. Please try again.');
    }
  } catch (error) {
    toast.error('An error occurred while deleting the note. Please try again.');
    console.error(error);
  }
};


 // Use useEffect to fetch user's notes when the component mounts
useEffect(() => {
  displayNote()
}, []); // Empty dependency array ensures that this effect runs only once

  return (
    <div className='divbelow'>
      <div class="extended-bg"></div>
      <div className ="container">
        <div className ="col-md-12 d-flex justify-content-end note-div-button  text-right">
            <a className =" add p-2 btn" data-bs-toggle="modal" data-bs-target="#addNote"><i className ="fas fa-plus-circle"></i> Add New</a>
        </div>
      </div>
      {/* -------------------------------<!-- Modal -->--------------------------------------- */}
      <div className="modal fade" id="addNote" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content bg-warning bg-gradient">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add your Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label text-black">Title Note:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label text-black">Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={handleSaveNote}>Save changes</button>
            </div>
          </div>
        </div>
      </div>


    {/* ==========================Notes=============================== */}
    {/* ========================== add Notes=============================== */}
    <div className ="container">
        <div className ="row">
              {notes && notes.map((note) => (
                <div className="col-md-6 my-4" key={note._id}>
                  <div className="note p-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3>{note.title}</h3>
                      </div>
                      <div>
                        <a href="#" onClick={() => handleEditNote(note._id)}><i className="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#editNote"></i></a>
                        <a href="#" onClick={() => handleDeleteNote(note._id)}><i className="fas fa-trash-alt px-3 del"></i></a>
                      </div>
                    </div>
                    <p>{note.description}</p>
                  </div>
                </div>
              ))}
        </div>
    </div>
    {/* ==========================update Notes=============================== */}
    <div className="modal fade" id="editNote" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-warning bg-gradient">
          <div className="modal-header">
            <h5 className="modal-title" id="editNoteLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="edit-title" className="col-form-label text-black">
                  Title Note:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-title"
                  value={editTitle} // Bind value to the editTitle state
                  onChange={(e) => setEditTitle(e.target.value)} // Update editTitle on change
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edit-description" className="col-form-label text-black">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="edit-description"
                  value={editDescription} // Bind value to the editDescription state
                  onChange={(e) => setEditDescription(e.target.value)} // Update editDescription on change
                ></textarea>
              </div>
            </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" onClick={() => handleUpdateNote(editNoteId)}>Update</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Home