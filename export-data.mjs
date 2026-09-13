import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Replace with your actual credentials
const SUPABASE_URL = 'https://xzrkjddiuybraefzhqfv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cmtqZGRpdXlicmFlZnpocWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMjgyMTksImV4cCI6MjEwNDgwNDIxOX0.mWTwGePmFDxnkeBLL72t9pGyC7i-FDBm8nfK-fs4LEU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function exportTableToFile(tableName, fileName) {
  console.log(`Fetching ${tableName}...`);
  
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    console.error(`Error fetching ${tableName}:`, error.message);
    return;
  }

  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  console.log(`Saved ${data.length} rows to ${fileName}`);
}

async function run() {
  await exportTableToFile('profiles', 'profiles.json');
  await exportTableToFile('find_jobs', 'find_jobs.json');
  await exportTableToFile('give_jobs', 'give_jobs.json');
  
  console.log('Done!');
}

run();