import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

console.log('Clearing database and resetting IDs...');
await prisma.$queryRaw`TRUNCATE "User" RESTART IDENTITY CASCADE;`;
console.log('Database cleared!');

const usersData = [
    { username: 'ali', email: 'alice@test.com', password: 'alice1234' },
    { username: 'bob', email: 'bob@example.com', password: 'bob1234' },
    { username: 'cha', email: 'charlie@demo.com', password: 'charlie1234' },
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

const channels = [];
for (const user of users) {
    const channel1 = await prisma.channel.create({
        data: {
            desc: `This is the first channel belonging to ${user.username}.`,
            name: `${user.username}'s awesome channel!`,
            user_id: user.id,
        },
    });
    const channel2 = await prisma.channel.create({
        data: {
            desc: `This is an even better channel belonging to ${user.username}. Shocking, I know`,
            name: `${user.username}'s even more awesome channel!`,
            user_id: user.id,
        },
    });
    channels.push(channel1);
    channels.push(channel2);
}



const videos = [];
for (const channel of channels) {
    const video = await prisma.video.create({
        data: {
            title: `This is the first video belonging to ${channel.name}.`,
            desc: "it's really freaking cool",
            channel_id: channel.id
        },
    });
    videos.push(video);
}
console.log(JSON.stringify(videos, null, 2));
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
for (const video of videos) {
    const rating = getRandomInt(100);
    const comment_poster = getRandomInt(3);
    await prisma.comment.create({
        data: {
            content: `I'd give this video a ${rating} out of 100!`,
            video_id: video.id,
            user_id: comment_poster
        }

    })
}

console.log("database seeded with 3 test users, 2 channels for each user, one video for each channel, and one comment for each video.");

await prisma.$disconnect();