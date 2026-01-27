import ResumeBuilder from '@/app/_components/ResumeBuilder';
import React from 'react';
import { dummyResumeData } from '@/public/assets';

export async function generateMetadata({ params }) {
	const resolvedParams = await params;
	const resume = dummyResumeData.find(
		(res) => res._id === resolvedParams.ResumeId,
	);

	return {
		title: resume ? resume.title : 'Resume Builder',
		description: 'Edit your resume',
	};
}

const page = async ({ params }) => {
	const resolvedParams = await params;
	return (
		<div>
			<ResumeBuilder resumeId={resolvedParams.ResumeId} />
		</div>
	);
};

export default page;
