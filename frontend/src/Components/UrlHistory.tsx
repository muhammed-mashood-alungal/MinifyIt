import { Clipboard, Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { UrlServices } from "../Services/url.services";
import { useAuth } from "../Context/auth.context";

function UrlHistory() {
  const [urlHistory, setUrlHistory] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    const fetchLinksHistory = async () => {
      try {
        const links = await UrlServices.getMyLinks(user?.id as string);
        setUrlHistory(links);
      } catch (error) {}
    };
    fetchLinksHistory();
  });
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
                  Copy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {urlHistory.map((url : any, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    <div className="truncate max-w-xs">{url.originalUrl}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a
                      href={url.shortUrl}
                      className="text-indigo-400 hover:text-indigo-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() =>
                        copyToClipboard(url.shortUrl)
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
