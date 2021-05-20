import React from 'react'
import { func, object, oneOfType, string } from 'prop-types'

const Alert = ({ color = "info", children, className, icon, style = null }) => (
  <div className={"mr-2 alert alert-" + color + " " + className} style={style}>
    {color === "info" ?
      <span className={"fas fa-" + (icon || "info-circle")} />
        : color === "success" ?
          <span className={"fas fa-" + (icon || "check")} />
          : color === "danger" ?
            <span className={"fas fa-" + (icon || "exclamation-triangle")} />
            : color === "warning" &&
              <span className={"fas fa-" + (icon || "exclamation-circle")} />
    }
    {children}
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
