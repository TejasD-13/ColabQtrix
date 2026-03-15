import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

/**
 * PUT /api/sections/reorder — Bulk reorder sections by updating the order column.
 *
 * Expected body: { updates: [{ id: number, order: number }] }
 *
 * Stub for the future Wix-style drag-and-drop editor.
 * When a user drags sections in the editor, this endpoint will be called
 * to persist the new order without reloading the page.
 */
export async function PUT(request: NextRequest) {
  try {
    const { updates } = await request.json() as {
      updates: { id: number; order: number }[];
    };

    // Batch update all orders in a transaction
    await db.$transaction(
      updates.map(({ id, order }) =>
        db.section.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json({ message: `Reordered ${updates.length} sections` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
  }
}
