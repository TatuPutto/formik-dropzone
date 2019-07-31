import React, { PureComponent } from 'react'
import { bool, func, object } from 'prop-types'
import l10n from '../util/l10n'

class File extends PureComponent {
  renderPreview = () => {
    const { file, showPreview } = this.props
    let preview = null

    if (!showPreview || !file.type) {
      return preview
    }

    if (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg')) {
      preview = <img className="dropzone-file-preview" src={file.preview} />
    } else if (file.type.includes('pdf')) {
      preview = <span className="far fa-file-pdf dropzone-file-preview-placeholder" />
    } else if (file.type.includes('msword')) {
      preview = <span className="far fa-file-word dropzone-file-preview-placeholder" />
    } else {
      preview = <span className="far fa-file-alt dropzone-file-preview-placeholder" />
    }

    return (
      <div className="dropzone-file-preview-container">
        {preview}
      </div>
    )
  }

  renderFileTypeIcon = () => {
    if (!this.props.includeFileTypeIcons) {
      return null
    }

    const { file } = this.props
    const fileType = file.type || file.contentType || file.name.split('.').pop()
    let icon

    if ((fileType.includes('png') || fileType.includes('jpg') || fileType.includes('jpeg')) && file.preview) {
      icon = <img className="dropzone-file-preview" src={file.preview} />
    } else if (fileType.includes('png') || fileType.includes('jpg') || fileType.includes('jpeg')) {
      icon = <span className="far fa-file-image dropzone-file-preview-placeholder" />
    } else if (fileType.includes('pdf')) {
      icon = <span className="far fa-file-pdf dropzone-file-preview-placeholder" />
    } else if (fileType.includes('msword')) {
      icon = <span className="far fa-file-word dropzone-file-preview-placeholder" />
    } else {
      icon = <span className="far fa-file-alt dropzone-file-preview-placeholder" />
    }

    return (
      <div className="dropzone-file-preview-container">
        {icon}
      </div>
    )
  }

  renderFileContent = () => {
    const { file, disabled } = this.props

    return (
      <span className="dropzone-file-content truncated">
        <a href={!disabled && (file.location || file.preview)} target="_blank">
          {file.name}
          {!disabled && (file.location || file.preview) &&
            <span className="fas fa-external-link-alt ml-2" />
          }
        </a>
        {this.renderUploadStatus()}
      </span>
    )
  }

  renderUploadStatus = () => {
    const file = this.props.file

    if (!file.status || file.status === 'UPLOADED' || file.status === 'UPLOAD_POSTPONED') {
      return null
    }

    if (file.status === 'PENDING') {
      return (
        <div className="text-muted">
          <small>
            <span className="fas fa-clock" />
            {" "} Odottaa...
          </small>
        </div>
      )
    } else if (file.status === 'UPLOADING') {
      return (
        <div className="text-muted">
          <small>
            <span className="fas fa-spinner fa-spin fa-pulse" />
            {" " + l10n('uploading', 'Lähetetään...')}
          </small>
        </div>
      )
      // return (
      //   <div className="dropzone-file-upload-progress-container">
      //     <div
      //       className="dropzone-file-upload-progress text-primary"
      //       style={{ width: `${file.progress}%` }}
      //     />
      //   </div>
      // )
    } else if (file.status === 'DECLINED' || file.status === 'RESENDABLE') {
      return (
        <div className="text-danger">
          <small>
            <span className="fas fa-exclamation-triangle" />
            {' ' + file.error}
          </small>
        </div>
      )
    }
  }

  renderActionButton = () => {
    const { file, disabled } = this.props

    if (!file.status || file.status === 'UPLOADED' || file.status === 'UPLOAD_POSTPONED') {
      return (
        <div style={{marginLeft: "0.5rem"}}>
          <button
            type="button"
            className="dropzone-file-action-btn dropzone-remove-file-btn"
            disabled={disabled}
            onClick={() => this.props.removeFile(file)}
          >
            <span className="far fa-trash-alt" />
          </button>
        </div>
      )
    } else if (file.status && file.status === 'UPLOADING') {
      /*return (
        <button
          type="button"
          className="dropzone-file-action-btn dropzone-cancel-upload-btn"
          onClick={() => this.props.removeFile(file)}
        >
          <span className="far fa-trash-alt" />
        </button>
      )*/
      return null
    } else if (file.status && file.status === 'REMOVING') {
      return (
        <div style={{marginLeft: "0.5rem"}}>
          <button
            type="button"
            className="dropzone-file-action-btn dropzone-remove-file-btn"
            disabled={disabled}
            style={{cursor: 'not-allowed'}}
          >
            <span className="fas fa-spinner fa-pulse fa-spin" />
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const file = this.props.file

    return (
      <li key={file.name} className="dropzone-file">
        {this.renderFileTypeIcon()}
        {this.renderFileContent()}
        {this.renderActionButton()}
      </li>
    )
  }
}

File.propTypes = {
  file: object.isRequired,
  includeFileTypeIcons: bool.isRequired,
  showPreview: bool.isRequired,
  uploadOnDrop: bool.isRequired,
  disabled: bool,
  removeFile: func,
}

export default File
