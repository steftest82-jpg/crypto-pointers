"use client";

import { useState } from 'react';
import type { FC } from 'react';

const ContactForm: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text mb-2">Message Sent!</h3>
        <p className="text-text/60">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="mt-6 btn-outline text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-text mb-2"
          >
            Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-semibold text-text mb-2"
          >
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-semibold text-text mb-2"
        >
          Subject <span className="text-primary">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="" disabled>
            Select a topic...
          </option>
          <option value="general">General Inquiry</option>
          <option value="feedback">Article Feedback</option>
          <option value="partnership">Partnership / Collaboration</option>
          <option value="guest-post">Guest Post Pitch</option>
          <option value="correction">Report a Correction</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-semibold text-text mb-2"
        >
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="input-field resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] text-text/35">
          We typically respond within 24 hours on business days.
        </p>
        <button type="submit" className="btn-primary text-sm flex-shrink-0">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
