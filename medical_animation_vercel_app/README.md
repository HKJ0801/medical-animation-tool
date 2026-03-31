
# 医療3Dアニメーション提案ツール（Vercel公開向け）

この版は **Next.js + Route Handler** で動くので、MacにPythonは不要です。  
ローカル開発や本番公開は **Node.js** と **Vercel** で行います。

## できること
- サンプル10件の参考マッチング
- 絵コンテ自動生成
- ナレーション叩き台生成
- 各カットごとの **AI新規画像生成**

## 1. 必要なもの
- Node.js 20 以上
- OpenAI APIキー
- Vercelアカウント

## 2. ローカル確認
```bash
npm install
cp .env.example .env.local
```

`.env.local` の `OPENAI_API_KEY` に自分のキーを入れる。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

## 3. Vercel公開
### 方法A: GitHub経由
1. このフォルダをGitHubリポジトリに push
2. Vercelで **Add New Project**
3. GitHubリポジトリを選ぶ
4. Project Settings の **Environment Variables** に `OPENAI_API_KEY` を登録
5. Deploy

### 方法B: Vercel CLI
```bash
npm i -g vercel
vercel
```

初回セットアップ後、Vercelダッシュボードで `OPENAI_API_KEY` を追加して再デプロイ。

## 4. 環境変数
- 名前: `OPENAI_API_KEY`
- 値: OpenAIのシークレットキー
- Vercelでは **Project Settings > Environment Variables** から設定

## 5. 補足
- 画像生成は `app/api/generate-image/route.js` から行う
- APIキーはブラウザ側に露出しない
- フロントからは `/api/generate-image` を呼ぶだけ

## 6. 次の拡張
- 1カット3案生成
- 再生成ボタン
- 保存機能
- PDF出力
- 顧客ごとの案件管理
