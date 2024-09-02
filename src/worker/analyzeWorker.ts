self.onmessage = async (event) => {
  const { fileId, content, apiUrl } = event.data;
  // console.log(content);

  try {
    // 진행 상황 업데이트를 위한 함수
    const updateProgress = (percent: number) => {
      self.postMessage({ fileId, percent, status: "progress" });
    };

    // 총 요청 시간 (30초)
    // const totalDuration = 30000;
    const updateInterval = 1000; // 1초 간격으로 진행 상황 업데이트
    const progressSteps = [
      { percent: 40, duration: 10000 }, // 10초 동안 40%
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
        updateProgress(Math.round(percent));

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
