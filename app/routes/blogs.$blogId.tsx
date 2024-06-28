
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import React from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`);
  const data: { id: string; title: string; body: string; userId: string; } = await response.json();

  return json({ blog: data });
};

export default function Blog() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to={'/'}>
        HOME
      </Link>
      <div className='m-4 p-4 rounded-sm w-[500px] border'>
        <h1>{blog.title}</h1>
        <p>{blog.body}</p>

      </div>
    </div>
  )
}