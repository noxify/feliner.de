import { Menu, Transition } from "@headlessui/react"
import logout from "app/auth/mutations/logout"
import { useMutation, Link, Routes } from "blitz"
import classNames from "classnames"
import { Fragment } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
            </Transition>
          </Menu>
        </div>

        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex-shrink-0">
          <Link href={Routes.LoginPage()}>
            <a className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-feliner-500 hover:bg-feliner-600 focus:outline-none focus:ring-0">
              <span>Sign In</span>
            </a>
          </Link>
        </div>
      </>
    )
  }
}

export default UserInfo
