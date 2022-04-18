import { BlitzPage, useMutation, Image, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import FelinerLogo from "../../core/img/logo-feliner.svg"
import { ArrowLeftIcon } from "@heroicons/react/solid"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="hidden h-8 w-auto"
                src={FelinerLogo}
                alt="Feliner.de Logo"
                width={48}
                height={48}
              />
              <span className="ml-4 text-2xl">Feliner.de</span>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Request submitted
            </h2>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                If your email is in our system, you will receive instructions to reset your password
                shortly.
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <Form
              submitText="Send Reset Password Instructions"
              className="space-y-6"
              schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error: any) {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }}
            >
              <LabeledTextField name="email" label="Email" placeholder="Email" type="text" />
            </Form>
          </>
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-8">
          <Link href={Routes.Home()}>
            <a className="text-black hover:text-feliner-600 py-2 px-4 rounded inline-flex items-center">
              <ArrowLeftIcon className="h-fill w-6 pr-2" /> Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <Layout title="Forgot Your Password?" noHeader={true}>
    {page}
  </Layout>
)

export default ForgotPasswordPage
