'use client';
import Banner from './_components/home/Banner';
import CallToAction from './_components/home/CallToAction';
import Features from './_components/home/Features';
import Footer from './_components/home/Footer';
import Hero from './_components/home/Hero';
import Testimonials from './_components/home/Testimonials';
import { useDispatch } from 'react-redux';
import { setLoading } from './_features/authSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import api from './_configs/api';

export default function Home() {
	const dispatch = useDispatch();

	const getUserData = async () => {
		dispatch(setLoading(true));

		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(setLoading(false));
			return;
		}

		try {
			const { data } = await api.get('/api/users/data', {
				headers: { Authorization: `Bearer ${token}` },
			});

			// optionally store user here
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
			toast.error(error?.response?.data?.message || error.message);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<div>
			<Banner />
			<Hero />
			<Features />
			<Testimonials />
			<CallToAction />
			<Footer />
		</div>
	);
}
