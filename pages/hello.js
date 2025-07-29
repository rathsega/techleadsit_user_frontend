import { useRouter } from "next/router";

export default function Hello() {
  const router = useRouter();
//   const { id } = router.query;

  return <h1>Blog Post</h1>;
}
