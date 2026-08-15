// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Menu, Bell, ChevronDown, LogOut, Package, AlertTriangle, UserPlus } from "lucide-react";
// import toast from "react-hot-toast";
// import { pageTitles, AUTH_BASE_URL, NOTIFICATION_API_URL } from "../data/mockData";
// import api from "../config/axios";
// import pusherClient from "../config/pusher";

// const TYPE_ICON = {
//   order: Package,
//   low_stock: AlertTriangle,
//   new_customer: UserPlus,
// };

// export default function Topbar({ setMobileNavOpen, admin }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const title = pageTitles[location.pathname] || "";
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const [unreadCount, setUnreadCount] = useState(0);


//   useEffect(() => {
//     function handleNotificationsRead(e) {
//       setUnreadCount(e.detail?.count ?? 0);
//     }
//     window.addEventListener("notifications-read", handleNotificationsRead);
//     return () => window.removeEventListener("notifications-read", handleNotificationsRead);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;

//     async function fetchUnreadCount() {
//       try {
//         const res = await api.get(`${NOTIFICATION_API_URL}/unread-count`);
//         if (!cancelled) setUnreadCount(res.data?.unreadCount ?? 0);
//       } catch (err) {
//         console.log(err, "err in topbar notifications");
//       }
//     }

//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000); // poll every 30s (fallback)

//     return () => {
//       cancelled = true;
//       clearInterval(interval);
//     };
//   }, []);

//   // Real-time — naya notification aate hi count badhao + toast dikhao
//   useEffect(() => {
//     const channel = pusherClient.subscribe("admin-notifications");

//     channel.bind("new-notification", (newNotif) => {
//       setUnreadCount((prev) => prev + 1);

//       const Icon = TYPE_ICON[newNotif.type] || Package;
//       toast.custom(
//         (t) => (
//           <div
//             className={`flex items-start gap-3 rounded-xl border border-orange-500/30 bg-neutral-950 px-4 py-3 shadow-lg transition cursor-pointer ${t.visible ? "opacity-100" : "opacity-0"
//               }`}
//             onClick={() => {
//               toast.dismiss(t.id);
//               navigate("/notifications");
//             }}
//           >
//             <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
//             <div>
//               <p className="text-sm font-medium text-white">{newNotif.title}</p>
//               <p className="text-xs text-neutral-400">{newNotif.message}</p>
//             </div>
//           </div>
//         ),
//         { duration: 4000 }
//       );
//     });

//     return () => {
//       channel.unbind_all();
//       pusherClient.unsubscribe("admin-notifications");
//     };
//   }, [navigate]);

//   const displayName = admin?.username || "Admin";
//   const initials = displayName
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   async function handleLogout() {
//     try {
//       await api.get(`${AUTH_BASE_URL}/logout`);
//     } catch (err) {
//       // even if the request fails, clear the client-side state and redirect
//     } finally {
//       navigate("/login");
//     }
//   }

//   return (
//     <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
//       <div className="flex items-center gap-3 flex-1">
//         <button className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
//           <Menu size={22} color="#fff" />
//         </button>
//         <span className="hidden lg:block font-serif text-sm text-neutral-500">{title}</span>
//       </div>
//       <div className="flex items-center gap-4">
//         <button className="relative" onClick={() => navigate("/notifications")}>
//           <Bell size={19} color="#fff" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold leading-none text-white">
//               {unreadCount > 9 ? "9+" : unreadCount}
//             </span>
//           )}
//         </button>

//         <div className="relative" ref={menuRef}>
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setMenuOpen((prev) => !prev)}
//           >
//             <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white">
//               {initials}
//             </div>
//             <span className="hidden sm:block text-sm font-serif capitalize text-white">{displayName}</span>
//             <ChevronDown size={14} color="#A3A3A3" className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
//           </div>

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-xl shadow-black/40 py-1 z-50">
//               {admin?.email && (
//                 <div className="px-3 py-2 border-b border-white/10">
//                   <p className="text-xs font-serif text-neutral-500 truncate">{admin.email}</p>
//                 </div>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 w-full px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5 hover:text-red-400 transition-colors"
//               >
//                 <LogOut size={14} /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, ChevronDown, LogOut, Package, AlertTriangle, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { pageTitles, AUTH_BASE_URL, NOTIFICATION_API_URL } from "../data/mockData";
import api from "../config/axios";
import pusherClient from "../config/pusher";

const TYPE_ICON = {
  order: Package,
  low_stock: AlertTriangle,
  new_customer: UserPlus,
};

export default function Topbar({ setMobileNavOpen, admin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    function handleNotificationsRead(e) {
      setUnreadCount(e.detail?.count ?? 0);
    }
    window.addEventListener("notifications-read", handleNotificationsRead);
    return () => window.removeEventListener("notifications-read", handleNotificationsRead);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchUnreadCount() {
      try {
        const res = await api.get(`${NOTIFICATION_API_URL}/unread-count`);
        if (!cancelled) setUnreadCount(res.data?.unreadCount ?? 0);
      } catch (err) {
        console.log(err, "err in topbar notifications");
      }
    }

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // poll every 30s (fallback)

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Real-time — naya notification aate hi count HAMESHA badhta hai,
  // lekin toast sirf tab dikhta hai jab uski admin setting ON ho (notifyEnabled flag).
  useEffect(() => {
    const channel = pusherClient.subscribe("admin-notifications");

    channel.bind("new-notification", (newNotif) => {
      console.log("received notification:", newNotif); // TEM
      // Count always increments — off setting ka matlab sirf "no toast", not "no count"
      setUnreadCount((prev) => prev + 1);

      // notifyEnabled aata hai backend se (NotificationSettings ke hisaab se).
      // Agar backend purana version chal raha ho aur flag bheje hi na, default true rakha hai
      // taake behavior break na ho — jaise hi createNotification.js update hoga ye sahi kaam karega.
      const shouldToast = newNotif.notifyEnabled !== false;
      if (!shouldToast) return;

      const Icon = TYPE_ICON[newNotif.type] || Package;
      toast.custom(
        (t) => (
          <div
            className={`flex items-start gap-3 rounded-xl border border-orange-500/30 bg-neutral-950 px-4 py-3 shadow-lg transition cursor-pointer ${t.visible ? "opacity-100" : "opacity-0"
              }`}
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/notifications");
            }}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
            <div>
              <p className="text-sm font-medium text-white">{newNotif.title}</p>
              <p className="text-xs text-neutral-400">{newNotif.message}</p>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe("admin-notifications");
    };
  }, [navigate]);

  const displayName = admin?.username || "Admin";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    try {
      await api.get(`${AUTH_BASE_URL}/logout`);
    } catch (err) {
      // even if the request fails, clear the client-side state and redirect
    } finally {
      navigate("/login");
    }
  }

  return (
    <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
          <Menu size={22} color="#fff" />
        </button>
        <span className="hidden lg:block font-serif text-sm text-neutral-500">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative" onClick={() => navigate("/notifications")}>
          <Bell size={19} color="#fff" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold leading-none text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-serif capitalize text-white">{displayName}</span>
            <ChevronDown size={14} color="#A3A3A3" className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-xl shadow-black/40 py-1 z-50">
              {admin?.email && (
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-serif text-neutral-500 truncate">{admin.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}