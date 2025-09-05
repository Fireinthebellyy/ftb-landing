"use client";
import { motion, Variants } from "framer-motion";
import { Righteous } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from "@/components/icons";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

// Animation variants for better performance and reusability
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const successVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const checkIconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      delay: 0.2,
    },
  },
};

const socialLinkVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -2,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
};

const buttonVariants: Variants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(234, 88, 12, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.98 },
};

const inputVariants: Variants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(234, 88, 12, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full grow flex-col">
      <main className="flex-1 bg-gradient-to-b from-neutral-50 via-orange-50 to-white">
        <section className="container mx-auto py-36 md:py-28">
          <div className="px-4 text-center">
            {isSubmitted ? (
              <motion.div
                variants={successVariants}
                initial="initial"
                animate="animate"
                className="mx-auto max-w-3xl text-center"
              >
                <motion.div variants={checkIconVariants} className="mb-8">
                  <BadgeCheck className="inline-block text-green-500 h-16 w-16 mb-4" />
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className={`${righteous.className} text-foreground mb-6 text-3xl md:text-5xl font-semibold tracking-tight`}
                >
                  Successfully Registered!
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="font-sans text-neutral-600 mb-8 text-lg md:text-xl max-w-2xl mx-auto"
                >
                  Welcome to the Fire in the Belly community! You&apos;re now on
                  our waitlist and will be the first to know when we launch. Get
                  ready to discover amazing opportunities for ambitious students
                  like yourself.
                </motion.p>

                <motion.div variants={fadeInUp} className="mb-8">
                  <p className="text-neutral-500 mb-4">
                    Stay connected with us:
                  </p>
                  <motion.div
                    className="flex items-center justify-center gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={socialLinkVariants}>
                      <Link
                        href="https://www.instagram.com/fireinthebelly_ftb/"
                        aria-label="Follow us on Instagram"
                        className="flex flex-col items-center text-neutral-600 hover:text-orange-600 transition-colors"
                      >
                        <motion.div
                          variants={socialLinkVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="mb-2"
                        >
                          <Instagram className="h-8 w-8" />
                        </motion.div>
                        <span className="text-xs">Instagram</span>
                      </Link>
                    </motion.div>
                    <motion.div variants={socialLinkVariants}>
                      <Link
                        href="https://www.linkedin.com/company/fireinthebelly/"
                        aria-label="Follow us on LinkedIn"
                        className="flex flex-col items-center text-neutral-600 hover:text-orange-600 transition-colors"
                      >
                        <motion.div
                          variants={socialLinkVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="mb-2"
                        >
                          <Linkedin className="h-8 w-8" />
                        </motion.div>
                        <span className="text-xs">LinkedIn</span>
                      </Link>
                    </motion.div>
                    <motion.div variants={socialLinkVariants}>
                      <Link
                        href="https://www.youtube.com/@fireinthebelly11"
                        aria-label="Follow us on YouTube"
                        className="flex flex-col items-center text-neutral-600 hover:text-orange-600 transition-colors"
                      >
                        <motion.div
                          variants={socialLinkVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="mb-2"
                        >
                          <Youtube className="h-8 w-8" />
                        </motion.div>
                        <span className="text-xs">YouTube</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp} className="text-center">
                  <p className="text-sm text-neutral-400">
                    Keep an eye on your inbox - exciting updates are coming
                    soon! 🚀
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="mx-auto max-w-4xl"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.h1
                  variants={fadeInUp}
                  className={`${righteous.className} text-foreground mb-6 text-4xl leading-tight font-semibold tracking-tight md:text-7xl`}
                >
                  Because the right{" "}
                  <motion.span
                    className="text-orange-600/70 selection:bg-orange-600 selection:text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    opportunity
                  </motion.span>{" "}
                  changes everything.
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="font-sans text-muted-foreground mx-auto mb-8 max-w-3xl text-lg text-neutral-500"
                >
                  Be the first to know when we launch our platform for ambitious
                  students. Get early access to hackathons, grants, competitions
                  and stay ahead of every deadline.
                </motion.p>

                <motion.form
                  variants={fadeInUp}
                  onSubmit={handleSubmit}
                  className="mx-auto max-w-md"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <motion.div variants={inputVariants} whileFocus="focus">
                        <Label htmlFor="email" className="sr-only">
                          Email address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 border-2 border-neutral-500/50 bg-white/80 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-orange-500  w-full"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="h-12 px-8 font-semibold text-shadow-md w-full text-md"
                      >
                        <motion.div
                          animate={isSubmitting ? { opacity: [1, 0.7, 1] } : {}}
                          transition={
                            isSubmitting
                              ? { repeat: Infinity, duration: 1 }
                              : {}
                          }
                          className="flex items-center"
                        >
                          {isSubmitting ? (
                            "Joining..."
                          ) : (
                            <>
                              <Mail className="mr-2 h-5 w-5" />
                              Join Waitlist
                            </>
                          )}
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: 1,
                        x: [0, -4, 4, -2, 2, 0],
                        transition: {
                          opacity: { duration: 0.3 },
                          x: {
                            duration: 0.5,
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                          },
                        },
                      }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
