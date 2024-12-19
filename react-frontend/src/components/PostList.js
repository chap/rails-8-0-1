import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';

export default function PostList({ onPostSelect }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((response) => setPosts(response.data));
  }, []);

  return (
    <div>
      <h2>Journal Entries</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <button onClick={() => onPostSelect(post.id)}>{post.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
