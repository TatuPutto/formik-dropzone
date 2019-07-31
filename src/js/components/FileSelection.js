import React, { PureComponent } from 'react'
import { bool, func } from 'prop-types'
import l10n from '../util/l10n'

class FileSelection extends PureComponent {
  render() {
    return (
      <div className="dropzone-file-select truncate-text">
        <button
          className="dropzone-open-file-dialog-btn btn"
          type="button"
          disabled={this.props.disabled}
          onClick={() => this.props.openFileDialog()}
        >
          {l10n('select', 'Valitse')}
        </button>
        <span style={!this.props.disabled ? { cursor: 'default' } : null}>
          {' '}
          {l10n('orDropFileHere', 'tai pudota tiedosto tähän')}
        </span>
      </div>
    )
  }
}

FileSelection.propTypes = {
  openFileDialog: func.isRequired,
  disabled: bool,
}

export default FileSelection
