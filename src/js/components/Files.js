import React, { PureComponent } from 'react'
import { array, bool, func, object, oneOfType } from 'prop-types'
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
              downloadOnClick={this.props.downloadOnClick}
              showPreview={this.props.showPreview}
              removeFile={this.props.removeFile}
              uploadOnDrop={this.props.uploadOnDrop}
              components={this.props.components}
            />
          ))}
        </ul>
      </div>
    )
  }
}

Files.propTypes = {
  components: object,
  disabled: bool.isRequired,
  downloadOnClick: oneOfType([bool, func]).isRequired,
  files: array.isRequired,
  removeFile: func.isRequired,
  showPreview: bool.isRequired,
  uploadOnDrop: bool.isRequired,
}

export default Files
