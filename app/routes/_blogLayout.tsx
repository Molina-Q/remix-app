import { Outlet } from '@remix-run/react'
import React from 'react'

export default function BlogLayout() {
    return (
        <div>
            <header>BLOG NAVIGATION</header>
            <Outlet />
        </div>
    )
}
