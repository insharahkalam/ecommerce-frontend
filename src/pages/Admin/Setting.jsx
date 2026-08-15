import React, { useState, useEffect } from "react";
import { Check, Shield, Bell, User, Lock, Mail, BadgeCheck } from "lucide-react";
import { SETTINGS_API_URL, AUTH_BASE_URL } from '../../data/mockData'
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
      className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-sm text-white tracking-wide outline-none transition placeholder:text-neutral-500 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
    />
  );
}

function ToggleRow({ label, desc, value, onChange, disabled, dirty, saving, saved, onSave }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
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

      {dirty && (
        <div className="mt-3 flex items-center justify-end">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:from-orange-400 hover:to-orange-500 disabled:opacity-60"
          >
            {saved ? (
              <>
                <Check className="h-3.5 w-3.5" /> Saved
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              "Save"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Setting() {
  // ---- Profile state (editable, own save button) ----
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savedProfile, setSavedProfile] = useState({ fullName: "", email: "" });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // ---- Password section state ----
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // ---- Notification toggles state ----
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyStock, setNotifyStock] = useState(true);
  const [notifySignups, setNotifySignups] = useState(true);

  const [savedValues, setSavedValues] = useState({
    notifyOrders: true,
    notifyStock: true,
    notifySignups: true,
  });

  const [savingField, setSavingField] = useState(null);
  const [savedField, setSavedField] = useState(null);

  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const res = await api.get(`${AUTH_BASE_URL}/getMe`);
        if (cancelled) return;
        const user = res.data?.user;
        const values = { fullName: user?.username || "", email: user?.email || "" };
        setFullName(values.fullName);
        setEmail(values.email);
        setSavedProfile(values);
      } catch (err) {
        console.log(err, "check profile err");
        if (!cancelled) setProfileError("Could not load your profile.");
      } finally {
        if (!cancelled) setLoadingProfile(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const res = await api.get(SETTINGS_API_URL);
        if (cancelled) return;
        const settings = res.data.settings;
        const values = {
          notifyOrders: Boolean(settings?.notifyOrders),
          notifyStock: Boolean(settings?.notifyStock),
          notifySignups: Boolean(settings?.notifySignups),
        };
        setNotifyOrders(values.notifyOrders);
        setNotifyStock(values.notifyStock);
        setNotifySignups(values.notifySignups);
        setSavedValues(values);
      } catch (err) {
        console.log(err, "check err");
        if (!cancelled) setLoadError("Could not load notification settings.");
      } finally {
        if (!cancelled) setLoadingSettings(false);
      }
    }

    loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentValues = { notifyOrders, notifyStock, notifySignups };

  const profileDirty = fullName !== savedProfile.fullName || email !== savedProfile.email;

  async function saveProfile() {
    setProfileError("");
    setProfileSuccess("");

    if (!fullName.trim() || !email.trim()) {
      return setProfileError("Name and email can't be empty.");
    }

    setSavingProfile(true);
    try {
      const res = await api.patch(`${AUTH_BASE_URL}/updateProfile`, {
        username: fullName,
        email,
      });
      console.log(res, "update profile res");

      const user = res.data?.user;
      const values = { fullName: user?.username || fullName, email: user?.email || email };
      setFullName(values.fullName);
      setEmail(values.email);
      setSavedProfile(values);
      setProfileSuccess(res.data?.message || "Profile updated successfully!");
    } catch (err) {
      setProfileError(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveField(key) {
    setSaveError("");
    setSavingField(key);
    setSavedField(null);

    try {
      const res = await api.patch(SETTINGS_API_URL, { [key]: currentValues[key] });
      const settings = res.data.settings;

      setSavedValues((prev) => ({ ...prev, [key]: Boolean(settings?.[key]) }));
      setSavedField(key);
      setTimeout(() => setSavedField((f) => (f === key ? null : f)), 1500);
    } catch (err) {
      console.log(err, "check save err");
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSavingField(null);
    }
  }

  async function savePassword() {
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setPasswordError("Please fill in all password fields.");
    }
    if (newPassword.length < 6) {
      return setPasswordError("New password must be at least 6 characters.");
    }
    if (newPassword !== confirmPassword) {
      return setPasswordError("New password and confirmation don't match.");
    }

    setSavingPassword(true);
    try {
      const res = await api.patch(`${AUTH_BASE_URL}/update-password`, {
        currentPassword,
        newPassword,
      });

      setPasswordSuccess(res.data?.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to update password. Please try again."
      );
    } finally {
      setSavingPassword(false);
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

            {profileError && (
              <p className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {profileError}
              </p>
            )}
            {profileSuccess && (
              <p className="mb-4 rounded-lg border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-sm text-orange-400">
                {profileSuccess}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel icon={User}>Full name</FieldLabel>
                <TextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loadingProfile}
                  placeholder={loadingProfile ? "Loading..." : ""}
                />
              </div>
              <div>
                <FieldLabel icon={Mail}>Email</FieldLabel>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingProfile}
                  placeholder={loadingProfile ? "Loading..." : ""}
                />
              </div>
            </div>

            {profileDirty && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-orange-400 hover:to-orange-500 disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save profile"}
                </button>
              </div>
            )}

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
                    placeholder="At least 6 characters"
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
              {passwordSuccess && (
                <p className="rounded-lg border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-sm text-orange-400">
                  {passwordSuccess}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={savePassword}
                  disabled={savingPassword}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-orange-400 hover:to-orange-500 disabled:opacity-60"
                >
                  {savingPassword ? "Updating..." : "Update password"}
                </button>
              </div>
            </div>
          </GlowCard>

          <GlowCard>
            <SectionHeader icon={Bell} title="Notifications" desc="Choose what we alert you about. Each toggle saves on its own." />

            {loadError && (
              <p className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {loadError}
              </p>
            )}
            {saveError && (
              <p className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {saveError}
              </p>
            )}

            <div className="space-y-3">
              <ToggleRow
                label="New orders"
                desc="Get notified on every new order."
                value={notifyOrders}
                onChange={setNotifyOrders}
                disabled={loadingSettings}
                dirty={notifyOrders !== savedValues.notifyOrders}
                saving={savingField === "notifyOrders"}
                saved={savedField === "notifyOrders"}
                onSave={() => saveField("notifyOrders")}
              />
              <ToggleRow
                label="Low stock"
                desc="Alert when a product runs low."
                value={notifyStock}
                onChange={setNotifyStock}
                disabled={loadingSettings}
                dirty={notifyStock !== savedValues.notifyStock}
                saving={savingField === "notifyStock"}
                saved={savedField === "notifyStock"}
                onSave={() => saveField("notifyStock")}
              />
              <ToggleRow
                label="New signups"
                desc="Notify me when a customer registers."
                value={notifySignups}
                onChange={setNotifySignups}
                disabled={loadingSettings}
                dirty={notifySignups !== savedValues.notifySignups}
                saving={savingField === "notifySignups"}
                saved={savedField === "notifySignups"}
                onSave={() => saveField("notifySignups")}
              />
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Turning a toggle off won't stop that notification from being recorded (your unread
              count still goes up) — it just won't pop up as a toast.
            </p>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}