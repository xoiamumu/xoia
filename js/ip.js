/**
 * 核心 JavaScript 文件
 * 
 * + 需引用 jQuery 库, Font Awesome 库, style.css, tab.css
 * + 使用异步方式加载内容
 * 
 * 核心功能
 *   + tab 切换实现
 *   + 页面显示信息处理 + 获取
 * 
 */


/**
 * 获取用户系统版本
 */
function getUserOSInfo() {
    var item, token, ua, _i, _len;
    ua = navigator.userAgent;
    token = [
        ["Windows Phone", "Windows Phone"], 
        ["Windows NT 5.0", "Windows 2000"], 
        ["Windows NT 5.1", "Windows XP"], 
        ["Windows NT 5.2", "Windows 2003"], 
        ["Windows NT 6.0", "Windows Vista"], 
        ["Windows NT 6.1", "Windows 7"], 
        ["Windows NT 6.2", "Windows 8.0"], 
        ["windows NT 6.3", "Windows 8.1"], 
        ["Windows NT 10.0", "Windows 10"], 
        ["Android", "Android"], 
        ["iPhone", "iOS"], 
        ["iPad", "iPadOS"], 
        ["Macintosh", "macOS"], 
        ["Windows", "Windows"], 
        ["Ubuntu", "Ubuntu"], 
        ["Linux", "Linux"]
    ];
    for (_i = 0, _len = token.length; _i < _len; _i++) {
        item = token[_i];
        if (ua.indexOf(item[0]) > -1) {
            return item[1];
        }
    }
    return "Other";
};

/**
 * 转换关键词
 * @param keywords 关键词
 */
function getHTMLKeyWords(keywords) {
    $tmpkwd = "";
    for($_i = 0 ; $_i < keywords.length - 1 ; $_i++) {
        $tmpkwd += keywords[$_i];
        $tmpkwd += ",";
    }
    $tmpkwd += keywords[keywords.length - 1];
    return $tmpkwd;
}; 


// 客户端 IP
$.ajax({
    url: "https://myip.ipip.net/json",
    async: true,
    type: "GET",
    success: function(data, status, xhr) {
        $('#userip-c').html(data.data.ip);
        $('#userlocation-c').html(`${data.data.location[0]} ${data.data.location[1]} ${data.data.location[2]}`);
        if(data.data.location[4]) $('#userisp-c').html(data.data.location[4]);
        else $('#userisp').css("display", "none");
        $('#loading-tab2').css("display", "none");
        $('#tab2-s').css("display", "inline-block");
    },
    error: function(xhr, status, error) {
        $("#userip").css("display", "none");
        $('#userlocation').css("display", "none");
        $('#userisp').css("display", "none");
        $('#loading-tab2').css("display", "none");
        $('#tab2-s').css("display", "inline-block");
    }
});

setInterval(function(){ $('#usernowtime').html(`${new Date()}`) }, 100);
$('#usersys').html(getUserOSInfo());

// CDN 节点
$.ajax({
    url: "/cdn-cgi/trace",
    success: function(data, status) {
        let areas = {"TNR":"Antananarivo, Madagascar","CPT":"Cape Town, South Africa","CMN":"Casablanca, Morocco","DAR":"Dar Es Salaam, Tanzania","JIB":"Djibouti City, Djibouti","DUR":"Durban, South Africa","JNB":"Johannesburg, South Africa","KGL":"Kigali, Rwanda","LOS":"Lagos, Nigeria","LAD":"Luanda, Angola","MPM":"Maputo, MZ","MBA":"Mombasa, Kenya","MRU":"Port Louis, Mauritius","RUN":"Réunion, France","BLR":"Bangalore, India","BKK":"Bangkok, Thailand","BWN":"Bandar Seri Begawan, Brunei","CEB":"Cebu, Philippines","CTU":"Chengdu, China","MAA":"Chennai, India","CGP":"Chittagong, Bangladesh","CKG":"Chongqing, China","CMB":"Colombo, Sri Lanka","DAC":"Dhaka, Bangladesh","SZX":"Dongguan, China","FUO":"Foshan, China","FOC":"Fuzhou, China","CAN":"Guangzhou, China","HGH":"Hangzhou, China","HAN":"Hanoi, Vietnam","HNY":"Hengyang, China","SGN":"Ho Chi Minh City, Vietnam","HKG":"Hong Kong, China","HYD":"Hyderabad, India","ISB":"Islamabad, Pakistan","CGK":"Jakarta, Indonesia","TNA":"Jinan, China","KHI":"Karachi, Pakistan","KTM":"Kathmandu, Nepal","CCU":"Kolkata, India","KUL":"Kuala Lumpur, Malaysia","LHE":"Lahore, Pakistan","NAY":"Langfang, China","LYA":"Luoyang, China","MFM":"Macau","MLE":"Malé, Maldives","MNL":"Manila, Philippines","BOM":"Mumbai, India","NAG":"Nagpur, India","NNG":"Nanning, China","DEL":"New Delhi, India","KIX":"Osaka, Japan","PNH":"Phnom Penh, Cambodia","TAO":"Qingdao, China","ICN":"Seoul, South Korea","SHA":"Shanghai, China","SHE":"Shenyang, China","SJW":"Shijiazhuang, China","SIN":"Singapore, Singapore","SZV":"Suzhou, China","TPE":"Taipei, China","PBH":"Thimphu, Bhutan","TSN":"Tianjin, China","NRT":"Tokyo, Japan","ULN":"Ulaanbaatar, Mongolia","VTE":"Vientiane, Laos","WUH":"Wuhan, China","WUX":"Wuxi, China","XIY":"Xi'an, China","EVN":"Yerevan, Armenia","CGO":"Zhengzhou, China","CSX":"Zuzhou, China","AMS":"Amsterdam, Netherlands","ATH":"Athens, Greece","BCN":"Barcelona, Spain","BEG":"Belgrade, Serbia","TXL":"Berlin, Germany","BRU":"Brussels, Belgium","OTP":"Bucharest, Romania","BUD":"Budapest, Hungary","KIV":"Chișinău, Moldova","CPH":"Copenhagen, Denmark","ORK":"Cork, Ireland","DUB":"Dublin, Ireland","DUS":"Düsseldorf, Germany","EDI":"Edinburgh, United Kingdom","FRA":"Frankfurt, Germany","GVA":"Geneva, Switzerland","GOT":"Gothenburg, Sweden","HAM":"Hamburg, Germany","HEL":"Helsinki, Finland","IST":"Istanbul, Turkey","KBP":"Kyiv, Ukraine","LIS":"Lisbon, Portugal","LHR":"London, United Kingdom","LUX":"Luxembourg City, Luxembourg","MAD":"Madrid, Spain","MAN":"Manchester, United Kingdom","MRS":"Marseille, France","MXP":"Milan, Italy","DME":"Moscow, Russia","MUC":"Munich, Germany","LCA":"Nicosia, Cyprus","OSL":"Oslo, Norway","CDG":"Paris, France","PRG":"Prague, Czech Republic","KEF":"Reykjavík, Iceland","RIX":"Riga, Latvia","FCO":"Rome, Italy","LED":"Saint Petersburg, Russia","SOF":"Sofia, Bulgaria","ARN":"Stockholm, Sweden","TLL":"Tallinn, Estonia","SKG":"Thessaloniki, Greece","VIE":"Vienna, Austria","VNO":"Vilnius, Lithuania","WAW":"Warsaw, Poland","ZAG":"Zagreb, Croatia","ZRH":"Zürich, Switzerland","ARI":"Arica, Chile","ASU":"Asunción, Paraguay","BOG":"Bogotá, Colombia","EZE":"Buenos Aires, Argentina","CWB":"Curitiba, Brazil","FOR":"Fortaleza, Brazil","GUA":"Guatemala City, Guatemala","LIM":"Lima, Peru","MDE":"Medellín, Colombia","PTY":"Panama City, Panama","POA":"Porto Alegre, Brazil","UIO":"Quito, Ecuador","GIG":"Rio de Janeiro, Brazil","GRU":"São Paulo, Brazil","SCL":"Santiago, Chile","CUR":"Willemstad, Curaçao","GND":"St. George's, Grenada","AMM":"Amman, Jordan","BGW":"Baghdad, Iraq","GYD":"Baku, Azerbaijan","BEY":"Beirut, Lebanon","DOH":"Doha, Qatar","DXB":"Dubai, United Arab Emirates","KWI":"Kuwait City, Kuwait","BAH":"Manama, Bahrain","MCT":"Muscat, Oman","ZDM":"Ramallah","RUH":"Riyadh, Saudi Arabia","TLV":"Tel Aviv, Israel","IAD":"Ashburn, VA, United States","ATL":"Atlanta, GA, United States","BOS":"Boston, MA, United States","BUF":"Buffalo, NY, United States","YYC":"Calgary, AB, Canada","CLT":"Charlotte, NC, United States","ORD":"Chicago, IL, United States","CMH":"Columbus, OH, United States","DFW":"Dallas, TX, United States","DEN":"Denver, CO, United States","DTW":"Detroit, MI, United States","HNL":"Honolulu, HI, United States","IAH":"Houston, TX, United States","IND":"Indianapolis, IN, United States","JAX":"Jacksonville, FL, United States","MCI":"Kansas City, MO, United States","LAS":"Las Vegas, NV, United States","LAX":"Los Angeles, CA, United States","MFE":"McAllen, TX, United States","MEM":"Memphis, TN, United States","MEX":"Mexico City, Mexico","MIA":"Miami, FL, United States","MSP":"Minneapolis, MN, United States","MGM":"Montgomery, AL, United States","YUL":"Montréal, QC, Canada","BNA":"Nashville, TN, United States","EWR":"Newark, NJ, United States","ORF":"Norfolk, VA, United States","OMA":"Omaha, NE, United States","PHL":"Philadelphia, United States","PHX":"Phoenix, AZ, United States","PIT":"Pittsburgh, PA, United States","PAP":"Port-Au-Prince, Haiti","PDX":"Portland, OR, United States","QRO":"Queretaro, MX, Mexico","RIC":"Richmond, Virginia","SMF":"Sacramento, CA, United States","SLC":"Salt Lake City, UT, United States","SAN":"San Diego, CA, United States","SJC":"San Jose, CA, United States","YXE":"Saskatoon, SK, Canada","SEA":"Seattle, WA, United States","STL":"St. Louis, MO, United States","TPA":"Tampa, FL, United States","YYZ":"Toronto, ON, Canada","YVR":"Vancouver, BC, Canada","TLH":"Tallahassee, FL, United States","YWG":"Winnipeg, MB, Canada","ADL":"Adelaide, SA, Australia","AKL":"Auckland, New Zealand","BNE":"Brisbane, QLD, Australia","MEL":"Melbourne, VIC, Australia","NOU":"Noumea, New caledonia","PER":"Perth, WA, Australia","SYD":"Sydney, NSW, Australia"};
        let area  = data.split("colo=")[1].split("\n")[0];
        
        endTime = new Date().getTime();
        $('#ftinfo').prepend(`当前 CDN 节点: <code>${areas[area]}</code>&nbsp;&nbsp;|&nbsp;&nbsp;加载耗时: <code>${endTime-startTime}ms</code>`);
    },
    error: function(){
        endTime = new Date().getTime();
        $('#ftinfo').append(`加载耗时：<code>${endTime-startTime}ms</code>`); 
    }
});    
