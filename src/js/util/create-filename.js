import appendRunningNumberToFilename from './create-running-number'

const createFilename = (file, fileNumber, props) => {
  let filename = file.name

  if (props.filenameOverride) {
    filename = props.filenameOverride
  }

  if (props.addRunningNumberToFilenames) {
    const uploadedFiles = props.targetProp ? props.input.value[props.targetProp] : props.input.value
    filename = appendRunningNumberToFilename(filename, uploadedFiles || [], fileNumber)
  }

  filename = appendFileExtensionToFilenameIfAbsent(filename, getFileExtension(file))
  filename = sanitizeFilename(filename)

  return filename
}

const appendFileExtensionToFilenameIfAbsent = (filename, fileExt) => {
  const extensionStartsAt = filename.indexOf('.')
  if (extensionStartsAt !== -1) {
    return filename.substring(0, extensionStartsAt).concat('.', fileExt)
  } else {
    return filename.concat('.', fileExt)
  }
}

const getFileExtension = (file) => {
  return file.name.split('.').pop()
}

const sanitizeFilename = (str) => {
  str = replaceSpacesWithUnderscore(str)
  str = replaceScandicLettersWithPlainEquivalents(str)
  str = removeSpecialCharacters(str)
  return str
}

const replaceSpacesWithUnderscore = (str) => {
  return str.replace(/\s/g, '_')
}

const replaceScandicLettersWithPlainEquivalents = (str) => {
  const dictionary = { Ä: 'A', ä: 'a', Ö: 'O', ö: 'o' }
  return str.replace(/[^\w ]/g, (char) => dictionary[char] || char)
}

const removeSpecialCharacters = (str) => {
  return str.replace(/[^a-zA-Z0-9._-]/g, '')
}

export default createFilename
