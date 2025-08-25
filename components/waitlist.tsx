"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { BadgeCheck, Instagram, Linkedin, Mail, Youtube } from "./icons";

function WaitlistForm() {
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

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl animate-success-fade-in">
        <div className="text-foreground mb-4 flex flex-wrap items-center justify-center gap-2 text-xl md:text-xl">
          <BadgeCheck className="inline-block text-green-500 animate-check-bounce" />
          <p>You are in. Follow us on social media for updates!</p>
        </div>

        <div className="flex items-end justify-center gap-4">
          <Link
            href="https://www.instagram.com/fireinthebelly_ftb/"
            aria-label="Follow us on Instagram"
            className="social-link"
          >
            <Instagram />
          </Link>
          <Link
            href="https://www.linkedin.com/company/fireinthebelly/"
            aria-label="Follow us on LinkedIn"
            className="social-link"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://www.youtube.com/@fireinthebelly11"
            aria-label="Follow us on YouTube"
            className="social-link"
          >
            <Youtube />
          </Link>
        </div>

        <style jsx>{`
          @keyframes success-fade-in {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes check-bounce {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes social-hover {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-2px);
            }
          }

          .animate-success-fade-in {
            animation: success-fade-in 0.5s ease-out;
          }

          .animate-check-bounce {
            animation: check-bounce 0.6s ease-out;
          }

          .social-link {
            transition: all 0.2s ease;
          }

          .social-link:hover {
            animation: social-hover 0.2s ease forwards;
            color: rgb(234 88 12 / 0.7);
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md form-container">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-2 border-orange-600/70 placeholder:text-orange-800/40 input-focus"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="h-12 px-8 font-semibold text-shadow-sm submit-button"
        >
          {isSubmitting ? (
            <span className="submitting-text">Joining...</span>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Join Waitlist
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-shake">{error}</p>
      )}

      <style jsx>{`
        @keyframes button-press {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(1px) scale(0.98);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }

        .form-container {
          animation: fade-in-up 0.5s ease-out;
        }

        .submit-button:active {
          animation: button-press 0.1s ease;
        }

        .submitting-text {
          animation: pulse 1.5s infinite;
        }

        .input-focus:focus {
          box-shadow: 0 0 0 3px rgb(234 88 12 / 0.1);
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </form>
  );
}

export default WaitlistForm;
