"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export interface FacultyInterface {
  name: string;
  image: string;
  slug: string;
  designation?: string;
}

export default function AlumniRegistrationForm() {
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

  return(
    <section className="common_formsec common_fm_bg">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="container">
                    <div className="conf_topsec">

                        <div className="comfrm_grid">

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="erpId">ERP ID<sup>*</sup></label>
                                    <input type="text" id="erpId" name="erpId" className="form-control" placeholder="ERP ID"
                                        required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="enrolmentNumber">
                                        Enrolment Number<sup>*</sup>
                                    </label>
                                    <input type="text" id="enrolmentNumber" name="enrolmentNumber" className="form-control"
                                        placeholder="Enrolment Number" required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="fullName">Name in Full<sup>*</sup></label>
                                    <input type="text" id="fullName" name="fullName" className="form-control"
                                        placeholder="Name in Full" required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="fatherName">Father’s Name<sup>*</sup></label>
                                    <input type="text" id="fatherName" name="fatherName" className="form-control"
                                        placeholder="Father’s Name" required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="gender">Gender<sup>*</sup></label>

                                    <select id="gender" name="gender" className="form-control nice-select" required defaultValue="">
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="programmeType">
                                        Select Programme Type<sup>*</sup>
                                    </label>

                                    <select id="programmeType" name="programmeType" className="form-control nice-select"
                                        required defaultValue="">
                                        <option value="" disabled>
                                            Select Type
                                        </option>
                                        <option value="1">Under Graduate</option>
                                        <option value="2">Post Graduate</option>
                                        <option value="3">Doctoral</option>
                                        <option value="4">Diploma</option>
                                    </select>
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="programmeName">
                                        Name of the Programme<sup>*</sup>
                                    </label>

                                    <select id="programmeName" name="programmeName" className="form-control nice-select"
                                        required defaultValue="">

                                        <option value="" disabled>
                                            Select Course
                                        </option>

                                        {/* Keep your complete existing programme options here */}

                                        <option value="1">
                                            BBA / BBA (Honours) / BBA (Honours with Research)
                                        </option>
                                        <option value="17">
                                            Masters of Arts in English
                                        </option>
                                        <option value="3">BCA</option>
                                        <option value="4">
                                            B.Com. / B.Com. (Honours) /
                                            B.Com. (Honours with Research)
                                        </option>
                                        <option value="8">MCA</option>
                                        <option value="12">
                                            Bachelor of Arts (Hons.) in English
                                        </option>
                                        <option value="18">Ph.D. English</option>
                                        <option value="19">B.A., LL.B.</option>
                                        <option value="20">BBA.LL.B. (Hons.)</option>
                                        <option value="21">LLB</option>
                                        <option value="22">LLM</option>
                                        <option value="25">B.Sc. Nursing</option>
                                        <option value="28">B.Tech. Biotechnology</option>
                                        <option value="45">
                                            B.Tech. Computer Science Engineering
                                        </option>
                                        <option value="68">B. Pharm</option>
                                        <option value="91">MBA (Dual Specialization)</option>
                                        <option value="93">
                                            MBA (Hospital and Healthcare Management)
                                        </option>
                                        <option value="128">
                                            B.Sc. Hospitality and Hotel Administration
                                        </option>
                                        <option value="129">
                                            BHMCT (Hotel Management and Catering Technology)
                                        </option>
                                        <option value="135">
                                            B.Sc. (Hons.) Agriculture
                                        </option>
                                        <option value="197">MBBS</option>
                                        <option value="211">MD (Radio Diagnosis)</option>
                                        <option value="212">
                                            MD (Dermatology, Venereology &amp; Leprosy)
                                        </option>
                                        <option value="214">
                                            MS (Obstetrics &amp; Gynaecology)
                                        </option>
                                        <option value="215">MD (Paediatrics)</option>
                                        <option value="216">MS (Ophthalmology)</option>
                                        <option value="217">MS (General Surgery)</option>
                                        <option value="218">MS (Orthopaedics)</option>
                                        <option value="219">MD (Psychiatry)</option>
                                        <option value="222">MD (Anaesthesiology)</option>
                                        <option value="3333">Others</option>
                                    </select>
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="otherProgramme">
                                        If Other Programme<sup>*</sup>
                                    </label>
                                    <input type="text" id="otherProgramme" name="otherProgramme" className="form-control"
                                        placeholder="Other Programme" required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="mobileNumber">
                                        Mobile Number<sup>*</sup>
                                    </label>
                                    <input type="tel" id="mobileNumber" name="mobileNumber" className="form-control"
                                        placeholder="Mobile Number" inputMode="numeric" maxLength={10} required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="whatsappNumber">
                                        WhatsApp Number<sup>*</sup>
                                    </label>
                                    <input type="tel" id="whatsappNumber" name="whatsappNumber" className="form-control"
                                        placeholder="WhatsApp Number" inputMode="numeric" maxLength={10} required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="emailId">Email Address<sup>*</sup></label>
                                    <input type="email" id="emailId" name="emailId" className="form-control"
                                        placeholder="Email Address" required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="batch">Batch<sup>*</sup></label>
                                    <input type="text" id="batch" name="batch" className="form-control" placeholder="Batch"
                                        required />
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="alumniMeet">
                                        Alumni Meet (22 Feb 2025 Evening)<sup>*</sup>
                                    </label>

                                    <select id="alumniMeet" name="alumniMeet" className="form-control nice-select" required defaultValue="">
                                        <option value="" disabled>
                                            Select Option
                                        </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="musicalEvening">
                                        Musical Evening with Gala Dinner<sup>*</sup>
                                    </label>

                                    <select id="musicalEvening" name="musicalEvening" className="form-control nice-select"
                                        required defaultValue="">
                                        <option value="" disabled>
                                            Select Option
                                        </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>


                            <div className="comfrm_col">
                                <div className="form_group">
                                    <label htmlFor="captcha">Captcha<sup>*</sup></label>
                                    <input type="text" id="captcha" name="captcha" className="form-control"
                                        placeholder="Enter captcha code" required />
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        {isSubmitted && (
                            <p role="status" aria-live="polite">
                                Your alumni registration has been submitted successfully.
                            </p>
                        )}

                    </div>
                </div>
            </form>
        </section>
  )
}
