"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useMemo, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import {
    submitRecruiterRegistration,
    type RecruiterFormState,
} from "@/actions/SubmitRecruiterRegistration";

const initialState: RecruiterFormState = {
    success: false,
    message: "",
    errors: {},
    values: {},
};

type Errors = RecruiterFormState["errors"];
type Values = NonNullable<RecruiterFormState["values"]>;

// Unticked checkboxes are missing from FormData, so these get an explicit "0" on submit (ticked = "1")
const CHECKBOX_FIELDS = ["declaration_accepted", "terms_accepted"];

/* Errors (from the API) and previously submitted values are shared with every field via context */
const FormCtx = createContext<{ errors: Errors; values: Values }>({ errors: {}, values: {} });

/** Shows the first API error for a field. Also matches keys like "eligible_programs.0". */
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
    options: string[];
}) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <label htmlFor={name}>{label}</label>
                <select id={name} name={name} className="form-control" defaultValue={values[name] ?? ""}>
                    <option value="">{placeholder}</option>
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
                <FieldError name={name} />
            </div>
        </div>
    );
}

function CheckGroup({ label, name, options }: { label: string; name: string; options: string[] }) {
    const { values } = useContext(FormCtx);
    const selected = (values[name] ?? "").split("|");
    return (
        <div className="comfrm_col">
            <label>{label}</label>
            <div className="frm_checkbx_group">
                {options.map((opt, i) => {
                    const id = `${name}_${i}`;
                    return (
                        <div className="frm_chcbx" key={opt}>
                            <input
                                type="checkbox"
                                id={id}
                                name={`${name}[]`}
                                value={opt}
                                defaultChecked={selected.includes(opt)}
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

/** Single yes/no checkbox: ticked sends 1, unticked sends 0 (added in submitForm) */
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

function FileField({
    label,
    name,
    accept,
}: {
    label: string;
    name: string;
    accept: string;
}) {
    return (
        <div className="comfrm_col">
            <div className="form_group place_fil_upload">
                <label htmlFor={name}>{label}</label>
                <input type="file" id={name} name={name} className="form-control" accept={accept} />
                <FieldError name={name} />
            </div>
        </div>
    );
}

export default function RecruiterRegistrationForm() {
    const [state, formAction, isPending] = useActionState(submitRecruiterRegistration, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const ctx = useMemo(
        () => ({ errors: state.errors ?? {}, values: state.values ?? {} }),
        [state],
    );

    // After each response: on success clear the form and show the message, otherwise scroll to the first error
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

    // Called from the button's click (not a "submit" event) so nothing else on the page can trigger a native submit
    function submitForm() {
        if (!formRef.current || isPending) return;
        const formData = new FormData(formRef.current);

        for (const name of CHECKBOX_FIELDS) {
            if (!formData.has(name)) formData.set(name, "0");
        }

        startTransition(() => formAction(formData));
    }

    return (
        <FormCtx.Provider value={ctx}>
            <section className="common_formsec common_fm_bg">
                <form ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="container">
                        <h2 className="font42">Recruiter Registration</h2>
                        <div className="plament_regist_main">
                            <div className="place_regist_bx">
                                {/* Company Information */}
                                <div className="com_ftitle">
                                    <h4 className="font24">Company Information</h4>
                                </div>
                                <div className="comfrm_grid">
                                    <TextField label="Company/Organization Name*" name="company_name"
                                        placeholder="Enter Company/Organization Name" maxLength={150} />
                                    <TextField label="Industry/Sector*" name="industry"
                                        placeholder="Enter Industry/Sector" maxLength={120} />
                                    <TextField label="Company Website*" name="company_website" type="url"
                                        placeholder="Enter Company Website" maxLength={254} />
                                    <TextField label="Company Address*" name="company_address"
                                        placeholder="Enter Company Address" maxLength={500} />
                                </div>

                                {/* Contact Person Details */}
                                <div className="com_ftitle">
                                    <h4 className="font24">Contact Person Details</h4>
                                </div>
                                <div className="comfrm_grid">
                                    <TextField label="Name*" name="contact_name" placeholder="Enter Name"
                                        autoComplete="name" maxLength={100} />
                                    <TextField label="Designation*" name="designation"
                                        placeholder="Enter Designation" maxLength={100} />
                                    <TextField label="Official Email ID*" name="official_email" type="email"
                                        placeholder="Enter Official Email ID" autoComplete="email" maxLength={254} />
                                    <TextField label="Mobile Number*" name="mobile_number" type="tel"
                                        placeholder="Enter Mobile Number" autoComplete="tel" />
                                </div>

                                {/* Hiring Requirement */}
                                <div className="com_ftitle">
                                    <h4 className="font24">Hiring Requirement</h4>
                                </div>
                                <div className="comfrm_grid">
                                    <SelectField label="Opportunity Type" name="opportunity_type"
                                        placeholder="Select opportunity type"
                                        options={["Full-Time Job", "Internship", "Internship with PPO", "Management Trainee", "Other"]} />
                                    <TextField label="Job Title/Role*" name="job_title"
                                        placeholder="Job Title/Role" maxLength={150} />
                                    <TextAreaField label="Job Description (JD)*" name="job_description" rows={3}
                                        placeholder="Enter Job Description (JD)" maxLength={3000} />
                                    <TextField label="Number of Vacancies*" name="number_of_vacancies" type="number"
                                        placeholder="Enter Number of Vacancies" min={1} step={1} />
                                    <TextField label="Job Location*" name="job_location"
                                        placeholder="Enter Job Location" maxLength={150} />
                                    <TextField label="CTC / Stipend Offered*" name="ctc_stipend"
                                        placeholder="Enter CTC / Stipend Offered" maxLength={100} />
                                    <CheckGroup label="Eligible Program(s)*" name="eligible_programs"
                                        options={["MBA", "BBA", "B.Tech", "MCA", "BCA", "Pharmacy", "Law", "Sciences", "Other"]} />
                                </div>

                                {/* Recruitment Process */}
                                <div className="com_ftitle">
                                    <h4 className="font24">Recruitment Process</h4>
                                </div>
                                <div className="comfrm_grid">
                                    <CheckGroup label="Recruitment Process*" name="recruitment_process"
                                        options={["Resume Screening", "Aptitude Test", "Technical Test", "Group Discussion", "Interview"]} />
                                    <CheckGroup label="Preferred Mode*" name="preferred_mode"
                                        options={["On-Campus", "Virtual", "Hybrid"]} />
                                </div>

                                {/* Document Upload */}
                                <div className="com_ftitle">
                                    <h4 className="font24">Document Upload</h4>
                                </div>
                                <div className="comfrm_grid gridbox_three">
                                    <FileField label="Company Profile/Brochure" name="company_profile" accept=".pdf" />
                                    <FileField label="Job Description (JD)" name="job_description_file"
                                        accept=".pdf,.jpg,.jpeg,.png" />
                                    <FileField label="Company Logo" name="company_logo" accept=".pdf,.jpg,.jpeg,.png" />
                                </div>

                                {/* Declaration */}
                                <div className="declation_sec">
                                    <div className="com_ftitle">
                                        <h4 className="font24">Declaration</h4>
                                        <p>I hereby confirm that the information provided above is true and accurate.</p>
                                    </div>
                                    <div className="comfrm_grid">
                                        <TextField label="Authorized Representative Name*"
                                            name="authorized_representative_name"
                                            placeholder="Enter Authorized Representative Name" maxLength={100} />
                                        <TextField label="Date*" name="declaration_date" type="date" />
                                    </div>
                                    <div className="comfrm_col">
                                        <CheckField name="declaration_accepted">
                                            I confirm that the above information is true and accurate.*
                                        </CheckField>
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="consent_fm">
                                    <CheckField name="terms_accepted">
                                        I agree to the terms and conditions of Jaipur National University Placement Cell.*
                                    </CheckField>
                                </div>

                                {/* Submit */}
                                <div className="com_ftitle">
                                    <div className="comfrm_grid1">
                                        <div className="comfrm_col">
                                            <button type="button" className="btn" disabled={isPending} onClick={submitForm}>
                                                {isPending ? "Submitting..." : "Submit Registration"}
                                            </button>

                                            <div id="form_status">
                                                    {state.success && (
                                                        <div className="success_msg">
                                                            <p role="status" aria-live="polite" className="message">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </FormCtx.Provider>
    );
}