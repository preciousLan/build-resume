"use client"
import { GraduationCap, Plus, School, Trash2 } from 'lucide-react'
import React from 'react'

const ProfessionalEducationForm = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        }

        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updatedEducation = data.filter((_, i) => i !== index)
        onChange(updatedEducation)
    }
    const UpdateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div >
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add Your education details</p>
                </div>
                <button
                    onClick={() => addEducation()}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:scale-95 transition-all disabled:opacity-50 active:scale-95' >
                    <Plus size={14} />
                    Add Education
                </button>
            </div>

            {
                data.length === 0 ? (
                    <div className='text-center py-8 text-gray-500'>
                        <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                        <p>No education added yet.</p>
                        <p className='text-sm'>Click &quot;Add Education&quot; to get started.</p>
                    </div>
                ) : (
                    <div className='space-y-6 mt-4'>
                        {data.map((education, index) => (
                            <div key={index} className=' border border-gray-200 rounded-lg space-y-3 p-4'>
                                <div className='flex justify-between items-start    '>
                                    <h4>Education #{index + 1}</h4>
                                    <button
                                        className='text-red-500 hover:text-red-700 transition-colors'
                                        onClick={() => removeEducation(index)}>
                                        <Trash2 className='size-7 bg-gray-200 rounded-full px-2' />
                                    </button>
                                </div>

                                <div className='grid md:grid-cols-2 gap-3  text-sm'>
                                    <input
                                        onChange={(e) => { UpdateEducation(index, "institution", e.target.value) }}
                                        value={education.institution || ""}
                                        type='text' placeholder='Institution Name' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />
                                    <input
                                        onChange={(e) => { UpdateEducation(index, "degree", e.target.value) }}
                                        value={education.degree || ""}
                                        type='text' placeholder='Degree (e.g., B.Sc, Masters)' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />

                                    <input
                                        onChange={(e) => { UpdateEducation(index, "field", e.target.value) }}
                                        value={education.field || ""}
                                        type='text' placeholder='Field of Study' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />

                                    <input
                                        onChange={(e) => { UpdateEducation(index, "gpa", e.target.value) }}
                                        value={education.gpa || ""}
                                        type='text' placeholder='GPA' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />

                                    <input
                                        onChange={(e) => { UpdateEducation(index, "graduation_date", e.target.value) }}
                                        value={education.graduation_date || ""}
                                        type='date' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />

                                </div>



                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ProfessionalEducationForm