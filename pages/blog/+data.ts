import { listBlogPosts } from "../../server/public-data";

export const data = async () => {
  return listBlogPosts();
};
