const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = parseInt(process.env.PORT || '3000', 10)
const SECRET_KEY = process.env.SECRET_KEY || 'mysecret123'

if (!PORT || !SECRET_KEY) {
  console.error('❌ Missing environment variables!')
  process.exit(1)
}

let notes = []

// Middleware check token
function auth(req, res, next) {
  const token = req.headers.authorization
  const expected = process.env.SECRET_KEY
  if (token !== expected) {
    console.warn(`Auth failed: got "${token}", expected "${expected}"`)
    return res.status(403).json({ message: "Unauthorized" })
  }
  next()
}

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// POST create note
app.post('/api/notes', auth, (req, res) => {
  const { text } = req.body
  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Text cannot be empty" })
  }
  const newNote = { id: Date.now(), text }
  notes.push(newNote)
  res.status(201).json(newNote)
})

// DELETE note
app.delete('/api/notes/:id', auth, (req, res) => {
  const id = Number(req.params.id)
  const noteExists = notes.some(n => n.id === id)
  if (!noteExists) {
    return res.status(404).json({ message: "Note not found" })
  }
  notes = notes.filter(n => n.id !== id)
  res.json({ message: "Deleted" })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
  console.log(`✓ API available at http://localhost:${PORT}/api/notes`)
  console.log(`✓ Environment: PORT=${PORT}, SECRET_KEY set`)
})