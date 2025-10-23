import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={styles.card}>
      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title}
          style={styles.image}
        />
      )}
      
      <div style={styles.content}>
        <div style={styles.meta}>
          <span style={styles.category}>{post.category?.name || 'Uncategorized'}</span>
          <span style={styles.date}>{formatDate(post.createdAt)}</span>
        </div>
        
        <h2 style={styles.title}>
          <Link to={`/posts/${post._id}`} style={styles.titleLink}>
            {post.title}
          </Link>
        </h2>
        
        <p style={styles.excerpt}>
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>
        
        <div style={styles.footer}>
          <div style={styles.author}>
            <span>By {post.author?.name || 'Anonymous'}</span>
          </div>
          <div style={styles.stats}>
            <span>Ì±ÅÔ∏è {post.views || 0}</span>
            <span>Ì≤¨ {post.comments?.length || 0}</span>
          </div>
        </div>
        
        <Link to={`/posts/${post._id}`} style={styles.readMore}>
          Read More ‚Üí
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '1.5rem'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '0.875rem'
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
  title: {
    margin: '0 0 0.75rem 0',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  titleLink: {
    color: '#2c3e50',
    textDecoration: 'none',
    transition: 'color 0.3s'
  },
  excerpt: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
    marginBottom: '1rem'
  },
  author: {
    color: '#666',
    fontSize: '0.875rem'
  },
  stats: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    color: '#666'
  },
  readMore: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  }
};

export default PostCard;
