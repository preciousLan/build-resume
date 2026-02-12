"use client"
import { Plus, PlusIcon, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {

    const [newSkill, setNewSkill] = useState("")
    const [skills, setSkills] = useState(false);

    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            const updatedSkills = [...data, newSkill.trim()];
            onChange(updatedSkills);
            setNewSkill("");
        } else {
            setSkills(true);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    }

    const removeSkill = (skillToRemove) => {
        onChange(data.filter((_, i) => i !== skillToRemove));
    }

    return (
        <div>
            <div className=' '>
                <div >
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
                    <p className='text-sm text-gray-500'>Add your technical and soft Skills</p>
                </div>

                <div className='flex gap-3 '>

                    <input type='text' placeholder='Enter skill e.g., javascript, project management' className='w-full px-3 py-2 border border-gray-200  outline-none focus:ring focus:ring-blue-500 rounded mt-2'
                        onChange={(e) => { setNewSkill(e.target.value); setSkills(false); }}
                        value={newSkill}
                        onKeyDown={handleKeyPress} />
                    <button
                        onClick={addSkill}
                        disabled={!newSkill.trim()}
                        className='flex items-center bg-blue-500  px-3 py-2 rounded-lg text-white gap-2 disabled:opacity-50'>
                        <PlusIcon className='size-4' /> Add
                    </button>
                </div>
                {
                    skills && (
                        <div className='text-red-300 mt-2'>
                            <p>Skill already exists</p>
                        </div>
                    )
                }
                {data.length > 0 ? (
                    <div className='flex flex-wrap gap-2 mt-4'>
                        {
                            data.map((skill, index) => (
                                <div key={index} className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full  '>
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => removeSkill(index)}
                                        className=' text-blue-500 hover:text-blue-700 flex items-center gap-3'
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                ) :
                    (
                        <div>
                            <Sparkles className='w-10 h-10 mt-6 mx-auto mb-2 text-gray-300' />
                            <p>No skills added yet</p>
                            <p>Add your technical and soft skills above</p>
                        </div>
                    )}

                <div className='text-sm text-blue-400 mt-6 bg-blue-50 p-3 rounded-lg'>
                    <p><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills(programming languages, tools) and soft skills (leadership, communication)</p>
                </div>

            </div>
        </div>
    )
}

export default SkillsForm