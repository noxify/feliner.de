import { Head, BlitzLayout } from "blitz"
import Header from "../components/Header"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "feliner.de"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {children}
    </>
  )
}

export default Layout
