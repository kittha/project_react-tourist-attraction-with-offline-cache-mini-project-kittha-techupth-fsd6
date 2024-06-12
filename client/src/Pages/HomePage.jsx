import axios from "axios";
import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import ArticlePreview from "../Components/ArticlePreview";
function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchQuery}`
    );
    setArticles(result.data.data);
  };

  const handleAddInput = (textInput) => {
    const newTextInputString = searchQuery.concat(" ", textInput.tag);
    setSearchQuery(newTextInputString);
    fetchArticles();
  };
  useEffect(() => {
    fetchArticles();
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-10">
        <h1 className="p-8 text-5xl text-center text-sky-400">เที่ยวไหนดี</h1>
        <div class="w-4/5">
          <p className="text-left">ค้นหาที่เที่ยว</p>
        </div>
        <input
          className="p-2 my-4 border border-gray-400 rounded w-4/5"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="หาที่เที่ยวแล้วไปกัน"
        />
        {/* <DebounceInput
        className="p-2 border border-gray-400 rounded"
        type="text"
        debounceTimeout={300}
        value={searchQuery}
        onChange={(e) => {
          console.log(e.target.value);
          setSearchQuery(e.target.value);
        }}
        placeholder="หาที่เที่ยวแล้วไปกัน"
      /> */}
        {articles.map((article) => (
          <div key={article.eid} className="article-item">
            <ArticlePreview article={article} handleAddInput={handleAddInput} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
