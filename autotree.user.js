// ==UserScript==
// @name         智慧树助手
// @namespace    https://github.com/chenjr15/AutoTree
// @version      0.1.3
// @description  智慧树 自动处理弹框问题 自动下一节 操作随机延时
// @author       Chenjr
// @match        http://study.zhihuishu.com/learning/videoList*
// @grant        none
// @supportURL   https://github.com/chenjr15/AutoTree/README.md
// @updateURL    https://github.com/chenjr15/AutoTree/raw/master/auto.user.js
// ==/UserScript==

// 主循环间隔
const MAIN_LOOP_INTERVAL = 5000;
// 弹框关闭延时基数(最小值)
const DIALOG_CLOSE_DELAY_BASE = 1000;
// 弹框关闭延时随机最大值
const DIALOG_CLOSE_DELAY_RANDOM_MAX = 5000;
// 弹框关闭延时随机倍数
const DIALOG_CLOSE_DELAY_RANDOM_MULTIPLE = 10000;

var statusBoardOuter = $("<div class=\"headerMenuFixed\" id=\"statusBoardOuter\"> </div>");
var infoBoard = $("<span id=\"infoboard\">this is info</span>");
infoBoard.css("font-size", "large");

var autoplayCheck = $("<input id=\"autoplayCheck\" type=\"checkbox\">自动播放</input> ");
$("body > div.study_page").before(statusBoardOuter);
statusBoardOuter.append(infoBoard);
statusBoardOuter.append(autoplayCheck);


var lasttime = "";
var thistime = "";
function closeBox() {
	// 关闭问题弹框
	$(".popbtn_cancel").click();
	console.log("关闭弹框");
}
function start() {
	$("#playButton").click();
	console.log("开始播放");
}
function autoplay() {
	thistime = $(".currentTime").text();
	if (thistime == lasttime) {
		start();
	}
	lasttime = thistime;
	// 为了保持结构
	var answers = $(".answerOption");
	var iframe_popup = $("#tmDialog_iframe");
	if (iframe_popup.size() != 0) {
		answers = iframe_popup.contents().find(".answerOption");
	}
	if (answers.length != 0) {
		var n = Math.floor(Math.random() * 10 % answers.size());
		answers.get(n).firstElementChild.click();
		infoBoard.text("Click " + n);
		setTimeout(closeBox, DIALOG_CLOSE_DELAY_BASE +
			(Math.random() * DIALOG_CLOSE_DELAY_RANDOM_MULTIPLE) % DIALOG_CLOSE_DELAY_RANDOM_MAX);
	} else
		// 进度条到底
		if ($(".currentTime").text() == $(".duration").text()) {
			// 下一个视频
			console.log("下一个视频");
			$("#nextBtn").click();
		}
		else {
			infoBoard.text("enabled ");
		}
}
(function () {
	'use strict';
	console.log("hello");
	setInterval(() => {
		if (autoplayCheck.prop("checked")) {
			autoplay();
		}
		else {
			infoBoard.text("auto disabled");
		}
	}, MAIN_LOOP_INTERVAL);

})();
