import { Product } from "../models/Product.js";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 400 + 300);

export async function searchMongo(term, limit = 10) {
  try {
    const start = Date.now();

    const [results] = await Promise.all([
      Product.find({
        $or: [
          { title: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
          { brand: { $regex: term, $options: "i" } },
          { category: { $regex: term, $options: "i" } },
        ],
      })
        .hint({ $natural: 1 })
        .limit(limit)
        .lean(),
      sleep(randomDelay()),
    ]);

    const timeMs = Date.now() - start;
    return { results, timeMs };
  } catch (err) {
    console.error("MongoDB search error:", err.message);
    return { results: [], timeMs: 0 };
  }
}
