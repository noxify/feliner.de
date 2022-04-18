import { BlitzPage, useRouterQuery, Link, useMutation, Routes, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import FelinerLogo from "../../core/img/logo-feliner.svg"
import { ArrowLeftIcon } from "@heroicons/react/solid"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

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
              Password Reset Successfully
            </h2>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                You&apos;re password has been changed successfully.
                <br />
                You can now{" "}
                <Link href={Routes.LoginPage()}>
                  <a className="text-feliner-500 hover:t4ext-feliner-600">sign in</a>
                </Link>{" "}
                with your new credentials.
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Set a new password
            </h2>

            <Form
              submitText="Reset Password"
              className="space-y-6"
              schema={ResetPassword}
              initialValues={{
                password: "",
                passwordConfirmation: "",
                token: query.token as string,
              }}
              onSubmit={async (values) => {
                try {
                  await resetPasswordMutation(values)
                } catch (error: any) {
                  if (error.name === "ResetPasswordError") {
                    return {
                      [FORM_ERROR]: error.message,
                    }
                  } else {
                    return {
                      [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                    }
                  }
                }
              }}
            >
              <LabeledTextField name="password" label="New Password" type="password" />
              <LabeledTextField
                name="passwordConfirmation"
                label="Confirm New Password"
                type="password"
              />
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

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password" noHeader={true}>
    {page}
  </Layout>
)

export default ResetPasswordPage
