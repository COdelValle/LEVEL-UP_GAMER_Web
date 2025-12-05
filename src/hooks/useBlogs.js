import { useState, useEffect } from 'react';
import { blogPosts as localPosts } from '../assets/data/blogData';
import createAPI from '../lib/APIHelper';

export const useBlogs = () => {
  const [posts, setPosts] = useState(localPosts || []);
  const [loading, setLoading] = useState(true);
  const api = createAPI(import.meta.env.VITE_API_URL || '');

  useEffect(() => {
    let mounted = true;
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await api.get('/api/v1/blog');
        if (mounted && Array.isArray(data) && data.length > 0) setPosts(data);
      } catch (err) {
        console.warn('useBlogs: no se pudo cargar desde backend, usando datos locales', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => { mounted = false; };
  }, []);

  return { posts, loading };
};
