"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "./icons";

// Animation variants
const navbarVariants: Variants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
    },
  },
};

const logoVariants: Variants = {
  initial: { x: -30, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const socialVariants: Variants = {
  initial: { x: 30, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const socialIconVariants: Variants = {
  hover: {
    y: -2,
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
};

const logoHoverVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.98 },
};

export default function NavbarWithImage() {
  return (
    <motion.nav
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div variants={logoVariants}>
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                variants={logoHoverVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center space-x-3"
              >
                {/* Replace with your actual logo image */}
                <Image
                  src="/fire-logo.png"
                  alt="Fire in the Belly Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />

                <div className="flex flex-col">
                  <span className="text-md font-sans sm:text-lg font-semibold text-foreground leading-none">
                    Fire in the Belly
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Social Icons - same as above */}
          <motion.div
            variants={socialVariants}
            className="flex items-center space-x-2"
          >
            <motion.div
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="https://www.linkedin.com/company/fireinthebelly/"
                aria-label="Follow us on LinkedIn"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-transparent p-2 hover:bg-neutral-50 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </Link>
            </motion.div>
            <motion.div
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="https://www.instagram.com/fireinthebelly.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-transparent p-2 hover:bg-neutral-50 transition-colors duration-200"
              >
                <Instagram />
              </Link>
            </motion.div>

            <motion.div
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="https://www.youtube.com/@AlmostAdults-FTBPodcast"
                aria-label="Subscribe to us on YouTube"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-transparent p-2 hover:bg-neutral-50 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
