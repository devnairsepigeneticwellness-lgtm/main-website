import React from "react";

export const instant = false;

export const metadata = {
  title: "Admin Console | Nair's Epigenetic Wellness",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
