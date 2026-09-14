/**
 * Replace a null entry with a PUBLIC path and accessible localized alternative text:
 * en: { src: '/images/workspace-en.webp', alt: 'GitStride showing ...', width: 2400, height: 1480 }
 * No template edit is needed. Paths must be local (no hotlinked private screenshots).
 * Each slot has a semantic, explicitly labeled HTML placeholder until replaced.
 */
export const media = {
  workspace: {
    en: {
      src: '/images/workspace-en.png',
      alt: 'GitStride in English, showing the project sidebar and a board with In progress, In review, Todo, and Backlog columns.',
      width: 3024,
      height: 1898,
    },
    'zh-cn': {
      src: '/images/workspace-zh-cn.png',
      alt: 'GitStride 中文界面的完整工作窗口，侧栏旁的看板按 In Progress、Todo 和 Backlog 展示项目事项。',
      width: 3024,
      height: 1898,
    },
  },
  menubar: {
    en: {
      src: '/images/menubar-en.png',
      alt: 'GitStride menu bar popover in English, showing the project picker, status filters, search field, and issue list.',
      width: 800,
      height: 972,
    },
    'zh-cn': {
      src: '/images/menubar-zh-cn.png',
      alt: 'GitStride 中文菜单栏弹窗，展示项目选择、状态筛选、搜索入口和事项列表。',
      width: 800,
      height: 972,
    },
  },
  issue: {
    en: {
      src: '/images/issue-en.png',
      alt: 'GitStride issue detail in English, showing the title, description, checklist, and project fields with an In review status.',
      width: 3024,
      height: 1898,
    },
    'zh-cn': {
      src: '/images/issue-zh-cn.png',
      alt: 'GitStride 中文 Issue 详情，展示标题、目标、范围与验收正文，以及右侧的状态和里程碑。',
      width: 3024,
      height: 1898,
    },
  },
  // Optional mp4/webm replacing the interactive automation illustration.
  automationVideo: { en: null, 'zh-cn': null },
};
