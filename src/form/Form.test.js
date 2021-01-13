import React from 'react'
import {screen, render} from "@testing-library/react"
import Form from "./Form";

describe('When the Form is mounted',  ()=> {
  beforeEach(()=>render(<Form/>))

  it('should be a create product from page',  ()=> {
    //expect(screen.queryByText(/Create Form/i).toBeInTheDocument)
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
});