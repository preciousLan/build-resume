'use client';
import {
	FilePenIcon,
	LoaderCircleIcon,
	PencilIcon,
	PlusIcon,
	TrashIcon,
	UploadCloudIcon,
	XIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UploadButton from '../_components/UploadButton';
import { useSelector } from 'react-redux';
import api from '../_configs/api';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';

const Page = () => {
	const router = useRouter();
	const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a'];
	const [allResumes, setAllResume] = useState([]);
	const [showCreateResume, setShowCreateResume] = useState(false);
	const [showUploadResume, setShowUploadResume] = useState(false);
	const [title, setTitle] = useState('');
	const [editResumeId, setEditResumeId] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [resume, setResume] = useState(null);
	const [getResumeId, setGetResumeId] = useState(null);

	const { user, token } = useSelector((state) => state.auth);

	async function createResume(e) {
		e.preventDefault();
		try {
			const { data } = await api.post(
				'/api/resumes/create',
				{ title },
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setAllResume([...allResumes, data.resume]);
			setTitle('');
			setShowCreateResume(false);
			router.push(`/app/builder/${data.resume._id}`);
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
	}

	async function uploadResume(e) {
		e.preventDefault();
		setIsLoading(true);
		if (!resume) {
			toast.error('please upload resume');
			return;
		}

		try {
			const resumeText = await pdfToText(resume);
			const { data } = await api.post(
				'/api/ai/upload-resume',
				{ title, resumeText },
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setTitle('');
			setResume(null);
			setShowUploadResume(false);
			router.push(`/app/builder/${data.resume._Id}`);
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
		setIsLoading(false);
	}

	async function editTitle(e) {
		try {
			e.preventDefault();

			const { data } = await api.put(
				`/api/resumes/update`,
				{
					resumeId: getResumeId,

					resumeData: { title },
				},
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setAllResume(
				allResumes.map((resume) =>
					resume._id === editResumeId ? { ...resume, title } : resume,
				),
			);

			setTitle('');
			setEditResumeId('');
			toast.success(data.message);
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
	}

	async function deleteResume(resumeId) {
		try {
			const confirmDelete = window.confirm(
				'Are you sure you want to delete this resume?',
			);
			if (confirmDelete) {
				const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
					headers: {
						Authorization: token,
					},
				});
				setAllResume(allResumes.filter((resume) => resume._id !== resumeId));
				toast.success(data.message);
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
	}

	useEffect(() => {
		const loadAllResumes = async () => {
			try {
				const { data } = await api.get(
					'/api/users/resumes',

					{
						headers: {
							Authorization: token,
						},
					},
				);
				setAllResume(data.resumes);
			} catch (error) {
				toast.error(error?.response?.data?.message || error.message);
			}
		};
		loadAllResumes();
	}, [token]);

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
											console.log(resume._id);
											e.stopPropagation();
											setGetResumeId(resume._id);
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
							<UploadButton resume={resume} setResume={setResume} />

							<button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'>
								{isLoading && (
									<LoaderCircleIcon className='animate-spin size-4 text-white' />
								)}
								{isLoading ? 'Uploading...' : 'Upload resume'}
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
