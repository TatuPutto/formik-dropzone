import React, { PureComponent, Fragment } from 'react'
import { array, func } from 'prop-types'
import Alert from './Alert'
import l10n from '../util/l10n'

class Errors extends PureComponent {
  renderMultipleErrors = () => {
    const { /* dismiss, */ erroredFiles } = this.props

    return (
      <Alert color="danger">
        {l10n('error.failedToUploadMultipleFiles', 'Seuraavien tiedostojen lähettäminen ei onnistunut')}:
        <ul className="mt-2 mb-1">
          {erroredFiles.map(erroredFile => (
            <li key={erroredFile.name} className="mt-2">
              <span className="font-weight-bold">
                {erroredFile.name}
              </span>
              <br />
              {erroredFile.error}
            </li>
          ))}
          </ul>
      </Alert>
    )
  }

  renderSingularError = () => {
    const { /* dismiss, */ erroredFiles } = this.props

    return (
      <Alert color="danger">
        <div className="font-weight-bold">
          {erroredFiles[0].action === 'REMOVE' ?
            <Fragment>
              {l10n(
                'error.failedToRemove',
                '"{0}" poistaminen epäonnistui.',
                [erroredFiles[0].name]
              )}
            </Fragment>
            :
            <Fragment>
              {l10n(
                'error.failedToUpload',
                '"{0}" lähettäminen epäonnistui.',
                [erroredFiles[0].name]
              )}
            </Fragment>
          }
        </div>
        {erroredFiles[0].error}
      </Alert>
    )
  }

  render() {
    return (
      <div className="alert alert-danger mt-2">
        {this.props.erroredFiles.length === 1 ?
          <Fragment>
            {this.renderSingularError()}
          </Fragment>
          :
          <Fragment>
            {this.renderMultipleErrors()}
          </Fragment>
        }
      </div>
    )
  }
}

Errors.propTypes = {
  erroredFiles: array.isRequired,
  dismiss: func,
}

export default Errors
