
"use client";

import { useMemo, useState } from "react";

const samples = [
  {
    title: "Interactive Medical Media",
    provider: "XVIVO",
    sourceType: "company",
    tags: ["education", "ui", "device", "yes", "exam"],
    desc: "UI付き医療メディア。操作性と医療表現を両立。",
    url: "https://xvivo.com/work/interactive-animation-examples/",
    thumb: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "The Inner Life of the Cell",
    provider: "XVIVO",
    sourceType: "company",
    tags: ["education", "molecular", "anatomy", "physiology", "realistic", "mid"],
    desc: "細胞内部を高精度に描いた代表例。",
    url: "https://xvivo.com/examples/the-inner-life-of-the-cell/",
    thumb: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Medical Device Reel",
    provider: "Hybrid Medical Animation",
    sourceType: "company",
    tags: ["marketing", "device", "stylized", "mid"],
    desc: "医療機器を魅力的に見せる演出の参考。",
    url: "https://www.hybridmedicalanimation.com/portfolio/",
    thumb: "https://images.unsplash.com/photo-1581093588401-22d3b6f4d39d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Visible Body Learn",
    provider: "Visible Body",
    sourceType: "company",
    tags: ["education", "anatomy", "clean", "yes", "long"],
    desc: "3D人体モデルを操作して学べる教育サイト。",
    url: "https://www.visiblebody.com/learn/",
    thumb: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "BioDigital Human",
    provider: "BioDigital",
    sourceType: "company",
    tags: ["education", "patient", "anatomy", "ui", "yes", "clean"],
    desc: "人体・病態・治療をWeb上で操作可能。",
    url: "https://human.biodigital.com/index.html",
    thumb: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Respiratory System 3D Animation",
    provider: "YouTube",
    sourceType: "youtube",
    tags: ["education", "resp", "anatomy", "physiology", "clean", "mid"],
    desc: "呼吸器の構造と空気の流れを見せる教育向け動画。",
    url: "https://www.youtube.com/results?search_query=respiratory+system+3d+animation",
    thumb: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lung Auscultation Training Animation",
    provider: "YouTube",
    sourceType: "youtube",
    tags: ["education", "resp", "exam", "physiology", "realistic", "mid"],
    desc: "聴診・呼吸音・胸部診察の参考。",
    url: "https://www.youtube.com/results?search_query=lung+auscultation+training+animation",
    thumb: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Heart Sounds Animation",
    provider: "YouTube",
    sourceType: "youtube",
    tags: ["education", "cardio", "exam", "physiology", "clean", "mid"],
    desc: "心音・循環器・診察系の参考。",
    url: "https://www.youtube.com/results?search_query=heart+sounds+cardiac+cycle+animation",
    thumb: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lung Anatomy Illustration",
    provider: "Image Search",
    sourceType: "image",
    tags: ["education", "patient", "resp", "anatomy", "clean", "short"],
    desc: "肺の構造をシンプルに見せる静止画参考。",
    url: "https://www.google.com/search?tbm=isch&q=lung+anatomy+medical+illustration",
    thumb: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Respiratory Exam Illustration",
    provider: "Image Search",
    sourceType: "image",
    tags: ["education", "resp", "exam", "clean", "short"],
    desc: "胸部診察・聴診手技の静止画参考。",
    url: "https://www.google.com/search?tbm=isch&q=respiratory+exam+illustration",
    thumb: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
  },
];

const synonymMap = {
  "聴診":"exam","診察":"exam","聴診器":"exam","左右差":"exam",
  "呼吸":"resp","肺":"resp","呼吸器":"resp","呼吸音":"resp",
  "心音":"cardio","心臓":"cardio","循環":"cardio",
  "分子":"molecular","細胞":"molecular","治療":"treatment",
  "解剖":"anatomy","生理":"physiology","動き":"physiology",
  "デバイス":"device","医療機器":"device","ui":"ui","操作":"yes"
};

const labelFor = (val) => ({
  education:"教育",
  patient:"患者説明",
  research:"研究",
  marketing:"営業・製品紹介",
  resp:"呼吸器",
  cardio:"循環器",
  molecular:"分子・細胞",
  exam:"診察手技",
  device:"医療機器",
  anatomy:"解剖",
  physiology:"生理・動き",
  treatment:"治療・作用機序",
  realistic:"リアル寄り",
  clean:"見やすい教材型",
  ui:"UI・アプリ風",
  stylized:"演出重視",
  short:"短尺",
  mid:"中尺",
  long:"長尺",
  yes:"操作あり",
}[val] || val);

const sourceLabel = (type) => ({
  company:"会社サイト",
  youtube:"YouTube",
  image:"画像",
}[type] || type);

function scoreSample(sample, prefs) {
  let score = 0;
  const matched = [];
  if (sample.tags.includes(prefs.purpose)) { score += 6; matched.push("用途"); }
  prefs.domain.forEach(v => { if (sample.tags.includes(v)) { score += 7; matched.push("領域"); } });
  prefs.content.forEach(v => { if (sample.tags.includes(v)) { score += 6; matched.push("内容"); } });
  if (sample.tags.includes(prefs.visual)) { score += 4; matched.push("表現"); }
  if (sample.tags.includes(prefs.length)) { score += 3; matched.push("尺"); }
  prefs.inferred.forEach(v => { if (sample.tags.includes(v)) { score += 8; matched.push("自由記載"); } });
  return { score, matched: [...new Set(matched)] };
}

function buildCuts(prefs) {
  const isResp = prefs.domain.includes("resp") || prefs.inferred.includes("resp");
  const isCardio = prefs.domain.includes("cardio") || prefs.inferred.includes("cardio");
  const isExam = prefs.content.includes("exam") || prefs.inferred.includes("exam");
  const isAnatomy = prefs.content.includes("anatomy") || prefs.inferred.includes("anatomy");
  const isPhys = prefs.content.includes("physiology") || prefs.inferred.includes("physiology");
  const shortMode = prefs.length === "short";
  const longMode = prefs.length === "long";

  const cuts = [];
  cuts.push({
    title:"導入",
    sec: shortMode ? "0-3秒" : "0-5秒",
    visual:"テーマ提示。タイトルと対象部位の全体像を見せる。",
    motion:"フェードイン、軽いズーム。",
    telop:"本動画のテーマ",
    narration:"本動画では、今回のテーマを分かりやすく確認します。"
  });
  if (isAnatomy) {
    cuts.push({
      title:"構造提示",
      sec: shortMode ? "3-7秒" : "5-12秒",
      visual: isResp ? "肺・胸郭・気道の位置関係を提示。" : isCardio ? "心臓と主要構造を提示。" : "対象構造を提示。",
      motion:"透過、ハイライト、ラベル表示。",
      telop:"構造の確認",
      narration: isResp ? "まず、肺と胸郭の構造を確認します。" : isCardio ? "まず、心臓の構造を確認します。" : "まず、対象部位の構造を確認します。"
    });
  }
  if (isPhys) {
    cuts.push({
      title:"動き・機能",
      sec: shortMode ? "7-12秒" : "12-20秒",
      visual: isResp ? "吸気・呼気による動きを表示。" : isCardio ? "拍動や流れを表示。" : "機能や動きを示す。",
      motion:"動きのループ、矢印、波形など。",
      telop:"どう動くか",
      narration: isResp ? "呼吸に合わせて、このように動きます。" : "次に、機能や動きを確認します。"
    });
  }
  if (isExam) {
    cuts.push({
      title:"診察アクション",
      sec: shortMode ? "12-18秒" : "20-30秒",
      visual: isResp ? "聴診器を胸部に当て、聴診ポイントや左右差を表示。" : "診察器具や観察ポイントを提示。",
      motion:"器具の移動、ポイント点灯、注釈表示。",
      telop:"診察ポイント",
      narration:"ここでは、診察時に見るべきポイントを示します。"
    });
  }
  cuts.push({
    title:"まとめ",
    sec: longMode ? "40-55秒" : shortMode ? "18-30秒" : "30-45秒",
    visual:"全体を見せながら要点を整理して再提示。",
    motion:"カメラを引いて終了。",
    telop: prefs.goal || "ポイントまとめ",
    narration: prefs.goal ? `今回のポイントは「${prefs.goal}」です。` : "最後に、今回のポイントをまとめます。"
  });
  if (longMode) {
    cuts.push({
      title:"補足",
      sec:"55-70秒",
      visual:"比較や補足情報を追加。",
      motion:"切り替え表示。",
      telop:"補足情報",
      narration:"補足として関連情報も確認します。"
    });
  }
  return cuts;
}

function buildPrompt(cut, prefs) {
  const domainText = (prefs.domain.length ? prefs.domain : prefs.inferred).map(labelFor).join("・") || "医療";
  const contentText = prefs.content.map(labelFor).join("・") || "説明";
  const styleMap = {
    pencil: "pencil storyboard sketch, monochrome pencil drawing, rough hand-drawn medical storyboard, white paper background",
    storyboard: "black and white storyboard frame, marker sketch, cinematic storyboard, simple composition",
    medical_clean: "clean medical concept art, simplified medical illustration, soft grayscale composition",
  };
  const style = styleMap[prefs.imageStyle] || styleMap.pencil;

  return [
    "Create one storyboard frame for a medical animation.",
    `Style: ${style}.`,
    `Purpose: ${labelFor(prefs.purpose)}.`,
    `Medical domain: ${domainText}.`,
    `Content focus: ${contentText}.`,
    `Shot title: ${cut.title}.`,
    `Visual description: ${cut.visual}.`,
    `Motion context: ${cut.motion}.`,
    `Narration context: ${cut.narration}.`,
    `User request: ${prefs.free || "none"}.`,
    `Goal: ${prefs.goal || "none"}.`,
    "Keep it as a single 16:9 frame, simple composition, no extra text, no watermark."
  ].join(" ");
}

export default function Page() {
  const [purpose, setPurpose] = useState("education");
  const [domain, setDomain] = useState(["resp"]);
  const [content, setContent] = useState(["anatomy"]);
  const [visual, setVisual] = useState("realistic");
  const [length, setLength] = useState("short");
  const [imageStyle, setImageStyle] = useState("pencil");
  const [freeText, setFreeText] = useState("");
  const [goalText, setGoalText] = useState("");
  const [results, setResults] = useState([]);
  const [cuts, setCuts] = useState([]);
  const [images, setImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  const prefs = useMemo(() => {
    const inferred = [];
    const all = `${freeText} ${goalText}`.toLowerCase();
    Object.keys(synonymMap).forEach((key) => {
      if (all.includes(key.toLowerCase())) inferred.push(synonymMap[key]);
    });
    return {
      purpose,
      domain,
      content,
      visual,
      length,
      imageStyle,
      free: freeText,
      goal: goalText,
      inferred: [...new Set(inferred)],
    };
  }, [purpose, domain, content, visual, length, imageStyle, freeText, goalText]);

  const storyboardTable = useMemo(() => {
    if (!cuts.length) return "";
    const lines = ["カット\t秒数\t画面\t動き\tテロップ\tナレーション"];
    cuts.forEach((c, i) => {
      lines.push(`${i + 1}\t${c.sec}\t${c.visual}\t${c.motion}\t${c.telop}\t${c.narration}`);
    });
    return lines.join("\n");
  }, [cuts]);

  const narrationText = useMemo(() => {
    if (!cuts.length) return "";
    return cuts.map((c, i) => `Cut ${i + 1}：${c.narration}`).join("\n");
  }, [cuts]);

  const toggleArrayValue = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const runAll = () => {
    const scored = samples
      .map((s) => {
        const r = scoreSample(s, prefs);
        return { ...s, score: r.score, matched: r.matched };
      })
      .sort((a, b) => b.score - a.score);
    setResults(scored);
    setCuts(buildCuts(prefs));
    setImages({});
    setLoadingImages({});
  };

  const copyStoryboard = async () => {
    try {
      await navigator.clipboard.writeText(storyboardTable);
      alert("絵コンテ表をコピーしました");
    } catch {
      alert("コピーに失敗しました");
    }
  };

  const generateImages = async () => {
    const targetCuts = cuts.length ? cuts : buildCuts(prefs);
    if (!cuts.length) setCuts(targetCuts);

    for (let i = 0; i < targetCuts.length; i++) {
      const prompt = buildPrompt(targetCuts[i], prefs);
      setLoadingImages((prev) => ({ ...prev, [i]: "生成中..." }));
      try {
        const res = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "画像生成に失敗しました");
        setImages((prev) => ({ ...prev, [i]: data.imageUrl }));
        setLoadingImages((prev) => ({ ...prev, [i]: "生成完了" }));
      } catch (e) {
        setLoadingImages((prev) => ({ ...prev, [i]: e.message || "エラー" }));
      }
    }
  };

  const resetAll = () => {
    setPurpose("education");
    setDomain(["resp"]);
    setContent(["anatomy"]);
    setVisual("realistic");
    setLength("short");
    setImageStyle("pencil");
    setFreeText("");
    setGoalText("");
    setResults([]);
    setCuts([]);
    setImages({});
    setLoadingImages({});
  };

  return (
    <div style={{ maxWidth: 1500, margin: "0 auto", padding: 20 }}>
      <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>医療3Dアニメーション提案ツール - AI画像生成版</h1>
      <p style={{ margin: "0 0 20px", color: "var(--sub)" }}>
        サンプル10件から近い参考を表示し、絵コンテを自動生成。さらに各カットごとに画像生成AIで新規ラフ画像を作成します。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "430px 1fr", gap: 20, alignItems: "start" }} className="layout-grid">
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, boxShadow: "0 8px 24px rgba(17,35,65,.06)", padding: 16 }}>
          <Question title="1. 使用目的">
            <Radio name="purpose" checked={purpose === "education"} onChange={() => setPurpose("education")} label="教育" />
            <Radio name="purpose" checked={purpose === "patient"} onChange={() => setPurpose("patient")} label="患者説明" />
            <Radio name="purpose" checked={purpose === "research"} onChange={() => setPurpose("research")} label="研究・学会" />
            <Radio name="purpose" checked={purpose === "marketing"} onChange={() => setPurpose("marketing")} label="営業・製品紹介" />
          </Question>

          <Question title="2. 対象領域（複数可）">
            {["resp","cardio","molecular","exam","device"].map((v) => (
              <Check key={v} checked={domain.includes(v)} onChange={() => toggleArrayValue(domain, setDomain, v)} label={labelFor(v)} />
            ))}
          </Question>

          <Question title="3. 表現したい内容（複数可）">
            {["anatomy","physiology","exam","treatment","device"].map((v) => (
              <Check key={v} checked={content.includes(v)} onChange={() => toggleArrayValue(content, setContent, v)} label={labelFor(v)} />
            ))}
          </Question>

          <Question title="4. ビジュアル">
            {["realistic","clean","ui","stylized"].map((v) => (
              <Radio key={v} name="visual" checked={visual === v} onChange={() => setVisual(v)} label={labelFor(v)} />
            ))}
          </Question>

          <Question title="5. 尺">
            <select value={length} onChange={(e) => setLength(e.target.value)}>
              <option value="short">短尺（〜30秒）</option>
              <option value="mid">中尺（30〜90秒）</option>
              <option value="long">長尺（90秒以上）</option>
            </select>
          </Question>

          <Question title="6. 画像生成スタイル">
            <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)}>
              <option value="pencil">鉛筆ラフ</option>
              <option value="storyboard">モノクロ絵コンテ</option>
              <option value="medical_clean">医療イラスト風</option>
            </select>
          </Question>

          <Question title="7. 具体的にやりたい内容">
            <textarea rows={4} value={freeText} onChange={(e) => setFreeText(e.target.value)} placeholder="例：聴診器を当てると呼吸音が変わる、左右差を見せたい" />
          </Question>

          <Question title="8. ゴール">
            <textarea rows={3} value={goalText} onChange={(e) => setGoalText(e.target.value)} placeholder="例：学生が呼吸音の違いを理解できる" />
            <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 6 }}>
              「参考 + 絵コンテ生成」で絵コンテ作成後、「AI画像も生成」で各カットの新規画像を作成します。
            </div>
          </Question>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16, paddingTop: 14, borderTop: "1px solid #edf2f7" }}>
            <button style={btnPrimary} onClick={runAll}>参考 + 絵コンテ生成</button>
            <button style={btnGreen} onClick={generateImages}>AI画像も生成</button>
            <button style={btnSecondary} onClick={copyStoryboard}>表形式をコピー</button>
            <button style={btnSecondary} onClick={resetAll}>リセット</button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <Box title="参考マッチング（10件)" subtitle={`条件：${labelFor(prefs.purpose)} / ${labelFor(prefs.visual)} / ${labelFor(prefs.length)}。近い順に表示します。`}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
              {results.map((item, idx) => (
                <div key={idx} style={cardStyle}>
                  <img src={item.thumb} alt={item.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", background: "#e8eef6" }} />
                  <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={sourceTagStyle}>{sourceLabel(item.sourceType)} / {item.provider}</span>
                    <h3 style={{ margin: "0 0 8px", fontSize: 18, lineHeight: 1.35 }}>{item.title}</h3>
                    <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--sub)", minHeight: 72 }}>{item.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      {item.tags.slice(0, 6).map((t) => <span key={t} style={chipStyle}>{labelFor(t)}</span>)}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--sub)" }}>
                      一致度スコア：<strong>{item.score}</strong> / {item.matched.join("・") || "一致項目なし"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>

          <Box title="絵コンテ">
            <div style={{ fontSize: 12, color: "var(--sub)" }}>表形式</div>
            <textarea rows={10} value={storyboardTable} readOnly style={{ marginTop: 6 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 14, marginTop: 14 }}>
              {cuts.map((cut, i) => (
                <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 14, background: "#fff", padding: 12 }}>
                  <div style={{ display: "inline-block", padding: "4px 8px", background: "var(--chip)", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                    Cut {i + 1}
                  </div>
                  <div style={{ margin: "10px 0 12px" }}>
                    <img
                      src={images[i] || "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><rect width="160" height="90" fill="#fafafa"/><text x="80" y="48" font-size="10" fill="#888" text-anchor="middle">未生成</text></svg>')}
                      alt={`cut-${i + 1}`}
                      style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", border: "1px solid var(--line)", borderRadius: 12, background: "#fafafa" }}
                    />
                    <div style={{ marginTop: 8, fontSize: 12, color: loadingImages[i]?.includes("失敗") || loadingImages[i]?.includes("error") ? "#b33" : "#7a8898" }}>
                      {loadingImages[i] || "まだ画像未生成"}
                    </div>
                  </div>
                  <p><strong>{cut.title}</strong></p>
                  <div style={{ fontSize: 12, color: "var(--sub)", marginBottom: 8 }}>秒数：{cut.sec}</div>
                  <p><strong>画面：</strong>{cut.visual}</p>
                  <p><strong>動き：</strong>{cut.motion}</p>
                  <p><strong>テロップ：</strong>{cut.telop}</p>
                  <p><strong>ナレーション：</strong>{cut.narration}</p>
                  <div style={{ fontSize: 12, color: "#5d6d7e", background: "#fbfdff", border: "1px solid var(--line)", padding: 8, borderRadius: 10, whiteSpace: "pre-wrap" }}>
                    {buildPrompt(cut, prefs)}
                  </div>
                </div>
              ))}
            </div>
          </Box>

          <Box title="ナレーション叩き台">
            <textarea rows={6} value={narrationText} readOnly />
          </Box>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1100px){
          .layout-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
}

function Question({ title, children }) {
  return (
    <div style={{ paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #edf2f7" }}>
      <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700 }}>{title}</p>
      <div style={{ display: "grid", gap: 7 }}>{children}</div>
    </div>
  );
}

function Box({ title, subtitle, children }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, boxShadow: "0 8px 24px rgba(17,35,65,.06)", padding: 16 }}>
      <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>{title}</h2>
      {subtitle ? <div style={{ fontSize: 14, color: "var(--sub)", marginBottom: 10 }}>{subtitle}</div> : null}
      {children}
    </div>
  );
}

function Radio({ name, checked, onChange, label }) {
  return (
    <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, cursor: "pointer" }}>
      <input type="radio" name={name} checked={checked} onChange={onChange} style={{ marginTop: 3 }} />
      {label}
    </label>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ marginTop: 3 }} />
      {label}
    </label>
  );
}

const btnPrimary = {
  border: "none", borderRadius: 12, padding: "11px 14px", fontWeight: 700, cursor: "pointer",
  background: "var(--accent)", color: "#fff"
};
const btnSecondary = {
  border: "none", borderRadius: 12, padding: "11px 14px", fontWeight: 700, cursor: "pointer",
  background: "#e8eef6", color: "var(--text)"
};
const btnGreen = {
  border: "none", borderRadius: 12, padding: "11px 14px", fontWeight: 700, cursor: "pointer",
  background: "#eef8f5", color: "#0e8b7a"
};
const cardStyle = {
  overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--card)",
  border: "1px solid var(--line)", borderRadius: 18, boxShadow: "0 8px 24px rgba(17,35,65,.06)"
};
const sourceTagStyle = {
  display: "inline-block", width: "fit-content", padding: "4px 10px", borderRadius: 999,
  background: "var(--chip2)", color: "#0e8b7a", fontSize: 12, fontWeight: 700, marginBottom: 10
};
const chipStyle = {
  fontSize: 12, padding: "4px 8px", borderRadius: 999, background: "var(--chip)"
};
