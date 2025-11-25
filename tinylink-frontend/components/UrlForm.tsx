"use client";

import React, { useEffect, useState } from "react";

export default function UrlForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    if (!longUrl.trim()) return;

    setIsLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("https://shavonda-deistic-oafishly.ngrok-free.dev/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: longUrl
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to shorten URL: ${response.status}`);
      }

      // Use the shortUrl directly from the API response
      if (data.success && data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Error shortening URL:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = () => {
    if (longUrl) {
      navigator.clipboard.writeText(longUrl);
      // You can add a toast notification here for better UX
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ users worldwide</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Build stronger digital connections
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use our URL shortener, QR Codes, and landing pages to engage your audience
            and connect them to the right information.
          </p>
        </div>

        {/* Main Form Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-100 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shorten a long link
            </h2>
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-base font-semibold mb-6 border border-green-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required • Free forever
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your long URLs into short, shareable links in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="https://example.com/your-very-long-url-that-needs-shortening"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="w-full px-8 py-5 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-100 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[180px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin mr-3"></div>
                    Shortening...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Get Short Link
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Result Section */}
          {shortUrl && (
            <div className="mt-10 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-fade-in relative z-10">
              <div className="flex items-center justify-between flex-col lg:flex-row gap-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-900 text-lg mb-2">Your short URL is ready!</p>
                    <a
                      href={longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-xl font-semibold underline break-all"
                    >
                      {shortUrl}
                    </a>
                    <p className="text-gray-600 text-sm mt-2">
                      This will redirect to: <span className="text-gray-800">{longUrl}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-green-700 border-2 border-green-300 px-6 py-3 rounded-xl hover:bg-green-50 transition-all duration-200 font-semibold flex items-center whitespace-nowrap shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                  <a
                    href={longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold flex items-center whitespace-nowrap shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Test Link
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10M+</div>
            <div className="text-gray-600">Links Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            Join thousands of marketers, creators, and businesses worldwide
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}