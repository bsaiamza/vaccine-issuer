import { useState } from 'react'
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import QRCode from 'react-qr-code'
import validate from 'za-id-validator'
// components
import ButtonComponent from '../../components/Button'
import FormikComponent from '../../components/Formik'
import FormComponent from '../../components/Form'
import TextFieldComponent from '../../components/TextField'
import TypographyComponent from '../../components/Typography'
// utils
import { VACCINE_ISSUER_URL } from '../../utils'

const apiURL = VACCINE_ISSUER_URL + '/credential'

const idValidation = data => {
  const errors = {}

  if (validate(data.id_number)) {
  } else {
    errors.id_number = 'Invalid ZA ID number!'
  }

  return errors
}

const GetCredentialForm = () => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState([])

  const sendOffer = async data => {
    setSubmitting(true)

    await toast.promise(
      axios
        .post(apiURL, data)
        .then(response => {
          setData(response.data)
          setSuccess(true)
          toast.success('Credential request generated!')
        })
        .catch(error => {
          toast.error(error.response.data.msg)
        }),
      {
        pending: 'Generating request...',
      }
    )

    setSubmitting(false)
  }

  return (
    <>
      <TypographyComponent variant="h5">
        Get my Vaccination Credential
      </TypographyComponent>
      <Divider />
      <div style={{ marginTop: '1rem' }}>
        <FormikComponent
          initialValues={{
            id_number: '',
            first_names: '',
            surname: '',
            date_of_birth: '',
            vaccine_type: '',
            vaccine_dose: '',
            date_of_vaccination: '',
            administering_centre: '',
            country_of_vaccination: '',
            next_vaccination_date: '',
            expiry_date: '',
          }}
          validate={idValidation}
          onSubmit={(values, { resetForm }) => {
            sendOffer(values)
            // resetForm()
          }}
        >
          {({ values, handleChange, touched, errors }) => (
            <FormComponent>
              <div>
                <TextFieldComponent
                  error={touched.id_number && Boolean(errors.id_number)}
                  helperText={touched.id_number && errors.id_number}
                  id="id_number"
                  name="id_number"
                  value={values.id_number}
                  onChange={handleChange}
                  label="ID Number"
                  sx={{ m: '1rem' }}
                  required
                />

                <TextFieldComponent
                  id="first_names"
                  name="first_names"
                  value={values.first_names}
                  onChange={handleChange}
                  label="First Names"
                  sx={{ m: '1rem' }}
                  required
                />
              </div>

              <div>
                <TextFieldComponent
                  id="surname"
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
                  label="Surname"
                  sx={{ m: '1rem' }}
                  required
                />

                <TextFieldComponent
                  id="date_of_birth"
                  name="date_of_birth"
                  value={
                    (values.date_of_birth =
                      values.id_number.substring(0, 1) > 2
                        ? '19' +
                          values.id_number.substring(0, 2) +
                          '-' +
                          values.id_number.substring(2, 4) +
                          '-' +
                          values.id_number.substring(4, 6)
                        : '20' +
                          values.id_number.substring(0, 2) +
                          '-' +
                          values.id_number.substring(2, 4) +
                          '-' +
                          values.id_number.substring(4, 6))
                  }
                  onChange={handleChange}
                  label="D.O.B"
                  sx={{ m: '1rem' }}
                  required
                  disabled
                />
              </div>

              <div>
                <FormControl sx={{ width: '16.5rem' }}>
                  <InputLabel
                    id="vaccine_type"
                    sx={{ margin: '1rem 0 0 1rem' }}
                  >
                    Vaccine Type
                  </InputLabel>
                  <Select
                    labelId="vaccine_type"
                    id="vaccine_type"
                    name="vaccine_type"
                    value={values.vaccine_type}
                    label="Vaccine Type"
                    onChange={handleChange}
                    sx={{ m: '1rem' }}
                    required
                  >
                    <MenuItem value="Influenza">Influenza</MenuItem>
                    <MenuItem value="SARS-CoV-2">SARS-CoV-2</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ width: '16.5rem' }}>
                  <InputLabel
                    id="vaccine_dose"
                    sx={{ margin: '1rem 0 0 1rem' }}
                  >
                    Vaccine Dose
                  </InputLabel>
                  <Select
                    labelId="vaccine_dose"
                    id="vaccine_dose"
                    name="vaccine_dose"
                    value={values.vaccine_dose}
                    label="Vaccine Dose"
                    onChange={handleChange}
                    sx={{ m: '1rem' }}
                    required
                  >
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <TextFieldComponent
                  id="date_of_vaccination"
                  name="date_of_vaccination"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values.date_of_vaccination}
                  onChange={handleChange}
                  label="Date of Vaccination"
                  sx={{ m: '1rem', width: '14.5rem' }}
                  required
                />

                <TextFieldComponent
                  id="administering_centre"
                  name="administering_centre"
                  value={values.administering_centre}
                  onChange={handleChange}
                  label="Administering Centre"
                  sx={{ m: '1rem' }}
                  required
                />
              </div>

              <div>
                <TextFieldComponent
                  id="country_of_vaccination"
                  name="country_of_vaccination"
                  value={values.country_of_vaccination}
                  onChange={handleChange}
                  label="Country of Vaccination"
                  sx={{ m: '1rem' }}
                  required
                />

                <TextFieldComponent
                  id="next_vaccination_date"
                  name="next_vaccination_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values.next_vaccination_date}
                  onChange={handleChange}
                  label="Next Vaccination Date"
                  sx={{ m: '1rem', width: '14.5rem' }}
                  required
                />
              </div>

              <div>
                <TextFieldComponent
                  id="expiry_date"
                  name="expiry_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values.expiry_date}
                  onChange={handleChange}
                  label="Expiry Date"
                  sx={{ m: '1rem', width: '14.5rem' }}
                  required
                />
              </div>

              <div>
                <ButtonComponent
                  variant="contained"
                  type="submit"
                  sx={{ color: '#fff', m: '1rem' }}
                  disabled={submitting}
                >
                  Submit
                </ButtonComponent>
              </div>
            </FormComponent>
          )}
        </FormikComponent>
      </div>

      {success && data.credential ? <QRCode value={data.credential} /> : ''}
    </>
  )
}

export default GetCredentialForm

// import { useState } from 'react'
// import { Divider } from '@mui/material'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import QRCode from 'react-qr-code'
// import validate from 'za-id-validator'
// // components
// import ButtonComponent from '../../components/Button'
// import FormikComponent from '../../components/Formik'
// import FormComponent from '../../components/Form'
// import TextFieldComponent from '../../components/TextField'
// import TypographyComponent from '../../components/Typography'

// const idValidation = data => {
//   const errors = {}

//   if (validate(data.id_number)) {
//   } else {
//     errors.id_number = 'Invalid ZA ID number!'
//   }

//   return errors
// }

// const GetCredentialForm = () => {
//   const [submitting, setSubmitting] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [data, setData] = useState([])

//   const sendOffer = async data => {
//     setSubmitting(true)
//     let apiURL = '/api/v1/vaccine/issuer/credential'

//     if (process.env.API_BASE_URL) {
//       apiURL = process.env.API_BASE_URL + '/vaccine/issuer/credential'
//     }

//     if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//       await toast.promise(
//         axios
//           .post(process.env.REACT_APP_API_URL + 'credential', data)
//           .then(response => {
//             setData(response.data)
//             setSuccess(true)
//             toast.success('Credential request generated!')
//           })
//           .catch(error => {
//             toast.error(error.response.data.msg)
//           }),
//         {
//           pending: 'Generating request...',
//         }
//       )
//     } else {
//       await toast.promise(
//         axios
//           .post(apiURL, data)
//           .then(response => {
//             setData(response.data)
//             setSuccess(true)
//             toast.success('Credential request generated!')
//           })
//           .catch(error => {
//             toast.error(error.response.data.msg)
//           }),
//         {
//           pending: 'Generating request...',
//         }
//       )
//     }
//     setSubmitting(false)
//   }

//   return (
//     <>
//       <TypographyComponent variant="h5">
//         Get my Vaccination Credential
//       </TypographyComponent>
//       <Divider />
//       <div style={{ marginTop: '1rem' }}>
//         <FormikComponent
//           initialValues={{
//             email: '',
//             id_number: '',
//             surname: '',
//             disease_or_gent_targeted: '',
//             vaccine_prophylaxis: '',
//             vaccine_medicinal_product: '',
//             vaccination_mfgr: '',
//             order_in_course: '',
//             batch_lot: '',
//             date_of_vaccination: '',
//             administering_centre: '',
//             healthProfessional_identification: '',
//             country_of_vaccination: '',
//             next_vaccination_date: '',
//             serial: '',
//             expiry_date: '',
//           }}
//           validate={idValidation}
//           onSubmit={(values, { resetForm }) => {
//             sendOffer(values)
//             // resetForm()
//           }}
//         >
//           {({ values, handleChange, touched, errors }) => (
//             <FormComponent>
//               <div>
//                 <TextFieldComponent
//                   error={touched.id_number && Boolean(errors.id_number)}
//                   helperText={touched.id_number && errors.id_number}
//                   id="id_number"
//                   name="id_number"
//                   value={values.id_number}
//                   onChange={handleChange}
//                   label="ID Number"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="forenames"
//                   name="forenames"
//                   value={values.forenames}
//                   onChange={handleChange}
//                   label="Forenames"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="surname"
//                   name="surname"
//                   value={values.surname}
//                   onChange={handleChange}
//                   label="Surname"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="disease_or_gent_targeted"
//                   name="disease_or_gent_targeted"
//                   value={values.disease_or_gent_targeted}
//                   onChange={handleChange}
//                   label="Disease or Gent Targeted"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="vaccine_prophylaxis"
//                   name="vaccine_prophylaxis"
//                   value={values.vaccine_prophylaxis}
//                   onChange={handleChange}
//                   label="Vaccine Prophylaxis"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="vaccine_medicinal_product"
//                   name="vaccine_medicinal_product"
//                   value={values.vaccine_medicinal_product}
//                   onChange={handleChange}
//                   label="Vaccine Medicinal Product"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="vaccination_mfgr"
//                   name="vaccination_mfgr"
//                   value={values.vaccination_mfgr}
//                   onChange={handleChange}
//                   label="Vaccination MFGR"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="order_in_course"
//                   name="order_in_course"
//                   value={values.order_in_course}
//                   onChange={handleChange}
//                   label="Order in Course"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="batch_lot"
//                   name="batch_lot"
//                   value={values.batch_lot}
//                   onChange={handleChange}
//                   label="Batch Lot"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="date_of_vaccination"
//                   name="date_of_vaccination"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={values.date_of_vaccination}
//                   onChange={handleChange}
//                   label="Date of Vaccination"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="administering_centre"
//                   name="administering_centre"
//                   value={values.administering_centre}
//                   onChange={handleChange}
//                   label="Administering Centre"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="healthProfessional_identification"
//                   name="healthProfessional_identification"
//                   value={values.healthProfessional_identification}
//                   onChange={handleChange}
//                   label="Health Professional Identification"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="country_of_vaccination"
//                   name="country_of_vaccination"
//                   value={values.country_of_vaccination}
//                   onChange={handleChange}
//                   label="Country of Vaccination"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="next_vaccination_date"
//                   name="next_vaccination_date"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={values.next_vaccination_date}
//                   onChange={handleChange}
//                   label="Next Vaccination Date"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <TextFieldComponent
//                   id="serial"
//                   name="serial"
//                   value={values.serial}
//                   onChange={handleChange}
//                   label="Serial"
//                   sx={{ m: '1rem' }}
//                   required
//                 />

//                 <TextFieldComponent
//                   id="expiry_date"
//                   name="expiry_date"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={values.expiry_date}
//                   onChange={handleChange}
//                   label="Expiry Date"
//                   sx={{ m: '1rem' }}
//                   required
//                 />
//               </div>

//               <div>
//                 <ButtonComponent
//                   variant="contained"
//                   type="submit"
//                   sx={{ color: '#fff', m: '1rem' }}
//                   disabled={submitting}
//                 >
//                   Display
//                 </ButtonComponent>
//               </div>
//             </FormComponent>
//           )}
//         </FormikComponent>
//       </div>

//       {success && data.credential ? <QRCode value={data.credential} /> : ''}
//     </>
//   )
// }

// export default GetCredentialForm
