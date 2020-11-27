export const aliases = {
  'image': [
    'image/png',
    'image/jpeg'
  ],
  'word': [
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  ],
  'excel': [
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  ],
  'powerpoint': [
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  ],
}

export const aggregates = {
  'office': [
    ...aliases.word,
    ...aliases.excel,
    ...aliases.powerpoint,
  ],
}