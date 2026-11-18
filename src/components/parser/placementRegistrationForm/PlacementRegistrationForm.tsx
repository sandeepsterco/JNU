"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useMemo, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import {
    submitPlacementRegistration,
    type PlacementFormState,
} from "@/actions/submitPlacementRegistration";

const initialState: PlacementFormState = {
    success: false,
    message: "",
    errors: {},
    values: {},
};

type Errors = PlacementFormState["errors"];
type Values = NonNullable<PlacementFormState["values"]>;

/* Errors (from the API) and previously submitted values are shared with every field via context */
const FormCtx = createContext<{ errors: Errors; values: Values }>({ errors: {}, values: {} });

/** Shows the first API error for a field. Also matches keys like "internship_certificates.0". */
function FieldError({ name }: { name: string }) {
    const { errors } = useContext(FormCtx);
    const key = Object.keys(errors).find(
        (k) => k === name || k.startsWith(`${name}.`) || k.startsWith(`${name}[`),
    );
    const raw = key ? errors[key] : undefined;
    const message = Array.isArray(raw) ? raw[0] : raw;
    return message ? <span className="field_error">{message}</span> : null;
}

type InputExtras = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "id" | "defaultValue">;

function TextField({
    label,
    name,
    type = "text",
    placeholder,
    ...rest
}: { label: string; name: string; type?: string; placeholder?: string } & InputExtras) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    defaultValue={values[name] ?? ""}
                    {...rest}
                />
                <FieldError name={name} />
            </div>
        </div>
    );
}

function TextAreaField({
    label,
    name,
    placeholder,
    rows = 3,
    maxLength,
}: {
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
}) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <label htmlFor={name}>{label}</label>
                <textarea
                    id={name}
                    name={name}
                    rows={rows}
                    className="form-control"
                    placeholder={placeholder}
                    maxLength={maxLength}
                    defaultValue={values[name] ?? ""}
                ></textarea>
                <FieldError name={name} />
            </div>
        </div>
    );
}

function SelectField({
    label,
    name,
    placeholder,
    options,
}: {
    label: string;
    name: string;
    placeholder: string;
    options: (string | [string, string])[]; // value, or [value, label]
}) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} className="form-control" defaultValue={values[name] ?? ""}>
                <option value="">{placeholder}</option>
                {options.map((o) => {
                    const [value, text] = Array.isArray(o) ? o : [o, o];
                    return (
                        <option key={value} value={value}>
                            {text}
                        </option>
                    );
                })}
            </select>
            <FieldError name={name} />
        </div>
    );
}

function RadioField({ label, name, options }: { label: string; name: string; options: string[] }) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <label>{label}</label>
            <div className="frm_checkbx_group">
                {options.map((opt, i) => {
                    const id = `${name}_${i}`;
                    return (
                        <div className="frm_chcbx" key={opt}>
                            <input
                                type="radio"
                                id={id}
                                name={name}
                                value={opt}
                                defaultChecked={values[name] === opt}
                            />
                            <label htmlFor={id}>{opt}</label>
                        </div>
                    );
                })}
            </div>
            <FieldError name={name} />
        </div>
    );
}

function CheckField({ name, children }: { name: string; children: React.ReactNode }) {
    const { values } = useContext(FormCtx);
    return (
        <>
            <div className="frm_checkbx_group">
                <div className="frm_chcbx">
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        value="1"
                        defaultChecked={values[name] === "1"}
                    />
                    <label htmlFor={name}>{children}</label>
                </div>
            </div>
            <FieldError name={name} />
        </>
    );
}

/** `name` is the real input name (may end in []), `errorName` is the key the API uses for errors */
function FileField({
    label,
    name,
    errorName,
    accept,
    multiple,
}: {
    label: string;
    name: string;
    errorName: string;
    accept: string;
    multiple?: boolean;
}) {
    return (
        <div className="comfrm_col">
            <div className="form_group place_fil_upload">
                <label htmlFor={errorName}>{label}</label>
                <input
                    type="file"
                    id={errorName}
                    name={name}
                    className="form-control"
                    accept={accept}
                    multiple={multiple}
                />
                <FieldError name={errorName} />
            </div>
        </div>
    );
}

const DOC_ACCEPT = ".pdf,.jpg,.jpeg,.png";

export default function PlacementRegistrationForm() {
    const [state, formAction, isPending] = useActionState(submitPlacementRegistration, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const ctx = useMemo(
        () => ({ errors: state.errors ?? {}, values: state.values ?? {} }),
        [state],
    );

    // After each response: on success show the message, otherwise scroll to the first API error
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset(); // values are {} on success, so this clears everything
            document.getElementById("form_status")?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }
        if (state.message || Object.keys(state.errors ?? {}).length > 0) {
            formRef.current
                ?.querySelector<HTMLElement>(".field_error")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [state]);

    const CHECKBOX_FIELDS = ["declaration_accepted", "notification_consent"];

    // Called from the button's click, not from a "submit" event, so nothing else on the page
    // (global scripts, form.submit() calls) can bypass it or trigger a native submit.
    function submitForm() {
    if (!formRef.current || isPending) return;
    const formData = new FormData(formRef.current);

    // Unticked checkboxes are missing from FormData, so send an explicit 0
    for (const name of CHECKBOX_FIELDS) {
        if (!formData.has(name)) formData.set(name, "0");
    }

    startTransition(() => formAction(formData));
}

    return (
        <FormCtx.Provider value={ctx}>
            <form ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="plament_regist_main">
                    {/* 01. Personal Information */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">01. Personal Information</h4>
                        </div>
                        <div className="comfrm_grid">
                            <TextField label="Student Name*" name="student_name" placeholder="Enter Student Name"
                                autoComplete="name" maxLength={100} />
                            <TextField label="Enrollment Number*" name="enrollment_number"
                                placeholder="Enter Enrollment Number" maxLength={30} />
                            <TextField label="University Email ID*" name="university_email" type="email"
                                placeholder="Enter University Email ID" autoComplete="email" maxLength={254} />
                            <TextField label="Personal Email ID*" name="personal_email" type="email"
                                placeholder="Enter Personal Email ID" autoComplete="email" maxLength={254} />
                            <TextField label="Mobile Number*" name="mobile_number" type="tel"
                                placeholder="Enter Mobile Number" autoComplete="tel" />
                            <TextField label="Date of Birth*" name="date_of_birth" type="date" />
                            <RadioField label="Gender*" name="gender" options={["Male", "Female", "Other"]} />
                            <TextAreaField label="Permanent Address*" name="permanent_address" rows={3}
                                placeholder="Enter Permanent Address" maxLength={500} />
                            <TextAreaField label="Current Address*" name="current_address" rows={3}
                                placeholder="Enter Current Address" maxLength={500} />
                            <TextField label="LinkedIn Profile URL" name="linkedin" type="url"
                                placeholder="Enter LinkedIn Profile URL" />
                            <TextField label="Portfolio / GitHub / Website" name="portfolio" type="url"
                                placeholder="Enter Portfolio / GitHub / Website URL" />
                        </div>
                    </div>

                    {/* 02. Academic Information */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">02. Academic Information</h4>
                        </div>
                        <div className="comfrm_grid">
                            <TextField label="School / Faculty*" name="school_faculty"
                                placeholder="Enter School / Faculty" maxLength={120} />
                            <TextField label="Department*" name="department" placeholder="Enter Department"
                                maxLength={120} />
                            <RadioField label="Programme*" name="programme" options={["Diploma", "UG", "PG", "Ph.D."]} />
                            <TextField label="Program Name*" name="program_name" placeholder="Enter Program Name"
                                maxLength={120} />
                            <TextField label="Specialization" name="specialization"
                                placeholder="Enter Specialization" maxLength={120} />
                            <TextField label="Current Semester*" name="current_semester"
                                placeholder="Enter Current Semester" maxLength={30} />
                            <TextField label="Year of Passing*" name="year_of_passing" type="number"
                                placeholder="Enter Passing Year" min={1950} step={1} />
                        </div>
                    </div>

                    {/* 02.1 Academic Performance */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">02.1 Academic Performance</h4>
                        </div>
                        <div className="comfrm_grid">
                            <TextField label="Class X - Board / University*" name="class_x_board"
                                placeholder="Enter Board Name" maxLength={120} />
                            <TextField label="Class X - Year*" name="class_x_year" type="number"
                                placeholder="Passing Year" min={1950} step={1} />
                            <TextField label="Class X - Percentage / CGPA*" name="class_x_percentage_cgpa"
                                type="number" placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                            <TextField label="Class XII - Board / University*" name="class_xii_board"
                                placeholder="Enter Board Name" maxLength={120} />
                            <TextField label="Class XII - Year*" name="class_xii_year" type="number"
                                placeholder="Passing Year" min={1950} step={1} />
                            <TextField label="Class XII - Percentage / CGPA*" name="class_xii_percentage_cgpa"
                                type="number" placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                            <TextField label="Diploma - Board / University (if applicable)" name="diploma_board"
                                placeholder="Enter Board / University" maxLength={120} />
                            <TextField label="Diploma - Year" name="diploma_year" type="number"
                                placeholder="Passing Year" min={1950} step={1} />
                            <TextField label="Diploma - Percentage / CGPA" name="diploma_score" type="number"
                                placeholder="Enter Percentage / CGPA" min={0} max={100} step={0.01} />
                            <TextField label="Current UG / PG CGPA*" name="current_cgpa" type="number"
                                placeholder="Enter Current CGPA" min={0} max={10} step={0.01} />
                            <TextField label="Number of Active Backlogs*" name="active_backlogs" type="number"
                                placeholder="Enter Number of Backlogs" min={0} step={1} />
                            <TextField label="Gap Year(s), if any" name="gap_years" type="number"
                                placeholder="Enter Gap Year(s)" min={0} step={1} />
                        </div>
                    </div>

                    {/* 03. Placement Preference */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">03. Placement Preference</h4>
                        </div>
                        <div className="comfrm_grid">
                            <SelectField label="Seeking Opportunities For*" name="seeking_opportunities_for"
                                placeholder="Select opportunity type"
                                options={["Campus Placement", "Internship", ["Both", "Both Placement & Internship"]]} />
                            <SelectField label="Preferred Job Location*" name="preferred_job_location"
                                placeholder="Select preferred location"
                                options={["Jaipur", "Rajasthan", "PAN India", "International", ["Remote", "Work from Home / Remote"]]} />
                            <SelectField label="Preferred Employment Type*" name="preferred_employment_type"
                                placeholder="Select employment type"
                                options={["Full-Time", "Internship", "Internship with PPO", "Management Trainee", "Research Associate"]} />
                        </div>
                    </div>

                    {/* 04. Career Interests */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">04. Career Interests</h4>
                        </div>
                        <div className="comfrm_grid">
                            <SelectField label="Preferred Industry Sector*" name="preferred_industry_sector"
                                placeholder="Select industry sector"
                                options={[
                                    "IT & Software",
                                    "Data Science & Analytics",
                                    "Artificial Intelligence",
                                    "Banking & Financial Services",
                                    "Marketing & Sales",
                                    "Human Resources",
                                    "Operations & Supply Chain",
                                    "Healthcare & Hospital Management",
                                    "Pharmaceutical Industry",
                                    "Manufacturing",
                                    "Education & Research",
                                    "Media & Communication",
                                    "Legal Services",
                                    "Government Sector",
                                    "Start-ups",
                                    "Other",
                                ]} />
                            <TextField label="Other Industry Sector" name="other_industry"
                                placeholder="Specify Other Industry" maxLength={120} />
                            <TextAreaField label="Preferred Functional Area*" name="preferred_functional_area" rows={3}
                                placeholder="Enter Preferred Functional Area" maxLength={1000} />
                        </div>
                    </div>

                    {/* 05. Skills & Certifications */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">05. Skills & Certifications</h4>
                        </div>
                        <div className="comfrm_grid">
                            <TextAreaField label="Technical Skills" name="technical_skills" rows={4}
                                placeholder="Mention your Technical Skills" maxLength={1000} />
                            <SelectField label="Software Proficiency" name="software" placeholder="Select Software"
                                options={["MS Excel", "Power BI", "Tableau", "Python", "R Programming", "SPSS", "Tally", "AutoCAD", "MATLAB", "Other"]} />
                            <TextField label="Other Software Proficiency" name="other_software"
                                placeholder="Specify Other Software" maxLength={120} />
                            <TextAreaField label="Certifications" name="certifications" rows={4}
                                placeholder="Mention your Certifications" maxLength={1000} />
                        </div>
                    </div>

                    {/* 06. Internship Details */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">06. Internship Details (If Applicable)</h4>
                        </div>
                        <div className="comfrm_grid">
                            <RadioField label="Have you completed any internship?*" name="has_completed_internship"
                                options={["Yes", "No"]} />
                            <TextField label="Organization Name" name="internship_organization"
                                placeholder="Enter Organization Name" maxLength={120} />
                            <TextField label="Internship Duration" name="internship_duration"
                                placeholder="e.g. 3 Months" maxLength={40} />
                            <TextField label="Role / Designation" name="internship_role"
                                placeholder="Enter Role / Designation" maxLength={120} />
                        </div>
                    </div>

                    {/* 07. Projects & Achievements */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">07. Projects & Achievements</h4>
                        </div>
                        <div className="comfrm_grid">
                            <TextAreaField label="Major Academic Project" name="academic_project" rows={4}
                                placeholder="Describe your Major Academic Project" maxLength={2000} />
                            <TextAreaField label="Awards / Achievements" name="achievements" rows={4}
                                placeholder="Mention your Awards / Achievements" maxLength={2000} />
                            <TextAreaField label="Research Publications / Patents (if any)" name="research_publications"
                                rows={4} placeholder="Enter Research Publications / Patents" maxLength={2000} />
                        </div>
                    </div>

                    {/* 08. Document Upload */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">08. Document Upload Section</h4>
                        </div>
                        <div className="comfrm_grid gridbox_three">
                            <FileField label="Resume / CV (PDF)" name="resume" errorName="resume" accept=".pdf" />
                            <FileField label="Passport Size Photograph" name="photograph" errorName="photograph"
                                accept="image/*" />
                            <FileField label="Aadhaar Card" name="aadhaar" errorName="aadhaar" accept={DOC_ACCEPT} />
                            <FileField label="Class X Marksheet" name="class_x_marksheet"
                                errorName="class_x_marksheet" accept={DOC_ACCEPT} />
                            <FileField label="Class XII Marksheet" name="class_xii_marksheet"
                                errorName="class_xii_marksheet" accept={DOC_ACCEPT} />
                            <FileField label="Latest Semester Marksheet" name="semester_marksheet"
                                errorName="semester_marksheet" accept={DOC_ACCEPT} />
                            <FileField label="Internship Certificates (if applicable)" name="internship_certificates[]"
                                errorName="internship_certificates" accept={DOC_ACCEPT} multiple />
                            <FileField label="Skill Certifications" name="skill_certifications[]"
                                errorName="skill_certifications" accept={DOC_ACCEPT} multiple />
                            <FileField label="Research Publications (Optional)" name="research_documents[]"
                                errorName="research_documents" accept=".pdf" multiple />
                        </div>
                    </div>

                    {/* 09. Placement Readiness Assessment */}
                    <div className="place_regist_bx">
                        <div className="com_ftitle">
                            <h4 className="font24">09. Placement Readiness Assessment</h4>
                        </div>
                        <div className="comfrm_grid">
                            <RadioField label="Have you prepared a professional resume?*"
                                name="has_prepared_professional_resume" options={["Yes", "No"]} />
                            <RadioField label="Have you attended placement training sessions?*"
                                name="attended_placement_training" options={["Yes", "No"]} />
                            <RadioField label="Have you participated in mock interviews?*"
                                name="participated_mock_interviews" options={["Yes", "No"]} />
                            <RadioField label="Are you willing to relocate?*" name="willing_to_relocate"
                                options={["Yes", "No"]} />
                            <SelectField label="Expected Annual Package (CTC)*" name="expected_annual_package"
                                placeholder="Select Expected Annual Package (CTC)"
                                options={[
                                    ["Below ₹3 LPA", "Below ₹3 LPA"],
                                    ["₹3–5 LPA", "₹3–5 LPA"],
                                    ["₹5–8 LPA", "₹5–8 LPA"],
                                    ["₹8–12 LPA", "₹8–12 LPA"],
                                    ["Above ₹12 LPA", "Above ₹12 LPA"],
                                ]} />
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
                                <TextField label="Student Signature*" name="student_signature"
                                    placeholder="Enter Student Name as Signature" maxLength={100} />
                                <TextField label="Date*" name="declaration_date" type="date" />
                            </div>
                        </div>

                        <div className="comfrm_col">
                            <CheckField name="declaration_accepted">I accept the declaration above.</CheckField>
                        </div>
                    </div>

                    {/* 11. Consent */}
                    <div className="consent_fm">
                        <div className="com_ftitle">
                            <h4 className="font24">11. Consent</h4>
                        </div>
                        <CheckField name="notification_consent">
                            I agree to receive placement and internship notifications
                            through Email, SMS, WhatsApp and the JNU Student Portal.
                        </CheckField>
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
                        <button type="button" className="btn" disabled={isPending} onClick={submitForm}>
                            {isPending ? "Submitting..." : "Submit Registration"}
                        </button>

                        <div id="form_status">
                            {state.success && (
                                <div className="success_msg">
                                    <p role="status" aria-live="polite" className="message success">
                                        {state.message}
                                    </p>
                                </div>
                            )}
                            {!state.success && state.message && (
                                <p role="alert" aria-live="assertive" className="field_error">
                                    {state.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </FormCtx.Provider>
    );
}