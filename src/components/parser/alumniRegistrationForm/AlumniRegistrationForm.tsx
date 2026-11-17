"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useMemo, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import {
    submitAlumniRegistration,
    type AlumniFormState,
} from "@/actions/SubmitAlumniRegistration";

const initialState: AlumniFormState = {
    success: false,
    message: "",
    errors: {},
    values: {},
};

type Errors = AlumniFormState["errors"];
type Values = NonNullable<AlumniFormState["values"]>;

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

function Label({ htmlFor, children, req }: { htmlFor: string; children: React.ReactNode; req?: boolean }) {
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

function SelectField({
    label,
    name,
    placeholder,
    options,
    req,
}: {
    label: string;
    name: string;
    placeholder: string;
    options: (string | [string, string])[]; // value, or [value, label]
    req?: boolean;
}) {
    const { values } = useContext(FormCtx);
    return (
        <div className="comfrm_col">
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
        </div>
    );
}

const YES_NO = ["Yes", "No"];

const PROGRAMME_TYPES: [string, string][] = [
    ["1", "Under Graduate"],
    ["2", "Post Graduate"],
    ["3", "Doctoral"],
    ["4", "Diploma"],
];

const PROGRAMMES: [string, string][] = [
    ["1", "BBA / BBA (Honours) / BBA (Honours with Research)"],
    ["17", "Masters of Arts in English"],
    ["3", "BCA"],
    ["4", "B.Com. / B.Com. (Honours) / B.Com. (Honours with Research)"],
    ["8", "MCA"],
    ["12", "Bachelor of Arts (Hons.) in English"],
    ["18", "Ph.D. English"],
    ["19", "B.A., LL.B."],
    ["20", "BBA.LL.B. (Hons.)"],
    ["21", "LLB"],
    ["22", "LLM"],
    ["25", "B.Sc. Nursing"],
    ["28", "B.Tech. Biotechnology"],
    ["45", "B.Tech. Computer Science Engineering"],
    ["68", "B. Pharm"],
    ["91", "MBA (Dual Specialization)"],
    ["93", "MBA (Hospital and Healthcare Management)"],
    ["128", "B.Sc. Hospitality and Hotel Administration"],
    ["129", "BHMCT (Hotel Management and Catering Technology)"],
    ["135", "B.Sc. (Hons.) Agriculture"],
    ["197", "MBBS"],
    ["211", "MD (Radio Diagnosis)"],
    ["212", "MD (Dermatology, Venereology & Leprosy)"],
    ["214", "MS (Obstetrics & Gynaecology)"],
    ["215", "MD (Paediatrics)"],
    ["216", "MS (Ophthalmology)"],
    ["217", "MS (General Surgery)"],
    ["218", "MS (Orthopaedics)"],
    ["219", "MD (Psychiatry)"],
    ["222", "MD (Anaesthesiology)"],
    ["3333", "Others"],
];

export default function AlumniRegistrationForm() {
    const [state, formAction, isPending] = useActionState(submitAlumniRegistration, initialState);
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
        startTransition(() => formAction(formData));
    }

    return (
        <FormCtx.Provider value={ctx}>
            <section className="common_formsec common_fm_bg">
                <form ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="container">
                        <div className="conf_topsec">
                            <div className="comfrm_grid">
                                <TextField label="ERP ID" name="erp_id" placeholder="ERP ID" req maxLength={50} />
                                <TextField label="Enrolment Number" name="enrolment_number"
                                    placeholder="Enrolment Number" req maxLength={50} />
                                <TextField label="Name in Full" name="name" placeholder="Name in Full" req
                                    autoComplete="name" maxLength={100} />
                                <TextField label="Father’s Name" name="father_name" placeholder="Father’s Name" req
                                    maxLength={100} />
                                <SelectField label="Gender" name="gender" placeholder="Select Gender" req
                                    options={["Male", "Female", "Other"]} />
                                <SelectField label="Select Programme Type" name="programme_type"
                                    placeholder="Select Type" req options={PROGRAMME_TYPES} />
                                <SelectField label="Name of the Programme" name="programme_name"
                                    placeholder="Select Course" req options={PROGRAMMES} />
                                <TextField label="If Other Programme" name="other_programme"
                                    placeholder="Other Programme" maxLength={150} />
                                <TextField label="Mobile Number" name="mobile_number" type="tel"
                                    placeholder="Mobile Number" req inputMode="numeric" maxLength={10}
                                    autoComplete="tel" />
                                <TextField label="WhatsApp Number" name="whatsapp_number" type="tel"
                                    placeholder="WhatsApp Number" req inputMode="numeric" maxLength={10} />
                                <TextField label="Email Address" name="email" type="email"
                                    placeholder="Email Address" req autoComplete="email" maxLength={254} />
                                <TextField label="Batch" name="batch" placeholder="Batch" req maxLength={30} />
                                <SelectField label="Alumni Meet (22 Feb 2025 Evening)" name="alumni_meet"
                                    placeholder="Select Option" req options={YES_NO} />
                                <SelectField label="Musical Evening with Gala Dinner"
                                    name="musical_evening_gala_dinner" placeholder="Select Option" req
                                    options={YES_NO} />
                            </div>

                            <button type="button" className="btn btn-primary" disabled={isPending} onClick={submitForm}>
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