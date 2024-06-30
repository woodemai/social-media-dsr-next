import { CheckCircledIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

type FormSuccessProps = {
  message?: string;
};
export const FormSuccess = ({ message }: FormSuccessProps) => {
  const isVisible = !!message;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className='flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500'
        >
          <CheckCircledIcon className='size-4' />
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MFormSuccess = motion(FormSuccess);
