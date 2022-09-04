import Link from "next/link";
import Image from "next/image";
import Page from "@/components/Page"

export default function NotFoundPage() {
  return (
    <Page title="Page not found">
      <div>
      </div>
      <h1>Whooopss!</h1>
      <h2>
        This page does not exist
      </h2>
    </Page>
  );
}