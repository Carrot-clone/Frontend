import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import BaseLayout from '../components/layout/BaseLayout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
};

export default App;
