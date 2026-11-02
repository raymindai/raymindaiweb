(function () {
  var h = location.hostname;
  if (h !== '127.0.0.1' && h !== 'localhost') return;
  var me = document.currentScript, agent = me.getAttribute('data-agent');
  var bar = document.createElement('div');
  bar.className = 'review-bar';
  bar.innerHTML = '<b>피드백 받는 에이전트: ' + agent + '</b><span>만든 시각 ' + me.getAttribute('data-created') + ', 마지막 수정 ' + me.getAttribute('data-updated') + '</span><span>이 줄과 의견 상자는 로컬 리뷰에서만 보입니다.</span>';
  document.body.insertBefore(bar, document.body.firstChild);
  var w = document.createElement('script');
  w.src = 'http://127.0.0.1:4747/widget.js';
  w.setAttribute('data-agent', agent);
  document.body.appendChild(w);
})();
