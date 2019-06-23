// @flow

import React from "react"
import BaseCell from "../BaseCell"

export class CellErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // TODO
  }

  render() {
    if (this.state.hasError) {
      return (
        <BaseCell {...this.props.cellProps}>
          <div style={{ color: "#f00" }}>Error Rendering Cell</div>
        </BaseCell>
      )
    }

    return this.props.children
  }
}

export default CellErrorBoundary
