import React from 'react'

import { ReactComponent as Logo } from './logo.svg'

import './TheHeader.css'

interface IProps {
  className?: string
}

export const TheHeader = ({
  className = '',
}: IProps) => (
  <div className={`the-header ${className}`}>
    <a 
      href="https://aviasales.ru/"
      className="the-header__logo-link"
    >
      <Logo className="the-header__logo" />
    </a>
  </div>
)