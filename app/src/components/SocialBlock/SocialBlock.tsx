import React from 'react'

import { Socials } from './types'
import * as utils from './utils'

import './SocialBlock.css'

interface IProps {
  shared: boolean
  onDidShare: () => void
}

let timerId: NodeJS.Timeout | null = null

export const SocialBlock = ({
  shared,
  onDidShare,
}: IProps) => {
  React.useEffect(() => {
    return () => {
      timerId && clearInterval(timerId)
    }
  }, [])

  const handleClick = (social: Socials) => {
    if (shared) {
      return
    }
    const url = utils.getURLBySocial(social)
    let popup = utils.openPopup(url)
    if (popup === null) {
      return
    }
    timerId = setInterval(() => {
      if (popup && popup.closed === false) {
        return
      }
      timerId && clearInterval(timerId)
      console.log('closed')
      // onDidShare()
    }, 250)
    popup.focus()
  }

  return (
    <div className="social-block">
      {Object.values(Socials).map(s => (
        <button
          key={s}
          onClick={() => handleClick(s)}
          className={`social-block__button social-block__button_social_${s}`}
          disabled={shared}
          type="button"
        />
      ))}
    </div>
  )
}