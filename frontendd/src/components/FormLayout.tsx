import { ReactNode } from 'react'

const FormLayout = ({children}:{children:ReactNode}) => {
  return (
    <section className="card p-4 rounded w-96">
        {children}
    </section>
  )
}

export default FormLayout