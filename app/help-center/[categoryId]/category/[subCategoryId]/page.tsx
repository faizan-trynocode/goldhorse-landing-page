"use client";

import Navbar from "@/components/Navbar/Navbar";
import HelpCenterDetailLayout from "@/components/HelpCenter/HelpCenterDetailLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  findCategoryInTree,
  findSubCategoryInTree,
  useHelpCenterContent,
} from "@/lib/help-center";

export default function HelpCategoryPage() {
  const params = useParams();
  const categoryId = typeof params?.categoryId === "string" ? params.categoryId : "";
  const subCategoryId = typeof params?.subCategoryId === "string" ? params.subCategoryId : "";
  const { categories } = useHelpCenterContent();

  const category = findCategoryInTree(categories, categoryId);
  const subCategory = findSubCategoryInTree(categories, categoryId, subCategoryId);

  if (!category || !subCategory) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 px-6 text-center text-gray-500">
          <p>Category not found.</p>
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
    >
      <h1 className="text-2xl md:text-3xl font-medium text-black mb-6">
        {subCategory.title}
      </h1>

      <div className="h-px w-full bg-gray-200 mb-8" />

      <ul className="space-y-5">
        {subCategory.articles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/help-center/${categoryId}/category/${subCategoryId}/${article.id}`}
              className="text-[#5592f7] hover:underline text-sm md:text-base transition-colors"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </HelpCenterDetailLayout>
  );
}
