import { aggregates, aliases } from './aliases'

const isAlias = (format, collection) => {
  return collection.hasOwnProperty(format) 
}

const getFormatsUnderAlias = (alias, collection) => {
  return collection[alias].join(', ')
}

const concat = (str1, str2) => {
  if (str1) {
    return `${str1}, ${str2}`
  }

  return str2
}

const createAcceptedFileFormats = (acceptedFormatsStr) => {
  if (!acceptedFormatsStr) {
    return ''
  }

  return acceptedFormatsStr
    .split(',')
    .reduce((completeFormatStr, format) => {

      format = format.trim()

      if (isAlias(format, aggregates)) {
        return concat(
          completeFormatStr,
          getFormatsUnderAlias(format, aggregates)
        )
      }

      if (isAlias(format, aliases)) {
        return concat(
          completeFormatStr,
          getFormatsUnderAlias(format, aliases)
        )
      }

      return concat(completeFormatStr, format)

    }, '')
}
  
export default createAcceptedFileFormats