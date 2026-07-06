// مصفوفة القنوات (تحتوي فقط على القناة الآذرية)
const channels = [
  {
    name: "İctimai TV",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ictimai_TV_logo.svg/200px-Ictimai_TV_logo.svg.png",
    stream: "https://yayin.itv.az/itv/itv.m3u8"
  }
];

// كود عرض القناة في الصفحة الرئيسية
const container = document.getElementById('channels-container');
if (container) {
    channels.forEach((ch, i) => {
        container.innerHTML += `
            <div class="channel-card" onclick="window.location='player.html?id=${i}'">
                <img src="${ch.logo}" alt="${ch.name}">
                <h3>${ch.name}</h3>
            </div>`;
    });
}
