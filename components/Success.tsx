"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Linkedin, Instagram, Youtube } from "./icons";
import { Righteous } from "next/font/google";

type Props = {
  email: string;
};

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Success({ email }: Props) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!feedback.trim()) {
      setError("Feedback is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, feedback: feedback.trim() }),
      });

      if (response.ok) {
        setFeedback("");
        setIsFeedbackSubmitted(true);
        setTimeout(() => {
          setIsFeedbackSubmitted(false);
        }, 2000);
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
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center pt-8 md:pt-16"
    >
      <motion.div className="mb-8 text-6xl md:text-7xl">🎉</motion.div>

      <motion.h2
        className={`${righteous.className} text-foreground mb-6 text-4xl md:text-7xl font-semibold tracking-tight`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.5 }}
      >
        You&apos;re In!
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className="font-sans text-neutral-600 mb-8 text-lg md:text-xl max-w-4xl mx-auto"
      >
        You are now{" "}
        <span className="text-orange-600/70 selection:bg-orange-600 selection:text-white">
          officially on our waitlist
        </span>{" "}
        and we can&apos;t wait to show you what&apos;s cooking. Just a spoiler,
        you will love it. Get ready to discover amazing opportunities for
        ambitious students like you. Vo kehte hai na,
        <span className="text-orange-600/70 selection:bg-orange-600 selection:text-white">
          {" "}
          kisi cheez ko poori shiddhat se chaaho to poori kaaynat bhi tumhe usse
          milaane ki koshish me lagjaati hai
        </span>{" "}
        - hume wahi &quot;koshish” samjahlijiyega!
      </motion.p>

      <form className="mb-4" onSubmit={handleSubmitFeedback}>
        <textarea
          cols={30}
          rows={3}
          className="w-full rounded-md border-2 border-neutral-500 p-4 text-neutral-700 placeholder:text-neutral-500/80 focus:border-orange-500 focus:ring-orange-500 placeholder:text-sm"
          placeholder="In the meantime, feel free to tell/rant~ what you need from this platform (every message directly goes to our Founder<3)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          disabled={isSubmitting || isFeedbackSubmitted}
        />
        <button
          type="submit"
          className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600/80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full disabled:bg-orange-600/40"
          disabled={isSubmitting || isFeedbackSubmitted}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {isFeedbackSubmitted && (
          <p className="mt-2 text-sm">
            Your response has been recorded. Thank you! 🎉
          </p>
        )}

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>

      <div className="mb-4">
        <p className="text-neutral-700 mb-2">Stay connected with us:</p>
        <div className="flex items-center justify-center gap-6">
          <Link
            href="https://www.linkedin.com/company/fireinthebelly/"
            aria-label="Follow us on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  hover:text-orange-600 transition-colors"
          >
            <div className="mb-2 inline-flex items-center justify-center rounded-full border border-gray-600 p-2 transition-colors duration-200">
              <Linkedin className="size-5" />
            </div>
            <span className="text-xs">LinkedIn</span>
          </Link>

          <Link
            href="https://www.instagram.com/fireinthebelly.in/"
            aria-label="Follow us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  hover:text-orange-600 transition-colors"
          >
            <div className="mb-2 inline-flex items-center justify-center rounded-full border border-gray-600 p-2 transition-colors duration-200">
              <Instagram className="size-5" />
            </div>
            <span className="text-xs">Instagram</span>
          </Link>

          <Link
            href="https://www.youtube.com/@fireinthebelly11"
            aria-label="Follow us on YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  hover:text-orange-600 transition-colors"
          >
            <div className="mb-2 inline-flex items-center justify-center rounded-full border border-gray-600 p-2 transition-colors duration-200">
              <Youtube className="size-5" />
            </div>
            <span className="text-xs">YouTube</span>
          </Link>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-700">
          Watch your inbox—big things are coming soon. 🚀
        </p>
      </div>
    </motion.div>
  );
}
