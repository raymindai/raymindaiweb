import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://buggxqiqbvxospujibji.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Z2d4cWlxYnZ4b3NwdWppYmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY2NTYsImV4cCI6MjA4ODg5MjY1Nn0.5mT8PO9S45lh8MKy-My1cZ53N0sqhqA0i0uRt_mD3Ko";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function subscribeEmail(email: string) {
  const { error } = await supabase.from("waitlist").insert([
    {
      email,
      subscribed_at: new Date().toISOString(),
      source: "homepage",
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      throw new Error("This email is already subscribed.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}

interface InquiryData {
  name: string;
  email: string;
  type: string;
  message: string;
}

export async function submitInquiry(data: InquiryData) {
  const { error } = await supabase.from("inquiries").insert([
    {
      name: data.name,
      email: data.email,
      inquiry_type: data.type,
      message: data.message,
      submitted_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error("Something went wrong. Please try again.");
  }
}
