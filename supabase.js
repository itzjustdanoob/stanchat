const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ucmmoppfdeefqvmgashx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbW1vcHBmZGVlZnF2bWdhc2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjEzNzcsImV4cCI6MjA5NTA5NzM3N30.KtUSfM4wV8am31sKG33LUdDrmjYVRkQa3pFPczjlHMA'
);

module.exports = supabase;