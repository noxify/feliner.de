import { useRouter, BlitzPage, Image, Link, Routes } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import FelinerLogo from "../../core/img/logo-feliner.svg"
import Layout from "app/core/layouts/Layout"
import { ArrowLeftIcon } from "@heroicons/react/solid"

const LoginPage: BlitzPage = () => {
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link href={Routes.SignupPage()}>
            <a className="font-medium text-feliner-500 hover:text-feliner-600">
              create a new account for free
            </a>
          </Link>
          .
        </p>
      </div>

      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />

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

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => (
  <Layout noHeader={true} title="Sign in">
    {page}
  </Layout>
)

export default LoginPage
