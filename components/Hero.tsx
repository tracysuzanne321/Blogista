/* eslint-disable @next/next/no-img-element */
const Hero = () => {
	return (
		<div className="flex justify-between items-center border-y bg-blogistaPowderblue border-black py-10 lg:py-0 max-w-5xl mx-auto rounded-md">
			<div className="px-10 space-y-5 max-w-5xl ">
				<h1 className="text-6xl font-serif ">
					<span className="decoration-black decoration-4 underline">
						Blogista
					</span>{' '}
					share your journey.
				</h1>
				<div>
					<h2>
						Share your journey and thoughts with millions of people, it is free
						and easy!
					</h2>
				</div>
			</div>
			<img
				className="hidden md:inline-flex h-32 lg:h-full "
				src="/logo-black.svg"
				alt=""
			/>
		</div>
	);
};

export default Hero;
