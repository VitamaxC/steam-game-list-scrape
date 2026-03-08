// 提取页面游戏信息
function scrapeGames() {
  let res = [];
  const games = document.querySelectorAll('div[tabindex]');
  games.forEach(game => {
    res.push(
      {
        name: game.querySelector('span>a').textContent,
        url: game.querySelector('span>a').href,
        cover: game.querySelector('source').srcset,
        banner: game.querySelector('img').src
      }
    );
  });
  return res;
}

// 监听 popup 请求
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.cmd === 'getGames') {
    sendResponse({ games: scrapeGames() });
  }
});