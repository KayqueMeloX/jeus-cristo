/**
 * FAKKO SOLUTIONS LLC — Live Customer Support Widget
 * Floats on pages, stores conversations in localStorage, and routes inquiries to support email.
 */
(function() {
  if (document.getElementById('faith-support-root')) return;

  var SUPPORT_EMAIL = "support.fakko.solutions@gmail.com";
  var STORAGE_KEY = "faith_support_messages_v1";

  // Create style element
  var style = document.createElement('style');
  style.id = 'faith-support-styles';
  style.textContent = `
    .f-support-btn {
      position: fixed;
      bottom: 22px;
      right: 22px;
      z-index: 99999;
      background: linear-gradient(135deg, #f7d873, #d9a016);
      color: #120e05;
      border: none;
      border-radius: 50px;
      padding: 13px 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 9px;
      box-shadow: 0 4px 22px rgba(217, 160, 22, 0.45);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .f-support-btn:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 6px 28px rgba(217, 160, 22, 0.65);
    }
    .f-support-btn:active {
      transform: scale(0.98);
    }
    .f-support-badge {
      width: 10px;
      height: 10px;
      background: #27ae60;
      border-radius: 50%;
      border: 2px solid #fff;
      display: inline-block;
    }
    .f-chat-box {
      position: fixed;
      bottom: 84px;
      right: 22px;
      z-index: 99999;
      width: 360px;
      max-width: calc(100vw - 32px);
      height: 500px;
      max-height: calc(100vh - 120px);
      background: #120f0a;
      border: 1px solid rgba(243, 195, 78, 0.35);
      border-radius: 20px;
      box-shadow: 0 10px 45px rgba(0,0,0,0.85), 0 0 35px rgba(243, 195, 78, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      animation: fSlideUp 0.3s ease forwards;
    }
    @keyframes fSlideUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .f-chat-header {
      background: linear-gradient(135deg, #1c160c, #2a2010);
      border-bottom: 1px solid rgba(243, 195, 78, 0.25);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
    }
    .f-chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .f-chat-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c9a84c, #f3c34e);
      color: #1a1200;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
    }
    .f-chat-title {
      font-size: 15px;
      font-weight: 700;
      color: #f3c34e;
    }
    .f-chat-subtitle {
      font-size: 11px;
      color: #a4967a;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .f-chat-close {
      background: transparent;
      border: none;
      color: #a4967a;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
    }
    .f-chat-close:hover { color: #fff; }
    .f-chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #0a0805;
    }
    .f-msg {
      max-width: 82%;
      padding: 11px 14px;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
    }
    .f-msg-bot {
      background: #1b160e;
      border: 1px solid rgba(243, 195, 78, 0.2);
      color: #ebdcb9;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .f-msg-user {
      background: linear-gradient(135deg, #f3c34e, #c9a84c);
      color: #120e05;
      font-weight: 600;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .f-msg-time {
      font-size: 10px;
      opacity: 0.65;
      margin-top: 4px;
      text-align: right;
    }
    .f-chat-footer {
      padding: 12px 14px;
      background: #14100a;
      border-top: 1px solid rgba(243, 195, 78, 0.2);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .f-input-row {
      display: flex;
      gap: 8px;
    }
    .f-input-field {
      flex: 1;
      background: #1f1910;
      border: 1px solid rgba(243, 195, 78, 0.25);
      border-radius: 10px;
      padding: 9px 12px;
      color: #fff;
      font-size: 13px;
      outline: none;
    }
    .f-input-field:focus {
      border-color: #f3c34e;
    }
    .f-btn-send {
      background: #f3c34e;
      color: #120e05;
      border: none;
      border-radius: 10px;
      padding: 9px 15px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .f-btn-send:hover { background: #e0a91d; }
    .f-sub-notice {
      font-size: 11px;
      color: #8c7e63;
      text-align: center;
    }
    .f-sub-notice a { color: #f3c34e; text-decoration: underline; }
  `;
  document.head.appendChild(style);

  // Create UI Root
  var root = document.createElement('div');
  root.id = 'faith-support-root';
  root.innerHTML = `
    <button id="fSupportBtn" class="f-support-btn" aria-label="Open support chat">
      <span class="f-support-badge"></span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
      <span>Support / Ajuda</span>
    </button>

    <div id="fChatBox" class="f-chat-box">
      <div class="f-chat-header">
        <div class="f-chat-header-info">
          <div class="f-chat-avatar">✝</div>
          <div>
            <div class="f-chat-title">Plan Faith Support</div>
            <div class="f-chat-subtitle">
              <span class="f-support-badge"></span> Online &middot; FAKKO SOLUTIONS
            </div>
          </div>
        </div>
        <button id="fChatClose" class="f-chat-close">&times;</button>
      </div>

      <div id="fChatBody" class="f-chat-body">
        <div class="f-msg f-msg-bot">
          Hello! Welcome to Support. 🙏<br><br>
          Have any questions about your order, the 7 audio declarations, or accessing your sanctuary? Type your message below and we will help you!
          <div class="f-msg-time">Support Team</div>
        </div>
      </div>

      <div class="f-chat-footer">
        <input type="text" id="fUserContact" class="f-input-field" placeholder="Your Name or Email / Seu Email (optional)" />
        <div class="f-input-row">
          <input type="text" id="fUserMsg" class="f-input-field" placeholder="Type your question here... / Digite sua dúvida..." />
          <button id="fSendBtn" class="f-btn-send">Send</button>
        </div>
        <div class="f-sub-notice">
          Direct email: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // Logic
  var btn = document.getElementById('fSupportBtn');
  var box = document.getElementById('fChatBox');
  var closeBtn = document.getElementById('fChatClose');
  var sendBtn = document.getElementById('fSendBtn');
  var msgInput = document.getElementById('fUserMsg');
  var contactInput = document.getElementById('fUserContact');
  var chatBody = document.getElementById('fChatBody');

  function toggleChat() {
    var isVisible = box.style.display === 'flex';
    box.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      setTimeout(function() { msgInput.focus(); }, 100);
      renderSavedMessages();
    }
  }

  btn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', function() { box.style.display = 'none'; });

  function loadMessages() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e) {
      return [];
    }
  }

  function saveMessage(msg) {
    try {
      var list = loadMessages();
      list.push(msg);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch(e) {}
  }

  function renderSavedMessages() {
    var list = loadMessages();
    // Keep bot welcome message, append saved user messages
    var existingUserMsgs = chatBody.querySelectorAll('.f-msg-dynamic');
    existingUserMsgs.forEach(function(el) { el.remove(); });

    list.forEach(function(item) {
      appendMessageToDOM(item.text, item.sender, item.time, false);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendMessageToDOM(text, sender, time, shouldSave) {
    var div = document.createElement('div');
    div.className = 'f-msg ' + (sender === 'user' ? 'f-msg-user' : 'f-msg-bot') + ' f-msg-dynamic';
    div.innerHTML = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>") +
      '<div class="f-msg-time">' + (time || 'Just now') + '</div>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (shouldSave) {
      saveMessage({ text: text, sender: sender, time: time });
    }
  }

  function handleSend() {
    var text = msgInput.value.trim();
    if (!text) return;

    var contact = contactInput.value.trim();
    var timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    appendMessageToDOM(text, 'user', timeStr, true);
    msgInput.value = '';

    // Send payload to FormSubmit for instant email notification to support
    try {
      var payload = {
        name: contact || "Website Visitor",
        message: text,
        page: window.location.href,
        date: new Date().toISOString()
      };
      fetch("https://formsubmit.co/ajax/" + SUPPORT_EMAIL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(function() {});
    } catch(e) {}

    // Simulated immediate reassurance response
    setTimeout(function() {
      var reply = "Thank you! We have received your message. Our support team at " + SUPPORT_EMAIL + " has been notified and will reply shortly. 🙏";
      appendMessageToDOM(reply, 'bot', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), true);
    }, 800);
  }

  sendBtn.addEventListener('click', handleSend);
  msgInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  // Pre-render any previous history
  renderSavedMessages();
})();
