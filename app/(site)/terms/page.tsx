import db from '@/lib/db';
import DynamicRenderer from '@/lib/renderer';

export const revalidate = 0;

export default async function TermsPage() {
  const page = await db.page.findUnique({
    where: { slug: 'terms' },
    include: {
      sections: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!page || !page.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Terms page not found.
      </div>
    );
  }

  const sections = page.sections.map((s) => ({
    id: s.id,
    type: s.type,
    order: s.order,
    content: s.content as Record<string, any>,
  }));

  return <DynamicRenderer sections={sections} />;
}
