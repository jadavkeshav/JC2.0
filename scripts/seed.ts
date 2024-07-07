const {PrismaClient} = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "UPSC"},
                {name: "UI/UX"},
                {name: "Android Development"},
                {name: "Programming Languages"},
                {name: "Web Development"},
                {name: "Data Science"},
                {name: "Cyber Security"},
                {name: "Machine Learning"},
                {name: "Data Analytics"},
                {name: "Artificial Intelligence"},
                {name: "Cloud Computing"},
                {name: "Operating System"},
                {name: "Software Development"},
                {name: "Data Structures"},
                {name: "Computer Networks"},
                {name: "Operating Systems"},
                {name: "Computer Graphics"},
                {name: "Computer Architecture"},
                {name: "Software Testing"},
                {name: "Computer Security"},
                {name: "Computer Hardware"},
                {name: "Full Stack"},
            ]
        });
        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categorues : ", error);
    }
    finally{
        await database.$disconnect();
    }
}

main();