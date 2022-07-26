import { useState } from 'react'
// components
import BoxComponent from '../../components/Box'
import CardComponent from '../../components/Card'
import GridComponent from '../../components/Grid'
import TabsComponent from '../../components/Tabs'
import TabComponent from '../../components/Tab'
import { a11yProps, TabPanel } from '../../components/TabPanel'
// images
import bg from '../../assets/images/bg1.png'
// credential
import GetCredentialRequestForm from './getCredentialForm'
import GetCredentialEmailRequestForm from './getCredentialEmailForm'

const CredentialPage = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <GridComponent container justify="center" spacing={2} sx={{ p: '1rem' }}>
      <GridComponent item xs={12} md={6}>
        <CardComponent
          sx={{
            marginBottom: '5rem',
          }}
        >
          <BoxComponent>
            <TabsComponent
              value={value}
              onChange={handleChange}
              ariaLabel="Credential Tabs"
            >
              <TabComponent label="Display" {...a11yProps(0)} />
              <TabComponent label="Email" {...a11yProps(1)} />
            </TabsComponent>
          </BoxComponent>
          <TabPanel value={value} index={0}>
            <GetCredentialRequestForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GetCredentialEmailRequestForm />
          </TabPanel>
        </CardComponent>
      </GridComponent>
      <GridComponent
        item
        xs={12}
        md={6}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <BoxComponent
          alt="DI"
          component="img"
          src={bg}
          sx={{
            height: '80vh',
            width: 'auto',
            opacity: 0.8,
          }}
        />
      </GridComponent>
    </GridComponent>
  )
}

export default CredentialPage
