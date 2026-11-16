"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function PlacementRegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const requiredTextFields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
            'input[type="text"][required], textarea[required]',
        );
        requiredTextFields.forEach((field) => {
            field.setCustomValidity(field.value.trim() ? "" : "This field is required.");
        });

        const fileInputs = form.querySelectorAll<HTMLInputElement>('input[type="file"]');

        fileInputs.forEach((input) => {
            const acceptedTypes = input.accept.split(",").map((type) => type.trim().toLowerCase());
            const invalidFile = Array.from(input.files ?? []).find((file) => {
                const fileName = file.name.toLowerCase();
                return !acceptedTypes.some((acceptedType) => {
                    if (acceptedType.startsWith(".")) {
                        return fileName.endsWith(acceptedType);
                    }
                    if (acceptedType.endsWith("/*")) {
                        const extensionMatchesImage =
                            acceptedType === "image/*" &&
                            /\.(apng|avif|bmp|gif|jpe?g|png|svg|tiff?|webp)$/i.test(fileName);
                        return file.type.startsWith(acceptedType.slice(0, -1)) || extensionMatchesImage;
                    }
                    return file.type === acceptedType;
                });
            });

            input.setCustomValidity(
                invalidFile ? `Choose a file matching: ${input.accept}.` : "",
            );
        });

        if (!form.reportValidity()) {
            return;
        }

        setIsSubmitting(true);
        setIsSubmitted(false);

        window.setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    }

    return(
        <form
            onSubmit={handleSubmit}
            onChange={(event) => {
                const target = event.target;
                if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                    target.setCustomValidity("");
                }
                setIsSubmitted(false);
            }}
            encType="multipart/form-data"
        >
        <div className="plament_regist_main">

                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">01. Personal Information</h4>
                            </div>
                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Student Name</label>
                                        <input type="text" name="student_name" className="form-control"
                                            placeholder="Enter Student Name" autoComplete="name" minLength={2}
                                            maxLength={100} required />
                                    </div>
                                </div>
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Enrollment Number</label>
                                        <input type="text" name="enrollment_number" className="form-control"
                                            placeholder="Enter Enrollment Number" minLength={3} maxLength={30}
                                            pattern="[A-Za-z0-9/-]+" title="Use 3–30 letters, numbers, slashes, or hyphens."
                                            required />
                                    </div>
                                </div>
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>University Email ID</label>
                                        <input type="email" name="university_email" className="form-control"
                                            placeholder="Enter University Email ID" autoComplete="email" maxLength={254} required />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Personal Email ID</label>
                                        <input type="email" name="personal_email" className="form-control"
                                            placeholder="Enter Personal Email ID" autoComplete="email" maxLength={254} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Mobile Number</label>
                                        <input type="tel" name="mobile" className="form-control"
                                            placeholder="Enter Mobile Number" autoComplete="tel"
                                            pattern="[+]?[0-9][0-9 ()-]{5,18}[0-9]"
                                            title="Enter a valid phone number." required />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Date of Birth</label>
                                        <input type="date" name="dob" className="form-control" max={new Date().toISOString().slice(0, 10)} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Gender</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="gender" value="Male" required />
                                            <label>Male</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="gender" value="Female" />
                                            <label>Female</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="gender" value="Other" />
                                            <label>Other</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group ">
                                        <label>Permanent Address</label>
                                        <textarea name="permanent_address" rows={3} className="form-control"
                                            placeholder="Enter Permanent Address" maxLength={500}></textarea>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Current Address</label>
                                        <textarea name="current_address" rows={3} className="form-control"
                                            placeholder="Enter Current Address" maxLength={500}></textarea>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>LinkedIn Profile URL</label>
                                        <input type="url" name="linkedin" className="form-control"
                                            placeholder="Enter LinkedIn Profile URL" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Portfolio / GitHub / Website</label>
                                        <input type="url" name="portfolio" className="form-control"
                                            placeholder="Enter Portfolio / GitHub / Website URL" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* 02. Academic Information */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">02. Academic Information</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>School / Faculty</label>
                                        <input type="text" name="school" className="form-control"
                                            placeholder="Enter School / Faculty" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Department</label>
                                        <input type="text" name="department" className="form-control"
                                            placeholder="Enter Department" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Programme</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="programme" value="Diploma" required />
                                            <label>Diploma</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="programme" value="UG" />
                                            <label>UG</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="programme" value="PG" />
                                            <label>PG</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="programme" value="Ph.D." />
                                            <label>Ph.D.</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Program Name</label>
                                        <input type="text" name="program_name" className="form-control"
                                            placeholder="Enter Program Name" minLength={2} maxLength={120} required />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Specialization</label>
                                        <input type="text" name="specialization" className="form-control"
                                            placeholder="Enter Specialization" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Current Semester</label>
                                        <input type="text" name="semester" className="form-control"
                                            placeholder="Enter Current Semester" maxLength={30} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Year of Passing</label>
                                        <input type="number" name="passing_year" className="form-control"
                                            placeholder="Enter Passing Year" min={1950} max={new Date().getFullYear() + 10} step={1} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Performance */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">02.1 Academic Performance</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class X - Board / University</label>
                                        <input type="text" name="class_x_board" className="form-control"
                                            placeholder="Enter Board Name" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class X - Year</label>
                                        <input type="number" name="class_x_year" className="form-control"
                                            placeholder="Passing Year" min={1950} max={new Date().getFullYear() + 10} step={1} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class X - Percentage / CGPA</label>
                                        <input type="number" name="class_x_score" className="form-control"
                                            placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class XII - Board / University</label>
                                        <input type="text" name="class_xii_board" className="form-control"
                                            placeholder="Enter Board Name" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class XII - Year</label>
                                        <input type="number" name="class_xii_year" className="form-control"
                                            placeholder="Passing Year" min={1950} max={new Date().getFullYear() + 10} step={1} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Class XII - Percentage / CGPA</label>
                                        <input type="number" name="class_xii_score" className="form-control"
                                            placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Diploma - Board / University (if applicable)</label>
                                        <input type="text" name="diploma_board" className="form-control"
                                            placeholder="Enter Board / University" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Diploma - Year</label>
                                        <input type="number" name="diploma_year" className="form-control"
                                            placeholder="Passing Year" min={1950} max={new Date().getFullYear() + 10} step={1} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Diploma - Percentage / CGPA</label>
                                        <input type="number" name="diploma_score" className="form-control"
                                            placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Current UG / PG CGPA</label>
                                        <input type="number" name="current_cgpa" className="form-control"
                                            placeholder="Enter Current CGPA" min={0} max={10} step={0.01} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Number of Active Backlogs</label>
                                        <input type="number" name="backlogs" className="form-control"
                                            placeholder="Enter Number of Backlogs" min={0} step={1} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Gap Year(s), if any</label>
                                        <input type="number" name="gap_years" className="form-control"
                                            placeholder="Enter Gap Year(s)" min={0} step={1} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 03. Placement Preference */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">03. Placement Preference</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <label>Seeking Opportunities For</label>
                                    <select name="opportunity_type" className="form-control" defaultValue="" required>
                                        <option value="" disabled>Select opportunity type</option>
                                        <option value="Campus Placement">Campus Placement</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Both">Both Placement & Internship</option>
                                    </select>
                                </div>

                                <div className="comfrm_col">
                                    <label>Preferred Job Location</label>
                                    <select name="preferred_location" className="form-control" defaultValue="" required>
                                        <option value="" disabled>Select preferred location</option>
                                        <option value="Jaipur">Jaipur</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="PAN India">PAN India</option>
                                        <option value="International">International</option>
                                        <option value="Remote">Work from Home / Remote</option>
                                    </select>
                                </div>

                                <div className="comfrm_col">
                                    <label>Preferred Employment Type</label>
                                    <select name="employment_type" className="form-control" defaultValue="" required>
                                        <option value="" disabled>Select employment type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Internship with PPO">Internship with PPO</option>
                                        <option value="Management Trainee">Management Trainee</option>
                                        <option value="Research Associate">Research Associate</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 04. Career Interests */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">04. Career Interests</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <label>Preferred Industry Sector</label>
                                    <select name="industry_sector" className="form-control" defaultValue="" required>
                                        <option value="" disabled>Select industry sector</option>
                                        <option value="IT & Software">IT & Software</option>
                                        <option value="Data Science & Analytics">Data Science & Analytics</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Banking & Financial Services">Banking & Financial Services</option>
                                        <option value="Marketing & Sales">Marketing & Sales</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                                        <option value="Healthcare & Hospital Management">Healthcare & Hospital Management</option>
                                        <option value="Pharmaceutical Industry">Pharmaceutical Industry</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Education & Research">Education & Research</option>
                                        <option value="Media & Communication">Media & Communication</option>
                                        <option value="Legal Services">Legal Services</option>
                                        <option value="Government Sector">Government Sector</option>
                                        <option value="Start-ups">Start-ups</option>
                                        <option value="Other">Other</option>

                                    </select>

                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Other Industry Sector</label>
                                        <input type="text" name="other_industry" className="form-control"
                                            placeholder="Specify Other Industry" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Preferred Functional Area</label>
                                        <textarea name="functional_area" rows={3} className="form-control"
                                            placeholder="Enter Preferred Functional Area" maxLength={1000}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 05. Skills & Certifications */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">05. Skills & Certifications</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Technical Skills</label>
                                        <textarea name="technical_skills" rows={4} className="form-control"
                                            placeholder="Mention your Technical Skills" maxLength={1000}></textarea>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Software Proficiency</label>
                                    <select name="software" className="form-control">
                                        <option value="">Select Software</option>
                                        <option value="MS Excel">MS Excel</option>
                                        <option value="Power BI">Power BI</option>
                                        <option value="Tableau">Tableau</option>
                                        <option value="Python">Python</option>
                                        <option value="R Programming">R Programming</option>
                                        <option value="SPSS">SPSS</option>
                                        <option value="Tally">Tally</option>
                                        <option value="AutoCAD">AutoCAD</option>
                                        <option value="MATLAB">MATLAB</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Other Software Proficiency</label>
                                        <input type="text" name="other_software" className="form-control"
                                            placeholder="Specify Other Software" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Certifications</label>
                                        <textarea name="certifications" rows={4} className="form-control"
                                            placeholder="Mention your Certifications" maxLength={1000}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 06. Internship Details */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">06. Internship Details (If Applicable)</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <label>Have you completed any internship?</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="internship_completed" value="Yes" />
                                            <label>Yes</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="internship_completed" value="No" />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Organization Name</label>
                                        <input type="text" name="internship_organization" className="form-control"
                                            placeholder="Enter Organization Name" maxLength={120} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Internship Duration</label>
                                        <input type="text" name="internship_duration" className="form-control"
                                            placeholder="e.g. 3 Months" maxLength={40} />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Role / Designation</label>
                                        <input type="text" name="internship_role" className="form-control"
                                            placeholder="Enter Role / Designation" maxLength={120} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 07. Projects & Achievements */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">07. Projects & Achievements</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Major Academic Project</label>
                                        <textarea name="academic_project" rows={4} className="form-control"
                                            placeholder="Describe your Major Academic Project" maxLength={2000}></textarea>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Awards / Achievements</label>
                                        <textarea name="achievements" rows={4} className="form-control"
                                            placeholder="Mention your Awards / Achievements" maxLength={2000}></textarea>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Research Publications / Patents (if any)</label>
                                        <textarea name="research_publications" rows={4} className="form-control"
                                            placeholder="Enter Research Publications / Patents" maxLength={2000}></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* 08. Document Upload */}

                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">08. Document Upload Section</h4>
                            </div>

                            <div className="comfrm_grid gridbox_three">
                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Resume / CV (PDF)</label>
                                        <input type="file" name="resume" className="form-control" accept=".pdf" required />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Passport Size Photograph</label>
                                        <input type="file" name="photograph" className="form-control" accept="image/*" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Aadhaar Card</label>
                                        <input type="file" name="aadhaar" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Class X Marksheet</label>
                                        <input type="file" name="class_x_marksheet" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Class XII Marksheet</label>
                                        <input type="file" name="class_xii_marksheet" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Latest Semester Marksheet</label>
                                        <input type="file" name="semester_marksheet" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Internship Certificates (if applicable)</label>
                                        <input type="file" name="internship_certificates[]" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" multiple />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Skill Certifications</label>
                                        <input type="file" name="skill_certifications[]" className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png" multiple />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group place_fil_upload">
                                        <label>Research Publications (Optional)</label>
                                        <input type="file" name="research_documents[]" className="form-control"
                                            accept=".pdf" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* 09. Placement Readiness Assessment */}
                        <div className="place_regist_bx">
                            <div className="com_ftitle">
                                <h4 className="font24">09. Placement Readiness Assessment</h4>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <label>Have you prepared a professional resume?</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="resume_prepared" value="Yes" />
                                            <label>Yes</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="resume_prepared" value="No" />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Have you attended placement training sessions?</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="placement_training" value="Yes" />
                                            <label>Yes</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="placement_training" value="No" />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Have you participated in mock interviews?</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="mock_interviews" value="Yes" />
                                            <label>Yes</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="mock_interviews" value="No" />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Are you willing to relocate?</label>
                                    <div className="frm_checkbx_group">
                                        <div className="frm_chcbx">
                                            <input type="radio" name="relocate" value="Yes" />
                                            <label>Yes</label>
                                        </div>
                                        <div className="frm_chcbx">
                                            <input type="radio" name="relocate" value="No" />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <label>Expected Annual Package (CTC)</label>
                                    <select name="expected_ctc" className="form-control">
                                        <option value="">Select Expected Annual Package (CTC)</option>
                                        <option value="Below 3 LPA">Below ₹3 LPA</option>
                                        <option value="3-5 LPA">₹3–5 LPA</option>
                                        <option value="5-8 LPA">₹5–8 LPA</option>
                                        <option value="8-12 LPA">₹8–12 LPA</option>
                                        <option value="Above 12 LPA">Above ₹12 LPA</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 10. Declaration */}
                         <div className="place_regist_bx">
                        <div className="declation_sec">
                            <div className="com_ftitle">
                                <h4 className="font24">10. Declaration</h4>
                                <p>
                                    I hereby declare that all information provided by me is true
                                    and correct to the best of my knowledge. I understand that
                                    any incorrect information may result in cancellation of my
                                    registration from placement and internship activities
                                    conducted by Jaipur National University.
                                </p>
                            </div>

                            <div className="comfrm_grid">
                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Student Signature</label>
                                        <input type="text" name="student_signature" className="form-control"
                                            placeholder="Enter Student Name as Signature" minLength={2}
                                            maxLength={100} required />
                                    </div>
                                </div>

                                <div className="comfrm_col">
                                    <div className="form_group">
                                        <label>Date</label>
                                        <input type="date" name="declaration_date" className="form-control"
                                            max={new Date().toISOString().slice(0, 10)} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 11. Consent */}
                        <div className="consent_fm">
                            <div className="com_ftitle">
                                <h4 className="font24">11. Consent</h4>
                            </div>

                            <div className="frm_checkbx_group">
                                <div className="frm_chcbx">
                                    <input type="checkbox" name="notification_consent" value="Yes" required />
                                    <label>
                                        I agree to receive placement and internship notifications
                                        through Email, SMS, WhatsApp and the JNU Student Portal.
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Submit */}
                        <div className="com_ftitle">
                            <h4 className="font24">JNU Career Portal – Placement & Internship Registration 2026–27</h4>
                            <p>
                                Register once to access campus placements, internships, career
                                guidance, industry projects, and recruitment drives organized
                                by the Training & Placement Cell, Jaipur National University.
                            </p>
                        </div>

                        <div className="comfrm_col">
                            <button type="submit" className="btn" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Registration"}
                            </button>
                            {isSubmitted && (
                                <p role="status" aria-live="polite" className="message">
                                    Your placement registration has been submitted successfully.
                                </p>
                            )}
                        </div>
        </div>
        </div>
        </form>
    )
}