import Layout from '/components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Use custom layout if defined, otherwise use default Layout
  const getLayout = Component.getLayout || ((page) => (
    <Layout>{page}</Layout>
  ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
