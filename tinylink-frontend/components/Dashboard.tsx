"use client";

import { useEffect, useState } from "react";

interface LinkData {
  _id: string;
  longUrl: string;
  shortUrl: string;
  code: string;
  clickCount: number;
  createdAt: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; linkId: string | null }>({
    show: false,
    linkId: null,
  });

  // 📌 1. Fetch links from API
  const fetchLinks = async () => {
    try {
      const res = await fetch(
        "https://shavonda-deistic-oafishly.ngrok-free.dev/api/links"
      );

      const json = await res.json();
      setLinks(json.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching links", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // 📌 2. Copy short URL
  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
  };

  // 📌 3. Show delete confirmation
  const showDeleteConfirm = (id: string) => {
    setDeleteConfirm({ show: true, linkId: id });
  };

  // 📌 4. Delete link
  const deleteLink = async () => {
    if (!deleteConfirm.linkId) return;

    try {
      await fetch(
        `https://shavonda-deistic-oafishly.ngrok-free.dev/api/links/${deleteConfirm.linkId}`,
        { method: "DELETE" }
      );

      setLinks((prev) => prev.filter((link) => link._id !== deleteConfirm.linkId));
      setDeleteConfirm({ show: false, linkId: null });
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  // 📌 5. Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm({ show: false, linkId: null });
  };

  // 📌 6. Total Clicks
  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your shortened links</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Links</p>
            <p className="text-2xl font-bold text-gray-900">{links.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Clicks</p>
            <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Active Links</p>
            <p className="text-2xl font-bold text-gray-900">{links.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
            <p className="text-2xl font-bold text-gray-900">
              {links.length === 0
                ? 0
                : Math.round(totalClicks / links.length)}
            </p>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Links</h2>
          </div>

          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs">Code</th>
                    <th className="px-6 py-3 text-left text-xs">Original URL</th>
                    <th className="px-6 py-3 text-left text-xs">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link._id}>
                      <td className="px-6 py-4 font-mono text-blue-600">
                        {link.code}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">
                        {link.longUrl}
                      </td>

                      <td className="px-6 py-4 text-sm text-blue-700 underline cursor-pointer">
                        <a href={link.shortUrl} target="_blank">
                          {link.shortUrl}
                        </a>
                      </td>

                      <td className="px-6 py-4">{link.clickCount}</td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => copyToClipboard(link.shortUrl)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Copy
                          </button>

                          <span className="text-gray-300">•</span>

                          <button
                            onClick={() => showDeleteConfirm(link._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {links.length === 0 && (
                <p className="text-center py-10 text-gray-500">
                  No links available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Popup */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this link? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteLink}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}