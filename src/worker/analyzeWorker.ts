self.onmessage = async (event) => {
  const { fileId, content, apiUrl } = event.data;
  // console.log(content);

  try {
    // POST 요청을 비동기로 수행
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to check file ${fileId}: ${response.statusText}`);
    }

    // 요청 결과
    const result = await response.text();

    // 완료시 메인 스레드로 보냄
    // console.log(result);
    self.postMessage({ fileId, percent: 100, result, status: "completed" });
  } catch (error: any) {
    self.postMessage({
      fileId,
      percent: 0,
      status: "error",
      message: error.message,
    });
  }
};
