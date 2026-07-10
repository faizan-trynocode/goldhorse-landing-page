export type HelpArticle = {
  id: string;
  title: string;
  content?: string;
};

export type HelpSubCategory = {
  id: string;
  title: string;
  articles: HelpArticle[];
};

export type HelpCategory = {
  id: string;
  title: string;
  children: HelpSubCategory[];
};
