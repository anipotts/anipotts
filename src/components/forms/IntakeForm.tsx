"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  projectType: z.enum(["ai-app", "product", "quant", "music", "other"]),
  timeline: z.enum(["less-than-1-month", "1-3-months", "3-plus-months"]),
  budgetRange: z.enum(["5k-15k", "15k-30k", "30k-plus", "discuss"]),
  message: z.string().min(20, "Please provide at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function IntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setError(
        "Something went wrong. Please try again or email me directly at ani@anipotts.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-2xl  font-bold text-foreground">
          Thanks for reaching out!
        </h3>
        <p className="text-muted-foreground">
          I&apos;ll review your message and get back to you within 48 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-accent hover:text-accent/80 transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Name *
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Company (optional) */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Company (optional)
        </label>
        <input
          {...register("company")}
          type="text"
          id="company"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
          placeholder="Your company"
        />
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Project Type *
        </label>
        <select
          {...register("projectType")}
          id="projectType"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <option value="">Select a type</option>
          <option value="ai-app">AI App</option>
          <option value="product">Product</option>
          <option value="quant">Quant</option>
          <option value="music">Music</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.projectType.message}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div>
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Timeline *
        </label>
        <select
          {...register("timeline")}
          id="timeline"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <option value="">Select a timeline</option>
          <option value="less-than-1-month">&lt;1 month</option>
          <option value="1-3-months">1-3 months</option>
          <option value="3-plus-months">3+ months</option>
        </select>
        {errors.timeline && (
          <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <label
          htmlFor="budgetRange"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Budget Range *
        </label>
        <select
          {...register("budgetRange")}
          id="budgetRange"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <option value="">Select a budget range</option>
          <option value="5k-15k">$5k-15k</option>
          <option value="15k-30k">$15k-30k</option>
          <option value="30k-plus">$30k+</option>
          <option value="discuss">Let&apos;s discuss</option>
        </select>
        {errors.budgetRange && (
          <p className="mt-1 text-sm text-red-500">
            {errors.budgetRange.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Tell me about your project *
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
          placeholder="What are you building? What's the goal? Any specific features or requirements?"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="text-sm text-muted-foreground text-center">
        I typically respond within 48 hours. For urgent inquiries, email me at{" "}
        <a
          href="mailto:ani@anipotts.com"
          className="text-accent hover:text-accent/80 transition-colors"
        >
          ani@anipotts.com
        </a>
      </p>
    </form>
  );
}
