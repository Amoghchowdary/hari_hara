/**
 * Public Apps Script deployment endpoint for Harihara enquiries.
 * This URL is public by design. Never store credentials in frontend source.
 * Backend must implement the V4 POST-message receipt contract in apps-script/Code.gs.
 */
export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw9NZ_nPQQSdSCTD26LpQlZhD88gtp15VvR2cy4FelX13vjFwpQRsw3usF2bmONHbTO9A/exec";

export const GITHUB_REPOSITORY = "https://github.com/Amoghchowdary/hari_hara";
export const GITHUB_PAGES_URL = "https://amoghchowdary.github.io/hari_hara/";

export type EnquiryData = {
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

export type EnquiryReceipt = {
  ok: true;
  requestId: string;
  reference: string;
};

const RESPONSE_TYPE = "harihara:enquiry-result";
const REQUEST_TIMEOUT_MS = 30000;

/** Google Apps Script's HTML response is sandboxed on a Google domain. */
function isAppsScriptOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return url.protocol === "https:" &&
      (url.hostname === "script.google.com" ||
       url.hostname === "script.googleusercontent.com" ||
       url.hostname.endsWith(".script.googleusercontent.com") ||
       url.hostname.endsWith("-script.googleusercontent.com"));
  } catch {
    return false;
  }
}

/**
 * POST an enquiry using a hidden HTML form. This avoids JSON POST preflight and
 * CORS-readable-response limitations on Google Apps Script.
 *
 * The matching Code.gs must respond with window.top.postMessage to the exact
 * caller origin. An old or incompatible Apps Script deployment will TIME OUT,
 * not falsely report success. The request MAY have been delivered in that case.
 */
export function submitEnquiryToAppsScript(
  data: EnquiryData,
  honeypot = "",
): Promise<EnquiryReceipt> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("Enquiry submission requires a browser."));
  }

  const requestId = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    const form = document.createElement("form");
    const frameName = `harihara_enquiry_${requestId.replace(/[^a-zA-Z0-9]/g, "")}`;
    let finished = false;

    frame.name = frameName;
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    frame.style.display = "none";

    form.method = "POST";
    form.action = APPS_SCRIPT_URL;
    form.target = frameName;
    form.enctype = "application/x-www-form-urlencoded";
    form.acceptCharset = "UTF-8";
    form.style.display = "none";

    const fields: Record<string, string> = {
      action: "submit_enquiry",
      request_id: requestId,
      source: "harihara-website-v4",
      origin: window.location.origin,
      website: honeypot,
      ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value ?? ""])),
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const cleanup = () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      form.remove();
      frame.remove();
    };
    const settle = (error?: Error, receipt?: EnquiryReceipt) => {
      if (finished) return;
      finished = true;
      cleanup();
      if (error) reject(error);
      else if (receipt) resolve(receipt);
    };
    const onMessage = (event: MessageEvent) => {
      if (!isAppsScriptOrigin(event.origin)) return;
      const payload = event.data;
      if (!payload || typeof payload !== "object" || payload.type !== RESPONSE_TYPE ||
          payload.requestId !== requestId) return;
      if (payload.ok === true && typeof payload.reference === "string") {
        settle(undefined, { ok: true, requestId, reference: payload.reference });
      } else {
        settle(new Error(typeof payload.message === "string" ? payload.message : "Backend rejected enquiry."));
      }
    };

    window.addEventListener("message", onMessage);
    document.body.appendChild(frame);
    document.body.appendChild(form);
    timer = setTimeout(() => {
      settle(new Error(
        "No confirmation was received from Apps Script. Your enquiry may have arrived; please contact us instead of repeatedly submitting."
      ));
    }, REQUEST_TIMEOUT_MS);

    try {
      form.submit();
    } catch {
      settle(new Error("Could not open the Apps Script connection."));
    }
  });
}
