import puppeteer from "puppeteer";
import handler from "./trans.js";
import parseTextToArray from "./parseTextToArray.js";
import fetchToken from "./fetch-token.js";
import addDataToFirebase from "./addDataToFirebase.js";

crawling();

/**
 * 웹 스크래핑을 수행하여 데이터를 추출하는 함수입니다.
 * @async
 * @function crawling
 */
export default async function crawling() {
  const PAGE_COUNT = 2; // 스크랩할 페이지네이션 페이지 수
  const BASE_URL = "https://www.cnnvd.org.cn/home/warn";
  const TIMEOUT = 600000; // 페이지 로딩 타임아웃 설정

  try {
    const browser = await puppeteer.launch({
      headless: false, // 화면을 볼 수 있도록 headless 모드를 꺼둡니다.
      defaultViewport: null, // 브라우저 창을 완전한 크기로 열도록 설정
    });
    const page = await browser.newPage();
    const token = await fetchToken();
    await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: TIMEOUT });

    // 전체 다 실행시 사용
    // const li = await getPageNumbers(page);
    // 페이지네이션 반복분 실행
    // for (let i = 0; i < li.length; i++) {
    for (let i = 0; i < PAGE_COUNT; i++) {
      const objs = await getPageData(page);
      for (let j = 0; j < Math.min(10, objs.length); j++) {
        // for (let j = 0; j < 2; j++) {
        // 페이지네이션 버튼 클릭(페이지 이동)
        await navigateToPage(page, i + 1);

        if (await isElementPresent(page, j)) {
          await clickElement(page, j);
          const pageData = await extractPageData(page);
          await translateAndLogData(pageData, token);
          // 페이지 리로드
          await page.goto(BASE_URL, { waitUntil: "networkidle0" });
        } else {
          console.log(`Element ${j + 1}을(를) 찾을 수 없습니다.`);
        }
      }
    }

    await browser.close();
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
}

// 대기 시간을 수동으로 구현하는 함수
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

/**
 * 페이지네이션에서 사용 가능한 총 페이지 수를 가져옵니다.
 * @async
 * @function getPageNumbers
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @returns {Promise<Array<Object>>} - 페이지 정보가 포함된 객체 배열
 */
async function getPageNumbers(page) {
  return await page.$$eval(".el-pager li", (elements) =>
    elements.map((item) => ({
      li: item.textContent,
    })),
  );
}

/**
 * 현재 페이지에서 데이터를 가져옵니다.
 * @async
 * @function getPageData
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @returns {Promise<Array<Object>>} - 제목과 날짜가 포함된 데이터 객체 배열
 */
async function getPageData(page) {
  return await page.$$eval(".content-center", (elements) =>
    elements.map((e) => ({
      title: e.querySelector(".content-title")?.textContent,
      date: e.querySelector(".content-detail")?.textContent,
    })),
  );
}

/**
 * 페이지네이션을 사용하여 특정 페이지로 이동하는 함수입니다.
 * @async
 * @function navigateToPage
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @param {number} pageIndex - 이동할 페이지의 인덱스
 */
async function navigateToPage(page, pageIndex) {
  try {
    if (pageIndex === 1) return;
    await page.click(`.el-pager li:nth-child(${pageIndex})`);

    await delay(1000);
    // 특정 요소가 나타날 때까지 대기
    await page.waitForSelector(".content-title", { timeout: 30000 });
  } catch (error) {
    console.error("페이지 네비게이션 중 오류 발생:", error);
  }
}

/**
 * 페이지에서 특정 요소가 존재하는지 확인합니다.
 * @async
 * @function isElementPresent
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @param {number} index - 확인할 요소의 인덱스
 * @returns {Promise<boolean>} - 요소가 존재하면 true, 아니면 false
 */
async function isElementPresent(page, index) {
  const elements = await page.$$(".el-col-16 > *");
  return elements[index] !== undefined;
}

/**
 * 페이지에서 특정 요소를 클릭합니다.
 * @async
 * @function clickElement
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @param {number} index - 클릭할 요소의 인덱스
 */
async function clickElement(page, index) {
  await page.evaluate((i) => {
    const element = document.querySelectorAll(".el-col-16 > *")[i];
    if (element) {
      element.click();
    } else {
      console.error(`Element at index ${i} not found`);
    }
  }, index);

  console.log(`Element ${index + 1}이(가) 성공적으로 클릭되었습니다.`);
}

/**
 * 클릭한 요소에서 상세 데이터를 추출합니다.
 * @async
 * @function extractPageData
 * @param {puppeteer.Page} page - Puppeteer 페이지 객체
 * @returns {Promise<Object>} - 상세 제목, 부제목, 내용, 테이블 데이터가 포함된 객체
 */
async function extractPageData(page) {
  await page.waitForSelector(".detail-info");

  return await page.evaluate(() => {
    const detailTitle =
      document.querySelector(".detail-title")?.textContent || "";
    const detailSubtitle =
      document.querySelector(".detail-subtitle")?.textContent || "";

    const sections = [];
    let currentSection = [];
    const detailContent = document.querySelector(".detail-content");

    if (detailContent !== null) {
      const firstChildTags = detailContent.children;

      for (let tag of firstChildTags) {
        const tagName = tag.tagName.toLowerCase();
        const tagText = tag.textContent.trim();

        if (
          tagName === "table" ||
          (tagName === "p" && tag.innerHTML.trim() === "&nbsp;")
        ) {
          break;
        }

        if (tagName === "p" && tag.querySelector("strong") !== null) {
          if (currentSection.length > 0) {
            sections.push(`<div>${currentSection.join(" ")}</div>`);
            currentSection = [];
          }
          sections.push(
            `<div className="font-extrabold mt-3 mb-1">${tagText}</div>`,
          );
        } else {
          currentSection.push(tagText);
        }
      }

      if (currentSection.length > 0) {
        sections.push(`<div>${currentSection.join(" ")}</div>`);
      }
    }

    const contents = sections.join("");

    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    const table = rows
      .slice(0, 11)
      .map((row) => {
        const cells = Array.from(row.querySelectorAll("td")).map((cell) =>
          cell?.textContent.trim(),
        );
        return cells.join(" + ");
      })
      .join(" + ");

    return { detailTitle, detailSubtitle, contents, table };
  });
}

/**
 * 추출한 페이지 데이터를 번역합니다.
 * @async
 * @function translateAndLogData
 * @param {Object} pageData - 추출한 페이지 데이터
 * @param {string} pageData.detailTitle - 상세 제목
 * @param {string} pageData.detailSubtitle - 부제목
 * @param {string} pageData.contents - 내용
 * @param {string} pageData.table - 테이블 데이터
 */
async function translateAndLogData(pageData, token) {
  const transData = await Promise.all([
    handler(pageData.detailTitle, token),
    handler(pageData.detailSubtitle, token),
    handler(pageData.contents, token),
    handler(pageData.table, token),
  ]);
  const [title, subtitle, content, table] = transData;
  const arrayTable = parseTextToArray(table);

  console.log("번역된 데이터:");
  console.log(`제목: ${transData[0]}`);
  console.log(`부제목: ${transData[1]}`);
  console.log(`내용: ${transData[2]}`);
  console.log(`테이블: ${arrayTable}`);

  // 파이어베이스에 데이터 넣기
  await addDataToFirebase(title, subtitle, content, arrayTable);
}
