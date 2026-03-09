import { useState } from "react";
import { GhostyAvatar } from "ghosty-avatars";
import "./App.css";

const SHOWCASE = ["alex", "sam", "morgan", "riley", "jamie", "casey", "taylor"];
const INSTALL_CMD = "npm i ghosty-avatars @rive-app/react-canvas";

const FEATURES = [
  {
    icon: "⟳",
    title: "Deterministic",
    desc: "Same name always produces the same avatar — across sessions, servers, and devices. Your users see a consistent face everywhere they appear.",
  },
  {
    icon: "◈",
    title: "Animated",
    desc: "Smooth eye-blink animations powered by Rive. Hardware-accelerated and silky on every device. Respects prefers-reduced-motion out of the box.",
  },
  {
    icon: "⬡",
    title: "Zero config",
    desc: "One prop. No storage, no CDN, no uploads, no backend. Drop in the component, pass a name, ship it.",
  },
];

const FAQ = [
  {
    q: "Does it work with Next.js and SSR?",
    a: "Yes. The component renders client-side only. In Next.js, wrap it with dynamic(() => import('./YourComponent'), { ssr: false }) and you're good.",
  },
  {
    q: "How big is it?",
    a: "~2KB of JS (gzipped). The Rive animation file is ~57KB and loads separately — so only users who actually see an avatar pay for it.",
  },
  {
    q: "Can I use my own avatar design?",
    a: "Yes. Point the src prop at any .riv file. It needs an AvatarVM View Model with three properties: initialLetter (string), bgColour (color), and initialLetterSize (number).",
  },
  {
    q: "Does it work outside of React?",
    a: "The core utilities — deriveTraits and hexToRiveColor — have no React dependency. You can use them to drive any Rive runtime directly.",
  },
  {
    q: "Is it free?",
    a: "MIT license. Free forever — no usage limits, no telemetry, no account required. Use it in personal projects, commercial products, anything.",
  },
];

function App() {
  const [name, setName] = useState("alice");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function copyInstall() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <GhostyAvatar name="ghosty" size={44} borderRadius="8px" label="" />
          Ghosty<span> Avatar</span>
        </div>
        <div className="nav-links">
          <a href="https://www.npmjs.com/package/ghosty-avatars" target="_blank" rel="noreferrer" className="nav-link">npm</a>
          <a href="https://github.com/akhilnoone/ghosty-avatars" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
        </div>
      </nav>

      <main className="page">

        {/* ── Hero ── */}
        <div className="hero">
          <span className="hero-eyebrow">Zero config · Animated · MIT</span>
          <h1>Stop shipping grey silhouettes.</h1>
          <p>Drop in one component, pass a name. Every user gets a unique, animated avatar — no images, no uploads, no backend. Same name, same face, every time.</p>
          <div className="install-block">
            <code className="install-cmd">{INSTALL_CMD}</code>
            <button className="copy-btn" onClick={copyInstall} aria-label="Copy install command">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="hero-ctas">
            <a href="https://www.npmjs.com/package/ghosty-avatars" target="_blank" rel="noreferrer" className="cta-btn cta-primary">View on npm</a>
            <a href="https://github.com/akhilnoone/ghosty-avatars" target="_blank" rel="noreferrer" className="cta-btn cta-secondary">View on GitHub</a>
          </div>
        </div>

        {/* ── Live demo (overlaps hero) ── */}
        <div className="preview-card">
          <div className="avatar-wrap">
            <GhostyAvatar name={name} size={140} />
          </div>
          <div className="input-group">
            <span className="input-label">Try it — type any name</span>
            <div className="input-wrap">
              <span className="input-icon">@</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter any name or email…"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <span className="input-hint">Same name always produces the same avatar</span>
          </div>
        </div>

        {/* ── Showcase ── */}
        <div className="showcase">
          <span className="showcase-label">7 names. 7 different faces. All automatic.</span>
          <div className="showcase-row">
            {SHOWCASE.map((n) => (
              <div key={n} className="showcase-item" data-name={n}>
                <GhostyAvatar name={n} size={72} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Sizes ── */}
        <div className="sizes-showcase">
          <span className="showcase-label">Works at any size</span>
          <div className="sizes-row">
            {([32, 40, 48, 64] as const).map((s) => (
              <div key={s} className="size-item">
                <GhostyAvatar name="alice" size={s} />
                <span className="size-label">{s}px{s === 40 ? " · default" : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="stats-bar">
          <div className="stat"><span className="stat-value">~2KB</span><span className="stat-label">JS · 57KB Rive</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-value">0</span><span className="stat-label">config required</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-value">20</span><span className="stat-label">built-in colors</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-value">MIT</span><span className="stat-label">license</span></div>
        </div>

        {/* ── Problem ── */}
        <div className="problem-section">
          <p className="problem-eyebrow">Sound familiar?</p>
          <h2 className="problem-headline">Most users never upload a profile photo.</h2>
          <p className="problem-body">
            That leaves your app full of grey silhouettes — a blank, impersonal experience that
            makes your product feel unfinished. Building a custom avatar system is tedious,
            fragile, and always the last thing on your list.
          </p>
          <p className="problem-solution">
            Ghosty Avatar gives every user a unique, animated identity — in one line of code.
          </p>
        </div>

        {/* ── Features ── */}
        <div className="features-section">
          <h2 className="section-title">Three things. No more, no less.</h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="how-section">
          <h2 className="section-title">Up and running in 60 seconds.</h2>
          <div className="how-grid">
            <div className="steps">
              {[
                { n: "1", title: "Install", desc: "Add the package and its Rive peer dependency." },
                { n: "2", title: "Import", desc: "Import GhostyAvatar into any React component." },
                { n: "3", title: "Render", desc: "Pass a name prop. That's it — no other config." },
              ].map((s) => (
                <div key={s.n} className="step">
                  <span className="step-num">{s.n}</span>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="code-block">
              <div className="code-line"><span className="code-comment"># install</span></div>
              <div className="code-line"><span className="kw">npm</span> <span className="str">i ghosty-avatars @rive-app/react-canvas</span></div>
              <div className="code-line">&nbsp;</div>
              <div className="code-line"><span className="code-comment"># import</span></div>
              <div className="code-line">
                <span className="kw">import</span> <span className="pun">{"{ "}</span><span className="tag">GhostyAvatar</span><span className="pun">{" }"}</span> <span className="kw">from</span> <span className="str">"ghosty-avatars"</span>
              </div>
              <div className="code-line">&nbsp;</div>
              <div className="code-line"><span className="code-comment"># use</span></div>
              <div className="code-line">
                <span className="pun">{"<"}</span><span className="tag">GhostyAvatar</span> <span className="attr">name</span><span className="pun">{"="}</span><span className="str">{"'{user.name}'"}</span> <span className="pun">{"/>"}</span>
              </div>
              <div className="code-line">&nbsp;</div>
              <div className="code-line"><span className="code-comment"># optional props</span></div>
              <div className="code-line">
                <span className="pun">{"<"}</span><span className="tag">GhostyAvatar</span>
              </div>
              <div className="code-line">
                {"  "}<span className="attr">name</span><span className="pun">{"="}</span><span className="str">{"'{user.email}'"}</span>
              </div>
              <div className="code-line">
                {"  "}<span className="attr">size</span><span className="pun">{"={"}</span><span className="str">64</span><span className="pun">{"}"}</span>
              </div>
              <div className="code-line">
                {"  "}<span className="attr">borderRadius</span><span className="pun">{"="}</span><span className="str">"12px"</span>
              </div>
              <div className="code-line">
                <span className="pun">{"/>"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="faq-section">
          <h2 className="section-title">Questions?</h2>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? " faq-open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-q">
                  <span>{item.q}</span>
                  <span className="faq-chevron">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && <p className="faq-a">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Final CTA (dark, bookends the hero) ── */}
        <div className="final-cta">
          <p className="final-eyebrow">Open source · MIT · Free forever</p>
          <h2 className="final-headline">Add avatars to your app<br />in one line of code.</h2>
          <div className="install-block">
            <code className="install-cmd">{INSTALL_CMD}</code>
            <button className="copy-btn" onClick={copyInstall} aria-label="Copy install command">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="hero-ctas">
            <a href="https://www.npmjs.com/package/ghosty-avatars" target="_blank" rel="noreferrer" className="cta-btn cta-primary">View on npm</a>
            <a href="https://github.com/akhilnoone/ghosty-avatars" target="_blank" rel="noreferrer" className="cta-btn cta-secondary">View on GitHub</a>
          </div>
        </div>

        <footer className="footer">
          MIT License · Created by <a href="https://www.linkedin.com/in/akhil-noone" target="_blank" rel="noreferrer">Akhil Noone</a>
        </footer>

      </main>
    </>
  );
}

export default App;
