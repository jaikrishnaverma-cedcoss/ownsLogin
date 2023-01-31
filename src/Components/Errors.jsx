import { Button, Card, Toast, ToastWrapper } from '@cedcommerce/ounce-ui'
import React from 'react'

const Errors = () => {
  return (
    

  <React.Fragment key=".0">
    <ToastWrapper>
      <Toast
        message="Invalid Email"
        timeout={1000}
        type="error"
      />
    </ToastWrapper>
  </React.Fragment>

  )
}

export default Errors