import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page not found">
      <div>
      </div>
      <h1>Whooopss!</h1>
      <h2>
        This page does not exist
      </h2>
    </Layout>
  );
}