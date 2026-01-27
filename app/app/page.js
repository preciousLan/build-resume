'use client';
import { dummyResumeData } from '@/public/assets';
import {
	FilePenIcon,
	PencilIcon,
	PlusIcon,
	TrashIcon,
	UploadCloudIcon,
	XIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UploadButton from '../_components/UploadButton';

const Page = () => {
	const router = useRouter();
	const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a'];
	const [allResumes, setAllResume] = useState([]);
	const [showCreateResume, setShowCreateResume] = useState(false);
	const [showUploadResume, setShowUploadResume] = useState(false);
	const [title, setTitle] = useState('');
	const [editResumeId, setEditResumeId] = useState('');

	function createResume(e) {
		e.preventDefault();
		setShowCreateResume(false);
		router.push('/app/builder/787979');
	}

	function uploadResume(e) {
		e.preventDefault();
		setShowUploadResume(false);
		router.push('/app/builder/787979');
	}

	function editTitle(e) {
		e.preventDefault();
		setEditResumeId('');
	}

	async function deleteResume(resumeId) {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this resume?',
		);
		if (confirmDelete) {
			setAllResume((prevResumes) =>
				prevResumes.filter((resume) => resume._id !== resumeId),
			);
		}
	}

	useEffect(() => {
		async function loadAllResumes() {
			setAllResume(dummyResumeData);
		}
		loadAllResumes();
	}, []);

	return (
		<div>
			<div className=' max-w-7xl mx-auto px-4 py-8'>
				<p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to bg-slate-700 bg-clip-text text-transparent sm:hidden'>
					Welcome Joe
				</p>
				<div className='flex gap-4'>
					<button
						onClick={() => setShowCreateResume(true)}
						className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer '>
						<PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-r from-indigo-400 to-indigo-500 text-white rounded-full' />
						<p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
							Create Resume
						</p>
					</button>
					<button
						onClick={() => {
							setShowUploadResume(true);
						}}
						className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer '>
						<UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-r from-purple-300 to-purple-500 text-white rounded-full' />
						<p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
							Upload Existing
						</p>
					</button>
				</div>

				<hr className='border-slate-300 my-6 sm:w-76.25' />

				<div className='grid grid-cols-2 sm:flex flex-wrap gap-4 '>
					{allResumes.map((resume, index) => {
						const baseColor = colors[index % colors.length];
						return (
							<button
								onClick={() => {
									router.push(`/app/builder/${resume._id}`);
								}}
								key={index}
								className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
								style={{
									background: `linear-gradient( 135deg, ${baseColor}10, ${baseColor}40)`,
									borderColor: baseColor + '40',
								}}>
								<FilePenIcon
									className='size-7 group-hover:scale-105 transition-all'
									style={{ color: baseColor }}
								/>
								<p
									className='text-sm group-hover:scale-105 transition-all px-2 text-center'
									style={{ color: baseColor }}>
									{resume.title}
								</p>
								<p
									className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center'
									style={{ color: baseColor }}>
									Update on {new Date(resume.updatedAt).toLocaleDateString()}
								</p>
								<div className='absolute top-1  right-1 group-hover:flex items-center hidden'>
									<TrashIcon
										onClick={(e) => {
											e.stopPropagation();
											deleteResume(resume._id);
										}}
										className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'
									/>
									<PencilIcon
										onClick={(e) => {
											e.stopPropagation();
											setEditResumeId(true);
											setTitle(resume.title);
										}}
										className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'
									/>
								</div>
							</button>
						);
					})}
				</div>

				{showCreateResume && (
					<form
						onSubmit={createResume}
						onClick={() => {
							setShowCreateResume(false);
						}}
						className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
						<div
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='relative bg-slate-50 border p-5  flex flex-col gap-4 w-full max-w-sm py-20 rounded-lg'>
							<h2 className=' text-xl font-bold mb-4'>Create a Resume</h2>
							<input
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								value={title}
								type='text'
								required
								placeholder='Enter resume title'
								className='w-full px-4 py-2 mb-4 focus:border-green-600 border border-gray-300 focus:ring-green-600 focus:ring ring-1 rounded'
							/>

							<button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
								Create Resume
							</button>
							<XIcon
								className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
								onClick={() => {
									setShowCreateResume(false);
									setTitle('');
								}}
							/>
						</div>
					</form>
				)}

				{showUploadResume && (
					<form
						onSubmit={uploadResume}
						onClick={() => {
							setShowUploadResume(false);
						}}
						className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
						<div
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='relative bg-slate-50 border p-5  flex flex-col gap-4 w-full max-w-sm py-20 rounded-lg'>
							<h2 className=' text-xl font-bold mb-4'>Upload a Resume</h2>
							<input
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								value={title}
								type='text'
								required
								placeholder='Enter resume title'
								className='w-full px-4 py-2 mb-4 focus:border-green-600 border border-gray-300 focus:ring-green-600 focus:ring ring-1 rounded'
							/>
							<UploadButton />

							<button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
								Upload Resume
							</button>
							<XIcon
								className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
								onClick={() => {
									setShowUploadResume(false);
									setTitle('');
								}}
							/>
						</div>
					</form>
				)}

				{editResumeId && (
					<form
						onSubmit={editTitle}
						onClick={() => {
							setEditResumeId('');
						}}
						className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
						<div
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='relative bg-slate-50 border p-5  flex flex-col gap-4 w-full max-w-sm py-20 rounded-lg'>
							<h2 className=' text-xl font-bold mb-4'>Edit Resume Title</h2>
							<input
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								value={title}
								type='text'
								required
								placeholder='Enter resume title'
								className='w-full px-4 py-2 mb-4 focus:border-green-600 border border-gray-300 focus:ring-green-600 focus:ring ring-1 rounded'
							/>

							<button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
								Update
							</button>
							<XIcon
								className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
								onClick={() => {
									setEditResumeId('');
									setTitle('');
								}}
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default Page;
