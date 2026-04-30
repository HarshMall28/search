import DataLoader from 'dataloader';
import { Product } from '../models/Product.js';

async function batchProducts(ids) {
  const products = await Product.find({ _id: { $in: ids } });
  const productMap = {};
  for (const p of products) {
    productMap[p._id.toString()] = p;
  }
  return ids.map(id => productMap[id.toString()] ?? null);
}

export function createProductLoader() {
  return new DataLoader(batchProducts);
}
