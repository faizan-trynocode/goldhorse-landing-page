import { formatArticleContent } from "@/lib/help-center/rich-text";

type ArticleContentProps = {
  content?: string;
  fallback?: string;
};

export default function ArticleContent({
  content,
  fallback = "This article provides detailed information regarding your query. Please refer to the specific sections above or contact our support team using the phone button below if you require further assistance.",
}: ArticleContentProps) {
  const html = formatArticleContent(content);

  if (!html) {
    return <p className="text-[#333] text-sm md:text-base leading-relaxed">{fallback}</p>;
  }

  return (
    <div
      className="article-content text-[#333] text-sm md:text-base leading-relaxed font-sans"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
