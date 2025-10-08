import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { restaurantAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { Star, Clock, MapPin } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  location: string;
  imageUrl?: string;
}

const Restaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-transition">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Restaurants</h1>
        <p className="text-muted-foreground">Discover amazing food near you</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/menu/${restaurant.id}`)}
            className="food-card cursor-pointer group"
          >
            <div className="aspect-video bg-gradient-secondary rounded-t-xl overflow-hidden">
              {restaurant.imageUrl ? (
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🍽️
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {restaurant.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{restaurant.rating || '4.5'}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime || '30-40 min'}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-[100px]">
                    {restaurant.location || 'Nearby'}
                  </span>
                </div>
              </div>

              {restaurant.cuisine && (
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {restaurant.cuisine}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {restaurants.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No restaurants available</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
