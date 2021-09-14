import React from 'react'

import { ReactComponent as ImageCheck } from './check.svg'

import './Checkbox.css'

interface IProps {
  isChecked?: boolean
  className?: string
}

export const Checkbox = ({
  isChecked = true,
  className = '',
}: IProps) => (
  <span className={`checkbox ${className}`}>
    {isChecked && (
      <ImageCheck className="checkbox__icon" />
    )}
  </span>
)