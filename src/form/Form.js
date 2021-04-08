import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  })

  const handleSubmit = e =>{
    e.preventDefault()
    const {name, size, type} = e.target.elements
    if(!name.value){
      setFormErrors((prevProps)=>({...prevProps, name:'The name is required'}))
    }
    if(!size.value){
      setFormErrors((prevProps)=>({...prevProps, size:'The size is required'}))
    }
    if(!type.value){
      setFormErrors((prevProps)=>({...prevProps, type:'The type is required'}))
    }
  }

  const handleBlur = e => {
    const {name, value} = e.target

    setFormErrors({
      ...formErrors,
      [name]: value.length ? '' : `The ${name} is required`,
    })
  }

  return (
    <>
      <h1>Create Form</h1>
      <form onSubmit={handleSubmit}  noValidate autoComplete="off">
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
          value=""
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}


export default Form