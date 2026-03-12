// ══════════════════════════════════════
// Supabase Client — Raymind.AI
// ══════════════════════════════════════

// TODO: Replace with your actual Supabase project credentials
const SUPABASE_URL = "https://buggxqiqbvxospujibji.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2d4cWlxYnZ4b3NwdWppYmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY2NTYsImV4cCI6MjA4ODg5MjY1Nn0.5mT8PO9S45lh8MKy-My1cZ53N0sqhqA0i0uRt_mD3Ko";

let supabase = null;

function initSupabase() {
  if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }
  console.warn("Supabase client not loaded");
  return false;
}

// ──────────────────────────────────────
// Waitlist — Subscribe email
// ──────────────────────────────────────
async function subscribeEmail(email) {
  if (!supabase) throw new Error("Supabase not initialized");

  const { data, error } = await supabase.from("waitlist").insert([
    {
      email: email,
      subscribed_at: new Date().toISOString(),
      source: "homepage",
    },
  ]);

  if (error) {
    // Duplicate email
    if (error.code === "23505") {
      throw new Error("This email is already subscribed.");
    }
    throw new Error("Something went wrong. Please try again.");
  }

  return data;
}

// ──────────────────────────────────────
// Contact — Send inquiry
// ──────────────────────────────────────
async function submitInquiry({ name, email, type, message }) {
  if (!supabase) throw new Error("Supabase not initialized");

  const { data, error } = await supabase.from("inquiries").insert([
    {
      name,
      email,
      inquiry_type: type,
      message,
      submitted_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error("Something went wrong. Please try again.");
  }

  return data;
}
