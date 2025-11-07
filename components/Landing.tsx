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
        console.log(res);
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
      className="mx-auto max-w-4xl pt-32 pb-20 text-center px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.h1
        className={`${righteous.className} text-foreground mb-6 text-4xl font-semibold md:leading-20 tracking-tight md:text-7xl`}
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
        className="font-sans text-muted-foreground mx-auto mb-8 max-w-xl md:text-xl text-neutral-500"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
      >
        The ultimate platform for early access to hackathons, grants,
        competitions, internships.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg"
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
              placeholder="YourAwesomeName@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border border-neutral-500/50 bg-white/80 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-orange-500 w-full"
              disabled={isSubmitting}
            />
          </div>

          <motion.button whileHover={{ scale: 1.03 }}>
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
          </motion.button>
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
