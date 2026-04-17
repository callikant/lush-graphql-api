import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { prisma } from "./prisma";

const yoga = createYoga({
  schema,
  context: () => ({ prisma }),
  graphqlEndpoint: "/",
  landingPage: false,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("GraphQL running at http://localhost:4000/graphql");
});