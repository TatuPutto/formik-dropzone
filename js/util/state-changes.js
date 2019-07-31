export const addErrors = (erroredFiles) => (state) => {
  const erroredFilesArray = Array.isArray(erroredFiles) ? erroredFiles : [erroredFiles]
  return {
    erroredFiles: state.erroredFiles.concat(erroredFilesArray)
  }
}

export const addFilesToQueue = (files) => (state) => ({
  queue: state.queue.concat(files)
})

export const toggleDisabledStatus = (state) => ({
  disabled: !state.disabled
})

export const resetActiveFile = () => ({
  activeFile: null
})

export const resetErroredFiles = () => ({
  erroredFiles: []
})

export const setFirstQueuedFileAsActive = (state) => ({
  activeFile: state.queue.slice(0, 1)[0],
  queue: state.queue.slice(1)
})

export const setFetchSuccessStatus = () => ({
  fetching: false,
  fetchedSuccessfully: true
})

export const setFetchFailureStatus = () => ({
  fetching: false,
  fetchedSuccessfully: false
})

export const toggleFetchingStatus = (state) => ({
  fetching: !state.fetching
})

export const toggleUploadingStatus = (state) => ({
  uploading: !state.uploading
})

export const updateActiveFile = (key, value) => (state) => ({
  activeFile: { ...state.activeFile, [key]: value }
})
