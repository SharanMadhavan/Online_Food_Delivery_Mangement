import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { orderAPI, deliveryAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, Truck, Package } from 'lucide-react';

interface DeliveryStatus {
  id: number;
  status: string;
  estimatedTime: string;
  driverName?: string;
  driverPhone?: string;
}

const Delivery = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [delivery, setDelivery] = useState<DeliveryStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [orderId]);

  const fetchData = async () => {
    try {
      const [orderResponse, deliveryResponse] = await Promise.all([
        orderAPI.getById(Number(orderId)),
        deliveryAPI.getByOrder(Number(orderId)),
      ]);
      setOrder(orderResponse.data);
      setDelivery(deliveryResponse.data);
    } catch (error) {
      toast.error('Failed to load delivery details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ['placed', 'preparing', 'on_the_way', 'delivered'];
    return steps.indexOf(status.toLowerCase()) + 1;
  };

  if (loading) return <Loader />;

  const currentStep = delivery ? getStatusStep(delivery.status) : 1;

  const steps = [
    { label: 'Order Placed', icon: CheckCircle, status: 'placed' },
    { label: 'Preparing', icon: Clock, status: 'preparing' },
    { label: 'On the Way', icon: Truck, status: 'on_the_way' },
    { label: 'Delivered', icon: Package, status: 'delivered' },
  ];

  return (
    <div className="page-transition">
      <Button
        onClick={() => navigate('/orders')}
        variant="ghost"
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Order #{orderId}</h1>
        <p className="text-muted-foreground">Track your delivery in real-time</p>
      </motion.div>

      {/* Delivery Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 mb-8"
      >
        <h2 className="text-2xl font-bold mb-8">Delivery Status</h2>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-primary"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-4 relative">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber <= currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <motion.div
                  key={step.status}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all
                      ${isCompleted ? 'bg-gradient-primary shadow-glow' : 'bg-muted'}
                      ${isCurrent ? 'scale-125' : ''}
                    `}
                  >
                    <step.icon
                      className={`w-6 h-6 ${isCompleted ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                    />
                  </div>
                  <p className={`text-sm font-semibold text-center ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {delivery?.estimatedTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground mb-2">Estimated Delivery Time</p>
            <p className="text-2xl font-bold text-primary">{delivery.estimatedTime}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Driver Info */}
      {delivery?.driverName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Delivery Partner</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="font-bold text-lg">{delivery.driverName}</p>
              {delivery.driverPhone && (
                <p className="text-muted-foreground">{delivery.driverPhone}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Order Details */}
      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>

          <div className="space-y-4 mb-6">
            {order.items?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name || `Item ${index + 1}`}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity || 1}</p>
                </div>
                <p className="font-bold">${(item.price || 0).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Delivery;
