import React from 'react'
import { shallow, mount } from 'enzyme'
import RFDropzone from '../components/RFDropzone'
import FailedToLoad from '../components/FailedToLoad'
import FileSelection from '../components/FileSelection'
import Files from '../components/Files'
import LoadingFiles from '../components/LoadingFiles'
import QueuedFiles from '../components/QueuedFiles'

describe('RFDropzone', () => {
  let props

  beforeEach(() => {
    props = {
      input: { value: [] },
      meta: { error: null, warning: null },
      name: 'users[0]',
      uploadUrl: ''
    }
  })

  describe('get files on mount cycle', () => {

    it('should call `props.getFilesOnMount` on mount if it has been provided', () => {
      const getFilesOnMount = jest.fn(() => Promise.resolve())
      props = { ...props, getFilesOnMount: getFilesOnMount }
      shallowDropzone()
      expect(getFilesOnMount.mock.calls.length).toBe(1)
    })

    it('should render only `LoadingFiles` when loading files', () => {
      props = { ...props, getFilesOnMount: getFilesOnMountResolve }
      const dropzone = shallowDropzone()
      expect(dropzone.find(LoadingFiles).length).toBe(1)
      expect(dropzone.find(FailedToLoad).length).toBe(0)
      expect(dropzone.find(FileSelection).length).toBe(0)
      expect(dropzone.find(Files).length).toBe(0)
      expect(dropzone.find(QueuedFiles).length).toBe(0)
    })

    it('should render only `FailedToLoad` when load fails', async () => {
      props = { ...props, getFilesOnMount: getFilesOnMountReject }
      const dropzone = shallowDropzone()
      await dropzone.instance().componentDidMount()
      dropzone.update()
      expect(dropzone.find(FailedToLoad).length).toBe(1)
      expect(dropzone.find(LoadingFiles).length).toBe(0)
      expect(dropzone.find(FileSelection).length).toBe(0)
      expect(dropzone.find(Files).length).toBe(0)
      expect(dropzone.find(QueuedFiles).length).toBe(0)
    })

    it('should try to periodically load files (if `props.retryTimeout` has been provided) until satisfactory response has been received', async () => {
      let calls = 0
      const resolveOnFourthCall = jest.fn(() => {
        if (calls < 3) {
          calls++
          return Promise.reject()
        }
        return Promise.resolve()
      })
      props = { ...props, retryTimeout: 1, getFilesOnMount: resolveOnFourthCall }
      shallowDropzone()
      await sleep(100)
      expect(resolveOnFourthCall.mock.calls.length).toBe(4)
    })

  })

  it('should render `FileSelection` when not loading files', () => {
    const dropzone = shallowDropzone()
    expect(dropzone.find(FileSelection).length).toBe(1)
  })



  ////

  const sleep = (timeout) => {
    return new Promise(resolve => setTimeout(() => resolve(), timeout))
  }

  const shallowDropzone = () => {
    return shallow(<RFDropzone {...props} />)
  }

  const mountDropzone = () => {
    return mount(<RFDropzone {...props} />)
  }

  const getFilesOnMountResolve = () => {
    return Promise.resolve()
  }

  const getFilesOnMountReject = () => {
    return Promise.reject()
  }
})
