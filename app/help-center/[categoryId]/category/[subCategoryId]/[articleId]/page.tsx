"use client";

import Navbar from "@/components/Navbar/Navbar";
import HelpCenterDetailLayout from "@/components/HelpCenter/HelpCenterDetailLayout";
import ArticleContent from "@/components/HelpCenter/ArticleContent";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  findArticleInTree,
  findCategoryInTree,
  findSubCategoryInTree,
  useHelpCenterContent,
} from "@/lib/help-center";

export default function HelpArticlePage() {
  const params = useParams();
  const categoryId = typeof params?.categoryId === "string" ? params.categoryId : "";
  const subCategoryId = typeof params?.subCategoryId === "string" ? params.subCategoryId : "";
  const articleId = typeof params?.articleId === "string" ? params.articleId : "";
  const { categories } = useHelpCenterContent();

  const category = findCategoryInTree(categories, categoryId);
  const subCategory = findSubCategoryInTree(categories, categoryId, subCategoryId);
  const article = findArticleInTree(categories, categoryId, subCategoryId, articleId);

  if (!category || !subCategory || !article) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 px-6 text-center text-gray-500">
          <p>Article not found.</p>
          <Link href="/help-center" className="text-[#5592f7] hover:underline mt-4 inline-block">
            Back to Help Center
          </Link>
        </div>
      </main>
    );
  }

  return (
    <HelpCenterDetailLayout
      categoryId={categoryId}
      categoryTitle={category.title}
      subCategoryId={subCategoryId}
      subCategoryTitle={subCategory.title}
      articleTitle={article.title}
    >
      <h1 className="text-2xl md:text-3xl font-medium text-black mb-6">
        {article.title}
      </h1>

      <div className="h-px w-full bg-gray-200 mb-8" />

      <ArticleContent content={article.content} />
    </HelpCenterDetailLayout>
  );
}
