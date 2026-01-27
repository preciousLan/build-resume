"use client"
import { Check, CheckCheck, Palette } from 'lucide-react'
import React from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const colors = [{
        name: "blue",
        code: '#3B82F6'
    },
    {
        name: "red",
        code: '#EF4444'
    },
    {
        name: "green",
        code: '#10B981'
    },

    {
        name: "yellow",
        code: '#F59E0B'
    },
    {
        name: "purple",
        code: '#8B5CF6'
    },
    {
        name: "pink",
        code: '#EC4899'
    },
    {
        name: "teal",
        code: '#14B8A6'
    },
    {
        name: "orange",
        code: '#F97316'
    },
    {
        name: "lime",
        code: '#22C55E'
    }];

    return (
        <div
            onClick={() => setIsOpen((prev) => !prev)}
            className='relative flex items-center  gap-1 text-sm text-violet-600 bg-linear-to-br from-violet-150 to-violet-200 ring-violet-300 hover:ring transition-all px-3 py-2 rounded-lg cursor-pointer '>
            <Palette size={14} />

            <span className='max-sm:hidden'>
                Accent
            </span>
            {
                isOpen && (
                    <div className='absolute z-10 left-0 top-full mt-2 w-60 p-1 bg-white border border-gray-200 rounded-md shadow-sm grid grid-cols-4 items-center justify-center'>
                        {colors.map((color) => (
                            <div key={color.name} className='flex flex-col items-center justify-center p-1 cursor-pointer group'>
                                <button
                                    onClick={() => onChange(color.code)}
                                    className="  w-12 h-12 rounded-full hover:scale-90 hover:border-black/25 border-2 border-transparent" style={{ backgroundColor: color.code }}>
                                    {
                                        selectedColor === color.code &&
                                        <div className='text-white  flex items-center justify-center'>
                                            <Check size={18} />
                                        </div>
                                    }
                                </button>
                                <p
                                    style={{ color: color.code }}
                                >
                                    {color.name}

                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ColorPicker