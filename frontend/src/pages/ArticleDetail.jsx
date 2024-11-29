import React, { useContext } from "react";
import { NewsletterContext } from "../contexts/NewsletterContext";
import DetailPage from "../components/Newsletter/DetailPage";

const ArticleDetail = () => {
  const { newsletters } = useContext(NewsletterContext);

  // Case-insensitive filtering for type 'article'
  const articleItems = newsletters.filter(
    (item) => item.Type?.toLowerCase() === "article"
  );

  return <DetailPage items={articleItems} type="article" />;
};

export default ArticleDetail;
