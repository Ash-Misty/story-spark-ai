import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  tag_list: string[];
  published_at: string;
  reading_time_minutes: number;
  user: { name: string };
  cover_image: string | null;
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  category: "AI" | "Writing" | "OSS";
  date: string;
  readMin: number;
  author: string;
  cover: string | null;
}

type Category = "All" | "AI" | "Writing" | "OSS";
type SortOption = "newest" | "oldest" | "shortest";

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  AI: "AI Storytelling",
  Writing: "Writing Tips",
  OSS: "Open Source",
};

const CATEGORY_STYLES: Record<string, string> = {
  AI: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Writing: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  OSS: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const TAG_QUERIES: Record<Category, string> = {
  All: "ai",
  AI: "ai",
  Writing: "writing",
  OSS: "opensource",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mapCategory(tags: string[]): "AI" | "Writing" | "OSS" {
  const t = tags.join(" ").toLowerCase();
  if (t.includes("writing") || t.includes("tutorial") || t.includes("beginners")) return "Writing";
  if (t.includes("opensource") || t.includes("github") || t.includes("hacktoberfest")) return "OSS";
  return "AI";
}

const Blog = () => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(false);
      try {
        const tags =
          activeCategory === "All"
            ? ["ai", "writing", "opensource"]
            : [TAG_QUERIES[activeCategory]];

        const results = await Promise.all(
          tags.map((tag) =>
            fetch(
              `https://dev.to/api/articles?tag=${tag}&per_page=6&state=rising`
            ).then((r) => r.json())
          )
        );

        const flat: DevToArticle[] = results.flat();
        const seen = new Set<number>();
        const mapped: BlogPost[] = flat
          .filter((a) => {
            if (seen.has(a.id)) return false;
            seen.add(a.id);
            return true;
          })
          .map((a) => ({
            id: a.id,
            title: a.title,
            description: a.description || "No description available.",
            url: a.url,
            category: mapCategory(a.tag_list),
            date: a.published_at,
            readMin: a.reading_time_minutes || 1,
            author: a.user.name,
            cover: a.cover_image,
          }));

        setArticles(mapped);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  const filtered = useMemo(() => {
    let posts = articles.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesQuery;
    });

    if (sort === "newest")
      posts = posts.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === "oldest")
      posts = posts.sort((a, b) => a.date.localeCompare(b.date));
    else posts = posts.sort((a, b) => a.readMin - b.readMin);

    return posts;
  }, [articles, query, sort]);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const topics: { emoji: string; label: string; category: Category }[] = [
    { emoji: "📖", label: "AI-powered storytelling", category: "AI" },
    { emoji: "✍️", label: "Creative writing tips", category: "Writing" },
    { emoji: "🚀", label: "Open-source updates", category: "OSS" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-12 transition-colors duration-300 dark:bg-[#0b1329] dark:text-white">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-slate-600 dark:text-gray-300 leading-8">
            Explore articles, updates, and creative insights from the StorySparkAI community.
          </p>
        </div>

        {/* Latest Topics */}
        <nav
          aria-label="Latest topics"
          className="mb-8 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Latest Topics
          </h2>
          <ul className="flex flex-wrap gap-3">
            {topics.map((t) => (
              <li key={t.category}>
                <button
                  onClick={() => setActiveCategory(t.category)}
                  aria-pressed={activeCategory === t.category}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all duration-150
                    ${
                      activeCategory === t.category
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 dark:border-zinc-700 text-slate-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                >
                  <span aria-hidden="true">{t.emoji}</span>
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort articles"
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="shortest">Shortest read</option>
          </select>
        </div>

        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2 mb-6"
        >
          {(["All", "AI", "Writing", "OSS"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-150
                ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 dark:border-zinc-700 text-slate-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || activeCategory !== "All") && !loading && (
          <p aria-live="polite" className="text-sm text-slate-500 dark:text-gray-400 mb-4">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16 text-slate-500 dark:text-gray-400">
            <p className="text-lg mb-2">Failed to load articles.</p>
            <p className="text-sm">Please check your connection and try again.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 dark:text-gray-400">
            <p className="text-lg mb-2">No articles match your search.</p>
            <p className="text-sm">Try a different keyword or clear the filter.</p>
          </div>
        )}

        {/* Article cards */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 overflow-hidden"
                aria-label={post.title}
              >
                {/* Cover image */}
                {post.cover && (
                  <img
                    src={post.cover}
                    alt=""
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                )}

                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Badge + bookmark */}
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${CATEGORY_STYLES[post.category]}`}>
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      aria-label={bookmarked.has(post.id) ? `Remove bookmark from ${post.title}` : `Bookmark ${post.title}`}
                      className={`text-lg transition-colors ${bookmarked.has(post.id) ? "text-blue-500" : "text-slate-300 dark:text-zinc-600 hover:text-blue-400"}`}
                    >
                      {bookmarked.has(post.id) ? "🔖" : "🏷️"}
                    </button>
                  </div>

                  {/* Title + description */}
                  <h3 className="text-base font-semibold leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-zinc-500 pt-3 border-t border-gray-100 dark:border-zinc-800">
                    <span>📅 {formatDate(post.date)}</span>
                    <span>⏱ {post.readMin} min read</span>
                    <span>👤 {post.author}</span>
                  </div>

                  {/* CTA */}
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 active:scale-95 transition-all duration-150"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Back to home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-600 active:scale-95 transition-all duration-150"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Blog;