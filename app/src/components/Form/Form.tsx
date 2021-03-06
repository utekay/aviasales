import React from 'react'

import { SocialBlock } from '../SocialBlock'
import { Checkbox } from '../Checkbox'

import '../Button/Button.css'
import './Form.css'

interface IProps {
  isLoading: boolean
  shared: boolean
  email: string
  onDidShare: () => void
  onDidSubscribe: (email: string) => void
  className?: string
}

export const Form = ({
  isLoading,
  shared,
  email,
  onDidShare,
  onDidSubscribe,
  className = '',
}: IProps) => {
  const [emailDraft, setEmailDraft] = React.useState('')
  const [emailIsSaved, setEmailIsSaved] = React.useState(false)

  React.useEffect(() => {
    if (email !== '') {
      setEmailIsSaved(true)
    }
    setEmailDraft(email)
  }, [email])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (canSubmit === false) {
      return
    }
    onDidSubscribe(emailDraft)
  }

  const formIsValid = isEmailValid(emailDraft)
  const canSubmit = formIsValid && isLoading === false && emailIsSaved === false

  return (
    <form 
      onSubmit={handleSubmit}
      className={`form ${className}`}
    >
      <div className={`form__block form__block_is-disabled_${shared ? 'yes' : 'no'}`}>
        <span className="form__block-number">
          1.
        </span>
        <Checkbox className="form__block-checkbox" />
        <label className="form__label">
          Поделись с друзьями:
        </label>
        <div className="form__field-block">
          <SocialBlock
            shared={shared}
            onDidShare={onDidShare}
          />
        </div>
      </div>
      <div className={`form__block form__block_is-disabled_${emailIsSaved ? 'yes' : 'no'}`}>
        <span className="form__block-number">
          2.
        </span>
        <Checkbox className="form__block-checkbox" />
        <label 
          htmlFor="id_email"
          className="form__label"
        >
          Оставь почту:
        </label>
        <div className="form__field-block">
          <input 
            value={emailDraft}
            disabled={emailIsSaved}
            onChange={ev => setEmailDraft(ev.target.value)}
            className="form__input"
            id="id_email"
          />
        </div>
      </div>
      {emailIsSaved === false && (
        <div className="form__block form__block_for_submit">
          <button
            disabled={canSubmit === false}
            className="button"
          >
            Отправить
          </button>
        </div>
      )}
    </form>
  )
}

const isEmailValid = (value: string): boolean => {
  return /[a-z0-9.+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value)
}