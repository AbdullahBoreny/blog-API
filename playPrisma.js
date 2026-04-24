import { prisma } from './ORM/lib/prisma.js';

const user = await prisma.user.findFirst({
    where: {
        email: {
            contains: "els"
        },
        posts: {
            some: {
                content: { contains: "zen" },

            }
        }


    },
    take: 10,
    include: { posts: true }
});
console.log(user);
