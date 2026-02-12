"use client"
import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../_configs/api'
import toast from 'react-hot-toast'

const ProfessionalExperienceForm = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth);
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_Date: "",
            end_Date: "",
            description: "",
            is_current: false
        }

        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index)
        onChange(updatedExperience)
    }
    const UpdateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setGeneratingIndex(index);
        const experience = data[index];
        const prompt = `enhance this Job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`
        try {
            const { data } = await api.post("/api/ai/enhance-job-desc", { userContent: prompt }, { headers: { Authorization: token } });

            UpdateExperience(index, "description", data.enhancedContent)
        } catch (error) {
            toast.error("cannot perform operation")
        }
    }




    return (
        <div className='space-y-6'>

            <div className='flex items-center justify-between'>
                <div >
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add Your Job experience</p>
                </div>
                <button
                    onClick={() => addExperience()}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:scale-95 transition-all disabled:opacity-50 active:scale-95' >
                    <Plus size={14} />
                    Add Experience
                </button>
            </div>

            {
                data.length === 0 ? (
                    <div className='text-center py-8 text-gray-500'>
                        <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                        <p>No work experience added yet.</p>
                        <p className='text-sm'>Click &quot;Add Experience&quot; to get started.</p>
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {data.map((experience, index) => (
                            <div key={index} className=' border border-gray-200 rounded-lg space-y-3 p-4'>
                                <div className='flex justify-between items-start    '>
                                    <h4>Experience #{index + 1}</h4>
                                    <button
                                        className='text-red-500 hover:text-red-700 transition-colors'
                                        onClick={() => removeExperience(index)}>
                                        <Trash2 className='size-7 bg-gray-200 rounded-full px-2' />
                                    </button>
                                </div>

                                <div className='grid md:grid-cols-2 gap-3 '>
                                    <input value={experience.company || ""}
                                        onChange={(e) => UpdateExperience(index, "company", e.target.value)}
                                        type='text' placeholder='Company Name' className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />

                                    <input value={experience.position || ""}
                                        onChange={(e) => UpdateExperience(index, "position", e.target.value)}
                                        type='text' placeholder='Job Title' className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />

                                    <input value={experience.start_Date || ""}
                                        onChange={(e) => UpdateExperience(index, "start_Date", e.target.value)}
                                        type='date' className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />

                                    <input value={experience.end_Date || ""}
                                        onChange={(e) => UpdateExperience(index, "end_Date", e.target.value)}
                                        type='date'
                                        disabled={experience.is_current}
                                        className='border border-gray-300 outline-0 focus:ring focus:ring-blue-500 px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' />

                                </div>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        checked={experience.is_current || false}
                                        onChange={(e) => { UpdateExperience(index, "is_current", e.target.checked ? true : false) }}
                                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                    <span className='text-sm text-gray-700'>Currently working here</span>
                                </label>

                                <div className='space-y-2'>
                                    <div className='flex justify-between items-center'>
                                        <label className='text-sm font-medium text-gray-700'> Job Description</label>
                                        <button
                                            onClick={() => { generateDescription(index) }}
                                            disabled={generatingIndex === index || !experience.position || !experience.company}
                                            className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 '>
                                            {generatingIndex === index ? <Loader2 /> : (

                                                <Sparkles className='w-3 h-3' />
                                            )}
                                            Enhance with AI
                                        </button>
                                    </div>

                                    <div>
                                        <textarea
                                            value={experience.description || ""}
                                            onChange={(e) => UpdateExperience(index, "description", e.target.value)}
                                            rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300' placeholder='Describe Your Key responsiblilities and achievements' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default ProfessionalExperienceForm