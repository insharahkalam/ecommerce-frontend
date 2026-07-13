import React from "react";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Brand logo"
            width={150}
            height={50}
            className="rounded-md"
          />
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-600 sm:flex">
          <li>
            <a href="/" className="transition-colors hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="transition-colors hover:text-gray-900">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="transition-colors hover:text-gray-900">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="transition-colors hover:text-gray-900">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/"
            className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 sm:inline-block"
          >
            Sign in
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Home;
