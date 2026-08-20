import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Contact from './Contact'

function fillField(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: /send message/i }))
}

function fillValidForm() {
  fillField(/name/i, 'Jane Doe')
  fillField(/email/i, 'jane@example.com')
  fillField(/phone/i, '+15551234567')
  fillField(/message/i, 'Hello there')
}

describe('Contact', () => {
  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows specific inline errors under each field when submitted empty', () => {
    render(<Contact />)
    submit()

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter your email address.')).toBeInTheDocument()
    expect(screen.getByText('Please enter your phone number.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a message.')).toBeInTheDocument()

    // no generic banner
    expect(screen.queryByText(/invalid input/i)).not.toBeInTheDocument()
    // no success confirmation
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a specific error for an invalid email format', () => {
    render(<Contact />)
    fillField(/name/i, 'Jane Doe')
    fillField(/email/i, 'not-an-email')
    fillField(/phone/i, '+15551234567')
    fillField(/message/i, 'Hello there')

    submit()

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('rejects malformed phone numbers (letters, too short, too long)', () => {
    render(<Contact />)
    fillField(/name/i, 'Jane Doe')
    fillField(/email/i, 'jane@example.com')
    fillField(/message/i, 'Hello there')

    fillField(/phone/i, '555-CALL-NOW')
    submit()
    expect(
      screen.getByText('Please enter a valid phone number (7-15 digits, optional leading +).'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    fillField(/phone/i, '123')
    submit()
    expect(
      screen.getByText('Please enter a valid phone number (7-15 digits, optional leading +).'),
    ).toBeInTheDocument()

    fillField(/phone/i, '1234567890123456')
    submit()
    expect(
      screen.getByText('Please enter a valid phone number (7-15 digits, optional leading +).'),
    ).toBeInTheDocument()
  })

  it('submits successfully, shows an accessible confirmation, and resets the form', () => {
    render(<Contact />)
    fillValidForm()

    submit()

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/thanks for reaching out/i)

    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/phone/i)).toHaveValue('')
    expect(screen.getByLabelText(/message/i)).toHaveValue('')
  })
})
