import React from 'react'

const ProgressBar = ({ activeSectionIndex, sections }) => {
    return (
        <>
            <hr className=" absolute top-0 left-0 right-0  border-gray-200 border-2 "></hr>
            <hr className=" absolute top-0 left-0   bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000 h-1  "
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}></hr>
        </>

    )
}

export default ProgressBar