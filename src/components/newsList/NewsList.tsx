import {NewsArticle} from "../../types/news/types";
import ArticleItem from "../articleItem/ArticleItem";

export default function NewsList({articles}: {articles: NewsArticle[]}) {
  console.log(articles);
  return (
    <ul className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleItem article={article} key={article.title} />
      ))}
    </ul>
  );
}
