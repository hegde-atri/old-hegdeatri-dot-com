import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "@/components/Layout";

const Home: NextPage = ({characters}: any) => {
  return (
    <Layout>
        <h2>Child</h2>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async(context) =>{
    return {
        props: {
            characters: []
        }
    }
}

export default Home


