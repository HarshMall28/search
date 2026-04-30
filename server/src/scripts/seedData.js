import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, "../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  image: String,
  rating: Number,
  stock: Number,
});

const Product = mongoose.model("Product", productSchema);

const categoryImages = {
  phones:
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
  laptops:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  tablets:
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
  watches:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  cameras:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
  tvs: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
  speakers:
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
};

const productPools = {
  phones: {
    brand: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    names: [
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15",
      "iPhone 14 Pro",
      "iPhone 14",
      "Samsung Galaxy S24 Ultra",
      "Samsung Galaxy S24+",
      "Samsung Galaxy S24",
      "Samsung Galaxy A54",
      "Google Pixel 8 Pro",
      "Google Pixel 8",
      "OnePlus 12",
      "OnePlus 11",
      "Xiaomi 14 Pro",
      "Xiaomi 14",
    ],
    descriptions: [
      "Latest flagship smartphone with pro camera system and all day battery life",
      "Premium smartphone featuring advanced AI capabilities and stunning display",
      "High performance phone with titanium build and cutting edge processor",
      "Flagship killer with incredible value and top tier performance",
      "Best in class display with 120Hz refresh rate and fast charging support",
    ],
    priceRange: [699, 1599],
  },
  laptops: {
    brand: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
    names: [
      "MacBook Pro 16 M3 Max",
      "MacBook Pro 14 M3 Pro",
      "MacBook Air 15 M3",
      "MacBook Air 13 M3",
      "Dell XPS 15",
      "Dell XPS 13",
      "HP Spectre x360",
      "HP EliteBook 840",
      "Lenovo ThinkPad X1 Carbon",
      "Lenovo IdeaPad Slim 5",
      "Asus ROG Zephyrus G14",
      "Asus ZenBook Pro 14",
    ],
    descriptions: [
      "Powerful laptop with all day battery and stunning Liquid Retina display",
      "Professional grade laptop for developers and creative professionals",
      "Ultra thin and light laptop with incredible performance per watt",
      "Gaming laptop with dedicated GPU and high refresh rate display",
      "Business laptop with enterprise security and premium build quality",
    ],
    priceRange: [999, 3499],
  },
  headphones: {
    brand: ["Sony", "Bose", "Apple", "Samsung", "Sennheiser"],
    names: [
      "Sony WH-1000XM5",
      "Sony WH-1000XM4",
      "Sony WF-1000XM5",
      "Bose QuietComfort 45",
      "Bose QuietComfort Ultra",
      "Bose SoundSport Free",
      "Apple AirPods Pro 2nd Gen",
      "Apple AirPods Max",
      "Apple AirPods 3rd Gen",
      "Samsung Galaxy Buds 2 Pro",
      "Sennheiser Momentum 4",
    ],
    descriptions: [
      "Industry leading noise cancellation with exceptional sound quality",
      "Premium wireless headphones with adaptive sound and 30 hour battery",
      "True wireless earbuds with active noise cancellation and spatial audio",
      "Over ear headphones delivering audiophile grade sound experience",
      "Crystal clear calls and immersive music experience for everyday use",
    ],
    priceRange: [149, 549],
  },
  tablets: {
    brand: ["Apple", "Samsung", "Microsoft", "Lenovo", "Amazon"],
    names: [
      "iPad Pro 12.9 M2",
      "iPad Pro 11 M2",
      "iPad Air 5th Gen",
      "iPad 10th Gen",
      "Samsung Galaxy Tab S9 Ultra",
      "Samsung Galaxy Tab S9+",
      "Samsung Galaxy Tab S9",
      "Microsoft Surface Pro 9",
      "Microsoft Surface Go 3",
      "Lenovo Tab P12 Pro",
    ],
    descriptions: [
      "Most powerful tablet ever with M2 chip and stunning ProMotion display",
      "Versatile tablet perfect for creativity productivity and entertainment",
      "Thin and light tablet with all day battery and vibrant display",
      "Professional tablet replacing your laptop with full desktop features",
      "Premium Android tablet for media consumption and productivity tasks",
    ],
    priceRange: [329, 1299],
  },
  watches: {
    brand: ["Apple", "Samsung", "Garmin", "Fitbit", "Fossil"],
    names: [
      "Apple Watch Series 9",
      "Apple Watch Ultra 2",
      "Apple Watch SE 2nd Gen",
      "Samsung Galaxy Watch 6 Classic",
      "Samsung Galaxy Watch 6",
      "Garmin Fenix 7 Pro",
      "Garmin Venu 3",
      "Fitbit Sense 2",
      "Fitbit Versa 4",
      "Fossil Gen 6 Wellness Edition",
    ],
    descriptions: [
      "Advanced smartwatch with health monitoring and fitness tracking",
      "Rugged smartwatch built for extreme sports and outdoor adventures",
      "Everyday smartwatch with essential health features and long battery",
      "Stylish smartwatch combining fashion with smart fitness capabilities",
      "Health focused wearable tracking sleep stress heart rate and more",
    ],
    priceRange: [199, 799],
  },
  cameras: {
    brand: ["Sony", "Canon", "Nikon", "Fujifilm", "Panasonic"],
    names: [
      "Sony Alpha A7 IV",
      "Sony Alpha A7R V",
      "Sony ZV-E10",
      "Canon EOS R6 Mark II",
      "Canon EOS R50",
      "Nikon Z8",
      "Nikon Z30",
      "Fujifilm X-T5",
      "Fujifilm X100V",
      "Panasonic Lumix S5 II",
    ],
    descriptions: [
      "Full frame mirrorless camera with exceptional low light performance",
      "Professional camera system with industry leading autofocus technology",
      "Compact mirrorless camera perfect for content creators and vloggers",
      "High resolution sensor capturing every detail with stunning clarity",
      "Versatile camera system for photography enthusiasts and professionals",
    ],
    priceRange: [749, 3299],
  },
  tvs: {
    brand: ["Samsung", "LG", "Sony", "TCL", "Hisense"],
    names: [
      "Samsung 65 inch QN90C Neo QLED",
      "Samsung 55 inch S95C OLED",
      "LG 65 inch C3 OLED",
      "LG 55 inch G3 OLED",
      "Sony 65 inch A95L OLED",
      "Sony 55 inch X90L",
      "TCL 65 inch QM8",
      "TCL 55 inch S546",
      "Hisense 65 inch U8K",
      "Hisense 75 inch U6K",
    ],
    descriptions: [
      "Premium OLED TV with perfect blacks and stunning picture quality",
      "Next generation QLED display with quantum mini LED backlighting",
      "Gaming TV with 144Hz refresh rate and ultra low input lag",
      "Smart TV with built in streaming apps and voice assistant support",
      "Large format display delivering cinematic experience at home",
    ],
    priceRange: [499, 2999],
  },
  speakers: {
    brand: ["Sonos", "Bose", "JBL", "Marshall", "Harman Kardon"],
    names: [
      "Sonos Era 300",
      "Sonos Era 100",
      "Sonos Beam Gen 2",
      "Bose SoundLink Max",
      "Bose SoundLink Flex",
      "JBL Charge 5",
      "JBL Xtreme 3",
      "Marshall Stanmore III",
      "Marshall Acton III",
      "Harman Kardon Aura Studio 4",
    ],
    descriptions: [
      "Premium wireless speaker with spatial audio and room filling sound",
      "Portable bluetooth speaker with waterproof design and powerful bass",
      "Smart home speaker integrating seamlessly with your existing ecosystem",
      "Iconic speaker design delivering warm rich sound with vintage aesthetics",
      "High fidelity wireless speaker perfect for home and outdoor use",
    ],
    priceRange: [99, 599],
  },
};

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomRating = () =>
  Math.round((Math.random() * 2 + 3) * 10) / 10;

const generateProducts = () => {
  const products = [];
  const categories = Object.keys(productPools);
  const perCategory = Math.ceil(100000 / categories.length);

  categories.forEach((category) => {
    const pool = productPools[category];
    for (let i = 0; i < perCategory; i++) {
      const baseName = randomFrom(pool.names);
      products.push({
        title: `${baseName} - Edition ${i + 1}`,
        description: randomFrom(pool.descriptions),
        category,
        brand: randomFrom(pool.brand),
        price: randomInt(pool.priceRange[0], pool.priceRange[1]),
        image: categoryImages[category],
        rating: randomRating(),
        stock: randomInt(0, 500),
      });
    }
  });

  return products.slice(0, 100000);
};

const seed = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  console.log("Clearing existing products...");
  await Product.deleteMany({});
  console.log("Cleared");

  const products = generateProducts();
  console.log(`Generated ${products.length} products`);

  console.log("Inserting into MongoDB in batches...");
  const batchSize = 1000;
  for (let i = 0; i < products.length; i += batchSize) {
    await Product.insertMany(products.slice(i, i + batchSize));
    console.log(
      `Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(products.length / batchSize)}`,
    );
  }

  console.log("Seeding complete! 100,000 products in MongoDB.");
  console.log(
    "Atlas Search will auto-index them within 1-2 minutes.",
  );
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
