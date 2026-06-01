import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function SuccessScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="w-24 h-24 mx-auto text-white" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold mb-3">Welcome to FlowApp!</h2>
          <p className="text-xl text-white/90">
            Your account has been created successfully
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <p className="text-white/80">
            Get ready for an amazing experience
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
