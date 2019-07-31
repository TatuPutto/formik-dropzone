const l10n = (code, text, args) => {
  const translation = window.translations && window.translations[code] || text || null
  if (translation && args) {
    return insertArguments(translation, args)
  } else if (translation && !args) {
    return translation
  } else {
    return null
  }
}

const insertArguments = (translation, args) => {
  let translationWithArgs = translation
  args.forEach((argument, i) => {
    translationWithArgs = translationWithArgs.replace(`{${i}}`, argument)
  })
  return translationWithArgs
}

export default l10n
