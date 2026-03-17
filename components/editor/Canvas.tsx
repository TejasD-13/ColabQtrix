'use client';

import React from 'react';
import { useEditor } from './EditorProvider';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DynamicRenderer, { SectionData } from '@/lib/renderer';
import { GripHorizontal, Trash2, ArrowDownToLine } from 'lucide-react';

export default function Canvas() {
    const { sections, selectedSectionId, setSelectedSectionId, setSections } = useEditor();

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await fetch(`/api/sections/${id}`, { method: 'DELETE' });
            setSections((prev) => prev.filter((s) => s.id !== id));
            if (selectedSectionId === id) setSelectedSectionId(null);
        } catch (err) {
            console.error('Failed to delete section', err);
        }
    };

    return (
        <div className="w-full flex justify-center pb-32 min-h-full">
            <div className="w-full max-w-[1400px] bg-white shadow-xl min-h-[800px] transition-all relative border border-gray-200">
                
                {/* Dotted Grid Background */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                />

                {sections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 relative z-10">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                            <ArrowDownToLine size={24} className="text-gray-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700">Canvas is empty</p>
                            <p className="text-xs text-gray-500 mt-1">Select a component from the left panel to begin building.</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col">
                        {sections.map((section) => (
                            <SortableSectionItem
                                key={section.id}
                                section={section}
                                isSelected={selectedSectionId === section.id}
                                onSelect={() => setSelectedSectionId(section.id)}
                                onDelete={(e) => handleDelete(e, section.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function SortableSectionItem({
    section,
    isSelected,
    onSelect,
    onDelete,
}: {
    section: SectionData;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: (e: React.MouseEvent) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group cursor-pointer transition-all duration-150 ${
                isSelected
                    ? 'ring-2 ring-blue-500 z-40'
                    : 'hover:ring-1 hover:ring-blue-300 z-10'
                } ${isDragging ? 'opacity-50 scale-[0.99] shadow-2xl' : 'opacity-100'}`}
            onClick={onSelect}
        >
            {/* Editor Controls Overlay - technical style */}
            <div className={`absolute top-0 left-0 w-full h-0 z-50 flex items-start justify-center transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                
                {/* Top Center Drag Handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className="absolute -top-3 px-3 py-1 bg-blue-500 text-white rounded-t-none rounded-b-md cursor-grab active:cursor-grabbing shadow-sm flex items-center justify-center"
                    title="Drag to reorder"
                >
                    <GripHorizontal size={14} className="opacity-80" />
                </div>

                {/* Top Right Controls */}
                <div className="absolute top-2 right-2 flex gap-1">
                    <div className="px-2 py-1 bg-blue-500 text-white text-[10px] font-bold tracking-widest uppercase rounded shadow-sm hidden md:block">
                        {section.type.replace(/_/g, ' ')}
                    </div>
                    <button
                        onClick={onDelete}
                        className="p-1 min-w-[28px] bg-white border border-gray-200 shadow-sm rounded text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center"
                        title="Delete Element"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {/* If selected, add structural border elements */}
            {isSelected && (
                <>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border-2 border-blue-500 z-50 pointer-events-none" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-blue-500 z-50 pointer-events-none" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border-2 border-blue-500 z-50 pointer-events-none" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border-2 border-blue-500 z-50 pointer-events-none" />
                </>
            )}

            {/* Render Actual Component */}
            <div className={`pointer-events-none relative z-10 w-full overflow-hidden transition-all duration-200 ${isDragging ? 'rounded' : ''} bg-white`}>
                <DynamicRenderer sections={[section]} />
            </div>

            {/* Selection Overlay Tint */}
            {isSelected && !isDragging && (
                <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none z-20" />
            )}
        </div>
    );
}
