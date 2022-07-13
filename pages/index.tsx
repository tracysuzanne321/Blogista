/* eslint-disable @next/next/no-img-element */
import Header from '../components/Header';
import Hero from '../components/Hero';
import { Post } from '../typings';
import { sanityClient, urlFor } from '../Sanity';
import Link from 'next/link';

interface Props {
	posts: [Post];
}

export const getServerSideProps = async () => {
	const query = `*[_type == "post"]{
		_id,
		title,
		author ->{
		name, 
		image,
		 
	  },
	  description,
	  mainImage,
	  slug,
	  }`;
	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
};

const Home = ({ posts }: Props) => {
	return (
		<div>
			<Header />
			<Hero />
			<div className="grid grid-cols-1 max-w-5xl mx-auto py-4 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  lg:">
				{posts.map((post) => (
					<Link key={post._id as any} href={`/${post.slug.current}`}>
						<div className="border rounded-lg group cursor-pointer overflow-hidden">
							<img
								className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
								src={urlFor(post.mainImage).url()!}
								alt=""
							/>
							<div className="flex justify-between py-2 px-2 bg-white">
								<div>
									<p className="text-lg font-bold">{post.title}</p>
									<p className="text-xs">
										{post.description} by {post.author.name}
									</p>
								</div>
								<img
									className="h-12 w-12 rounded-full"
									src={urlFor(post.author.image).url()!}
									alt=""
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
export default Home;
