// 配置你的GitHub仓库信息
const OWNER = "lm-xiao-fen"; // GitHub用户名
const REPO = "music-repo";   // 仓库名

const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases`;

async function fetchReleases() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('GitHub API 响应异常');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("获取发行版失败：", error);
        return [];
    }
}

function renderSongs(releases) {
    const container = document.getElementById('songs-container');
    container.innerHTML = '';

    let hasAssets = false;
    releases.forEach(release => {
        if (release.assets && release.assets.length > 0) {
            hasAssets = true;

            // 显示发行版（专辑）名
            const albumTitle = document.createElement('h3');
            albumTitle.textContent = `专辑：${release.name || release.tag_name}`;
            container.appendChild(albumTitle);

            // 发行版说明
            if (release.body) {
                const desc = document.createElement('p');
                desc.textContent = release.body;
                container.appendChild(desc);
            }

            release.assets.forEach(asset => {
                // 只显示音频文件，可根据需要调整
                if (!asset.name.match(/\.(mp3|flac|wav|aac|ogg)$/i)) return;

                const item = document.createElement('div');
                item.className = 'song-item';

                const info = document.createElement('div');
                info.className = 'song-info';

                const title = document.createElement('span');
                title.className = 'song-title';
                title.textContent = asset.name;

                const artist = document.createElement('span');
                artist.className = 'song-artist';
                artist.textContent = `版本：${release.tag_name}`;

                info.appendChild(title);
                info.appendChild(artist);

                const download = document.createElement('a');
                download.className = 'download-btn';
                download.href = asset.browser_download_url;
                download.textContent = '下载';
                download.setAttribute('download', '');
                download.target = '_blank';

                item.appendChild(info);
                item.appendChild(download);

                container.appendChild(item);
            });
        }
    });

    if (!hasAssets) {
        container.innerHTML = '<p>暂无可下载曲目。</p>';
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const releases = await fetchReleases();
    renderSongs(releases);
});