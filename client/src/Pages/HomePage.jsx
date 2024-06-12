import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import ArticlePreview from "../Components/ArticlePreview";
import Article from "../Components/Article";
function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [offlineArticles, setOfflineArticles] = useState([]);

  const fetchArticles = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchQuery}`
    );
    setArticles(result.data.data);
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);
  return (
    <>
      <h1>เที่ยวไหนดี</h1>
      <DebounceInput
        className="p-2 border border-gray-400 rounded"
        type="text"
        debounceTimeout={300}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="หาที่เที่ยวแล้วไปกัน"
      />
      {articles.map((article) => (
        <div key={article.eid} className="article-item">
          <ArticlePreview article={article} />
          <Link target="_blank" to={`/articles/page/${article.eid}`}>
            อ่านต่อ
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
}

export default HomePage;