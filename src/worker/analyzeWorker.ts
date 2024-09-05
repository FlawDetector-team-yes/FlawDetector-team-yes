self.onmessage = async (event) => {
  const { fileId, name, content, apiUrl } = event.data;
  // console.log(content);

  try {
    // 진행 상황 업데이트를 위한 함수
    const updateProgress = (percent: number, status: string) => {
      self.postMessage({
        fileId,
        name,
        content,
        percent,
        status,
        type: "progress",
      });
    };

    // 총 요청 시간 (40초)
    const updateInterval = 1000; // 1초 간격으로 진행 상황 업데이트
    const progressSteps = [
      { percent: 30, duration: 10000 }, // 10초 동안 30%
      { percent: 50, duration: 10000 }, // 다음 10초 동안 50%
      { percent: 80, duration: 10000 }, // 다음 10초 동안 80%
      { percent: 100, duration: 10000 }, // 나머지 10초 동안 100%
    ];

    let currentStep = 0;
    let previousPercent = 0;
    let elapsedTime = 0;

    // 각 단계에서 목표 진행률까지 조금씩 증가시키며 업데이트
    const updateIntervalId = setInterval(() => {
      if (currentStep < progressSteps.length) {
        const step = progressSteps[currentStep];
        const stepDuration = step.duration;
        const stepPercentIncrement =
          (step.percent - previousPercent) / (stepDuration / updateInterval);

        elapsedTime += updateInterval;
        const percent = Math.min(
          previousPercent +
            stepPercentIncrement * (elapsedTime / updateInterval),
          step.percent,
        );
        updateProgress(Math.round(percent), "progress");

        if (elapsedTime >= stepDuration) {
          previousPercent = step.percent;
          elapsedTime = 0;
          currentStep++;
        }
      }
    }, updateInterval);

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

    // 진행 상황 업데이트 정지
    clearInterval(updateIntervalId);

    // 완료시 메인 스레드로 보냄
    console.log(result);
    updateProgress(100, "completed");
    self.postMessage({
      fileId,
      name,
      content,
      percent: 100,
      result,
      status: "completed",
      type: "completed",
    });
  } catch (error: any) {
    self.postMessage({
      fileId,
      name,
      content,
      percent: 0,
      status: "error",
      message: error.message,
      type: "error",
    });
  }
};
