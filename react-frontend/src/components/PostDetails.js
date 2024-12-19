import { useState, useEffect } from 'react';
import { getPost, updatePost, deletePost } from '../services/api';
import PostForm from './PostForm';

export default function PostDetails({ postId, onBack }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(postId).then((response) => setPost(response.data));
  }, [postId]);

  const handleUpdate = (updatedPost) => {
    updatePost(postId, updatedPost).then(() => {
      alert('Post updated!');
      onBack();
    });
  };

  const handleDelete = () => {
    deletePost(postId).then(() => {
      alert('Post deleted!');
      onBack();
    });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <PostForm initialData={post} onSubmit={handleUpdate} />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
