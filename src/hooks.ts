import getPosts, {Post} from '$lib/data/getPosts';

export const getSession = async (): Promise<{posts: Post[]}> => {
  return {
    posts: await getPosts(),
  };
};
