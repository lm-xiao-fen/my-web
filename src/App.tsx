import { useState, useEffect } from "react";
import songs from "./data/songs.json";

function getSystemTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export default function App() {
  const [theme, setTheme] = useState(getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="container">
      <nav className="navbar">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>音乐自由收录站</h1>
      </nav>
      <section className="music-list">
        {songs.map(song => (
          <div className="music-card" key={song.id}>
            <img src={song.cover} alt={song.title} className="cover" />
            <div className="info">
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
              <span className={song.status === "下架" ? "status banned" : "status"}>{song.status}</span>
              <a href={song.download_url} className="download-btn" target="_blank" rel="noopener noreferrer">
                下载
              </a>
            </div>
          </div>
        ))}
      </section>
      <footer>
        <small>由 GitHub Pages &amp; Releases 驱动 | © 2025 音乐自由收录站</small>
      </footer>
    </div>
  );
}