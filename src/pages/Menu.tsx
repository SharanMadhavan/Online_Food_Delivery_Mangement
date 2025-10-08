import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { menuAPI, restaurantAPI } from '@/api/endpoints';
import { addToCart } from '@/redux/slices/cartSlice';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

const Menu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [menuResponse, restaurantResponse] = await Promise.all([
        menuAPI.getByRestaurant(Number(id)),
        restaurantAPI.getById(Number(id)),
      ]);
      setMenuItems(menuResponse.data);
      setRestaurant(restaurantResponse.data);
    } catch (error) {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        restaurantId: Number(id),
        restaurantName: restaurant?.name || '',
        image: item.imageUrl,
      })
    );
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <Loader />;

  return (
    <div className="page-transition">
      <Button
        onClick={() => navigate('/restaurants')}
        variant="ghost"
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Restaurants
      </Button>

      {restaurant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 rounded-2xl"
        >
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.description}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="food-card"
          >
            <div className="aspect-video bg-gradient-accent rounded-t-xl overflow-hidden">
              {item.imageUrl? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🍔
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="text-lg font-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>

              {item.category && (
                <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded-full mb-4">
                  {item.category}
                </span>
              )}

              <Button
                onClick={() => handleAddToCart(item)}
                disabled={!item.available}
                className="w-full btn-gradient gap-2"
              >
                <Plus className="w-4 h-4" />
                {item.available ? 'Add to Cart' : 'Unavailable'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {menuItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No menu items available</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
