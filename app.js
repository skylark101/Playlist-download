
var api_key = "AIzaSyDFazYY43_6q6VZOZ0ZlH_d9NfhCjqZvtg";
var play_id;
var mainCounter, nextPageToken = undefined;
var count;

// code to get basic details like total number of elements and playlist id
document.getElementById("btn-search").addEventListener("click", () => {
    count = 1;
    mainCounter = 0;
    nextPageToken = undefined;
    var play_link = document.getElementById("play_link").value;
    play_id = play_link.split("=")[1];
    var url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${play_id}&key=${api_key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var maxResults = data["pageInfo"]["totalResults"];
            getlinks(maxResults);
            listDetails(play_id);
            document.getElementById("num-vid").innerHTML = maxResults;
        });
});

//  code to get playlist info like name of channel and number of videos etc
function listDetails(play_id) {
    var newurl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${play_id}&key=${api_key}`;
    fetch(newurl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("chn-name").innerHTML = data["items"][0]["snippet"]["channelTitle"];
            document.getElementById("list-title").innerHTML = data["items"][0]["snippet"]["title"];
        });
}

// function to map the data on the web page
var tbody = document.getElementById("table-body");
function map(data) {
    var len = data["items"].length;
    for (var i = 0; i < len; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("id", "table-row");
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.innerHTML = mainCounter + 1 + ".";
        mainCounter++;
        td2.innerHTML = data["items"][i]["snippet"]["title"];
        var videoId = data["items"][i]["snippet"]["resourceId"]["videoId"];
        var btn = document.createElement("a");
        btn.innerHTML = "Download";
        btn.setAttribute("target", "_blank");
        btn.setAttribute("id", "download-btn");
        btn.href = `https://www.youtubepp.com/watch?v=${videoId}`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(btn);
        tbody.appendChild(tr);

    }
}

// function to get the links to various videos of the playlist
async function getlinks(maxResults) {
    tbody.innerHTML = "";
    count = 1;
    var url = " ";
    while (count <= parseInt(maxResults / 50) + 1) {
        if (count == 1) {
            url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${play_id}&key=${api_key}`;
        }
        else {
            url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${play_id}&key=${api_key}`;
        }
              await fetch(url)
                .then(response => response.json())
                .then(data => {
                    nextPageToken = data.nextPageToken;
                    map(data);
                });
        count = count + 1;
    }
}
