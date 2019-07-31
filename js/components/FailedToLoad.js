import React from 'react'
import l10n from '../util/l10n'

const FailedToLoad = () => (
  <div className="dropzone-fetch-failure text-center text-danger">
    <span className="fas fa-exclamation-triangle mr-1" />
    {l10n('error.failedToFetchFiles', 'Tiedostojen lataaminen epäonnistui.')}
  </div>
)

export default FailedToLoad
