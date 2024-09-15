import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get('/api/profile/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        const postsResponse = await axios.get('/api/posts/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(postsResponse.data.filter(post => post.created_by === userResponse.data.id));

        const commentsResponse = await axios.get('/api/comments/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComments(commentsResponse.data.filter(comment => comment.user === userResponse.data.id));

        const likesResponse = await axios.get('/api/likes/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLikes(likesResponse.data.filter(like => like.user === userResponse.data.id));
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const existingLike = likes.find(like => like.post === postId);
      if (existingLike) {
        await axios.delete(`/api/likes/${existingLike.id}/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes(likes.filter(like => like.post !== postId));
      } else {
        await axios.post('/api/likes/', { post: postId }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes([...likes, { post: postId }]);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div>
      {user && (
        <>
          <h1>{user.username}'s Profile</h1>
          <h2>Posts</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handleToggleLike(post.id)}>
                  {likes.some(like => like.post === post.id) ? 'Unlike' : 'Like'}
                </button>
              </li>
            ))}
          </ul>
          <h2>Comments</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <p>{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
