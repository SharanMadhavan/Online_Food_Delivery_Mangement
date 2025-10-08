import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import { ShoppingCart, User, LogOut, Home, UtensilsCrossed, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth);
  const { totalItems } = useSelector((state: RootState) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-card sticky top-0 z-50 px-6 py-4 mb-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
            <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            FoodFlow
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to="/home">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>

            <Link to="/restaurants">
              <Button variant="ghost" size="sm" className="gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Restaurants
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant="ghost" size="sm" className="gap-2">
                <Package className="w-4 h-4" />
                Orders
              </Button>
            </Link>

            {isAdmin && (
              <Link to="/admin/restaurants">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="w-4 h-4" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>

            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-gradient">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
