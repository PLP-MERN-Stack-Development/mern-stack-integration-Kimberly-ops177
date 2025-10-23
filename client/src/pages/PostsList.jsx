import { useState, useEffect } from 'react';
import { postsAPI, categoriesAPI } from '../services/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 9,
        ...(selectedCategory && { category: selectedCategory }),
        ...(search && { search })
      };
      
      const response = await postsAPI.getPosts(params);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  if (loading && posts.length === 0) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPosts} />;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Blog Posts</h1>
        
        <div style={styles.filters}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>

          <div style={styles.categoryFilter}>
            <label style={styles.label}>Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={styles.select}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div style={styles.noPosts}>
          <p>No posts found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div style={styles.grid}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                style={page === 1 ? {...styles.pageButton, ...styles.pageButtonDisabled} : styles.pageButton}
              >
                Previous
              </button>
              
              <span style={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                style={page === totalPages ? {...styles.pageButton, ...styles.pageButtonDisabled} : styles.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1.5rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  searchForm: {
    display: 'flex',
    gap: '0.5rem',
    flex: '1',
    minWidth: '250px'
  },
  searchInput: {
    flex: '1',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  searchButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  categoryFilter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  select: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minWidth: '200px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  noPosts: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
    fontSize: '1.125rem'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem 0'
  },
  pageButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  pageButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  pageInfo: {
    fontSize: '1rem',
    color: '#666',
    fontWeight: 'bold'
  }
};

export default PostsList;
