import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
    },
    {
      icon: Shield,
      title: 'Quality Food',
      description: 'Fresh ingredients from the best restaurants',
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Order anytime, anywhere',
    },
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass-card p-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Delicious Food,{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Order from your favorite restaurants and get it delivered to your doorstep in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={() => navigate('/restaurants')}
              className="btn-gradient text-lg px-8 py-6"
            >
              <UtensilsCrossed className="mr-2 w-5 h-5" />
              Browse Restaurants
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="glass-card p-6 hover:scale-105 transition-transform"
          >
            <div className="bg-gradient-primary p-3 rounded-xl w-fit mb-4">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-12 text-center rounded-3xl"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
        <p className="text-muted-foreground mb-6">
          Explore hundreds of restaurants and thousands of dishes
        </p>
        <Button
          onClick={() => navigate('/restaurants')}
          className="btn-gradient text-lg px-8 py-6"
        >
          Start Ordering Now
        </Button>
      </motion.section>
    </div>
  );
};

export default Home;
