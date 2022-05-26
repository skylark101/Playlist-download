

// base-url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${play_id}&key=${api_key}`;



var api_key = "AIzaSyB-JFzskr9Qf52K7eRTwtMtOr43lZ6iAWU";
var play_id;

document.getElementById("btn-search").addEventListener("click",()=>{

    
    var play_link = document.getElementById("play_link").value;
    play_id = play_link.split("=")[1];
    //console.log(play_id);

    var url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${play_id}&key=${api_key}`;

    fetch(url)
  .then(response => response.json())
  .then(data=>{
      var maxResults =  data["pageInfo"]["totalResults"];
      //console.log(maxResults);

      getlinks(maxResults);
      listDetails(play_id);
      document.getElementById("num-vid").innerHTML = maxResults;
  });

  
  
});


function listDetails(play_id){
    //console.log(play_id);
    var newurl = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${play_id}&key=${api_key}`;


    fetch(newurl)
    .then(response => response.json())
    .then(data=>{
        document.getElementById("chn-name").innerHTML = data["items"][0]["snippet"]["channelTitle"];
        document.getElementById("list-title").innerHTML = data["items"][0]["snippet"]["title"];
    });
}

function getlinks(maxResults){

    var newurl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${play_id}&key=${api_key}`;
    
    
    
    fetch(newurl)
    .then(response => response.json())
    .then(data=>{
     //console.log(data["items"]);

     var tbody = document.getElementById("table-body");
     tbody.innerHTML="";

     for(var i=0;i<maxResults;i++){

         var tr = document.createElement('tr');
         tr.setAttribute("id","table-row");
         var td1 = document.createElement('td');
         var td2 = document.createElement('td');

         td1.innerHTML = i+1+".";
         td2.innerHTML = data["items"][i]["snippet"]["title"];
         var videoId= data["items"][i]["snippet"]["resourceId"]["videoId"];
         var btn = document.createElement("a");
         btn.innerHTML = "Download";
         btn.setAttribute("target","_blank");
         btn.setAttribute("id","download-btn");
         btn.href = `https://www.youtubepp.com/watch?v=${videoId}`;

         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(btn);
         tbody.appendChild(tr);
     }


    });
}