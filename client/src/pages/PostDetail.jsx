import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState({ author: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsAPI.getPost(id);
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.deletePost(id);
      navigate('/posts');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!comment.author || !comment.content) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await postsAPI.addComment(id, comment);
      setPost(response.data);
      setComment({ author: '', content: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await postsAPI.deleteComment(id, commentId);
      fetchPost();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPost} />;
  if (!post) return <div style={styles.container}>Post not found</div>;

  const canEdit = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div style={styles.container}>
      <article style={styles.article}>
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title}
            style={styles.featuredImage}
          />
        )}

        <div style={styles.meta}>
          <span style={styles.category}>{post.category?.name}</span>
          <span style={styles.date}>{formatDate(post.createdAt)}</span>
          <span style={styles.views}>Ì±ÅÔ∏è {post.views} views</span>
        </div>

        <h1 style={styles.title}>{post.title}</h1>

        <div style={styles.authorInfo}>
          <span>By {post.author?.name}</span>
          {post.author?.bio && <span> ‚Ä¢ {post.author.bio}</span>}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} style={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        <div style={styles.content}>
          {post.content}
        </div>

        {canEdit && (
          <div style={styles.actions}>
            <Link to={`/edit-post/${post._id}`} style={styles.editButton}>
              Edit Post
            </Link>
            <button onClick={handleDelete} style={styles.deleteButton}>
              Delete Post
            </button>
          </div>
        )}
      </article>

      <section style={styles.commentsSection}>
        <h2 style={styles.commentsTitle}>
          Comments ({post.comments?.length || 0})
        </h2>

        {user && (
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <h3 style={styles.formTitle}>Add a Comment</h3>
            
            <input
              type="text"
              placeholder="Your name"
              value={comment.author}
              onChange={(e) => setComment({ ...comment, author: e.target.value })}
              style={styles.input}
              required
            />

            <textarea
              placeholder="Your comment"
              value={comment.content}
              onChange={(e) => setComment({ ...comment, content: e.target.value })}
              style={styles.textarea}
              rows="4"
              required
            />

            <button type="submit" disabled={submitting} style={styles.submitButton}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        )}

        {!user && (
          <p style={styles.loginPrompt}>
            Please <Link to="/login" style={styles.link}>login</Link> to leave a comment
          </p>
        )}

        <div style={styles.commentsList}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} style={styles.comment}>
                <div style={styles.commentHeader}>
                  <strong>{comment.author}</strong>
                  <span style={styles.commentDate}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p style={styles.commentContent}>{comment.content}</p>
                {user && (user._id === comment.user || user.role === 'admin') && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    style={styles.deleteCommentButton}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p style={styles.noComments}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  },
  article: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  featuredImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    color: '#666'
  },
  category: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  date: {
    color: '#999'
  },
  views: {
    color: '#999'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
    lineHeight: '1.2'
  },
  authorInfo: {
    color: '#666',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  tags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  },
  tag: {
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    fontSize: '0.875rem'
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '2rem',
    whiteSpace: 'pre-wrap'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    paddingTop: '2rem',
    borderTop: '1px solid #eee'
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  commentsSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  commentsTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1.5rem'
  },
  commentForm: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  formTitle: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical'
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  loginPrompt: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  comment: {
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '3px solid #3498db'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  commentDate: {
    fontSize: '0.875rem',
    color: '#999'
  },
  commentContent: {
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '0.5rem'
  },
  deleteCommentButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  noComments: {
    textAlign: 'center',
    padding: '2rem',
    color: '#999'
  }
};

export default PostDetail;
