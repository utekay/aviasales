import { Socials } from './types'

const postURL = encodeURIComponent('https://aviasales.ru/')
// const postURL = encodeURIComponent(document.location.toString())
const postTitle = encodeURIComponent(document.title)

export const getURLBySocial = (social: Socials): string => {
  switch (social) {
    case Socials.FB: {
      return `https://www.facebook.com/sharer.php?u=${postURL}`
    }
    case Socials.Twitter: {
      return `https://twitter.com/share?url=${postURL}&text=${postTitle}`
    }
    case Socials.VK: {
      return `http://vk.com/share.php?url=${postURL}`
    }
    case Socials.Odnoklassniki: {
      return `https://connect.ok.ru/offer?url=${postURL}`
    }
    default:
      throw new Error('unexpected social')
  }
}

export const openPopup = (url: string) => {
  return window.open(
    url,
    'share',
    'resizable=no,status=no,location=no,toolbar=no,menubar=no,width=667,height=445,left=100,top=100',
  )
}