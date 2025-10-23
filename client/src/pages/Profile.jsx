import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h1 style={styles.title}>My Profile</h1>

        <div style={styles.avatarSection}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} style={styles.avatar} />
          ) : (
            <div style={styles.avatarPlaceholder}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoGroup}>
            <label style={styles.label}>Name</label>
            <p style={styles.value}>{user.name}</p>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.label}>Email</label>
            <p style={styles.value}>{user.email}</p>
          </div>

          <div style={styles.infoGroup}>
            <label style={styles.label}>Role</label>
            <span style={styles.badge}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>

          {user.bio && (
            <div style={styles.infoGroup}>
              <label style={styles.label}>Bio</label>
              <p style={styles.value}>{user.bio}</p>
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button style={styles.editButton}>
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>

      <div style={styles.statsCard}>
        <h2 style={styles.statsTitle}>Quick Stats</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statValue}>Ì≥ù</div>
            <div style={styles.statLabel}>Posts Created</div>
            <div style={styles.statNumber}>Coming Soon</div>
          </div>
          
          <div style={styles.statItem}>
            <div style={styles.statValue}>Ì≤¨</div>
            <div style={styles.statLabel}>Comments</div>
            <div style={styles.statNumber}>Coming Soon</div>
          </div>
          
          <div style={styles.statItem}>
            <div style={styles.statValue}>Ì±ÅÔ∏è</div>
            <div style={styles.statLabel}>Total Views</div>
            <div style={styles.statNumber}>Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #3498db'
  },
  avatarPlaceholder: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    fontWeight: 'bold',
    border: '4px solid #2980b9'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  infoGroup: {
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#666',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  value: {
    fontSize: '1.125rem',
    color: '#2c3e50',
    margin: 0
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #eee'
  },
  editButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    padding: '0.875rem 2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem'
  },
  statItem: {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  statValue: {
    fontSize: '3rem',
    marginBottom: '0.5rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '0.5rem'
  },
  statNumber: {
    fontSize: '0.875rem',
    color: '#999',
    fontStyle: 'italic'
  }
};

export default Profile;
