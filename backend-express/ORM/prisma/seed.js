import { prisma } from "../lib/prisma.js";
import { hash } from "bcryptjs";
async function main() {
  console.log("Emptying database...");
  // Clear existing data to prevent unique constraint errors on re-run
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  

  console.log("Seeding data...");

  // 1. Create a User with an Account
  
  const alice = await prisma.user.create({
    data: {
      name: "Alice Smith",
      accounts: {
        create: {
          email: "alice@example.com",
          password: "123",
        },
      },
      posts: {
        create: [
          {
            title: "My First Prisma Post",
            content: "Prisma makes database management a breeze!",
            published: true,
          },
          {
            title: "Scaling Postgres",
            content: "Let's talk about indices and optimization.",
            published: true,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Jones",
      accounts: {
        create: {
          email: "bob@example.com",
          password: "123",
        },
      },
    },
  });

  // 2. Fetch one of Alice's posts to add comments to
  const alicePost = await prisma.post.findFirst({
    where: { authorId: alice.id },
  });

  if (alicePost) {
    // 3. Create a Top-Level Comment
    const parentComment = await prisma.comment.create({
      data: {
        content: "Great post, Alice!",
        authorId: bob.id,
        postId: alicePost.id,
      },
    });

    // 4. Create a Nested Reply (Thread)
    await prisma.comment.create({
      data: {
        content: "Thanks Bob! Glad you liked it.",
        authorId: alice.id,
        postId: alicePost.id,
        parentId: parentComment.id, // Linking the reply
      },
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });