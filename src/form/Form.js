import React from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

const Form = () => (
    <>
      <h1>Create Form</h1>
      <form  noValidate autoComplete="off">
        <TextField  label="name" id="name" />
        <TextField  label="size" id="size" />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          value=""
          inputProps={
            {id: "type"}
          }
        >
          <option value="electronic">electronic</option>
          <option value="furniture">furniture</option>
          <option value="clothing">clothing</option>
        </Select>
        <Button>Submit</Button>
      </form>
    </>
  )


export default Form