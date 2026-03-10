import React, { useState, useContext, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCommentDots,
  FaBars,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import img from "../../assets/Images/FavIcon/route.png";
import { UserContext } from "../../App";

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            alt="Route Posts"
            className="h-9 w-9 rounded-xl object-cover"
            src={img}
          />
          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5] shadow-sm"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <FaHome size={20} />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5] shadow-sm"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <FaUser size={18} />
            <span className="hidden sm:inline">Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5] shadow-sm"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <FaCommentDots size={20} />
            <span className="hidden sm:inline">Notifications</span>
          </NavLink>
        </nav>

        {/* User Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
          >
            <img
              alt={userData?.name}
              className="h-8 w-8 rounded-full object-cover"
              src={
                userData?.photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
            />
            <span className="hidden max-w-35 truncate text-sm font-semibold text-slate-800 md:block">
              {userData?.name}
            </span>
            <FaBars className="text-slate-500" size={14} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-slate-100">
              <div className="py-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FaUser className="mr-3 text-slate-400 group-hover:text-blue-500" />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FaCog className="mr-3 text-slate-400 group-hover:text-blue-500" />
                  Settings
                </Link>

                <hr className="my-1 border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FaSignOutAlt className="mr-3 text-red-400 group-hover:text-red-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
