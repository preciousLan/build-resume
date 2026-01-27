"use client"
import { Mail, Phone, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const fields = [
        { key: 'full_name', label: 'Full Name', type: 'text', icon: User, required: true },
        { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
        { key: 'phone', label: 'Phone Number', type: 'tel', icon: Phone },
        { key: 'location', label: 'Location', type: 'text', icon: User },
        { key: 'profession', label: 'Profession', type: 'text', icon: User },
        { key: 'linkedin', label: 'LinkedIn Profile', type: 'text', icon: User },
    ]

    // Handle individual field change
    const handleChange = (field, value) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get started with your personal info</p>

            {/* Image upload */}
            <div className='flex items-center gap-2 mt-4'>
                <label className='cursor-pointer'>
                    {data.image && (typeof data.image === "string" || data.image instanceof File) ? (
                        <Image
                            src={
                                typeof data.image === "string"
                                    ? data.image          // URL from DB
                                    : URL.createObjectURL(data.image) // uploaded File
                            }
                            alt='user-image'
                            width={64}
                            height={64}
                            className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80'
                        />
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-600'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            Upload User Image
                        </div>
                    )}

                    <input
                        type='file'
                        accept='image/jpeg, image/png'
                        className='hidden'
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>

                {data.image && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer gap-3'>
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={removeBackground}
                                onChange={() => setRemoveBackground(prev => !prev)}
                            />
                            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200'></div>
                            <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                        </label>
                    </div>
                )}
            </div>

            {/* Text fields */}
            <div className='mt-6'>
                {fields.map(field => {
                    const Icon = field.icon
                    return (
                        <div key={field.key} className='space-y-1 mt-4'>
                            <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                                <Icon className='size-4' />
                                {field.label}
                                {field.required && <span className='text-red-500'>*</span>}
                            </label>
                            <input
                                type={field.type}
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                                value={data[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none'
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PersonalInfoForm
