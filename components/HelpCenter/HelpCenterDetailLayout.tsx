import Navbar from "@/components/Navbar/Navbar";
import HelpCenterSidebar from "@/components/HelpCenter/HelpCenterSidebar";
import HelpCenterBreadcrumbs from "@/components/HelpCenter/HelpCenterBreadcrumbs";
import FloatingActions from "@/components/HelpCenter/FloatingActions";

type HelpCenterDetailLayoutProps = {
  categoryId: string;
  categoryTitle: string;
  subCategoryId: string;
  subCategoryTitle: string;
  articleTitle?: string;
  children: React.ReactNode;
};

export default function HelpCenterDetailLayout({
  categoryId,
  categoryTitle,
  subCategoryId,
  subCategoryTitle,
  articleTitle,
  children,
}: HelpCenterDetailLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-28 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top row: breadcrumbs above sidebar | search above content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 pt-8 pb-6">
          <div className="w-full md:w-100 shrink-0">
            <HelpCenterBreadcrumbs
              categoryId={categoryId}
              categoryTitle={categoryTitle}
              subCategoryId={subCategoryId}
              subCategoryTitle={subCategoryTitle}
              articleTitle={articleTitle}
            />
          </div>
        </div>

        {/* Bottom row: sidebar | main content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 pb-32 md:items-stretch">
          <div className="w-full md:w-64 shrink-0 self-stretch">
            <HelpCenterSidebar
              activeCategoryId={categoryId}
              activeSubCategoryId={subCategoryId}
            />
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>

      <FloatingActions />
    </main>
  );
}
