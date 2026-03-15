import db from '@/lib/db';
import DynamicRenderer from '@/lib/renderer';

export const revalidate = 0; // Always fresh from DB

export default async function PrivacyPage() {
  // Fetch the privacy page
  const page = await db.page.findUnique({
    where: { slug: 'privacy' },
    include: {
      sections: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!page || !page.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>Page not found or not published.</p>
      </div>
    );
  }

  // Map Prisma sections to the renderer format
  const sections = page.sections.map((s) => ({
    id: s.id,
    type: s.type,
    order: s.order,
    content: s.content as Record<string, any>,
  }));

  return <DynamicRenderer sections={sections} />;
}
