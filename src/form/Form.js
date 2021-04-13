import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'

import  Container from '@material-ui/core/Container'
import  Grid from '@material-ui/core/Grid'
import  Card from '@material-ui/core/Card'
import  Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import {CREATED_STATUS, INVALID_REQUEST_STATUS, SERVER_ERROR_STATUS} from '../const/httpStatus'

import {saveProduct} from '../services/ProductsService'

const Form = () => {
  const [ isSaving, setIsSaving ] = useState(false)

  const [ serverMessage, setServerMessage ] = useState('')
  const [ formErrors, setFormErrors ] = useState({
    name: '',
    size: '',
    type: '',
  })

  const validateFields = ({name, value}) => {
    setFormErrors((prevProps) => ( {
      ...prevProps,
      [name]: value
        ? ''
        : `The ${name} is required`
    } ))
  }

  const validateForm = ({name, size, type}) => {

    validateFields({name: 'name', value: name})
    validateFields({name: 'size', value: size})
    validateFields({name: 'type', value: type})
  }

  const getFormValues = (name, size, type) => ({
    name: name.value,
    size: size.value,
    type: type.value
  })

  const handleError = async error => {

    if ( error.status === SERVER_ERROR_STATUS ) {
      setServerMessage('Unexpected error, Try again')
      return
    }

    if ( error.status === INVALID_REQUEST_STATUS ) {
      const data = await error.json()
      setServerMessage(data.message)
      return
    }

    setServerMessage('Connection error, please try later')

  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSaving(true)
    const {name, size, type} = e.target.elements

    validateForm(getFormValues(name, size, type))
    try{
      const response = await saveProduct(getFormValues(name, size, type))
      if(!response.ok){
        throw response
      }
      if ( response.status === CREATED_STATUS ) {
        e.target.reset()
        setServerMessage('Product stored')
      }
    }catch (error) {
      handleError(error)
    }

    setIsSaving(false)

  }

  const handleBlur = e => {
    const {name, value} = e.target

    validateFields({name, value})
  }

  return (
    <Container maxWidth="sm">
      <br/>
      <br/>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        style={{
          color: '#d65382',
          fontSize: 35,
        }}
      >Create Products</Typography>
      <Typography component="p" variant="body1">{serverMessage}</Typography>

      <br/>
      <Card
        style={{
          padding: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.45)'
        }}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={4} justify="center" alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                variant="outlined"
                style={{width:'100%'}}
                label="Name"
                id="name"
                name="name"
                helperText={formErrors.name}
                error={!!formErrors.name.length}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                variant="outlined"
                style={{width:'100%'}}
                label="Size"
                id="size"
                name="size"
                helperText={formErrors.size}
                error={!!formErrors.size.length}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputLabel htmlFor="type" style={{
                marginBottom: 5
              }}>Type</InputLabel>
              <Select
                variant="outlined"
                error={!!formErrors.type.length}
                style={{width:'100%'}}
                native
                inputProps={
                  {id: "type"}
                }
                onChange={()=>{
                  setFormErrors((prevProps) => ( {
                    ...prevProps,
                    type: ''
                  } ))
                }}
              >

                <option value="">seleccione</option>
                <option value="electronic">electronic</option>
                <option value="furniture">furniture</option>
                <option value="clothing">clothing</option>
              </Select>
              {!!formErrors.type.length &&
              <FormHelperText error={!!formErrors.type.length}>{formErrors.type}</FormHelperText>
              }
            </Grid>
            <Grid item>
              <Button
                disabled={isSaving}
                aria-disabled={isSaving}
                type="submit"
                style={{
                  backgroundColor: '#d65483',
                  color: '#fff',
                  width: '120px',
                }}
              >Submit</Button>
            </Grid>
          </Grid>
        </form>

      </Card>
    </Container>
  )
}


export default Form