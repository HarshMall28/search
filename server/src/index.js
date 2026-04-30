import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDB } from "./config/db.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { getComplexityPlugin } from "./graphql/complexity.js";
import { createProductLoader } from "./dataloaders/productLoader.js";

const PORT = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    getComplexityPlugin(),
  ],
});

await server.start();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5500",
      "https://search-green-three.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/graphql", async (req, res, next) => {
  try {
    const headers = new Map();
    for (const [key, val] of Object.entries(req.headers)) {
      if (val !== undefined) {
        headers.set(key, Array.isArray(val) ? val.join(", ") : val);
      }
    }

    const result = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: req.method.toUpperCase(),
        headers,
        body: req.body,
        search: req.url.includes("?")
          ? req.url.slice(req.url.indexOf("?"))
          : "",
      },
      context: async () => ({ productLoader: createProductLoader() }),
    });

    for (const [key, value] of result.headers) {
      res.setHeader(key, value);
    }
    res.status(result.status ?? 200);

    if (result.body.kind === "complete") {
      res.send(result.body.string);
    } else {
      for await (const chunk of result.body.asyncIterator) {
        res.write(chunk);
      }
      res.end();
    }
  } catch (err) {
    next(err);
  }
});

await connectDB();

await new Promise((resolve) =>
  httpServer.listen({ port: PORT }, resolve),
);
console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
