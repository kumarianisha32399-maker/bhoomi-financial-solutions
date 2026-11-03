import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Img, Logo, meta } from "@/components/site/ui";
import { auth } from "@/lib/store";
import { u } from "@/lib/data";

export const Route = createFileRoute("/admin/login")({
  head: () => meta("Admin Login", "Demo admin login for Bhoomi Business Solutions website management."),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.login(email, pw)) nav({ to: "/admin/dashboard" });
    else setErr("Invalid email or password.");
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Img src={u("1497366216548-37526070297c", 1400)} alt="Office" className="absolute inset-0 h-full w-full object-cover" />
        <div className="overlay-solid absolute inset-0" />
        <div className="relative flex h-full flex-col justify-end p-14"><Logo light /><p className="mt-4 max-w-sm text-primary-foreground/75">Website content management — demo panel.</p></div>
      </div>
      <div className="flex items-center justify-center bg-surface p-6">
        <form onSubmit={submit} className="w-full max-w-md bg-background p-10 shadow-xl">
          <div className="grid h-12 w-12 place-items-center bg-primary text-gold"><Lock className="h-5 w-5" /></div>
          <h1 className="mt-6 text-3xl">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Frontend demo authentication only — not production security.</p>
          <label className="mt-8 block text-xs font-bold uppercase tracking-wider text-primary">Email<input className="field mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-primary">Password<input className="field mt-1.5" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
          {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
          <button className="btn-navy mt-8 w-full justify-center">Sign In</button>
          <Link to="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-primary">← Back to website</Link>
        </form>
      </div>
    </div>
  );
}
