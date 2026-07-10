import type { HelpArticle, HelpCategory, HelpSubCategory } from "./types";

export function findCategoryInTree(
  categories: HelpCategory[],
  categoryId: string
): HelpCategory | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function findSubCategoryInTree(
  categories: HelpCategory[],
  categoryId: string,
  subCategoryId: string
): HelpSubCategory | undefined {
  return findCategoryInTree(categories, categoryId)?.children.find(
    (child) => child.id === subCategoryId
  );
}

export function findArticleInTree(
  categories: HelpCategory[],
  categoryId: string,
  subCategoryId: string,
  articleId: string
): HelpArticle | undefined {
  return findSubCategoryInTree(categories, categoryId, subCategoryId)?.articles.find(
    (article) => article.id === articleId
  );
}
