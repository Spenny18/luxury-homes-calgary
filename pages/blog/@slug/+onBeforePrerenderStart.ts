import { listBlogPosts } from "../../../server/public-data";

// Enumerate every blog slug at build time so Vike prerenders one HTML file
// per post.
export const onBeforePrerenderStart = async () => {
  const posts = listBlogPosts();
  return posts.map((post) => ({
    url: `/blog/${post.slug}`,
    pageContext: {
      routeParams: { slug: post.slug },
      data: { post, allPosts: posts },
    },
  }));
};
