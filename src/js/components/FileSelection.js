import React, { PureComponent } from 'react'
import { bool, func, object } from 'prop-types'
import l10n from '../util/l10n'

class FileSelection extends PureComponent {
  renderOpenFileDialogButton = () => {
    const { components } = this.props

    if (components && components.hasOwnProperty('OpenFileDialogButton')) {
      if (typeof components.OpenFileDialogButton === 'function') {
        return components.OpenFileDialogButton({
          className: 'dropzone-open-file-dialog-btn btn',
          disabled: this.props.disabled,
          openFileDialog: this.props.openFileDialog,
        })
      }

      return (
        <components.OpenFileDialogButton
          className="dropzone-open-file-dialog-btn btn"
          disabled={this.props.disabled}
          openFileDialog={this.props.openFileDialog}
        />
      )
    }

    return (
      <button
        className="dropzone-open-file-dialog-btn btn"
        type="button"
        disabled={this.props.disabled}
        onClick={() => this.props.openFileDialog()}
      >
        {l10n('select', 'Valitse')}
      </button>
    )
  }

  renderDropFileHint = () => {
    const { components } = this.props

    if (components && components.hasOwnProperty('DropFileHint')) {
      if (typeof components.DropFileHint === 'function') {
        return components.DropFileHint(this.props.disabled)
      }

      return (
        <components.DropFileHint disabled={this.props.disabled} />
      )
    }

    return (
      <span style={!this.props.disabled ? { cursor: 'default' } : null}>
        {' '}
        {l10n('orDropFileHere', 'tai pudota tiedosto tähän')}
      </span>
    )
  }

  render() {
    return (
      <div className="dropzone-file-select truncate-text">
        {this.renderOpenFileDialogButton()}
        {this.renderDropFileHint()}
      </div>
    )
  }
}

FileSelection.propTypes = {
  openFileDialog: func.isRequired,
  components: object.isRequired,
  disabled: bool,
}

export default FileSelection
