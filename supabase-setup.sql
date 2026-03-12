-- Raymind.AI — Supabase Table Setup
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'homepage'
);

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON inquiries FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow authenticated reads" ON waitlist FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON inquiries FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_submitted ON inquiries(submitted_at DESC);
