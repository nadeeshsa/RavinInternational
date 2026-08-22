import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isAdminSession } from "@/lib/admin-auth";

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isAdminSession();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {loggedIn ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-4 py-3 text-sm">
          <p className="font-semibold text-slate-700">Admin Panel — Inventory Management</p>
          <div className="flex items-center gap-3">
            <Link href="/inventory" className="text-slate-600 underline-offset-2 hover:underline">
              View Public Site
            </Link>
            <form action={logout}>
              <button type="submit" className="btn-secondary">
                Log Out
              </button>
            </form>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
