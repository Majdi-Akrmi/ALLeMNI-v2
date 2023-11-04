const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Programming languages" },
                { name: "Cloud Computing" },
                { name: "Data" },
                { name: "Databases" },
                { name: "Web Tech" },
            ]
        });

        console.log("Success");

    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();