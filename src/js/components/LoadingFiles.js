import React from 'react'
import l10n from '../util/l10n'

const LoadingFiles = () => (
  <div className="dropzone-loading text-center">
    <span className="fas fa-spinner fa-spin fa-pulse mr-1" />
    {l10n('loading', 'Ladataan...')}
  </div>
)

export default LoadingFiles
