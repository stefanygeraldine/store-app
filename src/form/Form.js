import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
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
    }
    if ( error.status === INVALID_REQUEST_STATUS ) {
      const data = await error.json()
      setServerMessage(data.message)
    }
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
    <>
      <h1>Create Form</h1>
      <p>{serverMessage}</p>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="name"
          id="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />
        <TextField
          label="size"
          id="size"
          name="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          inputProps={
            {id: "type"}
          }
        >
          <option value="">seleccione</option>
          <option value="electronic">electronic</option>
          <option value="furniture">furniture</option>
          <option value="clothing">clothing</option>
        </Select>
        {formErrors.type.length &&
        <FormHelperText>{formErrors.type}</FormHelperText>
        }
        <Button disabled={isSaving} aria-disabled={isSaving} type="submit">Submit</Button>
      </form>
    </>
  )
}


export default Form