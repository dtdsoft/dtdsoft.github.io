(function() {
    window.addEventListener("load", function() {
        localStorage.setItem("s", 1);
        setTimeout(function() {
            MAX_ZOOM = 10000;
            USERNAME_SIZE = 6;
        }, 2000);
        document.body.addEventListener("mousewheel", WheelHandler, true);

        function WheelHandler(event) {
            var zoom = BLOCKS_ON_SCREEN * Math.pow(0.93, event.wheelDelta / 120 || event.detail || 0);
            if (zoom < 100) BLOCKS_ON_SCREEN = 100;
            else if (zoom > 16000) BLOCKS_ON_SCREEN = 16000;
            else BLOCKS_ON_SCREEN = zoom;
        }
        var leaderboard = document.getElementById("leaderboard");
        leaderboard.style.top = "48px";
        var myCssText = "color:white; font-weight: 700; position:fixed; right:  13px; top: 8px; z-index:100; padding: 5px 10px; opacity: .7; transform-orign: right top;";
        var myDiv = document.createElement("div");
        myDiv.className = "greenBox";
        myDiv.style.cssText = myCssText;
        myDiv.innerHTML = "http://splix-io.org";
        leaderboard.parentNode.insertBefore(myDiv, leaderboard.nextSibling);
        uiElems.push(myDiv);
        var paused = false;
        var loop = setInterval(function() {
            if (paused) {
                sendDir((myPlayer.dir + 1) % 4);
            }
        }, 100);
        window.addEventListener("keyup", function(e) {
            if (e.keyCode == 80) paused ^= true;
        });
        var nameForm = document.getElementById("nameForm");
        var myBox = document.createElement("div");
        var br = document.createElement("br");
        nameForm.insertAdjacentHTML("beforeEnd", "<br><select style='margin-top: 20px; background:#bdf7c4' id='_servers' class='fancyBox'><option selected value='#'>Select server</option></select>");
        nameForm.insertAdjacentHTML("beforeEnd", "<div style='margin-top:20px;color: #fff;'>Mod by <a style='color:#fff;font-weight:bold;' href='http://splix-io.org' target='_blank'>Splix-io.org</a></div>");
        nameForm.insertAdjacentHTML("beforeEnd", "<div style='margin-top:20px;color: #fff;'><b>P</b>: Stop - <b>Scroll Mouse</b>: Zoom In/Out</div>");        
        var interval;
        interval = setInterval(function() {
            if (window.servers.length > 0) {
                clearInterval(interval);
                var no = 1;
                var options = "<option>Select server</option>";
                for (var i = 0; i < window.servers.length; i++) {
                    var ping = window.servers[i].avgPing;
                    var subservers = window.servers[i].servers;
                    for (var j = 0; j < subservers.length; j++) {
                        for (var k = 0; k < subservers[j].lobbies.length; k++) {
                            options += "\n<option value='#" + subservers[j].lobbies[k].hash + "'>" + (no++) + ". #" + subservers[j].lobbies[k].hash + "</option>";
                        }
                    }
                }
                document.getElementById("_servers").innerHTML = options;
                if (window.location.hash.indexOf("#") != -1) document.getElementById("_servers").value = window.location.hash;
            }
        }, 100);
        var myStyle = (function() {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style;
        })();
        var cssRules = document.styleSheets[0]["cssRules"];
        for (var i = 0; i < cssRules.length; i++) {
            if (cssRules[i].cssText.indexOf("#nameInput") != -1) {
                var rule = "#_servers" + cssRules[i].cssText.match(/{.*}/)[0];
                rule = rule.replace("-webkit-appearance: none;", "");
                myStyle.sheet.insertRule(rule, 0);
            }
        }
        document.getElementById("_servers").onchange = function() {
            window.location.assign(document.getElementById("_servers").value);
        };
        var _showBegin = showBegin;
        var _hideBegin = hideBegin;
        window.showBegin = function() {
            if (window.location.hash.indexOf("#") != -1) document.getElementById("_servers").value = window.location.hash;
            _showBegin();
        };
        document.getElementById('nameInput').value = 'splix-io.org';
    });
})();