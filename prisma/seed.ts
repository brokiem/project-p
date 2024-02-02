import { PrismaClient, article_type as ArticleType } from "@prisma/client";
import { Permissions } from "~/lib/Permissions";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.users.upsert({
    where: { uuid: 'b600a28a-0c1d-4b28-9f38-9d49ca07e9b6' },
    update: {},
    create: {
      uuid: 'b600a28a-0c1d-4b28-9f38-9d49ca07e9b6',
      username: 'Admin',
      email: 'admin@seed.prisma',
      password_hash: '$2b$16$VHocQGsasMgVAKhmhv4wQ.UdTwLqW3n1oLJ4ejbz1CSANNSuz9ki2',
      permissions: Permissions.ADMINISTRATOR,
    },
  });

  const newsArticle = await prisma.articles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      image_url: 'https://source.unsplash.com/random/1366x768/?landscape',
      title: 'This is a news title!',
      content: 'This is a news article!',
      author_uuid: admin.uuid,
      type: ArticleType.NEWS,
    },
  });

  const announcementArticle = await prisma.articles.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      image_url: 'https://source.unsplash.com/random/1366x768/?landscape',
      title: 'This is an announcement title!',
      content: 'This is an announcement article!',
      author_uuid: admin.uuid,
      type: ArticleType.ANNOUNCEMENT,
    },
  });

  console.log({ admin, newsArticle, announcementArticle });
}

main().catch(e => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});
