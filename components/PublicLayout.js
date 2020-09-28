import Head from "next/dist/next-server/lib/head";
import ProgressBar from "./ProgressBar";

const PublicLayout = (props) => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>
      <ProgressBar/>
      {props.children}
    </div>
)
}

export default PublicLayout
