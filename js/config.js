/* ============================================================
   SYLREG & KIDS INVESTMENT LIMITED — config.js
   Backend settings used by the contact form (js/main.js).
   ============================================================ */
window.SYLREG_CONFIG = {
  // Formspree: emails every contact-form message to the company inbox.
  FORMSPREE_URL: 'https://formspree.io/f/xdeabkor',

  // Supabase: also saves every message in the database (table: contact_messages).
  // Project: "sylreg & kids investment limited". The anon key is public by design:
  // row-level security only lets visitors INSERT messages, never read them.
  // Use the project URL and the *anon / publishable* key only. Never put a service_role key here.
  SUPABASE_URL: 'https://tjjzhngwnyedblkkzjoe.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqanpobmd3bnllZGJsa2t6am9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNzMyNDcsImV4cCI6MjEwNzc0OTI0N30.VqO5-vb4aAgLZ1xUyWYJWBxz7nD13PyQr3fRusgApmc'
};
