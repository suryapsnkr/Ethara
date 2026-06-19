import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Inventory Management",
  description: "Inventory & Order System",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>

      </body>
    </html>
  );
}