
import { decode } from 'html-entities';

export interface BlogPostSummary {
  title: string;
  excerpt: string;
  link: string;
  date: string;
}

export function stripHTML(html: string): string {
  const stripped = html.replace(/<[^>]*>/g, '');
  const noNewlines = stripped.replace(/\n/g, ' ');
  const decoded = decode(noNewlines);
  const removeSpaces = decoded.replace(/\s+/g, ' ').trim();
  return removeSpaces;
}

export function searchByKeyWord(posts: BlogPostSummary[], keyWordParam: string): BlogPostSummary[] {
  if (!keyWordParam) {
    return posts;
  }
  return posts.filter(post => {
    const title = post.title.toUpperCase();
    const excerpt = post.excerpt.toUpperCase();
    return title.includes(keyWordParam) || excerpt.includes(keyWordParam);
  });
}
