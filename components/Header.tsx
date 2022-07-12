/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Header = () => {
	return (
		<header className="flex justify-between p-5 max-w-5xl mx-auto">
			<div className="flex items-center space-x-5">
				<Link href="/">
					<img
						className="w-52 object-cover cursor-pointer"
						src="/logo-main.svg"
						alt="logo"
					/>
				</Link>
				<div className="hidden items-center space-x-5 md:inline-flex ">
					<h3>About</h3>
					<h3>Contact</h3>
					<h3 className="text-white bg-blogistaRed px-4 py-1 rounded-full">
						Search
					</h3>
				</div>
			</div>

			<div className="flex items-center space-x-5 ">
				<h3>Sign In</h3>
				<h3 className="border py-1 px-4 rounded-full border-blogistaRed text-blogistaRed">
					Start Writing
				</h3>
			</div>
		</header>
	);
};

export default Header;
