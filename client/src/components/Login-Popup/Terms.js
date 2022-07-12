import React from 'react'
import {Header, Modal } from 'semantic-ui-react'
import './Terms.css'

function Terms() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<div id="TermsText">terms and condition and privacy policy.</div>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content='Terms and Condition'/>
          <Modal.Content>
                <p>
                Your inbox is getting full, would you like us to enable automatic
                archiving of old messages? Your inbox is getting full, would you like us to enable automatic
                archiving of old messages? Your inbox is getting full, would you like us to enable automatic
                archiving of old messages?
                </p>
          </Modal.Content>
    </Modal>
  )
}


export default Terms;