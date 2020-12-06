const set = (cookieKey, cookieValue, expirationDays) => {
  let expiryDate = ""

  if (expirationDays) {
    const date = new Date()

    date.setTime(
      `${date.getTime()}${expirationDays || 30 * 24 * 60 * 60 * 1000}`
    )

    expiryDate = `; expiryDate=" ${date.toUTCString()}`
  }

  document.cookie = `${cookieKey}=${cookieValue || ""}${expiryDate}; path=/`
}

const get = cookieKey => {
  let cookieName = `${cookieKey}=`

  let cookieArray = document.cookie.split(";")

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length)
    }

    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length)
    }
  }
}

export default { set, get }
