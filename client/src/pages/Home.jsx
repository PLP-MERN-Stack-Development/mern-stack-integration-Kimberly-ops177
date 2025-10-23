import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to MERN Blog</h1>
        <p style={styles.subtitle}>
          A full-stack blogging platform built with MongoDB, Express.js, React.js, and Node.js
        </p>
        
        <div style={styles.actions}>
          <Link to="/posts" style={styles.primaryBtn}>
            Browse Posts
          </Link>
          {!user && (
            <Link to="/register" style={styles.secondaryBtn}>
              Get Started
            </Link>
          )}
        </div>
      </div>

      <div style={styles.features}>
        <h2 style={styles.featuresTitle}>Features</h2>
        <div style={styles.featureGrid}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>Ì≥ù</div>
            <h3 style={styles.featureTitle}>Create Posts</h3>
            <p style={styles.featureDesc}>
              Write and publish your own blog posts with rich content
            </p>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>Ì¥ç</div>
            <h3 style={styles.featureTitle}>Search & Filter</h3>
            <p style={styles.featureDesc}>
              Find posts by category, search terms, or browse all content
            </p>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>Ì≤¨</div>
            <h3 style={styles.featureTitle}>Comments</h3>
            <p style={styles.featureDesc}>
              Engage with posts through comments and discussions
            </p>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>Ì¥ê</div>
            <h3 style={styles.featureTitle}>Authentication</h3>
            <p style={styles.featureDesc}>
              Secure user authentication and authorization system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0 0 1rem 0'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#666',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  primaryBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  secondaryBtn: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  features: {
    padding: '2rem 0'
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '2rem'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  feature: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  featureDesc: {
    color: '#666',
    lineHeight: '1.6'
  }
};

export default Home;
