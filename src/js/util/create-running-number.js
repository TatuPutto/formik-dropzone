/*
 * Appends running number to filename.
 * e.g. Tatu_Putto_-_CV.pdf -> e.g. Tatu_Putto_-_CV-1.pdf
 */
const createRunningNumber = (filename, uploadedFiles, fileNumber) => {
  if (uploadedFiles.length) {
    const runningNumber = getBiggestOccurence(uploadedFiles) + fileNumber
    return `${filename}-${runningNumber}`
  } else if (fileNumber > 1) {
    return `${filename}-${fileNumber}`
  } else {
    return `${filename}-1`
  }
}

const getBiggestOccurence = (files) => {
  let biggestOccurence = 0
  files.forEach(file => {
    const filenameWithoutExtension = file.name.split('.')[0]
    const fileNumber = filenameWithoutExtension.slice(-1)
    if (fileNumber > biggestOccurence) {
      biggestOccurence = fileNumber
    }
  })
  return parseInt(biggestOccurence)
}

export default createRunningNumber
