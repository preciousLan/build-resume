'use client';
import Loader from '../_components/Loader';
import Login from '../_components/Login';
import NavBar from '../_components/NavBar';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
	const { user, loading } = useSelector((state) => state.auth);

	if (loading) {
		return <Loader />;
	}
	return (
		<>
			{user ? (
				<div className='min-h-screen bg-gray-50'>
					<NavBar />
					{children}
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

export default Layout;
