document.getElementById('downloadJson').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 注入 content 脚本（若未注入）
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });

    // 获取游戏名
    const resp = await chrome.tabs.sendMessage(tab.id, { cmd: 'getGames' });
    const games = resp.games;
    if (!games.length) {
        alert('未找到游戏，请确认已打开游戏库页面');
        console.log(games);
        return;
    }
    const gameListJson = JSON.stringify(games, null, 2);
    const blob = new Blob([gameListJson], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const now = new Date().toISOString().slice(0, 10);
    a.download = `SteamGameList_${now}.json`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
});