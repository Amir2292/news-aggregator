import axios from "axios";
import {NewsArticle, GuardianArticle} from "../types/news/types";
import apiConfig from "../config/apiConfig.json";

const fetchNews = async (
  source: "newsAPI" | "guardianAPI",
  query: string = "",
  category: string = "",
  signal?: AbortSignal
): Promise<NewsArticle[]> => {
  try {
    const {url, apiKey} = apiConfig[source];
    let apiUrl: string;

    if (source === "newsAPI") {
      apiUrl = `${url}&apiKey=${apiKey}${query ? `&q=${query}` : ""}${
        category ? `&category=${category}` : ""
      }`;
    } else {
      apiUrl = `${url}?api-key=${apiKey}${query ? `&q=${query}` : ""}${
        category ? `&section=${category}` : ""
      }`;
    }

    const response = await axios.get(apiUrl, {signal});

    if (source === "newsAPI") {
      return response.data.articles.map((article: NewsArticle) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: {name: article.source.name},
        publishedAt: article.publishedAt,
        author: article.author,
      }));
    } else {
      return response.data.response.results.map((article: GuardianArticle) => ({
        title: article.webTitle,
        description: article.fields?.trailText || "",
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || "",
        source: {name: "The Guardian"},
        publishedAt: article.webPublicationDate,
        author: "",
      }));
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error fetching news:", error);
    }
    return [];
  }
};

export default fetchNews;
