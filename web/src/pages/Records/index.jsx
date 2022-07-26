import MaterialTable from '@material-table/core'
import { Refresh } from '@mui/icons-material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// components
import TypographyComponent from '../../components/Typography'
// utils
import { VACCINE_ISSUER_URL } from '../../utils'

const apiURL = VACCINE_ISSUER_URL + '/credentials'

const CredentialRecordsPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(apiURL)
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  const refreshCredentialRecords = async () => {
    await toast.promise(
      axios
        .get(apiURL)
        .then(response => {
          setData(response.data)
          toast.success('Refreshed credential records!')
        })
        .catch(error => console.log(error)),
      {
        pending: 'Refreshing...',
      }
    )
  }

  return (
    <>
      <div style={{ margin: '2rem' }}>
        <MaterialTable
          style={{ padding: '1rem' }}
          title={
            <TypographyComponent
              variant="h5"
              sx={{ textDecoration: 'underline' }}
            >
              Credential Records
            </TypographyComponent>
          }
          data={data}
          columns={[
            {
              title: (
                <TypographyComponent variant="h6">
                  Created On
                </TypographyComponent>
              ),
              field: 'created_at',
              type: 'datetime',
            },
            {
              title: (
                <TypographyComponent variant="h6">
                  Connection ID
                </TypographyComponent>
              ),
              field: 'connection_id',
            },
            {
              title: (
                <TypographyComponent variant="h6">
                  Credential Exchange ID
                </TypographyComponent>
              ),
              field: 'credential_exchange_id',
            },
            {
              title: (
                <TypographyComponent variant="h6">
                  Issuance State
                </TypographyComponent>
              ),
              field: 'state',
            },
            {
              title: (
                <TypographyComponent variant="h6">
                  Updated On
                </TypographyComponent>
              ),
              field: 'updated_at',
              type: 'datetime',
            },
          ]}
          actions={[
            {
              icon: () => <Refresh />,
              tooltip: 'Refresh records',
              isFreeAction: true,
              onClick: () => refreshCredentialRecords(),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <div style={{ marginBottom: '2rem' }} />
    </>
  )
}

export default CredentialRecordsPage
