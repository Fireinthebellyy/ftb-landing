"use client";
import React, { useState } from "react";
import Landing from "@/components/Landing";
import Success from "@/components/Success";
import Navbar from "@/components/nav";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat -z-10"
        style={{ backgroundImage: "url('hero-bg.webp')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 -z-10 opacity-80" />
      <Navbar />
      <div className="px-4 text-center">
        {!isEmailSubmitted ? (
          <Landing
            onSubmitted={(submittedEmail: string) => {
              setEmail(submittedEmail);
              setIsEmailSubmitted(true);
            }}
          />
        ) : (
          <Success email={email} />
        )}
      </div>
    </div>
  );
}
