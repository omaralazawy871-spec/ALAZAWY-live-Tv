const container = document.getElementById('channels-container');
container.innerHTML = "<h3 style='color:#ccc;'>جاري الاتصال بالسيرفر وجلب القنوات الرياضية...</h3>";

// استخدام رابط API للاتصال باشتراكك وتجاوز حماية المتصفح
const apiUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent("http://line.wow-ott.cc:80/player_api.php?username=NDZM6T&password=FNUS78&action=get_live_streams");

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    container.innerHTML = ""; 
    
    // فلترة ذكية: اختيار القنوات التي تحتوي على كلمات رياضية فقط
    const sportsChannels = data.filter(ch => 
        (ch.name.toLowerCase().includes('bein') || 
         ch.name.toLowerCase().includes('ssc') || 
         ch.name.includes('الكأس') || 
         ch.name.includes('alkass')) &&
        (!ch.name.toLowerCase().includes('turk')) && 
        (!ch.name.toLowerCase().includes('fr'))
    );

    if(sportsChannels.length === 0) {
         container.innerHTML = "<h3>لم يتم العثور على قنوات.</h3>";
         return;
    }

    // عرض القنوات في الصفحة
    sportsChannels.forEach((ch) => {
        // تجهيز رابط البث الخاص بالقناة
        const streamUrl = `http://line.wow-ott.cc:80/live/NDZM6T/FNUS78/${ch.stream_id}.m3u8`;
        // وضع لوجو افتراضي لـ beIN في حال عدم وجود لوجو من السيرفر
        const logo = ch.stream_icon ? ch.stream_icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/BeIN_SPORTS_2017.svg/200px-BeIN_SPORTS_2017.svg.png";
        
        container.innerHTML += `
            <div class="channel-card" onclick="window.location.href='player.html?stream=${encodeURIComponent(streamUrl)}'">
                <img src="${logo}" alt="${ch.name}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/BeIN_SPORTS_2017.svg/200px-BeIN_SPORTS_2017.svg.png'">
                <h3>${ch.name}</h3>
            </div>`;
    });
  })
  .catch(error => {
      container.innerHTML = "<h3 style='color:red;'>حدث خطأ في الاتصال بالسيرفر.</h3>";
  });
