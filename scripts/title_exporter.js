import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  res.write(html);
  res.end();
});

server.listen(3000);

console.log("started server");

const html = `<script src="https://apis.google.com/js/api.js"></script>
<script>
  var nextToken = undefined;
  /**
   * Sample JavaScript code for youtube.playlistItems.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.playlistItems.list({
      "part": [
        "snippet"
      ],
      "maxResults": 100,
      "pageToken": nextToken,
      "playlistId": "PLAYLIST_ID"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                nextToken = response.result.nextPageToken;
                console.log(response.result.items.map((item) => '- ' + item.snippet.title).join("\\n"));
                console.log(nextToken)
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>

`;
