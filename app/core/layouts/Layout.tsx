import { Head, BlitzLayout } from "blitz"
import Header from "../components/Header"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode; noHeader?: boolean }> = ({
  title,
  noHeader,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "feliner.de"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {noHeader !== true ? <Header /> : <></>}

      {children}
    </>
  )
}

export default Layout
