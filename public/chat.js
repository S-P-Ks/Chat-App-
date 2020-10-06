<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width, inital-scale=1, user-scalable=no">
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body class="chat">

    <div class="chat__sidebar">
      <h3>People</h3>
      <div id="users"></div>
    </div>

    <div class="chat__main">
      <ol id="messages" class="chat__messages"></ol>

      <div class="chat__footer">
        <form id="message-form">
          <input name="message" type="text" placeholder="Message" autofocus autocomplete="off"/>
          <button id="submit-btn">Send</button>
        </form>
        <button id="send-location">Send location</button>
      </div>
    </div>

    <script id="message-template" type="text/template">
      <li class="message">
        <div class="message__title">
          <h4>{{from}}</h4>
          <span>{{createdAt}}</span>
        </div>
        <div class="message__body">
          <p>{{text}}</p>
        </div>
      </li>
    </script>

    <script id="location-message-template" type="text/template">
      <li class="message">
        <div class="message__title">
          <h4>{{from}}</h4>
          <span>{{createdAt}}</span>
        </div>
        <div class="message__body">
          <a href="{{url}}" target="_blank">My current location</a>
        </div>
      </li>
    </script>

    <script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="/js/chat.js"></script>
    <script type="text/javascript" src="/js/libs/moment.js"></script>
    <script type="text/javascript" src="/js/libs/mustache.js"></script>
  </body>
</html>