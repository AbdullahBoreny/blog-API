import { prisma } from '../lib/prisma.js';

async function main() {

    const person = await prisma.session.findMany();
    console.log(person);

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