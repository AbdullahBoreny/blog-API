import { prisma } from '../lib/prisma.js';



async function main() {
    const users = [
        {

            email: "ariana@prisma.io",
            name: "Ari",
            password: "120"

        },
        {
            email: "elsa@prisma.io",
            name: "Elsa",
            password: "123"

        },
    ];
    await Promise.all(
        users.map(async (user) => {
            await prisma.user.create({
                data: {
                    password: user.password,
                    email: user.email,
                    name: user.name,
                    posts: {
                        create: {
                            title: "abd",
                            content: "zengi",

                        }
                    },
                    comments: {
                        create: {
                            content: "hello",

                        }
                    }

                },
                include: {
                    posts: true,
                    comments: true
                }

            });

        }),

    );
    console.log(users);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });