import React from 'react'
import { Outlet } from 'react-router'
import {NavbarMini} from '../index.js'

function Layout() {
    return (
        <div>
            <NavbarMini/>
            <Outlet/>
        </div>
    )
}

export default Layout
