// Run from the website root: swift scripts/generate-social.swift
import AppKit
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
for locale in ["en", "zh-cn"] {
    let zh = locale == "zh-cn"
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    let context = NSGraphicsContext(bitmapImageRep: bitmap)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    NSColor(calibratedRed: 0.035, green: 0.04, blue: 0.05, alpha: 1).setFill()
    NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
    func text(_ value: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat, _ color: NSColor, _ weight: NSFont.Weight = .regular) {
        (value as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: NSFont.systemFont(ofSize: size, weight: weight), .foregroundColor: color])
    }
    let muted = NSColor(calibratedWhite: 0.66, alpha: 1)
    let accent = NSColor(calibratedRed: 0.3, green: 0.76, blue: 0.65, alpha: 1)
    if let mark = NSImage(contentsOf: root.appendingPathComponent("public/images/app-icon.svg")) {
        mark.draw(in: NSRect(x: 64, y: 498, width: 66, height: 66))
    }
    text("GitStride", 150, 513, 36, .white, .semibold)
    text("GITHUB PROJECTS · NATIVE macOS", 64, 449, 17, accent, .medium)
    text(zh ? "项目仍在 GitHub。" : "Your projects stay on GitHub.", 64, 340, zh ? 60 : 56, .white, .semibold)
    text(zh ? "在 Mac 上，顺手推进。" : "Move them forward on Mac.", 64, 265, zh ? 60 : 56, .white, .semibold)
    text(zh ? "看板 · 表格 · 路线图 · PR 自动化" : "Board · Table · Roadmap · PR automation", 64, 184, 28, muted)
    accent.setFill()
    NSRect(x: 64, y: 118, width: 1072, height: 2).fill()
    text("gitstride.hyperseek.tech", 64, 62, 23, muted)
    text(zh ? "原生工作区，同一份项目。" : "Native workspace. Same projects.", 745, 65, 18, muted)
    NSGraphicsContext.restoreGraphicsState()
    let url = root.appendingPathComponent("public/images/social-\(locale).png")
    try bitmap.representation(using: .png, properties: [:])!.write(to: url)
    print("Generated \(url.lastPathComponent): 1200 × 630")
}
