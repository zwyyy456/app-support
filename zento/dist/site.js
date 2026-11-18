const query = document.querySelector("#command-query");
const rows = Array.from(document.querySelectorAll(".command-rows a"));
const emptyMessage = document.querySelector(".command-empty");
const searchStatus = document.querySelector("#search-status");

document.querySelector("[data-focus-command]").addEventListener("click", (event) => {
  event.preventDefault();
  query.focus();
});

function filterCommands() {
  const words = query.value.trim().toLowerCase().split(/\s+/);
  let count = 0;

  for (const row of rows) {
    const searchableText = `${row.textContent} ${row.dataset.keywords}`.toLowerCase();
    const matches = words.every((word) => searchableText.includes(word));
    row.parentElement.hidden = !matches;
    if (matches) count += 1;
  }

  emptyMessage.hidden = count > 0;
  searchStatus.textContent = count ? `找到 ${count} 条示例命令` : emptyMessage.textContent;
}

query.addEventListener("input", filterCommands);

document.querySelector(".command-panel").addEventListener("keydown", (event) => {
  if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  const visibleRows = rows.filter((row) => !row.parentElement.hidden);
  const activeIndex = visibleRows.indexOf(event.target);

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (visibleRows.length > 0) {
        visibleRows[(activeIndex + 1) % visibleRows.length].focus({ preventScroll: true });
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      if (activeIndex === 0) {
        query.focus({ preventScroll: true });
      } else {
        const previousRow = activeIndex === -1 ? visibleRows.at(-1) : visibleRows[activeIndex - 1];
        previousRow?.focus({ preventScroll: true });
      }
      break;
    case "Escape":
      event.preventDefault();
      query.value = "";
      filterCommands();
      query.focus({ preventScroll: true });
      break;
    case "Enter":
      if (event.target === query && visibleRows.length > 0) {
        event.preventDefault();
        visibleRows[0].click();
      }
      break;
  }
});

const layoutArea = document.querySelector(".desktop-area");
const layoutStatus = document.querySelector("#layout-status");
const layoutButtons = Array.from(document.querySelectorAll("[data-layout]"));
const layoutMessages = {
  left: "Safari 已移到显示器左半边",
  right: "Safari 已移到显示器右半边",
  max: "Safari 已最大化到显示器的可用区域",
};

for (const button of layoutButtons) {
  button.addEventListener("click", () => {
    const layout = button.dataset.layout;
    layoutArea.dataset.position = layout;
    layoutStatus.textContent = layoutMessages[layout];

    for (const choice of layoutButtons) {
      choice.setAttribute("aria-pressed", String(choice === button));
    }
  });
}
