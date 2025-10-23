const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <h3 style={styles.title}>⚠️ Error</h3>
        <p style={styles.message}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} style={styles.retryBtn}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  errorBox: {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    padding: '1.5rem',
    maxWidth: '500px',
    textAlign: 'center'
  },
  title: {
    color: '#c33',
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem'
  },
  message: {
    color: '#666',
    margin: '0 0 1rem 0'
  },
  retryBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s'
  }
};

export default ErrorMessage;
