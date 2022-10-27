import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { wrapper } from "../store/store";

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My TODO List APP</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
