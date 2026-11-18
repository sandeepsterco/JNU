"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useMemo, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import {
    submitCareerApplication,
    type CareerFormState,
} from "@/actions/SubmitCareerApplication";

const initialState: CareerFormState = {
    success: false,
    message: "",
    errors: {},
    values: {},
};

type Errors = CareerFormState["errors"];
type Values = NonNullable<CareerFormState["values"]>;

/* Errors (from the API) and previously submitted values are shared with every field via context */
const FormCtx = createContext<{ errors: Errors; values: Values }>({ errors: {}, values: {} });

function FieldError({ name }: { name: string }) {
    const { errors } = useContext(FormCtx);
    const key = Object.keys(errors).find(
        (k) => k === name || k.startsWith(`${name}.`) || k.startsWith(`${name}[`),
    );
    const raw = key ? errors[key] : undefined;
    const message = Array.isArray(raw) ? raw[0] : raw;
    return message ? <span className="field_error">{message}</span> : null;
}

function Label({ htmlFor, children, req }: { htmlFor?: string; children: React.ReactNode; req?: boolean }) {
    return (
        <label htmlFor={htmlFor}>
            {children}
            {req && <sup>*</sup>}
        </label>
    );
}

type InputExtras = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "id" | "defaultValue">;

function TextField({
    label,
    name,
    type = "text",
    placeholder,
    req,
    ...rest
}: { label: string; name: string; type?: string; placeholder?: string; req?: boolean } & InputExtras) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <Label htmlFor={name} req={req}>{label}</Label>
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
    req,
    rows = 3,
}: {
    label: string;
    name: string;
    placeholder?: string;
    req?: boolean;
    rows?: number;
}) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <Label htmlFor={name} req={req}>{label}</Label>
                <textarea
                    id={name}
                    name={name}
                    rows={rows}
                    className="form-control"
                    placeholder={placeholder}
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
    req,
    bare,
}: {
    label: string;
    name: string;
    placeholder: string;
    options: (string | [string, string])[]; // value, or [value, label]
    req?: boolean;
    bare?: boolean; // render without the comfrm_col wrapper (used for the full-width job position row)
}) {
    const { values } = useContext(FormCtx);
    const group = (
        <div className="form_group">
            <Label htmlFor={name} req={req}>{label}</Label>
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
    return bare ? group : <div className="comfrm_col">{group}</div>;
}

function ExperienceField() {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
            <div className="form_group">
                <Label htmlFor="experience_year">Experience</Label>
                <div className="age_ingrup">
                    <input
                        type="number"
                        id="experience_year"
                        name="experience_year"
                        className="form-control"
                        placeholder="Year"
                        min={0}
                        defaultValue={values.experience_year ?? ""}
                    />
                    <input
                        type="number"
                        id="experience_month"
                        name="experience_month"
                        className="form-control"
                        placeholder="Month"
                        min={0}
                        max={11}
                        defaultValue={values.experience_month ?? ""}
                    />
                </div>
                <FieldError name="experience_year" />
                <FieldError name="experience_month" />
            </div>
        </div>
    );
}

const JOB_POSITIONS = [
    "CA / Accountant",
    "IQAC Coordinator",
    "IT Engineer & IT Executive",
    "IT Manager",
    "IT Technician",
    "Network Administrator / System Administrator / IT Technician",
    "Professor, Associate Professor & Assistant Professor",
    "Admin Officer",
    "Admission Counsellor",
    "Assistant Professor in LAW, Computer Science, Media, Education, English, Physiotherapy",
    "Assistant Professor/Lecturers of Paramedical Sciences/ Nursing and Nutrition",
    "Career Opportunity In UAE",
    "Controller of Examination",
    "Deputy Director/ Assistant Director",
    "Director School of Management",
    "Director Schools of Journalism & Mass Communication",
    "Director School of Engineering",
    "Director Schools of LAW & Governance",
    "Director/Professors Schools of Management",
    "Exam Cell Executive",
    "Exam Cell- Assistant Registrar",
    "Front Office Executive (F)",
    "Hostel Warden (Male & Female)",
    "HR",
    "LAB Assistants",
    "Librarian",
    "Manager",
    "Medical Transcripter",
    "NCC Officer",
    "Network Administrator",
    "Office Assistant",
    "Personal Assistant",
    "Professor & Associate Professor Schools of Engineering & School of Computer Science",
    "Professor, Associate Professor, Assistant Professor",
    "Professor/ Associate Professor/Assistant Professor/Senior Resident/Super specialist/Nurses & Nuclear Medicine Technologist",
    "Professors/ Associate Professor in LAW, Computer Science, Media, Education, English, Physiotherapy",
    "Sports Officer (Female)",
    "Technical and Supporting Staff Recruitment (non teaching)",
    "Technicians Diploma Programs in Para Medical Sciences",
    "Training & Placement Officer",
    "Tutor B.Sc. in Para Medical Science",
];

const STATES: [string, string][] = [
    ["33", "Andaman and Nicobar Islands"],
    ["20", "Andhra Pradesh"],
    ["27", "Arunachal Pradesh"],
    ["28", "Assam"],
    ["17", "Bihar"],
    ["34", "Chandigarh"],
    ["13", "Chhattisgarh"],
    ["35", "Dadra and Nagar Haveli"],
    ["36", "Daman and Diu"],
    ["9", "Delhi"],
    ["21", "Goa"],
    ["7", "Gujarat"],
    ["8", "Haryana"],
    ["14", "Himachal Pradesh"],
    ["10", "Jammu & Kashmir"],
    ["18", "Jharkhand"],
    ["29", "Kerala"],
    ["37", "Lakshadweep"],
    ["2", "Madhya Pradesh"],
    ["11", "Maharashtra"],
    ["24", "Mizoram"],
    ["25", "Nagaland"],
    ["16", "Odisha"],
    ["39", "Puducherry"],
    ["3", "Punjab"],
    ["1", "Rajasthan"],
    ["31", "Sikkim"],
    ["15", "Tamil Nadu"],
    ["32", "Tripura"],
    ["4", "Uttar Pradesh"],
    ["12", "Uttarakhand"],
    ["6", "West Bengal"],
];

export default function ApplyNowForm() {
    const [state, formAction, isPending] = useActionState(submitCareerApplication, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const ctx = useMemo(
        () => ({ errors: state.errors ?? {}, values: state.values ?? {} }),
        [state],
    );

    // After each response: on success clear the form and show the message, otherwise scroll to the first error
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset(); // values are {} on success, so this clears everything (including the file)
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
        startTransition(() => formAction(formData));
    }

    return (
        <FormCtx.Provider value={ctx}>
            <section className="common_formsec common_fm_bg">
                <form ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="container">
                        <div className="conf_topsec">
                            {/* Personal Information */}
                            <div className="com_ftitle">
                                <h4 className="font24">Personal Information</h4>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <SelectField bare req label="Select Job Position" name="job_position"
                                        placeholder="--Select Job Position--" options={JOB_POSITIONS} />
                                </div>
                            </div>

                            <div className="comfrm_grid">
                                <TextField label="First Name" name="first_name" placeholder="First Name" req
                                    autoComplete="given-name" maxLength={100} />
                                <TextField label="Last Name" name="last_name" placeholder="Last Name"
                                    autoComplete="family-name" maxLength={100} />
                                <TextField label="Mobile" name="mobile" type="tel" placeholder="Mobile" req
                                    inputMode="numeric" maxLength={10} autoComplete="tel" />
                                <TextField label="E-Mail ID" name="email" type="email" placeholder="E-Mail ID" req
                                    autoComplete="email" maxLength={254} />
                                <TextField label="Date of Birth" name="date_of_birth" type="date" req />
                                <TextField label="Father's/ Husband's Name" name="father_or_husband_name"
                                    placeholder="Father's/ Husband's Name" req maxLength={100} />
                                <TextAreaField label="Residential Address" name="residential_address"
                                    placeholder="Address" req />
                                <SelectField req label="Gender" name="gender" placeholder="Select Gender"
                                    options={["Male", "Female", "Other"]} />
                                <SelectField req label="Marital Status" name="marital_status"
                                    placeholder="Select Marital Status" options={["Married", "Unmarried"]} />
                                <SelectField req label="Select State" name="state" placeholder="Select State"
                                    options={STATES} />
                                <TextField label="City" name="city" placeholder="City" req maxLength={100} />
                            </div>

                            {/* Work Experience */}
                            <div className="com_ftitle">
                                <h4 className="font24">Work Experience</h4>
                            </div>

                            <div className="comfrm_grid">
                                <ExperienceField />
                                <TextField label="Qualifications" name="qualifications" placeholder="Qualifications"
                                    req maxLength={255} />
                                <TextField label="Skills" name="skills" placeholder="Skills" maxLength={255} />
                                <TextField label="Name of Organization" name="organization_name"
                                    placeholder="Name of Organization" maxLength={150} />
                                <TextField label="Salary" name="salary" placeholder="Salary" maxLength={50} />
                                <TextField label="Current Industry" name="current_industry"
                                    placeholder="Current Industry" maxLength={150} />
                                <TextField label="Functional Area" name="functional_area"
                                    placeholder="Functional Area" maxLength={150} />
                                <TextField label="Preferred Location" name="preferred_location"
                                    placeholder="Preferred Location" maxLength={150} />
                                <TextField label="Area of Interest" name="area_of_interest"
                                    placeholder="Area of Interest" maxLength={150} />
                                <TextAreaField label="Message" name="message" placeholder="Message" req />

                                <div className="comfrm_col">
                                    <div className="form_group fil_upload">
                                        <Label htmlFor="resume" req>Upload Your Resume</Label>
                                        <input type="file" id="resume" name="resume" className="form-control"
                                            accept=".pdf,.doc,.docx" />
                                        <small>Please upload PDF, DOC or DOCX format only.</small>
                                        <FieldError name="resume" />
                                    </div>
                                </div>
                            </div>

                            <button type="button" disabled={isPending} onClick={submitForm}>
                                {isPending ? "Submitting..." : "Submit"}
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
                </form>
            </section>
        </FormCtx.Provider>
    );
}