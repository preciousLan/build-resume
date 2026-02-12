"use client"

import { Plus, Trash2 } from "lucide-react"

const Projects = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",

        }

        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updatedProjects = data.filter((_, i) => i !== index)
        onChange(updatedProjects)
    }
    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }




    return (
        <div>
            <div className='flex items-center justify-between '>
                <div >
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Add Your projects </p>
                </div>
                <button
                    onClick={() => addProject()}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-green-200 text-green-800 rounded hover:scale-95 transition-all disabled:opacity-50 active:scale-95' >
                    <Plus size={14} />
                    Add Project
                </button>
            </div>
            {data.map((project, index) => (
                <div key={index} className=' border border-gray-200 rounded-lg space-y-3 p-4 mt-6'>
                    <div className='flex justify-between items-start    '>
                        <h4>Project #{index + 1}</h4>
                        <button
                            className='text-red-500 hover:text-red-700 transition-colors'
                            onClick={() => removeProject(index)}>
                            <Trash2 className='size-7 bg-gray-200 rounded-full px-2' />
                        </button>
                    </div>

                    <div className=' flex flex-col gap-3 text-sm'>
                        <input
                            onChange={(e) => { updateProject(index, "name", e.target.value) }}
                            value={project.name || ""}
                            type='text' placeholder='Project Name' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />
                        <input
                            onChange={(e) => { updateProject(index, "type", e.target.value) }}
                            value={project.type || ""}
                            type='text' placeholder='Project Type' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500' />

                        <textarea
                            rows={4}
                            onChange={(e) => { updateProject(index, "description", e.target.value) }}
                            value={project.description || ""}
                            placeholder='Description' className='border  px-3 py-2 rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 w-full resize-none' />

                    </div>



                </div>
            ))}
        </div>
    )

}

export default Projects