// 收到 content 脚本传来的游戏列表后，生成文件并触发下载
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'download') {
        const { data, ext } = msg;
        const blob = new Blob([data], { type: ext === 'json' ? 'application/json' : 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const now = new Date().toISOString().slice(0, 10);
        const filename = `steam_games_${now}.${ext}`;
        chrome.downloads.download({ url, filename, saveAs: true });
        sendResponse({ ok: true });
    }
});