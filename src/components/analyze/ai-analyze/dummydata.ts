import { TFormattedRes } from "@/store/useAnalyzeStore";

export const securityResDummyData: TFormattedRes[] = [
  {
    title: "XSS (Cross-Site Scripting) Vulnerability",
    description:
      "사용자 입력을 HTML에 직접 삽입하면서 HTML을 안전하게 처리하지 않음. 사용자 입력을 HTML에 삽입하기 전에 반드시 적절한 인코딩을 수행하거나, DOM API를 사용해 안전하게 요소를 삽입해야함.‘innerHTML’은 입력된 HTML 코드를 그대로 렌더링하기 때문에 악성 스크립트를 실행할 수 있음. ‘textContent’는 HTML을 해석하지 않고 텍스트로만 처리하기 때문에 안전함.",
    code: "function displayUserInput(input) {document.getElementById('userInput').textContent = input; // textContent를 사용해 XSS 예방}",
    line: 5,
  },
  {
    title: "CSRF (Cross-Site Request Forgery) Vulnerability",
    description: "CSRF 보호 매커니즘 없이 민감한 작업을 수행할 수 있음",
    code: "function submitForm() {var csrfToken = getCsrfToken(); // 서버에서 생성된 CSRF 토큰 가져오기 \n...\nhiddenField.setAttribute('value', csrfToken); // CSRF 토큰 추가}",
    line: 15,
  },
];

export const suggestResDummyData: TFormattedRes[] = [
  {
    title: "`URL.createObjectURL()` 메모리 누수",
    description:
      "메모리 누수를 방지하려면, `URL.createObjectURL()`로 만들어진 URL을 사용하고 나서 삭제하세요. `URL.revokeObjectURL()` 메소드를 사용하지 않는 것을 권장합니다.",
    code: "URL.revokeObjectURL(url);",
    line: 11,
  },
  {
    title: "사용자 input 초기회를 통한 DOM-based XSS를 방지",
    description:
      "DOM-based XSS를 방지하려면, 사용자 input을 초기화 시켜주세요. DOMPurify와 같은 라이브러리를 사용하는 방법을 고려해볼 수 있습니다.",
    code: "const sanitizedFont = DOMPurify.sanitize(font); ctx.font = `${size}px ${sanitizedFont}`;",
    line: 13,
  },
];
