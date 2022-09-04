<!DOCTYPE html>
<!-- saved from url=(0040)https://wx.meiway.com.cn/api/getAuthPage -->
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>美蔚互动服务平台</title>
	<link rel="stylesheet" href="https://statics.meiway.cc/auth/static/index.css">
	<link rel="stylesheet" href="https://statics.meiway.cc/auth/static/middle.css">
	<link rel="stylesheet" href="https://statics.meiway.cc/auth/static/phone.css">
	<style type="text/css">
		@font-face {
			font-family: "element-icons";
			src: url('chrome-extension://moombeodfomdpjnpocobemoiaemednkg/fonts/element-icons.woff') format('woff'),
				url('chrome-extension://moombeodfomdpjnpocobemoiaemednkg/fonts/element-icons.ttf ') format('truetype');
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
		}
	</style>
	<style>
		.juejin-search[data-v-f493e070] {
			display: flex;
			width: 682px;
			height: 46px;
			border-radius: 2px;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative
		}

		.juejin-search .search-anim[data-v-f493e070] {
			position: absolute;
			left: 8px;
			width: 28px;
			height: 28px;
			object-fit: contain;
			animation-play-state: paused
		}

		.juejin-search .search-anim.slide-right-enter-active[data-v-f493e070],
		.juejin-search .search-anim.slide-right-leave-active[data-v-f493e070] {
			transition: width .3s linear
		}

		.juejin-search .search-anim.slide-right-enter-from[data-v-f493e070],
		.juejin-search .search-anim.slide-right-leave-to[data-v-f493e070] {
			width: 0
		}

		.juejin-search .juejin-search-logo[data-v-f493e070] {
			right: 16px;
			position: absolute;
			width: 23px;
			height: 18px;
			object-fit: contain
		}

		.juejin-search .juejin-search-logo path[data-v-f493e070] {
			transition: all .3s linear
		}

		.juejin-search #juejin-search-input-global.input[data-v-f493e070] {
			padding: 0 39px 0 33px;
			width: 100%;
			height: 100%;
			outline: 0;
			border: none;
			border-radius: 2px;
			background-color: #fff;
			color: #1d2129;
			font-size: 18px;
			line-height: 22px;
			font-weight: 500;
			caret-color: transparent;
			box-sizing: border-box;
			background: rgba(148, 191, 255, .1)
		}

		.juejin-search #juejin-search-input-global.input.active[data-v-f493e070] {
			border: 2px solid #bedaff
		}

		.juejin-search #juejin-search-input-global.input.animation-stopped[data-v-f493e070] {
			caret-color: #1e80ff;
			padding-left: 16px
		}

		.juejin-search #juejin-search-input-global.input[data-v-f493e070]::placeholder {
			font-weight: 400;
			color: #86909c
		}

		:root {
			--color-input-bg: #f4f5f5;
			--color-input-error-bg: #ffece8;
			--color-input-placeholder: #86909c;
			--color-input-text: #4e5969;
			--color-input-icon: #f53f3f
		}

		:root .dark {
			--color-input-bg: rgba(255, 255, 255, 0.12);
			--color-input-error-bg: rgba(255, 81, 50, 0.15);
			--color-input-placeholder: #e3e3e3;
			--color-input-text: #e3e3e3;
			--color-input-icon: #ff6247
		}

		[data-v-4c531118]:root {
			--color-brand: #1E80FF;
			--color-brand-light: #E8F3FF;
			--color-nav-title: #86909C;
			--color-nav-popup-bg: #FFFFFF;
			--color-primary: #1D2129;
			--color-secondary: #4E5969;
			--color-thirdly: #86909C;
			--color-hover: #1e80ff;
			--color-hover-thirdly: #86909c;
			--color-dropdown-text: #1E80FF;
			--color-divider: #E5E6EB;
			--color-main-bg: #f4f5f5;
			--color-secondary-bg: #FFFFFF;
			--color-thirdly-bg: #f4f5f5;
			--color-hover-bg: #E8F3FF;
			--color-comment-bg: rgba(244, 245, 245, 0.5);
			--hover-bg: linear-gradient(90deg,
					rgba(232, 243, 255, 0) 0%,
					rgba(232, 243, 255, 0.8) 25.09%,
					#e8f3ff 50.16%,
					rgba(232, 243, 255, 0.8) 75.47%,
					rgba(232, 243, 255, 0) 100%);
			--color-mask: rgba(0, 0, 0, 0.4);
			--color-quick-nav-text: #ffffff;
			--color-nav-bg: rgba(255, 255, 255, 0.13);
			--color-nav-selected-border: rgba(229, 230, 235, 0.3);
			--color-tips: #F53F3F;
			--color-fourthly: #C9CDD4;
			--color-shadow: rgba(0, 0, 0, 0.16);
			--color-grey-triangle: #e5e6eb;
			--color-icon-search: #ffffff;
			--color-navbar-icon: #1e80ff;
			--color-layout-dropdown-bg: rgba(232, 243, 255, 0.8);
			--color-layout-title: #4E5969;
			--color-layout-title-active: #1E80FF;
			--color-layout-icon-outline: rgba(30, 128, 255, 0.5);
			--color-layout-icon-fill: #ffffff
		}

		:root .dark[data-v-4c531118] {
			--color-brand: #1352a3;
			--color-nav-title: #e3e3e3;
			--color-nav-popup-bg: #1352A3;
			--color-primary: #e3e3e3;
			--color-secondary: #a9a9a9;
			--color-thirdly: #7d7d7f;
			--color-hover: #eeeeee;
			--color-hover-thirdly: #878789;
			--color-dropdown-text: #878789;
			--color-divider: #4a4a4a;
			--color-main-bg: #121212;
			--color-secondary-bg: #272727;
			--color-thirdly-bg: #3a3a3a;
			--color-hover-bg: #3a3a3a;
			--color-comment-bg: #313131;
			--hover-bg: linear-gradient(90deg,
					rgba(58, 58, 58, 0) 0%,
					rgba(58, 58, 58, 0.8) 25.09%,
					#3a3a3a 50.16%,
					rgba(58, 58, 58, 0.8) 75.47%,
					rgba(58, 58, 58, 0) 100%);
			--color-mask: rgba(0, 0, 0, 0.4);
			--color-quick-nav-text: #e3e3e3;
			--color-nav-bg: rgb(30, 30, 30);
			--color-nav-selected-border: #4a4a4a;
			--color-tips: #bc3030;
			--color-fourthly: #878789;
			--color-shadow: rgba(0, 0, 0, 0.16);
			--color-grey-triangle: #3a3a3a;
			--color-icon-search: #e3e3e3;
			--color-navbar-icon: #e3e3e3;
			--color-layout-dropdown-bg: rgba(125, 125, 127, 0.8);
			--color-layout-title: #eeeeee;
			--color-layout-title-active: #eeeeee;
			--color-layout-icon-outline: #131313;
			--color-layout-icon-fill: #e3e3e3
		}

		.input-option[data-v-4c531118] {
			display: flex;
			flex-direction: column
		}

		.input-option span.error[data-v-4c531118] {
			margin-left: 5.1666666667rem;
			font-size: 1rem;
			line-height: 20px;
			display: inline-block;
			height: 20px;
			color: var(--color-tips)
		}

		.input-wrapper[data-v-4c531118] {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%
		}

		.input-wrapper label[data-v-4c531118] {
			width: 4em;
			font-size: 1.1666666667rem;
			line-height: 1.8333333333rem;
			color: var(--color-thirdly);
			margin-right: 1rem
		}

		.input-wrapper .input[data-v-4c531118] {
			flex: 1 0 auto;
			position: relative
		}

		.input-wrapper .input.error .input-inner[data-v-4c531118] {
			background-color: var(--color-input-error-bg)
		}

		.input-wrapper .input.error .btn-clear[data-v-4c531118] {
			color: var(--color-input-icon)
		}

		.input-wrapper .input .input-inner[data-v-4c531118] {
			background: var(--color-input-bg);
			border-radius: 2px;
			color: var(--color-input-text);
			font-size: 1.0833333333rem;
			line-height: 1.8333333333rem;
			height: 2.3333333333rem;
			padding: 0 8px;
			outline: 0;
			border: none;
			width: 100%
		}

		.input-wrapper .input .input-inner[data-v-4c531118]::placeholder {
			color: var(--color-input-placeholder)
		}

		.input-wrapper .btn-clear[data-v-4c531118] {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			background: 0 0;
			border: none;
			outline: 0;
			color: var(--color-fourthly)
		}

		.input-wrapper .btn-clear[data-v-4c531118]::before {
			font-size: 10px;
			line-height: 10px
		}

		[data-v-25df73b2] {
			box-sizing: border-box
		}

		.color-tool[data-v-25df73b2] {
			padding: 0 16px !important
		}

		.color-tool .row[data-v-25df73b2] {
			display: flex;
			align-items: center
		}

		.color-tool .color-picker[data-v-25df73b2] {
			cursor: pointer;
			outline: 0;
			border: none;
			padding: 0;
			margin: 0;
			border-radius: 2px;
			background-color: transparent;
			width: 92px;
			height: 40px
		}

		.color-tool .color-picker[data-v-25df73b2]::-webkit-color-swatch-wrapper {
			padding: 3px;
			border: 1px solid transparent;
			border-radius: 4px;
			transition: all .15s linear
		}

		.color-tool .color-picker[data-v-25df73b2]::-webkit-color-swatch-wrapper:hover {
			border: 1px solid #bedaff
		}

		.color-tool .color-picker[data-v-25df73b2]::-webkit-color-swatch {
			border-radius: 2px;
			border: none
		}

		.color-tool .input[data-v-25df73b2] {
			transform: translateY(10px);
			flex: 1 1 auto;
			margin: 0 12px
		}

		.color-tool .input[data-v-25df73b2] input.input-inner {
			height: 40px;
			padding-left: 16px;
			font-size: 14px;
			color: #1d2129;
			box-sizing: border-box;
			background: #f4f5f5
		}

		.color-tool .input[data-v-25df73b2] label {
			display: none
		}

		.color-tool .input[data-v-25df73b2] span.error {
			margin-left: 16px
		}

		.color-tool .input[data-v-25df73b2] .input-wrapper .btn-clear {
			right: 8px
		}

		.color-tool .input[data-v-25df73b2] .input-wrapper .btn-clear::before {
			font-size: 14px;
			color: #c9cdd4
		}

		.color-tool button[data-v-25df73b2] {
			outline: 0;
			border: none;
			background-color: unset;
			width: 93px;
			height: 40px;
			font-size: 14px
		}

		.color-tool .btn-convert[data-v-25df73b2] {
			background: #1e80ff;
			border-radius: 2px;
			color: #fff;
			transition: all .15s linear
		}

		.color-tool .btn-convert[data-v-25df73b2]:hover {
			background: #5399ff
		}

		.color-tool .btn-convert[data-v-25df73b2]:active {
			background: #0060dd
		}

		.color-tool .btn-copy[data-v-25df73b2] {
			background: rgba(30, 128, 255, .05);
			border: 1px solid rgba(30, 128, 255, .3);
			border-radius: 2px;
			color: #1e80ff;
			transition: all .15s linear
		}

		.color-tool .btn-copy[data-v-25df73b2]:hover {
			background: rgba(30, 128, 255, .1);
			border-color: rgba(30, 128, 255, .45)
		}

		.color-tool .btn-copy[data-v-25df73b2]:active {
			background: rgba(30, 128, 255, .2);
			border-color: rgba(30, 128, 255, .6)
		}

		.color-tool .display[data-v-25df73b2] {
			flex: 1;
			text-align: start;
			background-color: #f4f5f5;
			height: 40px;
			margin: 0 12px;
			border-radius: 2px;
			line-height: 40px;
			padding-left: 16px;
			font-size: 14px;
			color: #1d2129
		}

		.color-tool .label[data-v-25df73b2] {
			width: 92px;
			font-size: 16px;
			font-weight: 500;
			color: #1d2129;
			text-align: end
		}

		.color-tool .row[data-v-25df73b2]:not(:first-of-type) {
			margin-top: 16px
		}

		.tool[data-v-5c9b7424] {
			width: 100%;
			height: 100%
		}

		iframe[data-v-5c9b7424] {
			min-height: 488px
		}

		.calculator[data-v-81e152a8] {
			display: flex;
			align-items: center;
			padding: 14px 16px 14px 24px
		}

		.calculator .result[data-v-81e152a8] {
			font-size: 16px;
			font-weight: 500;
			line-height: 22px;
			color: #1d2129;
			margin: 0 16px;
			text-overflow: ellipsis;
			flex: 1 0 auto;
			overflow: hidden;
			white-space: nowrap;
			max-width: 490px
		}

		.calculator .hint[data-v-81e152a8] {
			font-size: 14px;
			line-height: 22px;
			color: #86909c
		}

		.search-action[data-v-71378e58] {
			display: flex;
			align-items: center;
			padding: 0 16px 0 20px;
			box-sizing: border-box;
			user-select: none;
			cursor: pointer;
			height: 44px;
			border-left: 4px solid transparent;
			border-top: 4px solid transparent;
			border-bottom: 4px solid transparent;
			transition: all .15s linear
		}

		.search-action.active[data-v-71378e58],
		.search-action[data-v-71378e58]:hover {
			border-left-color: #1e80ff;
			background-color: #f4f5f5
		}

		.search-action .search-content[data-v-71378e58] {
			display: flex;
			align-items: center;
			flex: 1 0 auto;
			margin-right: 16px
		}

		.search-action .search-content .search-content__logo[data-v-71378e58] {
			width: 32px;
			height: 32px
		}

		.search-action .search-content .search-content__engine[data-v-71378e58],
		.search-action .search-content .search-content__keyword[data-v-71378e58] {
			font-size: 16px;
			font-weight: 500;
			line-height: 22px
		}

		.search-action .search-content .search-content__keyword[data-v-71378e58] {
			color: #1d2129;
			margin: 0 4px 0 16px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			max-width: 396px
		}

		.search-action .search-content .search-content__engine[data-v-71378e58] {
			color: #1e80ff
		}

		.search-action .hint[data-v-71378e58] {
			font-size: 14px;
			line-height: 22px;
			color: #1e80ff
		}

		[data-v-b7831bf2]:root {
			--color-brand: #1E80FF;
			--color-brand-light: #E8F3FF;
			--color-nav-title: #86909C;
			--color-nav-popup-bg: #FFFFFF;
			--color-primary: #1D2129;
			--color-secondary: #4E5969;
			--color-thirdly: #86909C;
			--color-hover: #1e80ff;
			--color-hover-thirdly: #86909c;
			--color-dropdown-text: #1E80FF;
			--color-divider: #E5E6EB;
			--color-main-bg: #f4f5f5;
			--color-secondary-bg: #FFFFFF;
			--color-thirdly-bg: #f4f5f5;
			--color-hover-bg: #E8F3FF;
			--color-comment-bg: rgba(244, 245, 245, 0.5);
			--hover-bg: linear-gradient(90deg,
					rgba(232, 243, 255, 0) 0%,
					rgba(232, 243, 255, 0.8) 25.09%,
					#e8f3ff 50.16%,
					rgba(232, 243, 255, 0.8) 75.47%,
					rgba(232, 243, 255, 0) 100%);
			--color-mask: rgba(0, 0, 0, 0.4);
			--color-quick-nav-text: #ffffff;
			--color-nav-bg: rgba(255, 255, 255, 0.13);
			--color-nav-selected-border: rgba(229, 230, 235, 0.3);
			--color-tips: #F53F3F;
			--color-fourthly: #C9CDD4;
			--color-shadow: rgba(0, 0, 0, 0.16);
			--color-grey-triangle: #e5e6eb;
			--color-icon-search: #ffffff;
			--color-navbar-icon: #1e80ff;
			--color-layout-dropdown-bg: rgba(232, 243, 255, 0.8);
			--color-layout-title: #4E5969;
			--color-layout-title-active: #1E80FF;
			--color-layout-icon-outline: rgba(30, 128, 255, 0.5);
			--color-layout-icon-fill: #ffffff
		}

		:root .dark[data-v-b7831bf2] {
			--color-brand: #1352a3;
			--color-nav-title: #e3e3e3;
			--color-nav-popup-bg: #1352A3;
			--color-primary: #e3e3e3;
			--color-secondary: #a9a9a9;
			--color-thirdly: #7d7d7f;
			--color-hover: #eeeeee;
			--color-hover-thirdly: #878789;
			--color-dropdown-text: #878789;
			--color-divider: #4a4a4a;
			--color-main-bg: #121212;
			--color-secondary-bg: #272727;
			--color-thirdly-bg: #3a3a3a;
			--color-hover-bg: #3a3a3a;
			--color-comment-bg: #313131;
			--hover-bg: linear-gradient(90deg,
					rgba(58, 58, 58, 0) 0%,
					rgba(58, 58, 58, 0.8) 25.09%,
					#3a3a3a 50.16%,
					rgba(58, 58, 58, 0.8) 75.47%,
					rgba(58, 58, 58, 0) 100%);
			--color-mask: rgba(0, 0, 0, 0.4);
			--color-quick-nav-text: #e3e3e3;
			--color-nav-bg: rgb(30, 30, 30);
			--color-nav-selected-border: #4a4a4a;
			--color-tips: #bc3030;
			--color-fourthly: #878789;
			--color-shadow: rgba(0, 0, 0, 0.16);
			--color-grey-triangle: #3a3a3a;
			--color-icon-search: #e3e3e3;
			--color-navbar-icon: #e3e3e3;
			--color-layout-dropdown-bg: rgba(125, 125, 127, 0.8);
			--color-layout-title: #eeeeee;
			--color-layout-title-active: #eeeeee;
			--color-layout-icon-outline: #131313;
			--color-layout-icon-fill: #e3e3e3
		}

		.search-app[data-v-b7831bf2] {
			z-index: 9999;
			padding-top: 160px;
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			display: flex;
			align-items: flex-start;
			justify-content: center
		}

		.search-app.extension[data-v-b7831bf2] {
			z-index: 700
		}

		@media (max-height:720px) {
			.search-app.tool-active[data-v-b7831bf2] {
				padding-top: 80px
			}
		}

		@media (max-height:640px) {
			.search-app.tool-active[data-v-b7831bf2] {
				padding-top: 30px
			}
		}

		.search-app .search-app__wrapper__[data-v-b7831bf2] {
			border-radius: 2px;
			border: 1px solid #1e80ff;
			background: #fff;
			box-shadow: 0 0 0 4px rgba(30, 128, 255, .2), 0 0 20px rgba(0, 0, 0, .15);
			backdrop-filter: blur(15px)
		}

		.search-app .search-app__wrapper__ .search-result[data-v-b7831bf2] {
			margin-top: 8px
		}

		.search-app .search-app__wrapper__ .search-result .tool[data-v-b7831bf2] {
			padding: 0 8px
		}

		.search-app .search-app__wrapper__ .search-result .setting-hint[data-v-b7831bf2] {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin: 0 16px;
			padding: 12px 0 16px
		}

		.search-app .search-app__wrapper__ .search-result .setting-hint .text[data-v-b7831bf2] {
			color: #86909c;
			line-height: 22px;
			cursor: pointer;
			user-select: none
		}

		.search-app .search-app__wrapper__ .search-result .setting-hint .text[data-v-b7831bf2]:hover:not(.disabled) {
			color: #1e80ff;
			transition: all .15s linear
		}

		.search-app .search-app__wrapper__ .search-result .setting-hint .text.disabled[data-v-b7831bf2] {
			cursor: initial
		}

		.search-app .juejin-search[data-v-b7831bf2] {
			margin: 8px
		}
	</style>
</head>

<body>
	<div class="container">
		<div class="logo contain"></div>
		<div class="point-white"></div>
		<div class="point-red"></div>
		<div class="center-wrap">
			<div class="title" id="title">
				美蔚互动服务平台
			</div>
			<div class="desc" id="desc">
				提供行业解决方案 定制微信平台功能
			</div>
			<a class="btn" id="authBtn">
				立即授权
			</a>
		</div>
		<div class="ball" id="floatBall" style="left: 449px; top: 281px;"></div>
		<div class="bg-middle">
			<div class="angle1 contain" id="redAngle"></div>
			<div class="angle2 contain"></div>
			<div class="angle3 contain"></div>
			<div class="circle-right">
				<div class="monster1 contain"></div>
				<div class="monster2 contain"></div>
			</div>
			<div class="peo contain"></div>
		</div>
		<div class="bg-bottom">
			<div class="circle-left"></div>
			<div class="circle-right"></div>
			<div class="bottom-angle contain"></div>
		</div>
	</div>

	<script type="text/javascript">
		var isPhone = document.body.clientWidth <= 480;
		var timeInterval = isPhone ? 10 : 5;
		var ball = document.getElementById("floatBall");
		var btn = document.getElementById('authBtn');
		var xPos = ball.offsetLeft, yPos = ball.offsetTop;//x,y轴坐标
		var xon = 0;//图片在x轴移动方向
		var yon = 0;//图片在y轴移动方向
		var step = 1;   //移动距离
		var floatBallTime = null;
		// 球浮动动画
		function floatP() {
			var width = document.body.clientWidth;//浏览器宽度
			var height = document.body.clientHeight;//浏览器高度
			var Hoffset = ball.offsetHeight;//图片高度
			var Woffset = ball.offsetWidth;//图片宽度
			ball.style.left = xPos + document.documentElement.scrollLeft + 'px';//图片距离浏览器左侧位置
			ball.style.top = yPos + document.documentElement.scrollTop + 'px';//图片距离浏览器顶端位置
			if (yon == 0) {
				yPos = yPos + step;//图片在y轴方向上下移动
				// console.log('+1')
			} else {
				yPos = yPos - step;
			}
			if (yPos < 0) {//飘到顶端，沿y轴向下移动
				yon = 0;
				yPos = 0;
			}
			if (yPos >= (height - Hoffset)) {//飘到低端，沿y轴向上移动
				yon = 1;
				yPos = (height - Hoffset);
			}
			if (xon == 0) {//x轴向右移动
				xPos = xPos + step;
			} else {
				xPos = xPos - step;//x轴向左移动
			}
			if (xPos < 0) {//飘到左侧时沿x轴向右移动
				xon = 0;
				xPos = 0;
			}
			if (xPos >= (width - Woffset)) {//飘到右侧时沿x轴向左移动
				xon = 1;
				xPos = (width - Woffset);
			}
			setTimeout(floatP, timeInterval);
		}
		window.onload = floatP();
		if (isPhone) {
			btn.onclick = function () {
				btn.style.backgroundColor = '#fd759d';
			}
		}
	</script>

	<script>

		var browser = {
			versions: function () {
				var u = navigator.userAgent, app = navigator.appVersion;
				return {//移动终端浏览器版本信息
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					weixin: u.indexOf('MicroMessenger') > -1, //是否微信
					qq: u.match(/\sQQ/i) == " qq" //是否QQ
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}
		let href = ''
		if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
			browser.versions.iPhone || browser.versions.iPad) {
			// &auth_type=xxx&biz_appid=xxxx 保留字段
			href = 'https://mp.weixin.qq.com/safe/bindcomponent?action=bindcomponent&no_scan=1&component_appid={{ctx.locals.appid}}&pre_auth_code={{ctx.locals.pre_auth_code}}&redirect_uri={{ctx.locals.url}}&auth_type=3#wechat_redirect'
		} else {
			href = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid={{ctx.locals.appid}}&pre_auth_code={{ctx.locals.pre_auth_code}}&redirect_uri={{ctx.locals.url}}';
		}
		console.log(href)
		document.getElementById('authBtn').href = href;

	</script>

</body>

</html>