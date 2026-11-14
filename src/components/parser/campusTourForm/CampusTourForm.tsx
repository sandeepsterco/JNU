"use client";

import { useState } from "react";
import type { FormEvent } from "react";

interface PageDataInterface {
  data: {
    modular: {
      faculty: FacultyInterface[];
    };
  };
}

export interface FacultyInterface {
  name: string;
  image: string;
  slug: string;
  designation?: string;
}

export default function CampusTourForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="cont-form campus_visit">
        <h4>Kindly complete the following details to schedule a visit:</h4>
        <div className="form-group">
          <input
            type="text"
            id="txtName"
            name="name"
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="txtEmail"
            name="email"
            className="form-control"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            id="txtMobile"
            name="mobile"
            className="form-control"
            placeholder="Mobile No"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="txtAddress"
            name="address"
            className="form-control"
            placeholder="Address"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="program"
            name="program"
            className="form-control"
            placeholder="Program Interested"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="txtDate"
            name="visit_date"
            className="form-control"
            min="2026-11-14"
            required
          />
        </div>
        <div className="py-3 read-m btn-new">
          <button type="submit" id="btnSubmit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {isSubmitted && (
            <p role="status" aria-live="polite" className="message">
              Your visit request has been submitted successfully.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
