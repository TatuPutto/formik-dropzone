import l10n from './l10n'

const validate = (newFiles, oldFiles, props) => {
  const { acceptedFileFormats, maxFileSize } = props
  const invalidFiles = []
  const validFiles = newFiles.filter(file => {

    if (filenameAlreadyInUse(file, oldFiles)) {
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

const filenameAlreadyInUse = (newFile, oldFiles) => {
  return oldFiles && oldFiles.some(oldFile => oldFile.name === newFile.name)
}

export default validate
