import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch'

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	fetch
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
					<link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700&display=swap" rel="stylesheet"/>
        </Head>
				<ApolloProvider client={client}>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</ApolloProvider>
      </React.Fragment>
    );
  }
}
