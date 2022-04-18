import { useRouter, BlitzPage, Routes, Image, Link } from "blitz"
import { SignupForm } from "app/auth/components/SignupForm"
import FelinerLogo from "../../core/img/logo-feliner.svg"
import Layout from "app/core/layouts/Layout"
import { ArrowLeftIcon } from "@heroicons/react/solid"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link href={Routes.LoginPage()}>
            <a className="font-medium text-feliner-500 hover:text-feliner-600">
              sign in with your existing account
            </a>
          </Link>
          .
        </p>
      </div>

      <SignupForm onSuccess={() => router.push(Routes.Home())} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-8">
        <Link href={Routes.Home()}>
          <a className="text-black hover:text-feliner-600 py-2 px-4 rounded inline-flex items-center">
            <ArrowLeftIcon className="h-fill w-6 pr-2" /> Back to home
          </a>
        </Link>
      </div>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => (
  <Layout noHeader={true} title="Sign up">
    {page}
  </Layout>
)

export default SignupPage
