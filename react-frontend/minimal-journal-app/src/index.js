import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Get the API server URL from the environment variable or use localhost:3000 as the default
const API_SERVER = process.env.REACT_APP_API_SERVER || 'http://localhost:3000';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', body: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(`${API_SERVER}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`${API_SERVER}/posts/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${API_SERVER}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ id: null, title: '', body: '' });
    setEditing(false);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_SERVER}/posts/${id}`, {
      method: 'DELETE',
    });
    fetchPosts();
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md border border-gray-300 rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Journal</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleInputChange}
          placeholder="Body"
          className="w-full p-2 mb-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editing ? 'Update Post' : 'Add Post'}
        </button>
      </form>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border rounded shadow-sm bg-gray-50 flex justify-between"
          >
            <div>
              <h2 className="text-lg font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
