import { useEffect, useState } from "react"
import { useTheme } from "./ThemeContext"

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/notes"
const SECRET = import.meta.env.VITE_SECRET_KEY || "mysecret123"

function App() {
  const { isDark, setIsDark } = useTheme()
  const [notes, setNotes] = useState([])
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const res = await fetch(API)
      if (!res.ok) throw new Error("Failed to fetch notes")
      const data = await res.json()
      setNotes(data)
      setError("")
    } catch (err) {
      setError("Cannot connect to backend at " + API + " - " + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addNote = async () => {
    if (!text.trim()) {
      setError("Please enter a note")
      return
    }
    try {
      setLoading(true)
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": SECRET,
        },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Server error")
      }
      setText("")
      setError("")
      fetchNotes()
    } catch (err) {
      setError("Error adding note: " + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: SECRET },
      })
      if (!res.ok) throw new Error("Failed to delete note")
      setError("")
      fetchNotes()
    } catch (err) {
      setError("Error deleting note: " + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-slate-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
      <div className={`sticky top-0 z-50 border-b ${isDark ? "bg-slate-900 border-slate-700" : "bg-white/80 backdrop-blur-sm border-indigo-200"}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>📝 SecureNote</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-lg transition-all duration-200 ${isDark ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-white text-slate-700 hover:bg-slate-100 shadow-md"}`}
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className={`mb-4 p-3 rounded-lg border-l-4 ${isDark ? "bg-red-900/20 border-red-500 text-red-300" : "bg-red-50 border-red-500 text-red-700"}`}>
            ⚠️ {error}
          </div>
        )}

        <div className={`mb-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white border border-indigo-200"}`}>
          <label className={`block text-sm font-medium mb-3 ${isDark ? "text-slate-300" : "text-slate-700"}`}>✨ Add a new note</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              disabled={loading}
              className={`flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 ${isDark ? "bg-slate-700 border-slate-600 text-white placeholder-slate-500" : "bg-white border-indigo-200 text-slate-900 placeholder-slate-400"}`}
              placeholder="Write something important..."
            />
            <button
              onClick={addNote}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium ${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"} ${isDark ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
            >
              ➕ Add
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${isDark ? "text-slate-200" : "text-slate-900"}`}>Your Notes</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isDark ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-700"}`}>{notes.length}</span>
        </div>

        {notes.length === 0 ? (
          <div className={`rounded-xl p-10 text-center ${isDark ? "bg-slate-800/50" : "bg-white/70"}`}>
            <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}>No notes yet. Create one to get started! ✨</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {notes.map((note) => (
              <div key={note.id} className={`p-5 rounded-xl border-l-4 flex flex-col justify-between ${isDark ? "bg-slate-800 border-indigo-500" : "bg-white border-indigo-400"}`}>
                <p className={`${isDark ? "text-slate-200" : "text-slate-800"} mb-4 text-sm leading-relaxed break-words`}>{note.text}</p>
                <div className="flex items-center justify-between pt-3 border-t border-opacity-20">
                  <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>{new Date(note.id).toLocaleDateString()}</span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    disabled={loading}
                    className={`rounded-lg px-2 py-1 text-xs ${isDark ? "text-slate-300 hover:text-red-300" : "text-slate-600 hover:text-red-500"}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App