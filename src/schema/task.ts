import { builder } from "./builder";
import { z } from "zod";

const idSchema=z.string().min(1,"Invalid id");
const titleSchema=z
  .string()
  .min(1,"Title cannot be empty")
  .max(200,"Title too long");

// Task type
builder.objectType("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    completed: t.exposeBoolean("completed"),
    createdAt: t.expose("createdAt", { type: "String" }),
    updatedAt: t.expose("updatedAt", { type: "String" }),
  }),
});

// Queries
builder.queryType({
  fields: (t) => ({
    tasks: t.field({
      type: ["Task"],
      resolve: (_, __, ctx) => {
        return ctx.prisma.task.findMany();
      },
    }),

    task: t.field({
      type: "Task",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const parsed=idSchema.safeParse(args.id);
        if (!parsed.success){
          throw new Error("Invalid id");
        }

        const task = await ctx.prisma.task.findUnique({
          where: { id: args.id },
        });

        if (!task) {
          throw new Error("Task not found");
        }

        return task;
      },
    }),
  }),
});


// Mutations
builder.mutationType({
  fields: (t) => ({
    addTask: t.field({
      type: "Task",
      args: {
        title: t.arg.string({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const parsed=titleSchema.safeParse(args.title);

        if (!parsed.success) {
          throw new Error("Invalid title");
        }

        return ctx.prisma.task.create({
          data: {
            title: args.title.trim(),
          },
        });
      },
    }),

    toggleTask: t.field({
      type: "Task",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const parsed=idSchema.safeParse(args.id);

        if (!parsed.success){
          throw new Error("Invalid id");
        }

        const task = await ctx.prisma.task.findUnique({
          where: { id: args.id },
        });

        if (!task) {
          throw new Error("Task not found");
        }

        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            completed: !task.completed,
          },
        });
      },
    }),

    deleteTask: t.field({
      type: "Task",
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (_, args, ctx) => {
        const parsed=idSchema.safeParse(args.id);
        if (!parsed.success){
          throw new Error("Invalid id");
        }
        const task = await ctx.prisma.task.findUnique({
          where: { id: args.id },
        });

        if (!task) {
          throw new Error("Task not found");
        }

        return ctx.prisma.task.delete({
          where: { id: args.id },
        });
      },
    }),
  }),
});