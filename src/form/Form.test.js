import React from 'react'
import {screen, render, fireEvent, waitFor} from "@testing-library/react"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {CREATED_STATUS, SERVER_ERROR_STATUS, INVALID_REQUEST_STATUS} from '../const/httpStatus'

import Form from "./Form";

const server = setupServer(
  // Describe the requests to mock.
  rest.post('/products', (
    req,
    res,
    ctx) => {
    const {name, size, type} = req.body
    if(name && size && type){
      return res(ctx.status(CREATED_STATUS))
    }
    return res(ctx.status(SERVER_ERROR_STATUS))
    }
  ))



// Establish requests interception layer before all tests.
beforeAll(() => server.listen())

// Clean up after all tests are done, preventing this
// interception layer from affecting irrelevant tests.
afterAll(() => server.close())

beforeEach(()=>render(<Form/>))

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

describe('When the Form is mounted',  ()=> {
  it('should be a create product from page',  ()=> {
    expect(screen.getByRole('heading', {name: /Create Products/i}).toBeInTheDocument)
  })

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

describe('when the users submit the forms without values',  ()=>{

  it('should be display validation',  async ()=> {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name:/submit/i}))

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()

    await waitFor(()=>
      expect(screen.getByRole('button', {name: /submit/i})).not.toBeDisabled()
    )

  });
})

describe('when the user blurs an empty field', () => {
  it('should display a validation error message for the input name', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()

    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: {name: 'name', value: ''},
    })

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
  })

  it('should display a validation error message for the input size', () => {
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()

    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: {name: 'size', value: ''},
    })

    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
  })
})

describe('when the user submits the form', ()=>{

  it(
    'should the submit button be disabled until the response is done',
    async ()=> {

      const SubmitBtn = screen.getByRole('button', {name: /submit/i})

      expect(SubmitBtn).not.toBeDisabled()
      fireEvent.click(screen.getByRole('button', {name:/submit/i}))
      expect(SubmitBtn).toBeDisabled()

      await waitFor(()=>
        expect(SubmitBtn).not.toBeDisabled()
      )

    }
  )

  it(
    'the form page must display the success message "Product Stored" and clean the fields values',
    async()=>{

      const nameInput = screen.getByLabelText(/name/i)
      const sizeInput = screen.getByLabelText(/size/i)
      const typeSelect = screen.getByLabelText(/type/i)

      fireEvent.change(nameInput, {target:{name:'name', value:'My product'}})
      fireEvent.change(sizeInput, {target:{name:'size', value:'10'}})
      fireEvent.change(typeSelect, {target:{name:'type', value:'electronic'}})

      fireEvent.click(screen.getByRole('button', {name:/submit/i}))
      await waitFor(()=>
        expect(screen.getByText(/product stored/i)).toBeInTheDocument()
      )

      expect(nameInput).toHaveValue('')
      expect(sizeInput).toHaveValue('')
      expect(typeSelect).toHaveValue('')
    }
  )

})

describe('when de user submits the form and server returns an unexpected error', ()=>{
  it('the form page must display the error message "Unexpected error, Try again"', async ()=>{
    fireEvent.click(screen.getByRole('button', {name:/submit/i}))
    await waitFor(()=>
      expect(screen.getByText(/unexpected error, Try again/i)).toBeInTheDocument()
    )
  })

})

describe('when de user submits the form and server returns an invalid request error', ()=>{
  it('the form page must display the error message "The form is invalid, the fields [field1...fieldN] are required"', async () => {

    server.use(
      rest.post('/products', (req, res, ctx) => {
        return res(
          ctx.status(INVALID_REQUEST_STATUS),
          ctx.json({
            message:
              'The form is invalid, the fields name, size, type are required',
          }),
        )
      }),
    )

     fireEvent.click(screen.getByRole('button', {name: /submit/i}))

     await waitFor(() =>
       expect(
         screen.getByText(
           /the form is invalid, the fields name, size, type are required/i,
         ),
       ).toBeInTheDocument(),
     )
  })
})

describe('when the user submits the form and the server returns an invalid request error', () => {
  it('the form page must display the error message "connection error, please try later"', async () => {
    server.use(
      rest.post('/products', (req, res) =>
        res.networkError('Failed to connect'),
      ),
    )

    fireEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
      expect(
        screen.getByText(/connection error, please try later/i),
      ).toBeInTheDocument(),
    )
  })
})