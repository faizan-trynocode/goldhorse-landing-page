import Link from "next/link";

type HelpCenterBreadcrumbsProps = {
  categoryId: string;
  categoryTitle: string;
  subCategoryId: string;
  subCategoryTitle: string;
  articleTitle?: string;
};

export default function HelpCenterBreadcrumbs({
  categoryId,
  categoryTitle,
  subCategoryId,
  subCategoryTitle,
  articleTitle,
}: HelpCenterBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm gap-2 flex-wrap text-gray-400"
    >
      <Link href="/help-center" className="text-[#5592f7] hover:underline whitespace-nowrap">
        Help Center
      </Link>
      <span>/</span>
      <Link
        href={`/help-center/${categoryId}/category/${subCategoryId}`}
        className="text-[#5592f7] hover:underline"
      >
        {categoryTitle}
      </Link>
      <span>/</span>
      {articleTitle ? (
        <>
          <Link
            href={`/help-center/${categoryId}/category/${subCategoryId}`}
            className="text-[#5592f7] hover:underline"
          >
            {subCategoryTitle}
          </Link>
          <span>/</span>
          <span className="text-gray-500">{articleTitle}</span>
        </>
      ) : (
        <span className="text-gray-500">{subCategoryTitle}</span>
      )}
    </nav>
  );
}
