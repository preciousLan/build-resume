import { Outfit } from 'next/font/google';
import './globals.css';
import ReduxProvider from './ReduxProvider';
import ToasterWrapper from './_components/ToasterWrapper';

const outfit = Outfit({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-outfit', // optional but recommended
});

export const metadata = {
	title: 'Resume Builder',
	description: 'Generate a perfect Ai resume',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={outfit.className}>
				<ReduxProvider>
					<ToasterWrapper />
					{children}
				</ReduxProvider>
			</body>
		</html>
	);
}
