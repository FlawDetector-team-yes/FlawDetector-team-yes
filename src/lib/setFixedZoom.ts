// 원하는 배율 설정
const fixedZoomLevel = 0.67; // 67%

// 배율 설정 함수
export function setFixedZoom() {
  document.body.style.zoom = fixedZoomLevel.toString();
}
