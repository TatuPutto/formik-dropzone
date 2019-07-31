import l10n from './l10n'

const validate = (files, props) => {
  const { acceptedFileFormats, targetProp, input, maxFileSize } = props
  const invalidFiles = []
  const validFiles = files.filter(file => {

    if (filenameAlreadyInUse(file, input, targetProp)) {
      invalidFiles.push({
        name: file.name,
        status: 'DECLINED',
        action: 'UPLOAD',
        error: l10n('error.nameAlreadyInUse', 'Tiedostonimi on jo käytössä.')
      })
      return false
    }

    if (fileHasWrongFileType(file, acceptedFileFormats)) {
      invalidFiles.push({
        name: file.name,
        status: 'DECLINED',
        action: 'UPLOAD',
        error: l10n('error.wrongFileType', 'Tiedosto on väärän tyyppinen.')
      })
      return false
    }

    if (fileExceedsMaximunSizeLimit(file, maxFileSize)) {
      invalidFiles.push({
        name: file.name,
        status: 'DECLINED',
        action: 'UPLOAD',
        error: l10n('error.fileIsTooLarge', 'Tiedosto on liian suuri.', [maxFileSize / 1024 / 1024])
      })
      return false
    }

    return true

  })

  return {
    validFiles,
    invalidFiles
  }
}

const fileHasWrongFileType = (file, acceptedFileFormats) => {
  return acceptedFileFormats && !acceptedFileFormats.includes(file.type)
}

const fileExceedsMaximunSizeLimit = (file, maxFileSize) => {
  return maxFileSize && file.size > maxFileSize
}

const filenameAlreadyInUse = (file, input, targetProp) => {
  const preExistingFiles = targetProp ? input.value[targetProp] : input.value
  return preExistingFiles && preExistingFiles.some(existingFile => existingFile.name === file.name)
}

export default validate
