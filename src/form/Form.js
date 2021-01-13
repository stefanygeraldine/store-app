import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'

const Form = () => {
  const [errorText, setErrorText] = useState({
    name: '',
    size: '',
    type: '',
  })

  const handleSubmit = e =>{
    e.preventDefault()
    const {name, size, type} = e.target.elements
    if(!name.value){
      setErrorText((prevProps)=>({...prevProps, name:' the name is required'}))
    }
    if(!size.value){
      setErrorText((prevProps)=>({...prevProps, size:' the size is required'}))
    }
    if(!type.value){
      setErrorText((prevProps)=>({...prevProps, type:' the type is required'}))
    }
  }
  return (
    <>
      <h1>Create Form</h1>
      <form onSubmit={handleSubmit}  noValidate autoComplete="off">
        <TextField  label="name" id="name" helperText={errorText.name}/>
        <TextField  label="size" id="size" helperText={errorText.size}/>
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
        {errorText.type.length &&
        <FormHelperText>{errorText.type}</FormHelperText>
        }
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}


export default Form