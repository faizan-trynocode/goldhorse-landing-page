export function isArticleContentEmpty(content?: string) {
  if (!content?.trim()) {
    return true;
  }

  if (/<img\b/i.test(content)) {
    return false;
  }

  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return !text;
}

export function formatArticleContent(content?: string) {
  if (isArticleContentEmpty(content)) {
    return null;
  }

  const trimmed = content!.trim();

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }

  const escaped = trimmed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<p>${escaped}</p>`;
}
