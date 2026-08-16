import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AccessDenied() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 sm:p-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center">
                    <ShieldAlert size={28} className="text-red-400" />
                </div>

                <div>
                    <h1 className="font-display italic text-2xl font-semibold text-text">
                        Access denied
                    </h1>
                    <p className="mt-2 text-sm font-serif text-text-muted leading-relaxed">
                        You don't have permission to view this page. It's reserved for
                        admin accounts only.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-serif text-text-muted hover:bg-hover hover:text-text transition-colors"
                    >
                        <ArrowLeft size={14} /> Go back
                    </button>

                </div>
            </div>
        </div>
    );
}