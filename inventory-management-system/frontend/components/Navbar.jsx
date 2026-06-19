"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">

      <div className="max-w-7xl mx-auto flex gap-6">

        <Link href="/">
          Dashboard
        </Link>

        <Link href="/products">
          Products
        </Link>

        <Link href="/customers">
          Customers
        </Link>

        <Link href="/orders">
          Orders
        </Link>

      </div>

    </nav>
  );
}