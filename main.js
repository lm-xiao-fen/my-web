// 从歌曲数据中加载歌曲列表
fetch('data/songs.json')
  .then(response => response.json())
  .then(data => {
    const songList = document.getElementById('song-list');
    data.songs.forEach(song => {
      const songItem = document.createElement('div');
      songItem.className = 'song-item';
      songItem.innerHTML = `
        <img src="assets/${song.cover}" alt="${song.title} 封面" class="song-cover">
        <h2>${song.title}</h2>
        <p>歌手: ${song.artist}</p>
      `;
      songList.appendChild(songItem);
    });
  })
  .catch(error => console.error('歌曲数据加载失败:', error));