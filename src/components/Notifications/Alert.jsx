import React, { useContext } from 'react'
import { Alert as TablerAlert } from 'tabler-react'
import { ServerResponseContext } from '../../context/ServerResponseProvider'

const Alert = () => {
  const [{ serverResponse }] = useContext(ServerResponseContext)
  return (
    serverResponse
        && (
          <TablerAlert type={serverResponse.type}>
            {serverResponse.message}
          </TablerAlert>
        )
  )
}

export default Alert
