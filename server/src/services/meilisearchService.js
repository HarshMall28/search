import { Product } from "../models/Product.js";

export const searchAtlas = async (term, limit = 10) => {
  try {
    const start = Date.now();

    const results = await Product.aggregate([
      {
        $search: {
          index: "products_search",
          text: {
            query: term,
            path: ["title", "description", "brand", "category"],
            fuzzy: { maxEdits: 2 },
          },
        },
      },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          category: 1,
          brand: 1,
          price: 1,
          image: 1,
          rating: 1,
          stock: 1,
        },
      },
    ]);

    const timeMs = Date.now() - start;
    return { results, timeMs };
  } catch (err) {
    console.error("Atlas Search error:", err.message);
    return { results: [], timeMs: 0 };
  }
};
