import { Clipboard, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

function UrlHistory() {
  const [urlHistory, setUrlHistory] = useState([
    {
      original:
        "https://www.example.com/very/long/url/that/nobody/wants/to/type/or/remember",
      shortened: "min.fy/abc123",
      clicks: 24,
      date: "2025-05-08",
    },
    {
      original:
        "https://another-very-long-example.com/with/multiple/parameters?id=123&type=example",
      shortened: "min.fy/def456",
      clicks: 12,
      date: "2025-05-09",
    },
  ]);
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        // setError("Failed to copy URL");
      });
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Clipboard className="h-5 w-5 mr-2 text-indigo-400" />
          Your Links
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Copy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {urlHistory.map((url, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    <div className="truncate max-w-xs">{url.original}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a
                      href={`https://${url.shortened}`}
                      className="text-indigo-400 hover:text-indigo-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortened}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {url.clicks}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {url.date}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() =>
                        copyToClipboard(`https://${url.shortened}`)
                      }
                      className="p-1 text-gray-400 hover:text-indigo-400 focus:outline-none"
                    >
                      {copySuccess ? (
                        <CopyCheck className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {urlHistory.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Your shortened URLs will appear here
          </div>
        )}
      </div>
    </>
  );
}

export default UrlHistory;
