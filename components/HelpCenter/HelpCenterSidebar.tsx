"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useHelpCenterContent } from "@/lib/help-center";

type HelpCenterSidebarProps = {
  activeCategoryId: string;
  activeSubCategoryId: string;
};

export default function HelpCenterSidebar({
  activeCategoryId,
  activeSubCategoryId,
}: HelpCenterSidebarProps) {
  const { categories: helpCategories } = useHelpCenterContent();
  const [manualExpandedIds, setManualExpandedIds] = useState<Set<string>>(() => new Set());
  const expandedIds = useMemo(
    () => new Set([...manualExpandedIds, activeCategoryId]),
    [manualExpandedIds, activeCategoryId]
  );

  const toggleCategory = (categoryId: string) => {
    setManualExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <aside className="w-full flex flex-col bg-[#f7f7f7] min-h-full py-2">
      {helpCategories.map((category) => {
        const isExpanded = expandedIds.has(category.id);

        return (
          <div key={category.id}>
            <button
              type="button"
              onClick={() => toggleCategory(category.id)}
              className="w-full text-left px-6 py-4 text-sm font-medium transition-colors border-l-4 border-transparent text-[#333] hover:bg-[#efefef]"
            >
              {category.title}
            </button>

            {isExpanded &&
              category.children.map((child) => {
                const isChildActive =
                  category.id === activeCategoryId && child.id === activeSubCategoryId;

                return (
                  <Link
                    key={child.id}
                    href={`/help-center/${category.id}/category/${child.id}`}
                    className={`block pl-10 pr-6 py-4 text-sm transition-colors border-l-4 ${
                      isChildActive
                        ? "bg-[#f5f5e9] border-[#92862b] text-[#333] font-medium"
                        : "border-transparent text-gray-500 hover:bg-[#efefef] hover:text-[#333]"
                    }`}
                  >
                    {child.title}
                  </Link>
                );
              })}
          </div>
        );
      })}
    </aside>
  );
}
