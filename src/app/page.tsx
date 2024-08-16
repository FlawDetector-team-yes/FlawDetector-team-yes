import CardArticle from "@/components/landing/CardArticle";
import HeadArticle from "@/components/landing/HeadArticle";
import SecondArticle from "@/components/landing/SecondArticle";
import ServiceArticle from "@/components/landing/ServiceArticle";
import ThirdArticle from "@/components/landing/ThirdArticle";

export default function Home() {
  return (
    <>
      <HeadArticle />
      <SecondArticle />
      <ThirdArticle />
      <CardArticle />
      <ServiceArticle />
    </>
  );
}
