"use client"
import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [{
        id: 'classic',
        name: 'Classic',
        preview: "A clean and traditional resume layout with clear sections and professional typography."
    }, {
        id: 'modern',
        name: 'Modern',
        preview: "sleek design with strategic use of color and typography for a contemporary look."
    }, {
        id: 'minimal-image',
        name: 'Minimal image',
        preview: "minimal design with single image and clean typography"
    }, {
        id: 'minimal',
        name: 'Minimal',
        preview: "ultra-clean design that puts your content front and center"
    },
    ]

    return (
        <div className='relative'>
            <button
                onClick={() => setIsOpen(() => !isOpen)}
                className='flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
            </button>
            {
                isOpen && (
                    <div className='absolute z-1000 top-full mt-2  w-80 p-3 bg-white border border-gray-200 rounded-md shadow-sm'>

                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => {
                                    onChange(template.id);
                                    setIsOpen(false);
                                }}
                                className={`relative p-3 border rounded-md  w-full text-left cursor-pointer transition-all ${selectedTemplate === template.id ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-400 hover:border-gray-100 border-gray-300'}`}
                            >
                                {selectedTemplate === template.id && (
                                    <div className='absolute top-2 right-2 '>
                                        <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                            <Check className='w-3 h-3 text-white' />
                                        </div>
                                    </div>
                                )}
                                <div className='space-y-1'>
                                    <h4 className='font-medium text-gray-800'>{template.name}</h4>
                                    <div className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
                                </div>

                            </div>
                        ))}
                    </div>

                )
            }
        </div>
    )
}

export default TemplateSelector