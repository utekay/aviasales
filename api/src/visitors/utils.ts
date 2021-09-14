export const isEmailValid = (value: string): boolean => {
  return /[a-z0-9.+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value)
}

export const getMaskedEmail = (email: string): string => {
  const [
    username,
    rest,
  ] = email.split('@')
  return `${username[0]}${Array(username.length - 1).fill('*').join('')}@${rest}`
}