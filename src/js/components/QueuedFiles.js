import React, { PureComponent } from 'react'
import { array, bool, object } from 'prop-types'
import File from './File'

class QueuedFiles extends PureComponent {
  render() {
    return (
      <div>
        <ul className="dropzone-files">
          {this.props.activeFile &&
            <File
              file={this.props.activeFile}
              showPreview={this.props.showPreview}
            />
          }
          {this.props.pendingFiles.map(file => (
            <File
              key={file.name}
              file={file}
              showPreview={this.props.showPreview}
            />
          ))}
        </ul>
      </div>
    )
  }
}

QueuedFiles.propTypes = {
  activeFile: object.isRequired,
  pendingFiles: array.isRequired,
  showPreview: bool.isRequired,
}

export default QueuedFiles
