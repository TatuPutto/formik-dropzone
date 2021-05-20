import React, { PureComponent, Fragment } from 'react'
import { array, func } from 'prop-types'
import Alert from './Alert'
import l10n from '../util/l10n'

class Errors extends PureComponent {
  translateErrorMessage = (errorMessage, defaultMessage, args) => {
    if (this.props.t) {
      return this.props.t(
        errorMessage,
        args
      )
    }

    return l10n(
      'error.failedToRemove',
      defaultMessage,
      args,
    )
  }

  renderMultipleErrors = () => {
    const { /* dismiss, */ erroredFiles } = this.props

    return (
      <Alert color="danger">
        {this.translateErrorMessage(
          'error.failedToUploadMultipleFiles',
          'Seuraavien tiedostojen lähettäminen ei onnistunut'
        )}
        <ul className="mt-2 mb-1">
          {erroredFiles.map(erroredFile => (
            <li key={erroredFile.name} className="mt-2">
              <b>
                {erroredFile.name}
              </b>
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
    console.log("🚀 ~ file: Errors.js ~ line 45 ~ Errors ~ erroredFiles", erroredFiles)

    return (
      <Alert color="danger">
        <b>
          {erroredFiles[0].action === 'REMOVE' ?
            <Fragment>
              {this.translateErrorMessage(
                'error.failedToRemove',
                '"{0}" poistaminen epäonnistui.',
                [erroredFiles[0].name]
              )}
            </Fragment>
            :
            <Fragment>
              {this.translateErrorMessage(
                'error.failedToUpload',
                '"{0}" lähettäminen epäonnistui.',
                [erroredFiles[0].name]
              )}
            </Fragment>
          }
        </b>
        {erroredFiles[0].error}
      </Alert>
    )
  }

  render() {
    return (
      <div className="mt-2">
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
  t: func,
}

export default Errors
