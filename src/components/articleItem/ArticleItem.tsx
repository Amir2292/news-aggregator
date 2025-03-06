import {NewsArticle} from "../../types/news/types";

export default function ArticleItem({article}: {article: NewsArticle}) {
  return (
    <li className="p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="object-cover w-full h-48 rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-md">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>

        <p className="text-sm text-gray-600">
          {article.author ? `By ${article.author}` : "Author unknown"} |{" "}
          <span className="font-medium">
            {article.source?.name || "Unknown Source"}
          </span>
        </p>

        {article.description && (
          <p className="mt-2 text-sm text-gray-700">{article.description}</p>
        )}

        <p className="mt-2 text-xs text-gray-500">
          Published on {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline"
        >
          Read More →
        </a>
      </div>
    </li>
  );
}
