import "./globals.css";

export const metadata = {
  title: "医療3Dアニメーション提案ツール",
  description: "参考サンプル、絵コンテ、AI画像生成まで行えるVercel公開向けツール",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
