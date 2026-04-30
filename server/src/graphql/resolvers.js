import { searchMongo } from "../services/mongoService.js";
import { searchAtlas } from "../services/meilisearchService.js";
import { Product } from "../models/Product.js";

export const resolvers = {
  Query: {
    search: async (_, { term, limit = 10 }) => {
      try {
        const [mongoData, meiliData] = await Promise.all([
          searchMongo(term, limit),
          searchAtlas(term, limit),
        ]);

        const { results: mongoResults, timeMs: mongoTime } =
          mongoData;
        const { results: meiliResults, timeMs: meiliTime } =
          meiliData;

        const speedMultiplier =
          mongoTime > meiliTime
            ? parseFloat((mongoTime / meiliTime).toFixed(1))
            : parseFloat((meiliTime / mongoTime).toFixed(1));

        return {
          mongoResults,
          meiliResults,
          mongoTime,
          meiliTime,
          speedMultiplier,
          totalMongoCount: mongoResults.length,
          totalMeiliCount: meiliResults.length,
        };
      } catch (err) {
        console.error("Search resolver error:", err.message);
        return {
          mongoResults: [],
          meiliResults: [],
          mongoTime: 0,
          meiliTime: 0,
          speedMultiplier: 0,
          totalMongoCount: 0,
          totalMeiliCount: 0,
        };
      }
    },

    product: async (_, { id }, { productLoader }) => {
      return productLoader.load(id);
    },

    products: async (_, { limit = 20 }) => {
      return Product.find().limit(limit);
    },
  },

  Product: {
    id: (parent) => parent._id?.toString() ?? parent.id,
  },
};
