'use client';

import React, { useState } from 'react';
import { SectionData } from '@/lib/renderer';
import { EditorProvider, useEditor } from './EditorProvider';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import LeftPanel from './LeftPanel';
import Canvas from './Canvas';
import RightPanel from './RightPanel';
import { MonitorPlay, ChevronLeft, Globe } from 'lucide-react';

export default function EditorClient({
    initialSections,
    pageId,
}: {
    initialSections: SectionData[];
    pageId: number;
}) {
    return (
        <EditorProvider initialSections={initialSections} pageId={pageId}>
            <div className="flex flex-col h-screen w-full bg-[#fafafa] overflow-hidden">
                <EditorTopBar />
                <EditorLayout />
            </div>
        </EditorProvider>
    );
}

function EditorTopBar() {
    return (
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-50">
            
            {/* Left: Branding & Back Navigation */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => window.location.href = '/admin'}
                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
                    title="Back to Dashboard"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="h-4 w-[1px] bg-gray-300" />
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">CQ</span>
                    </span>
                    <span className="font-semibold text-gray-800 text-[13px] tracking-wide">ColabQtrix Builder</span>
                </div>
            </div>

            {/* Center: Context/Page Name */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">Editing:</span>
                <span className="text-[12px] font-semibold text-gray-800">Landing Page</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                    <MonitorPlay size={14} />
                    Preview
                </button>
                <div className="h-4 w-[1px] bg-gray-200" />
                <button 
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
                    onClick={() => alert("Changes auto-save. This button could trigger a manual deploy/publish event.")}
                >
                    <Globe size={14} />
                    Publish live
                </button>
            </div>

        </div>
    )
}

function EditorLayout() {
    const { sections, setSections } = useEditor();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                // Reassign order properties based on new index
                const updatedItems = newItems.map((item, index) => ({
                    ...item,
                    order: index + 1,
                }));

                // Fire API to save reorder
                saveReorder(updatedItems);
                return updatedItems;
            });
        }
    };

    const saveReorder = async (updatedSections: SectionData[]) => {
        try {
            await fetch('/api/sections/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sections: updatedSections.map((s) => ({ id: s.id, order: s.order })),
                }),
            });
        } catch (e) {
            console.error('Failed to save order', e);
        }
    };

    return (
        <div className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden">
            {/* Left Panel - Component Library */}
            <LeftPanel />

            {/* Center Canvas - Drag and Drop Area */}
            <div className="flex-1 bg-[#f3f4f6] relative overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto px-4 py-8 lg:px-8 custom-scrollbar">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sections.map((s) => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Canvas />
                        </SortableContext>
                    </DndContext>
                </div>
            </div>

            {/* Right Panel - Properties */}
            <RightPanel />
        </div>
    );
}
