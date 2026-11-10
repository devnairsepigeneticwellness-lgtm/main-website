#!/usr/bin/env node

/**
 * Script to create or list Supabase Admin users.
 * Usage:
 *   node scripts/create-admin-user.mjs [email] [password]
 *
 * Example:
 *   node scripts/create-admin-user.mjs admin@nairsepigeneticwellness.com MySecurePassword123!
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.local manually if not loaded
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];
  const password = args[1];

  if (!email || !password) {
    console.log("ℹ️  Existing Supabase Auth Users:");
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      console.error("❌ Failed to list users:", error.message);
    } else if (data.users.length === 0) {
      console.log("   (No users found in Supabase Auth)");
    } else {
      data.users.forEach((u) => {
        console.log(`   - ${u.email} (ID: ${u.id}, Verified: ${u.email_confirmed_at ? "Yes" : "No"})`);
      });
    }

    console.log("\n📖 To create a new admin user, run:");
    console.log("   node scripts/create-admin-user.mjs <email> <password>");
    return;
  }

  console.log(`⏳ Creating confirmed admin user for: ${email}...`);

  // Check if user already exists
  const { data: listData } = await supabase.auth.admin.listUsers();
  const existingUser = listData?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    console.log(`⚠️  User ${email} already exists. Updating password and confirming email...`);
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      {
        password: password,
        email_confirm: true,
        user_metadata: { role: "admin" },
      }
    );

    if (updateError) {
      console.error("❌ Failed to update user:", updateError.message);
      process.exit(1);
    }

    console.log("✅ Admin user credentials updated successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   User ID: ${updateData.user.id}`);
    return;
  }

  // Create new user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "admin" },
  });

  if (error) {
    console.error("❌ Failed to create admin user:", error.message);
    process.exit(1);
  }

  console.log("🎉 Admin user created successfully!");
  console.log(`   Email: ${data.user.email}`);
  console.log(`   User ID: ${data.user.id}`);
  console.log("   Status: Email confirmed and ready to log in immediately.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

