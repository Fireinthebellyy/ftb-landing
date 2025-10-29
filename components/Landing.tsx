"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Mail } from "./icons";
import { Righteous } from "next/font/google";

type Props = {
  onSubmitted: (email: string) => void;
};

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

export default function Landing({ onSubmitted }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        localStorage.setItem("waitlistEmail", email);
        onSubmitted(email);
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Badges Marquee Section */}
      <motion.div
        className="relative mb-8 overflow-hidden w-full"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.02, duration: 0.5 }}
      >
        <div className="flex animate-marquee">
          {/* First set of badges */}
          <div className="flex gap-3 pr-3">
            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🎯</span>
              40+ fields
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🌍</span>
              Global coverage
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">⚡</span>
              Real-time updates
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🔥</span>
              Ambition is the new cool
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">💡</span>
              Clarity for your 20s
            </motion.div>
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-3 pr-3">
            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🎯</span>
              40+ fields
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🌍</span>
              Global coverage
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">⚡</span>
              Real-time updates
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">🔥</span>
              Ambition is the new cool
            </motion.div>

            <motion.div
              className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-orange-800 backdrop-blur-sm whitespace-nowrap flex-shrink-0"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="mr-2">💡</span>
              Clarity for your 20s
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.h1
        className={`${righteous.className} text-foreground mb-6 text-4xl leading-tight font-semibold tracking-tight md:text-7xl`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
      >
        Because the right{" "}
        <motion.span
          className="text-orange-600/70 selection:bg-orange-600 selection:text-white"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          opportunity
        </motion.span>{" "}
        changes everything.
      </motion.h1>

      <motion.p
        className="font-sans text-muted-foreground mx-auto mb-8 max-w-3xl text-lg text-neutral-500"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
      >
        The ultimate platform for ambitious students. Get early access to
        hackathons, grants, competitions, internships & stay ahead of every
        deadline.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
              className="h-12 border-2 border-neutral-500/50 bg-white/80 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-orange-500 w-full"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 font-semibold text-shadow-md w-full text-md"
            >
              <div className="flex items-center">
                {isSubmitting ? (
                  "Joining..."
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Join Waitlist
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </motion.form>
    </motion.div>
  );
}
