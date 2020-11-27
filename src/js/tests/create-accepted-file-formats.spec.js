import createAcceptedFileFormats from '../util/create-accepted-file-formats'
import { aggregates, aliases } from '../util/create-accepted-file-formats/aliases'

describe('.createAcceptedFileFormats()', () => {

  it('creates string containing MIME types', () => {
    const acceptedFormats = 'text/plain, application/pdf'
    const receivedFormats = createAcceptedFileFormats(acceptedFormats)
    expect(acceptedFormats).toBe(receivedFormats)
  })

  it('handles aliases', () => {
    const acceptedFormats = 'word, text/plain, application/pdf, excel'
    const expectedFormats = `${aliases.word.join(', ')}, text/plain, application/pdf, ${aliases.excel.join(', ')}`
    const receivedFormats = createAcceptedFileFormats(acceptedFormats)
    expect(expectedFormats).toBe(receivedFormats)
  })

  it('handles aggregate aliases', () => {
    const acceptedFormats = 'office'
    const expectedFormats = aggregates.office.join(', ')
    const receivedFormats = createAcceptedFileFormats(acceptedFormats)
    expect(expectedFormats).toBe(receivedFormats)
  })

})