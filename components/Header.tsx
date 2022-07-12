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
					<h3 className="cursor-pointer">About</h3>
					<h3 className="cursor-pointer">Contact</h3>
					<h3 className="text-white bg-blogistaRed px-4 py-1 rounded-full cursor-pointer hover:bg-white hover:border-blogistaRed hover:border hover:text-blogistaRed hover:transition-all">
						Search
					</h3>
				</div>
			</div>

			<div className="flex items-center space-x-5 ">
				<h3 className="cursor-pointer">Sign In</h3>
				<h3 className="border cursor-pointer py-1 px-4 rounded-full border-blogistaRed text-blogistaRed hover:bg-blogistaRed hover:text-white">
					Start Writing
				</h3>
			</div>
		</header>
	);
};

export default Header;
