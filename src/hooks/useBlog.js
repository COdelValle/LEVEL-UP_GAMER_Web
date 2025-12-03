import { useState, useEffect } from 'react';
import blogsData from '../assets/data/blogs.json';
import { useAuth } from '../context/AuthContext';

export const useBlog = () => {
  const { api } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Intentar endpoints comunes para posts/blogs
        const tryPaths = ['/api/v1/blogs', '/api/v1/posts', '/api/v1/blog'];
        let fetched = null;
        for (const p of tryPaths) {
          try {
            const res = await api.get(p);
            if (res) { fetched = Array.isArray(res) ? res : (res?.data || res); break; }
          } catch (e) {
            // ignorar y probar siguiente
          }
        }

        if (!mounted) return;

        if (fetched) setPosts(fetched);
        else {
          console.warn('useBlog: no blog endpoint responded, using local JSON');
          setPosts(blogsData || []);
        }
      } catch (err) {
        console.warn('useBlog: API fetch failed, using local JSON', err?.message || err);
        setPosts(blogsData || []);
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();

    return () => { mounted = false; };
  }, [api]);

  const getPostById = (id) => posts.find(p => String(p.id) === String(id) || String(p.postId) === String(id));

  return { posts, loading, error, getPostById };
};
