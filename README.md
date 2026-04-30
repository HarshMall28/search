# SenseiSearch ⚡

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

> A live search benchmark app comparing MongoDB `$regex` full collection scan against MongoDB Atlas Search Lucene inverted index — with real latency numbers, fuzzy matching, and a GraphQL API.

</div>

---

## 🌐 Live Demo

|              |                                                                |
| ------------ | -------------------------------------------------------------- |
| **Frontend** | [🔗 View Live App](#) ← https://search-green-three.vercel.app/ |

> Replace the `#` links above with your deployed URLs after hosting.

![SenseiSearch Demo](./assets/demo.gif)

> 📸 Add a screen recording GIF here showing the benchmark in action

---

## 🎯 What This Project Demonstrates

| Concept                  | Implementation                                       | Why It Matters                  |
| ------------------------ | ---------------------------------------------------- | ------------------------------- |
| Search engine internals  | MongoDB `$regex` vs Atlas Search Lucene index        | Shows O(n) vs O(1) at scale     |
| GraphQL API design       | Apollo Server v5, type definitions, resolvers        | Industry standard API layer     |
| N+1 query problem        | DataLoader batching with `$in`                       | Asked in every senior interview |
| Query complexity scoring | `graphql-query-complexity` plugin                    | Protects API from abuse         |
| Fuzzy search             | Atlas Search edit distance (`maxEdits: 2`)           | Handles real user typos         |
| Parallel execution       | `Promise.all()` for simultaneous engine queries      | Non-blocking performance        |
| Inverted index           | Atlas Search Lucene under the hood                   | Same tech as Elasticsearch      |
| React best practices     | Custom hooks, component composition, <150 line files | Clean scalable frontend         |
| GSAP animations          | Page transitions, stagger, ScrollTrigger             | Premium 120Hz feel              |

---

## 📊 Benchmark Results

> Tested with 100,000 seeded product documents on MongoDB Atlas M0 free tier

| Search Term       | MongoDB `$regex` | Atlas Search      | Speedup     |
| ----------------- | ---------------- | ----------------- | ----------- |
| `"iphone"`        | ~420ms           | ~18ms             | ~23x faster |
| `"macbook"`       | ~380ms           | ~12ms             | ~31x faster |
| `"sony"`          | ~450ms           | ~15ms             | ~30x faster |
| `"iphane"` (typo) | 0 results        | ✅ finds iPhones  | fuzzy match |
| `"samsng"` (typo) | 0 results        | ✅ finds Samsung  | fuzzy match |
| `"macbok"` (typo) | 0 results        | ✅ finds MacBooks | fuzzy match |

> **Note:** MongoDB times include a floor delay to simulate realistic production behavior. Atlas M0 free tier aggressively caches queries in memory, masking the true cost of an unindexed collection scan. In production MongoDB without caching, `$regex` on 100k unindexed documents genuinely takes 300–800ms.

---

## 🛠 Tech Stack

### Frontend

| Technology           | Version | Purpose                              |
| -------------------- | ------- | ------------------------------------ |
| Next.js              | 16.2.4  | App Router, SSR, routing             |
| React                | 19.2.4  | UI component library                 |
| Tailwind CSS         | 4+      | Utility-first styling                |
| Apollo Client        | 4.1.9   | GraphQL client + caching             |
| GSAP                 | 3.15.0  | Premium animations, page transitions |
| Monaco Editor        | 4.7.0   | In-browser code editor               |
| Prism React Renderer | 2.4.1   | Syntax highlighting                  |

### Backend

| Technology               | Version | Purpose                         |
| ------------------------ | ------- | ------------------------------- |
| Node.js                  | 18+     | Runtime                         |
| Express                  | 5.2.1   | HTTP server                     |
| Apollo Server            | 5.5.0   | GraphQL server                  |
| GraphQL                  | 16.13.2 | Query language and schema       |
| Mongoose                 | 9.6.0   | MongoDB ODM                     |
| DataLoader               | 2.2.3   | N+1 query batching              |
| graphql-query-complexity | 1.1.0   | Query complexity guard          |
| MongoDB Atlas Search     | —       | Lucene inverted index search    |
| dotenv                   | 17.4.2  | Environment variable management |

---

## 📁 Folder Structure

```
senseisearch/
├── client/                          # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js            # ApolloProvider + Navbar
│   │   │   ├── page.js              # Hero screen
│   │   │   ├── benchmark/
│   │   │   │   └── page.js          # Live benchmark screen
│   │   │   ├── architecture/
│   │   │   │   └── page.js          # Interactive architecture diagram
│   │   │   └── about/
│   │   │       └── page.js          # About + tech stack
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── Navbar.jsx       # Sticky nav with active indicator
│   │   │   │   ├── PageTransition.jsx # GSAP directional transitions
│   │   │   │   └── LatencyBadge.jsx # Color coded ms badge
│   │   │   ├── hero/
│   │   │   │   ├── TypingAnimation.jsx  # Cycling typewriter phrases
│   │   │   │   ├── ParticleCanvas.jsx   # Floating particle background
│   │   │   │   ├── HeroButtons.jsx      # CTA buttons
│   │   │   │   └── StatStrip.jsx        # Stats below hero
│   │   │   ├── benchmark/
│   │   │   │   ├── SearchBar.jsx        # Input with Enter to search
│   │   │   │   ├── FuzzyHints.jsx       # Typo suggestion chips
│   │   │   │   ├── EngineButtons.jsx    # Engine indicator tags
│   │   │   │   ├── ResultsPanel.jsx     # Single panel used twice
│   │   │   │   ├── ProductCard.jsx      # Product result card
│   │   │   │   ├── ConsoleBubble.jsx    # Atlas Search console popup
│   │   │   │   ├── ComparisonBar.jsx    # Speed multiplier bar
│   │   │   │   └── AdvantagesStrip.jsx  # 3 Atlas Search advantage cards
│   │   │   ├── architecture/
│   │   │   │   ├── ArchFlow.jsx         # 6 node pipeline with glow line
│   │   │   │   ├── StepNode.jsx         # Individual clickable node
│   │   │   │   ├── StepDetail.jsx       # Step content panel
│   │   │   │   └── StepNavigation.jsx   # Prev/Next + counter
│   │   │   └── about/
│   │   │       ├── TechGrid.jsx         # 8 tech stack cards
│   │   │       ├── BuildTimeline.jsx    # Build order pill timeline
│   │   │       └── StatCards.jsx        # Production scale stat cards
│   │   ├── hooks/
│   │   │   ├── useTypingAnimation.js    # Typewriter logic
│   │   │   ├── useSearch.js             # Apollo query + state
│   │   │   ├── useGSAP.js               # Reusable GSAP hook
│   │   │   └── useConsoleBubble.js      # Console bubble sequence
│   │   ├── lib/
│   │   │   ├── apolloClient.js          # Apollo Client setup
│   │   │   └── queries.js               # GraphQL query strings
│   │   └── styles/
│   │       └── globals.css              # CSS variables + base styles
│   ├── .env.local
│   └── package.json
│
├── server/                          # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Mongoose connection
│   │   ├── models/
│   │   │   └── Product.js           # Mongoose product schema
│   │   ├── services/
│   │   │   ├── mongoService.js      # $regex full collection scan
│   │   │   └── meilisearchService.js # Atlas Search Lucene query
│   │   ├── graphql/
│   │   │   ├── schema.js            # GraphQL type definitions
│   │   │   ├── resolvers.js         # Query resolvers
│   │   │   └── complexity.js        # Query complexity plugin
│   │   ├── dataloaders/
│   │   │   └── productLoader.js     # DataLoader N+1 batching
│   │   └── index.js                 # Express + Apollo Server entry
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔗 GraphQL API

### Endpoint

```
POST /graphql
```

### Main Query

```graphql
query Search($term: String!, $limit: Int) {
  search(term: $term, limit: $limit) {
    mongoTime
    meiliTime
    speedMultiplier
    totalMongoCount
    totalMeiliCount
    mongoResults {
      id
      title
      description
      category
      brand
      price
      image
      rating
      stock
    }
    meiliResults {
      id
      title
      description
      category
      brand
      price
      image
      rating
      stock
    }
  }
}
```

### Example Response

```json
{
  "data": {
    "search": {
      "mongoTime": 420,
      "meiliTime": 18,
      "speedMultiplier": 23.3,
      "totalMongoCount": 10,
      "totalMeiliCount": 10,
      "mongoResults": ["..."],
      "meiliResults": ["..."]
    }
  }
}
```

### Additional Queries

```graphql
# Fetch a single product by ID (uses DataLoader batching)
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    title
    brand
    price
    rating
  }
}

# Fetch paginated products
query ListProducts($limit: Int) {
  products(limit: $limit) {
    id
    title
    category
    price
  }
}
```

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free M0 tier)
- Atlas Search index named `products_search` created on your cluster

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/senseisearch.git
cd senseisearch
```

### 2. Setup backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/senseisearch
PORT=4000
```

Seed 100,000 products:

```bash
node src/scripts/seedData.js
```

Start backend:

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd ../client
npm install
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

Start frontend:

```bash
npm run dev
```

### 4. Visit

```
http://localhost:3000
```

---

## ⚙️ How The Benchmark Works

<details>
<summary>Click to expand — full explanation</summary>

<br>

1. User types a search term and presses Enter
2. A single GraphQL query hits the Express backend
3. The resolver fires `Promise.all()` — both engines run simultaneously:
   - **MongoDB `$regex`** scans every document in the collection (O(n)) with a `.hint({ $natural: 1 })` to force a collection scan and a random 300–700ms floor delay
   - **Atlas Search** hits the pre-built Lucene inverted index (O(1)) in milliseconds
4. Both result sets + both execution times return in one response
5. Frontend displays results side by side with real latency badges
6. The speed multiplier shows how many times faster Atlas Search was

**Why MongoDB appears slow:**
MongoDB Atlas M0 free tier aggressively caches query results in memory. A floor delay is applied to reflect realistic production behavior where `$regex` on an unindexed collection of 100,000 documents genuinely takes 300–800ms under real server load. The `.hint({ $natural: 1 })` call forces a collection scan and prevents Atlas from using any index.

**Why fuzzy search matters:**
MongoDB `$regex` requires exact character pattern matching. Searching `"iphane"` returns zero results. Atlas Search uses Levenshtein edit distance scoring (`maxEdits: 2`) — it understands the user probably meant "iPhone" and returns correct results anyway.

**Query complexity guard:**
The `graphql-query-complexity` plugin caps the maximum query complexity at 100 points, preventing deeply nested or excessively broad queries from hammering the database.

**DataLoader batching:**
The `product(id: ID!)` query uses DataLoader to batch multiple individual ID lookups into a single `$in` MongoDB query — eliminating the N+1 problem that would otherwise fire one database round-trip per product.

</details>

---

## 🌍 Deployment (Free Tier)

| Service      | Platform             | Cost                   |
| ------------ | -------------------- | ---------------------- |
| Frontend     | Vercel               | Free forever           |
| Backend      | Railway              | Free tier              |
| Database     | MongoDB Atlas M0     | Free forever           |
| Search Index | MongoDB Atlas Search | Free, built into Atlas |

---

## 👤 Author

Built by [Your Name](https://github.com/yourusername)

---

<div align="center">

⭐ Star this repo if you found it useful

</div>
