import React from 'react'
import {screen, render, fireEvent} from "@testing-library/react"
import Form from "./Form";

describe('When the Form is mounted',  ()=> {
  beforeEach(()=>render(<Form/>))

  it('should be a create product from page',  ()=> {
    expect(screen.getByRole('heading', {name: /Create Form/i}).toBeInTheDocument)
  });

  it('should exist the fields: name size, type (electronic, furniture, clothing)',  ()=> {

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()

  });

  it('should exist submit button',  ()=> {
    expect(screen.getByRole('button', {name:/submit/i})).toBeInTheDocument()
  });
})

describe('when the users submit the forms without values', ()=>{
  beforeEach(()=>render(<Form/>))
  it('should be display validation',  ()=> {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name:/submit/i}))

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  });
})