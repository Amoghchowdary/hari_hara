/**
 * Form validation independent of third-party schema engines.
 * All constraints and user-visible messages are preserved from V8.
 * This is client-side UX validation; Apps Script must continue validating server-side.
 */
export type EnquiryFormValues = {
  full_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  location?: string;
  service_interest: string;
  budget_range?: string;
  preferred_contact_time?: string;
  project_description: string;
};

const indianPhone = /^(\+?91[\s-]?)?[6-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiryForm(raw: EnquiryFormValues): {
  values: EnquiryFormValues;
  errors: Partial<Record<keyof EnquiryFormValues, string>>;
} {
  const values: EnquiryFormValues = {
    ...raw,
    full_name: (raw.full_name ?? "").trim(),
    phone: (raw.phone ?? "").trim(),
    whatsapp: (raw.whatsapp ?? "").trim(),
    email: (raw.email ?? "").trim(),
    location: (raw.location ?? "").trim(),
    service_interest: (raw.service_interest ?? "").trim(),
    project_description: (raw.project_description ?? "").trim(),
  };
  const errors: Partial<Record<keyof EnquiryFormValues, string>> = {};

  if (values.full_name.length < 2) errors.full_name = "Name is required";
  else if (values.full_name.length > 100) errors.full_name = "Name must be at most 100 characters";

  if (!indianPhone.test(values.phone)) errors.phone = "Enter a valid Indian mobile number";
  if (values.whatsapp && !indianPhone.test(values.whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number";
  }
  if (values.email && (!emailPattern.test(values.email) || values.email.length > 255)) {
    errors.email = "Invalid email";
  }
  if (values.location && values.location.length > 200) {
    errors.location = "Site location must be at most 200 characters";
  }
  if (!values.service_interest) errors.service_interest = "Please choose a service";
  if (values.project_description.length < 5) {
    errors.project_description = "Tell us a little about your project";
  } else if (values.project_description.length > 5000) {
    errors.project_description = "Project description must be at most 5000 characters";
  }

  return { values, errors };
}
