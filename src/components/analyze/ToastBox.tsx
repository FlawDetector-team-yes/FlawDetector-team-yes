import { Toaster } from "sonner";

function ToastBox({ position }: { position: { top: number; right: number } }) {
  return (
    <Toaster
      expand
      visibleToasts={1}
      position="top-right"
      duration={Infinity}
      style={{
        zIndex: 0, // Adjust zIndex to be lower than the modal's background
        position: "fixed", // 절대 위치 설정
        top: `${position.top + 15}px`, // CodeViewer의 상단에서 10px 떨어짐
        left: `${position.right - 420}px`, // CodeViewer의 오른쪽에서 10px 떨어짐
      }}
    />
  );
}
export default ToastBox;
