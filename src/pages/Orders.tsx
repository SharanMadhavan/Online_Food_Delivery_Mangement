import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { orderAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

const Orders = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getByUser(userId || 0);
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'pending':
      case 'preparing':
        return <Clock className="w-5 h-5 text-accent" />;
      default:
        return <Package className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive';
      case 'pending':
      case 'preparing':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-primary/20 text-primary';
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
        <h1 className="text-4xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and view your order history</p>
      </motion.div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-primary p-3 rounded-xl">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="font-semibold capitalize">{order.status}</span>
                </div>
                <p className="text-xl font-bold text-primary">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {order.items?.length || 0} items
              </p>
              <Button
                onClick={() => navigate(`/delivery/${order.id}`)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && !loading && (
        <div className="text-center py-12">
          <Package className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">Start ordering to see your history</p>
          <Button onClick={() => navigate('/restaurants')} className="btn-gradient">
            Browse Restaurants
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
