import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

export interface LabeledPasswordFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledPasswordField = forwardRef<HTMLInputElement, LabeledPasswordFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <div className="mt-1">
            <input
              {...input}
              disabled={isSubmitting}
              {...props}
              ref={ref}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-feliner-500 focus:border-feliner-500 sm:text-sm"
            />
          </div>
        </label>

        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" className="text-feliner-500">
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    )
  }
)

export default LabeledPasswordField
