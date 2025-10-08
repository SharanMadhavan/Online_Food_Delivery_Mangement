import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative"
      >
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <UtensilsCrossed className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
