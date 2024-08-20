import CardArticle from "@/components/landing/CardArticle";
import HeadArticle from "@/components/landing/HeadArticle";
import SecondArticle from "@/components/landing/SecondArticle";
import ServiceArticle from "@/components/landing/ServiceArticle";
import ThirdArticle from "@/components/landing/ThirdArticle";
import TopButton from "@/components/landing/TopButton";

export default function Home() {
  return (
    <>
      <TopButton />
      <HeadArticle />
      <SecondArticle />
      <ThirdArticle />
      <CardArticle />
      <ServiceArticle />
    </>
  );
}
