import React from 'react'

const Title = ({title, description}) => {
    return (
        <div><div className="flex items-center gap-2  border border-gray-200 rounded-full px-4 py-2 w-fit mx-auto mb-5" >
            <div className="relative flex size-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75 animate-ping duration-300"></span>
                <span className="relative inline-flex size-2 rounded-full bg-violet-600"></span>
            </div>
            <span className='font-bold'>{title}</span>
        </div>
            <p className='text-center w-full max-w-150 mx-auto mb-10  text-slate-500 text-sm'>{description}</p></div>
    )
}

export default Title