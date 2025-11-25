import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyLink - URL Shortener",
  description: "Simple and powerful URL shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TinyLink
                </h1>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        <main>{children}</main>
      </body>
    </html>
  );
}