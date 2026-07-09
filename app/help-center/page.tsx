"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import FloatingActions from "@/components/HelpCenter/FloatingActions";
import { helpCategories } from "@/lib/help-center-data";
import { 
  Search, 
  CircleDot, 
  Wallet, 
  ArrowRightLeft, 
  CircleDollarSign,
  Repeat,
  Boxes
} from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, React.ReactNode> = {
  "account-related": <CircleDot className="text-[#c1a04f] w-5 h-5" />,
  "funds-related": <Wallet className="text-[#f06e49] w-5 h-5" />,
  "stock-transfer": <ArrowRightLeft className="text-[#41c9e2] w-5 h-5" />,
  "fee-standard": <CircleDollarSign className="text-[#7bd264] w-5 h-5" />,
  "hong-kong-stock-market-trading": (
    <div className="w-5 h-5 rounded-full border-[1.5px] border-[#5592f7] text-[#5592f7] flex items-center justify-center text-[8px] font-bold">HK</div>
  ),
  "us-stock-market-trading": (
    <div className="w-5 h-5 rounded-full border-[1.5px] border-[#f49342] text-[#f49342] flex items-center justify-center text-[8px] font-bold">US</div>
  ),
  "a-share-market-trading": (
    <div className="w-5 h-5 rounded-full border-[1.5px] border-[#f05353] text-[#f05353] flex items-center justify-center text-[8px] font-bold">A</div>
  ),
  "trading-system-requirements": <Repeat className="text-[#a6ad42] w-5 h-5" />,
  "other-financial-products": <Boxes className="text-[#3bd3df] w-5 h-5" />,
};

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const searchWords = normalizedQuery.split(/\s+/).filter(Boolean);
  const isSearching = searchWords.length > 0;

  const textMatchesQuery = (text: string) => {
    const lowerText = text.toLowerCase();
    return searchWords.every((word) => lowerText.includes(word));
  };


  const visibleCategories = useMemo(() => {
    return helpCategories
      .map((category) => {
        const firstSubCategory = category.children[0];
        const categoryTitleMatches = isSearching && textMatchesQuery(category.title);

        const matchedArticles = isSearching
          ? category.children.flatMap((child) => {
              const subCategoryTitleMatches = textMatchesQuery(child.title);
              return child.articles
                .filter(
                  (article) =>
                    categoryTitleMatches ||
                    subCategoryTitleMatches ||
                    textMatchesQuery(article.title)
                )
                .map((article) => ({ ...article, subCategoryId: child.id }));
            })
          : category.children.flatMap((child) =>
              child.articles.slice(0, 2).map((article) => ({ ...article, subCategoryId: child.id }))
            );

        return {
          category,
          firstSubCategory,
          previewArticles: matchedArticles.slice(0, 5),
          matchCount: matchedArticles.length,
        };
      })
      .filter(({ matchCount }) => !isSearching || matchCount > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, normalizedQuery]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-[#1c1c1c] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[30px] border-white/5 rounded-full blur-sm pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[20px] border-white/5 rounded-full blur-sm pointer-events-none" />
        <div className="absolute top-[60%] left-[60%] w-32 h-32 bg-white/5 rotate-45 blur-sm pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl text-white font-medium mb-8">How can I help you?</h1>
          
          <div className="w-full max-w-3xl bg-white flex h-14 rounded overflow-hidden shadow-lg">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Please enter your question."
              className="flex-1 px-6 h-full text-black outline-none placeholder:text-gray-400 font-sans"
            />
            <button className="h-full w-16 bg-[#A79A28] transition-colors flex items-center justify-center">
              <Search className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-2xl md:text-3xl font-medium text-black mb-8">
           Problem Classification
        </h2>

        {isSearching && visibleCategories.length === 0 ? (
          <p className="text-gray-400 text-sm">No matching articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCategories.map(({ category, firstSubCategory, previewArticles }) => (
              <div key={category.id} className="bg-[#f8f9fa] rounded p-6 shadow-sm border border-gray-100">
                <Link
                  href={`/help-center/${category.id}/category/${firstSubCategory.id}`}
                  className="flex items-center gap-3 mb-4 group"
                >
                  {categoryIcons[category.id]}
                  <h3 className="text-xl font-medium text-black group-hover:text-[#bfa15f] transition-colors">
                    {category.title}
                  </h3>
                </Link>
                <div className="h-px w-full bg-gray-200 mb-6" />
                <ul className="space-y-5">
                  {previewArticles.map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/help-center/${category.id}/category/${article.subCategoryId}/${article.id}`}
                        className="text-gray-500 hover:text-black text-sm transition-colors block truncate"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingActions />
    </main>
  );
}