import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function extractYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return (match && match[1]) ? match[1] : url.trim();
}

async function main() {
  const videos = await prisma.video.findMany();
  for (const v of videos) {
    if (v.youtubeId.includes('http')) {
      const fixedId = extractYouTubeId(v.youtubeId);
      console.log(`Fixing ${v.youtubeId} -> ${fixedId}`);
      await prisma.video.update({
        where: { id: v.id },
        data: { youtubeId: fixedId }
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
