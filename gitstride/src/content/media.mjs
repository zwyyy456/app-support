/**
 * Replace a null entry with a PUBLIC path and accessible localized alternative text:
 * en: { src: '/images/workspace-en.webp', alt: 'GitStride showing ...', width: 2400, height: 1480 }
 * No template edit is needed. Paths must be local (no hotlinked private screenshots).
 * Each slot has a semantic, explicitly labeled HTML placeholder until replaced.
 */
export const media = {
  workspace: { en: null, 'zh-cn': null },
  menubar: { en: null, 'zh-cn': null },
  issue: { en: null, 'zh-cn': null },
  // Optional mp4/webm replacing the interactive automation illustration.
  automationVideo: { en: null, 'zh-cn': null },
};
