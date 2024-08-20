import Card from "./Card";

// 카드 데이터 배열
const cardData = [
  {
    color: "#ff81a6",
    bgColor: "#FFF2F7",
    labelText: "보안 강화",
    image: "🔐",
    description: (
      <>
        보안 취약점 사전 식별 후 해결
        <br />
        소프트웨어 보안성 강화
      </>
    ),
  },
  {
    color: "#00987c",
    bgColor: "#ddfff2",
    labelText: "미션 크리티컬한 개발에 적합",
    image: "⚙️",
    description: (
      <>
        미션 크리티컬한 개발 특별 제작
        <br />
        안전한 솔루션 제공
      </>
    ),
  },
  {
    color: "#a54bff",
    bgColor: "#f4e3ff",
    labelText: "실시간 보안 업데이트",
    image: "🔏",
    description: (
      <>
        최신 보안 동향 및 취약점 정보 실시간 제공
        <br />
        개발자 보안 강화를 도움
      </>
    ),
  },
  {
    color: "#4b93ff",
    bgColor: "#e3f2ff",
    labelText: "사용자 데이터 보호",
    image: "✋🏻",
    description: (
      <>
        데이터 무단 액세스 및 정보 유출 방지
        <br />
        개인 정보 안전하게 보호
      </>
    ),
  },
  {
    color: "#ff8900",
    bgColor: "#fffae3",
    labelText: "효율적인 개발",
    image: "🔄",
    description: (
      <>
        보안 취약점 자동 분석후 수정
        <br />
        개발 집중 및 생산성 향상
      </>
    ),
  },
  {
    color: "#ff3d00",
    bgColor: "#ffeae3",
    labelText: "신속한 대응과 수정",
    image: "✅️",
    description: (
      <>
        발견된 취약점 대응 및 수정
        <br />
        안전한 소프트웨어 개발 가능
      </>
    ),
  },
];

/**
 * CardArticle - CardList - Card - Label
 * `CardList` 컴포넌트는 카드 데이터 배열을 사용하여 여러 `Card` 컴포넌트를 렌더링합니다.
 *
 * @returns {JSX.Element} 카드 목록을 포함하는 JSX 요소를 반환합니다.
 */
function CardList() {
  return (
    <div className="inline-flex items-start justify-start gap-12">
      {cardData.map((card, index) => (
        <Card
          key={index}
          color={card.color}
          bgColor={card.bgColor}
          labelText={card.labelText}
          image={card.image}
        >
          {card.description}
        </Card>
      ))}
    </div>
  );
}

export default CardList;
