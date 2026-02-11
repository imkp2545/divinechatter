import { useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '@api/wishlistApi';
import { useAuth } from './useAuth';
import { useToast } from '@context/ToastContext';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await wishlistApi.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId) => {
    try {
      await wishlistApi.addToWishlist(productId);
      toast.success('Added to wishlist');
      fetchWishlist();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistApi.removeFromWishlist(productId);
      toast.success('Removed from wishlist');
      fetchWishlist();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.product?._id === productId);
  };

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refetch: fetchWishlist
  };
};