/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Header = () => {
	return (
		<header>
			<div>
				<Link href="/">
					<img
						className="w-44 object-cover cursor-pointer"
						src="/logo-main.svg"
						alt="logo"
					/>
				</Link>
				<div>
					<h3>About</h3>
					<h3>Contact</h3>
					<h3>Search</h3>
				</div>
			</div>

			<div>
				<h3>Sign In</h3>
				<h3>Start Writing</h3>
			</div>
		</header>
	);
};

export default Header;
