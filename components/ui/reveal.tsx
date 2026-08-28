"use client";

import { motion, type HTMLMotionProps } from "motion/react";

// Fade-in al entrar en viewport. Visible por defecto (opacity 1) si el usuario pidió menos
// movimiento — la animación es un extra, nunca una condición para ver el contenido.
export function Reveal({
  as = "div",
  y = 14,
  delay = 0,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { as?: "div" | "section" | "article"; y?: number; delay?: number }) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
