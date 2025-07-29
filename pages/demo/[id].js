import { useRouter } from "next/router";

export default function DempPage() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Blog Post : {id}</h1>;
}
