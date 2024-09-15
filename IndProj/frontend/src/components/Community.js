import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // Fetch posts on component mount
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleCommentSubmit = async () => {
    if (!newComment || selectedPostId === null) return;
    try {
      const response = await axios.post('/api/comments/', {
        post: selectedPostId,
        content: newComment,
      });
      // Update post with new comment
      setPosts(posts.map(post => post.id === selectedPostId ? { ...post, comments: [...post.comments, response.data] } : post));
      setNewComment('');
      setSelectedPostId(null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post('/api/likes/', { post: postId });
      // Update post with new like
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
      <h1>Community Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>Like ({post.likes.length})</button>
          <div>
            <h3>Comments</h3>
            {post.comments.map(comment => (
              <div key={comment.id}>
                <strong>{comment.user}</strong>: {comment.content}
              </div>
            ))}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={() => setSelectedPostId(post.id)}>Submit Comment</button>
            {selectedPostId === post.id && (
              <button onClick={handleCommentSubmit}>Submit Comment</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;
