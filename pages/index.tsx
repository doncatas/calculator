import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import type {ReactElement} from 'react'
import type { NextPageWithLayout } from './_app'
import {useEffect} from "react";
import Calculator from "../components/calculator";

const Page: NextPageWithLayout = () => {
    useEffect(() => {
        console.log('-Page rendered')
    }, [])
  return (
    <>
      <Head>
        <title>Calculator</title>
      </Head>
      <main>
        <Calculator />
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>{page}</Layout>
  )
}

export default Page
