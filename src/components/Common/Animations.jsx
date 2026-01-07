import { motion } from 'framer-motion';

// Fade Up: Elements slide up and fade in
export const FadeUp = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale In: Good for images or emphasis
export const ScaleIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Container: Use this to wrap a list of items (like ProductGrid)
export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }) => (
    <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Item: Must be a direct child of StaggerContainer
export const StaggerItem = ({ children, className = "" }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className={className}
    >
        {children}
    </motion.div>
);
