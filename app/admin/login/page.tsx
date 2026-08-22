import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/admin/inventory");

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect(`/admin/login?error=1&from=${encodeURIComponent(from)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, process.env.ADMIN_SESSION_TOKEN as string, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(from);
}

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string; from?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const from = params.from || "/admin/inventory";

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-industrial text-2xl text-slate-900">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage inventory listings.
        </p>

        {params.error ? (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Incorrect password.
          </p>
        ) : null}

        <form action={login} className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400"
            />
          </label>
          <button type="submit" className="btn-primary w-full justify-center">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
