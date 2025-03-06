import React, {useState, useEffect} from "react";
import fetchNews from "./services/apiService";
import {NewsArticle} from "./types/news/types";
import SourceSelector from "./components/dropdown/SourceSelector";
import NewsList from "./components/newsList/NewsList";
import Loader from "./components/loader/Loader";
import Input from "./components/input/Input";
import CategoryFilter from "./components/categoryFilter/CategoryFilter";
import Header from "./components/header/Header";

const categories = {
  newsAPI: [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ],
  guardianAPI: [
    "world",
    "politics",
    "business",
    "technology",
    "sport",
    "culture",
  ],
};
const App: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<
    "newsAPI" | "guardianAPI"
  >("newsAPI");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    fetchNews(selectedSource, searchQuery, selectedCategory, signal)
      .then(setArticles)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching news:", error);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [selectedSource, searchQuery, selectedCategory]);

  return (
    <div>
      <Header />
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center text-yellow-500">
          News Aggregator
        </h1>
        <div className="flex items-center justify-between mt-4 border-b border-stone-200">
          <SourceSelector
            selectedSource={selectedSource}
            onChange={setSelectedSource}
          />
          <Input
            placeholder="Search news..."
            onChange={setSearchQuery}
            className="w-80 focus:w-96"
          />
          <CategoryFilter
            categories={categories[selectedSource]}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        {loading ? <Loader /> : <NewsList articles={articles} />}
      </div>
    </div>
  );
};

export default App;
