import {
  listNeighbourhoods,
  listBlogPosts,
  listTestimonials,
  getStats,
  listFeaturedMls,
} from "../../server/public-data";

export const data = async () => {
  const featured = listFeaturedMls(6);
  const neighbourhoods = listNeighbourhoods();
  const blog = listBlogPosts().slice(0, 6);
  const testimonials = listTestimonials();
  const stats = getStats();
  return { featured, neighbourhoods, blog, testimonials, stats };
};
