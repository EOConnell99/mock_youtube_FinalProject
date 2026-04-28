import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

console.log('Clearing database and resetting IDs...');
await prisma.$queryRaw`TRUNCATE "User" RESTART IDENTITY CASCADE;`;
console.log('Database cleared!');

const usersData = [
    { username: 'ali', email: 'alice@test.com', password: 'alice1234' },
    { username: 'bob', email: 'bob@example.com', password: 'bob1234' },
    { username: 'cha', email: 'charlie@demo.com', password: 'charlie1234', role: 'ADMIN' },
];

const users = [];

for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
        data: {
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        },
    });

    users.push(user);
}




console.log("database seeded with 3 test users");

await prisma.$disconnect();