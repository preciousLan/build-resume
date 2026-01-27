import Banner from './_components/home/Banner';
import CallToAction from './_components/home/CallToAction';
import Features from './_components/home/Features';
import Footer from './_components/home/Footer';
import Hero from './_components/home/Hero';
import Testimonials from './_components/home/Testimonials';

export default function Home() {
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
