import { Divider } from '@mui/material'
// components
import BoxComponent from '../../components/Box'
import ButtonComponent from '../../components/Button'
import GridComponent from '../../components/Grid'
import TypographyComponent from '../../components/Typography'
// images
import bg from '../../assets/images/bg1.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <BoxComponent sx={{ m: '2rem' }}>
      <GridComponent container spacing={2}>
        <GridComponent item xs={12} md={6}>
          <BoxComponent sx={{ textAlign: 'center' }}>
            <TypographyComponent variant="h2" color="Grey">
              IAMZA Vaccine Issuer
            </TypographyComponent>
            <TypographyComponent
              variant="h5"
              color="Grey"
              sx={{ marginBottom: '1rem' }}
            >
              Vaccine credentials made reliable and easy.
            </TypographyComponent>
            <Divider />
          </BoxComponent>
          <ButtonComponent variant="contained" sx={{ m: '2rem' }}>
            <Link
              to="issue-credential"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Get my Vaccine Credential
            </Link>
          </ButtonComponent>
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
    </BoxComponent>
  )
}

export default HomePage
