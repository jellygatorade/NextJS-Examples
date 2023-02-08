import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

// Following
//
// How to Animate the Page Transition in Next.js
// https://javascript.plainenglish.io/how-to-animate-the-page-transition-in-next-js-68c7b888dce3
//
// Animated Page Transitions in Next.js
// https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs

// Seems like you have to cancel process and re-run 'npm run dev' to see changes in this component

const variants = {
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Transition = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
