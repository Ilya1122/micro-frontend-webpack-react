import React, { FC } from 'react'
import { Outlet, Link } from 'react-router-dom'

import classes from "./App.module.scss"

import avatarPng from "@/assets/avatar.png"
import avatarJpg from "@/assets/avatar.jpg"
import Calendar from "@/assets/calendar.svg"

function TDDD(a: number) {
  console.log('TDDDfunction')
}

export const App: FC = () => {
  // TDDD(4444)

  // if(__PLATFORM__ === "desktop") {
  //   return <h1>PLATFORM={__PLATFORM__}</h1>
  // }

  // if(__PLATFORM__ === "mobile") {
  //   return <h1>PLATFORM={__PLATFORM__}</h1>
  // }

  return (
    <div className={classes.test} data-testid="App.DataTestId">
      <h1>PLATFORM={__PLATFORM__}</h1>
      <div>
        <img width={100} height={100} src={avatarPng} />
        <img width={100} height={100} src={avatarJpg} />
        <Calendar color="blue" width={100} height={100} />
      </div>
      <Link to="/about">About</Link>
      <br />
      <Link to="/shop">Shop</Link>

      <h1>Hello world</h1>

      <Outlet />
    </div>
  )
}
