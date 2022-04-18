import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const PasswordLabel = (
    <>
      Password{" "}
      <span className="text-xs">
        ({" "}
        <Link href={Routes.ForgotPasswordPage()}>
          <a className="text-feliner-500 hover:text-feliner-600">Forgot your password?</a>
        </Link>{" "}
        )
      </span>
    </>
  )

  return (
    <div>
      <Form
        submitText="Login"
        className="space-y-6"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" type="text" />
        <LabeledTextField
          name="password"
          label={PasswordLabel}
          placeholder="Password"
          type="password"
        />
      </Form>
    </div>
  )
}

export default LoginForm
