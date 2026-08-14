// import React, { useState, useEffect } from "react";
// import { Check, Shield, Bell, User, Lock, Mail, BadgeCheck } from "lucide-react";

// function GlowCard({ children, className = "" }) {
//   return (
//     <div
//       className={
//         "relative rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10 " +
//         className
//       }
//     >
//       <div className="relative overflow-hidden rounded-2xl bg-neutral-950/90 backdrop-blur-xl p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

// function SectionHeader({ icon: Icon, title, desc }) {
//   return (
//     <div className="mb-5 flex items-start gap-3">
//       <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
//         <Icon className="h-5 w-5" />
//       </div>
//       <div>
//         <h2 className="font-serif text-base font-semibold text-white">{title}</h2>
//         {desc && <p className="mt-0.5 text-sm text-neutral-400">{desc}</p>}
//       </div>
//     </div>
//   );
// }

// function FieldLabel({ children, icon: Icon }) {
//   return (
//     <label className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-neutral-400 uppercase">
//       {Icon && <Icon className="h-3.5 w-3.5 text-orange-500/70" />}
//       {children}
//     </label>
//   );
// }

// function TextField(props) {
//   return (
//     <input
//       {...props}
//       className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-white tracking-wide outline-none transition placeholder:text-neutral-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20"
//     />
//   );
// }

// function ToggleRow({ label, desc, value, onChange }) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
//       <div>
//         <p className="text-sm font-medium text-white">{label}</p>
//         {desc && <p className="mt-0.5 text-xs text-neutral-400">{desc}</p>}
//       </div>
//       <button
//         type="button"
//         onClick={() => onChange(!value)}
//         className={
//           "relative h-6 w-11 shrink-0 rounded-full transition-colors " +
//           (value ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-neutral-700")
//         }
//       >
//         <span
//           className={
//             "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " +
//             (value ? "left-[22px]" : "left-0.5")
//           }
//         />
//       </button>
//     </div>
//   );
// }

// export default function Setting() {
//   const [fullName, setFullName] = useState("Asad");
//   const [email, setEmail] = useState("asad@gmail.com");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [notifyOrders, setNotifyOrders] = useState(true);
//   const [notifyStock, setNotifyStock] = useState(true);
//   const [notifySignups, setNotifySignups] = useState(false);
//   const [saved, setSaved] = useState(false);

//   function save() {
//     if (newPassword || confirmPassword || currentPassword) {
//       if (newPassword.length > 0 && newPassword.length < 8)
//         return setPasswordError("New password must be at least 8 characters.");
//       if (newPassword !== confirmPassword)
//         return setPasswordError("New password and confirmation don't match.");
//     }
//     setPasswordError("");
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   }

//   return (
//     <div className="relative min-h-screen text-white font-sans antialiased">
//       <div
//         className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
//           backgroundSize: "28px 28px",
//         }}
//       />

//       <div className="relative z-10 mx-auto max-w-6xl">
//         <div className="mb-8">
//           <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
//             <BadgeCheck className="h-3.5 w-3.5" /> Admin console
//           </span>
//           <h1 className="mt-3 font-serif italic text-3xl font-bold tracking-tight text-white">
//             Settings
//           </h1>
//           <p className="mt-1 text-sm text-neutral-400">
//             Manage your admin account, security, and alert preferences.
//           </p>
//         </div>

//         <div className="space-y-6">
//           <GlowCard>
//             <SectionHeader icon={User} title="Profile" desc="Your admin identity across the dashboard." />
//             <div className="grid gap-5 sm:grid-cols-2">
//               <div>
//                 <FieldLabel icon={User}>Full name</FieldLabel>
//                 <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} />
//               </div>
//               <div>
//                 <FieldLabel icon={Mail}>Email</FieldLabel>
//                 <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//             </div>

//             <div className="mt-6 border-t border-neutral-800 pt-6">
//               <FieldLabel icon={Shield}>Role</FieldLabel>
//               <div className="flex items-center justify-between rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
//                 <span className="text-sm font-semibold text-orange-500">Admin</span>
//                 <BadgeCheck className="h-4 w-4 text-orange-500" />
//               </div>
//               <p className="mt-2 text-xs text-neutral-400">
//                 Full access to products, orders, and customers. Your access level is fixed.
//               </p>
//             </div>
//           </GlowCard>

//           <GlowCard>
//             <SectionHeader icon={Lock} title="Security" desc="Update your password regularly." />
//             <div className="space-y-5">
//               <div className="sm:max-w-sm">
//                 <FieldLabel icon={Lock}>Current password</FieldLabel>
//                 <TextField
//                   type="password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   placeholder="••••••••"
//                 />
//               </div>
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <div>
//                   <FieldLabel>New password</FieldLabel>
//                   <TextField
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="At least 8 characters"
//                   />
//                 </div>
//                 <div>
//                   <FieldLabel>Confirm password</FieldLabel>
//                   <TextField
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Repeat new password"
//                   />
//                 </div>
//               </div>
//               {passwordError && (
//                 <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
//                   {passwordError}
//                 </p>
//               )}
//             </div>
//           </GlowCard>

//           <GlowCard>
//             <SectionHeader icon={Bell} title="Notifications" desc="Choose what we alert you about." />
//             <div className="space-y-3">
//               <ToggleRow label="New orders" desc="Get notified on every new order." value={notifyOrders} onChange={setNotifyOrders} />
//               <ToggleRow label="Low stock" desc="Alert when a product runs low." value={notifyStock} onChange={setNotifyStock} />
//               <ToggleRow label="New signups" desc="Notify me when a customer registers." value={notifySignups} onChange={setNotifySignups} />
//             </div>

//             <div className="mt-6 border-t border-neutral-800 pt-6">
//               <p className="text-xs text-neutral-400">Changes apply immediately after saving.</p>
//               <button
//                 type="button"
//                 onClick={save}
//                 className="font-display mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white tracking-tight shadow-lg shadow-orange-500/20 transition-all hover:from-orange-400 hover:to-orange-500 active:scale-[0.99]"
//               >
//                 {saved ? (
//                   <>
//                     <Check className="h-4 w-4" /> Saved
//                   </>
//                 ) : (
//                   "Save changes"
//                 )}
//               </button>
//               {saved && (
//                 <p className="mt-3 text-xs text-orange-500">Your changes have been saved.</p>
//               )}
//             </div>
//           </GlowCard>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Check, Shield, Bell, User, Lock, Mail, BadgeCheck } from "lucide-react";
import { SETTINGS_API_URL } from '../../data/mockData'
import api from "../../config/axios";

function GlowCard({ children, className = "" }) {
  return (
    <div
      className={
        "relative rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10 " +
        className
      }
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-950/90 backdrop-blur-xl p-6">
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, desc }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="font-serif text-base font-semibold text-white">{title}</h2>
        {desc && <p className="mt-0.5 text-sm text-neutral-400">{desc}</p>}
      </div>
    </div>
  );
}

function FieldLabel({ children, icon: Icon }) {
  return (
    <label className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-neutral-400 uppercase">
      {Icon && <Icon className="h-3.5 w-3.5 text-orange-500/70" />}
      {children}
    </label>
  );
}

function TextField(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-white tracking-wide outline-none transition placeholder:text-neutral-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20"
    />
  );
}

function ToggleRow({ label, desc, value, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {desc && <p className="mt-0.5 text-xs text-neutral-400">{desc}</p>}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!value)}
        className={
          "relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-40 " +
          (value ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-neutral-700")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " +
            (value ? "left-[22px]" : "left-0.5")
          }
        />
      </button>
    </div>
  );
}

export default function Setting() {
  const [fullName, setFullName] = useState("Asad");
  const [email, setEmail] = useState("asad@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyStock, setNotifyStock] = useState(true);
  const [notifySignups, setNotifySignups] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Fetch current settings from backend on mount, so refresh reflects real DB state
  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const res = await api.get(SETTINGS_API_URL);
        console.log(res, "setting res check");

        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        if (cancelled) return;
        setNotifyOrders(Boolean(data.settings.notifyOrders));
        setNotifyStock(Boolean(data.settings.notifyStock));
        setNotifySignups(Boolean(data.settings.notifySignups));
      } catch (err) {
        if (!cancelled) setLoadError("Could not load notification settings.");
        console.log(err, "check err");

      } finally {
        if (!cancelled) setLoadingSettings(false);
      }
    }

    loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    if (newPassword || confirmPassword || currentPassword) {
      if (newPassword.length > 0 && newPassword.length < 8)
        return setPasswordError("New password must be at least 8 characters.");
      if (newPassword !== confirmPassword)
        return setPasswordError("New password and confirmation don't match.");
    }
    setPasswordError("");
    setSaving(true);

    try {
      const res = await api.patch(SETTINGS_API_URL, {
        body: JSON.stringify({ notifyOrders, notifyStock, notifySignups }),
      });
      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();
      // Sync state with what the server actually saved
      setNotifyOrders(Boolean(data.settings?.notifyOrders));
      setNotifyStock(Boolean(data.settings?.notifyStock));
      setNotifySignups(Boolean(data.settings?.notifySignups));

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setPasswordError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative min-h-screen text-white font-sans antialiased">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
            <BadgeCheck className="h-3.5 w-3.5" /> Admin console
          </span>
          <h1 className="mt-3 font-serif italic text-3xl font-bold tracking-tight text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Manage your admin account, security, and alert preferences.
          </p>
        </div>

        <div className="space-y-6">
          <GlowCard>
            <SectionHeader icon={User} title="Profile" desc="Your admin identity across the dashboard." />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel icon={User}>Full name</FieldLabel>
                <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <FieldLabel icon={Mail}>Email</FieldLabel>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-800 pt-6">
              <FieldLabel icon={Shield}>Role</FieldLabel>
              <div className="flex items-center justify-between rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
                <span className="text-sm font-semibold text-orange-500">Admin</span>
                <BadgeCheck className="h-4 w-4 text-orange-500" />
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                Full access to products, orders, and customers. Your access level is fixed.
              </p>
            </div>
          </GlowCard>

          <GlowCard>
            <SectionHeader icon={Lock} title="Security" desc="Update your password regularly." />
            <div className="space-y-5">
              <div className="sm:max-w-sm">
                <FieldLabel icon={Lock}>Current password</FieldLabel>
                <TextField
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel>New password</FieldLabel>
                  <TextField
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <FieldLabel>Confirm password</FieldLabel>
                  <TextField
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                  />
                </div>
              </div>
              {passwordError && (
                <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {passwordError}
                </p>
              )}
            </div>
          </GlowCard>

          <GlowCard>
            <SectionHeader icon={Bell} title="Notifications" desc="Choose what we alert you about." />

            {loadError && (
              <p className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {loadError}
              </p>
            )}

            <div className="space-y-3">
              <ToggleRow
                label="New orders"
                desc="Get notified on every new order."
                value={notifyOrders}
                onChange={setNotifyOrders}
                disabled={loadingSettings}
              />
              <ToggleRow
                label="Low stock"
                desc="Alert when a product runs low."
                value={notifyStock}
                onChange={setNotifyStock}
                disabled={loadingSettings}
              />
              <ToggleRow
                label="New signups"
                desc="Notify me when a customer registers."
                value={notifySignups}
                onChange={setNotifySignups}
                disabled={loadingSettings}
              />
            </div>

            <div className="mt-6 border-t border-neutral-800 pt-6">
              <p className="text-xs text-neutral-400">Changes apply immediately after saving.</p>
              <button
                type="button"
                onClick={save}
                disabled={saving || loadingSettings}
                className="font-display mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white tracking-tight shadow-lg shadow-orange-500/20 transition-all hover:from-orange-400 hover:to-orange-500 active:scale-[0.99] disabled:opacity-60"
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4" /> Saved
                  </>
                ) : saving ? (
                  "Saving..."
                ) : (
                  "Save changes"
                )}
              </button>
              {saved && (
                <p className="mt-3 text-xs text-orange-500">Your changes have been saved.</p>
              )}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
} 