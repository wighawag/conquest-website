export type Post = {metadata: string; filename: string; slug: string; date: string; title: string; image: string};
export default async (): Promise<Post[]> => {
  const posts: Post[] = await Promise.all(
    Object.entries(import.meta.glob('/src/routes/devlog/*.md')).map(async ([path, page]) => {
      const {metadata} = await page();
      const pathComponents = path.split('/');
      const filename = pathComponents.pop();
      const slug = filename.split('.md', 1)[0];
      return {...metadata, filename, slug};
    })
  );
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return posts;
};
