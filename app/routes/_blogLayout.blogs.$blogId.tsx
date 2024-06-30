
import { ActionFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, Link, useLoaderData, useNavigation, type MetaFunction } from '@remix-run/react';
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

export const action:ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.blogId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({title}),
    }
  );

  const data = await response.json();
  return json({ post: data });
}

export default function Blog() {
  const { blog } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  const isSubmitting = !(navigation.state === 'idle');

  return (
    <div>
      <Link to={'/'}>
        HOME
      </Link>
      <div className='p-3 rounded-sm w-[500px] border'>
        <h1 className='font-bold text-xl mb-3'>{blog.title}</h1>
        <p>{blog.body}</p>
      </div>

      <Form method='patch'>
        <div className='p-3 border my-5 flex space-x-3 max-w-fit flex-col items-center'
        >
          <input className='border' name='title' placeholder='title' />
          <button type='submit'>{isSubmitting ? "Submitting" : "Update" }</button>
        </div>
      </Form>
    </div>
  )
}