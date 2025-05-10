import { CheckCircle, Copy, ExternalLink, Link, XCircle } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { UrlServices } from "../Services/url.services";
import { useAuth } from "../Context/auth.context";

function UrlShortner() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const shortenUrl = async () => {
    // Reset states
    setError("");
    setShortUrl("");

    // Validate URL
    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(longUrl)) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    // Simulate API call
    setIsLoading(true);
    console.log('sending' , longUrl , user?.id)
    const newShortUrl = await UrlServices.createShortUrl(
      longUrl,
      user?.id as string
    );
    setShortUrl(newShortUrl);
    setIsLoading(false)
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
    setError("");
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const [copySuccess, setCopySuccess] = useState(false);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        setError("Failed to copy URL");
      });
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Link className="h-5 w-5 mr-2 text-indigo-400" />
          Shorten Your URL
        </h2>

        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label
              htmlFor="longUrl"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Enter a long URL to make it shorter
            </label>
            <div className="flex">
              <input
                id="longUrl"
                type="url"
                placeholder="https://example.com/very/long/url/that/nobody/wants/to/remember"
                value={longUrl}
                onChange={handleUrlChange}
                className="flex-grow px-4 py-3 rounded-l-md border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={shortenUrl}
                disabled={isLoading}
                className={`px-6 py-3 rounded-r-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Shortening..." : "Shorten"}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-400 text-sm flex items-center">
                <XCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>

          {/* Results */}
          {shortUrl && (
            <div className="mt-6 p-4 bg-gray-900 rounded-md border border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Your shortened URL:</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-indigo-400 hover:text-indigo-300 flex items-center"
                  >
                    {shortUrl}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(shortUrl)}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UrlShortner;
