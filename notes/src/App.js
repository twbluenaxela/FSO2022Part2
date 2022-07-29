import axios from 'axios'
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const Notification = ({message}) => {
  if(message === null){
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const gitpodBackendUrl =
  "https://3001-twbluenaxel-fso2022part-q6p1ytmwo86.ws-us54.gitpod.io";

  const notesBackend = "https://3001-twbluenaxel-fso2022part-rlkoupq6edq.ws-us54.gitpod.io/api/notes"
  const herokuBackendUrl = "https://warm-cove-75015.herokuapp.com/api/notes"

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  // console.log("Notes to show:  ", notesToShow)


  useEffect(() => {
    axios
      .get(herokuBackendUrl)
      .then(res => {
        setNotes(res.data)
      })
  },[])

  console.log('render', notes.length, 'notes');

  const addNote = event => {
    event.preventDefault();
    // console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    // const url = `${gitpodBackendUrl}/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ... note, important: !note.important}
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)

      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)} >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
      {notesToShow.map(note =>
          <Note
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App