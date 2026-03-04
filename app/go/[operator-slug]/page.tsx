import { sportsbooks, casinos } from "@/lib/data";
import GoRedirect from "./GoRedirect";

interface Props {
  params: { "operator-slug": string };
}

export async function generateStaticParams() {
  const sbSlugs = sportsbooks.map((s) => ({ "operator-slug": s.slug }));
  const casinoSlugs = casinos.map((c) => ({ "operator-slug": c.slug }));
  return [...sbSlugs, ...casinoSlugs];
}

export default function GoPage({ params }: Props) {
  return <GoRedirect slug={params["operator-slug"]} />;
}
