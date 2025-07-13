import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqawvmzchgqpgyarqnmq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYXd2bXpjaGdxcGd5YXJxbm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0Mzc3MjcsImV4cCI6MjA2ODAxMzcyN30.toknLPayuvo5IjlB_WNBK8hXxy8iJ_7OU97vVz6prFo"
);
export default supabase;
