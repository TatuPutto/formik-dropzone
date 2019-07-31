import React, { PureComponent } from 'react'
import { array, bool, func } from 'prop-types'
import File from './File'

class Files extends PureComponent {
  render() {
    return (
      <div>
        <ul className="dropzone-files">
          {this.props.files.map(file => (
            <File
              key={file.name}
              file={file}
              disabled={this.props.disabled}
              showPreview={this.props.showPreview}
              removeFile={this.props.removeFile}
              uploadOnDrop={this.props.uploadOnDrop}
            />
          ))}
        </ul>
      </div>
    )
  }
}

Files.propTypes = {
  disabled: bool.isRequired,
  files: array.isRequired,
  removeFile: func.isRequired,
  showPreview: bool.isRequired,
  uploadOnDrop: bool.isRequired,
}

export default Files
