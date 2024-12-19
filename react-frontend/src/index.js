import { useState } from 'react';
import JournalLayout from './components/JournalLayout';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import { createPost } from './services/api';

function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = (newPost) => {
    createPost(newPost).then(() => {
      alert('Post created!');
      setCreating(false);
    });
  };

  return (
    <JournalLayout>
      <h1>Old-Timey Journal</h1>
      {creating ? (
        <PostForm onSubmit={handleCreate} />
      ) : selectedPostId ? (
        <PostDetails postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
      ) : (
        <>
          <PostList onPostSelect={setSelectedPostId} />
          <button onClick={() => setCreating(true)}>Create New Post</button>
        </>
      )}
    </JournalLayout>
  );
}

export default App;
