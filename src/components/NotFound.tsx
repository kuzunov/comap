import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const NotFound = (props: Props) => {

  return (
  <>
    <div>You're trying to access something that doesn't exist.</div>
    <Link to="/">To Home</Link></>
  )
}

export default NotFound