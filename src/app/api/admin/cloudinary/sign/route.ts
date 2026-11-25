import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  getCloudinaryConfig,
  signCloudinaryUpload,
} from "@/lib/cloudinary/server";

async function ensureAdminAuthenticated(): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    // Allow local preview mode when Supabase auth is not configured
    return true;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  } catch {
    return false;
  }
}

export async function GET() {
  const authorized = await ensureAdminAuthenticated();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = getCloudinaryConfig();
  return NextResponse.json({
    configured: Boolean(config),
    cloudName: config?.cloudName ?? null,
    rootFolder: config?.rootFolder ?? null,
  });
}

export async function POST(req: NextRequest) {
  const authorized = await ensureAdminAuthenticated();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = getCloudinaryConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }

  let subFolder = "events";
  try {
    const body = (await req.json()) as { folder?: string };
    if (typeof body?.folder === "string" && body.folder.trim()) {
      subFolder = body.folder.trim();
    }
  } catch {
    // Default subFolder when no JSON body is supplied
  }

  const signed = signCloudinaryUpload(config, subFolder);
  return NextResponse.json(signed);
}
