'use client';

import React, { useState, useEffect } from 'react';
import { useEditor } from './EditorProvider';
import { Code, Layout, Settings2 } from 'lucide-react';

export default function RightPanel() {
    const { sections, selectedSectionId, setSections } = useEditor();
    const selectedSection = sections.find((s) => s.id === selectedSectionId);

    const [localContent, setLocalContent] = useState<Record<string, any>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [rawMode, setRawMode] = useState(false);
    const [rawText, setRawText] = useState('');

    useEffect(() => {
        if (selectedSection) {
            setLocalContent(selectedSection.content);
            setRawText(JSON.stringify(selectedSection.content, null, 2));
        } else {
            setLocalContent({});
            setRawText('');
        }
    }, [selectedSectionId, selectedSection?.content]);

    if (!selectedSection) {
        return (
            <div className="w-[320px] bg-white border-l border-gray-200 h-full flex flex-col pt-20 items-center justify-start p-6 text-center text-sm text-gray-400 shrink-0 z-10">
                <Settings2 size={32} className="text-gray-200 mb-4" />
                <p>Select an element on the canvas to edit its properties.</p>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const parsedContent = rawMode ? JSON.parse(rawText) : localContent;

            await fetch(`/api/sections/${selectedSection.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: parsedContent }),
            });

            setSections((prev) =>
                prev.map((s) => (s.id === selectedSection.id ? { ...s, content: parsedContent } : s))
            );
        } catch (e) {
            alert('Invalid JSON! Please check your syntax.');
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFieldChange = (path: string[], value: any) => {
        setLocalContent((prev) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current[path[i]] = Array.isArray(current[path[i]]) ? [...current[path[i]]] : { ...current[path[i]] };
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return next;
        });
    };

    const renderField = (key: string, value: any, path: string[]) => {
        if (typeof value === 'string') {
            const isLongText = key.toLowerCase().includes('description') || key.toLowerCase().includes('quote') || value.length > 50 || key.toLowerCase().includes('html');
            return (
                <div key={path.join('.')} className="mb-3">
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isLongText ? (
                        <textarea
                            className="w-full text-[12px] bg-[#f9f9f9] border border-gray-200 p-2 rounded focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y min-h-[80px]"
                            value={value}
                            onChange={(e) => handleFieldChange(path, e.target.value)}
                        />
                    ) : (
                        <input
                            type="text"
                            className="w-full text-[12px] bg-[#f9f9f9] border border-gray-200 px-2 py-1.5 rounded focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={value}
                            onChange={(e) => handleFieldChange(path, e.target.value)}
                        />
                    )}
                </div>
            );
        }

        if (typeof value === 'number') {
            return (
                <div key={path.join('.')} className="mb-3">
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">{key}</label>
                    <input
                        type="number"
                        className="w-full text-[12px] bg-[#f9f9f9] border border-gray-200 px-2 py-1.5 rounded focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={value}
                        onChange={(e) => handleFieldChange(path, parseFloat(e.target.value))}
                    />
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={path.join('.')} className="mb-4">
                    <label className="flex items-center justify-between text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-2 border-y border-gray-200 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                        <span className="text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded uppercase">List Item</span>
                    </label>
                    <div className="p-3 border-b border-gray-200 border-x bg-[#fcfcfc]">
                        {value.map((item, index) => (
                            <div key={index} className="pl-3 border-l-2 border-gray-300 mb-4 last:mb-0 relative">
                                <div className="text-[10px] font-semibold text-gray-400 mb-2 uppercase tracking-wide">Item {index + 1}</div>
                                <div className="flex flex-col gap-1">
                                    {Object.entries(item).map(([k, v]) => renderField(k, v, [...path, index.toString(), k]))}
                                </div>
                            </div>
                        ))}
                        <div className="text-[10px] text-gray-500 font-medium mt-3 bg-gray-100 p-2 rounded text-center">
                            Switch to Code Mode to add/remove items.
                        </div>
                    </div>
                </div>
            );
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div key={path.join('.')} className="mb-4">
                    <div className="text-[11px] font-bold text-gray-700 bg-gray-100/50 px-3 py-1.5 rounded-t border-x border-t border-gray-200 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="p-3 border border-gray-200 rounded-b bg-white flex flex-col gap-1">
                        {Object.entries(value).map(([k, v]) => renderField(k, v, [...path, k]))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="w-[320px] bg-white border-l border-gray-200 h-full flex flex-col shrink-0 z-20">
            {/* Header / Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
                <button 
                    onClick={() => {
                        if (rawMode) {
                            try {
                                const parsed = JSON.parse(rawText);
                                setLocalContent(parsed);
                                setRawMode(false);
                            } catch (e) {
                                alert('Invalid JSON!');
                            }
                        }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-semibold tracking-wide uppercase transition-colors ${!rawMode ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100 border-b-2 border-transparent'}`}
                >
                    <Layout size={14} />
                    Settings
                </button>
                <button 
                    onClick={() => {
                        if (!rawMode) {
                            setRawText(JSON.stringify(localContent, null, 2));
                            setRawMode(true);
                        }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-semibold tracking-wide uppercase transition-colors ${rawMode ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100 border-b-2 border-transparent'}`}
                >
                    <Code size={14} />
                    Code
                </button>
            </div>

            {/* Context Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-white shrink-0">
                <h2 className="capitalize text-[14px] font-bold text-gray-800">
                    {selectedSection.type.replace(/_/g, ' ')} Element
                </h2>
                <div className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {selectedSection.id}</div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-5 bg-white custom-scrollbar">
                {rawMode ? (
                    <div className="h-full flex flex-col min-h-[400px]">
                        <p className="text-[10px] text-amber-600 mb-3 bg-amber-50 p-2 border border-amber-200 rounded">
                            Valid JSON syntax required.
                        </p>
                        <textarea
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            className="flex-1 w-full p-4 text-[11px] leading-relaxed font-mono bg-[#1e1e1e] text-[#d4d4d4] rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col pb-8">
                        {Object.entries(localContent).map(([k, v]) => renderField(k, v, [k]))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-white shrink-0 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full py-2 bg-blue-600 text-white text-[12px] font-semibold rounded shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        'Save Properties'
                    )}
                </button>
            </div>
        </div>
    );
}
