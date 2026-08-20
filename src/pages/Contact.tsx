import { useState, FormEvent } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.message.trim()) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      // TODO: wire up real submission handling
      setSubmitted(true)
      setFormData(initialFormData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>

        {submitted && (
          <div className="mb-6 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-800">
            Thanks for reaching out — I'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange('message')}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 rounded-md bg-gray-900 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
