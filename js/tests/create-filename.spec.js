import createFilename from '../util/create-filename'

describe('.createFilename()', () => {

  it('creates filename', () => {
    const file = { name: 'testfile.pdf' }
    const expectedFilename = 'testfile.pdf'
    const receivedFilename = createFilename(file, 1, {})
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('appends file extension to filename if file extension is absent', () => {
    const file = { name: 'testfile.pdf' }
    const props = { filenameOverride: 'testfile_override' }
    const expectedFilename = 'testfile_override.pdf'
    const receivedFilename = createFilename(file, 1, props)
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('does not append file extension to filename if extension is present', () => {
    const file = { name: 'testfile.pdf' }
    const props = { filenameOverride: 'testfile_override' }
    const expectedFilename = 'testfile_override.pdf'
    const receivedFilename = createFilename(file, 1, props)
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('replaces spaces with underscores', () => {
    const file = { name: 'test file.pdf' }
    const expectedFilename = 'test_file.pdf'
    const receivedFilename = createFilename(file, 1, {})
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('replaces scandic characters (ä and ö) with plain ASCII equivalents', () => {
    const file = { name: 'ÄÖäö.pdf' }
    const expectedFilename = 'AOao.pdf'
    const receivedFilename = createFilename(file, 1, {})
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('removes special characters (except underscores and hyphens)', () => {
    const file = { name: 'ÄÖäö.pdf' }
    const expectedFilename = 'AOao.pdf'
    const receivedFilename = createFilename(file, 1, {})
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('overrides file\'s name if filename override is provided', () => {
    const file = { name: 'testfile.pdf' }
    const props = { filenameOverride: 'testfile_override' }
    const expectedFilename = 'testfile_override.pdf'
    const receivedFilename = createFilename(file, 1, props)
    expect(receivedFilename).toBe(expectedFilename)
  })

  it('appends running number to filename if addRunningNumberToFilenames prop is true', () => {
    const props = {
      addRunningNumberToFilenames: true,
      filenameOverride: 'testfile_override',
      input: {
        value: [
          { name: 'testfile_override-1.pdf' },
          { name: 'testfile_override-2.pdf' }
        ]
      }
    }

    const file3 = { name: 'testfile.pdf' }
    const expectedFilename1 = 'testfile_override-3.pdf'
    const receivedFilename1 = createFilename(file3, 1, props)
    expect(receivedFilename1).toBe(expectedFilename1)

    const file4 = { name: 'implementation-details.pdf' }
    const expectedFilename2 = 'testfile_override-4.pdf'
    const receivedFilename2 = createFilename(file4, 2, props)
    expect(receivedFilename2).toBe(expectedFilename2)
  })
  
})
