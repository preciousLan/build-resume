"use client"
import { UploadCloud } from 'lucide-react';
import React, { useState } from 'react'

const UploadButton = ({resume, setResume}) => {

    return (
        <div>
            <label
                htmlFor='resume-input'
                className='block text-sm text-slate-700'>
                {' '}
                Select resume file
                <div className='flex flex-col items-center justify-center border-2 border-dashed gap-2 border-slate-400 rounded-md group p-4 py-10 my-4 mt-2 cursor-pointer hover:border-green-500 hover:text-green-700 transition-colors '>
                    {resume ? (
                        <p className='text-sm text-green-700'>{resume.name}</p>
                    ) : (
                        <>
                            <UploadCloud className='size-14 stroke-1 ' />
                            <p>Upload Resume</p>
                        </>
                    )}
                </div>
            </label>
            <input
                id='resume-input'
                type='file'
                accept='.pdf,'
                onChange={(e) => {
                    setResume(e.target.files[0]);
                }}
                className='hidden'
            />
        </div>
    )
}

export default UploadButton