import assert from "node:assert/strict";
import { validateEnquiryForm } from "../src/lib/enquiry-validation.ts";

const valid = {
  full_name: "  Anil Kumar ", phone: "+91 9876543210", whatsapp: "",
  email: "anil@example.com", location: "  Hyderabad ",
  service_interest: "Farmhouse Construction", budget_range: "Not sure yet",
  preferred_contact_time: "Anytime", project_description: "  Building a farmhouse  ",
};
const expectValid = validateEnquiryForm(valid);
assert.deepEqual(expectValid.errors, {});
assert.equal(expectValid.values.full_name, "Anil Kumar");
assert.equal(expectValid.values.location, "Hyderabad");
assert.equal(expectValid.values.project_description, "Building a farmhouse");

const invalid = validateEnquiryForm({
  ...valid, full_name: "a", phone: "123", whatsapp: "nope",
  email: "wrong", location: "x".repeat(201), service_interest: "",
  project_description: "no",
});
assert.deepEqual(Object.keys(invalid.errors).sort(), [
  "email", "full_name", "location", "phone", "project_description",
  "service_interest", "whatsapp",
].sort());
assert.equal(validateEnquiryForm({ ...valid, email: "", whatsapp: "" }).errors.email, undefined);
assert.equal(validateEnquiryForm({ ...valid, full_name: "x".repeat(101) }).errors.full_name !== undefined, true);
assert.equal(validateEnquiryForm({ ...valid, project_description: "y".repeat(5001) }).errors.project_description !== undefined, true);
assert.equal(validateEnquiryForm({ ...valid, phone: "9876543210" }).errors.phone, undefined);
console.log("PASS: Enquiry validation preserves required fields, optional fields, lengths, phone checks and trimming.");
