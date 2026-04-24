import { prisma } from '../lib/prisma.js';



async function main() {
    const users = [
        {

            email: "ariana@prisma.io",
            name: "Ari",
            password: "120",
            posts: [
                {
                    title: "TODAYS  A",
                    content: "lorem ipsums data shit",
                    comments: [
                        {
                            content: "wtf is this",
                        }
                    ]
                }

            ],
            comments: [
                {
                    content: "comment for post from ari",
                }
            ]



        },
        {
            email: "elsa@prisma.io",
            name: "Elsa",
            password: "3333",
            posts: [
                {
                    title: "hello from elsa  A",
                    content: "lorem elsa data shit",
                    comments: [
                        {
                            content: " is this real",
                        }
                    ]
                }

            ],
            // comments: [
            //     {
            //         content: "comment for post from elsa",
            //     }
            // ]


        },
    ];
    await Promise.all(
        users.map(async (user) => {
            await prisma.user.create({
                data: {
                    password: user.password,
                    email: user.email,
                    name: user.name,
                    posts: user.posts ? {
                        create: user.posts.map(post => ({
                            title: post.title,
                            content: post.content,
                            comments: post.comments ? {
                                create: post.comments.map(comment => ({
                                    content: comment.content,
                                    author: { connect: { email: user.email } },

                                }))
                            } : undefined
                        })
                        )
                    } : undefined,
                    // comments: user.comments ? {
                    //     create: user.comments.map(comment => ({
                    //         content: comment.content
                    //     }))
                    // } : undefined


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