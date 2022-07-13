/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../Sanity';
import { Post } from '../typings';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

interface Props {
	post: Post;
}

export const getStaticPaths = async () => {
	const query = `*[_type == "post"]{
        _id,
        slug{current}
      }`;
	const posts = await sanityClient.fetch(query);
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug][0]{
		_id,
		_createdAt,
		title,
		author->{
			name,
			image            
		},
		'comments': *[
			_type == 'comment' &&
			post._ref == ^._id &&
			approved == true],
			description,
			mainImage,
			slug,
			body
	}`;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
		},
		revalidate: 1,
	};
};

const Post = ({ post }: Props) => {
	const [submitted, setSubmitted] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			console.log(data);
			await fetch('/api/createComment', {
				method: 'POST',
				body: JSON.stringify(data),
			});
			console.log(data);
			setSubmitted(true);
		} catch (error) {
			console.log(error);
		}
	};

	console.log(post);

	return (
		<main>
			<Header />
			<img
				className=" w-4/5 h-96 object-cover  mx-auto border-blogistaDeepBlue border"
				src={urlFor(post.mainImage).url()!}
				alt="Blog"
			/>
			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
				<h2 className="text-2xl font-light text-gray-500 mb-2">
					{post.description}
				</h2>
				<div className="flex items-center space-x-2">
					<img
						className="w-10 rounded-full"
						src={urlFor(post.author.image).url()!}
						alt=""
					/>
					<p className="font-extralight text-sm">
						Blog post by{' '}
						<span className="text-blogistaRed">{post.author.name}</span>
					</p>
					<p> Published at {new Date(post._createdAt).toLocaleString()}</p>
				</div>
				<div className="mt-10">
					<PortableText
						className=""
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
						content={post.body as any}
						serializers={{
							h1: (props: any) => {
								<h1 className="text-2xl font-bold my-5" {...props} />;
							},
							h2: (props: any) => {
								<h2 className="text-xl font-bold my-5" {...props} />;
							},
							li: ({ children }: any) => {
								<li className="ml-4 list-disc" {...children} />;
							},
							link: ({ href, children }: any) => {
								<a
									href={href}
									className="text-blue-500 hover:underline"
									{...children}
								/>;
							},
						}}
					/>
				</div>
			</article>
			<hr className="max-w-lg my-5 mx-auto border border-blogistaRed" />
			{submitted ? (
				<div className="flex flex-col py-10 my10 bg-blogistaRed text-white max-w-2xl mx-auto">
					<h3 className="text-3xl font-bold">
						Thank you for submitting your comment!
					</h3>
					<p>Once it has been approved it will appear below</p>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
					<h3 className="text-sm text-blogistaRed">Enjoyed this article?</h3>
					<h4 className="text-3xl font-bold">Leave a comment!</h4>
					<hr className="py-3 mt-2" />

					<input
						{...register('_id')}
						type="hidden"
						name="_id"
						value={post._id}
					/>
					<label className="block mb-5">
						<span className="text-gray-700">Name</span>
						<input
							{...register('name', { required: true })}
							className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus-visible:ring-blogistaRed focus:ring-2"
							placeholder="Enter your name"
							type="text"
						/>
					</label>
					<label className="block mb-5">
						<span className="text-gray-700">Email</span>
						<input
							{...register('email', { required: true })}
							className="shadow border rounded py-2 px-3 form-input mt-1 block w-full focus:outline-none focus-visible:ring-blogistaRed focus:ring-2"
							placeholder="Enter your email"
							type="email"
						/>
					</label>
					<label className="block mb-5">
						<span className="text-gray-700">Comment</span>
						<textarea
							{...register('comment', { required: true })}
							className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full focus:outline-none focus-visible:ring-blogistaRed focus:ring-2"
							placeholder="Leave a comment!"
							rows={8}
						/>
					</label>
					<div className="flex flex-col p-5">
						{errors.name && (
							<span className="text-red-500">The name field is required</span>
						)}
						{errors.email && (
							<span className="text-red-500">The email field is required</span>
						)}
						{errors.comment && (
							<span className="text-red-500">
								The comment field is required
							</span>
						)}
					</div>
					<input
						className="shadow bg-blogistaRed hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
						type="submit"
					/>
				</form>
			)}
			<div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-blogistaRed shadow space-y-2">
				<h3 className="text-4xl">Comments</h3>
				<hr className="pb-2" />
				{post.comments.map((comment) => (
					<div key={comment._id}>
						<p>
							<span className="text-blogistaRed">{comment.name}</span> :
							{comment.comment}
						</p>
					</div>
				))}
			</div>
		</main>
	);
};

export default Post;
function newDate(_createdAt: string): React.ReactNode {
	throw new Error('Function not implemented.');
}
