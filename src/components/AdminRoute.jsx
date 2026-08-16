import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../config/axios";
import { AUTH_BASE_URL } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import AccessDenied from "./AccessDenied";

export default function AdminRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const [status, setStatus] = useState("loading"); // loading | authorized | unauthorized | unauthenticated

    useEffect(() => {
        if (!isLoggedIn) {
            setStatus("unauthenticated");
            return;
        }

        let cancelled = false;
        setStatus("loading");

        (async () => {
            try {
                const res = await api.get(`${AUTH_BASE_URL}/getMe`);
                const freshUser = res?.data?.user;
                if (cancelled) return;
                setStatus(freshUser?.role === "admin" ? "authorized" : "unauthorized");
            } catch (err) {
                if (!cancelled) setStatus("unauthenticated");
            }
        })();

        return () => { cancelled = true; };
    }, [isLoggedIn]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-border border-t-orange-500 animate-spin" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return <Navigate to="/login" replace />;
    }

    if (status === "unauthorized") {
        return <AccessDenied />;
    }

    return children;
}