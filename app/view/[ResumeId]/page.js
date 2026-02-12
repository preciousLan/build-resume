'use client';
import Loader from '@/app/_components/Loader';
import ResumePreview from '@/app/_components/ResumePreview';
import { dummyResumeData } from '@/public/assets';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
	const { ResumeId } = useParams();
	const [resumeData, setResumeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadResume = async () => {
		setResumeData(
			dummyResumeData.find((resume) => resume._id === ResumeId || null),
			setIsLoading(false),
		);
	};
	useEffect(() => {
		loadResume();
	}, [ResumeId]);

	return resumeData ? (
		<div className='bg-slate-100'>
			<div className='max-w-3xl mx-auto py-10'>
				<ResumePreview
					data={resumeData}
					template={resumeData.template}
					assetColor={resumeData.assetColor}
					classes='py-4 bg-white'
				/>
			</div>
		</div>
	) : (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<div className='w-full max-w-2xl  flex flex-col items-center justify-center h-screen'>
					<p className='text-center text-6xl text-slate-400 font-medium'>
						Resume Not found
					</p>
					<Link
						href='/'
						className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
						<ArrowLeftIcon className='mr-2 size-4' /> go to home page
					</Link>
				</div>
			)}
		</div>
	);
};

export default Page;
