"use client";
import React, { useState } from "react";
import Landing from "@/components/Landing";
import Success from "@/components/Success";
import posthog from "posthog-js";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  return (
    <div className="flex h-full grow flex-col">
      <main className="flex-1 bg-gradient-to-b from-neutral-50 via-orange-50 to-white">
        <section className="container mx-auto py-12 md:py-18">
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
        </section>
      </main>
    </div>
  );
}
