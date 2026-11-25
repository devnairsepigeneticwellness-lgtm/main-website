import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

async function ensureAdminAuthorized(): Promise<NextResponse | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required." },
      { status: 401 }
    );
  }

  return null;
}

/** Check whether Cloudinary upload credentials are available on the server. */
export async function GET() {
  const authError = await ensureAdminAuthorized();
  if (authError) return authError;

  return NextResponse.json({
    configured: isCloudinaryConfigured(),
  });
}

/** Upload one or more image files from the admin panel to Cloudinary. */
export async function POST(request: NextRequest) {
  const authError = await ensureAdminAuthorized();
  if (authError) return authError;

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local and restart the server.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const subfolderEntry = formData.get("folder");
    const subfolder =
      typeof subfolderEntry === "string" ? subfolderEntry : "events";

    const collectedFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if ((key === "file" || key === "files") && value instanceof File && value.size > 0) {
        collectedFiles.push(value);
      }
    }

    if (collectedFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please select at least one image file." },
        { status: 400 }
      );
    }

    const uploads = [];
    for (const file of collectedFiles) {
      const result = await uploadImageToCloudinary(file, { subfolder });
      uploads.push({
        ...result,
        originalName: file.name,
      });
    }

    return NextResponse.json({
      success: true,
      uploads,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to upload image.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
