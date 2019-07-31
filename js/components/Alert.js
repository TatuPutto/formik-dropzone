import React from 'react'
import { func, object, oneOfType, string } from 'prop-types'

const Alert = ({ color = "info", children, className, icon, style = null }) => (
  <div className={"alert alert-" + color + " " + className} style={style}>
    <div className="alert-icon-container">
      {color === "info" ?
        <span className={"fas fa-" + (icon || "info-circle")} />
          : color === "success" ?
            <span className={"fas fa-" + (icon || "check")} />
            : color === "danger" ?
              <span className={"fas fa-" + (icon || "exclamation-triangle")} />
              : color === "warning" &&
                <span className={"fas fa-" + (icon || "exclamation-circle")} />
      }
    </div>
    <div className="alert-content">
      {children}
    </div>
  </div>
)

Alert.propTypes = {
  children: oneOfType([func, object, string]).isRequired,
  className: string,
  color: string,
  icon: string,
  style: object
}

export default Alert
