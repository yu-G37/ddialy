/*
 * Copyright (C) 2012-2014 NS Solutions Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * hifive-ui v20151210 (aceEditor,animate,appContainer,arrowbox,artboard-core-command,artboard,artboard-core,artboardViewer,calendar,carousel,chart,combobox,contextMenu,virtualScroll,datagrid,dividedBox,graph,magnetContainer,popup,pdf,replaceBox,screen,tabbable,tileContainer)
 */
(function($){

	// =========================================================================
	//
	// Modules
	//
	// =========================================================================


(function($) {

	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================
	/** エディタの入力内容が変更された時に上げるイベント名 */
	var EVENT_TEXT_CHANGE = 'textChange';

	/** EVENT_TEXT_CHANGEイベントを遅延させる時間(ms) */
	var TEXT_CHANGE_DEFAULT_DELAY = 100;

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================

	// =========================================================================
	//
	// スコープ内クラス
	//
	// =========================================================================

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================

	/**
	 * Aceエディタを扱うコントローラ
	 *
	 * @class
	 * @name h5.ui.components.aceEditor.controller.AceEditorController
	 */
	var aceEditorController = {
		/**
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		__name: 'h5.ui.components.aceEditor.controller.AceEditorController',

		/**
		 * textChange待機用タイマーID
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		_textChangeDelayr: null,

		/**
		 * textChange待機時間
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		_textChangeDelay: TEXT_CHANGE_DEFAULT_DELAY,

		/**
		 * Aceエディタインスタンス
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		editor: null,

		/**
		 * エディタコンテナ
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		$editorContainer: null,

		/**
		 * 初期化処理。コントローラバインド時にAceエディタを作成する
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		__ready: function() {
			this.editor = ace.edit(this.rootElement);
			this.$editorContainer = $(this.editor.container);
			// イベントのバインド
			this.editor.on('change', this.own(this._change));
		},

		/**
		 * エディタの現在のEditorSessionを取得
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 * @param {String} mode
		 */
		getSession: function(mode) {
			return this.editor.getSession();
		},

		/**
		 * エディタのモードを設定('html','js','ejs'など)
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 * @param {String} mode
		 */
		setMode: function(mode) {
			this.editor.getSession().setMode('ace/mode/' + mode);
		},

		/**
		 * エディタに文字列を入力する
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 * @param {String} val
		 */
		setValue: function(val) {
			this.editor.setValue(val, 1);
		},

		/**
		 * エディタに入力された文字列を取得
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 * @returns {String}
		 */
		getValue: function() {
			return this.editor.getValue();
		},

		/**
		 * 現在の表示サイズに要素を調整
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 */
		adjustSize: function() {
			this.editor.resize(true);
		},

		/**
		 * エディタの内容が変更された時のイベント(textChangeイベント)をあげるときの遅延時間の設定
		 * <p>
		 * デフォルトは100msです
		 * </p>
		 *
		 * @param {time} 遅延時間(ms)。 0を指定した場合は遅延なし。
		 */
		setTextChangeDelay: function(time) {
			this._textChangeDelay = time;
		},

		/**
		 * エディタの内容が変更された時のハンドラ(createEditor時にイベントハンドリングする関数)
		 * <p>
		 * 変更時にこのコントローラからtextChangeイベントをあげる
		 * </p>
		 *
		 * @memberOf h5.ui.components.aceEditor.controller.AceEditorController
		 * @private
		 */
		_change: function() {
			// textChangeイベントを遅延させてあげる
			// (setValue時やペースト時にエディタのchangeイベントが連続して発生するため)
			if (this._textChangeDelayr) {
				clearTimeout(this._textChangeDelayr);
			}
			if (this._textChangeDelay <= 0) {
				// 遅延なし
				this.trigger(EVENT_TEXT_CHANGE);
				return;
			}
			var that = this;
			this._textChangeDelayr = setTimeout(this.own(function() {
				that._textChangeDelayr = null;
				that.$editorContainer.trigger(EVENT_TEXT_CHANGE);
			}), this._textChangeDelay);
		}
	};
	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(aceEditorController);
})(jQuery);
function animate(element, params, option) {

	function clearTransition(_element) {
		element.css(addVenderPrefix({
			'transition-property': '',
			'transition-duration': '',
			'transition-timing-function': ''
		}));
	}

	var _option = $.extend(true, {}, option);
	var isTransition;
	if (_option.isTransition != null) {
		isTransition = _option.isTransition;
	} else {
		isTransition = !(h5.env.ua.isIE && h5.env.ua.browserVersion < 10);
	}
	delete _option.isTransition;

	var easing = _option.easing;
	if (_option.duration == null) {
		_option.duration = 400;
	}

	var complete = null;

	var timer = null;

	if (!isTransition) {
		complete = _option.complete;
		if (/^cubic-bezier/.test(easing)) {
			_option.easing = 'swing';
		} else if (/^ease$|^ease-/.test(easing)) {
			switch (easing) {
			case 'ease-in':
				_option.easing = 'easeInQuad';
				break;
			case 'ease-out':
				_option.easing = 'easeOutQuad';
				break;
			case 'ease-in-out':
				_option.easing = 'easeInOutQuad';
				break;
			case 'ease':
			default:
				_option.easing = 'swing';
			}
		}
		element.stop().animate(params, _option);
	} else {

		clearTransition(element);

		var isCompleted = false;
		complete = function() {
			if (isCompleted)
				return;
			isCompleted = true;
			element.unbind("webkitTransitionEnd", complete);
			element.unbind("transitionend", complete);
			element.unbind("oTransitionEnd", complete);
			clearTransition(element);
			// 同時に複数実行すると、完了イベントが想定通り発生しないケースがある
			// その場合はisTransiionオプションをfalseにしてのjQuery.animateの使用を検討してください。
			if (_option.complete)
				_option.complete();
		};

		var property = '';
		for ( var key in params) {
			element.css(key, element.css(key));
			if (property != '')
				property += ',';
			property += key;
		}

		var duration = _option.duration + 'ms';

		var easing = _option.easing;

		if (easing in animate.E_C) {
			easing = 'cubic-bezier(' + animate.E_C[easing] + ')';
		} else if (easing != 'linear') {
			easing = 'swing';
		}

		element.bind("webkitTransitionEnd", complete);
		element.bind("transitionend", complete);
		element.bind("oTransitionEnd", complete);

		//if(_option.step){
		//	 timer = setInterval(function(){
		//		_option.step();
		//	}, 100);
		//}

		element.css(addVenderPrefix({
			'transition-property': property,
			'transition-duration': duration,
			'transition-timing-function': easing
		}));

		setTimeout(function() {
			element.css(params);
		}, 0);

	}
	return {
		stop: function() {
			if (!isTransition) {
				element.stop();
				complete();
			} else {

				//if(_option.step){
				//	clearTimeout(timer);
				//}

				for ( var key in params) {
					element.css(key, element.css(key));
				}

				complete();
			}
		},
		stopToEnd: function() {
			if (!isTransition) {
				element.css(params);
				complete();
			} else {

				//if(_option.step){
				//	clearTimeout(timer);
				//}

				complete();
			}
		}
	};
}

animate.E_C = {
	'easeInSine': '0.47, 0, 0.745, 0.715',
	'easeOutSine': '0.39, 0.575, 0.565, 1',
	'easeInOutSine': '0.445, 0.05, 0.55, 0.95',
	'easeInQuad': '0.55, 0.085, 0.68, 0.53',
	'easeOutQuad': '0.25, 0.46, 0.45, 0.94',
	'easeInOutQuad': '0.455, 0.03, 0.515, 0.955',
	'easeInCubic': '0.55, 0.055, 0.675, 0.19',
	'easeOutCubic': '0.215, 0.61, 0.355, 1',
	'easeInOutCubic': '0.645, 0.045, 0.355, 1',
	'easeInQuart': '0.895, 0.03, 0.685, 0.22',
	'easeOutQuart': '0.165, 0.84, 0.44, 1',
	'easeInOutQuart': '0.77, 0, 0.175, 1',
	'easeInQuint': '0.755, 0.05, 0.855, 0.06',
	'easeOutQuint': '0.23, 1, 0.32, 1',
	'easeInOutQuint': '0.86, 0, 0.07, 1',
	'easeInExpo': '0.95, 0.05, 0.795, 0.035',
	'easeOutExpo': '0.19, 1, 0.22, 1',
	'easeInOutExpo': '1, 0, 0, 1',
	'easeInCirc': '0.6, 0.04, 0.98, 0.335',
	'easeOutCirc': '0.075, 0.82, 0.165, 1',
	'easeInOutCirc': '0.785, 0.135, 0.15, 0.86',
	'easeInBack': '0.6, -0.28, 0.735, 0.045',
	'easeOutBack': '0.175, 0.885, 0.32, 1.275',
	'easeInOutBack': '0.68, -0.55, 0.265, 1.55'
};

function addVenderPrefix(css, key, isOverride) {
	var _css = (isOverride) ? css : $.extend(true, {}, css);
	if (key) {
		if (typeof key == 'string') {
			key = [key];
		}
		$.each(key, function() {
			if (this in css) {
				_css['-moz-' + this] = css[this];
				_css['-webkit-' + this] = css[this];
				_css['-o-' + this] = css[this];
				_css['-ms-' + this] = css[this];
			}
		});
	} else {
		for ( var i in css) {
			_css['-moz-' + i] = css[i];
			_css['-webkit-' + i] = css[i];
			_css['-o-' + i] = css[i];
			_css['-ms-' + i] = css[i];
		}
		;
	}
	return _css;
}

function convertToTranslate(element, params, option) {

	var _option = $.extend(true, {}, option);
	var _params = $.extend(true, {}, params);
	var isTransform;
	if (_option.isTransform != null) {
		isTransform = _option.isTransform;
	} else {
		//Firefox(18.0.2)で、transformにより縦横同時に移動すると、残像が出るのでデフォルトでは使用しないこととする。
		isTransform = !(h5.env.ua.isIE && h5.env.ua.browserVersion < 10) && !h5.env.ua.isFirefox;
	}
	delete _option.isTransform;

	if (!isTransform)
		return _params;

	var transform = element.css('transform');
	var matrix = null,left,top;

	if (transform) {
		var match = transform.match(/(matrix\((?:[^,]+, *){4})([^,]+), *([^,]+)\)/i);
		if (match) {
			left = _getLT(_params.left, match[2]);
			top = _getLT(_params.top, match[3]);
			matrix = match[1] + left + ', ' + top + ')';
		} else {
			match = transform
					.match(/(matrix3d\((?:[^,]+, *){12})([^,]+), *([^,]+), *((?:[^,]+, *){2}\))/i);
			if (match) {
				left = _getLT(_params.left, match[2]);
				top = _getLT(_params.top, match[3]);
				matrix = match[1] + left + ', ' + top + ', ' + match[4];
			}
		}
	}

	if (!matrix) {
		left = _getLT(_params.left, 0);
		top = _getLT(_params.top, 0);
		matrix = 'matrix(1, 0, 0, 1, ' + left + ', ' + top + ')';
	}

	if (_params.transform) {
		_params.transform += ' ' + matrix;
	} else {
		_params.transform = matrix;
	}

	if (element.css('left') == 'auto') {
		_params.left = 0;
	} else {
		delete _params.left;
	}

	if (element.css('top') == 'auto') {
		_params.top = 0;
	} else {
		delete _params.top;
	}

	return _params;

	function _getLT(value, current) {
		if (value != null) {
			if (typeof value == 'string') {
				var match = value.match(/^([+-])=(-?\d+(?:\.\d*)?)/);
				if (match) {
					return parseFloat(current)
							+ (parseFloat(match[2]) * (match[1] == '+' ? 1 : -1));
				} else {
					return value;
				}
			} else {
				return value;
			}
		} else {
			return current;
		}
	}
}

function moveElement(element, params, option) {
	var _params = convertToTranslate(element, params, option);
	_params = addVenderPrefix(_params, 'transform');
	_params = addPosition(element, _params);
	element.css(_params);
}

function moveElementWithAnimate(element, params, option) {
	var _option = $.extend(true, {}, option);
	var _params = convertToTranslate(element, params, _option);
	_params = addVenderPrefix(_params, 'transform');
	delete _option.isTransform;
	_params = addPosition(element, _params);
	return animate(element, _params, _option);
}

// +=,-=を使用する場合は値はpxである前提とする
function addPosition(element, params) {
	var _params = $.extend(true, {}, params);

	$.each(['left', 'top'], function() {
		if (!(this in _params))
			return;
		var paramsLT = _params[this];
		if (typeof paramsLT != 'string')
			return;
		var match = paramsLT.match(/^([+-])=(-?\d+(?:\.\d*)?)/);
		if (match) {
			var elementLT = element.position()[this];
			_params[this] = elementLT + (parseFloat(match[2]) * (match[1] == '+' ? 1 : -1));
		}
	});

	return _params;
}
(function() {
	// 二重読み込み防止
	if (h5.u.obj.ns('h5.ui.container').ApplicationController) {
		return;
	}

	/** レスポンスHTMLをバインドするターゲットに指定する属性名 */
	var ATTR_BIND_TARGET = 'h5-bind-target';

	/** ATTR_BIND_TARGETに指定する属性値 */
	var INSERT_METHOD_UPDATE = 'update';
	var INSERT_METHOD_APPEND = 'append';
	var INSERT_METHOD_PREPEND = 'prepend';

	/** フォームサブミットを同時に行うグループを指定する属性名 */
	var ATTR_REFRESH_GROUP = 'h5-refresh-group';

	/** フォームサブミット時にブロックするグループを指定する属性名 */
	var ATTR_BLOCK_GROUP = 'h5-block-group';

	/** フォームサブミット時にbodyをブロックしたいときにATTR_BLOCK_TARGETに指定するキーワード */
	var BLOCK_SCREEN = 'screen';

	/** フォームサブミット時にformをブロックしないときにATTR_BLOCK_TARGETに指定するキーワード */
	var BLOCK_NONE = 'none';

	/** レスポンスHTML内でプレースホルダ指定するデータ名 */
	var ATTR_MIGRATION = 'h5-migration';

	/** データバインド指定 */
	var DATA_H5_BIND = 'data-h5-bind';

	/** submit中かどうかのフラグ。二重送信防止用 */
	var SUBMIT_FLAG = 'h5-submit-flag';

	/**
	 * アプリケーションコントローラ formを含む要素をラップし、自動更新機能を追加する
	 *
	 * @name h5.ui.container.ApplicationController
	 * @class
	 */
	var applicationController = {
		__name: 'h5.ui.container.ApplicationController',

		/**
		 * 二重送信防止用のフラグ
		 */
		submitFlag: false,

		'form submit': function(context, $form) {
			this._submit(context, $form);
		},

		/**
		 * トリガでsubmitしたいときに呼ぶイベント
		 * <p>
		 * このコントローラがバインドされているフォームだけトリガしてsubmitしたいときは、 'h5-submit'をトリガする
		 * </p>
		 */
		'form h5-submit': function(context, $target) {
			this._submit(context, $target, true);
		},

		_submit: function(context, $form, isTrigger) {
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();

			// 二重送信防止
			if ($form.data(SUBMIT_FLAG)) {
				return;
			}
			$form.data(SUBMIT_FLAG, true);

			// 更新を適用するフォーム
			var $targetForm = $form;
			var target = $form.attr('target');
			if (target) {
				$targetForm = $('form[name="' + target + '"]');
				if (!$targetForm.length) {
					this.log.error('target属性に指定されたnameを持つformが見つかりませんでした。処理を中断します。');
					return;
				}
			}

			// actionに指定されたurlを取得
			var url = $form.attr('action');

			// formのデータを取得
			var data = $form.serialize();
			this.log.debug(data);

			// methodを取得
			var method = $form.attr('method') || 'POST';

			// 同時にsubmitするグループ名
			var refreshGroup = $form.attr(ATTR_REFRESH_GROUP);

			// 同時にブロックするターゲット
			var blockTarget = $form.attr(ATTR_BLOCK_GROUP);
			var $indicatorTarget = null;

			// 同じblock-groupが指定されている要素に対してインジケータを出す。
			// 指定無しならform、allならbody、noneなら出さない。
			if (!blockTarget) {
				$indicatorTarget = $targetForm;
			} else if (blockTarget === BLOCK_SCREEN) {
				$indicatorTarget = $(document.body);
			} else if (blockTarget !== BLOCK_NONE) {
				$indicatorTarget = $(h5.u.str.format('[{0}="{1}"]', ATTR_BLOCK_GROUP, blockTarget));
			}

			// indicator
			var indicator = null;
			if ($indicatorTarget && $indicatorTarget.length) {
				indicator = this.indicator({
					target: $indicatorTarget
				}).show();
			}

			// 同じグループのformのsubmitをトリガする
			// トリガで呼ばれた場合は、他のformはトリガ済みなので何もしない
			if (!isTrigger && refreshGroup) {
				$(h5.u.str.format('form[{0}="{1}"]', ATTR_REFRESH_GROUP, refreshGroup)).not($form)
						.trigger('h5-submit');
			}

			// ajaxでデータを送信
			var that = this;
			this.log.debug(method);

			var p = h5.ajax(url, {
				data: data,
				method: method
			});

			// インジケータ動作確認用に1500ms秒ウェイトしている
			setTimeout(function() {
				p.always(function() {
					// インジケータを消す
					indicator && indicator.hide();
					$form.data(SUBMIT_FLAG, false);
				}).done(
						function(data) {
							// 成功時の動作
							switch (this.dataTypes.join('/')) {
							case 'text/html':
								// 文字列の場合は、受け取った文字列でformを差し替える
								var $data = $($.trim(data));
								var $wrapData = $('<div>').append($data);
								// 取得した要素からdata-h5-migrationの指定されているものを取得
								var $migrations = $wrapData.find('[' + ATTR_MIGRATION + ']');

								// 各migration指定の要素について置換する
								$migrations.each(function() {
									var $migration = $(this);
									var $placeholder = $targetForm.find($($(this).attr(
											ATTR_MIGRATION)));
									if ($placeholder.length) {
										// h5-migrationと差し替え
										// (複数個所に同じ要素を指定されても、複数バインドできるようにclone()する)
										$migration.after($placeholder.clone());
										$migration.remove();
									} else {
										that.log.debug(ATTR_MIGRATION + 'で指定されたセレクタに該当する要素がありません');
									}
								});

								// h5-bind-targetがあれば、そこに差し替える
								var $bindTarget = $targetForm.find('[' + ATTR_BIND_TARGET + ']');
								if ($bindTarget.length) {
									$bindTarget.each(function() {
										switch ($(this).attr(ATTR_BIND_TARGET)) {
										case INSERT_METHOD_APPEND:
											// 複数個所に同じ要素をバインドできるようにclone()
											$(this).append($data.clone());
											break;
										case INSERT_METHOD_PREPEND:
											$(this).prepend($data.clone());
											break;
										case INSERT_METHOD_UPDATE:
											$(this).html($data.clone());
											break;
										default:
											that.log.debug(
													'{0}属性の値が不正です。{1},{2},{3}のいずれかを指定してください',
													ATTR_BIND_TARGET, INSERT_METHOD_APPEND,
													INSERT_METHOD_PREPEND, INSERT_METHOD_UPDATE);
										}
									});
									return;
								}
								// h5-bind-targetがないならformと差し替える。
								// $targetForm及びその子要素にバインドされているコントローラがあればそれもアンバインド
								for (var controllers = h5.core.controllerManager.getControllers(
										$targetForm, {
											deep: true
										}), i = controllers.length - 1; i > -1; i--) {
									controllers[i].dispose();
								}

								// formと受け取ったhtmlを入れ替え
								// (htmlをformの直後に挿入して、formを削除)
								$targetForm.after($data);
								$targetForm.remove();
								return;
							case 'text/json':
								// jsonの場合はデータバインド。
								// ※(dataTypeはcontentTypeと違い、application/jsonではない。文字列なら必ずtext。dataTypeはjQueryが入れいているもの。)
								if ($targetForm.find('[' + DATA_H5_BIND + ']').length) {
									h5.core.view.bind($targetForm, data).unbind();
								}
							}
						}).fail(function(jqXHR, textStatus, errorThrown) {
					// failHandlerを実行
					that.failHandler.call(this, jqXHR, $form, that);
				});
			}, 1500);
		},

		/**
		 * デフォルトのfailHandler
		 *
		 * @memberOf h5.ui.container.ApplicationController
		 * @param jqXHR
		 * @param $form
		 */
		_defaultFailHandler: function(jqXHR, $form, controller) {
			// ログを表示
			controller.log.error('formの送信に失敗しました。{0} {1} URL:{2}', jqXHR.status, jqXHR.statusText,
					this.url);

			if ($('.h5-alert').length) {
				return;
			}
			var $h5Alert = $('<div class="h5-alert"><span class="msg"></span><a class="close-btn">×</a><div class="response"></div></div>');
			var $body = $('body');
			$body.append($h5Alert);
			$h5Alert.css('width', $body.width() - parseInt($h5Alert.css('margin-left'))
					- parseInt($h5Alert.css('margin-right')));


			switch (this.dataTypes.join('/')) {
			case 'text/html':
				$res = $(jqXHR.responseText);
				// styleタグは削除する(レイアウト崩れないようにするため)
				$h5Alert.find('.response').append($res).find('style').remove();
				break;
			case 'text':
			case 'text/plain':
			case 'text/json':
				var message = h5.u.str.format('formの送信に失敗しました。{0} {1} URL:{2}', jqXHR.status,
						jqXHR.statusText, this.url);
				$h5Alert.find('.msg').text(message);
				if (jqXHR.responseText) {
					$h5Alert.find('.response').text(jqXHR.responseText);
				} else {
					$h5Alert.find('.response').css('display', 'none');
				}
			}

			$('.h5-alert .close-btn').bind('click', function() {
				$('.h5-alert').remove();
			});
		},

		/**
		 * failHandler
		 *
		 * @memberOf h5.ui.container.ApplicationController
		 * @param jqXHR
		 * @param $form
		 */
		failHandler: function(jqXHR, $form, controller) {
			controller._defaultFailHandler.call(this, jqXHR, $form, controller);
		}
	};

	h5.core.expose(applicationController);

})();
(function() {
	var fwLogger = h5.log.createLogger('h5.ui.components.arrowbox.ArrowBoxController');

	var MSG_CANNOT_CALL_METHOD_DISPOSED = fwLogger.info('dispose済みのArrowBoxは操作できません');

	/** 吹き出し(三角の部分)の大きさ * */
	var ARROW_SIZE = 34;

	/**
	 * ArrowBoxクラス
	 *
	 * @class
	 */
	function ArrowBox(arrowboxTmpl, content, option) {
		// display:noneで追加する
		this._$arrowbox = $(arrowboxTmpl).css('display', 'none');
		this.setContent(content);
		$(document.body).append(this._$arrowbox);
		// ArrowBoxインスタンスを要素に持たせる
		this._$arrowbox.data('h5arrowbox', this);

		option = option || {};
		// クラスの追加
		if (option.cls) {
			this._$arrowbox.addClass(option.cls);
		}
	}
	$.extend(ArrowBox.prototype, {
		show: function(option) {
			if (this._isDisposed) {
				fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);
				return;
			}
			var $arrowbox = this._$arrowbox;

			// 吹き出しの消去
			this.hide();

			// 吹き出しの表示(位置調整の前に表示して、offset()で位置とサイズを取得できるようにする)
			$arrowbox.css('display', 'block');

			// optionが指定されていない場合は表示して終わり(前に表示した箇所に表示される)
			if (!option) {
				return;
			}

			// directionが指定されてなければデフォルトは'up'
			var direction = option.direction || 'up';
			$arrowbox.addClass(direction);

			// positionまたはtargetから表示位置を取得する
			// positionまたはtargetはどちらかの指定が必須。
			var position = option.position;
			var $target = $(option.target);
			var targetW = position ? 0 : $target.outerWidth();
			var targetH = position ? 0 : $target.outerHeight();
			var arrowboxPosition = position ? $.extend({}, position) : {
				top: $target.offset().top,
				left: $target.offset().left
			};
			// $targetと$arrowboxの左上の位置を合わせる
			if (direction === 'up' || direction === 'down') {
				// 吹き出しの位置が$targetの真ん中に来るように合わせる
				arrowboxPosition.left += (targetW - $arrowbox.outerWidth()) / 2;
				if (direction === 'up') {
					// 吹き出し分だけ上に移動
					arrowboxPosition.top -= $arrowbox.outerHeight() + ARROW_SIZE;
				} else {
					// $target分だけ下に移動
					arrowboxPosition.top += targetH + ARROW_SIZE;
				}
			} else {
				// 吹き出しの位置が$targetの真ん中に来るように合わせる
				arrowboxPosition.top += (targetH - $arrowbox.outerHeight()) / 2;
				if (direction === 'left') {
					// 吹き出し分だけ左に移動
					arrowboxPosition.left -= $arrowbox.outerWidth() + ARROW_SIZE;
				} else {
					// $target分だけ下に移動
					arrowboxPosition.left += targetW + ARROW_SIZE;
				}
			}

			// 吹き出し位置
			$arrowbox.css(arrowboxPosition);
		},
		hide: function() {
			if (this._isDisposed) {
				fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);
				return;
			}
			this._$arrowbox.css('display', 'none');
		},
		setContent: function(content) {
			if (this._isDisposed) {
				fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);
				return;
			}
			this._$arrowbox.children().remove();
			this._$arrowbox.append(content);
		},
		dispose: function() {
			if (this._isDisposed) {
				fwLogger.info(MSG_CANNOT_CALL_METHOD_DISPOSED);
				return;
			}
			// 吹き出しの削除
			this.hide();
			this._$arrowbox.remove();
			this._$arrowbox = null;
		}
	});

	/**
	 * ArrowBoxController定義
	 *
	 * @name h5.ui.components.arrowbox.ArrowBoxController
	 * @namespace
	 */
	var arrowboxController = {

		/**
		 * コントローラ名
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 * @type String
		 */
		__name: 'h5.ui.components.arrowbox.ArrowBoxController',

		/**
		 * テンプレート
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 * @type String
		 */
		__templates: null,

		/**
		 * ArrowBoxのテンプレート
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 */
		_arrowboxTmpl: null,

		/**
		 * ライフサイクルイベント __ready
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 * @param context
		 */
		__ready: function(context) {
			try {
				this._arrowboxTmpl = this.view.get('h5arrowbox');
			} catch (e) {
				fwLogger
						.error('h5arrowboxのテンプレートがありません。コントローラの引数でarrowbox.ejsのテンプレートパスを渡すか、親コントローラまたは共通ビュー(h5.core.view)で設定する必要があります');
				throw e;
			}
		},

		/**
		 * ArrowBoxインスタンスを作って返す
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 * @param {String|DOM|jQuery} content 吹き出しの中身
		 */
		create: function(content, option) {
			return new ArrowBox(this._arrowboxTmpl, content, option);
		},

		/**
		 * ArrowBoxのDOM要素からArrowBoxインスタンスを取得して返す
		 *
		 * @memberOf h5.ui.components.arrowbox.ArrowBoxController
		 * @param {DOM|jQuery|String} elm 要素またはセレクタ
		 */
		getArrowBoxFromElement: function(elm) {
			var $elm = $(elm);
			if ($elm.length > 1) {
				fwLogger.error('getArrowBoxFromElementには一つの要素または、一つの要素にマッチするセレクタを渡してください。');
			}
			return $elm.data('h5arrowbox');
		}
	};

	h5.core.expose(arrowboxController);
})();
//--------------------------------------------------------
// 定数定義
//--------------------------------------------------------
(function() {
	//----------------------------------------
	// コマンドマネージャが上げるイベント
	//----------------------------------------
	/** undo実行完了時に上がるイベント名 */
	var EVENT_UNDO = 'undo';

	/** redo実行完了時に上がるイベント名 */
	var EVENT_REDO = 'redo';

	/** undoができるようになった時に上がるイベント名 */
	var EVENT_ENABLE_UNDO = 'enableUndo';

	/** redoができるようになった時に上がるイベント名 */
	var EVENT_ENABLE_REDO = 'enableRedo';

	/** undoができなくなった時に上がるイベント名 */
	var EVENT_DISABLE_UNDO = 'disableUndo';

	/** redoが出来なくなったときに上がるイベント名 */
	var EVENT_DISABLE_REDO = 'disableRedo';

	/** 描画操作を開始した時に上がるイベント名 */
	var EVENT_DRAWSTART = 'drawStart';

	/** 描画操作を終了した時に上がるイベント名 */
	var EVENT_DRAWEND = 'drawEnd';

	/** コマンドによる図形追加時に生成されるイベント名 */
	var EVENT_APPEND_SHAPE = 'appendShape';

	/** コマンドによる図形削除時に生成されるイベント名 */
	var EVENT_REMOVE_SHAPE = 'removeShape';

	/** コマンドによる図形編集(スタイル、属性)時に生成されるイベント名 */
	var EVENT_EDIT_SHAPE = 'editShape';

	/** 背景変更時に生成されるイベント名 */
	var EVENT_EDIT_BACKGROUND = 'editBackground';

	//----------------------------------------
	// 定数
	//----------------------------------------
	/** imageSourceMapと対応付けるために要素に持たせるデータ属性名 */
	var DATA_IMAGE_SOURCE_ID = 'h5-artboard-image-id';

	/** 画像設定時にIDと紐付かない画像を指定した時に要素にsrcパス覚えさせておくための属性名 */
	var DATA_IMAGE_SOURCE_SRC = 'h5-artboard-image-src';

	/** 画像設定時のfillModeを覚えさせておくための属性名 */
	var DATA_IMAGE_SOURCE_FILLMODE = 'h5-artboard-image-fillmode';

	/** 画像設定時のoffsetXを覚えさせておくための属性名 */
	var DATA_IMAGE_SOURCE_OFFSET_X = 'h5-artboard-image-offset-x';

	/** 画像設定時のoffsetYを覚えさせておくための属性名 */
	var DATA_IMAGE_SOURCE_OFFSET_Y = 'h5-artboard-image-offset-y';

	/** 要素に、要素の位置とサイズを持たせるときのデータ属性名 */
	var DATA_BOUNDS_OBJECT = 'bounds-object';

	/**
	 * SVGの名前空間
	 */
	var XLINKNS = 'http://www.w3.org/1999/xlink';
	var XMLNS = 'http://www.w3.org/2000/svg';

	// メッセージ
	/** ドキュメントツリー上にない要素で作成したRemoveCommandを実行した時のエラーメッセージ */
	var ERR_MSG_CANNOT_REMOVE_NOT_APPENDED = 'removeはレイヤに追加されている要素のみ実行できます';
	/** 終了したドラッグセッションが使用された時のエラーメッセージ */
	var ERR_MSG_ArtAGSESSION_DISABLED = '終了したDragSessionのメソッドは呼べません';

	h5.u.obj.expose('h5.ui.components.artboard', {
		consts: {
			EVENT_UNDO: EVENT_UNDO,
			EVENT_REDO: EVENT_REDO,
			EVENT_ENABLE_UNDO: EVENT_ENABLE_UNDO,
			EVENT_ENABLE_REDO: EVENT_ENABLE_REDO,
			EVENT_DISABLE_UNDO: EVENT_DISABLE_UNDO,
			EVENT_DISABLE_REDO: EVENT_DISABLE_REDO,
			EVENT_DRAWSTART: EVENT_DRAWSTART,
			EVENT_DRAWEND: EVENT_DRAWEND,
			EVENT_APPEND_SHAPE: EVENT_APPEND_SHAPE,
			EVENT_REMOVE_SHAPE: EVENT_REMOVE_SHAPE,
			EVENT_EDIT_SHAPE: EVENT_EDIT_SHAPE,
			EVENT_EDIT_BACKGROUND: EVENT_EDIT_BACKGROUND,
			XMLNS: XMLNS,
			XLINKNS: XLINKNS,
			DATA_IMAGE_SOURCE_ID: DATA_IMAGE_SOURCE_ID,
			DATA_IMAGE_SOURCE_SRC: DATA_IMAGE_SOURCE_SRC,
			DATA_IMAGE_SOURCE_FILLMODE: DATA_IMAGE_SOURCE_FILLMODE,
			DATA_IMAGE_SOURCE_OFFSET_X: DATA_IMAGE_SOURCE_OFFSET_X,
			DATA_IMAGE_SOURCE_OFFSET_Y: DATA_IMAGE_SOURCE_OFFSET_Y,
			DATA_BOUNDS_OBJECT: DATA_BOUNDS_OBJECT
		},
		message: {
			ERR_MSG_CANNOT_REMOVE_NOT_APPENDED: ERR_MSG_CANNOT_REMOVE_NOT_APPENDED,
			ERR_MSG_ArtAGSESSION_DISABLED: ERR_MSG_ArtAGSESSION_DISABLED
		}
	});
})();
//-------------------------------------------------
// コマンドマネージャ及びコマンド定義
//-------------------------------------------------
(function($) {
	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	var ERR_MSG_CANNOT_REMOVE_NOT_APPENDED = h5.ui.components.artboard.message.ERR_MSG_CANNOT_REMOVE_NOT_APPENDED;
	var useDataForGetBBox = h5.ui.components.artboard.useDataForGetBBox;
	var setBoundsData = h5.ui.components.artboard.setBoundsData;
	var getBounds = h5.ui.components.artboard.getBounds;
	var EVENT_UNDO = h5.ui.components.artboard.consts.EVENT_UNDO;
	var EVENT_REDO = h5.ui.components.artboard.consts.EVENT_REDO;
	var EVENT_ENABLE_UNDO = h5.ui.components.artboard.consts.EVENT_ENABLE_UNDO;
	var EVENT_ENABLE_REDO = h5.ui.components.artboard.consts.EVENT_ENABLE_REDO;
	var EVENT_DISABLE_UNDO = h5.ui.components.artboard.consts.EVENT_DISABLE_UNDO;
	var EVENT_DISABLE_REDO = h5.ui.components.artboard.consts.EVENT_DISABLE_REDO;
	var EVENT_APPEND_SHAPE = h5.ui.components.artboard.consts.EVENT_APPEND_SHAPE;
	var EVENT_REMOVE_SHAPE = h5.ui.components.artboard.consts.EVENT_REMOVE_SHAPE;
	var EVENT_EDIT_SHAPE = h5.ui.components.artboard.consts.EVENT_EDIT_SHAPE;

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	/**
	 * コマンドクラス
	 * <p>
	 * ある処理をコマンドとして定義し、その実行と取り消しを行えるクラスです
	 * </p>
	 *
	 * @name Command
	 * @class
	 * @abstruct
	 */
	function Command() {
	// 何もしない
	}
	$.extend(Command.prototype, {
		/**
		 * コマンドの実行
		 *
		 * @memberOf Command
		 * @instance
		 * @returns {Any} コマンドの実行結果
		 */
		execute: function() {
			if (this._isExecuted) {
				return this;
			}
			var ret = this._execute();
			this._isExecuted = true;
			return ret;
		},

		/**
		 * コマンドの取り消し
		 *
		 * @memberOf Command
		 * @instance
		 * @returns {Any} コマンドの実行結果
		 */
		undo: function() {
			if (!this._isExecuted) {
				return this;
			}
			var ret = this._undo();
			this._isExecuted = false;
			return ret;
		},

		/**
		 * コンストラクタで指定したコマンドデータオブジェクトを返します
		 *
		 * @memberOf Command
		 * @instance
		 * @returns {Object} コマンドデータオブジェクト
		 */
		getCommandData: function() {
			return this._data;
		},

		/**
		 * 初期化処理
		 *
		 * @memberOf Command
		 * @private
		 * @instance
		 */
		_init: function(commandData) {
			// コマンドデータを_dataとして持っておく
			this._data = commandData;
			this._isExecuted = false;
		}
	});

	/**
	 * ユーザ定義コマンド
	 * <p>
	 * コマンド実行処理及び、コマンド取り消し処理を任意に指定することができるコマンドクラス
	 * </p>
	 *
	 * @class
	 * @param {Object} commandData コマンドデータオブジェクト。CustomCommandクラスでは以下のようなプロパティを持つオブジェクトを指定してください。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	execute: executeメソッドを呼んだ時に実行する関数。必須。
	 * 	undo: undoメソッドを呼んだ時に実行する関数。必須。
	 * 	margeCommand: 引数に渡されたCommandとマージする関数を指定。第1引数にCommandを受け取り、そのコマンドとマージしたコマンドを返すような関数を指定します。指定しない場合はマージせずにfalseを返す。
	 * }
	 * </code></pre>
	 *
	 * @class
	 * @extends Command
	 * @param {Object} commandData コマンドデータオブジェクト
	 */
	function CustomCommand(commandData) {
		this._init(commandData);
		this._execute = function() {
			return commandData.execute.call(commandData);
		};
		this._undo = function() {
			return commandData.undo.call(commandData);
		};
		if (commandData.margeCustomCommand) {
			// ユーザ定義があれば上書き
			this.margeCustomCommand = function() {
				commandData.margeCustomCommand.call(commandData);
			};
		}
	}
	$.extend(CustomCommand.prototype, Command.prototype);


	/**
	 * ArtShape取り扱うコマンド
	 * <p>
	 * このクラスは抽象クラスです。以下のクラスがこのクラスを実装しています。
	 * </p>
	 * <ul>
	 * <li>{@link AppendCommand}
	 * <li>{@link RemoveCommand}
	 * </ul>
	 * <p>
	 * _execute時にイベントオブジェクトを生成して戻り値として返します。
	 * </p>
	 *
	 * @name ArtShapeCommand
	 * @class ArtShapeCommand
	 * @abstruct
	 * @extends Command
	 * @param {Object} commandData コマンドデータオブジェクト。以下のプロパティは必須です。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	shape: ArtShapeオブジェクト
	 * }
	 * </code></pre>
	 */
	function ArtShapeCommand(commandData) {
	// 抽象クラスのため何もしない
	}
	$.extend(ArtShapeCommand.prototype, Command.prototype, {
		/**
		 * コマンドと紐づくArtShapeオブジェクトを取得する
		 *
		 * @memberOf ArtShapeCommand
		 * @instance
		 * @returns {ArtShape}
		 */
		getShape: function() {
			return this._data.shape;
		}
	});

	/**
	 * 図形要素の追加を行うコマンド
	 *
	 * @name AppendCommand
	 * @class
	 * @extends ArtShapeCommand
	 * @param {Object} commandData コマンドデータオブジェクト。AppendCommandクラスでは以下のようなプロパティを持つオブジェクトを指定してください。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	shape: 追加するArtShape
	 * 	layer: ArtShapeの要素を追加する対象の要素
	 * }
	 * </code></pre>
	 */
	function AppendCommand(commandData) {
		this._init(commandData);
	}
	$.extend(AppendCommand.prototype, ArtShapeCommand.prototype, {
		/**
		 * @memberOf AppendCommand
		 * @private
		 * @instance
		 * @see Command#execute
		 */
		_execute: function() {
			this._data.layer.appendChild(this.getShape().getElement());
			return {
				type: EVENT_APPEND_SHAPE,
				target: this.getShape(),
				layer: this._data._layer
			};
		},

		/**
		 * @memberOf AppendCommand
		 * @private
		 * @instance
		 * @see Command#undo
		 */
		_undo: function() {
			this._data.layer.removeChild(this.getShape().getElement());
			return {
				type: EVENT_REMOVE_SHAPE,
				target: this.getShape(),
				layer: this._data._layer
			};
		}
	});

	/**
	 * 図形要素の削除を行うコマンド
	 *
	 * @name RemoveCommand
	 * @class
	 * @extends ArtShapeCommand
	 * @param {Object} commandData コマンドデータオブジェクト。RemoveCommandクラスでは以下のようなプロパティを持つオブジェクトを指定してください。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	shape: 削除するArtShape
	 * }
	 * </code></pre>
	 */
	function RemoveCommand(commandData) {
		this._init(commandData);
		this._undoData = {};
	}
	$.extend(RemoveCommand.prototype, ArtShapeCommand.prototype, {
		/**
		 * @memberOf RemoveCommand
		 * @private
		 * @instance
		 * @see Command#execute
		 */
		_execute: function() {
			var shape = this.getShape();
			var parent = shape.getElement().parentNode;
			if (!parent) {
				throw new Error(ERR_MSG_CANNOT_REMOVE_NOT_APPENDED);
			}
			this._undoData.parent = parent;
			parent.removeChild(shape.getElement());
			return {
				type: EVENT_REMOVE_SHAPE,
				target: shape,
				layer: parent
			};
		},

		/**
		 * @memberOf RemoveCommand
		 * @private
		 * @instance
		 * @see Command#undo
		 */
		_undo: function() {
			var shape = this.getShape();
			var parent = this._undoData.parent;
			parent.appendChild(shape.getElement());
			return {
				type: EVENT_APPEND_SHAPE,
				target: shape,
				layer: parent
			};
		}
	});

	/**
	 * 図形のスタイルの変更を行うコマンド
	 *
	 * @name StyleCommand
	 * @class
	 * @extends ArtShapeCommand
	 * @param {Object} commandData コマンドデータオブジェクト。StyleCommandクラスでは以下のようなプロパティを持つオブジェクトを指定してください。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	shape: スタイルを適用するArtShape
	 * 	style: 適用するスタイルオブジェクト
	 * }
	 * </code></pre>
	 */
	function StyleCommand(commandData) {
		this._init(commandData);
		this._undoData = {};
	}
	$.extend(StyleCommand.prototype, ArtShapeCommand.prototype, {
		/**
		 * @memberOf StyleCommand
		 * @private
		 * @instance
		 * @see Command#execute
		 */
		_execute: function() {
			var before = this._undoData.beforeStyle;
			var after = this._undoData.afterStyle;
			var shape = this.getShape();
			var prop = this._data.propertyName;
			var oldValue = shape[prop];
			if (after && before) {
				// 一度でも実行していれば、適用前、適用後のスタイルは知っているので
				// そのまま適用
				$(shape.getElement()).css(after);
			} else {
				before = {};
				after = {};
				var element = shape.getElement();
				for ( var p in this._data.style) {
					// camelCaseにして、jQueryを使わずにスタイルを適用する
					// (jQueryを使った場合にopacityの値に'px'が足されてしまい、Firefoxだと値が反映されない)
					var camel = $.camelCase(p);
					before[camel] = element.style[camel];
					element.style[camel] = this._data.style[p];
					// 設定した後の値を再取得してafterに覚えておく
					after[camel] = element.style[camel];
				}
				this._undoData.beforeStyle = before;
				this._undoData.afterStyle = after;
			}
			var newValue = shape[prop];
			return {
				type: EVENT_EDIT_SHAPE,
				target: shape,
				prop: prop,
				oldValue: oldValue,
				newValue: newValue
			};
		},

		/**
		 * @memberOf StyleCommand
		 * @private
		 * @instance
		 * @see Command#undo
		 */
		_undo: function() {
			var before = this._undoData.beforeStyle;
			var shape = this.getShape();
			var prop = this._data.propertyName;
			var oldValue = shape[prop];
			$(shape.getElement()).css(before);
			var newValue = shape[prop];
			return {
				type: EVENT_EDIT_SHAPE,
				target: shape,
				prop: prop,
				oldValue: oldValue,
				newValue: newValue
			};
		}
	});

	/**
	 * 図形の属性値の変更を行うコマンド
	 *
	 * @name AttrCommand
	 * @class
	 * @extends ArtShapeCommand
	 * @param {Object} commandData コマンドデータオブジェクト。AttrCommandクラスでは以下のようなプロパティを持つオブジェクトを指定してください。
	 *
	 * <pre class="sh_javascript"><code>
	 * {
	 * 	shape: スタイルを適用するArtShape
	 * 	attr: 適用する属性値オブジェクト(属性名をキーにして属性値を値に持つオブジェクト),
	 * 	attrNS: 適用する名前空間付属性(ns,name,valueをキーにそれぞれ名前空間、属性名、属性値を値として持つオブジェクト)の配列
	 * }
	 * </code></pre>
	 */
	function AttrCommand(commandData) {
		this._init(commandData);
		this._undoData = {};
	}
	$.extend(AttrCommand.prototype, ArtShapeCommand.prototype, {
		/**
		 * @memberOf AttrCommand
		 * @private
		 * @instance
		 * @see Command#execute
		 */
		_execute: function() {
			var attr = this._data.attr;
			var attrNS = this._data.attrNS;
			var shape = this.getShape();
			var prop = this._data.propertyName;
			var oldValue = shape[prop];
			var element = shape.getElement();
			var beforeAttr, beforeAttrNS;
			if (attr) {
				beforeAttr = {};
				for ( var p in attr) {
					beforeAttr[p] = element.getAttribute(p);
					element.setAttribute(p, attr[p]);
				}
			}
			if (attrNS) {
				beforeAttrNS = [];
				for (var i = 0, l = attrNS.length; i < l; i++) {
					var at = attrNS[i];
					beforeAttrNS.push({
						ns: at.ns,
						name: at.name,
						value: element.getAttributeNS(at.ns, at.name)
					});
					element.setAttributeNS(at.ns, at.name, at.value);
				}
			}
			this._beforeAttr = {
				attr: beforeAttr,
				attrNS: beforeAttrNS
			};

			// pathのBBoxが自動更新されないブラウザについて、自分で計算してelementに持たせる
			if (useDataForGetBBox && element.tagName.toLowerCase() === 'path') {
				var bBox = getBounds(element);
				this._beforeBounds = bBox;
				var beforeD = beforeAttr.d;
				var afterD = element.getAttribute('d');
				var beforeXY = beforeD.match(/M -?\d* -?\d*/)[0].split(' ').slice(1);
				var afterXY = afterD.match(/M -?\d* -?\d*/)[0].split(' ').slice(1);
				var dx = parseInt(afterXY[0]) - parseInt(beforeXY[0]);
				var dy = parseInt(afterXY[1]) - parseInt(beforeXY[1]);
				bBox.x += dx;
				bBox.y += dy;
				setBoundsData(element, bBox);
			}
			var newValue = shape[prop];
			return {
				type: EVENT_EDIT_SHAPE,
				target: shape,
				prop: prop,
				oldValue: oldValue,
				newValue: newValue
			};
		},

		/**
		 * @memberOf AttrCommand
		 * @private
		 * @instance
		 * @see Command#undo
		 */
		_undo: function() {
			var attr = this._beforeAttr.attr;
			var attrNS = this._beforeAttr.attrNS;
			var shape = this.getShape();
			var prop = this._data.propertyName;
			var oldValue = shape[prop];
			var element = shape.getElement();
			if (attr) {
				for ( var p in attr) {
					element.setAttribute(p, attr[p]);
				}
			}
			if (attrNS) {
				for (var i = 0, l = attrNS.length; i < l; i++) {
					var at = attrNS[i];
					element.setAttributeNS(at.ns, at.name, at.value);
				}
			}
			// pathのBBoxが自動更新されないブラウザについて、自分で計算してelementに持たせる
			if (useDataForGetBBox && element.tagName.toLowerCase() === 'path') {
				setBoundsData(element, this._beforeBounds);
			}
			var newValue = shape[prop];
			return {
				type: EVENT_EDIT_SHAPE,
				target: shape,
				prop: prop,
				oldValue: oldValue,
				newValue: newValue
			};
		}
	});

	/**
	 * 複数のCommandを一つのコマンドとして扱うコマンド
	 * <p>
	 * SequenceCommandは複数のコマンドを包括するためのコマンドです。
	 * </p>
	 * <p>
	 * execute()及びundo()時に、登録されたコマンド全ての実行及び取り消しを行います。
	 * </p>
	 *
	 * @name SequenceCommand
	 * @class
	 * @extends Command
	 * @param {Command[]} [commands=[]] Commandの配列
	 */
	function SequenceCommand(commands) {
		this._commands = commands || [];
	}
	$.extend(SequenceCommand.prototype, Command.prototype, {
		/**
		 * @memberOf SequenceCommand
		 * @private
		 * @instance
		 * @see Command#execute
		 * @returns {Array} 各コマンドのexecute()の戻り値の配列
		 */
		_execute: function() {
			var ret = [];
			for (var i = 0, l = this._commands.length; i < l; i++) {
				ret.push(this._commands[i].execute());
			}
			return ret;
		},

		/**
		 * @memberOf SequenceCommand
		 * @private
		 * @instance
		 * @see Command#undo
		 * @returns {Array} 各コマンドのundo()の戻り値の配列
		 */
		_undo: function() {
			var ret = [];
			for (var i = this._commands.length - 1; i >= 0; i--) {
				ret.push(this._commands[i].undo());
			}
			return ret;
		},

		/**
		 * コマンドの追加
		 * <p>
		 * 一括で実行及び取り消しを行うコマンドを追加します
		 * </p>
		 *
		 * @memberOf SequenceCommand
		 * @instance
		 * @param {Command}
		 */
		push: function(command) {
			this._commands.push(command);
		},

		/**
		 * 内部コマンドの取得
		 * <p>
		 * 一括で実行及び取り消しを行うコマンドのリスト(配列)を返します
		 * </p>
		 *
		 * @memberOf SequenceCommand
		 * @instance
		 * @returns {Commands[]}
		 */
		getInnerCommands: function() {
			return this._commands;
		}
	});

	/**
	 * コマンドマネージャ
	 * <p>
	 * {@link Command}の管理を行うためのクラス
	 * </p>
	 * <p>
	 * {@link CommandManager#append}で追加された順番でコマンドを管理し、 実行済みコマンドの取り消し、及び実行が取り消されたコマンドの実行を行うことができます。
	 * <p>
	 * このクラスは以下のタイミングでイベントをあげます
	 * </p>
	 * <table> <thead>
	 * <tr>
	 * <th>イベント名</th>
	 * <th>タイミング/th> </tr>
	 * </thead><tbody>
	 * <tr>
	 * <td>disableUndo</td>
	 * <td>取り消すコマンドが無くなった時(undoが呼ばれて一番最初にappendされたコマンドを取り消した時)</td>
	 * </tr>
	 * <tr>
	 * <td>enableUndo</td>
	 * <td>取り消すコマンドができた時(redoが呼ばれて、実行済みコマンドができた時)</td>
	 * </tr>
	 * <tr>
	 * <td>enableRedo</td>
	 * <td>実行するコマンドができた時(undoが呼ばれて、実行が取り消されたコマンドができた時)</td>
	 * </tr>
	 * <tr>
	 * <td>disableRedo</td>
	 * <td>実行するコマンドが無くなった時(redoが呼ばれて、一番最後にappendされたコマンドが実行された時)</td>
	 * </tr>
	 * </tbody></table>
	 *
	 * @name CommandManager
	 * @class
	 * @mixes EventDispatcher
	 */
	function CommandManager() {
		// 空コンストラクタ
		this._index = 0;
		this._history = [];
	}
	h5.mixin.eventDispatcher.mix(CommandManager.prototype);
	$.extend(CommandManager.prototype, {
		/**
		 * コマンドを追加
		 * <p>
		 * コマンドが配列で渡された場合は一連のコマンドを一つのコマンドとして扱います
		 * </p>
		 *
		 * @memberOf CommandManager
		 * @instance
		 * @param {Command|Command[]} command
		 */
		append: function(command) {
			var history = this._history;
			var index = this._index;
			if (index !== history.length) {
				// currentがhistoryの最後尾を見ていない時は、current以降の履歴を削除
				history.splice(index);
				// 最後尾を見ていない時(==今までREDO可能だったとき)にREDO不可になったことを通知
				this.dispatchEvent({
					type: EVENT_DISABLE_REDO
				});
			}
			// 最後尾に追加
			history.push(command);
			// indexを更新
			this._index++;
			if (index === 0) {
				// 0番目を見ていた時は、UNDO可能になったことを通知
				this.dispatchEvent({
					type: EVENT_ENABLE_UNDO
				});
			}
		},

		/**
		 * 一つ戻す
		 * <p>
		 * 最後に実行したコマンドの取り消し操作を行います
		 * </p>
		 *
		 * @memberOf CommandManager
		 * @instance
		 * @returns {Any} 取り消し操作を実行したコマンドのundo()実行時の戻り値
		 */
		undo: function() {
			var history = this._history;
			var index = this._index;
			var command = history[index - 1];
			if (!command) {
				return;
			}
			// undo実行
			var returnValues = command.undo();
			// undoされたことをイベントで通知
			this.dispatchEvent({
				type: EVENT_UNDO,
				returnValues: returnValues
			});

			this._index--;
			// 元々redoできなかった場合(最後を見ていた場合)はredo可能になったことを通知
			if (index === history.length) {
				this.dispatchEvent({
					type: EVENT_ENABLE_REDO
				});
			}
			// 1番目を見ていた時は、今回のundoでundo不可になったことを通知
			if (index === 1) {
				this.dispatchEvent({
					type: EVENT_DISABLE_UNDO
				});
			}
			return returnValues;
		},

		/**
		 * 一つ進む
		 * <p>
		 * 最後に実行を取り消したコマンドの実行操作を行います
		 * </p>
		 *
		 * @memberOf CommandManager
		 * @instance
		 * @returns {Any} 実行したコマンドのexecuteの戻り値
		 */
		redo: function() {
			var history = this._history;
			var index = this._index;
			var command = history[index];
			if (!command) {
				return;
			}
			// redo実行
			var returnValues = command.execute();
			// redoされたことをイベントで通知
			this.dispatchEvent({
				type: EVENT_REDO
			});

			this._index++;
			// 元々undeできなかった場合(0番目を見ていた場合はundo可能になったことを通知
			if (index === 0) {
				this.dispatchEvent({
					type: EVENT_ENABLE_UNDO
				});
			}
			// 最後の一個前を見ていた時は、今回のredoでredo不可になったことを通知
			if (index === history.length - 1) {
				this.dispatchEvent({
					type: EVENT_DISABLE_REDO
				});
			}
			return returnValues;
		},

		/**
		 * 管理対象のコマンド({@link CommandManager#append}で追加したコマンド)を全て管理対象から外します
		 *
		 * @memberOf CommandManager
		 * @instance
		 */
		clearAll: function() {
			var index = this._index;
			var historyLength = this._history.length;
			this._history.splice(0, 0);
			this._index = 0;
			// undo不可になったことを通知
			if (index !== 0) {
				this.dispatchEvent({
					type: EVENT_DISABLE_UNDO
				});
			}
			// redo不可になったことを通知
			if (index < historyLength) {
				this.dispatchEvent({
					type: EVENT_DISABLE_REDO
				});
			}
		}
	});

	h5.u.obj.expose('h5.ui.components.artboard', {
		Command: Command,
		CustomCommand: CustomCommand,
		AppendCommand: AppendCommand,
		RemoveCommand: RemoveCommand,
		StyleCommand: StyleCommand,
		AttrCommand: AttrCommand,
		SequenceCommand: SequenceCommand,
		CommandManager: CommandManager
	});
})(jQuery);
//-------------------------------------------------
// 共通関数
//-------------------------------------------------
(function() {
	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	/** 要素に、要素の位置とサイズを持たせるときのデータ属性名 */
	var DATA_BOUNDS_OBJECT = h5.ui.components.artboard.DATA_BOUNDS_OBJECT;
	var XMLNS = h5.ui.components.artboard.consts.XMLNS;

	//------------------------------------------------------------
	// Variables
	//------------------------------------------------------------
	/**
	 * BBoxの取得にデータ属性を使用するかどうか
	 * <p>
	 * iOS6では配置した時のBBoxしか取得できないので、移動時にdata属性に移動量を覚えておいて、それをもとにBBoxを計算する
	 * </p>
	 */
	var useDataForGetBBox = h5.env.ua.isiOS && h5.env.ua.browserVersion <= 6;

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	//--------------------------
	// Functions
	//--------------------------
	/**
	 * BBoxが正しく取得できないブラウザ用に、データ属性に位置とサイズを格納したオブジェクトを持たせる
	 *
	 * @param {DOM|jQuery} element
	 * @param {Object} bounds x,y,widht,heightを持つオブジェクト
	 */
	function setBoundsData(element, bounds) {
		$(element).data(DATA_BOUNDS_OBJECT, bounds);
	}

	/**
	 * SVGに描画された要素の位置とサイズ(x,y,height,width)を取得して返す
	 *
	 * @private
	 * @param element
	 * @returns {Object} 以下のようなオブジェクトを返します
	 *
	 * <pre class="sh_javascript">
	 * {
	 * 	x: svg要素内のx座標位置,
	 * 	y: svg要素内でのy座標位置,
	 * 	height: 要素を包含する矩形の高さ,
	 * 	width: 要素を包含する矩形の幅
	 * }
	 * </pre>
	 */
	function getBounds(element) {
		var bBox = {};
		// TODO Firefoxの場合、pathで20pxのマージンが取られることがある
		if (!useDataForGetBBox || element.tagName.toLowerCase() !== 'path') {
			// path要素の場合はiOS6でもBBoxが正しく取得できるので、getBBox()の結果を返す
			bBox = element.getBBox();
		} else {
			// データ属性の値を返す。なければgetBox()の結果を返す
			bBox = $(element).data(DATA_BOUNDS_OBJECT) || element.getBBox();
		}
		return {
			x: bBox.x,
			y: bBox.y,
			width: bBox.width,
			height: bBox.height
		};
	}

	/**
	 * タグ名と属性値から要素を作成(必要なクラスを追加する)
	 *
	 * @private
	 * @param tagName
	 * @param data
	 * @returns 作成した要素
	 */
	function createSvgDrawingElement(tagName, data) {
		var elem = document.createElementNS(XMLNS, tagName);
		$(elem).attr(data.attr);
		if (data.attrNS) {
			var attrNS = data.attrNS;
			for (var i = 0, l = attrNS.length; i < l; i++) {
				var attr = attrNS[i];
				elem.setAttributeNS(attr.ns, attr.name, attr.value);
			}
		}
		if (data.style) {
			$(elem).css(data.style);
		}
		return elem;
	}

	h5.u.obj.expose('h5.ui.components.artboard', {
		useDataForGetBBox: useDataForGetBBox,
		setBoundsData: setBoundsData,
		getBounds: getBounds,
		createSvgDrawingElement: createSvgDrawingElement
	});
})();

//-------------------------------------------------
// ArtShape定義
//-------------------------------------------------
(function($) {
	//------------------------------------------------------------
	// Const
	//------------------------------------------------------------
	var DATA_ELEMENT_TYPE = 'elementType';


	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	var XLINKNS = h5.ui.components.artboard.consts.XLINKNS;
	var createSvgDrawingElement = h5.ui.components.artboard.createSvgDrawingElement;
	var getBounds = h5.ui.components.artboard.getBounds;
	var StyleCommand = h5.ui.components.artboard.StyleCommand;
	var AttrCommand = h5.ui.components.artboard.AttrCommand;
	var CustomCommand = h5.ui.components.artboard.CustomCommand;
	// エラーメッセージ
	var ERR_MSG_ArtAGSESSION_DISABLED = h5.ui.components.artboard.message.ERR_MSG_ArtAGSESSION_DISABLED;

	//------------------------------------------------------------
	// Functions
	//------------------------------------------------------------
	/**
	 * 図形インスタンスのtypeを書き込み不可/列挙不可で設定(コンストラクタで設定)
	 *
	 * @private
	 * @param {ArtShape} instance 図形インスタンス
	 * @param {string} type 図形のタイプ
	 */
	function setShapeInstanceType(instance, type) {
		Object.defineProperty(instance, 'type', {
			value: type,
			writable: false,
			enumerable: false,
			configurable: false
		});
	}
	/**
	 * 要素のスタイル定義を取得
	 *
	 * @private
	 * @param {DOM} element
	 * @returns {Object}
	 */
	function getStyleDeclaration(element) {
		var style = element.style;
		var styleDeclaration = {};
		// 値の記述してあるスタイルを取得
		for (var j = 0, len = style.length; j < len; j++) {
			var p = style[j];
			styleDeclaration[p] = style.getPropertyValue(p);
		}
		return styleDeclaration;
	}

	/**
	 * 要素のデータ属性を取得
	 *
	 * @private
	 * @param {DOM} element
	 * @returns {Object}
	 */
	function getDataAttr(element) {
		return $(element).data();
	}

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	/**
	 * DragSession
	 * <p>
	 * 図形(Shapeクラス)のドラッグ操作を行うためのクラスです。コンストラクタで渡された図形についてのドラッグ操作を管理します。
	 * </p>
	 *
	 * @class
	 * @name DragSession
	 * @param {ArtShape} shape ドラッグ操作対象の図形
	 */
	function DragSession(shape) {
		// 1つのShapeについて1つのDragSessionしか同時に実行できない
		if (shape._currentDragSession) {
			shape._currentDragSession.cancel();
		}
		shape._currentDragSession = this;

		/**
		 * ドラッグ操作対象の図形
		 *
		 * @memberOf DragSession
		 * @instance
		 * @name shape
		 * @type ArtShape
		 */
		this.shape = shape;

		/**
		 * ドラッグして移動した移動量
		 *
		 * @memberOf DragSession
		 * @private
		 * @instance
		 */
		this._move = {
			x: 0,
			y: 0
		};
	}
	$.extend(DragSession.prototype, {
		/**
		 * 指定された位置に移動
		 * <p>
		 * このメソッドを使って図形を移動すると、見た目の位置のみが変化します。図形(ArtShape)のmoveToやmoveByは呼ばれません。
		 * ユーザによるドラッグ操作等の、移動先が未確定の場合の図形の移動のためのメソッドです。
		 * </p>
		 * <p>
		 * このメソッドで移動した位置に、図形の位置を確定させたい場合は、endを呼んでください。
		 * </p>
		 * <p>
		 * 引数にはドラッグセッション開始位置からの移動量(x,y)を指定します。
		 * </p>
		 *
		 * @memberOf DragSession
		 * @instance
		 * @param {number} x
		 * @param {number} y
		 */
		move: function(x, y) {
			if (this._disable) {
				throw new Error(ERR_MSG_ArtAGSESSION_DISABLED);
			}
			this._translate(x, y);
			this._move.x = x;
			this._move.y = y;
		},

		/**
		 * ドラッグセッションを終了して位置を確定させる
		 * <p>
		 * moveメソッドを使って移動させた位置で、図形の位置を確定します。
		 * </p>
		 *
		 * @memberOf DragSession
		 * @instance
		 * @returns {DragSession}
		 */
		end: function() {
			if (this._disable) {
				throw new Error(ERR_MSG_ArtAGSESSION_DISABLED);
			}
			// transformを元に戻す
			this._translate(0, 0);
			// 実際に移動する
			var shape = this.shape;
			shape.moveBy(this._move);
			this._disable = true;
			shape._currentDragSession = null;
		},

		/**
		 * ドラッグセッションを終了して位置を元に戻す
		 * <p>
		 * moveメソッドで移動させた処理を元に戻します。
		 * </p>
		 *
		 * @memberOf DragSession
		 * @instance
		 * @returns {DragSession}
		 */
		cancel: function() {
			if (this._disable) {
				throw new Error(ERR_MSG_ArtAGSESSION_DISABLED);
			}
			// transformを元に戻す
			this._translate(0, 0);
			this._disable = true;
			this.shape._currentDragSession = null;
		},

		/**
		 * transform属性を指定して要素を移動
		 *
		 * @memberOf DragSession
		 * @private
		 * @instance
		 * @param {number} x
		 * @param {number} y
		 */
		_translate: function(x, y) {
			if (this._disable) {
				throw new Error(ERR_MSG_ArtAGSESSION_DISABLED);
			}
			var transformValue = h5.u.str.format('translate({0},{1})', x, y);
			$(this.shape.getElement()).attr('transform', transformValue);
		}
	});

	//----------------------------
	// 図形クラス
	//----------------------------
	/**
	 * 図形クラス(抽象クラス)
	 * <p>
	 * {@link ArtRect}や{@link ArtPath}など、各図形クラスがこのクラスを継承しています。
	 * </p>
	 *
	 * @class
	 * @name ArtShape
	 * @abstract
	 */
	function ArtShape() {
	// 抽象クラスのため何もしない
	}
	/**
	 * シリアライズされた図形からArtShapeクラス(の子クラス)を生成して返します
	 * <p>
	 * 各図形クラスはserializeメソッドを用意しており、シリアライズ可能なオブジェクトを生成することができます。
	 * </p>
	 * <p>
	 * 以下は、ArtRectクラスの要素をシリアライズして復元するサンプルコードです。
	 * </p>
	 *
	 * <pre class="sh_javascript"><code>
	 * // ArtRectクラスを生成
	 * var rect = new h5.ui.components.artboard.ArtShapeConstructor.ArtRect(element);
	 *
	 * // ArtRectクラスをシリアライズ(プレーンオブジェクトに変換)
	 * var obj = rect.serialize();
	 *
	 * // デシリアライズ(復元) 戻り値はArtRectクラス
	 * h5.ui.components.artboard.ArtShapeConstructor.ArtShape.deserialize(rect);
	 * </code></pre>
	 *
	 * @memberOf ArtShape
	 * @static
	 * @function
	 * @param {Object} shapeData あるArtShapeについてのセーブデータ。{@link DrawingSaveData#saveData}.shapes配列の要素がshapeDataに該当します。
	 * @param {Logic} [commandManagerWrapper] コマンド生成時にappendCommandを行うロジックやクラス
	 * @returns {ArtShape} 復元した図形クラス(ArtShapeを継承する具象クラス)
	 */
	ArtShape.deserialize = function(shapeData, commandManagerWrapper) {
		var type = shapeData.type;
		// エレメントの作成
		var element = createSvgDrawingElement(type, {
			attr: shapeData.attr,
			attrNS: shapeData.attrNS,
			style: shapeData.style
		});
		$(element).data(shapeData.data);
		var shape = null;
		switch (type) {
		case 'path':
			shape = new ArtPath(element, commandManagerWrapper);
			break;
		case 'rect':
			shape = new ArtRect(element, commandManagerWrapper);
			break;
		case 'ellipse':
			shape = new ArtEllipse(element, commandManagerWrapper);
			break;
		case 'image':
			shape = new ArtImage(element, commandManagerWrapper);
			break;
		case 'text':
			shape = new ArtText(element, commandManagerWrapper);
			break;
		}
		return shape;
	};

	$.extend(ArtShape.prototype, {
		/**
		 * 初期化処理
		 *
		 * @memberOf ArtShape
		 * @private
		 * @instance
		 */
		_init: function(element, commandManagerWrapper) {
			this.commandManagerWrapper = commandManagerWrapper;
			this._element = element;
			$(element).data(DATA_ELEMENT_TYPE, this.type);
		},

		/**
		 * 図形要素を取得
		 * <p>
		 * 図形を表現している要素を返します。
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @returns {DOM}
		 */
		getElement: function() {
			return this._element;
		},

		/**
		 * ドラッグセッションの開始
		 * <p>
		 * 図形のドラッグ操作を行うための{@link DragSession}オブジェクトを生成して返します。
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @returns {DragSession}
		 */
		beginDrag: function() {
			return new DragSession(this, this.commandManagerWrapper);
		},

		/**
		 * 図形の位置とサイズを取得
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @returns {Object} x,y,width,heightを持つオブジェクト
		 */
		getBounds: function() {
			return getBounds(this.getElement());
		},

		/**
		 * レイヤ上に描画されていない図形ならisAloneはtrue、そうでないならfalseを返します
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @returns {boolean}
		 */
		isAlone: function() {
			return !this._element.parentNode;
		},

		/**
		 * 図形が指定された座標と重なるかどうかを返します
		 * <p>
		 * 指定された座標と重ならない場合、または描画されていない図形ならfalseを返します
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @param {number} x x座標位置
		 * @param {number} y y座標位置
		 * @returns {boolean} 図形が指定された座標と重なるかどうか
		 */
		hitTest: function(x, y) {
			if (this.isAlone()) {
				return false;
			}
			var box = this.getBounds();
			if (box.x < x && x < box.x + box.width && box.y < y && y < box.y + box.height) {
				return true;
			}
			return false;
		},

		/**
		 * 図形が指定された矩形(x,y,w,h)に含まれるかどうかを返します(交わるだけではなく完全に含まれるかどうかを判定します)
		 * <p>
		 * 指定された矩形に含まれない場合、または描画されていない図形ならfalseを返します
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @param {number} x 矩形の左上のx座標位置
		 * @param {number} y 矩形の左上のy座標位置
		 * @param {number} w 矩形の幅
		 * @param {number} h 矩形の高さ
		 * @returns {boolean} 図形が指定された矩形に含まれるかどうか
		 */
		isInRect: function(x, y, w, h) {
			if (this.isAlone()) {
				return false;
			}
			var box = this.getBounds();
			if (x < box.x && box.x + box.width < x + w && y < box.y && box.y + box.height < y + h) {
				return true;
			}
			return false;
		},

		/**
		 * 図形の移動を絶対座標指定で行います
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @function
		 * @param {number} x x座標位置
		 * @param {number} y y座標位置
		 * @interface
		 */
		moveTo: function() {
			// 子クラスでの実装が必須
			throw new Error('moveToを使用する場合、子クラスでの実装が必須です');
		},

		/**
		 * 図形の移動を相対座標指定で行います
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @function
		 * @param {number} x x座標位置
		 * @param {number} y y座標位置
		 * @interface
		 */
		moveBy: function() {
			// 子クラスでの実装が必須
			throw new Error('moveToを使用する場合、子クラスでの実装が必須です');
		},

		/**
		 * 図形をシリアライズ可能なオブジェクトに変換します
		 * <p>
		 * このメソッドで生成したオブジェクトは{@link ArtShape.deserialize}で元の図形クラスに復元することができます
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @function
		 * @interface
		 * @returns {Object} 図形情報を格納したシリアライズ可能なプレーンオブジェクト
		 */
		serialize: function() {
			// 子クラスでの実装が必須
			throw new Error('serializeを使用する場合、子クラスでの実装が必須です');
		},

		/**
		 * 任意のユーザデータを持たせることができるプロパティ
		 * <p>
		 * 図形個別に何か値を持たせたい場合はこのプロパティに自由に値を持たせることができます。
		 * </p>
		 * <p>
		 * デフォルト値はnullです
		 * </p>
		 *
		 * @memberOf ArtShape
		 * @instance
		 * @type {Any}
		 */
		userData: null,

		/**
		 * エレメントのスタイルをコマンドを作って設定
		 *
		 * @memberOf ArtShape
		 * @private
		 * @instance
		 * @param style
		 * @param propertyName 設定するスタイルについてのshape上のプロパティ名。editShapeイベントオブジェクトの生成に必要
		 * @returns {Command}
		 */
		_setStyle: function(style, propertyName) {
			var command = new StyleCommand({
				shape: this,
				style: style,
				propertyName: propertyName
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			}
			return command;
		},

		/**
		 * エレメントのスタイルを取得
		 *
		 * @memberOf ArtShape
		 * @private
		 * @instance
		 * @param prop
		 */
		_getStyle: function(prop) {
			return this._element.style[prop];
		},

		/**
		 * エレメントの属性をコマンドを作って設定
		 *
		 * @memberOf ArtShape
		 * @private
		 * @instance
		 * @param attr
		 * @param attrNS
		 * @param propertyName 設定するスタイルについてのshape上のプロパティ名。editShapeイベントオブジェクトの生成に必要
		 * @returns {Command}
		 */
		_setAttr: function(attr, attrNS, propertyName) {
			var command = new AttrCommand({
				shape: this,
				attr: attr,
				attrNS: attrNS,
				propertyName: propertyName
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			}
			return command;
		}

	// JSDocのみ。定義は各インスタンスのdefinePropertyで行っています
	/**
	 * 図形のタイプ
	 * <p>
	 * 各図形クラスのタイプを表す文字列です。ArtRectなら'rect'、ArtPathなら'path'などの値を持ちます。
	 * </p>
	 * <p>
	 * 読み取り専用属性です。
	 * </p>
	 *
	 * @memberOf ArtShape
	 * @instance
	 * @name type
	 * @type {string}
	 */
	});

	/**
	 * ストロークを持つ図形クラスのプロトタイプに、setter/getterを持つプロパティを追加
	 *
	 * @private
	 * @param {Object} proto
	 * @returns {Object} 渡されたオブジェクトにストロークを持つ図形のプロパティを追加して返す
	 */
	function mixinArtStrokeShape(proto) {
		// JSDocのみ
		/**
		 * ストロークを持つ図形についてのプロパティ定義
		 * <p>
		 * 以下のクラスがArtStrokeShapeのプロパティを持ちます(プロトタイプにmixinしています)
		 * </p>
		 * <ul>
		 * <li>{@link ArtPath}
		 * <li>{@link ArtRect}
		 * <li>{@link ArtEllipse}
		 * </ul>
		 *
		 * @mixin
		 * @name ArtStrokeShape
		 */

		var props = {
			/**
			 * ストロークの色
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 * <p>
			 * CSSカラー形式の文字列を指定します(#f00,rgb(255,0,0) など)
			 * </p>
			 *
			 * @name strokeColor
			 * @memberOf ArtStrokeShape
			 * @instance
			 * @type {string}
			 */
			strokeColor: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this._getStyle('stroke');
				},
				set: function(val) {
					// 再描画
					this._setStyle({
						'stroke': val
					}, 'strokeColor');
				}
			},

			/**
			 * ストロークの透明度(0～1)
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name strokeOpacity
			 * @memberOf ArtStrokeShape
			 * @instance
			 * @type {number}
			 */
			strokeOpacity: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this._getStyle('strokeOpacity');
				},
				set: function(val) {
					// 再描画
					this._setStyle({
						'stroke-opacity': val
					}, 'strokeOpacity');
				}
			},

			/**
			 * ストロークの幅
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name strokeWidth
			 * @memberOf ArtStrokeShape
			 * @instance
			 * @type {Integer}
			 */
			strokeWidth: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this._getStyle('strokeWidth');
				},
				set: function(val) {
					// 再描画
					this._setStyle({
						'stroke-width': val
					}, 'strokeWidth');
				}
			}
		};
		Object.defineProperties(proto, props);
		return proto;
	}

	/**
	 * 塗りつぶしを持つ図形クラスのプロトタイプに、setter/getterを持つプロパティを追加
	 *
	 * @private
	 * @param {Object} proto
	 * @returns {Object} 渡されたオブジェクトに塗りつぶし図形のプロパティを追加して返す
	 */
	function mixinArtFillShape(proto) {
		/**
		 * 塗りつぶしを持つ図形についてのプロパティ定義
		 * <p>
		 * 以下のクラスがArtFillShapeのプロパティを持ちます(プロトタイプにmixinしています)
		 * </p>
		 * <ul>
		 * <li>{@link ArtRect}
		 * <li>{@link ArtEllipse}
		 * </ul>
		 *
		 * @mixin
		 * @name ArtFillShape
		 */
		var props = {
			/**
			 * 図形の塗りつぶしの色
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます。
			 * </p>
			 * <p>
			 * CSSカラー形式の文字列を指定します(#f00,rgb(255,0,0) など)
			 * </p>
			 *
			 * @name fillColor
			 * @memberOf ArtFillShape
			 * @instance
			 * @type {string}
			 */
			fillColor: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this._getStyle('fill');
				},
				set: function(val) {
					// 再描画
					this._setStyle({
						'fill': val
					}, 'fillColor');
				}
			},
			/**
			 * 図形の塗りつぶしの透明度(0～1)
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name fillOpacity
			 * @memberOf ArtFillShape
			 * @instance
			 * @type {number}
			 */
			fillOpacity: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this._getStyle('fillOpacity');
				},
				set: function(val) {
					var opacity = parseFloat(val);
					this._fillOpacity = opacity;
					// 再描画
					this._setStyle({
						'fill-opacity': opacity
					}, 'fillOpacity');
				}
			}
		};
		Object.defineProperties(proto, props);
		return proto;
	}

	/**
	 * テキスト持つ図形クラスのプロトタイプに、setter/getterを持つプロパティを追加
	 *
	 * @private
	 * @param {Object} proto
	 * @returns {Object} 渡されたオブジェクトにテキスト図形のプロパティを追加して返す
	 */
	function mixinArtTextShape(proto) {
		/**
		 * テキストを持つ図形についてのプロパティ定義
		 * <p>
		 * 以下のクラスがArtTextShapeのプロパティを持ちます(プロトタイプにmixinしています)
		 * </p>
		 * <ul>
		 * <li>{@link ArtText}
		 * </ul>
		 *
		 * @mixin
		 * @name ArtTextShape
		 */
		var props = {
			/**
			 * テキストの色
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 * <p>
			 * CSSカラー形式の文字列を指定します(#f00,rgb(255,0,0) など)
			 * </p>
			 *
			 * @name textColor
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {string}
			 */
			textColor: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this.getElement().getAttribute('fill');
				},
				set: function(val) {
					// 一緒だったら何もしない
					if (val === this.textColor) {
						return;
					}
					this._setAttr({
						fill: val
					}, null, 'textColor');
				}
			},

			/**
			 * テキストの透明度(0～1)
			 * <p>
			 * このプロパティにはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name textOpacity
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {number}
			 */
			textOpacity: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this.getElement().getAttribute('opacity');
				},
				set: function(val) {
					// 一緒だったら何もしない
					if (val === this.textOpacity) {
						return;
					}
					this._setAttr({
						opacity: val
					}, null, 'textOpacity');
				}
			},

			/**
			 * テキストの文字列
			 * <p>
			 * 図形が表示する文字列を設定します。
			 * </p>
			 * <p>
			 * このプロパティはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name textContent
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {string}
			 */
			textContent: {
				configurable: false,
				enumerable: true,
				get: function() {
					return $(this.getElement()).text();
				},
				set: function(val) {
					// 一緒だったら何もしない
					if (val === this.textContent) {
						return;
					}
					this._setTextContent(val, 'textContent');
				}
			},


			/**
			 * フォントファミリー
			 * <p>
			 * 図形が表示する文字のフォントを設定します。
			 * </p>
			 * <p>
			 * このプロパティはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name fontFamily
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {string}
			 */
			fontFamily: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this.getElement().getAttribute('font-family');
				},
				set: function(val) {
					// 一緒だったら何もしない
					if (val === this.fontFamily) {
						return;
					}
					this._setAttr({
						'font-family': val
					}, null, 'fontFamily');
				}
			},

			/**
			 * フォントサイズ
			 * <p>
			 * 図形が表示する文字のフォントサイズを設定します。
			 * </p>
			 * <p>
			 * このプロパティはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name fontSize
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {number}
			 */
			fontSize: {
				configurable: false,
				enumerable: true,
				get: function() {
					return this.getElement().getAttribute('font-size');
				},
				set: function(val) {
					// 一緒だったら何もしない
					if (val === this.fontSize) {
						return;
					}
					this._setAttr({
						'font-size': val
					}, null, 'fontSize');
				}
			},

			/**
			 * フォントススタイル
			 * <p>
			 * 図形が表示する文字についてのスタイルオブジェクトで、 'text-decoration', 'font-weight', 'font-style'をプロパティに持ちます。
			 * </p>
			 * <p>
			 * このプロパティはsetterが設定されており、値を変更すると図形に反映されます
			 * </p>
			 *
			 * @name fontStyle
			 * @memberOf ArtTextShape
			 * @instance
			 * @type {Object}
			 */
			fontStyle: {
				configurable: false,
				enumerable: true,
				get: function() {
					// 文字の装飾に関する設定のみ
					return {
						'text-decoration': this._getStyle('text-decoration'),
						'font-weight': this._getStyle('font-weight'),
						'font-style': this._getStyle('font-style')
					};
				},
				set: function(val) {
					// 指定無しなら何もしない
					if (!val) {
						return;
					}
					// 今の値と同じなら何もしない
					var fontStyle = this.fontStyle;
					var existDiff = false;
					for ( var p in fontStyle) {
						if (val[p] !== fontStyle[p]) {
							existDiff = true;
							break;
						}
					}
					if (!existDiff) {
						return;
					}
					// 文字の装飾に関する設定のみ
					// (font-familyとfont-sizeは属性で設定しています)
					this._setStyle({
						'text-decoration': val['text-decoration'] || '',
						'font-weight': val['font-weight'] || '',
						'font-style': val['font-style'] || ''
					}, 'fontStyle');
				}
			}
		};
		Object.defineProperties(proto, props);
		return proto;
	}

	/**
	 * パスクラス
	 * <p>
	 * 線(path)を表現する図形クラス
	 * </p>
	 *
	 * @class
	 * @name ArtPath
	 * @extends ArtShape
	 * @mixes ArtStrokeShape
	 * @param element {DOM} パス要素(path)
	 * @param {Logic|Any} commandManagerWrapper コマンド生成時にappendCommandを行うロジックやクラス
	 */
	function ArtPath(element, commandManagerWrapper) {
		// typeの設定
		setShapeInstanceType(this, 'path');
		this._init(element, commandManagerWrapper);
	}
	ArtPath.prototype = Object.create(ArtShape.prototype);
	ArtPath.constructor = ArtPath;
	$.extend(mixinArtStrokeShape(ArtPath.prototype), {
		/* override */
		moveTo: function(position) {
			var element = this.getElement();
			var d = element.getAttribute('d');
			var matched = d.match(this._pathMRegexp);
			if (matched) {
				var startStr = matched[0];
				var tmpAry = startStr.split(' ');
				tmpAry[1] = position.x;
				tmpAry[2] = position.y;
				d = tmpAry.join(' ') + d.slice(startStr.length);
			}
			var command = new AttrCommand({
				shape: this,
				attr: {
					d: d
				}
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			} else {
				command.execute();
			}
			return command;
		},

		/* override */
		moveBy: function(position) {
			var element = this.getElement();
			var d = element.getAttribute('d');
			var matched = d.match(this._pathMRegexp);
			if (matched) {
				var startStr = matched[0];
				var tmpAry = startStr.split(' ');
				var x = parseInt(tmpAry[1]) + position.x;
				var y = parseInt(tmpAry[2]) + position.y;
				this.moveTo({
					x: x,
					y: y
				});
			}
		},

		/* override */
		serialize: function() {
			var element = this.getElement();
			var styleDeclaration = getStyleDeclaration(element);
			var data = getDataAttr(element);
			var attr = {};
			// 復元に必要な属性を取得
			attr.d = element.getAttribute('d');
			return {
				type: this.type,
				attr: attr,
				style: styleDeclaration,
				data: data
			};
		},

		/**
		 * path要素のd属性の先頭座標(Mで始まる座標指定)を取得する正規表現
		 *
		 * @memberOf ArtPath
		 * @private
		 * @type {RegExp}
		 */
		_pathMRegexp: /^M -?\d+(\.\d+)? -?\d+(\.\d+)?/
	});

	/**
	 * 矩形(rect)クラス
	 * <p>
	 * 矩形を表す図形クラス
	 * </p>
	 *
	 * @class
	 * @name ArtRect
	 * @extends ArtShape
	 * @mixes ArtStrokeShape
	 * @mixes ArtFillShape
	 * @param {DOM} element 矩形要素(rect)
	 * @param {Logic|Any} commandManagerWrapper コマンド生成時にappendCommandを行うロジックやクラス
	 */
	function ArtRect(element, commandManagerWrapper) {
		// typeの設定
		setShapeInstanceType(this, 'rect');
		this._init(element, commandManagerWrapper);
	}
	ArtRect.prototype = Object.create(ArtShape.prototype);
	ArtRect.constructor = ArtRect;
	$.extend(mixinArtFillShape(mixinArtStrokeShape(ArtRect.prototype)), {
		/* override */
		moveTo: function(position) {
			var command = new AttrCommand({
				shape: this,
				attr: position
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			} else {
				command.execute();
			}
			return command;
		},

		/* override */
		moveBy: function(position) {
			var element = this.getElement();
			var x = parseInt(element.getAttribute('x')) + position.x;
			var y = parseInt(element.getAttribute('y')) + position.y;
			return this.moveTo({
				x: x,
				y: y
			});
		},

		/* override */
		serialize: function() {
			var element = this.getElement();
			var styleDeclaration = getStyleDeclaration(element);
			var data = getDataAttr(element);
			var attr = {
				x: element.getAttribute('x'),
				y: element.getAttribute('y'),
				width: element.getAttribute('width'),
				height: element.getAttribute('height')
			};
			return {
				type: this.type,
				attr: attr,
				style: styleDeclaration,
				data: data
			};
		}
	});

	/**
	 * 楕円(ellipse)クラス
	 * <p>
	 * 楕円を表現する図形クラス
	 * </p>
	 *
	 * @class
	 * @name ArtEllipse
	 * @extends ArtShape
	 * @mixes ArtStrokeShape
	 * @mixes ArtFillShape
	 * @param element 楕円要素(ellipse)
	 * @param {Logic|Any} commandManagerWrapper コマンド生成時にappendCommandを行うロジックやクラス
	 */
	function ArtEllipse(element, commandManagerWrapper) {
		// typeの設定
		setShapeInstanceType(this, 'ellipse');
		this._init(element, commandManagerWrapper);
	}
	ArtEllipse.prototype = Object.create(ArtShape.prototype);
	ArtEllipse.constructor = ArtEllipse;
	$.extend(mixinArtFillShape(mixinArtStrokeShape(ArtEllipse.prototype)), {
		/* override */
		moveTo: function(position) {
			var command = new AttrCommand({
				shape: this,
				attr: {
					cx: position.x,
					cy: position.y
				}
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			} else {
				command.execute();
			}
			return command;
		},

		/* override */
		moveBy: function(position) {
			var element = this.getElement();
			var cx = parseInt(element.getAttribute('cx')) + position.x;
			var cy = parseInt(element.getAttribute('cy')) + position.y;
			return this.moveTo({
				x: cx,
				y: cy
			});
		},

		/* override */
		serialize: function() {
			var element = this.getElement();
			var styleDeclaration = getStyleDeclaration(element);
			var data = getDataAttr(element);
			var attr = {
				cx: element.getAttribute('cx'),
				cy: element.getAttribute('cy'),
				rx: element.getAttribute('rx'),
				ry: element.getAttribute('ry')
			};
			return {
				type: this.type,
				attr: attr,
				style: styleDeclaration,
				data: data
			};
		}
	});

	/**
	 * 画像(image)クラス
	 * <p>
	 * 任意の画像を表現する図形クラス
	 * </p>
	 *
	 * @class
	 * @name ArtImage
	 * @extends ArtShape
	 * @param element 画像要素(image)
	 * @param {Logic|Any} commandManagerWrapper コマンド生成時にappendCommandを行うロジックやクラス
	 */
	function ArtImage(element, commandManagerWrapper) {
		// typeの設定
		setShapeInstanceType(this, 'image');
		this._init(element, commandManagerWrapper);
	}
	ArtImage.prototype = Object.create(ArtShape.prototype);
	ArtImage.constructor = ArtImage;
	$.extend(ArtImage.prototype, {
		/* override */
		moveTo: function(position) {
			var command = new AttrCommand({
				shape: this,
				attr: {
					x: position.x,
					y: position.y
				}
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			} else {
				command.execute();
			}
			return command;
		},

		/* override */
		moveBy: function(position) {
			var element = this.getElement();
			var x = parseInt(element.getAttribute('x')) + position.x;
			var y = parseInt(element.getAttribute('y')) + position.y;
			return this.moveTo({
				x: x,
				y: y
			});
		},

		/* override */
		serialize: function() {
			var element = this.getElement();
			var styleDeclaration = getStyleDeclaration(element);
			var data = getDataAttr(element);
			// 画像パスは名前空間属性
			var attrNS = [{
				ns: XLINKNS,
				name: 'href',
				value: element.getAttributeNS(XLINKNS, 'href')
			}];
			var attr = {
				x: element.getAttribute('x'),
				y: element.getAttribute('y'),
				width: element.getAttribute('width'),
				height: element.getAttribute('height')
			};
			return {
				type: this.type,
				style: styleDeclaration,
				attr: attr,
				attrNS: attrNS,
				data: data
			};
		}
	});

	/**
	 * テキスト(text)クラス
	 * <p>
	 * 文字列を表現する図形クラス
	 * </p>
	 *
	 * @class
	 * @name ArtText
	 * @extends ArtShape
	 * @param element text要素
	 * @param {Logic|Any} commandManagerWrapper コマンド生成時にappendCommandを行うロジックやクラス
	 */
	function ArtText(element, commandManagerWrapper) {
		// typeの設定
		setShapeInstanceType(this, 'text');
		// data属性にtextの中身が設定されていればそれを適用する(deserialize時用)
		var $element = $(element);
		var text = $element.data('text-content');
		if (text) {
			$element.text(text);
		}
		this._init(element, commandManagerWrapper);
	}
	ArtText.prototype = Object.create(ArtShape.prototype);
	ArtText.constructor = ArtText;
	$.extend(mixinArtTextShape(ArtText.prototype), {
		/* override */
		moveTo: function(position) {
			var command = new AttrCommand({
				shape: this,
				attr: {
					x: position.x,
					y: position.y
				}
			});
			if (this.commandManagerWrapper) {
				this.commandManagerWrapper.appendCommand(command);
			} else {
				command.execute();
			}
			return command;
		},

		/* override */
		moveBy: function(position) {
			var element = this.getElement();
			var x = parseInt(element.getAttribute('x')) + position.x;
			var y = parseInt(element.getAttribute('y')) + position.y;
			return this.moveTo({
				x: x,
				y: y
			});
		},

		/* override */
		serialize: function() {
			var element = this.getElement();
			var styleDeclaration = getStyleDeclaration(element);
			// textの内容をdata属性に保存
			var $element = $(element);
			$element.data('text-content', $element.text());
			var data = getDataAttr(element);
			var attr = {
				x: element.getAttribute('x'),
				y: element.getAttribute('y'),
				fill: element.getAttribute('fill'),
				opacity: element.getAttribute('opacity'),
				'font-size': element.getAttribute('font-size'),
				'font-family': element.getAttribute('font-family')
			};
			return {
				type: this.type,
				attr: attr,
				style: styleDeclaration,
				data: data
			};
		},

		/**
		 * テキストを設定
		 * <p>
		 * 表示する文字列を設定します
		 * </p>
		 *
		 * @memberOf ArtText
		 * @private
		 * @instance
		 * @param {string} val
		 * @param {string} prop テキストの設定を行うShapeが持つプロパティの名前
		 */
		_setTextContent: function(val, prop) {
			var shape = this;
			var element = this.getElement();
			var EVENT_EDIT_SHAPE = h5.ui.components.artboard.consts.EVENT_EDIT_SHAPE;
			var command = new CustomCommand({
				execute: function() {
					this._preVal = $(element).text();
					$(element).text(val);
					return {
						type: EVENT_EDIT_SHAPE,
						target: shape,
						prop: prop,
						oldValue: this._preVal,
						newValue: val
					};
				},
				undo: function() {
					$(element).text(this._preVal);
					return {
						type: EVENT_EDIT_SHAPE,
						prop: prop,
						target: shape,
						oldValue: val,
						newValue: this._preVal
					};
				},
				_preVal: ''
			});
			this.commandManagerWrapper.appendCommand(command);
		}
	});

	//------------------------------------------------------------
	// expose
	//------------------------------------------------------------
	h5.u.obj.expose('h5.ui.components.artboard.ArtShapeConstructor', {
		ArtShape: ArtShape,
		ArtPath: ArtPath,
		ArtRect: ArtRect,
		ArtEllipse: ArtEllipse,
		ArtText: ArtText,
		ArtImage: ArtImage
	});
})(jQuery);
(function() {
	//------------------------------------------------------------
	// Const
	//------------------------------------------------------------
	/**
	 * italic体で描画した時に斜体になるかどうかの判定結果マップ
	 */
	var italicDrawableMap = {};

	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	/**
	 * SVGの名前空間
	 */
	var XLINKNS = h5.ui.components.artboard.consts.XLINKNS;

	//------------------------------------------------------------
	// Functions
	//------------------------------------------------------------
	/**
	 * 指定されたフォントでcanvasにitalic指定で描画した時に、斜体になるか
	 * <p>
	 * Firefoxでは斜体フォントが無いとitalic指定しても描画できないので、結果はフォントによる
	 * </p>
	 * <p>
	 * それ以外のブラウザでは斜体フォントが無くてもシミュレートして描画するので、結果は常にtrue
	 * </p>
	 *
	 * @param {String} fontFamily フォント名
	 * @returns {Boolean}
	 */
	function canDrawItalicText(fontFamily) {
		if (italicDrawableMap.hasOwnProperty(fontFamily)) {
			return italicDrawableMap[fontFamily];
		}
		// italicを指定する場合とそうでない場合でcanvasに実際に描画してみて、差異があるかどうかで判定
		var normalCanvas = document.createElement('canvas');
		var italicCanvas = document.createElement('canvas');
		var size = {
			width: 10,
			height: 10
		};
		$(normalCanvas).attr(size);
		$(italicCanvas).attr(size);
		var normalCtx = normalCanvas.getContext('2d');
		var italicCtx = italicCanvas.getContext('2d');
		var font = '12px ' + fontFamily;
		normalCtx.font = font;
		italicCtx.font = 'italic ' + font;
		normalCtx.fillText('|', 5, 10);
		italicCtx.fillText('|', 5, 10);
		var normalPixelArray = normalCtx.getImageData(0, 0, 10, 10).data;
		var italicPixelArray = italicCtx.getImageData(0, 0, 10, 10).data;
		var length = normalPixelArray.length;
		for (var i = 0; i < length; i++) {
			if (normalPixelArray[i] !== italicPixelArray[i]) {
				italicDrawableMap[fontFamily] = true;
				return true;
			}
		}
		italicDrawableMap[fontFamily] = false;
		return false;
	}

	//------------------------------------------------------------
	// Logic
	//------------------------------------------------------------
	/**
	 * canvasの画像変換を行うロジック
	 *
	 * @class
	 * @name h5.ui.components.artboard.logic.CanvasConvertLogic
	 */
	var canvasConvertLogic = {
		__name: 'h5.ui.components.artboard.logic.CanvasConvertLogic',

		/**
		 * svg要素の中身をcanvasに描画します。
		 * <p>
		 * このメソッドはプロミスを返します。画像(image要素)が使用されている場合は非同期になる場合があります。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.CanvasConvertLogic
		 * @instance
		 * @param {SVG} svgElement svg要素
		 * @param {Canvas} canvas canvas要素
		 * @param {Object} [processParameter.simulateItalic = false]
		 *            italic体が描画できるかどうかチェックして描画できない場合に変形してシミュレートするかどうか
		 */
		drawSVGToCanvas: function(svgElement, canvas, processParameter) {
			var viewBox = svgElement.getAttribute('viewBox');
			var viewBoxValues = viewBox.split(' ');
			var viewBoxWidth = parseInt(viewBoxValues[2]);
			var viewBoxHeight = parseInt(viewBoxValues[3]);
			var ctx = canvas.getContext('2d');
			var simulateItalic = processParameter || processParameter.simulateItalic;
			// h5.async.loopを使って非同期処理がある場合に待機してから次のループを実行するようにしている
			var elements = $(svgElement).find('>g').children().toArray();
			var promise = h5.async.loop(elements, function(index, element) {
				switch (element.tagName.toLowerCase()) {
				case 'path':
					var pathData = element.getAttribute('d');
					var stroke = element.getAttribute('stroke');
					var style = element.style;
					// strokeの設定
					ctx.save();
					ctx.strokeStyle = style.stroke;
					ctx.lineWidth = parseFloat(style.strokeWidth);
					ctx.lineJoin = style.strokeLinejoin;
					ctx.lineCap = style.strokeLinecap;
					ctx.globalAlpha = style.strokeOpacity;

					// 描画
					ctx.beginPath();
					// 'M x1 y1 l x2 y2 x3 y3 ...' という記述であることを前提にしている
					// IEの場合、d属性の値を取得すると、'M x1 y1 l x2 y2 l x3 y3 l...'となっているため
					// 各ブラウザ共通になるようにMとlを最初に取り除く
					var pathDataArray = pathData.replace(/M |l /g, '').split(' ');
					var firstX = parseFloat(pathDataArray[0]);
					var firstY = parseFloat(pathDataArray[1]);
					ctx.moveTo(firstX, firstY);
					var preX = firstX;
					var preY = firstY;
					// x,yのデータを同時に取り出すので２つずつカウント
					for (var index = 2, l = pathDataArray.length; index < l; index += 2) {
						var x = preX + parseInt(pathDataArray[index]);
						var y = preY + parseInt(pathDataArray[index + 1]);
						ctx.lineTo(x, y);
						preX = x;
						preY = y;
					}
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
					break;
				case 'rect':
					var x = parseFloat(element.getAttribute('x'));
					var y = parseFloat(element.getAttribute('y'));
					var w = parseFloat(element.getAttribute('width'));
					var h = parseFloat(element.getAttribute('height'));
					var style = element.style;

					// fillの設定
					var fill = style.fill;
					var isFill = fill && fill !== 'none';
					if (isFill) {
						ctx.save();
						ctx.fillStyle = style.fill;
						ctx.globalAlpha = style.fillOpacity;
						var fillMargin = parseFloat(style.strokeWidth) / 2;
						// fillRectで描画
						ctx.fillRect(x, y, w + fillMargin / 8 - 1, h + fillMargin / 8 - 1);
						ctx.restore();
					}

					// strokeの設定
					ctx.save();
					ctx.strokeStyle = style.stroke;
					ctx.lineWidth = parseFloat(style.strokeWidth);
					ctx.lineJoin = style.strokeLinejoin;
					ctx.globalAlpha = style.strokeOpacity;
					// strokeRectで描画
					ctx.strokeRect(x, y, w, h);
					ctx.restore();
					break;
				case 'ellipse':
					var cx = parseFloat(element.getAttribute('cx'));
					var cy = parseFloat(element.getAttribute('cy'));
					var rx = parseFloat(element.getAttribute('rx'));
					var ry = parseFloat(element.getAttribute('ry'));
					var style = element.style;

					var ellipseScaleX = rx > ry ? rx / ry : 1;
					var ellipseScaleY = rx > ry ? 1 : ry / rx;
					ctx.save();
					ctx.translate(cx, cy);
					ctx.scale(ellipseScaleX, ellipseScaleY);

					// fillの設定
					var fill = style.fill;
					var isFill = fill && fill !== 'none';
					ctx.beginPath();
					if (isFill) {
						ctx.fillStyle = fill;
						ctx.globalAlpha = style.fillOpacity;
						ctx.arc(0, 0, rx > ry ? ry : rx, 0, Math.PI * 2, true);
						ctx.fill();
					}

					// strokeの設定
					ctx.strokeStyle = style.stroke;
					ctx.lineWidth = parseFloat(style.strokeWidth);
					ctx.globalAlpha = style.strokeOpacity;

					ctx.arc(0, 0, rx > ry ? ry : rx, 0, Math.PI * 2, true);
					ctx.scale(1 / ellipseScaleX, 1 / ellipseScaleY);
					ctx.translate(-cx, -cy);
					ctx.globalAlpha = this._strokeOpacity;
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
					break;
				case 'text':
					var $element = $(element);
					var x = parseFloat(element.getAttribute('x'));
					var y = parseFloat(element.getAttribute('y'));
					var fill = element.getAttribute('fill');
					var opacity = element.getAttribute('opacity');
					var fontFamily = element.getAttribute('font-family');
					var fontSize = parseFloat(element.getAttribute('font-size'));
					var fontWeight = $element.css('font-weight');
					var fontStyle = $element.css('font-style');
					var textContent = $element.text();

					ctx.save();
					ctx.font = h5.u.str.format('{0} {1} {2}px {3}', fontStyle, fontWeight,
							fontSize, fontFamily);
					ctx.fillStyle = fill;
					ctx.globalAlpha = opacity;
					// italic体のtransformによるシミュレートが必要かどうか
					var shouldTransform = simulateItalic && fontStyle.indexOf('italic') !== -1
							&& !canDrawItalicText(fontFamily);
					if (shouldTransform) {
						// シミュレートが必要な場合は変形
						ctx.transform(1, 0, -1 / 3, 1, y / 3, 0);
						ctx.font = ctx.font.replace('italic', '');
						ctx.fillText(textContent, x, y);
						// 変形を元に戻す
						ctx.transform(1, 0, 3, 1, -y / 3, 0);
					} else {
						ctx.fillText(textContent, x, y);
					}

					// 下線、鎖線はstrokeを使って描画
					var fontStyle = $element.css('text-decoration');
					var lineThrough = fontStyle.indexOf('line-through') !== -1;
					var underline = fontStyle.indexOf('underline') !== -1;
					if (underline || lineThrough) {
						// サイズを取得
						var measure = ctx.measureText(textContent);
						var width = measure.width;
						var height = fontSize;
						ctx.strokeStyle = fill;
						ctx.lineWidth = Math.floor(parseInt(fontSize) * 0.05 + 1);
						// 下線
						if (underline) {
							ctx.beginPath();
							ctx.moveTo(x, y + height / 10);
							ctx.lineTo(x + width, y + height / 10);
							ctx.stroke();
						}
						// 鎖線
						if (lineThrough) {
							ctx.beginPath();
							ctx.moveTo(x, y - height * 0.3);
							ctx.lineTo(x + width, y - height * 0.3);
							ctx.stroke();
						}
					}
					ctx.restore();
					break;
				case 'image':
					var x = parseFloat(element.getAttribute('x'));
					var y = parseFloat(element.getAttribute('y'));
					var w = parseFloat(element.getAttribute('width'));
					var h = parseFloat(element.getAttribute('height'));
					var src = element.getAttributeNS(XLINKNS, 'href');
					var tmpImg = document.createElement('img');
					var imgDfd = h5.async.deferred();
					tmpImg.onload = (function(_imgDfd, _x, _y, _w, _h) {
						return function() {
							ctx.drawImage(this, _x, _y, _w, _h);
							_imgDfd.resolve();
						};
					})(imgDfd, x, y, w, h);
					tmpImg.src = src;
					// 画像の場合は非同期になる
					return imgDfd.promise();
				}
			});
			return promise;
		},
		/**
		 * canvasに描画されている図形を画像データにして返します
		 * <p>
		 * このメソッドはプロミスを返し、非同期で画像のデータURLを返します。画像が使用されている場合は非同期になる場合があります。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.CanvasConvertLogic
		 * @instance
		 * @param {String} returnType imgage/png, image/jpeg, image/svg+xml のいずれか
		 * @param {Object} processParameter 第1引数にimage/jpegを指定した場合、第2引数は0.0～1.0の範囲で品質レベルを指定
		 * @returns {Promise} doneハンドラに'data:'で始まる画像データURLを渡します
		 */
		toDataURL: function(canvas, returnType, encoderOptions) {
			return canvas.toDataURL(returnType, encoderOptions);
		}
	};
	h5.core.expose(canvasConvertLogic);
})();

(function() {
	//------------------------------------------------------------
	// Const
	//------------------------------------------------------------

	/**
	 * 描画した図形のIDを保持するデータ属性名
	 */
	var DATA_SHAPE_ID = 'shapeId';

	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	var XLINKNS = h5.ui.components.artboard.consts.XLINKNS;
	var createSvgDrawingElement = h5.ui.components.artboard.createSvgDrawingElement;
	var CustomCommand = h5.ui.components.artboard.CustomCommand;
	var AppendCommand = h5.ui.components.artboard.AppendCommand;
	var RemoveCommand = h5.ui.components.artboard.RemoveCommand;
	var DATA_IMAGE_SOURCE_ID = h5.ui.components.artboard.consts.DATA_IMAGE_SOURCE_ID;
	var DATA_IMAGE_SOURCE_SRC = h5.ui.components.artboard.consts.DATA_IMAGE_SOURCE_SRC;
	var DATA_IMAGE_SOURCE_FILLMODE = h5.ui.components.artboard.consts.DATA_IMAGE_SOURCE_FILLMODE;
	var DATA_IMAGE_SOURCE_OFFSET_X = h5.ui.components.artboard.consts.DATA_IMAGE_SOURCE_OFFSET_X;
	var DATA_IMAGE_SOURCE_OFFSET_Y = h5.ui.components.artboard.consts.DATA_IMAGE_SOURCE_OFFSET_Y;

	// ArtShape実装クラスコンストラクタ
	var constructor = h5.ui.components.artboard.ArtShapeConstructor;
	var ArtShape = constructor.ArtShape;
	var ArtPath = constructor.ArtPath;
	var ArtRect = constructor.ArtRect;
	var ArtEllipse = constructor.ArtEllipse;
	var ArtText = constructor.ArtText;
	var ArtImage = constructor.ArtImage;

	//------------------------------------------------------------
	// Functions
	//------------------------------------------------------------

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	/**
	 * セーブデータ
	 *
	 * @class
	 * @name DrawingSaveData
	 * @param {ArtShape[]} shapes 保存するShapeの配列
	 * @param {Object} backgroundData 背景情報
	 */
	function DrawingSaveData(shapes, backgroundData) {
		var sirializableShapes = [];
		for (var i = 0, l = shapes.length; i < l; i++) {
			sirializableShapes.push(shapes[i].serialize());
		}
		/**
		 * セーブされたデータ
		 * <p>
		 * 以下のようなデータを持つオブジェクトです
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	version: セーブデータのバージョン,
		 * 	shapes: [shapeデータの配列]
		 * }
		 * </code></pre>
		 *
		 * shapeデータは、以下のようなデータです
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	type: ['path' | 'rect' | 'ellipse' | 'image' | 'text'],
		 * 	data: (typeごとに異なります)
		 * }
		 * </code></pre>
		 *
		 * </p>
		 *
		 * @memberOf DrawingSaveData
		 * @name saveData
		 * @type {Object}
		 */
		this.saveData = {
			version: this.version,
			shapes: sirializableShapes,
			background: $.extend({}, backgroundData)
		};
	}
	DrawingSaveData.prototype = Object.create({
		/**
		 * セーブデータ形式のバージョン
		 *
		 * @memberOf DrawingSaveData
		 * @type {string}
		 */
		version: '1'
	});

	//------------------------------------------------------------
	// Logic
	//------------------------------------------------------------
	/**
	 * 図形の描画を行うロジック
	 *
	 * @class
	 * @name h5.ui.components.artboard.logic.DrawingLogic
	 */
	var drawingLogic = {
		/**
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 */
		__name: 'h5.ui.components.artboard.logic.DrawingLogic',

		/**
		 * 画像IDと画像パスのマップ
		 * <p>
		 * 画像の描画時(drawImageやsetBackgroundImage)に画像パスの代わりに画像IDを渡すと、このマップに登録された画像パスを使用します。
		 * 画像IDを使って画像を指定する場合はこのオブジェクトに直接登録してください。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @type {Object}
		 */
		imageSourceMap: {},

		/**
		 * canvasの画像変換を行うロジック
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 */
		_canvasConvertLogic: h5.ui.components.artboard.logic.CanvasConvertLogic,

		/**
		 * 図形描画領域のレイヤー
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 */
		_shapeLayer: null,

		/**
		 * 背景画像レイヤー
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 */
		_backgroundLayer: null,

		/**
		 * コマンド管理ロジックインスタンス
		 * <p>
		 * [init]{@link h5.ui.components.artboard.logic.DrawingLogic#init}の第3引数で設定したアートボードコマンドマネージャを持ちます
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 * @type h5.ui.components.artboard.logic.ArtboardCommandLogic
		 */
		artboardCommandManager: null,

		/**
		 * このロジックで作成した図形(Shape)と図形IDのマップ
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 */
		_shapeMap: {},

		/**
		 * このロジックで作成した図形(Shape)のID管理用シーケンス
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 */
		_shapeIdSequence: h5.core.data.createSequence(),

		/**
		 * 初期化処理
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {DOM} drawingElement 図形描画領域レイヤ要素
		 * @param {DOM} backgroundElement 背景領域レイヤ要素
		 * @param {h5.ui.components.artboard.logic.ArtboardCommandLogic} artboardCommandManager
		 *            アートボードコマンドマネージャ
		 */
		init: function(drawingElement, backgroundElement, artboardCommandManager) {
			// svg要素とcanvas要素を取得
			this._shapeLayer = drawingElement;
			this._backgroundLayer = backgroundElement;
			this.artboardCommandManager = artboardCommandManager;
		},

		/**
		 * 直前の操作を取り消します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @returns {Any} アートボードコマンドマネージャのundo結果
		 */
		undo: function() {
			return this.artboardCommandManager.undo();
		},

		/**
		 * 直前に取り消した操作を再実行します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @returns {Any} アートボードコマンドマネージャのredo結果
		 */
		redo: function() {
			return this.artboardCommandManager.redo();
		},

		//---------------------------------------------------------------
		// 描画オブジェクトの操作
		//---------------------------------------------------------------
		/**
		 * 図形を追加
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param layer {DOM|jQuery} 追加先レイヤ
		 */
		append: function(shape) {
			// コマンドを作成して実行
			var command = new AppendCommand({
				layer: this._shapeLayer,
				shape: shape
			});
			this._registShape(shape);
			this.artboardCommandManager.appendCommand(command);
		},

		/**
		 * 図形を削除
		 *
		 * @memberOf ShapeLayer
		 * @instance
		 * @param {ArtShape} shape
		 */
		remove: function(shape) {
			var command = new RemoveCommand({
				layer: this._shapeLayer,
				shape: shape
			});
			this.artboardCommandManager.appendCommand(command);
		},

		//----------------------------
		// 各図形の描画メソッド
		//----------------------------
		/**
		 * パス(フリーハンド、直線、多角形)描画
		 * <p>
		 * {@link ArtPath}でパスを作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Object} data
		 *
		 * <pre>
		 * {
		 * 	// SVGのpath要素のd属性に基づきます
		 * 	d: 'M (x座標開始位置) (y座標開始位置) l[ (x座標軌跡) (y座標軌跡)]...'
		 * 	sty:e style指定オブジェクト
		 * }
		 * // 例：(100px,200px)の位置から(x,y)方向に(10px,20px)移動し、その後その場所から(-10px,-10px)移動するようなデータの場合
		 * {
		 * 	d: 'M 100 200 l 10 20 -10 -10'
		 * 	sty:e {stroke:'rgb(255,0,0)', strokeWidth:'5px'}
		 * }
		 * </pre>
		 *
		 * @returns {ArtPath}
		 */
		drawPath: function(data) {
			var attr = {
				d: data.pathData
			};
			var style = data.style;
			var elem = createSvgDrawingElement('path', {
				attr: attr,
				style: style
			});

			// Shapeの作成
			var shape = new ArtPath(elem, this.artboardCommandManager);
			// 図形の登録と追加
			this.append(shape);
			return shape;
		},

		/**
		 * 長方形描画
		 * <p>
		 * {@link ArtRect}で長方形図形を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Integer} x 左上のx座標
		 * @param {Integer} y 左上のy座標
		 * @param {Integer} width 正方形の幅
		 * @param {Integer} height 正方形の高さ
		 * @param {Object} style スタイル指定オブジェクト
		 * @returns {ArtRect}
		 */
		drawRect: function(x, y, width, height, style) {
			var attr = {
				x: x,
				y: y,
				width: width,
				height: height
			};
			var elem = createSvgDrawingElement('rect', {
				attr: attr,
				style: style
			});

			// Shapeの作成
			var shape = new ArtRect(elem, this.artboardCommandManager);
			// 図形の登録と追加
			this.append(shape);
			return shape;
		},

		/**
		 * 正方形描画
		 * <p>
		 * {@link ArtRect}で正方形図形を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Integer} x 左上のx座標
		 * @param {Integer} y 左上のy座標
		 * @param {Integer} width 正方形の幅(=正方形の高さ)
		 * @param {Object} style スタイル指定オブジェクト
		 * @returns {ArtRect}
		 */
		drawSquare: function(x, y, width, style) {
			// 幅と高さが同じである長方形(Rect)として描画する
			return this.drawRect(x, y, width, width, style);
		},

		/**
		 * 楕円描画
		 * <p>
		 * {@link ArtEllipse}で楕円を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Integer} cx 楕円の中心位置のx座標
		 * @param {Integer} cy 楕円の中心位置のy座標
		 * @param {Integer} rx 楕円の水平方向の半径
		 * @param {Integer} ry 楕円の垂直方向の半径
		 * @param {Object} style スタイル指定オブジェクト
		 * @returns {ArtEllipse}
		 */
		drawEllipse: function(cx, cy, rx, ry, style) {
			var attr = {
				cx: cx,
				cy: cy,
				rx: rx,
				ry: ry
			};
			var elem = createSvgDrawingElement('ellipse', {
				attr: attr,
				style: style
			});
			// Shapeの作成
			var shape = new ArtEllipse(elem, this.artboardCommandManager);
			// 図形の登録と追加
			this.append(shape);
			return shape;
		},

		/**
		 * 真円描画
		 * <p>
		 * {@link ArtEllipse}で新円を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Integer} cx 円の中心位置のx座標
		 * @param {Integer} cy 円の中心位置のy座標
		 * @param {Integer} r 円の半径
		 * @param {Object} style スタイル指定オブジェクト
		 * @returns {ArtEllipse}
		 */
		drawCircle: function(cx, cy, r, style) {
			// rx,ryが同じである楕円(Ellipse)として描画する
			return this.drawEllipse(cx, cy, r, r, style);
		},

		/**
		 * 画像の配置
		 * <p>
		 * {@link ArtImage}で画像図形を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Object} data
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	x: x座標,
		 * 	y: y座標,
		 * 	width: 幅,
		 * 	height: 高さ,
		 * 	id: 画像ID。idが指定された場合、imageSourceMapから描画する画像パスを探します
		 * 	// src: 画像パス。IDが指定されている場合はsrcの指定は無効です。
		 * }
		 * </code></pre>
		 *
		 * <p>
		 *            参照：[imageSourceMap]{@link h5.ui.components.artboard.logic.DrawingLogic#imageSourceMap}
		 *            </p>
		 * @returns {ArtImage}
		 */
		drawImage: function(data) {
			var attr = {
				x: data.x,
				y: data.y,
				height: data.height,
				width: data.width
			};
			var src = data.id ? this.imageSourceMap[data.id] : data.src;

			var attrNS = [{
				ns: XLINKNS,
				name: 'href',
				value: src
			}];

			var style = data.style;
			var elem = createSvgDrawingElement('image', {
				attr: attr,
				attrNS: attrNS,
				style: style
			});
			$(elem).data(DATA_IMAGE_SOURCE_ID, data.id);

			// Shapeの作成
			var shape = new ArtImage(elem, this.artboardCommandManager);
			// 図形の追加
			this.append(shape);
			return shape;
		},

		/**
		 * テキストの配置
		 * <p>
		 * {@link ArtText}で文字列図形を作成して描画します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Object} data
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 *  x: 左上のx座標,
		 *  y: 左上のy座標
		 *  text: 入力文字列,
		 * 	font: フォント,
		 * 	fontSize: フォントサイズ,
		 * 	fill: 色,
		 * 	fillOpacity: 透明度
		 * }
		 * </code></pre>
		 *
		 * @returns {ArtImage}
		 */
		drawText: function(data) {
			var attr = {
				x: data.x,
				y: data.y,
				fill: data.fill,
				opacity: data.opacity,
				'font-family': data.fontFamily,
				'font-size': data.fontSize
			};
			var elem = createSvgDrawingElement('text', {
				attr: attr
			});
			$(elem).text(data.text);

			if (data.style) {
				$(elem).css(data.style);
			}

			// Shapeの作成
			var shape = new ArtText(elem, this.artboardCommandManager);
			// 図形の追加
			this.append(shape);
			return shape;
		},

		/**
		 * ロジック管理下にある図形(Shape)を全て取得します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Boolean} exceptAlone trueの場合描画されている図形のみ
		 * @returns {ArtShape[]}
		 */
		getAllShapes: function(exceptAlone) {
			var shapes = [];
			var shapeMap = this._shapeMap;
			for ( var id in shapeMap) {
				var shape = shapeMap[id];
				if (exceptAlone && shape.isAlone()) {
					continue;
				}
				shapes.push(shape);
			}
			return shapes;
		},

		/**
		 * 図形のIDを返します。(ロジック管理下にある図形のみ)
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {ArtShape} shape
		 * @returns {String}
		 */
		getShapeID: function(shape) {
			var shapeMap = this._shapeMap;
			for ( var id in shapeMap) {
				if (shapeMap[id] === shape) {
					return id;
				}
			}
			return null;
		},

		/**
		 * 図形(Shape)をこのロジックの管理下に置きます
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @instance
		 * @param {ArtShape} shape
		 */
		_registShape: function(shape) {
			// Mapに登録
			var id = this._shapeIdSequence.next();
			$(shape.getElement()).data(DATA_SHAPE_ID, id);
			this._shapeMap[id] = shape;
		},

		//--------------------------------------------------------------
		// 背景画像
		//--------------------------------------------------------------
		/**
		 * 背景画像の設定
		 * <p>
		 * 画像ID([imageSourceMap]{@link h5.ui.components.artboard.logic.DrawingLogic#imageSourceMap}に登録された画像のID)
		 * またはファイルパスと、画像の配置モードを指定したオブジェクトを渡してください
		 * </p>
		 * <p>
		 * 画像の配置モード(fillMode)は以下のいずれかを文字列で指定します
		 * </p>
		 * <ul>
		 * <li>none : 画像のサイズを変更せずに左上を原点として描画
		 * <li>contain : アスペクト比を保持して、全体が見えるように描画（描画領域と画像のアスペクト比が異なる場合は隙間ができます）
		 * <li>containCenter : サイズをcontainで計算して、位置を中央配置にして描画
		 * <li>cover : アスペクト比を保持して、隙間が出ないように描画（描画領域と画像のアスペクト比が異なる場合は画像が描画領域をはみ出します）
		 * <li>stretch : アスペクト比を無視して、描画領域を埋めるように描画
		 * </ul>
		 * <p>
		 * offsetX, offsetYは、fillMode指定によって決定した位置を基準として、そこからの座標位置を指定します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Object} data
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	id: 画像ID。idが指定された場合、imageSourceMapから描画する画像パスを探します
		 * 	// src: 画像パス。IDが指定されている場合はsrcの指定は無効です。
		 * 	fillMode: 画像の配置モード('none'|'contain'|'containCenter'|'cover'|'stretch') 指定のない場合は'none'で描画します,
		 * 	offsetX: 背景画像位置のx座標のオフセット(デフォルト:0),
		 * 	offsetY: 背景画像位置のy座標のオフセット(デフォルト:0)
		 * }
		 * </code></pre>
		 */
		setBackgroundImage: function(data) {
			var id = data.id;
			var src = id ? this.imageSourceMap[id] : data.src;
			var fillMode = data.fillMode || 'none';
			var offsetX = data.offsetX ? data.offsetX : 0;
			var offsetY = data.offsetY ? data.offsetY : 0;
			// 現在の設定と同じかどうかチェック
			// 現在の背景画像がid指定ならid、src指定されているならsrcで比較し、fillModeが同じかどうかもチェックする
			// x,yも同じかどうかチェックする
			var current = this._getCurrentBackgroundData();
			if (current && (current.id ? (current.id === id) : (current.src === src))
					&& current.fillMode === fillMode && current.offsetX === offsetX
					&& current.y === offsetY) {
				// 設定が全て現在の設定と同じなら何もしない
				return;
			}

			var $imgElement = $('<img>');
			var imgElement = $imgElement[0];
			$imgElement.attr('src', src);
			// 設定をと画像パスを要素に持たせておく
			if (id) {
				$imgElement.data(DATA_IMAGE_SOURCE_ID, id);
			}
			$imgElement.data(DATA_IMAGE_SOURCE_FILLMODE, fillMode);
			$imgElement.data(DATA_IMAGE_SOURCE_SRC, src);
			$imgElement.data(DATA_IMAGE_SOURCE_OFFSET_X, offsetX);
			$imgElement.data(DATA_IMAGE_SOURCE_OFFSET_Y, offsetY);

			var imgOnload = this.own(function() {
				$imgElement.css(this._getBackgroundImageStyle(imgElement, data));

				// コマンドの作成
				var layer = this._backgroundLayer;
				var afterElement = imgElement;
				var EVENT_EDIT_BACKGROUND = h5.ui.components.artboard.consts.EVENT_EDIT_BACKGROUND;
				var that = this;
				var command = new CustomCommand({
					execute: function() {
						var oldValue = that._getCurrentBackgroundData();
						this._preBgElement = $(layer).children()[0];
						$(layer).append(afterElement);
						$(this._preBgElement).remove();
						var newValue = that._getCurrentBackgroundData();
						// 必要なデータだけ取得
						delete oldValue.color;
						delete newValue.color;
						return {
							type: EVENT_EDIT_BACKGROUND,
							layer: layer,
							oldValue: oldValue,
							newValue: newValue
						};
					},
					undo: function() {
						var oldValue = that._getCurrentBackgroundData();
						$(layer).append(this._preBgElement);
						$(afterElement).remove();
						var newValue = that._getCurrentBackgroundData();
						// 必要なデータだけ取得
						oldValue = {
							color: oldValue.color
						};
						newValue = {
							color: newValue.color
						};
						return {
							type: EVENT_EDIT_BACKGROUND,
							layer: layer,
							oldValue: oldValue,
							newValue: newValue
						};
					},
					_preBgElement: null
				});
				this.artboardCommandManager.appendCommand(command);
			});

			// img要素のロードが終わってから背景適用を実行
			if (imgElement.complete) {
				imgOnload();
			} else {
				imgElement.onload = imgOnload;
			}
		},

		/**
		 * 背景色の設定
		 * <p>
		 * 背景色の設定をします。引数にはCSSカラー形式の文字列を指定してください。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {String} color 色
		 */
		setBackgroundColor: function(color) {
			// 現在の設定と同じかどうかチェック
			// 実際にダミー要素に背景色に設定してフォーマットされた色指定文字列と比較
			var formatColor = $('<div></div>').css('background-color', color).css(
					'background-color');
			if ($(this._backgroundLayer).css('background-color') === formatColor) {
				// 同じなら何もしない
				return;
			}
			var layer = this._backgroundLayer;
			var EVENT_EDIT_BACKGROUND = h5.ui.components.artboard.consts.EVENT_EDIT_BACKGROUND;
			var command = new CustomCommand({
				execute: function() {
					var $layer = $(layer);
					this._preColor = $layer.css('background-color');
					$layer.css('background-color', color);
					return {
						type: EVENT_EDIT_BACKGROUND,
						layer: layer,
						oldValue: this._preColor,
						newValue: color
					};
				},
				undo: function() {
					$(layer).css('background-color', this._preColor);
					return {
						type: EVENT_EDIT_BACKGROUND,
						layer: layer,
						oldValue: color,
						newValue: this._preColor
					};
				},
				_preColor: null
			});
			this.artboardCommandManager.appendCommand(command);
		},

		/**
		 * 背景画像のクリア
		 * <p>
		 * 背景画像を削除します
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 */
		clearBackgroundImage: function() {
			var bgElement = this._backgroundLayer.children[0];
			if (!bgElement) {
				// 背景画像が無ければ何もしない
				return;
			}
			var command = new CustomCommand({
				execute: function() {
					$(this._preBgElement).remove();
				},
				undo: function() {
					$(this._layer).append(this._preBgElement);
				},
				_layer: this._backgroundLayer,
				_preBgElement: bgElement
			});
			this.artboardCommandManager.appendCommand(command);
		},

		/**
		 * 現在設定されている背景情報を取得します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @param {Boolean} useSrc
		 * @param {Boolean} true指定の場合useSrc 画像IDではなくパス(srcの値)を取得します
		 * @instance
		 * @returns {Object}
		 *
		 * <pre>
		 * {
		 * 	id: id,
		 * 	src: src, (idがない場合または、useSrcがtrueの場合)
		 * 	fillMode: fillMode,
		 * 	color: 背景色
		 * }
		 * </pre>
		 */
		_getCurrentBackgroundData: function(useSrc) {
			var $layer = $(this._backgroundLayer);
			var $bgElement = $layer.children().eq(0);
			var ret = {};
			// 背景色
			var color = $layer.css('background-color');
			if (!color && !$bgElement.length) {
				// 設定されていない場合はnullを返す
				return null;
			}
			ret.color = color;
			if ($bgElement.length) {
				ret.fillMode = $bgElement.data(DATA_IMAGE_SOURCE_FILLMODE);
				var id = $bgElement.data(DATA_IMAGE_SOURCE_ID);
				if (!useSrc && id) {
					ret.id = id;
				} else {
					ret.src = $bgElement.data(DATA_IMAGE_SOURCE_SRC);
				}
				// オフセットを返す
				ret.offsetX = parseFloat($bgElement.data(DATA_IMAGE_SOURCE_OFFSET_X)) || 0;
				ret.offsetY = parseFloat($bgElement.data(DATA_IMAGE_SOURCE_OFFSET_Y)) || 0;
			}
			return ret;
		},

		/**
		 * 背景画像に適用するスタイルオブジェクトを計算して返します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @private
		 * @param imgElement {DOM} img要素。画像(src)はロード済みであること。
		 * @param data
		 * @param data.fillMode
		 * @param data.offsetX
		 * @param data.offsetY
		 * @returns {Object}
		 */
		_getBackgroundImageStyle: function(imgElement, data) {
			var fillMode = data.fillMode;
			var offsetX = data.offsetX ? Math.round(parseFloat(data.offsetX)) : 0;
			var offsetY = data.offsetY ? Math.round(parseFloat(data.offsetY)) : 0;
			var $layer = $(this._backgroundLayer);
			var layerW = $layer.width();
			var layerH = $layer.height();
			var imgStyle = {
				left: offsetX || 0,
				top: offsetY || 0
			};
			switch (fillMode) {
			case 'contain':
			case 'containCenter':
				// containまたはcontainCenter
				// アスペクト比を維持して画像がすべて含まれるように表示
				var aspectRatio = layerW / layerH;
				var imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
				if (aspectRatio < imgRatio) {
					imgStyle.width = layerW;
					imgStyle.height = layerW / imgRatio;
				} else {
					imgStyle.height = layerH;
					imgStyle.width = layerH * imgRatio;
				}
				if (fillMode === 'containCenter') {
					// 中央配置
					if (aspectRatio < imgRatio) {
						imgStyle.top += (layerH - imgStyle.height) / 2;
					} else {
						imgStyle.left += (layerW - imgStyle.width) / 2;
					}
				}
				break;
			case 'cover':
				// アスペクト比を維持して領域が画像で埋まるように表示
				var aspectRatio = layerW / layerH;
				var imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
				if (aspectRatio < imgRatio) {
					imgStyle.height = layerH;
					imgStyle.width = layerH * imgRatio;
				} else {
					imgStyle.width = layerW;
					imgStyle.height = layerW / imgRatio;
				}
				break;
			case 'stretch':
				// 描画領域にちょうど収まるようにする
				imgStyle.width = '100%';
				imgStyle.height = '100%';
				break;
			default:
				// 指定無しまたはnoneの場合は画像のサイズ、位置変更無し
			}
			return imgStyle;
		},

		//--------------------------------------------------------------
		// データ操作
		//--------------------------------------------------------------
		/**
		 * 描画されている図形からセーブデータを作成します
		 * <p>
		 * useSrcオプションがtrueの場合、背景画像について画像IDではなくパス(srcの値)で保存します。
		 * </p>
		 * <p>
		 * 画像IDで保存されたデータを復元する場合は、保存時と同一のimageSourceMapの登録が必要です。
		 * 別ページで保存データを利用する場合などで同一のimageSourceMapを使用しない場合は、useSrcにtrueを指定してパスで保存したデータを使用してください。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {Boolean} true指定の場合useSrc 画像IDではなくパス(srcの値)で保存します
		 * @returns {DrawingSaveData}
		 */
		save: function(useSrc) {
			// 描画されている図形要素を取得
			var shapes = this.getAllShapes(true);
			// 図形と背景のセーブデータを作って返す
			return new DrawingSaveData(shapes, this._getCurrentBackgroundData(useSrc));
		},

		/**
		 * 描画領域のサイズを変更します
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {number} width 変更後の幅(px)
		 * @param {number} height 変更後の高さ(px)
		 */
		setSize: function(width, height) {
			//svgのviewBox変更
			var svg = $(this._shapeLayer).parents('svg')[0];
			var viewBox = h5.u.str.format('0 0 {0} {1}', width, height);
			svg.setAttribute('viewBox', viewBox);

			// カンバスのサイズに依存する計算がある場合があるため再設定する
			// 背景画像の位置再計算
			var $imgElement = $(this._backgroundLayer).children();
			if (!$imgElement.length) {
				return;
			}
			var currentBgData = this._getCurrentBackgroundData();
			var imgStyle = this._getBackgroundImageStyle($imgElement[0], currentBgData);
			$imgElement.css(imgStyle);
		},

		/**
		 * セーブデータををロード
		 * <p>
		 * [save]{@link h5.ui.components.artboard.logic.DrawingLogic#save}で生成したセーブデータをロードして描画します
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {DrawingSaveData}
		 */
		load: function(drawingSaveData) {
			var saveData = drawingSaveData.saveData;
			// クリア
			$(this._shapeLayer).children().remove();
			this._shapeMap = {};

			// 背景の復元
			var background = saveData.background;
			if (background) {
				if (background.color) {
					this.setBackgroundColor(background.color);
				}
				if (background.id) {
					this.setBackgroundImage({
						id: background.id,
						fillMode: background.fillMode,
						offsetX: background.offsetX,
						offsetY: background.offsetY
					});
				} else if (background.src) {
					this.setBackgroundImage({
						src: background.src,
						fillMode: background.fillMode,
						offsetX: background.offsetX,
						offsetY: background.offsetY
					});
				}
			}

			// Shapeの復元
			var shapesData = saveData.shapes;
			for (var i = 0, l = shapesData.length; i < l; i++) {
				// 図形の登録と追加
				this.append(ArtShape.deserialize(shapesData[i], this.artboardCommandManager));
			}

			// image要素について、idから画像パスを復元する
			var $image = $(this._shapeLayer).find('image');
			var imageSourceMap = this.imageSourceMap;
			$image.each(function() {
				var $this = $(this);
				var id = $this.data(DATA_IMAGE_SOURCE_ID);
				if (id) {
					this.setAttributeNS(XLINKNS, 'href', imageSourceMap[id]);
				}
			});

			// コマンドマネージャのクリア
			this.artboardCommandManager.clearAll();
		},

		/**
		 * 描画されている図形を画像データにして返します
		 * <p>
		 * このメソッドはプロミスを返し、非同期で画像のデータURLを返します。画像が使用されている場合は非同期になる場合があります。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.DrawingLogic
		 * @instance
		 * @param {String} [returnType="image/png"] imgage/png, image/jpeg, image/svg+xml のいずれか
		 * @param {Object} [processParameter] 画像出力時設定オブジェクト
		 * @param {boolean} [processParameter.simulateItalic = false]
		 *            italicの指定されたArtTextオブジェクトの画像化の際に、指定されているフォントがitalic体を持たない場合に、変形して出力を行うかどうか
		 *            <p>
		 *            Firefox以外のブラウザでは、italic体を持たないフォントについてもブラウザが自動で変形を行うので、このフラグを指定しても結果は変わりません。
		 *            </p>
		 *            <p>
		 *            Firefoxの場合は、フォントファイルにitalick体が含まれていない場合、italicを指定してもブラウザによる自動変形は行われず、canvasに斜体を描画しません。
		 *            </p>
		 *            <p>
		 *            このフラグをtrueにすることで、italic体を持たないフォントについて、斜体をシミュレートするように変形を行います。
		 *            </p>
		 * @param {Object} [processParameter.size] サイズオブジェクト。指定しない場合は描画領域のサイズで保存されます。
		 * @param {number} [processParameter.size.width] 出力する画像の幅(px)
		 * @param {number} [processParameter.size.height] 出力する画像の高さ(px)
		 * @param {number} [processParameter.size.keepAspectRatio]
		 *            出力画像のアスペクト比を描画領域のサイズのアスペクト比と同じにするかどうか
		 *            <h3>サイズ指定省略時の挙動について</h3>
		 *            <p>
		 *            サイズ指定(width,height,keepAspectRatio)を省略した場合は以下のように出力サイズを決定します。
		 *            </p>
		 *            <p>
		 *            アスペクト保持指定(keepAspectRatio=true)の場合
		 *            <ul>
		 *            <li>高さ、幅のどちらかが指定されていれば指定されていない方をアスペクト比から計算
		 *            <li>どちらも指定されている場合は指定幅に合わせて高さを計算
		 *            <li>どちらも指定されていない場合は無視(元のボードのサイズで出力)
		 *            </ul>
		 *            </p>
		 *            <p>
		 *            アスペクト保持を指定しない(keepAspectRatio=false)場合
		 *            <ul>
		 *            <li>高さ、幅のどちらかが指定されていれば指定されていない方は元のボードサイズ
		 *            <li>どちらも指定されている場合は指定されたサイズ
		 *            <li>どちらも指定されていない場合は元のボードのサイズ
		 *            </ul>
		 *            </p>
		 * @returns {Promise} doneハンドラに'data:'で始まる画像データURLを渡します
		 */
		// TODO trimオプションは実装済みですが、いったんAPIから外しています #83
		// 自動トリム(図形描画領域を自動で計算してtrim)する機能を実装した時に復活させる
		// 自動トリムは図形の線幅も考慮した矩形を取得する必要があり、ブラウザによって挙動が異なり、自動trim実装の差異は考慮する必要があります
		// 例：path要素の矩形取得について
		//		chrome
		//		 getBoundingClientRect() 線の幅考慮されない
		//		 getBBox() 線の幅考慮されない
		//
		//		ff
		//		 getBoundingClientRect() +線の幅 +上下左右に10pxのマージン
		//		 getBBox() 線の幅考慮されない
		//
		//		IE
		//		 getBoundingClientRect() +線の幅
		//		 getBBox() 線の幅考慮されない
		//		/**
		//		 * @private
		//		 * @param {Object} [processParameter.trim] 範囲指定オブジェクト。指定しない場合は範囲指定は行いません。
		//		 * @param {Object} processParameter.trim.dx 切りぬく範囲の左上位置のx座標
		//		 * @param {Object} processParameter.trim.dy 切りぬく範囲の左上位置のy座標
		//		 * @param {Object} processParameter.trim.dw 切りぬく範囲の幅
		//		 * @param {Object} processParameter.trim.dh 切りぬく範囲の高さ
		//		 */
		getImage: function(returnType, processParameter) {
			returnType = returnType || 'image/png';
			processParameter = processParameter || {};
			// _shapeLayerはg要素なので親のsvgを取得してviewBoxを求める
			var svg = $(this._shapeLayer).parents('svg')[0];
			var viewBox = svg.getAttribute('viewBox');
			var viewBoxValues = viewBox.split(' ');
			var viewBoxWidth = parseInt(viewBoxValues[2]);
			var viewBoxHeight = parseInt(viewBoxValues[3]);
			var aspectRatio = viewBoxWidth / viewBoxHeight;
			var outputWidth, outputHeight;
			var size = processParameter.size;
			if (size) {
				// サイズが指定されている場合は出力サイズを変更
				var keepAspectRatio = size.keepAspectRatio;
				if (size.keepAspectRatio) {
					// アスペクト保持指定がある場合は幅、高さの指定されていない方を計算
					// (両方指定されている場合は幅を基準に高さを計算)
					if (size.width) {
						outputWidth = size.width;
						outputHeight = outputWidth / aspectRatio;
					} else if (size.height) {
						outputHeight = size.height;
						outputWidth = outputHeight * aspectRatio;
					}
				} else {
					outputWidth = size.width || viewBoxWidth;
					outputHeight = size.height || viewBoxHeight;
				}
			} else {
				outputWidth = viewBoxWidth;
				outputHeight = viewBoxHeight;
			}

			// 出力先サイズに合わせたcanvas
			// 背景画像はこっちに描画
			var outputCanvas = document.createElement('canvas');
			outputCanvas.width = outputWidth;
			outputCanvas.height = outputHeight;
			var ctx = outputCanvas.getContext('2d');
			var dfd = h5.async.deferred();

			// 背景を描画
			// 背景はoutputCanvas(出力画像の元になるのcanvas)に描画
			var background = this._getCurrentBackgroundData();
			var backgroundDfd = h5.async.deferred();
			if (background) {
				if (background.color) {
					ctx.fillStyle = background.color;
					ctx.fillRect(0, 0, outputWidth, outputHeight);
				}
				var src = background.id ? this.imageSourceMap[background.id] : background.src;
				if (src) {
					var fillMode = background.fillMode;
					var tmpImg = document.createElement('img');
					tmpImg.onload = function() {
						// 背景画像のfillMode計算は、出力先カンバスのサイズで設定されます
						// 例えば100*100の入力元カンバスにfillMode:containCenterで200*100の画像が背景に使われていた場合
						// 入力元カンバスには100*50サイズで(x,y)=(0,25)で描画されています
						// これを500*200で出力すると、400*200のカンバスにfillMode:containCenterで描画した状態と同じになり、
						// 400*200で(x,y)=(50,0)で描画されます
						// 例えばfillMode:noneで描画されている画像は、出力先カンバスのサイズが変わっても出力画像のサイズは拡大または縮小されません
						// なお、背景画像のオフセット位置は、出力先に合わせて拡大・縮小されます
						var x = (outputWidth / viewBoxWidth) * background.offsetX;
						var y = (outputHeight / viewBoxHeight) * background.offsetY;
						switch (fillMode) {
						case 'contain':
						case 'containCenter':
							var canvasRatio = outputWidth / outputHeight;
							var imgRatio = this.width / this.height;
							var w, h;
							if (canvasRatio < imgRatio) {
								w = outputWidth;
								h = w / imgRatio;
							} else {
								h = outputHeight;
								w = h * imgRatio;
							}
							if (fillMode === 'containCenter') {
								// 中央配置
								if (canvasRatio < imgRatio) {
									y += (outputHeight - h) / 2;
								} else {
									x += (outputWidth - w) / 2;
								}
							}
							ctx.drawImage(this, x, y, w, h);
							break;
						case 'cover':
							var canvasRatio = outputWidth / outputHeight;
							var imgRatio = this.width / this.height;
							var w, h;
							if (canvasRatio < imgRatio) {
								h = outputWidth;
								w = h * imgRatio;
							} else {
								w = outputHeight;
								h = w / imgRatio;
							}
							ctx.drawImage(this, x, y, w, h);
							break;
						case 'stretch':
							ctx.drawImage(this, x, y, outputWidth, outputHeight);
							break;
						default:
							// none
							ctx.drawImage(this, x, y);
							break;
						}
						backgroundDfd.resolve();
					};
					tmpImg.src = src;
				} else {
					backgroundDfd.resolve();
				}
			} else {
				backgroundDfd.resolve();
			}

			// 背景描画が終わったら図形をカンバスに描画
			backgroundDfd.promise().then(
					this.own(function() {
						// 図形は、描画領域の座標が出力先カンバスの座標に変換されるようtransform設定
						ctx.transform(outputWidth / viewBoxWidth, 0, 0, outputHeight
								/ viewBoxHeight, 0, 0);
						return this._canvasConvertLogic.drawSVGToCanvas(svg, outputCanvas,
								processParameter);
					})).then(this.own(function() {
				// カンバスを画像化
				// TODO trimは実装済みだが行わないようにしている #83
				// var trim = processParameter.trim;
				var trim = null;
				if (trim) {
					// trimが指定されている場合
					// 新しくcanvasを生成してサイズ変更とトリミングを行う
					var canvas = document.createElement('canvas');
					var dx = trim.dx;
					var dy = trim.dy;
					var dh = trim.dh;
					var dw = trim.dw;
					// 出力サイズはsize指定があれば指定のサイズ、無い場合はtrimしたサイズ
					var w = size ? size.width : dw;
					var h = size ? size.height : dh;
					canvas.setAttribute('width', w);
					canvas.setAttribute('height', h);
					canvas.getContext('2d').drawImage(outputCanvas, dx, dy, dw, dh, 0, 0, w, h);
				}
				dfd.resolve(this._canvasConvertLogic.toDataURL(outputCanvas, returnType, 1));
			}));
			return dfd.promise();
		}
	};

	//------------------------------------------------------------
	// expose
	//------------------------------------------------------------
	h5.core.expose(drawingLogic);
})();
//--------------------------------------------------------
// 定数定義
//--------------------------------------------------------
(function() {
	//----------------------------------------
	// ArtboardControllerが上げるイベント
	//----------------------------------------
	/** 描画操作を開始した時に上がるイベント名 */
	var EVENT_DRAW_START = 'drawStart';

	/** 描画操作を終了した時に上がるイベント名 */
	var EVENT_DRAW_END = 'drawEnd';

	/** 図形を選択した時に上がるイベント名 */
	var EVENT_SELECT_SHAPE = 'selectShape';

	/** 図形の選択を解除した時に上がるイベント名 */
	var EVENT_UNSELECT_SHAPE = 'unselectShape';

	// exposeしてイベント名を公開する
	// コマンドマネージャが上げるイベントはDrawingLogicで公開している
	h5.u.obj.expose('h5.ui.components.artboard.consts', {
		EVENT_DRAW_START: EVENT_DRAW_START,
		EVENT_DRAW_END: EVENT_DRAW_END,
		EVENT_SELECT_SHAPE: EVENT_SELECT_SHAPE,
		EVENT_UNSELECT_SHAPE: EVENT_UNSELECT_SHAPE
	});
})();

//----------------------------------------------------------------------------
// h5.ui.components.SelectionLogic
//----------------------------------------------------------------------------
(function() {
	/**
	 * セレクションロジック
	 * <p>
	 * 任意のオブジェクトの選択状態、フォーカス状態を管理する
	 * </p>
	 *
	 * @name h5.ui.components.SelectionLogic
	 * @class
	 */
	var logic = {
		/**
		 * @memberOf h5.ui.components.SelectionLogic
		 * @private
		 */
		__name: 'h5.ui.components.SelectionLogic',

		/**
		 * 選択されているオブジェクトの配列
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @private
		 */
		_selected: [],

		/**
		 * フォーカスされているオブジェクト
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @private
		 */
		_focused: null,

		/**
		 * 引数に渡されたオブジェクトが選択状態かどうか判定して返す
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @param {Any} obj
		 * @returns {Boolean}
		 */
		isSelected: function(obj) {
			return $.inArray(obj, this._selected) !== -1;
		},

		/**
		 * 選択されているオブジェクトのリストを返す
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @returns {Any[]}
		 */
		getSelected: function() {
			return this._selected;
		},

		/**
		 * フォーカスされているオブジェクトを返す
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @returns {Any}
		 */
		getFocusElement: function() {
			return this._focused;
		},

		/**
		 * オブジェクトをフォーカス状態にする
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @private
		 */
		focus: function(obj) {
			if (!this.isSelected(obj)) {
				//非選択状態であれば自動的に選択状態に(追加)する
				this.select(obj);
			}

			this._focused = obj;
		},

		/**
		 * フォーカス状態のオブジェクトを非フォーカス状態にする
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @param {Boolean} [withUnselect=true] trueの場合はunselectも実行する(デフォルトtrue)
		 */
		unfocus: function(withUnselect) {
			var focused = this._focused;
			this._focused = null;
			if (withUnselect !== false) {
				this.unselect(focused);
			}
		},

		/**
		 * 引数に渡されたオブジェクトを選択状態にする
		 * <p>
		 * 既に選択状態であるオブジェクトは無視します
		 * </p>
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @param {Any|Any[]} objs 配列で渡された場合はその中身を選択対象として扱います
		 * @param {Boolean} isExclusive trueが指定された場合、現在選択されているものを全て解除して、引数に渡されたものだけを選択状態にする
		 * @returns {Any[]} 実際に選択されたオブジェクトの配列を返す(既に選択済みだったものは除く)
		 */
		select: function(objs, isExclusive) {
			if (isExclusive) {
				this.unselectAll();
			}
			var objs = $.isArray(objs) ? objs : [objs];

			// デフォルトで、先頭のものをfocus状態にする
			var shouldRefocus = this._selected.length === 0;

			var actuals = [];

			for (var i = 0, l = objs.length; i < l; i++) {
				var obj = objs[i];
				if (this.isSelected(obj)) {
					// 選択済みなら何もしない
					continue;
				}

				this._selected.push(obj);
				actuals.push(obj);
			}
			if (actuals.length && shouldRefocus) {
				// フォーカスされているものが無ければ、今回追加したものの先頭をフォーカスする
				this.focus(actuals[0]);
			}
			return actuals;
		},

		/**
		 * 引数に渡されたオブジェクトの選択状態を解除する
		 * <p>
		 * 選択状態ではないオブジェクトは無視します
		 * </p>
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @param {Any|Any[]} objs 配列で渡された場合はその中身を選択解除する対象として扱います
		 * @returns {Any[]} 実際に選択の解除されたオブジェクトの配列を返す(既に選択状態ではなかったものは除く)
		 */
		unselect: function(objs) {
			var objs = $.isArray(objs) ? objs : [objs];
			var actuals = [];
			for (var i = 0, l = objs.length; i < l; i++) {
				var obj = objs[i];
				if (this.isSelected(obj)) {
					var idx = $.inArray(obj, this._selected);
					if (idx === -1) {
						continue;
					}
					// 選択状態を解除
					var spliced = this._selected.splice(idx, 1);
					actuals.push(spliced[0]);
					if (this._focus === obj) {
						// フォーカス状態ならフォーカスも解除
						this._focus = null;
					}
				}
			}
			return actuals;
		},

		/**
		 * 全ての選択状態のオブジェクトについて選択状態を解除する
		 *
		 * @memberOf h5.ui.components.SelectionLogic
		 * @instance
		 * @returns {Any[]} 実際に選択の解除されたオブジェクトの配列を返す
		 */
		unselectAll: function() {
			var actuals = this._selected.splice(0);
			this.unfocus();
			return actuals;
		}
	};
	h5.core.expose(logic);
})();

//----------------------------------------------------------------------------
// h5.ui.components.artboard.logic.ArtboardCommandLogic
//----------------------------------------------------------------------------
(function() {
	/**
	 * ArtboardCommandLogic
	 * <p>
	 * ArtboardCommandLogicは{@link h5.ui.components.artboard.logic.DrawingLogic}によって生成されたコマンドのトランザクション管理を行います。
	 * </p>
	 *
	 * @class
	 * @name h5.ui.components.artboard.logic.ArtboardCommandLogic
	 */
	var artboardCommandLogic = {
		/**
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @private
		 */
		__name: 'h5.ui.components.artboard.logic.ArtboardCommandLogic',

		/**
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @private
		 * @instance
		 * @type CommandManager
		 */
		_commandManager: null,

		/**
		 * transactionIdとコマンドのマップ
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @private
		 * @instance
		 */
		_transactionMap: {},

		/**
		 * appendCommandを使ってcommandManagerに追加した最後のコマンド
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @private
		 * @instance
		 */
		_lastAppendedCommand: null,


		/**
		 * transactionIdを生成するシーケンス
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @private
		 * @instance
		 */
		_transactionIdSeq: h5.core.data.createSequence(),

		/**
		 * 初期化
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param {CommandManager}
		 */
		init: function(commandManager) {
			// CommandManagerの設定
			this._commandManager = commandManager;
		},

		/**
		 * コマンドを実行して登録する
		 * <p>
		 * noExecuteがtrueの場合はコマンドを実行せずに登録します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param {Command} command コマンド
		 * @param {Integer} transactionId トランザクションID
		 * @param {boolean} noExecute 実行しない場合はtrueを指定
		 */
		appendCommand: function(command, transactionId, noExecute) {
			if (!noExecute) {
				var ret = command.execute();
			}
			transactionId = transactionId || this._updateTransactionId;
			if (transactionId) {
				// transactionの指定がある場合、Command配列に追加する
				this._transactionMap[transactionId].push(command);
			} else {
				this._commandManager.append(command);
				this._lastAppendedCommand = command;
			}
			// 実行したコマンドについてイベントを上げる
			this._dispatchExecuteResult(ret);
		},

		/**
		 * アップデートセッションを開始します
		 * <p>
		 * アップデートセッショントランザクションを作成し、アップデートセッション中は、
		 * appendCommandでtransactionIdを指定しないでコマンドが追加されたとき、アップデートセッショントランザクションに登録されます。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 */
		beginUpdate: function() {
			if (this._updateTransactionId) {
				return this._updateTransactionId;
			}
			var transactionId = this.createTransaction();
			this._updateTransactionId = transactionId;
		},

		/**
		 * アップデートセッションを終了します
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param {boolean} noExecute アップデートセッション中に生成されたコマンドのうち、未実行のものを実行しない場合はtrueを指定
		 */
		endUpdate: function(noExecute) {
			if (!this._updateTransactionId) {
				return;
			}
			var transactionId = this._updateTransactionId;
			this._updateTransactionId = null;
			// コミット
			this.commitTransaction(transactionId);
		},

		/**
		 * トランザクションを生成し、トランザクションIDを返します
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @returns {Integer} トランザクションID
		 */
		createTransaction: function() {
			var transactionId = this._transactionIdSeq.next();
			this._transactionMap[transactionId] = [];
			return transactionId;
		},

		/**
		 * トランザクションのコミット
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param transactionId トランザクションID
		 * @param {boolean} noExecute 実行しない場合はtrueを指定
		 */
		commitTransaction: function(transactionId, noExecute) {
			var commands = this._transactionMap[transactionId];
			if (!commands.length) {
				return;
			}
			var command = commands.length === 1 ? commands[0]
					: new h5.ui.components.artboard.SequenceCommand(commands);
			delete this._transactionMap[transactionId];
			this.appendCommand(command, null, noExecute);
		},

		/**
		 * トランザクションの中断
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param transactionId
		 */
		abortTransaction: function(transactionId) {
			var sequenceCommand = this._transactionMap[transactionId];
			delete this._transactionMap[transactionId];
			new h5.ui.components.artboard.SequenceCommand(sequenceCommand).undo();
		},

		/**
		 * 取り消し
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 */
		undo: function() {
			var ret = this._commandManager.undo();
			this._dispatchExecuteResult(ret);
			return ret;
		},

		/**
		 * やり直し
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 */
		redo: function() {
			var ret = this._commandManager.redo();
			this._dispatchExecuteResult(ret);
			return ret;
		},

		/**
		 * 履歴をすべて削除
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 */
		clearAll: function() {
			this.abortTransaction();
			this._commandManager.clearAll();
		},

		/**
		 * コマンドのexecute(またはundo)実行時に返ってきたイベントオブジェクトについて、そのイベントをコマンドマネージャから上げる
		 *
		 * @memberOf h5.ui.components.artboard.logic.ArtboardCommandLogic
		 * @instance
		 * @param {Any} ret
		 */
		_dispatchExecuteResult: function(ret) {
			// SequenceCommandの場合はexecute()の戻り値は配列なので、複数結果に対応
			ret = $.isArray(ret) ? ret : [ret];
			for (var i = 0, l = ret.length; i < l; i++) {
				var r = ret[i];
				var type = r && r.type;
				if (!type) {
					continue;
				}
				// 受け取ったイベントオブジェクトをコマンドマネージャから上げる
				this._commandManager.dispatchEvent(r);
			}
		}
	};
	h5.core.expose(artboardCommandLogic);
})();

//----------------------------------------------------------------------------
// h5.ui.components.artboard.controller.ArtboardController
//----------------------------------------------------------------------------
(function() {
	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	// CommandManagerが上げるイベント名
	/** 図形追加時に上がるイベント名 */
	var EVENT_APPEND_SHAPE = h5.ui.components.artboard.consts.EVENT_APPEND_SHAPE;

	/** 図形削除時に上がるイベント名 */
	var EVENT_REMOVE_SHAPE = h5.ui.components.artboard.consts.EVENT_REMOVE_SHAPE;

	/** 図形編集時に上がるイベント名 */
	var EVENT_EDIT_SHAPE = h5.ui.components.artboard.consts.EVENT_EDIT_SHAPE;

	/** 背景編集時に上がるイベント名 */
	var EVENT_EDIT_BACKGROUND = h5.ui.components.artboard.consts.EVENT_EDIT_BACKGROUND;

	/** undo実行時に上がるイベント名 */
	var EVENT_UNDO = h5.ui.components.artboard.consts.EVENT_UNDO;

	/** redo実行時に上がるイベント名 */
	var EVENT_REDO = h5.ui.components.artboard.consts.EVENT_REDO;

	/** undoができるようになった時に上がるイベント名 */
	var EVENT_ENABLE_UNDO = h5.ui.components.artboard.consts.EVENT_ENABLE_UNDO;

	/** redoができるようになった時に上がるイベント名 */
	var EVENT_ENABLE_REDO = h5.ui.components.artboard.consts.EVENT_ENABLE_REDO;

	/** undoができなくなった時に上がるイベント名 */
	var EVENT_DISABLE_UNDO = h5.ui.components.artboard.consts.EVENT_DISABLE_UNDO;

	/** redoが出来なくなったときに上がるイベント名 */
	var EVENT_DISABLE_REDO = h5.ui.components.artboard.consts.EVENT_DISABLE_REDO;

	// ArtboardControllerが上げるイベント名
	/** 描画操作を開始した時に上がるイベント名 */
	var EVENT_DRAW_START = h5.ui.components.artboard.consts.EVENT_DRAW_START;

	/** 描画操作を終了した時に上がるイベント名 */
	var EVENT_DRAW_END = h5.ui.components.artboard.consts.EVENT_DRAW_END;

	/** 図形を選択した時に上がるイベント名 */
	var EVENT_SELECT_SHAPE = h5.ui.components.artboard.consts.EVENT_SELECT_SHAPE;

	/** 図形の選択を解除した時に上がるイベント名 */
	var EVENT_UNSELECT_SHAPE = h5.ui.components.artboard.consts.EVENT_UNSELECT_SHAPE;

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	/**
	 * [DrawingLogic]{@link h5.ui.components.artboard.logic.DrawingLogic}を使って描画を行うコントローラ
	 *
	 * @class
	 * @name h5.ui.components.artboard.controller.ArtboardController
	 */
	var controller = {
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 */
		__name: 'h5.ui.components.artboard.controller.ArtboardController',

		/**
		 * 図形の選択・非選択を管理するロジック
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @type [SelectionLogic]{@link h5.ui.components.SelectionLogic}
		 */
		selectionLogic: h5.ui.components.SelectionLogic,

		/**
		 * 図形の描画を行うロジック
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @type [DrawingLogic]{@link h5.ui.components.artboard.logic.DrawingLogic}
		 */
		drawingLogic: h5.ui.components.artboard.logic.DrawingLogic,

		/**
		 * 描画におけるコマンドを管理するロジック
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @type [ArtboardCommandLogic]{@link h5.ui.components.artboard.logic.ArtboardCommandLogic}
		 */
		artboardCommandLogic: h5.ui.components.artboard.logic.ArtboardCommandLogic,

		/**
		 * 画像IDと画像パスのマップ
		 * <p>
		 * ここに設定されたマップは、ArtboardController初期化時(__init時)にdrawingLogicのimageSouceMapにも適用されます。
		 * </p>
		 * <p>
		 * この設定をdrawingLogicで有効にするには、ArtboardControllerの__initが呼ばれる前(親コントローラの__initなど)で設定してください。
		 * </p>
		 *
		 * @see {@link h5.ui.components.artboard.logic.DrawingLogic#imageSourceMap}
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		imageSourceMap: {},

		/**
		 * 描画モード定数：使用不可モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_DISABLE: 'disable',

		/**
		 * 描画モード定数：ペン描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_PEN: 'pen',

		/**
		 * 描画モード定数：直線描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_LINE: 'line',

		/**
		 * 描画モード定数：矩形(塗りつぶしなし)描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_RECT: 'rect',

		/**
		 * 描画モード定数：矩形(塗りつぶしあり)描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_FILL_RECT: 'fillrect',

		/**
		 * 描画モード定数：円(塗りつぶしなし)描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_CIRCLE: 'circle',

		/**
		 * 描画モード定数：円(塗りつぶしあり)描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_FILL_CIRCLE: 'fillcircle',

		/**
		 * 描画モード定数：テキスト描画モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_TEXT: 'text',

		/**
		 * 描画モード定数：図形選択モード
		 * <p>
		 * <a href="#setMode">setMode</a>で設定できるモードの一つです。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 */
		MODE_SELECT: 'select',

		/**
		 * canvas要素(__initで設定)
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_canvas: null,

		/**
		 * canvas要素のcontext(__initで設定)
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_canvasContext: null,

		/**
		 * 描画レイヤ要素
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_layers: null,

		/**
		 * トラック操作中に保持するデータ
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_trackingData: null,

		/**
		 * トラックして範囲選択するときに表示する要素(__initで設定)
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_$selectionScopeRectangle: null,

		//------------------------------------------
		// 設定項目
		//------------------------------------------
		/**
		 * 線の色
		 * <p>
		 * デフォルト#000
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeColor: '#000',

		/**
		 * 塗りつぶし色
		 * <p>
		 * デフォルト#fff
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_fillColor: '#fff',

		/**
		 * 線の太さ
		 * <p>
		 * デフォルト5
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeWidth: 5,

		/**
		 * 線のopacity
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeOpacity: '1',

		/**
		 * 塗りつぶしのopacity
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_fillOpacity: '1',

		/**
		 * ストロークの塗りつぶし色
		 * <p>
		 * デフォルト'none'
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeFill: 'none',

		/**
		 * ストロークされる際の継ぎ目に利用される形状
		 * <p>
		 * 'miter','round','bevel'のいずれか。(デフォルト'round')
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeLinejoin: 'round',

		/**
		 * ストロークの際に，開いた部分パスの両端に利用される形状
		 * <p>
		 * 'butt','round','square'のいずれか。(デフォルト'round')
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_strokeLinecap: 'round',

		/**
		 * 多角形の継ぎ目に利用される形状(デフォルト'miter')
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_polygonLinejoin: 'miter',

		/**
		 * 描画モードの設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param mode
		 */
		setMode: function(mode) {
			if (mode === this.MODE_SELECT || mode === this.MODE_DISABLE || mode === this.MODE_TEXT) {
				// セレクトモード時は、canvasを隠す
				$(this._canvas).css('display', 'none');
			} else {
				// 描画時は、canvasを表示
				$(this._canvas).css('display', 'block');
			}
			this._mode = mode;
		},

		/**
		 * 線の色の設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} color
		 */
		setStrokeColor: function(color) {
			this._strokeColor = color;
		},

		/**
		 * 塗りつぶしの色の設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} color
		 */
		setFillColor: function(color) {
			this._fillColor = color;
		},

		/**
		 * 線のopacity設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Number|String} opacity 0～1の数値で指定
		 */
		setStrokeOpacity: function(opacity) {
			this._strokeOpacity = opacity.toString();
		},
		/**
		 * 塗りつぶしのopacity設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Number|String} opacity 0～1の数値で指定
		 */
		setFillOpacity: function(opacity) {
			this._fillOpacity = opacity.toString();
		},

		/**
		 * 線の太さ設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param lineWidth
		 */
		setStrokeWidth: function(lineWidth) {
			this._strokeWidth = lineWidth;
		},

		// TODO strokeFill設定時に塗りつぶしありのパスの描画は可能ですが、exportが未実装のため、APIから外しています。
		//				/**
		//				 * ストロークの塗りつぶし色(無しの場合は'none')
		//				 * @param strokeFill
		//				 */
		//				setStrokeFill: function(strokeFill) {
		//					this._strokeFill = strokeFill;
		//				},

		/**
		 * ストロークされる際の継ぎ目に利用される形状
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} strokeLinejoin bevel, round, miterのいずれかを指定
		 */
		setStrokeLinejoin: function(strokeLinejoin) {
			this._strokeLinejoin = strokeLinejoin;
		},

		/**
		 * ストロークの両端に利用される形状
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} strokeLinecap butt, round, squareのいずれかを指定
		 */
		setStrokeLinecap: function(strokeLinecap) {
			this._strokeLinecap = strokeLinecap;
		},

		/**
		 * 多角形の継ぎ目に利用される形状
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} polygonLinejoin bevel, round, miterのいずれかを指定
		 */
		setPolygonLinejoin: function(polygonLinejoin) {
			this._polygonLinejoin = polygonLinejoin;
		},

		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		__init: function() {
			// canvas要素を取得
			this._canvas = this.$find('canvas')[0];
			this._canvasContext = this._canvas.getContext('2d');

			// 選択ドラッグ中に表示する要素を作成
			this._$selectionScopeRectangle = $('<div class="selection-scope-rectangle"></div>');
			$(this.rootElement).append(this._$selectionScopeRectangle);

			// drawingLogicのセットアップ
			// レイヤ領域を取得
			var $layers = this.$find('.h5-artboard-layers');
			this._layers = $layers[0];
			var svgLayerElement = $layers.find('.svg-layer>g')[0];
			var backgroundLayerElement = $layers.find('.background-layer')[0];

			// ロジックの初期化
			var commandManager = new h5.ui.components.artboard.CommandManager();
			this.artboardCommandLogic.init(commandManager);
			this.drawingLogic.init(svgLayerElement, backgroundLayerElement,
					this.artboardCommandLogic);
			this.drawingLogic.imageSourceMap = this.imageSourceMap;

			// スクロールされないようにタッチのあるブラウザでtouchmoveのpreventDefaultを設定
			// (SVG要素にはtouch-action:noneが効かないため、preventDefault()で制御する)
			if (document.ontouchstart !== undefined) {
				$(svgLayerElement).addClass('touchmove-cancel');
				this.on('{.touchmove-cancel}', 'touchmove', function(context) {
					context.event.preventDefault();
				});
			}
			// CommandManagerにイベントをバインドする
			// undo/redoが可能/不可能になった時にルートエレメントからイベントをあげる
			var events = [EVENT_UNDO, EVENT_REDO, EVENT_ENABLE_UNDO, EVENT_ENABLE_REDO,
					EVENT_DISABLE_UNDO, EVENT_DISABLE_REDO, EVENT_EDIT_SHAPE, EVENT_APPEND_SHAPE,
					EVENT_REMOVE_SHAPE, EVENT_EDIT_BACKGROUND];
			for (var i = 0, l = events.length; i < l; i++) {
				this.on(commandManager, events[i], function(context) {
					// shapeがあればshapeをトリガ引数にする
					this.trigger(context.event, context.event.shape || undefined);
				});
			}
		},

		/**
		 * canvasをクリア
		 * <p>
		 * ArtShapeの生成された確定済みの図形はcanvas上には無いので削除されません。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		clearCanvas: function() {
			var ctx = this._canvasContext;
			var w = this._canvas.getAttribute('width');
			var h = this._canvas.getAttribute('height');
			ctx.clearRect(0, 0, w, h);
		},

		//----------------------------
		// トラックイベント
		//----------------------------
		/**
		 * canvas要素のトラックイベント
		 * <p>
		 * canvasにイベントが来るのは描画モードの場合のみ
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{this._canvas} h5trackstart': function(context) {
			// トラックデータの作成
			var event = context.event;
			event.stopPropagation();
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			this._trackingData = {
				start: {
					x: x,
					y: y
				},
				moved: false
			};
			this.trigger(EVENT_DRAW_START);
			var startFunctionName = '_' + this._mode + 'DrawStart';
			this[startFunctionName] && this[startFunctionName](context);
		},

		/**
		 * canvas要素のトラックイベント
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{this._canvas} h5trackmove': function(context) {
			var event = context.event;
			event.stopPropagation();
			this._trackingData.moved = true;
			var moveFunctionName = '_' + this._mode + 'DrawMove';
			this[moveFunctionName] && this[moveFunctionName](context);
		},

		/**
		 * canvas要素のトラックイベント
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{this._canvas} h5trackend': function(context) {
			var event = context.event;
			event.stopPropagation();
			this.trigger(EVENT_DRAW_END);
			var endFunctionName = '_' + this._mode + 'DrawEnd';
			this[endFunctionName] && this[endFunctionName](context);
			this._trackingData = null;
		},

		/**
		 * 選択モード(canvasが無い)時のトラック操作のハンドラ
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{rootElement} h5trackstart': function(context) {
			if (this._mode !== this.MODE_SELECT) {
				return;
			}
			// 座標をlayer位置基準にする
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			this._trackingData = {
				start: {
					x: x,
					y: y
				},
				moved: false
			};
			this._selectTrackstart(context);
			// トラックスタート時に図形が新しく選択されたら、図形の移動のトラックに切り替える
			if (this._trackingData.selectedWhenTrackstart) {
				this._trackstartSelectedShape(event, this.$find('.selection-rectangle'));
			}
		},

		/**
		 * 選択モード時のトラック操作のハンドラ
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{rootElement} h5trackmove': function(context) {
			context.event.preventDefault();
			if (this._mode !== this.MODE_SELECT) {
				return;
			}
			if (this._trackingData.selectedWhenTrackstart) {
				// トラックスタート時に図形が新しく選択されたら、図形の移動のトラック
				this._trackmoveSelectedShape(context.event, this.$find('.selection-rectangle'));
				return;
			}
			this._selectTrackmove(context);
		},

		/**
		 * 選択モード時のトラック操作のハンドラ
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{rootElement} h5trackend': function(context) {
			if (this._mode !== this.MODE_SELECT) {
				return;
			}
			if (this._trackingData.selectedWhenTrackstart) {
				// トラックスタート時に図形が新しく選択されたら、図形の移動のトラック
				this._trackendSelectedShape(context.event, this.$find('.selection-rectangle'));
				return;
			}
			this._selectTrackend(context);
		},

		/**
		 * 選択モード時のmousemoveイベントハンドラ
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		'{this._layers} mousemove': function(context) {
			if (this._mode !== this.MODE_SELECT) {
				return;
			}
			// カーソルの箇所に図形がどうかあるかを判定
			// 図形があればマウスカーソルをall-scrollにする
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			// x,yの位置にあるshapeを取得
			var isHit = false;
			var shapes = this.getAllShapes(true);
			for (var i = 0, l = shapes.length; i < l; i++) {
				if (shapes[i].hitTest(x, y)) {
					isHit = true;
					break;
				}
			}
			// カーソルの設定
			$(this._layers).css('cursor', isHit ? 'all-scroll' : '');
		},

		//--------------------------------------------------------------
		// DrawingLogicの操作
		//--------------------------------------------------------------
		//
		/**
		 * 描画されている図形からセーブデータを作成します
		 * <p>
		 * useSrcオプションがtrueの場合、背景画像について画像IDではなくパス(srcの値)で保存します。
		 * </p>
		 * <p>
		 * 画像IDで保存されたデータを復元する場合は、保存時と同一のimageSrcMapの登録が必要です。
		 * 別ページで保存データを利用する場合などで同一のimageSrcMapを使用しない場合は、useSrcにtrueを指定してパスで保存したデータを使用してください。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Boolean} true指定の場合useSrc 画像IDではなくパス(srcの値)で保存します
		 * @returns {DrawingSaveData}
		 */
		save: function(useSrc) {
			var saveData = this.drawingLogic.save(useSrc);
			// 保存時のcanvasのサイズを覚えさせておく
			saveData.size = {
				width: this._canvas.getAttribute('width'),
				height: this._canvas.getAttribute('height')
			};
			return saveData;
		},

		/**
		 * 描画領域のサイズを変更します
		 * <p>
		 * 描画操作を行うcanvas要素及び、
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {number} width 変更後の幅(px)
		 * @param {number} height 変更後の高さ(px)
		 */
		setSize: function(width, height) {
			// ルートエレメントのサイズ変更
			$(this.rootElement).css({
				width: width,
				height: height
			});
			// 描画操作の領域(canvas要素)のwidth,height変更
			var canvas = this._canvas;
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			// drawingLogicのsetSizeでレイヤサイズの変更と背景の再計算を行う
			this.drawingLogic.setSize(width, height);
		},

		/**
		 * セーブデータををロードして描画します
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {DrawingSaveData}
		 */
		load: function(artboardSaveData) {
			this.drawingLogic.load(artboardSaveData);
		},

		/**
		 * 操作の取り消し
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		undo: function() {
			this.drawingLogic.undo();
		},

		/**
		 * 操作のやり直し
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		redo: function() {
			this.drawingLogic.redo();
		},

		/**
		 * アップデートセッションの開始
		 * <p>
		 * 図形描画時には自動的にundoデータが作成されますが、このメソッドを呼ぶと、 次に[endUpdate]{@link h5.ui.components.artboard.controller.ArtboardController#endUpdate}を呼ぶまで、undoデータは作られません。
		 * 図形に対する複数の操作を纏めてudno/redoの対象にしたい時にこのメソッドを使用してください。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		beginUpdate: function() {
			this.artboardCommandLogic.beginUpdate();
		},

		/**
		 * アップデートセッションの終了
		 * <p>
		 * [beginUpdate]{@link h5.ui.components.artboard.controller.ArtboardController#beginUpdate}で開始したとアップデートセッションを終了します。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {boolean} noExecute アップデートセッション中に生成されたコマンドのうち、未実行のものを実行しない場合はtrueを指定
		 */
		endUpdate: function(noExecute) {
			this.artboardCommandLogic.endUpdate(noExecute);
		},

		/**
		 * 描画されている図形を画像データにして返します
		 * <p>
		 * このメソッドはプロミスを返し、非同期で画像のデータURLを返します。画像が使用されている場合は非同期になる場合があります。
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {string} [returnType="image/png"] imgage/png, image/jpeg, image/svg+xml のいずれか
		 * @param {Object} [processParameter] パラメータ詳細については[DrawingLogic#getImage]{@link h5.ui.components.artboard.logic.DrawingLogic#getImage}と同じです。
		 * @returns {Promise} doneハンドラに'data:'で始まる画像データURLを渡します
		 */
		getImage: function(returnType, processParameter) {
			return this.drawingLogic.getImage(returnType, processParameter);
		},

		/**
		 * 管理下にある図形を全て取得します
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Boolean} exceptAlone trueの場合描画されている図形のみ
		 * @returns {ArtShape[]}
		 */
		getAllShapes: function(exceptAlone) {
			return this.drawingLogic.getAllShapes(exceptAlone);
		},

		/**
		 * 渡された図形のIDを返します
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {ArtShape} shape
		 * @returns {String}
		 */
		getShapeID: function(shape) {
			return this.drawingLogic.getShapeID(shape);
		},

		//--------------------------------------------------------------
		// 図形の描画関数
		//--------------------------------------------------------------
		/**
		 * 矩形を描画する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Number} x 左上のx座標
		 * @param {Number} y 左上のy座標
		 * @param {Number} width 正方形の幅
		 * @param {Number} height 正方形の高さ
		 * @param {Boolean} isFill 塗りつぶすかどうか
		 * @returns {ArtRect}
		 */
		drawRect: function(x, y, width, height, isFill) {
			return this.drawingLogic.drawRect(x, y, width, height, {
				stroke: this._strokeColor,
				strokeOpacity: this._strokeOpacity,
				strokeWidth: this._strokeWidth,
				fill: isFill ? this._fillColor : 'none',
				fillOpacity: isFill ? this._fillOpacity : '1',
				polygonLinejoin: this._polygonLinejoin
			});
		},

		/**
		 * 楕円を描画する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Number} cx 楕円の中心位置のx座標
		 * @param {Number} cy 楕円の中心位置のy座標
		 * @param {Number} rx 楕円の水平方向の半径
		 * @param {Number} ry 楕円の垂直方向の半径
		 * @param {Boolean} isFill 塗りつぶすかどうか
		 * @returns {ArtEllipse}
		 */
		drawEllipse: function(cx, cy, rx, ry, isFill) {
			return this.drawingLogic.drawEllipse(cx, cy, rx, ry, {
				stroke: this._strokeColor,
				strokeOpacity: this._strokeOpacity,
				strokeWidth: this._strokeWidth,
				fill: isFill ? this._fillColor : 'none',
				fillOpacity: isFill ? this._fillOpacity : '1'
			});
		},

		/**
		 * パスを描画する
		 * <p>
		 * SVGのpath要素のd属性の記述方法でパスを指定します
		 * </p>
		 *
		 * <pre class="sh_javascript"><code>
		 * // 例：(100px,200px)の位置から(x,y)方向に(10px,20px)移動し、その後その場所から(-10px,-10px)移動するようなデータの場合
		 * 'M 100 200 l 10 20 -10 -10'
		 * </code></pre>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} pathData
		 * @returns {ArtPath}
		 */
		drawPath: function(pathData) {
			return this.drawingLogic.drawPath({
				pathData: pathData,
				style: {
					stroke: this._strokeColor,
					strokeOpacity: this._strokeOpacity,
					strokeWidth: this._strokeWidth,
					fill: this._strokeFill,
					fillOpacity: this._strokefillOpacity,
					strokeLinejoin: this._strokeLinejoin,
					strokeLinecap: this._strokeLinecap
				}
			});
		},

		/**
		 * 画像の配置
		 * <p>
		 * クローンしてdivレイヤに配置します
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} data
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 * 	x: x座標,
		 * 	y: y座標,
		 * 	width: 幅,
		 * 	height: 高さ,
		 * 	id: 画像ID。idが指定された場合、[imageSrcMap]{@link h5.ui.components.artboard.controller.ArtboardController#imageSrcMap}から描画する画像パスを探します
		 * 	// src: 画像パス。IDが指定されている場合はsrcの指定は無効です。
		 * }
		 * </code></pre>
		 *
		 * @returns {ArtImage}
		 */
		drawImage: function(data) {
			return this.drawingLogic.drawImage(data);
		},

		/**
		 * テキストの配置
		 * <p>
		 * svgレイヤに配置します
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} data
		 *
		 * <pre class="sh_javascript"><code>
		 * {
		 *  x: 左上のx座標,
		 *  y: 左上のy座標
		 *  text: 入力文字列,
		 *  font: フォント,
		 *  fontSize: フォントサイズ
		 * }
		 * </code></pre>
		 *
		 * @returns {ArtImage}
		 */
		drawText: function(data) {
			// strokeの色でテキストを描画
			return this.drawingLogic.drawText({
				text: data.text,
				x: data.x,
				y: data.y,
				fill: this._strokeColor,
				opacity: this._strokeOpacity,
				font: data && data.font,
				fontSize: data && data.fontSize,
				fontFamily: data && data.fontFamily,
				style: data && data.style
			});
		},

		/**
		 * 背景色と背景画像の設定
		 * <p>
		 * 背景色と背景画像の設定を行います。
		 * </p>
		 * <p>
		 * 背景色と背景画像を同じアップデートセッションで設定します。個別に設定する場合は<a href="#setBackgroundColor">setBackgroundColor</a>と<a
		 * href="#setBackgroundImage">setBackgroundImage</a>を使用してください
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} color 背景色。指定無しの場合は背景色は変更しません
		 * @param {Object} backgroundImageData 背景画像データ。指定無しの場合は背景画像は変更しません
		 *            <p>
		 *            背景画像データの記述方法はのパラメータを参照してください
		 *            </p>
		 */
		setBackground: function(color, backgroundImageData) {
			this.beginUpdate();
			if (color != null) {
				this.setBackgroundColor(color);
			}
			if (backgroundImageData) {
				this.setBackgroundImage(backgroundImageData);
			} else {
				this.clearBackgroundImage();
			}
			this.endUpdate();
		},

		/**
		 * 背景色の設定
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {String} color 色
		 */
		setBackgroundColor: function(color) {
			this.drawingLogic.setBackgroundColor(color);
		},

		/**
		 * 背景画像をクリアします
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		clearBackgroundImage: function() {
			this.drawingLogic.clearBackgroundImage();
		},

		/**
		 * 背景画像の設定
		 * <p>
		 * 設定パラメータについては[DraiwingLogic#setBackgroundImage]{@link h5.ui.components.artboard.logic.DrawingLogic#setBackgroundImage}をご覧ください
		 * </p>
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} data
		 */
		setBackgroundImage: function(data) {
			this.drawingLogic.setBackgroundImage(data);
		},

		/**
		 * 図形の追加
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {ArtShape} shape
		 */
		append: function(shape) {
			this.drawingLogic.append(shape);
		},

		/**
		 * 図形の削除
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {ArtShape} shape
		 */
		remove: function(shape) {
			this.drawingLogic.remove(shape);
		},

		//------------------------------------------------------------------------
		//
		// 描画操作
		//
		//------------------------------------------------------------------------
		//--------------------------------------------------------------
		// ペン描画操作
		//--------------------------------------------------------------
		/**
		 * ペン描画開始
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_penDrawStart: function(context) {
			var start = this._trackingData.start;
			this._trackingData.d = 'M ' + start.x + ' ' + start.y + ' l';
		},

		/**
		 * ペン描画移動
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_penDrawMove: function(context) {
			// canvasに描画
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			var dx = event.dx;
			var dy = event.dy;
			var ctx = this._canvasContext;
			ctx.globalAlpha = this._strokeOpacity;
			ctx.strokeStyle = this._strokeColor;
			ctx.lineWidth = this._strokeWidth;
			ctx.lineJoin = 'miter';
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(x - dx, y - dy);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.closePath();

			// pathデータを更新
			this._trackingData.d += ' ' + dx + ' ' + dy;
		},

		/**
		 * ペン描画終了
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_penDrawEnd: function(context) {
			if (!this._trackingData.moved) {
				// 動いていないなら描画しない
				return;
			}
			// 確定
			this.drawPath(this._trackingData.d);
			// カンバスのクリア
			// (ちらつき防止のためtimeoutで削除)
			setTimeout(this.own(function() {
				// カンバスをクリア
				this.clearCanvas();
			}), 0);

			// リセット
			this._drawingPath = null;
		},

		//--------------------------------------------------------------
		// ライン描画操作
		//--------------------------------------------------------------
		/**
		 * ライン描画移動
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_lineDrawMove: function(context) {
			// canvasに描画
			// ラインを引く前に削除
			this.clearCanvas();
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			var start = this._trackingData.start;
			var ctx = this._canvasContext;
			ctx.strokeStyle = this._strokeColor;
			ctx.globalAlpha = this._strokeOpacity;
			ctx.lineWidth = this._strokeWidth;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.closePath();
		},

		/**
		 * ライン描画終了
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_lineDrawEnd: function(context) {
			if (!this._trackingData.moved) {
				// 動いていないなら描画しない
				return;
			}

			var event = context.event;
			var start = this._trackingData.start;
			var startX = start.x;
			var startY = start.y;
			var endX = event.offsetX;
			var endY = event.offsetY;

			// 確定
			this.drawPath(h5.u.str.format('M {0} {1} l {2} {3}', startX, startY, endX - startX,
					endY - startY));
			// カンバスのクリア
			// (ちらつき防止のためtimeoutで削除)
			setTimeout(this.own(function() {
				// カンバスをクリア
				this.clearCanvas();
			}), 0);

			// リセット
			this._drawingPath = null;
		},

		//--------------------------------------------------------------
		// 矩形描画操作
		//--------------------------------------------------------------
		/**
		 * 矩形描画移動
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_rectDrawMove: function(context, isFill) {
			// canvasに描画
			// 矩形を引く前に削除
			this.clearCanvas();
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			var startX = this._trackingData.start.x;
			var startY = this._trackingData.start.y;
			var ctx = this._canvasContext;
			ctx.strokeStyle = this._strokeColor;
			ctx.lineWidth = this._strokeWidth;
			ctx.lineJoin = this._polygonLinejoin;
			if (isFill) {
				ctx.save();
				ctx.globalAlpha = this._fillOpacity;
				ctx.fillStyle = this._fillColor;
				var fillMargin = this._strokeWidth / 2;
				ctx.fillRect(startX, startY, x - startX + fillMargin / 8 - 1, y - startY
						+ fillMargin / 8 - 1);
				ctx.restore();
			}
			ctx.globalAlpha = this._strokeOpacity;
			ctx.strokeRect(startX, startY, x - startX, y - startY);
		},

		/**
		 * 矩形描画終了
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_rectDrawEnd: function(context, isFill) {
			if (!this._trackingData.moved) {
				// 動いていないなら描画しない
				this._trackingData = null;
				return;
			}

			var event = context.event;
			var start = this._trackingData.start;
			var startX = start.x;
			var startY = start.y;
			var width = event.offsetX - startX;
			var height = event.offsetY - startY;
			if (width === 0 || height === 0) {
				// 幅または高さが0なら何もしない
				this._trackingData = null;
				return;
			}
			if (width < 0) {
				startX += width;
				width = -width;
			}
			if (height < 0) {
				startY += height;
				height = -height;
			}

			// 確定
			this.drawRect(startX, startY, width, height, isFill);

			// カンバスのクリア
			// (ちらつき防止のためtimeoutで削除)
			setTimeout(this.own(function() {
				// カンバスをクリア
				this.clearCanvas();
			}), 0);

			// リセット
			this._trackingData = null;
		},

		//--------------------------------------------------------------
		// 矩形描画操作(塗りつぶしあり)
		//--------------------------------------------------------------
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_fillrectDrawMove: function(context) {
			this._rectDrawMove(context, true);
		},
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 */
		_fillrectDrawEnd: function(context) {
			this._rectDrawEnd(context, true);
		},

		//--------------------------------------------------------------
		// 楕円描画操作
		//--------------------------------------------------------------
		/**
		 * 楕円描画移動
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param isFill 塗りつぶすかどうか
		 */
		_circleDrawMove: function(context, isFill) {
			// canvasに描画
			// 円を引く前に削除
			this.clearCanvas();
			var event = context.event;
			var layersOffset = $(this._layers).offset();
			var x = event.pageX - layersOffset.left;
			var y = event.pageY - layersOffset.top;
			var start = this._trackingData.start;
			var startX = start.x;
			var startY = start.y;

			var cx = (startX + x) * 0.5;
			var cy = (startY + y) * 0.5;
			var rx = x > cx ? x - cx : cx - x;
			var ry = y > cy ? y - cy : cy - y;

			if (rx === 0 || ry === 0) {
				// 半径0なら何もしない
				return;
			}
			var ctx = this._canvasContext;
			ctx.strokeStyle = this._strokeColor;
			ctx.lineWidth = this._strokeWidth;
			var sx = rx > ry ? rx / ry : 1;
			var sy = rx > ry ? 1 : ry / rx;
			ctx.translate(cx, cy);
			ctx.scale(sx, sy);
			if (isFill) {
				ctx.beginPath();
				ctx.globalAlpha = this._fillOpacity;
				ctx.fillStyle = this._fillColor;
				ctx.arc(0, 0, rx > ry ? ry : rx, 0, Math.PI * 2, true);
				ctx.fill();
			}
			ctx.beginPath();
			ctx.arc(0, 0, rx > ry ? ry : rx, 0, Math.PI * 2, true);
			//			ctx.translate(-cx + rx, -cy + ry);
			ctx.scale(1 / sx, 1 / sy);
			ctx.translate(-cx, -cy);
			ctx.globalAlpha = this._strokeOpacity;
			ctx.stroke();
		},

		/**
		 * 楕円描画終了
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param isFill 塗りつぶすかどうか
		 */
		_circleDrawEnd: function(context, isFill) {
			if (!this._trackingData.moved) {
				// 動いていないなら描画しない
				this._trackingData = null;
				return;
			}
			var event = context.event;
			var x = event.offsetX;
			var y = event.offsetY;
			var start = this._trackingData.start;
			var startX = start.x;
			var startY = start.y;
			var cx = (startX + x) * 0.5;
			var cy = (startY + y) * 0.5;
			var rx = x > cx ? x - cx : cx - x;
			var ry = y > cy ? y - cy : cy - y;
			if (rx === 0 || ry === 0) {
				// 半径0なら何もしない
				return;
			}
			this.drawEllipse(cx, cy, rx, ry, isFill);

			// カンバスのクリア
			// (ちらつき防止のためtimeoutで削除)
			setTimeout(this.own(function() {
				// カンバスをクリア
				this.clearCanvas();
			}), 0);

			// リセット
			this._trackingData = null;
		},

		//--------------------------------------------------------------
		// 楕円描画操作(塗りつぶしあり)
		//--------------------------------------------------------------
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_fillcircleDrawMove: function(context) {
			this._circleDrawMove(context, true);
		},
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_fillcircleDrawEnd: function(context) {
			this._circleDrawEnd(context, true);
		},

		//--------------------------------------------------------------
		// 図形の選択
		//--------------------------------------------------------------
		//--------------------------------
		// 選択された図形をドラッグで移動
		//--------------------------------
		/**
		 * 選択された図形のトラック操作開始
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		'.selection-rectangle h5trackstart': function(context, $el) {
			this._trackstartSelectedShape(context.event, $el);
		},

		/**
		 * 選択された図形のトラック操作
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		'.selection-rectangle h5trackmove': function(context, $el) {
			this._trackmoveSelectedShape(context.event, $el);
		},

		/**
		 * 選択された図形のトラック操作終了
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		'.selection-rectangle h5trackend': function(context, $el) {
			// トラック操作による図形の移動はそれで一つのアップデートセッションを作成する
			this.beginUpdate();
			this._trackendSelectedShape(context.event, $el);
			this.endUpdate();
			// 図形選択中なので新たなアップデートセッションを開始しておく
			this.beginUpdate();
		},

		/**
		 * トラック操作の開始。ドラッグセッションを生成する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		_trackstartSelectedShape: function(event, $el) {
			event.stopPropagation();

			var selectedShapes = this.selectionLogic.getSelected();
			if (selectedShapes.length === 0) {
				return;
			}

			// ドラッグセッションの開始
			var sessions = [];
			for (var i = 0, l = selectedShapes.length; i < l; i++) {
				sessions.push(selectedShapes[i].beginDrag());
			}

			// ドラッグ開始時の選択範囲表示要素の位置
			var selectionRectPositions = [];
			var $selectionRectangles = this.$find('.selection-rectangle');
			$selectionRectangles.each(function() {
				var $rect = $(this);
				selectionRectPositions.push({
					left: parseInt($rect.css('left')),
					top: parseInt($rect.css('top'))
				});
			});

			this._trackingData = {
				// ドラッグ開始位置
				start: {
					pageX: event.pageX,
					pageY: event.pageY,
					selectionRectPositions: selectionRectPositions,
					$selectionRectangles: $selectionRectangles
				},
				sessions: sessions,
				moved: false,
				// 選択してすぐにトラックするモードになったかどうか
				selectedWhenTrackstart: this._trackingData
						&& this._trackingData.selectedWhenTrackstart
			};
		},

		/**
		 * トラック操作。ドラッグセッションを使って図形を移動する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		_trackmoveSelectedShape: function(event, $el) {
			event.stopPropagation();
			var trackingData = this._trackingData;
			var start = trackingData.start;
			var tx = event.pageX - start.pageX;
			var ty = event.pageY - start.pageY;

			trackingData.moved = true;

			// 選択範囲表示の移動
			var selectionRectPositions = start.selectionRectPositions;
			start.$selectionRectangles.each(function(index) {
				$(this).css({
					left: selectionRectPositions[index].left + tx,
					top: selectionRectPositions[index].top + ty
				});
			});

			// 図形の移動
			var sessions = this._trackingData.sessions;
			for (var i = 0, l = sessions.length; i < l; i++) {
				sessions[i].move(tx, ty);
			}
		},

		/**
		 * トラック操作の終了。ドラッグセッションを終了する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 * @param {jQuery} $el イベントターゲット
		 */
		_trackendSelectedShape: function(event, $el) {
			event.stopPropagation();
			var trackingData = this._trackingData;
			if (!trackingData.moved) {
				if (event.ctrlKey && !trackingData.selectedWhenTrackstart) {
					// ctrlキーが押されていてかつドラッグされていない(ctrl+クリック)
					// かつ、クリックした図形が今選択されたものでなかった場合は、
					// その図形の選択を解除
					var id = $el.data('target-shape-id');
					var selectedShapes = this.getSelectedShapes();
					for (var i = 0, l = selectedShapes.length; i < l; i++) {
						var shape = selectedShapes[i];
						if (this.getShapeID(shape) == id) {
							this.unselect(shape);
							break;
						}
					}
				}
				// 動いていないなら何もしない
				this._trackingData = null;
				return;
			}
			var sessions = trackingData.sessions;
			// 図形の位置を確定
			for (var i = 0, l = sessions.length; i < l; i++) {
				sessions[i].end();
			}
			this._trackingData = null;
		},

		/**
		 * 図形の選択
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Shape|Shape[]} shapes
		 * @param {Boolean} isExclusive trueの場合は既に選択状態の図形について選択状態を解除する
		 */
		select: function(shapes, isExclusive) {
			var selectionLogic = this.selectionLogic;
			if (isExclusive) {
				selectionLogic.unselectAll();
			}
			var selected = selectionLogic.select(shapes);
			// 選択した図形を示すための要素を作成
			for (var i = 0, l = selected.length; i < l; i++) {
				var shape = selected[i];
				this._addSelectionRectangle(shape);
			}
			// 選択された図形のリストをイベントであげる
			if (selected.length) {
				this.trigger(EVENT_SELECT_SHAPE, selected);
			}
			// アップデートセッションを開始する
			this.endUpdate();
			this.beginUpdate();
		},

		/**
		 * 図形の選択状態を解除
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @param {Shape|Shape[]} shapes
		 */
		unselect: function(shapes) {
			var selectionLogic = this.selectionLogic;
			var unselected = selectionLogic.unselect(shapes);
			for (var i = 0, l = unselected.length; i < l; i++) {
				var shape = unselected[i];
				this._removeSelectionRectangle(shape);
			}
			if (unselected.length) {
				this.trigger(EVENT_UNSELECT_SHAPE, unselected);
			}
			// アップデートセッションを終了する
			this.endUpdate();
		},

		/**
		 * 全ての描画されている図形を選択状態にする
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		selectAll: function() {
			this.select(this.getAllShapes(true));
		},

		/**
		 * 全ての選択状態である図形について選択状態を解除
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 */
		unselectAll: function() {
			var selectionLogic = this.selectionLogic;
			var unselected = selectionLogic.unselectAll();
			for (var i = 0, l = unselected.length; i < l; i++) {
				this._removeSelectionRectangle(unselected[i]);
			}
			if (unselected.length) {
				this.trigger(EVENT_UNSELECT_SHAPE, unselected);
			}
			// アップデートセッションを終了する
			this.endUpdate();
		},

		/**
		 * 選択されている図形リストを取得
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @instance
		 * @returns {Shapes[]}
		 */
		getSelectedShapes: function() {
			return this.selectionLogic.getSelected();
		},
		/**
		 * セレクトモード時の選択操作
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_selectTrackstart: function(context) {
			var event = context.event;
			if (!event.ctrlKey) {
				// PC限定：ctrlキーが押されていればunselectしない
				this.unselectAll();
			}
			var trackingData = this._trackingData;
			var x = trackingData.start.x;
			var y = trackingData.start.y;
			// x,yの位置にあるshapeを取得
			var shapes = this.getAllShapes(true);
			var selectedShapes = [];
			for (var i = 0, l = shapes.length; i < l; i++) {
				var shape = shapes[i];
				if (shape.hitTest(x, y)) {
					selectedShapes.push(shape);
				}
			}
			if (selectedShapes.length) {
				// shapeがある場所の操作なら、その場所の一番前の要素を選択して終了
				this.select(selectedShapes[selectedShapes.length - 1]);
				this._trackingData.selectedWhenTrackstart = true;
				return;
			}
			// shapeが無い場所からの選択操作なら、ドラッグして選択させるようにする
			// 範囲選択用の要素を作成
			this._$selectionScopeRectangle.css({
				top: x,
				left: y,
				width: 0,
				height: 0
			});
			this._trackingData = {
				start: {
					x: x,
					y: y
				},
				trackingRect: {
					x: x,
					y: y,
					w: 0,
					h: 0
				}
			};
		},

		/**
		 * セレクトモード時のドラッグ選択操作
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_selectTrackmove: function(context) {
			var event = context.event;
			var trackingData = this._trackingData;
			var start = trackingData.start;
			var x = start.x;
			var y = start.y;
			var layersOffset = $(this._layers).offset();
			// 選択ドラッグ中はsvg要素がトップに来ているため、このイベントはsvg要素(又はその子要素)からのイベント
			// svg要素のイベントはブラウザによってはoffsetが取れないので、pageX/pageYから計算している
			var w = event.pageX - layersOffset.left - x;
			var h = event.pageY - layersOffset.top - y;
			if (w < 0) {
				w = -w;
				x = x - w;
			}
			if (h < 0) {
				h = -h;
				y = y - h;
			}
			var rect = trackingData.trackingRect;
			rect.x = x;
			rect.y = y;
			rect.w = w;
			rect.h = h;
			this._$selectionScopeRectangle.css({
				display: 'block',
				left: x,
				top: y,
				width: w,
				height: h
			});
		},

		/**
		 * セレクトモード時のドラッグ選択操作
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param {Object} context イベントコンテキスト
		 */
		_selectTrackend: function(context) {
			this._$selectionScopeRectangle.css({
				display: 'none'
			});
			// 選択範囲にある図形を列挙
			var trackingData = this._trackingData;
			var rect = trackingData.trackingRect;
			var x = rect.x;
			var y = rect.y;
			var w = rect.w;
			var h = rect.h;
			var shapes = this.getAllShapes(true);
			var containedShapes = [];
			for (var i = 0, l = shapes.length; i < l; i++) {
				var shape = shapes[i];
				if (shape.isInRect(x, y, w, h)) {
					containedShapes.push(shape);
				}
			}
			this.select(containedShapes);
		},

		/**
		 * 指定された図形について、選択範囲表示を削除する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param shape
		 */
		_removeSelectionRectangle: function(shape) {
			var id = this.getShapeID(shape);
			this.$find('.selection-rectangle[data-target-shape-id=' + id + ']').remove();
		},

		/**
		 * 指定された図形について、選択範囲表示を表示する
		 *
		 * @memberOf h5.ui.components.artboard.controller.ArtboardController
		 * @private
		 * @instance
		 * @param shape
		 */
		_addSelectionRectangle: function(shape) {
			var id = this.getShapeID(shape);
			var $selectionRectangle = $('<div class="selection-rectangle" data-target-shape-id="'
					+ id + '"></div>');
			$(this.rootElement).append($selectionRectangle);
			var bounds = shape.getBounds();
			$selectionRectangle.css({
				display: 'block',
				left: bounds.x,
				top: bounds.y,
				width: bounds.width,
				height: bounds.height
			});
		}
	};

	//------------------------------------------------------------
	// expose
	//------------------------------------------------------------
	h5.core.expose(controller);
})();
//----------------------------------------------------------------------------
// h5.ui.components.artboard.controller.ArtboardViewerController
//----------------------------------------------------------------------------
(function() {
	//------------------------------------------------------------
	// Cache
	//------------------------------------------------------------
	var ArtShape = h5.ui.components.artboard.ArtShapeConstructor.ArtShape;
	var XMLNS = h5.ui.components.artboard.consts.XMLNS;

	//------------------------------------------------------------
	// Body
	//------------------------------------------------------------
	/**
	 * Artboard部品で生成される保存データ(DrawingSaveData)を復元して表示するコントローラ
	 *
	 * @class
	 * @name h5.ui.components.artboard.controller.ArtboardViewerController
	 */
	var controller = {
		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardViewerController
		 * @private
		 */
		__name: 'h5.ui.components.artboard.controller.ArtboardViewerController',

		/**
		 * @memberOf h5.ui.components.artboard.controller.ArtboardViewerController
		 * @private
		 */
		__init: function() {
			// 表示エリアの作成
			// TODO 共通のテンプレートを使用するようにする
			this._$view = $('<div class="h5-artboard-canvas-wrapper" style="position:relative">');
			this._$layerWrapper = $('<div class="h5-artboard-layers"></div>');
			this._$bg = $('<div class="background-layer"></div>');
			this._$svg = $(document.createElementNS(XMLNS, 'svg'));
			this._$svg.attr('class', 'svg-layer');
			this._g = document.createElementNS(XMLNS, 'g');
			this._g.setAttribute('id', 'h5-artboard-id-' + new Date().getTime() + '-'
					+ parseInt(Math.random() * 10000));
			this._$svg.append(this._g);
			this._$layerWrapper.append(this._$bg);
			this._$layerWrapper.append(this._$svg);
			this._$view.append(this._$layerWrapper);
			$(this.rootElement).append(this._$view);
		},

		/**
		 * 保存データから図形を復元して描画
		 * <p>
		 * [DrawingLogic#save]{@link h5.ui.components.artboard.logic.DrawingLogic#save}
		 * などで生成したDrawingSaveDataクラスから図形をロードして描画します
		 * </p>
		 *
		 * @param {DrawingSaveData|string} artboardSaveData 保存データオブジェクトまたは保存データオブジェクトをシリアライズした文字列
		 * @memberOf h5.ui.components.artboard.controller.ArtboardViewerController
		 */
		load: function(artboardSaveData, isStretch) {
			if (typeof artboardSaveData === 'string') {
				artboardSaveData = h5.u.obj.deserialize(artboardSaveData);
			}

			// サイズの設定
			var size = artboardSaveData.size;
			if (isStretch) {
				// isStretch指定されていたらルートの大きさに固定
				this._$view.css({
					width: '100%',
					height: '100%'
				});
				// svg要素を変形させて縦横比が変わった場合、中身g要素はそれに追従せず縦横比が変わらない
				// svgの縦横比に合わせてg要素も変形する
				var viewW = this._$view.innerWidth();
				var viewH = this._$view.innerHeight();
				var orgAspectRatio = size.width / size.height;
				var viewAspectRatio = viewW / viewH;
				var isLargerViewAspect = orgAspectRatio < viewAspectRatio;
				var scaleX = isLargerViewAspect ? viewAspectRatio / orgAspectRatio : 1;
				var scaleY = isLargerViewAspect ? 1 : orgAspectRatio / viewAspectRatio;
				var transX = isLargerViewAspect ? size.height / viewH
						* (-viewW + viewH * orgAspectRatio) / 2 : 0;
				var transY = isLargerViewAspect ? 0 : size.width / viewW
						* (-viewH + viewW / orgAspectRatio) / 2;
				var transformValue = h5.u.str.format('matrix({0} 0 0 {1} {2} {3})', scaleX, scaleY,
						transX, transY);
				this._g.setAttribute('transform', transformValue);
			} else {
				// isStretch指定の無い場合はロードするデータのサイズに合わせる
				this._$view.css(size);
			}
			this._$svg[0].setAttribute('viewBox', h5.u.str.format('0 0 {0} {1}', size.width,
					size.height));

			var saveData = artboardSaveData.saveData;
			// 背景の復元
			var background = saveData.background;
			if (background) {
				if (background.color) {
					this._$bg.css('background-color', background.color);
				} else {
					this._$bg.css('background-color', 'transparent');
				}
				// 背景画像要素の生成
				this._$bg.empty();

				if (background.src) {
					var fillMode = background.fillMode;
					var layerW = this._$bg.width();
					var layerH = this._$bg.height();
					var $imgElement = $('<img>');
					var imgElement = $imgElement[0];
					$imgElement.attr('src', background.src);
					this._$bg.append(imgElement);
					var imgOnload = this.own(function() {
						var imgStyle = {
							left: background.offsetX || 0,
							top: background.offsetY || 0
						};
						var scaleX = scaleY = 1;
						if (isStretch) {
							scaleX = layerW / size.width;
							scaleY = layerH / size.height;
							imgStyle.left *= scaleX;
							imgStyle.top *= scaleY;
						}
						switch (fillMode) {
						case 'contain':
						case 'containCenter':
							// アスペクト比を維持して画像がすべて含まれるように表示
							var aspectRatio = size.width / size.height;
							var imgRate = imgElement.naturalWidth / imgElement.naturalHeight;
							if (aspectRatio < imgRate) {
								imgStyle.width = layerW;
								imgStyle.height = size.width / imgRate * scaleY;
							} else {
								imgStyle.height = layerH;
								imgStyle.width = size.height * imgRate * scaleX;
							}
							if (fillMode === 'containCenter') {
								// 中央配置
								if (aspectRatio < imgRate) {
									imgStyle.top += (layerH - imgStyle.height) / 2;
								} else {
									imgStyle.left += (layerW - imgStyle.width) / 2;
								}
							}
							break;
						case 'cover':
							// アスペクト比を維持して領域が画像で埋まるように表示
							var aspectRatio = size.width / size.height;
							var imgRate = imgElement.naturalWidth / imgElement.naturalHeight;
							if (aspectRatio < imgRate) {
								imgStyle.height = layerH;
								imgStyle.width = layerH / scaleY * imgRate * scaleX;
							} else {
								imgStyle.width = layerW;
								imgStyle.height = layerW / scaleX / imgRate * scaleY;
							}
							break;
						case 'stretch':
							// stretchの時はisStretch指定であっても描画先のサイズがいくつであっても100%指定でOK
							imgStyle.width = '100%';
							imgStyle.height = '100%';
							break;
						default:
							// 指定無しまたはnoneの場合はwidth/heightは計算しないで画像の幅、高さそのままで表示されるようにする
							if (isStretch) {
								// isStretch(表示先のサイズに合わせる)指定の場合は画面サイズに合うようにする
								imgStyle.width = imgElement.naturalWidth * scaleX;
								imgStyle.height = imgElement.naturalHeight * scaleY;
							}
						}
						$imgElement.css(imgStyle);
					});
					// img要素のロードが終わってから背景適用を実行
					if (imgElement.complete) {
						imgOnload();
					} else {
						imgElement.onload = imgOnload;
					}
				}
			}

			// Shapeの復元
			var $g = $(this._g);
			$g.empty();
			var shapes = saveData.shapes;
			for (var i = 0, l = shapes.length; i < l; i++) {
				// 図形の登録と追加
				var shape = ArtShape.deserialize(shapes[i]);
				$g.append(shape.getElement());
			}
		}
	};

	//------------------------------------------------------------
	// expose
	//------------------------------------------------------------
	h5.core.expose(controller);
})();
(function($) {

	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// TODO 別ファイルで定義されている定数・変数・関数等を別の名前で使用する場合にここに記述します。
	// 例：var getDeferred = h5.async.deferred;

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================

	// 週間の日名
	var DOW_NAME = ['日', '月', '火', '水', '木', '金', '土'];

	// 月名
	var MON_NAME = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];


	// =========================================================================
	//
	// スコープ内静的コード
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// TODO このスコープで共有される変数（クラス変数）を記述します。
	// 例：var globalCounter = 0;

	// =============================
	// スコープ内静的関数
	// =============================

	// TODO このスコープで共有される関数を記述します。
	// 例：function formatText(format, text){ ... }


	// =========================================================================
	//
	// スコープ内疑似クラス
	//
	// =========================================================================

	//TODO このスコープで使用される疑似クラス（コンストラクタ関数とそのプロトタイプ等）を記述します。

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================

	/**
	 * カレンダーコントローラ
	 *
	 * @class
	 * @name Calendar
	 * @memberOf h5.ui.components
	 */
	var calendarController = {
		/**
		 * コントローラ名(必須)
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type String
		 */
		__name: 'h5.ui.components.Calendar',

		/**
		 * 日のクラス
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type 定数
		 */
		DOW_NAME_CLASSES: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],

		/**
		 * カレンダーを添付される要素
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type
		 */
		_root: null,

		/**
		 * カレンダーでの選択方('single':特定の1日, 'continue':連続する日, 'multi':複数の日)
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type String
		 */
		selectMode: null,

		/**
		 * 選択した日付
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Array
		 */
		_selectedDates: [],

		/**
		 * 月の最初の日(表示中の日付の指定用)
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Date
		 */
		_firstDate: null,

		/**
		 * 今日
		 *
		 * @instance
		 * @memberOf h5.ui.components.Calendar
		 * @type Date
		 */
		todayDate: new Date(),

		/**
		 * ←と→のアイコン（全前の月の移動用）
		 *
		 * @instance
		 * @memberOf h5.ui.components.Calendar
		 * @type Date
		 */
		prevArrow: '\u25c4',
		nextArrow: '\u25ba',

		/**
		 * 選択できない日付
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Array
		 */
		_unselectableDates: [],

		/**
		 * Cssでカスタマイズされている週間の日
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Map
		 */
		_userCssDow: {},

		/**
		 * 特別の日
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Map (キー：日付、値：Object{CssClass、isMarker、tooltip-text})
		 */
		_specialDateMap: {},

		/**
		 * 表示される月の数
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @type Integer
		 */
		_monthCount: 1,

		/**
		 * 初期処理
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param context
		 */
		__init: function(context) {

			// 初期
			var root = this._root = $(this.rootElement);
			this.todayDate.setHours(0, 0, 0, 0);
			this.selectMode = 'single';

			// 既定のサイズを設定する
			root.addClass('calendar');

			// 全ての要素のClass
			this._coreCssClass = 'core border ';

			this._option = {
				maxRow: 6,
				maxCol: 7,
				borderSize: 1,
				cellWidth: 0,
				cellHeight: 0
			};
			var containerWidth = root[0].offsetWidth;
			var containerHeight = containerWidth;

			// カレンダーのCSSに基づいて、日のCellのサイズを計測する
			this._option.cellWidth = this._getCellSize(containerWidth, this._option.maxCol);
			this._option.cellHeight = this._getCellSize(containerHeight, this._option.maxRow + 2);
			this._option.width = containerWidth;
			this._option.height = containerHeight;

			// 選択されている月の最初の日
			this._firstDate = new Date(this.todayDate);
			this._firstDate.setDate(1);

			// Gen with number of months displayed
			this._monthCount = 1;
			this._render();
		},

		/**
		 * カレンダー部分のUIを生成する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 */
		_render: function() {
			starttime = (new Date()).getTime();

			var root = this._root;
			root.children().remove();
			var defaultGroup = this._renderMonth(this._firstDate);
			defaultGroup.attr('id', root.attr('id') + '_calendar_group0');
			root.append(defaultGroup);
			for ( var i = 1; i < this._monthCount; i++) {
				var group = this._renderMonth(this._getFirstDayOfMonth(this._firstDate, i));
				group.attr('id', root.attr('id') + '_calendar_group' + i);
				root.append(group);
			}

			endtime = (new Date()).getTime();
			console.log('_render() Function execute in ' + (endtime - starttime) + 'ms');
		},

		/**
		 * 日に基づいて、月のカレンダーを生成する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param firstDate
		 * @returns UI要素
		 */
		_renderMonth: function(firstDate) {
			var option = this._option;

			// 既定のカレンダー
			var $group = $('<table />').data('is', true);

			// タイトルを生成する。
			var $title = this._createTitleBar(firstDate);
			$group.append($title);

			// カレンダーで、最初の日を取得する（先月の日）
			var startDate = new Date(firstDate);
			var startOffset = startDate.getDay();
			if (startOffset == 0) {
				startDate.setDate(startDate.getDate() - 7);
			} else {
				startDate.setDate(startDate.getDate() - startOffset);
			}

			// Add all the cells to the calendar
			for ( var row = 0, cellIndex = 0; row < option.maxRow + 1; row++) {
				var $rowLine = $('<tr/>');
				for ( var col = 0; col < option.maxCol; col++, cellIndex++) {
					var cellDate = new Date(startDate);
					var cellClass = 'day';
					var $cell = $('<td/>');

					// row = Oの場合、週間の日付
					if (!row) {
						cellClass = 'dow';
						$cell.html(DOW_NAME[col]);
						cellDate = null;

						// Assign other properties to the cell
						$cell.addClass(this._coreCssClass + cellClass);
						$cell.css({
							height: option.cellHeight,
							lineHeight: option.cellHeight + 'px',
							borderTopWidth: option.borderSize,
							borderBottomWidth: option.borderSize,
							borderLeftWidth: (row > 0 || (!row && !col)) ? option.borderSize : 0,
							borderRightWidth: (row > 0 || (!row && col == 6)) ? option.borderSize
									: 0,
						});
					} else {
						var specialData = '';
						// Get the new date for this cell
						cellDate.setDate(cellDate.getDate() + col + ((row - 1) * option.maxCol));
						cellClass = this._createCellClass(cellDate, firstDate);
						$cell.html(cellDate.getDate());

						// 特別の日のハンドル
						if (this._specialDateMap.hasOwnProperty(cellDate)) {
							var date = this._specialDateMap[cellDate];
							for ( var i in date) {
								if (i == 'isMark') {
									if (date['isMark']) {
										$cell.append("<br/>●");
									}
								} else if (i == 'data') {
									if (date['data'] != '') {
										specialData = date['data'];
									}
								}
							}
						}

						// Assign other properties to the cell
						$cell.data('data', {
							date: cellDate,
							data: specialData
						}).addClass(this._coreCssClass + cellClass).css({
							width: option.cellWidth,
							height: option.cellHeight,
							lineHeight: option.cellHeight / 3 + 'px',
							borderWidth: option.borderSize,
						});
					}

					// Add cell to calendar
					$rowLine.append($cell);
				}
				$group.append($rowLine);
			}
			return $group;
		},

		/**
		 * 日付を基に、セルのCSSクラスを作成する。
		 *
		 * @param cellDate 日付
		 * @param firstDate 表示中の最初の日
		 * @returns String CSSクラス
		 */
		_createCellClass: function(cellDate, firstDate) {
			var cellDateTime = cellDate.getTime();

			// 日付と曜日のclassを追加する。
			var classDow = this.DOW_NAME_CLASSES[cellDate.getDay()];
			var cellClass = 'day ' + classDow;

			// 選択できないデートのハンドル
			if ($.inArray(cellDate.getTime(), this._unselectableDates) != -1) {
				cellClass += ' noday';
			} else {
				// 先月の日のハンドル
				if (firstDate.getMonth() != cellDate.getMonth()) {
					cellClass += ' outday';
				}

				// 選択したデートのハンドル
				if (this._isSelectedDateTime(cellDateTime)) {
					cellClass += ' selected';
				}

				// 今日のハンドル
				if (this.todayDate.getTime() == cellDateTime) {
					cellClass += ' today';
				}

				// 特別の日のハンドル
				if (this._specialDateMap.hasOwnProperty(cellDate)) {
					var date = this._specialDateMap[cellDate];
					if (date['cssClass'] && date['cssClass'] != 'default') {
						cellClass += ' ' + date['cssClass'];
					}
				}

				if (this._userCssDow.hasOwnProperty(classDow)) {
					cellClass += ' ' + this._userCssDow[classDow];
				}
			}
			return cellClass;
		},

		/**
		 * カレンダーのタイトルを生成する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param firstDate
		 * @param option Use for setting CSS
		 * @returns Dom要素
		 */
		_createTitleBar: function(firstDate) {
			var that = this;
			// 前後の月の最初日を取得する
			var prevFirstDate = this._getFirstDayOfMonth(firstDate, -1);
			var nextFirstDate = this._getFirstDayOfMonth(firstDate, 1);

			// Gather flags for prev/next arrows
			var showPrev = (this._compareDate(firstDate, this._firstDate) == 0);
			var lastMonthDate = this._getFirstDayOfMonth(this._firstDate, this._monthCount - 1);
			var showNext = (this._compareDate(firstDate, lastMonthDate) == 0);

			var monyearClass = this._coreCssClass + 'monyear ';
			var $title = $('<tr/>').css({
				height: this._option.cellHeight,
				lineHeight: this._option.cellHeight + 'px',
				borderWidth: this._option.borderSize,
			});
			$title.addClass(this._coreCssClass);

			// Create the arrows and title
			var $prevCell = $('<td/>').addClass(monyearClass + 'prev-arrow ');
			$prevCell.append(
					$('<a/>').addClass('prev-arrow' + (showPrev ? '' : '-off'))
							.html(this.prevArrow)).mousedown(function() {
				return false;
			}).click(function(e) {
				if (showPrev) {
					e.stopPropagation();
					that._setFirstDate(prevFirstDate);
				}
			});

			var $titleCell = $('<td colspan="5"/>').addClass(monyearClass + 'title');
			var firstDateMonth = firstDate.getMonth();
			var $monthText = $('<span/>').html(MON_NAME[firstDateMonth]);
			var $yearText = $('<span/>').html(firstDate.getFullYear());
			var $titleYearMonth = $('<div/>').append($monthText).append($yearText);
			$titleCell.append($titleYearMonth);

			var $nextCell = $('<td/>').addClass(monyearClass + 'next-arrow ');
			$nextCell.append(
					$('<a/>').addClass('next-arrow' + (showNext ? '' : '-off'))
							.html(this.nextArrow)).mousedown(function() {
				return false;
			}).click(function(e) {
				if (showNext) {
					e.stopPropagation();
					that._setFirstDate(nextFirstDate);
				}
			});

			// Add cells for prev/title/next
			$title.append($prevCell).append($titleCell).append($nextCell);
			return $title;
		},

		/**
		 * 表示中の月のカレンダーを更新する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param firstDate
		 * @returns UI要素
		 */
		_updateCalendar: function() {
			//For all class .day for update option
			var $dateDOMs = this.$find('.day');
			for ( var cnt = 0; cnt < $dateDOMs.length; cnt++) {
				var $cell = $($dateDOMs[cnt]);

				// Get value for this date
				var cellDate = $cell.data('data').date;
				var cellClass = this._createCellClass(cellDate, this._firstDate);

				var html = $cell.html();
				var isMarker = (html.split('●').length > 1);
				var specialData = $cell.data('data').data;
				var isToolTip = (specialData != '');

				// 特別の日のハンドル
				if (this._specialDateMap.hasOwnProperty(cellDate)) {
					var date = this._specialDateMap[cellDate];
					for ( var i in date) {
						if (i == 'isMark') {
							if (!isMarker && date['isMark']) {
								$cell.html(cellDate.getDate() + "<br/>●");
							}
							if (isMarker && !date['isMark']) {
								$cell.html(cellDate.getDate());
							}
						} else if (i == 'data') {
							if (specialData != date['data']) {
								$cell.data('data').data = date['data'];
							}
						}
					}
				} else {
					if (isMarker) {
						$cell.html(cellDate.getDate());
					}
					if (isToolTip) {
						$cell.data('data').data = '';
					}
				}

				var classAttr = $cell.attr('class');
				cellClass = this._coreCssClass + cellClass;
				if (classAttr != cellClass) {
					$cell.removeClass();
					$cell.addClass(this._coreCssClass + cellClass);
				}
			}
		},

		/**
		 * カレンダーで日付をクリックする処理（日付選択）
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param context
		 * @param el（クリックされた要素）
		 */
		'.day click': function(context, el) {
			context.event.stopPropagation();
			// Get the data from this cell
			var clickedData = $(el).data('data');
			this.select(clickedData.date);
		},

		/**
		 * カレンダーでマウスオーバーしたときの処理（ツールチップ表示）
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param context
		 * @param el
		 */
		'.day mouseover': function(context, el) {
			context.event.stopPropagation();
			var clickedData = $(el).data('data');
			var text = clickedData.data;
			if (text) {
				$(el).append(
						'<div class="tooltips" style="top:' + this._option.cellHeight + 'px">' + text+ '</div>');
			}
		},

		/**
		 * カレンダーでマウスアウトしたときの処理（ツールチップ削除）
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param context
		 * @param el（クリックされた要素）
		 */
		'.day mouseout': function(context, el) {
			context.event.stopPropagation();
			$(el).find(".tooltips").remove();
		},

		/**
		 * 任意のサイズ（px）に基づいて、日のUIのサイズを計測する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param _size
		 * @param _count
		 * @returns セルのサイズ 補充：カレンダーUIをテーブルで表示される。この関数をセル要素のサイズを計測する。
		 */
		_getCellSize: function(_size, _count) {
			return ((_size - 2) / _count);
		},

		/**
		 * Dateオブジェクトの比較
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date1
		 * @param date2
		 * @returns 0: date1 = date2
		 */
		_compareDate: function(date1, date2) {
			if (date1.getTime() < date2.getTime()) {
				return -1;
			}

			if (date1.getTime() > date2.getTime()) {
				return 1;
			}

			return 0;
		},

		/**
		 * 選択されていた日付を変更する
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date
		 */
		select: function(date) {
			// Get the data from this cell
			var dateTime = date.getTime();

			if ($.inArray(dateTime, this._unselectableDates) == -1) {
				var index = $.inArray(dateTime, this._selectedDates);
				if (index == -1) {
					switch (this.selectMode) {
					case 'single':
						this._selectedDates[0] = dateTime;
						break;
					case 'continue':
						if (this._selectedDates.length <= 1) {
							this._selectedDates.push(dateTime);
						} else {
							this._selectedDates[0] = this._selectedDates[1];
							this._selectedDates[1] = dateTime;
						}
						break;
					case 'multi':
						this._selectedDates.push(dateTime);
						break;
					}
				} else {
					this._selectedDates.splice(index, 1);
				}
				if (date.getMonth() == this._firstDate.getMonth()) {
					this._updateCalendar();
				} else {
					this._setFirstDate(date);
				}
			}
		},

		unselect: function(date) {
			var dateTime = date.getTime();
			var index = $.inArray(dateTime, this._selectedDates);
			if (index != -1) {
				this._selectedDates.splice(index, 1);
			}
			this._updateCalendar();
		},

		/**
		 * 表示中の月に、最初の日を設定する。表示中のカレンダーを変更する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date
		 */
		_setFirstDate: function(date) {
			this._firstDate = new Date(date);
			this._firstDate.setDate(1);
			this._render();
		},

		/**
		 * 月の最初の日を取得する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date
		 * @param offset 前後の月で設定
		 * @returns 月の最初の日
		 */
		_getFirstDayOfMonth: function(date, offset) {
			var tmpDate = new Date(date);
			// Default is no offset
			offset = offset || 0;

			tmpDate.setMonth(tmpDate.getMonth() + offset);
			tmpDate.setDate(1);

			return tmpDate;
		},

		/**
		 * 任意の年を設定する
		 *
		 * @param year
		 */
		setYear: function(year) {
			var date = new Date(year, this._firstDate.getMonth(), 1);
			this._setFirstDate(date);
		},

		/**
		 * 任意の月を設定する
		 *
		 * @param month
		 */
		setMonth: function(month) {
			var date = new Date(this._firstDate.getFullYear(), month, 1);
			this._setFirstDate(date);
		},

		setCalendar: function(year, month) {
			var date = new Date(year, month, 1);
			this._setFirstDate(date);
		},

		/**
		 * 選択モードを変更する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param mode
		 */
		setSelectMode: function(mode) {
			var tempDate;

			this.selectMode = mode;
			if (this._selectedDates.length > 0) {
				tempDate = this._selectedDates[this._selectedDates.length - 1];
				this._selectedDates = [];
				this._selectedDates.push(tempDate);
			}
		},

		/**
		 * 選択されている日付を取得する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @returns selectedDates:選択されている日付の配列
		 */
		getSelectedDate: function() {
			var dates = [];
			if (this._selectedDates.length != 0) {
				switch (this.selectMode) {
				case 'single':
					dates.push(new Date(this._selectedDates[0]));
					break;
				case 'continue':
					if (this._selectedDates.length == 1) {
						dates.push(new Date(this._selectedDates[0]));
					} else {
						var start = new Date(this._selectedDates[0]);
						var end = new Date(this._selectedDates[1]);
						//startSelectedDate > endSelectedDateの場合
						if (this._compareDate(start, end) == 1) {
							start = new Date(this._selectedDates[1]);
							end = new Date(this._selectedDates[0]);
						}

						while (start.getTime() <= end.getTime()) {
							dates.push(new Date(start));
							start = new Date(start.setDate(start.getDate() + 1));
						}
					}
					break;
				case 'multi':
					for ( var i = 0; i < this._selectedDates.length; i++) {
						dates.push(new Date(this._selectedDates[i]));
					}
					break;
				default:
					break;
				}
			}

			for ( var i = 0; i < dates.length; i++) {
				var datetime = dates[i].getTime();
				if ($.inArray(datetime, this._unselectableDates) != -1) {
					dates.splice(i, 1);
				}
			}
			return dates;
		},

		_isSelectedDateTime: function(dateTime) {
			if ($.inArray(dateTime, this._unselectableDates) != -1) {
				return false;
			}

			if (this._selectedDates.length != 0) {
				switch (this.selectMode) {
				case 'single':
					return (this._selectedDates[0] == dateTime);
					break;
				case 'continue':
					if (this._selectedDates.length == 1) {
						return (this._selectedDates[0] == dateTime);
					} else {
						var start = this._selectedDates[0];
						var end = this._selectedDates[1];
						//startSelectedDate > endSelectedDateの場合
						if (start > end) {
							start = this._selectedDates[1];
							end = this._selectedDates[0];
						}

						if (start <= dateTime && dateTime <= end) {
							return true;
						}
					}
					break;
				case 'multi':
					return ($.inArray(dateTime, this._selectedDates) != -1);
					break;
				default:
					break;
				}
			}

			return false;
		},

		/**
		 * 選択できない日付を指定する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param dates
		 */
		setSelectable: function(dates, isSelectable) {
			var dateTime;
			if (dates == undefined) {
				this._unselectableDates = [];
			} else {
				for ( var i = 0; i < dates.length; i++) {
					dateTime = dates[i].getTime();
					var index = $.inArray(dateTime, this._unselectableDates);
					if (!isSelectable) {
						if (index == -1) {
							this._unselectableDates.push(dateTime);
							var selectIndex = $.inArray(dateTime, this._selectedDates);
							if (selectIndex != -1) {
								this._selectedDates.splice(selectIndex, 1);
							}
						}
					} else {
						if (index != -1) {
							this._unselectableDates.splice(index, 1);
						}
					}
				}
			}

			this._updateCalendar();
		},

		isSelectable: function(date) {
			return ($.inArray(date.getTime(), this._unselectableDates) == -1);
		},

		/**
		 * Cssで、日付がスタイルをカスタマイズする。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param dates
		 * @param className
		 */
		setCssClass: function(dates, className) {
			var specDate = {};
			for ( var i = 0; i < dates.length; i++) {
				var date = dates[i];
				if (className == 'default') {
					if (this._specialDateMap.hasOwnProperty(date)) {
						specDate = this._specialDateMap[date];
						if (specDate.hasOwnProperty('cssClass')) {
							delete specDate['cssClass'];
						}
						if (this._getSizeOfObject(specDate) == 0) {
							delete this._specialDateMap[date];
						}
					}
				} else {
					if (this._specialDateMap.hasOwnProperty(date)) {
						specDate = this._specialDateMap[date];
						specDate['cssClass'] = className;
					} else {
						this._specialDateMap[date] = {
							cssClass: className
						};
					}
				}
			}

			this._updateCalendar();
		},

		/**
		 * Cssで、週間の日がスタイルをカスタマイズする。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param dow
		 * @param className
		 */
		setCssClassForDow: function(dow, className) {
			if (className == 'default') {
				if (this._userCssDow.hasOwnProperty(dow)) {
					delete this._userCssDow[dow];
				}
			} else {
				this._userCssDow[dow] = className;
			}
			this._updateCalendar();
		},

		/**
		 * 日付にマーカー（●）を追加する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date
		 * @param isMark
		 */
		setMarker: function(date, isMark) {
			var specDate = {};

			if (!isMark) {
				if (this._specialDateMap.hasOwnProperty(date)) {
					specDate = this._specialDateMap[date];
					if (specDate.hasOwnProperty('isMark')) {
						delete specDate['isMark'];
					}
					if (this._getSizeOfObject(specDate) == 0) {
						delete this._specialDateMap[date];
					}
				}
			} else {
				if (this._specialDateMap.hasOwnProperty(date)) {
					specDate = this._specialDateMap[date];
					specDate['isMark'] = isMark;
				} else {
					this._specialDateMap[date] = {
						isMark: isMark
					};
				}
			}

			this._updateCalendar();
		},

		/**
		 * 日付にテキスト（表示とか、ツールチップとか、のため）を追加する。
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param date
		 * @param text
		 */
		setTooltip: function(date, text) {
			var specDate = {};

			if (text == '') {
				if (this._specialDateMap.hasOwnProperty(date)) {
					specDate = this._specialDateMap[date];
					if (specDate.hasOwnProperty('data')) {
						delete specDate['data'];
					}
					if (this._getSizeOfObject(specDate) == 0) {
						delete this._specialDateMap[date];
					}
				}
			} else {
				if (this._specialDateMap.hasOwnProperty(date)) {
					specDate = this._specialDateMap[date];
					specDate['data'] = text;
				} else {
					this._specialDateMap[date] = {
						data: text
					};
				}
			}

			this._updateCalendar();
		},

		/**
		 * オブジェクトで、属性の数を取得
		 *
		 * @memberOf h5.ui.components.Calendar
		 * @param obj
		 * @returns {Number}
		 */
		_getSizeOfObject: function(obj) {
			var size = 0;
			for ( var h in obj) {
				if (obj.hasOwnProperty(h)) {
					size++;
				}
			}
			return size;
		}
	};

	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================

	h5.core.expose(calendarController);
})(jQuery);
/***************************************************************************************************
 * h5.ui.components.carousel.CarouselController
 **************************************************************************************************/
(function($) {
	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================
	/**
	 * cssのプロパティキーにベンダープレフィックスを追加 animate.jsからコピペ
	 */
	function addVenderPrefix(css, key, isOverride) {
		var _css = (isOverride) ? css : $.extend(true, {}, css);
		if (key) {
			if (typeof key == 'string') {
				key = [key];
			}
			$.each(key, function() {
				if (this in css) {
					_css['-moz-' + this] = css[this];
					_css['-webkit-' + this] = css[this];
					_css['-o-' + this] = css[this];
					_css['-ms-' + this] = css[this];
				}
			});
		} else {
			for ( var i in css) {
				_css['-moz-' + i] = css[i];
				_css['-webkit-' + i] = css[i];
				_css['-o-' + i] = css[i];
				_css['-ms-' + i] = css[i];
			}
		}
		return _css;
	}

	/**
	 * requestAnimationFrame
	 */
	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| function(func) {
				window.setTimeout(func, 15);
			};

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================
	/**
	 * ループするカルーセル部品
	 *
	 * @class
	 * @name h5.ui.components.carousel.CarouselController
	 */
	var loopCarouselController = {
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		__name: 'h5.ui.components.carousel.CarouselController',

		/**
		 * スクロールするDOM要素
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @type {jQuery}
		 */
		_$scrollingBase: null,

		/**
		 * スクロール方向(horizontal||vertical デフォルトhorizontal)
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @type {String}
		 */
		type: 'horizontal',

		/**
		 * 位置についてのcssプロパティ。leftまたはtop。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @type {String}
		 */
		_l_t: 'left',

		/**
		 * 大きさについてのcssプロパティ。WidthまたはHeight。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @type {String}
		 */
		_W_H: 'Width',

		/**
		 * アイテム要素1つのスクロール方向のサイズ(幅または高さ。デフォルト120)
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_itemSize: 120,

		/**
		 * スクロールしたかどうか。trackend時に分かるようにフラグ管理。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @type {Boolean}
		 */
		_isMoved: false,

		/**
		 * カルーセル上に配置するアイテムの表示数
		 * <p>
		 * 足りない場合は繰り返し配置する。
		 * </p>
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_visibleItemsNum: 12,

		/**
		 * スクロールを止めるフラグ
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_scrollStopFlag: false,

		/**
		 * カルーセルの左端の位置
		 */
		_startPos: 0,

		/**
		 * 繰り返しでないオリジナルのアイテムに持たせる番号
		 * <p>
		 * アイテムが右(上)に追加されるたびにアイテムにこの値を持たせてインクリメントする
		 * </p>
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_lastIndex: 0,

		/**
		 * 繰り返しでないオリジナルのアイテムに持たせる番号
		 * <p>
		 * アイテムが左(下)に追加されるたびにこの値をデクリメントしてアイテムに持たせる
		 * </p>
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_firstIndex: 0,

		/**
		 * アイテムに振るID
		 */
		_seq: 0,

		/**
		 * 空になった時に表示する要素
		 */
		_$emptyGuide: null,

		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		__construct: function(context) {
			// 初期設定
			var option = context.args;
			this.type = (option && option.type) || this.type;
			this._l_t = this.type == 'horizontal' ? 'left' : 'top';
			this._W_H = this.type == 'horizontal' ? 'Width' : 'Height';
			this._itemSize = (option && option.itemSize) || this._itemSize;
			this._visibleItemsNum = (option && option.minItemsNum) || this._visibleItemsNum;
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		__ready: function(context) {
			// 初期設定
			var $root = $(this.rootElement);
			// カルーセル部分のスタイル
			var style = {
				overflow: 'hidden'
			};
			//			style[this.type == 'horizontal' ? 'height' : 'width'] = '100%';
			//			$root.css(style);

			// scrollingBaseの追加
			var _$scrollingBase = $('<div class="scrollingBase"></div>');
			_$scrollingBase.css({
				display: 'block',
				height: '100%',
				width: '100%',
				position: 'relative',
				top: 0,
				left: 0
			});

			// IE7用
			$root.css('position', 'relative');

			// 要素が空の時に表示するガイドがあればそれを取得
			var $emptyGuide = this.$find('.empty-guide');
			if ($emptyGuide.length) {
				this._$emptyGuide = $emptyGuide.clone();
				// scrollingBaseを追加するのでいったん削除
				$emptyGuide.remove();
			}

			// scrollingBaseを追加する前に元あった要素を取得
			var $items = $root.children();

			// scrollingBaseの追加
			$root.append(_$scrollingBase);
			this._$scrollingBase = _$scrollingBase;

			// カルーセルの左端の位置を計算
			this._startPos = -this._itemSize * (parseInt(this._visibleItemsNum / 2) - 0.5)
					+ $(this.rootElement)['inner' + this._W_H]() / 2;

			// DOMに記述されている子要素はアイテム化して、元のは消す
			var $clone = $items.clone();
			if ($clone.length) {
				this.appendItem($clone);
			} else {
				if (this._$emptyGuide) {
					// scrollingBaseの上に置かれるようにスタイル調整
					this._$emptyGuide.css({
						position: 'absolute',
						top: 0,
						left: 0
					});
					$(this.rootElement).append(this._$emptyGuide);
				}
			}
			$items.remove();
		},

		/**
		 * アイテムの右(上)端の位置
		 */
		_getLastPos: function() {
			var $last = this._$scrollingBase.find('.carousel-item-wrapper:last');
			return $last.length ? parseInt($last.css(this._l_t)) + this._itemSize : this._startPos;
		},

		/**
		 * アイテムの左(下)端の位置
		 */
		_getFirstPos: function() {
			var $first = this._$scrollingBase.find('.carousel-item-wrapper:first');
			return $first.length ? parseInt($first.css(this._l_t)) : this._startPos;
		},

		/**
		 * 現在繰り返し配置されているものを削除
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_removeRepeatItems: function() {
			// オリジナル要素がリピート要素によって分断されている場合、左(上)側に移動する
			var $scrollingBase = this._$scrollingBase;
			var $items = $scrollingBase.children();
			var $first = $items.eq(0);
			var $last = $items.eq(-1);
			var $repeatItems = $items.filter('.carousel-repeat');
			if ($repeatItems.length && !$first.hasClass('carousel-repeat')
					&& !$last.hasClass('carousel-repeat')) {
				while (!$last.hasClass('carousel-repeat')) {
					$last.css(this._l_t, this._getFirstPos() - this._itemSize);
					$scrollingBase.prepend($last);
					$last = $scrollingBase.children().eq(-1);
				}
			}

			// 削除
			$repeatItems.remove();
		},

		/**
		 * 現在保持しているアイテムが、最低アイテム数未満であれば、繰り返し配置する。このメソッドを呼んだ時点で配置されているものを繰り返し配置する。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_itemRepeatRefresh: function() {
			var $scrollingBase = this._$scrollingBase;
			var $items = $scrollingBase.children();
			if (!$items.length || ($items.length > this._visibleItemsNum)
					|| $items.contents('.carousel-repeat').length) {
				// 一つもアイテムがないまたは既に表示数だけあるまたはリピート用アイテムが配置済み場合はなにもしない
				// リピートが配置されているときはすでに表示数分繰り返されている(またはその配置途中)。
				return;
			}

			// 現在繰り返し配置されているものを削除
			this._removeRepeatItems();

			// アイテムが表示数を超えるまで繰り返し要素の生成
			var $repeats = $();
			while ($scrollingBase.children().length + $repeats.length < this._visibleItemsNum) {
				var $clone = $items.clone();
				$clone.addClass('carousel-repeat');
				// コピー元のitem-idを持たせる
				$items.each(function(i) {
					$clone.eq(i).data('item-id', $items.eq(i).data('item-id'));
				});
				$repeats = $repeats.add($clone);
			}

			// 繰り返し要素を追加していく
			// append先が可視範囲外ならprependして追加する
			var prepend = false;
			while ($repeats.length) {
				var $target;
				if (prepend
						|| !this._isVisible(parseInt($scrollingBase.children().eq(-1)
								.css(this._l_t))
								+ this._itemSize)) {
					prepend = true;
					$target = $repeats.eq(-1);
					$repeats.splice($repeats.length - 1, 1);
				} else {
					$target = $repeats.eq(0);
					$repeats.splice(0, 1);
				}
				this._addItem($target, prepend, true);
			}
		},

		/**
		 * 表示されているアイテムのサイズ等を更新する
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_itemViewRefresh: function(isMinusScroll) {
			if (!this._$scrollingBase.children().length) {
				return;
			}
			if (isMinusScroll == null) {
				// スクロール方向の指定がない場合は両方
				this._itemViewRefresh(true);
				this._itemViewRefresh(false);
				return;
			}
			// 右(下)への移動なら可視範囲左(上)端、左(上)への移動なら可視範囲右(上)端に見えているアイテム要素を取得する
			// もし取得できない(=要素がない)なら反対端のものと差し替える。
			// 1度にアイテムの大きさ以上のスクロールが起きたら、その分差し替えないといけないので端がアイテム要素になるまでループする。
			var $item;
			while (!($item = this._getVisibleStartOrEndItem(isMinusScroll))) {
				// 端に何も要素がないなら要素を動的に追加
				$item = $('<div class="carousel-item-wrapper"></div>');
				this._addItem($item, !isMinusScroll, true, true);
				// ダミー要素が端にあるなら中身を反対端のものに差し替える
				var $replaceTaget = null;
				var itemLT = isMinusScroll ? Infinity : -Infinity;
				var l_t = this._l_t;
				this._$scrollingBase.find('.carousel-item-wrapper:not(.dummy)').each(function() {
					var lt = parseInt($(this).css(l_t));
					if (isMinusScroll && lt < itemLT || !isMinusScroll && lt > itemLT) {
						itemLT = lt;
						$replaceTaget = $(this);
					}
				});
				$item.children().remove();
				$item.append($replaceTaget.children());
				$item.addClass($replaceTaget.attr('class'));
				$item.attr('data-item-id', $replaceTaget.attr('data-item-id'));

				$replaceTaget.remove();
			}
		},

		/**
		 * アイテムの大きさ、位置を更新
		 * <p>
		 * 真ん中に近ければ近いほど大きくし、横幅を詰める
		 * </p>
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_itemTransFormRefresh: function() {
			// 真ん中を大きく、端を小さくする
			var l_t = this._l_t;
			var W_H = this._W_H;
			var viewWH = $(this._$scrollingBase)['inner' + W_H]();
			var itemSize = this._itemSize;
			var scrollLT = parseInt(this._$scrollingBase.css(l_t));
			var that = this;
			this._$scrollingBase.children().each(
					function() {
						var $this = $(this);
						// 可視範囲外なら何もしない
						if (!that._isVisible(parseInt($this.css(l_t)))) {
							return;
						}
						// アイテムの真ん中の位置
						var itemViewPos = scrollLT + parseInt($this.css(l_t)) + itemSize / 2;

						// 可視範囲真ん中からの距離
						var distFromCenter = Math.abs(viewWH / 2 - itemViewPos);
						// 拡大率
						var scale = 1 - distFromCenter / viewWH;
						// 0.1以下は見えなくする(scale=0にする)
						scale = scale < 0.1 ? 0 : scale;
						// 透明度の設定
						var opacity = scale ? Math.min(1, (scale * 2 - 0.1)) : 0;
						// 横を詰める
						var transDist = scale ? ((itemViewPos > viewWH / 2 ? -1 : 1) * (1 - scale)
								* (1 - scale) * viewWH / 2) : 0;
						var styleObj = $.extend({
							opacity: opacity
						}, addVenderPrefix({
							transform: h5.u.str
									.format('matrix({0},0,0,{0},{1})', scale,
											this.type == 'horizontal' ? '0,' + transDist
													: transDist + ',0')
						}));
						$(this).css(styleObj);
					});
		},

		/**
		 * アイテムを後ろに追加
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param elm
		 */
		appendItem: function(elm) {
			this._addItem(elm);
			this._itemViewRefresh();
		},
		/**
		 * アイテムを前に追加
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param elm
		 */
		prependItem: function(elm) {
			this._addItem(elm, true);
			this._itemViewRefresh();
		},

		/**
		 * アイテムを削除
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param elm DOM要素
		 */
		removeItem: function(elm) {
			// 繰り返し要素が渡された場合はそのオリジナルを消す
			var $elm = this._getOriginalItemElement(elm);


			// 繰り返し要素を削除
			this._removeRepeatItems();
			var l_t = this._l_t;
			var itemSize = this._itemSize;
			// 詰める
			this._$scrollingBase.children().each(function() {
				var targetPos = parseInt($(this).css(l_t));
				if (targetPos > parseInt($elm.css(l_t))) {
					// 削除対象要素より右(下)にある要素の位置を左(上)に詰める
					$(this).css(l_t, targetPos - itemSize);
				}
			});
			// 削除
			$elm.remove();
			if (!this._$scrollingBase.children().length) {
				// すべて削除されたとき
				if (this._$emptyGuide) {
					$(this.rootElement).append(this._$emptyGuide);
				}
				return;
			}
			this._itemRepeatRefresh();
			this._itemViewRefresh();
			this._itemTransFormRefresh();
		},

		/**
		 * 繰り返しのために生成された要素からオリジナルのアイテムを取得
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @returns jQueryObject
		 */
		_getOriginalItemElement: function(elm) {
			var id = $(elm).attr('data-item-id');
			return this._$scrollingBase.find('>[data-item-id="' + id + '"]:not(.carousel-repeat)');
		},

		/**
		 * 指定された数値をleft(上下スクロールの場合はtop)に指定した時に可視範囲に入るかどうかを返す
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_isVisible: function(lt) {
			// 可視範囲は要素が全て同じ大きさ(scaleが1)の場合よりも広くなる。
			// (scaleが全て1なら-itemSize～$scrollingBase.width()の範囲になる。)
			// (scaleを小さくして、真ん中に寄せているため、その外側も見えるようになる。)
			// ここではアイテムの大きさ3倍分大きく取っている。(3.5倍は3倍+アイテムの真ん中の位置にするための0.5))
			var abs_lt = lt + parseInt(this._$scrollingBase.css(this._l_t));
			return -3.5 * this._itemSize < abs_lt
					&& abs_lt < this._$scrollingBase['inner' + this._W_H]() + 3.5 * this._itemSize;
		},

		/**
		 * アイテムを追加する。アイテム追加前後で繰り返し要素についての処理を行うかどうかを第3引数で指定する
		 *
		 * @private
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param elm 追加する要素
		 * @param prepend trueなら前に追加
		 * @param forRepeat 繰り返し要素の配置かどうか
		 * @param forFill スクロール中に端に要素がないときの補てん時のための追加かどうか
		 * @returns
		 */
		_addItem: function(elm, prepend, forRepeat, forFill) {
			if (!elm || elm.length === 0) {
				return;
			}
			// 空の時に表示するものは削除
			this.$find('.empty-guide').remove();
			if (!forRepeat) {
				// リピートやダミーではなく、普通のアイテムの追加の場合は繰り返し要素を削除てから追加する
				// そうでない場合は、リピート用のアイテムを削除してから追加する
				this._removeRepeatItems();
			}
			var $elm = $(elm);
			for (var i = 0, len = $elm.length; i < len; i++) {
				// ラップされてなかったらラップする
				var $item = $elm.eq(i);
				if (!$item.hasClass('carousel-item-wrapper')) {
					$item = $('<div class="carousel-item-wrapper"></div>');
					$item.append($(elm)[i]);
				}

				// imgタグとaタグにunselectable="on"を指定(IE8-用)
				// 繰り返しの要素またはスクロール時の補てんであれば設定済み
				$item.find('a,img').attr('unselectable', 'on');

				// アイテムをカルーセルに追加する
				// アイテムはposition:absolute
				// 位置は、すでに配置済みのものの数を数えて、そのすぐ横または下に配置
				var style = {
					position: 'absolute'
				};
				// アイテムはすべて同じ大きさとして計算
				var l_t = this._l_t;
				if (prepend) {
					style[l_t] = this._getFirstPos() - this._itemSize;
				} else {
					style[l_t] = this._getLastPos();
				}
				// アイテムのスタイル決定
				$item.css(style);
				// アイテムの追加
				this._$scrollingBase[prepend ? 'prepend' : 'append']($item);
				if (!forRepeat && !forFill) {
					// 新たに追加された要素の場合はidを振る　
					$item.attr('data-item-id', this._createItemId());
				}

			}
			if (!forRepeat) {
				this._itemRepeatRefresh();
			}
			// トランスフォームのリフレッシュ
			if (!forFill) {
				this._itemTransFormRefresh();
			}
		},

		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_createItemId: function() {
			return this._seq++;
		},

		/**
		 * isEndがtrueなら見えているアイテムの右(下)端のアイテム要素を返す。 falseなら見えているアイテムの左(上)端のアイテム要素を返す。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_getVisibleStartOrEndItem: function(isEnd) {
			var _$scrollingBase = this._$scrollingBase;
			var l_t = this._l_t;
			var W_H = this._W_H;
			var itemSize = this._itemSize;
			var scrollingLT = parseInt(_$scrollingBase.css(l_t));
			// transformで中心に寄せているので0～rootElement.width(height)の外側も見えている。
			// 見えている位置は、見えているアイテムの数から計算する
			var pos = $(this.rootElement)['inner' + W_H]() / 2 + (isEnd ? 1 : -1) * this._itemSize
					* this._visibleItemsNum / 2;
			var ret = null;
			this._$scrollingBase.children().each(function() {
				var itemAbsPos = scrollingLT + parseInt($(this).css(l_t));
				if (pos <= itemAbsPos + itemSize && itemAbsPos <= pos) {
					ret = $(this);
					return false;
				}
			});
			return ret;
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		_h5trackstart: function(context) {
			context.event.preventDefault();
			this._isScrolling = true;
		},
		/**
		 * h5trackmoveから呼ばれた場合はcontextを引数にとる。メソッド呼び出しで数値を渡しても動作する。
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		_h5trackmove: function(context) {
			context.event.preventDefault();
			this.scroll(context.event[this.type == 'horizontal' ? 'dx' : 'dy']);
		},

		scrollStart: function(forward) {
			var d = (forward ? 1 : -1) * 4;
			this._isScrolling = true;
			this._scrollStopFlag = false;
			var that = this;
			function doAnimation() {
				that._move(d);
				if (!that._scrollStopFlag) {
					requestAnimationFrame(doAnimation);
				} else {
					that._isScrolling = false;
				}
			}
			requestAnimationFrame(doAnimation);
		},

		scrollStop: function() {
			this._isMoved = false;
			this._scrollStopFlag = true;
		},

		_move: function(d) {
			var $base = this._$scrollingBase;
			if (!$base.children().length) {
				// アイテムがないなら何もしない
				return;
			}
			var style = {};
			style[this._l_t] = (parseFloat($base.css(this._l_t)) || 0) + d;
			$base.css(style);

			// 可視範囲に表示するものの更新
			this._itemViewRefresh(d < 0);
			// トランスフォーム更新
			this._itemTransFormRefresh();
		},

		scrollToByElm: function(elm, isAnimation) {
			var $elm = $(elm);
			// スクロールする距離を求める
			var d = (this._$scrollingBase['inner' + this._W_H]() - this._itemSize) / 2
					- parseInt($elm.css(this._l_t)) + parseInt(this._$scrollingBase.css(this._l_t));
			this.scroll(d, isAnimation);
			this._recalcPosition();
		},

		scroll: function(d, isAnimation) {
			if (!d) {
				// 0またはそれ以外のfalse相当の値なら何もしない
				return;
			}
			// アニメーション
			if (isAnimation) {
				function f(frame) {
					return d * (1 - Math.cos(0.2 * Math.PI / 2));
				}
				var scrolled = 0;
				var frame = 0;
				var that = this;
				function doAnimation() {
					var diff = f(frame++);
					scrolled += diff;
					that._move(diff);
					if (diff !== 0 && Math.abs(scrolled) < Math.abs(d)) {
						requestAnimationFrame(doAnimation);
					} else {
						that._recalcPosition();
					}
				}
				requestAnimationFrame(doAnimation);
				return;
			}
			this._move(d);
		},

		/**
		 * セレクタにマッチする要素のアイテムへ移動
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param selector
		 * @param isAnimation アニメーションを付けるかどうか
		 */
		scrollToMatchElement: function(selector, isAnimation) {
			var target = null;
			// セレクタにマッチする要素のうち、一番真ん中に近い要素を選択する
			var W_H = this._W_H;
			var l_t = this._l_t;
			var viewWH = $(this._$scrollingBase)['inner' + W_H]();
			var scrollLT = parseInt(this._$scrollingBase.css(l_t));
			var itemSize = this._itemSize;
			var minDist = Infinity;
			this._$scrollingBase.children().each(function() {
				var $this = $(this);
				if ($(this).children().filter(selector).length) {
					// アイテムの真ん中の位置
					var itemViewPos = scrollLT + parseInt($this.css(l_t)) + itemSize / 2;
					// 可視範囲真ん中からの距離
					var distFromCenter = Math.abs(viewWH / 2 - itemViewPos);
					if (minDist > distFromCenter) {
						minDist = distFromCenter;
						target = this;
					}
				}
			});
			if (target) {
				this.scrollToByElm(target, isAnimation);
			}
		},

		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		_h5trackend: function(context) {
			var that = this;

			// フラグを元に戻す。
			// trackend直後にclickのイベントが発火するので、ここですぐfalseにしてしまうとclick時にはフラグが無くなっている。
			// 動いたかどうかのフラグ(_isMoved)は非同期で元に戻して、clickのイベントハンドラで分かるようにしておく。
			this._isScrolling = false;
			setTimeout(function() {
				that._isMoved = false;
			}, 0);
			this._recalcPosition();
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 */
		_recalcPosition: function() {
			var d = parseFloat(this._$scrollingBase.css(this._l_t));
			this._$scrollingBase.css(this._l_t, 0);
			var that = this;
			this._$scrollingBase.children().each(function() {
				var lt = parseFloat($(this).css(that._l_t));
				$(this).css(that._l_t, lt + d);
			});
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'{rootElement} h5trackstart': function(context) {
			this._h5trackstart(context);
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'{rootElement} h5trackmove': function(context) {
			// h5trackend時に動いたかどうか分かるようにしておく
			this._isMoved = true;
			this._h5trackmove(context);
		},
		/**
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'{rootElement} h5trackend': function(context, $el) {
			this._h5trackend(context);
		},
		/**
		 * スクロール中の画面遷移をキャンセル
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'a click': function(context) {
			// スクロール中、またはscrollend時に該当するスクロール操作でスクロールされた場合はpreventDefault()
			if (this._isScrolling || this._isMoved) {
				context.event.preventDefault();
			}
		},
		/**
		 * スクロール中の画面遷移をキャンセル
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'a mousestart': function(context) {
			context.event.preventDefault();
		},
		/**
		 * リンク遷移(タッチ用)
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'a touchend': function(context, $el) {
			if (!this._isScrolling && !this._isMoved) {
				location.href = $el.attr('href');
			}
		},
		/**
		 * リンク遷移(タッチ用)
		 *
		 * @memberOf h5.ui.components.carousel.CarouselController
		 * @param context
		 */
		'a mouseup': function(context, $el) {
			if (!this._isScrolling && !this._isMoved) {
				location.href = $el.attr('href');
			}
		}
	};

	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(loopCarouselController);
})(jQuery);
(function($) {

	var CLIP_PATH_URL_FORMAT = 'url(#{0})';

	var TRANSLATE_FORMAT = 'translate({0},{1})';

	var h5format = h5.u.str.format;

	// -------------------------------------------------------------------------
	// for SVG
	// -------------------------------------------------------------------------

	/**
	 * SVG用描画コントローラ
	 * 
	 * @class
	 * @memberOf h5.ui.components.chart
	 * @name SVGRenderer
	 */
	var svgRenderer = {
		/**
		 * SVG用描画コントローラであるか
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @returns {Boolean}
		 */
		isSvg: true,

		/**
		 * SVG要素を生成します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param props
		 * @returns
		 */
		createGraphicRootElm: function(props) {
			return this._createSvgElm('svg', props);
		},

		createGraphicElm: function(name, attrs) {
			return this._createSvgElm(name, attrs);
		},

		/**
		 * SVG要素を生成します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param attrs
		 * @returns
		 */
		createGroupElm: function(attrs) {
			return this._createSvgElm('g', attrs);
		},

		appendGroupElm: function(attrs, $elem) {
			return $elem.append(this._createSvgElm('g', attrs));
		},


		/**
		 * @param $elem translateを設定するjQuery要素
		 * @param x x座標
		 * @param y y座標
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 */
		setTranslate: function($elem, x, y) {
			if (isNaN(x) || isNaN(y)) {
				throw new Error('value is NaN');
			}
			$elem.attr('transform', h5format(TRANSLATE_FORMAT, x, y));
		},

		/**
		 * 指定したタグ名の要素を生成します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param name SVG要素名
		 * @returns 指定したSVG要素のオブジェクト
		 */
		_createSvgElm: function(name, attrs) {
			var elem = document.createElementNS('http://www.w3.org/2000/svg', name);
			this.attr(elem, attrs)
			return elem;
		},

		_appendSvgElm: function(name, attrs, $parent) {
			var elem = this._createSvgElm(name, attrs);
			$parent.append(elem);
		},

		/**
		 * LINE要素を追加します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param x1 x1属性
		 * @param y1 y1属性
		 * @param x2 x2属性
		 * @param y2 y2属性
		 * @param stroke stroke属性
		 * @param attrs その他の属性を持つオブジェクト
		 */
		createLineElm: function(x1, y1, x2, y2, stroke, attrs) {
			var attributes = attrs != null ? attrs : {};
			return this._createSvgElm('line', $.extend(attributes, {
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2,
				stroke: stroke || undefined
			}));
		},

		/**
		 * RECT要素を追加します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param x x属性
		 * @param y y属性
		 * @param width width属性
		 * @param height height属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @param $parent 追加する親属性
		 */
		appendLineElm: function(x1, y1, x2, y2, stroke, attrs, $parent) {
			var elem = this.createLineElm(x1, y1, x2, y2, stroke, attrs);
			$parent.append(elem);
		},

		createRectElm: function(x, y, width, height, fill, attrs) {
			var attributes = attrs != null ? attrs : {};

			return this._createSvgElm('rect', $.extend(attributes, {
				x: x,
				y: y,
				width: width,
				height: height,
				fill: fill || null
			}));
		},
		/**
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param x x属性
		 * @param y y属性
		 * @param width width属性
		 * @param height height属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @param $parent 追加する親属性
		 */
		appendRectElm: function(x, y, width, height, fill, attrs, $parent) {
			var elem = this.createRectElm(x, y, width, height, fill, attrs);
			$parent.append(elem);
		},

		/**
		 * TEXT要素を作成します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param str 表示する文字列
		 * @param x x属性
		 * @param y y属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @returns TEXT要素
		 */
		createTextElm: function(str, x, y, fill, attrs) {
			var attributes = attrs != null ? attrs : {};

			var $text = $(this._createSvgElm('text', $.extend(attributes, {
				x: x || 0,
				y: y || 0,
				fill: fill || undefined
			})));
			this._appendTextSpans(str, $text, x || 0);
			return $text[0];
		},

		/**
		 * TEXT要素を追加します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param str 表示する文字列
		 * @param x x属性
		 * @param y y属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @param $parent 追加する親属性
		 */
		appendTextElm: function(str, x, y, fill, attrs, $parent) {
			var elem = this.createTextElm(str, x, y, fill, attrs);
			$parent.append(elem);
		},

		/**
		 * TEXT要素の位置を設定する
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param elem TEXT要素
		 * @param x x座標
		 * @param y y座標
		 */
		setTextPosition: function(elem, x, y, attrs) {
			this.attr(elem, $.extend(attrs, {
				x: x,
				y: y
			}));
			$(elem).find('tspan').each(function() {
				$(this).attr('x', x);
			});
		},

		text: function(str, $elm) {
			$elm.empty();
			this._appendTextSpans(str, $elm, $elm.attr('x'));
		},

		_appendTextSpans: function(str, $text, x) {
			var arr = str.split('<br>');
			if (arr.length === 1) {
				$text.text(str);
				return;
			}

			for (var i = 0, len = arr.length; i < len; i++) {
				var $elem = $(this._createSvgElm('tspan', {
					x: x,
					dy: i === 0 ? 0 : 10
				}));
				$elem.text(arr[i]);
				$text.append($elem);
			}
		},

		createPathElm: function(d, attrs) {
			var attributes = attrs != null ? attrs : {};

			return this._createSvgElm('path', $.extend(attributes, {
				d: d
			}));
		},

		appendPathElm: function(d, attrs, $parent) {
			var elem = this.createPathElm(d, attrs);
			$parent.append(elem);
		},

		clip: function($elm, clipElm, id, $root) {
			var clipPath = this._createSvgElm('clipPath', {
				id: id
			});
			clipPath.appendChild(clipElm);
			var $defs = this._getOrCreateDefElm($root);
			$defs.append(clipPath);
			$elm.css('clip-path', h5format(CLIP_PATH_URL_FORMAT, id))
		},

		gradient: function(id, attrs, $root) {
			var $defs = this._getOrCreateDefElm($root);
			var $linearGradient = $(this._createSvgElm('linearGradient', {
				id: id,
				x1: attrs.x1,
				y1: attrs.y1,
				x2: attrs.x2,
				y2: attrs.y2
			}));
			$defs.append($linearGradient);
			var stops = attrs.stops || [];
			for (var i = 0, len = stops.length; i < len; i++) {
				$linearGradient.append(this._createSvgElm('stop', {
					offset: stops[i].offset,
					style: 'stop-color:' + stops[i].color + ';'
				}));
			}
			return 'url(#' + id + ')';
		},

		_getOrCreateDefElm: function($root) {
			var $defs = $root.find('defs');
			if ($defs.length === 0) {
				$defs = $(this._createSvgElm('defs'));
				$root.prepend($defs);
			}
			return $defs;
		},

		/**
		 * 要素に属性をセットする
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param elem {Element} 属性をセットする要素
		 * @param attrs {Object} 属性とその値
		 */
		attr: function(elem, attrs) {
			for ( var name in attrs) {
				elem.setAttribute(name, attrs[name]);
			}
		},


		css: function(elem, styles) {
			for ( var name in styles) {
				elem.style[name] = styles[name];
			}
		},

		/**
		 * 要素の幅を取得します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param elem {Element} SVG要素
		 * @returns {Number} 要素の幅
		 */
		getWidthOf: function(elem) {
			if (elem == null) {
				return null;
			}
			return elem.getBBox().width;
		},

		/**
		 * 要素の高さを取得します
		 * 
		 * @memberOf h5.ui.components.chart.SVGRenderer
		 * @param elem {Element} SVG要素
		 * @returns {Number} 要素の高さ
		 */
		getHeightOf: function(elem) {
			if (elem == null) {
				return null;
			}
			return elem.getBBox().height;
		}
	};

	// -------------------------------------------------------------------------
	// for VML
	// -------------------------------------------------------------------------
	/**
	 * VML用描画コントローラ
	 * 
	 * @class
	 * @memberOf h5.ui
	 * @name VMLRenderer
	 */
	var vmlRenderer = {
		isSvg: false,

		/**
		 * VMLのルート要素(DIV)を生成します
		 * 
		 * @param props
		 */
		createGraphicRootElm: function(props) {
			var elem = document.createElement('div');
			for ( var name in props) {
				if (name === 'width' || name === 'height') {
					elem.style[name] = props[name];
					continue;
				}
				elem.setAttribute(name, props[name]);
			}
			return elem;
		},

		/**
		 * GROUP要素を生成します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param attrs
		 * @returns
		 */
		createGroupElm: function(attrs) {
			return this._createVmlElm('group', attrs);
		},

		createLineElm: function(x1, y1, x2, y2, stroke, attrs) {
			var attributes = attrs != null ? attrs : {};

			return this._createVmlElm('line', $.extend(attributes, {
				from: x1 + ',' + y1,
				to: x2 + ',' + y2,
				strokecolor: stroke
			}));
		},

		/**
		 * LINE要素を追加する
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param x1 x1属性
		 * @param y1 y1属性
		 * @param x2 x2属性
		 * @param y2 y2属性
		 * @param stroke stroke属性
		 * @param attrs その他の属性を持つオブジェクト
		 */
		appendLineElm: function(x1, y1, x2, y2, stroke, attrs, $parent) {
			$parent[0].appendChild(this.createLineElm(x1, y1, x2, y2, stroke, attrs));
		},

		createRectElm: function(x, y, width, height, fill, attrs) {
			var attributes = attrs != null ? attrs : {};

			var elem = this._createVmlElm('rect', $.extend(attributes, {
				fillcolor: fill || null,
				strokecolor: '#fff'
			}));

			return this.css(elem, {
				width: width,
				height: height,
				left: x,
				top: y,
				position: 'absolute'
			});
		},

		appendRectElm: function(x, y, width, height, fill, attrs, $parent) {
			$parent[0].appendChild(this.createRectElm(x, y, width, height, fill, attrs));
		},

		createShapeElm: function(attrs) {
			return this._createVmlElm('shape', attrs);
		},

		/**
		 * テキストを作成する
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param str 表示する文字列
		 * @param x x属性
		 * @param y y属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @returns テキスト要素
		 */
		createTextElm: function(str, x, y, fill, attrs) {
			if (attrs == null) {
				attrs = {};
			}

			var fontSize = attrs['font-size'];
			if (fontSize) {
				delete attrs['font-size'];
			}

			var text = this._createVmlElm('textbox', attrs);

			this.css(text, {
				top: y || 0,
				position: 'absolute',
				fontSize: fontSize || null
			});
			text.innerHTML = str;
			// text-anchorの値に応じて位置を変更
			if (x != null) {
				this._setTextXPosition(text, attrs['text-anchor'], x);
			}

			return text;
		},

		/**
		 * 追加する
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param str 表示する文字列
		 * @param x x属性
		 * @param y y属性
		 * @param fill fill属性
		 * @param attrs その他の属性を持つオブジェクト
		 * @param $parent 追加する親属性
		 */
		appendTextElm: function(str, x, y, fill, attrs, $parent) {
			var text = this.createTextElm(str, x, y, fill, attrs);
			$parent[0].appendChild(text);
			// text-anchorの値に応じて位置を変更
			if (x != null) {
				this._setTextXPosition(text, attrs['text-anchor'], x);
			}

		},

		text: function(str, $elm) {
			var textAnchor = $elm.attr('text-anchor');
			// 最初に指定した位置を取得
			var x = this._getTextPosition($elm, textAnchor);
			$elm[0].innerHTML = str;
			// textAnchorの値によって位置を設定
			this._setTextXPosition($elm[0], textAnchor, x);
		},

		/**
		 * TEXT要素の位置を設定する
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem TEXT要素
		 * @param x x座標
		 * @param y y座標
		 * @parms attrs 属性
		 */
		setTextPosition: function(elem, x, y, attrs) {
			this.css(elem, {
				top: y
			});
			var textAnchor = attrs ? attrs['text-anchor'] : null;
			this._setTextXPosition(elem, textAnchor, x);
		},

		_getTextPosition: function($text, textAnchor) {
			var left = parseInt($text.css('left'));
			if (textAnchor == null) {
				return left;
			}

			switch (textAnchor) {
			case 'strat':
				return left;
				break;
			case 'middle':
				return left + $text[0].clientWidth / 2;
				break;
			case 'end':
				return -parseInt($text.css('right'));
			default:
				return left;
			}
		},

		_setTextXPosition: function(text, textAnchor, x) {
			if (textAnchor == null) {
				this.css(text, {
					left: x
				});
				return;
			}

			switch (textAnchor) {
			case 'strat':
				this.css(text, {
					left: x
				});
				break;
			case 'middle':
				var width = text.clientWidth;
				this.css(text, {
					left: x - width / 2
				});
				break;
			case 'end':
				this.css(text, {
					right: -x
				});
				break;
			default:
				this.css(text, {
					left: x
				});
			}
		},


		/**
		 * FILL要素を生成し、指定された要素に追加します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem
		 * @param props
		 * @returns
		 */
		fill: function(elem, props) {
			var fill = this._createVmlElm('fill');
			elem.appendChild(fill);
			$.extend(fill, props);
		},

		/**
		 * STROKE要 指定された要素に追加します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem
		 * @param props
		 * @returns
		 */
		stroke: function(elem, props) {
			var stroke = this._createVmlElm('stroke');
			elem.appendChild(stroke);
			$.extend(stroke, props);
		},

		gradient: function(id, attrs) {
			var color = null;
			var color2 = null;
			var colors = [];

			var stops = attrs.stops;
			for (var i = 0, len = stops.length; i < len; i++) {
				var offset;
				// 百分率(%なし)に直した値に変更
				if (h5.u.str.endsWith(stops[i].offset, '%')) {
					// %はとる
					offset = parseInt(stops[i].offset.slice(0, -1), 10);
				} else {
					offset = stops[i].offset * 100;
				}

				if (isNaN(offset)) {
					// 不正な値を指定した時
					// TODO: 例外の出し方は全体的に見直して一括で修正する
					throw new Error('offsetに不正な値を指定しています: 値 = ' + stops[i].offset);
				}

				if (offset <= 0) {
					color = stops[i].color;
				} else if (offset >= 100) {
					color2 = stops[i].color;
				} else {
					colors.push(offset + '% ' + stops[i].color);
				}
			}
			return {
				type: 'gradient',
				color: color,
				color2: color2,
				colors: colors.join(', ')
			};
		},

		/**
		 * 指定されたタグ名の要素を生成します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param name
		 * @param attrs
		 * @returns {DOM} DOM要素
		 */
		_createVmlElm: function(name, attrs) {
			var elem = document.createElement('v:' + name);
			this.attr(elem, attrs);
			return elem;
		},

		/**
		 * ルート要素を生成し、指定された要素に追加します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param name
		 * @param attrs
		 * @param parent
		 * @returns {DOM} ルート要素
		 */
		_appendVmlElm: function(name, attrs, parent) {
			var elem = this._createVmlElm(name, attrs);
			parent.appendChild(elem);
			return elem;
		},

		/**
		 * LINE要素の生成に必要な情報を持つDataItemまたはObservableItemからLINE要素を生成し、 指定されたGROUP要素に追加します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param lines {DataItem|ObservableItem} LINE要素の生成に必要な情報を持つDataItemまたはObservableItemオブジェクト
		 * @param g {DOM} GROUP要素
		 */
		appendLines: function(lines, g) {
			for (var i = 0, len = lines.length; i < len; i++) {
				this._appendLineElm(lines[i].get('fromX'), lines[i].get('fromY'), lines[i]
						.get('toX'), lines[i].get('toY'), '#000', {
					id: h5format(LINE_ELM_ID_FORMAT, lines[i].get('id'))
				}, g);
			}
		},

		/**
		 * LEFTプロパティに値を設定します
		 * 
		 * @param $elem translateを設定するjQuery要素
		 * @param x x座標
		 * @param y y座標
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 */
		setTranslate: function($elem, x, y) {
			$elem.css({
				left: x,
				top: y
			});
		},

		/**
		 * 要素に属性をセットする
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem {Element} 属性をセットする要素
		 * @param attrs {Object} 属性とその値
		 */
		attr: function(elem, attrs) {
			for ( var name in attrs) {
				if (name === 'class') {
					// IE7のsetAttributeはclassが設定できないバグがあるため、classNameプロパティに設定する
					elem.className = attrs[name];
				} else {
					elem.setAttribute(name, attrs[name]);
				}
			}
		},

		css: function(elem, styles) {
			for ( var name in styles) {
				elem.style[name] = styles[name];
			}
			return elem;
		},

		/**
		 * 要素の幅を取得します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem {Element} VML要素
		 * @returns {Number} 要素の幅
		 */
		getWidthOf: function(elem) {
			return this._getWidthOrHeightOf(elem, 'Width');
		},

		/**
		 * 要素の高さを取得します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem {Element} VML要素
		 * @returns {Number} 要素の高さ
		 */
		getHeightOf: function(elem) {
			return this._getWidthOrHeightOf(elem, 'Height');
		},

		/**
		 * 要素の高さまたは幅を取得します
		 * 
		 * @memberOf h5.ui.components.chart.VMLRenderer
		 * @param elem {Element} VML要素
		 * @param type 'Height' or 'Width'
		 * @returns {Number} 要素の高さ
		 */
		_getWidthOrHeightOf: function(elem, type) {
			if (elem == null) {
				return null;
			}

			return elem['offset' + type];
		}
	};

	var graphicRenderer;
	if (!document.createElementNS
			|| !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
		graphicRenderer = vmlRenderer;
		document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
	} else {
		graphicRenderer = svgRenderer;
	}

	h5.u.obj.expose('h5.ui.components.chart', {
		SVGRenderer: svgRenderer,
		VMLRenderer: vmlRenderer,
		GraphicRenderer: graphicRenderer
	});
})(jQuery);
(function($) {

	var LINE_ELM_ID_FORMAT = 'line_{0}';
	var RECT_ELM_ID_FORMAT = 'rect_{0}';

	var VERT_LINE_ELM_ID_FORMAT = 'vert_line_{0}';
	var X_LABEL_ELM_ID_FORMAT = 'x_label_{0}';

	var TOOLTIP_TIME_FORMAT = '{0}-{1}';
	var TOOLTIP_OPEN_CLOSE_FORMAT = 'Open/Close= {0}/{1}';
	var TOOLTIP_HIGH_LOW_FORMAT = 'High/Low= {0}/{1}';

	var PATH_LINE_FORMAT = 'L {0} {1} ';

	var CHARACTER_HEIGHT = 11; // テキスト要素は下に位置を合わせるため、上に位置を合わせるときにこの定数を足す

	/** X軸のラベル領域のデフォルトの高さ */
	var DEFAULT_X_LABEL_HEIGHT = 32;
	/** Y軸のラベル領域のデフォルトの幅 */
	var DEFAULT_Y_LABEL_WIDTH = 120;

	/** Y軸のラベルのマージンのデフォルト */
	var DEFAULT_Y_LABEL_MARGIN_RIGHT = 5;
	var DEFAULT_Y_LABEL_MARGIN_LEFT = 0;

	/** X軸のラベルのマージンのデフォルト */
	var DEFAULT_X_LABEL_MARGIN_TOP = 0;
	var DEFAULT_X_LABEL_MARGIN_BOTTOM = 0;

	/** チャートのマージンのデフォルト */
	var DEFAULT_CHART_MARGIN_TOP = 10;
	var DEFAULT_CHART_MARGIN_BOTTOM = 0;
	var DEFAULT_CHART_MARGIN_LEFT = 0;
	var DEFAULT_CHART_MARGIN_RIGHT = 0;

	var TOOLTIP_MARGIN = {
		TOP: 10,
		LEFT: 10
	};

	// ツールチップのpaddingのデフォルト値
	var DEFAULT_TOOLTIP_PADDING_TOP = 5;
	var DEFAULT_TOOLTIP_PADDING_BOTTOM = 5;
	var DEFAULT_TOOLTIP_PADDING_LEFT = 8;
	var DEFAULT_TOOLTIP_PADDING_RIGHT = 8;

	var SERIES_PREFIX = '_series';

	var STACKED_CHART_TYPES = ['stacked_line', 'stacked_bar'];


	// 変数のインポート
	var h5format = h5.u.str.format;
	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| function(func) {
				window.setTimeout(func, 15);
			};

	var graphicRenderer = h5.ui.components.chart.GraphicRenderer;

	var chartDataModelManager = h5.core.data.createManager('ChartDataManager');

	/**
	 * chartの設定に関するデータアイテム
	 */
	var chartSettingsSchema = {

		rangeMin: {
			type: 'number'
		},
		rangeMax: {
			type: 'number'
		},

		/**
		 * y軸の最小値
		 */
		minVal: {
			type: 'number',
			defaultValue: Infinity
		},
		/**
		 * y軸の最大値
		 */
		maxVal: {
			type: 'number',
			defaultValue: -Infinity
		},
		/**
		 * candleの中心のx軸方向の間隔
		 */
		dx: {
			depend: {
				on: ['dispDataSize', 'width'],
				calc: function() {
					return this.get('width') / this.get('dispDataSize');
				}
			}
		},
		dispDataSize: {
			type: 'integer'
		},
		vertLineNum: {
			type: 'integer'
		},
		horizLineNum: {
			type: 'integer'
		},
		keepDataSize: {
			type: 'integer'
		},

		movedNum: {
			type: 'integer',
			defaultValue: 0
		},

		/**
		 * 描画領域の高さ
		 */
		height: {
			type: 'number'
		},
		/**
		 * 描画領域の幅
		 */
		width: {
			type: 'number'
		},

		translateX: {
			defalutValue: 0
		},

		timeInterval: {
			type: 'integer'
		},
		/**
		 * 補助線の色
		 */
		additionalLineColor: {
			type: 'string'
		}
	};


	/**
	 * ローソク表示用データを保持するモ
	 * 
	 * @name chartModel
	 */
	var candleStickSchema = {
		id: {
			id: true,
			type: 'integer'
		},
		rectX: {
			type: 'number',
			depend: {
				on: ['rectWidth', 'lineX'],
				calc: function() {
					return this.get('lineX') - this.get('rectWidth') / 2;
				}
			}
		},
		rectY: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		rectWidth: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		rectHeight: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		fill: {
			type: 'string'
		},
		lineX: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		lineY1: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		lineY2: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		time: {
			type: 'string'
		}
	};

	var lineSchema = {
		id: {
			id: true,
			type: 'integer'
		},
		fromX: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		toX: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		fromY: {
			type: 'number',
			constraint: {
				notNull: true
			}
		},
		toY: {
			type: 'number',
			constraint: {
				notNull: true
			}
		}
	};

	/**
	 * グループ内でのY座標の位置を計算します
	 * 
	 * @param val 値
	 * @param rangeMin 領域の最小値
	 * @param rangeMax 領域の最大値
	 * @param height Y軸の高さ
	 * @returns {Number} 値が対応するY座標
	 */
	function calcYPos(val, rangeMin, rangeMax, height) {
		return -(val * 1000 - rangeMin * 1000) / (rangeMax * 1000 - rangeMin * 1000) * height
				+ height;
	}

	/**
	 * ２つの値からグループ内でのY座標の位置の差を計算します
	 * 
	 * @param val1 値1
	 * @param val2 値2
	 * @param rangeMin 領域の最小値
	 * @param rangeMax 領域の最大値
	 * @param height Y軸の高さ
	 * @returns {Number} Y座標の位置の差
	 */
	function calcYDiff(val1, val2, rangeMin, rangeMax, height) {
		return Math.abs(val1 * 1000 - val2 * 1000) / (rangeMax * 1000 - rangeMin * 1000) * height;
	}

	function sortById(items) {
		var ret = [];
		for (var i = 0, iLen = items.length; i < iLen; i++) {
			var item = items[i];
			var id = item.get('id');
			var inserted = false;
			for (var j = 0, jLen = ret.length; j < jLen; j++) {
				if (id < ret[j].get('id')) {
					ret.splice(j, 0, item);
					inserted = true;
					break;
				}
			}
			if (!inserted) {
				ret.push(item);
			}
		}
		return ret;
	}

	/**
	 * 指定したマージンの値を取得する
	 * 
	 * @param {Object} obj マージンのプロパティを持つオブジェクト
	 * @param {String} type margin/paddingのいずれか
	 * @param {String} prop Top/Bottom/Left/Rightのいずれか
	 * @returns マージンの値
	 */
	function getMarginOrPadding(obj, type, prop) {
		if (obj == null) {
			return null;
		}
		if (obj[type + prop] != null) {
			return obj[type + prop];
		}

		return obj[type] || null;
	}


	var dataSourceCounter = 0;

	function DataSource(name, seriesSetting, number) {
		this.name = name;
		this.seriesSetting = seriesSetting;
		this.number = number;

		// 右端がkeepDataSizeで指定したIDになるようにシーケンスを作成する
		// 指定されていなければ、単純に左端が１からになるようにする
		var keepDataSize = seriesSetting.keepDataSize || 0;
		var startIndex = Math.max(keepDataSize - seriesSetting.data.length, 0) + 1;
		this.sequence = h5.core.data.createSequence(startIndex);
		this.xLabelArray = null;
	}

	DataSource.prototype = {
		getData: function(series) {
			var that = this;
			this._getData(series).done(function(data) {
				that.convertToModel(series.type, data, series.propNames);
			});
		},

		/**
		 * チャート 行
		 * 
		 * @memberOf
		 * @returns Promiseオブジェクト
		 */
		_getData: function(series) {
			var dfd = $.Deferred();

			if (series.data == null) {
				// 初期表示データの取得
				h5.ajax({
					type: 'GET',
					dataType: 'text',
					url: series.url
				}).done(function(data) {
					dfd.resolve();
				});
			} else {
				var len = series.data.length;

				var keepDataSize = this.manager.chartSetting.get('keepDataSize');
				var _data = keepDataSize == null ? series.data : series.data.slice(Math.max(0, len
						- keepDataSize));

				if (this.manager.chartSetting.get('dispDataSize') == null) {
					this.manager.chartSetting.set('dispDataSize', _data.length);
				}
				dfd.resolve(_data);
			}
			return dfd.promise();
		},

		convertToModel: function(type, data, propNames) {
			var modelBaseName = 'dataModel';
			this._type = type.toLowerCase();
			switch (this._type) {
			case 'ohlc':
				this.propNames = propNames || {};
				this.highProp = this.propNames.high || 'high';
				this.lowProp = this.propNames.low || 'low';
				this.xProp = this.propNames.time || 'time';
				break;
			case 'stacked_line':
			case 'line':
				this.propNames = propNames || {
					x: 'x',
					y: 'y'
				};
				this.xProp = this.propNames.x || 'x';
				this.highProp = 'y';
				this.lowProp = 'y';
				break;
			default:
				modelBaseName = '';
				break;
			}

			if (!data || data.length === 0) {
				// 空データを渡された場合は、dataModelの作成を行わない
				// 次回データがaddされたときに作成を行う
				return;
			}

			var schema = this._createSchema(data[0]);

			var modelName = modelBaseName + '_' + this.name + '_' + dataSourceCounter;
			dataSourceCounter++;

			if (this.dataModel != null) {
				chartDataModelManager.dropModel(this.dataModel.name);
			}

			this.dataModel = chartDataModelManager.createModel({
				name: modelName,
				schema: schema
			});

			this._calcDataItem(data, propNames);
		},

		getDataObj: function(id) {
			if (!this.dataModel) {
				return null;
			}

			var item = this.dataModel.get(id);
			if (!item) {
				return null;
			}
			var obj = item.get();
			delete obj.id;
			for ( var name in obj) {
				// propNamesに従ってobjのプロパティを書き換える
				if (this.propNames[name] && this.propNames[name] != name) {
					obj[this.propNames[name]] = obj[name];
					delete obj[name];
				}
			}
			return obj;
		},

		createItem: function(data, chartSetting) {
			var arr = [data];

			if (!this.dataModel || this.dataModel.size === 0) {
				// データモデルが未生成の場合は新規に作成する
				this.convertToModel(this._type, arr, this.propNames);
				return this.dataModel.get(this.sequence.current() - 1);
			}

			return this._calcDataItem(arr, this.propNames)[0];
		},

		_createSchema: function(data) {
			var schema = {};
			for ( var name in data) {
				if (data.hasOwnProperty(name)) {
					var propName = name;
					for ( var key in this.propNames) {
						if (this.propNames[key] === name) {
							schema[key] = null;
						}
					}
					schema[propName] = null;
				}
			}
			schema.id = {
				id: true,
				type: 'integer'
			};
			return schema;
		},

		_calcDataItem: function(data, prop) {
			var arr = [];

			var chartSetting = this.manager.chartSetting;
			var dispDataSize = chartSetting.get('dispDataSize');
			var minVal = Infinity;
			var maxVal = -Infinity;

			for (var i = 0, len = data.length; i < len; i++) {
				var obj = this._toData(data[i], prop);
				arr.push(obj);
				if (len - dispDataSize <= i) {
					var lowVal = this._getStackedVal(obj, this.lowProp);
					if (lowVal != null) {
						minVal = Math.min(minVal, lowVal);
					}
					var highVal = this._getStackedVal(obj, this.highProp);
					if (highVal != null) {
						maxVal = Math.max(maxVal, highVal);
					}
				}
			}

			if (!this.seriesSetting.axis || !this.seriesSetting.axis.yaixs
					|| this.seriesSetting.axis.yaxis.autoScale !== false) {
				chartSetting.set({
					minVal: Math.min(minVal, chartSetting.get('minVal')),
					maxVal: Math.max(maxVal, chartSetting.get('maxVal'))
				});
			}

			return this.dataModel.create(arr);
		},

		_getStackedVal: function(obj, propName) {
			if (obj[propName] == null) {
				// 存在しないプロパティを指定時はnullを返す
				return null;
			}

			if ($.inArray(this._type, STACKED_CHART_TYPES) === -1) {
				return obj[propName];
			}
			return obj[propName]
					+ this.manager.getStackedData(obj.id, propName, this.number)[propName];
		},

		_toData: function(data, prop) {
			var ret = {
				id: this.sequence.next()
			};

			if (!prop) {
				return $.extend(ret, data);
			}

			for ( var name in data) {
				var propName = name;
				ret[propName] = data[name];
				for ( var key in prop) {
					if (prop[key] === name) {
						propName = key;
						ret[key] = data[name];
						break;
					}
				}
			}
			return ret;
		},

		getStackedData: function(item) {
			return this.manager.getStackedData(item.get('id'), this.propNames.y, this.number);
		},

		getMaxAndMinVals: function(rightEndId, dispDataSize) {
			var maxVal = -Infinity;
			var minVal = Infinity;

			if (this.dataModel) {

				var current = rightEndId || this.sequence.current();
				var item = null;
				// 表示対象の中で、最大・最小を求める
				for (var i = current - dispDataSize + 1; i <= current; i++) {
					item = this.dataModel.get(i);
					if (item === null) {
						continue;
					}

					var high = item.get(this.highProp).toString();
					var low = item.get(this.lowProp).toString();


					if (high != null && high > maxVal) {
						maxVal = high;
					}
					if (low != null && low < minVal) {
						minVal = low;
					}
				}
			}
			return {
				maxVal: maxVal,
				minVal: minVal
			};
		},

		getXVal: function(idOrItem) {
			if (idOrItem == null) {
				return null;
			}
			var item;
			if (typeof (idOrItem.getModel) === 'function' && idOrItem.getModel() === this.dataModel) {
				item = idOrItem;
			} else {
				item = this.dataModel.get(idOrItem);
			}
			return item.get(this.xProp);
		},

		checkRange: function(addedItem, removedItem, dispDataSize, rightEndId) {
			if (this.seriesSetting.axis && this.seriesSetting.axis.yaixs
					&& this.seriesSetting.axis.yaxis.autoScale === false) {
				return;
			}

			var removedHigh = removedItem ? removedItem.get(this.highProp) : null;
			var removedLow = removedItem ? removedItem.get(this.lowProp) : null;

			this.manager.checkRange(addedItem.get(this.highProp), addedItem.get(this.lowProp),
					removedHigh, removedLow, rightEndId, dispDataSize);
		}
	};

	/**
	 * @class
	 * @param chartSetting 設定
	 * @name dataSourceManager
	 */
	function DataSourceManager(chartSetting) {
		this._count = 0;
		this._map = {};
		this.chartSetting = chartSetting;

		for ( var modelName in chartDataModelManager.models) {
			chartDataModelManager.dropModel(modelName);
		}
	}

	DataSourceManager.prototype = {
		checkRange: function(adderdMax, addedMin, removedMax, removedMin, rightEndId) {
			if (this._isUpdateRange(adderdMax, addedMin, removedMax, removedMin)) {
				this.setRange(rightEndId);
			}
		},

		setRange: function(rightEndId) {
			this.chartSetting.set(this.getMaxAndMinVals(rightEndId, this.chartSetting
					.get('dispDataSize')));
		},

		_isUpdateRange: function(adderdMax, addedMin, removedMax, removedMin) {
			var maxVal = this.chartSetting.get('maxVal');
			var minVal = this.chartSetting.get('minVal');
			return adderdMax > maxVal || addedMin < minVal || removedMax === maxVal
					|| removedMin === minVal;
		},

		getAllDataSources: function() {
			return this._map;
		},

		getStackedData: function(id, yProp, number) {
			var stackedVal = 0;
			for ( var name in this._map) {
				var dataSource = this._map[name];
				if (dataSource.number < number) {
					stackedVal += dataSource.dataModel.get(id).get(yProp);
				}
			}

			var ret = {};
			ret.id = id;
			ret[yProp] = stackedVal;
			return ret;
		},

		createDataSource: function(seriesSetting) {
			var name = seriesSetting.name;
			this._map[name] = new DataSource(name, seriesSetting, this._count);
			this._map[name].manager = this;
			this._count++;
			return this._map[name];
		},

		removeDataSource: function(name) {
			delete this._map[name];
		},

		getDataSource: function(name) {
			return this._map[name];
		},

		getMaxAndMinVals: function(rightEndId, dispDataSize) {
			var dataSources = this._map;

			var maxAndMinVals = {
				maxVal: -Infinity,
				minVal: Infinity
			};
			for ( var name in dataSources) {
				var vals = dataSources[name].getMaxAndMinVals(rightEndId, dispDataSize);
				maxAndMinVals = {
					maxVal: Math.max(vals.maxVal, maxAndMinVals.maxVal),
					minVal: Math.min(vals.minVal, maxAndMinVals.minVal)
				};
			}
			return maxAndMinVals;
		}
	};


	// チャートレンダラ―の定義

	var rendererNum = 0;

	function getDefaultTooltip(data) {
		var time = h5format(TOOLTIP_TIME_FORMAT, data.openTime, data.closeTime);
		var open_close = h5format(TOOLTIP_OPEN_CLOSE_FORMAT, data.open, data.close);
		var high_low = h5format(TOOLTIP_HIGH_LOW_FORMAT, data.high, data.low);
		return time + '<br>' + open_close + '<br>' + high_low;
	}


	function createChartRenderer(rootElement, dataSource, chartSetting, seriesSetting, schema,
			prototype) {

		function ChartRendererBase(rootElement, dataSource, chartSetting, seriesSetting, schema) {
			this.dataSource = dataSource;
			this.name = dataSource.name;
			this.chartSetting = chartSetting;
			this.rootElement = rootElement;
			this.seriesSetting = seriesSetting;
			this.isReadyToAdd = false;

			if (!graphicRenderer.isSvg) {
				this.COORDSIZE = this.chartSetting.get('width') + ' '
						+ this.chartSetting.get('height');
			}

			this.chartModel = chartDataModelManager.createModel({
				name: 'chartModel_' + rendererNum + '_' + this.name,
				schema: schema
			});

			rendererNum++;

			var that = this;
			this.chartModel.addEventListener('itemsChange', function(ev) {
				that._chartModelChangeListener.apply(that, [ev]);
			});

			this.leftEndCandleStickId = Infinity;

			if (this.seriesSetting.mouseover) {
				this._setTooltipSetting(this.seriesSetting.mouseover.tooltip);
			}
		}

		ChartRendererBase.prototype = {
			_setTooltipSetting: function(tooltip) {
				if (tooltip == null) {
					return;
				}

				if (tooltip === false) {
					this._tooltipSetting = false;
					return;
				}

				var setting = $.extend({}, tooltip, true);

				setting.paddingLeft = getMarginOrPadding(tooltip, 'padding', 'Left');
				if (setting.paddingLeft == null) {
					setting.paddingLeft = DEFAULT_TOOLTIP_PADDING_LEFT;
				}
				setting.paddingRight = getMarginOrPadding(tooltip, 'padding', 'Right');
				if (setting.paddingRight == null) {
					setting.paddingRight = DEFAULT_TOOLTIP_PADDING_RIGHT;
				}
				setting.paddingTop = getMarginOrPadding(tooltip, 'padding', 'Top');
				if (setting.paddingTop == null) {
					setting.paddingTop = DEFAULT_TOOLTIP_PADDING_TOP;
				}
				setting.paddingBottom = getMarginOrPadding(tooltip, 'padding', 'Bottom');
				if (setting.paddingBottom == null) {
					setting.paddingBottom = DEFAULT_TOOLTIP_PADDING_BOTTOM;
				}

				setting.tooltipWidth = tooltip.width;
				setting.tooltipHeight = tooltip.height;

				setting.showTooltip = tooltip.content || getDefaultTooltip;

				this._tooltipSetting = setting;
			},

			addData: function(data) {
				var dataSource = this.dataSource;

				// データを1つ分受け取って、チャートを更新する
				var item = dataSource.createItem(data, this.chartSetting);

				this.updateChart(item);

				dataSource.dataModel.remove(item.get('id') - this.chartSetting.get('keepDataSize'));
			},

			updateChart: function(addedItem, removedItemId, isRightEndRemove) {
				// ローソク情報を計算する
				var chartItem = this.createItem(addedItem);

				this.getXLabelArray();

				// チャートのローソクを更新する
				var dispDataSize = this.chartSetting.get('dispDataSize');
				if (removedItemId == null) {
					// 表示範囲の左端のIDを取得
					removedItemId = addedItem.get('id') - dispDataSize
							- this.chartSetting.get('movedNum');
					isRightEndRemove = false;
				}
				this.removeChartElm(removedItemId);

				var removedItem = this.dataSource.dataModel.get(removedItemId);

				var rightEndId = isRightEndRemove ? removedItemId - 1 : addedItem.get('id');
				this.dataSource.checkRange(addedItem, removedItem, dispDataSize, rightEndId);

				this._appendChart([chartItem]);
			},


			updateYVal: function() {
				chartDataModelManager.beginUpdate();
				for ( var id in this.chartModel.items) {
					var intId = parseInt(id);
					// 描画範囲のローソクは座標情報を計算する
					var item = this.dataSource.dataModel.get(intId);
					var chartItem = this.chartModel.get(intId);
					if (chartItem != null) {
						chartItem.set(this.toData(item));
					}
				}
				chartDataModelManager.endUpdate();
			},

			removeChartElm: function(id) {
				var $root = $(this.rootElement);

				this.chartModel.remove(id);

				$(this.rootElement).trigger('removeTooltip', id);

				// TODO: ID体系、DOM構成見直し. ローソクには同じクラス名あてたほうがよいかも。
				$root.find('#' + h5format(LINE_ELM_ID_FORMAT, id)).remove();
				$root.find('#' + h5format(RECT_ELM_ID_FORMAT, id)).remove();
				$root.find('#' + h5format(VERT_LINE_ELM_ID_FORMAT, id)).remove();
				$root.find('#' + h5format(X_LABEL_ELM_ID_FORMAT, id)).remove();
			},

			getTargetId: function(context, type, correction) {
				if (graphicRenderer.isSvg && type !== 'line') {
					return context.event.target.id.split('_')[1];
				}
				var ev = context.event;
				var t = ev.currentTarget;

				var top = t.offsetTop || t.clientTop;
				var left = t.offsetLeft || t.clientLeft;

				if (graphicRenderer.isSvg && !h5.env.ua.isIE) {
					top -= correction.top;
					left -= correction.left;
				}

				var oy = ev.offsetY;
				var ox = ev.offsetX;

				var items = this.chartModel.toArray();
				for (var i = items.length - 1; 0 <= i; i--) {
					var r = this.getRectPos(items[i]);
					if (r.sx - left <= ox && ox <= r.ex - left && r.sy - top - 1 <= oy
							&& oy <= r.ey - top + 1) {
						return items[i].get('id');
					}
				}
			},

			showToolTip: function(tooltipId, $tooltip) {
				if (!this._tooltipSetting) {
					return;
				}

				var chartItem = this.chartModel.get(tooltipId);

				if (chartItem == null) {
					return;
				}

				$tooltip.empty();

				var dataItem = this.dataSource.dataModel.get(tooltipId);
				var content = this._tooltipSetting.showTooltip(dataItem.get());

				var elem = graphicRenderer.createTextElm(content, null, null, '#000', {
					'font-size': 11
				});
				graphicRenderer.css(elem, {
					'white-space': 'nowrap'
				});

				var $elem = $(elem);
				$tooltip.append($elem);

				var tooltipWidth = this._tooltipSetting.width;
				if (tooltipWidth == null) {
					tooltipWidth = graphicRenderer.getWidthOf(elem)
							+ this._tooltipSetting.paddingLeft + this._tooltipSetting.paddingRight;
				}
				var tooltipHeight = this._tooltipSetting.height;
				if (tooltipHeight == null) {
					tooltipHeight = graphicRenderer.getHeightOf(elem)
							+ this._tooltipSetting.paddingTop + this._tooltipSetting.paddingBottom;
				}

				$elem.remove();

				var coord = this._getCentralPos(chartItem);
				if (coord.x + tooltipWidth + TOOLTIP_MARGIN.LEFT > -this.chartSetting
						.get('translateX')
						+ this.chartSetting.get('width')) {
					coord.x -= (tooltipWidth + TOOLTIP_MARGIN.LEFT);
				} else {
					coord.x += TOOLTIP_MARGIN.LEFT;
				}

				if (coord.y + tooltipHeight + TOOLTIP_MARGIN.TOP > this.chartSetting.get('height')) {
					coord.y -= (tooltipHeight + TOOLTIP_MARGIN.TOP);
				} else {
					coord.y += TOOLTIP_MARGIN.TOP;
				}

				graphicRenderer.appendRectElm(coord.x, coord.y, tooltipWidth, tooltipHeight,
						'#eee', null, $tooltip);

				var textX = coord.x + this._tooltipSetting.paddingLeft;
				var textY = coord.y + this._tooltipSetting.paddingTop;
				if (graphicRenderer.isSvg) {
					textY += CHARACTER_HEIGHT; // textがrectから+11ずれる
				}
				graphicRenderer.setTextPosition(elem, textX, textY);
				$tooltip.append(elem);

				this._appendHighLight(chartItem, $tooltip);
				this.showAdditionalLine(tooltipId, $tooltip);
			},

			showAdditionalLine: function(tooltipId, $tooltip) {
				var chartItem = this.chartModel.get(tooltipId);
				var pos = this._getCentralPos(chartItem);
				var lineColor = this.chartSetting.get('additionalLineColor');

				// Y軸に補助線を引く
				$tooltip.prepend(this._createTooltipHorizeLine(tooltipId));
				// X軸に補助線を引く
				$tooltip.prepend(graphicRenderer.createLineElm(pos.x, 0, pos.x, this.chartSetting
						.get('height'), lineColor, {
					'class': 'tooltipVertLine'
				}));
			},

			updateTooltip: function(tooltipId, $tooltip) {
				if (!this._tooltipSetting) {
					return;
				}

				// Y軸の補助線を更新
				$tooltip.find('.tooltipHorizeLine').replaceWith(
						this._createTooltipHorizeLine(tooltipId));
			},

			_createTooltipHorizeLine: function(tooltipId) {
				var chartItem = this.chartModel.get(tooltipId);
				var pos = this._getCentralPos(chartItem);
				var startX = Math.abs(this.chartSetting.get('translateX'));
				var lineColor = this.chartSetting.get('additionalLineColor');
				return graphicRenderer.createLineElm(startX, pos.y, startX
						+ this.chartSetting.get('width'), pos.y, lineColor, {
					'class': 'tooltipHorizeLine'
				});
			},


			getXLabelArray: function() {
				var vertLineNum = this.chartSetting.get('vertLineNum');

				if (vertLineNum === 0) {
					return;
				}

				if (this.xLabelArray == null) {
					this.xLabelArray = h5.core.data.createObservableArray();
				} else if (this.xLabelArray.length - 1 != vertLineNum) {
					this.xLabelArray.copyFrom([]);
				}

				var rightItemId = this.dataSource.sequence.current() - 1;

				var dispSizeNum = this.chartSetting.get('dispDataSize');

				var itemInterval = (dispSizeNum - 1) / vertLineNum;
				var id = rightItemId - dispSizeNum + 1;
				for (var i = 0; i <= vertLineNum; i++) {
					var item = this.dataSource.getDataObj(id);
					id += itemInterval;
					this.xLabelArray.set(i, {
						value: item ? item[this.dataSource.xProp] : '', // 表示するデータがなければ空文字
						item: item
					});
				}

				return this.xLabelArray;
			},

			_rectPath: function(rect) {
				var left = parseInt(rect.left);
				var top = parseInt(rect.top);
				var right = parseInt(rect.left + rect.width);
				var bottom = parseInt(rect.top + rect.height);

				return h5format('m {0} {1} l {2} {3} {4} {5} {6} {7} {8} {9} e', left, top, right,
						top, right, bottom, left, bottom, left, top);
			}
		};

		$.extend(ChartRendererBase.prototype, prototype);
		return new ChartRendererBase(rootElement, dataSource, chartSetting, seriesSetting, schema);
	}

	// ローソクチャートのレンダラ―
	function createCandleStickChartRenderer(rootElement, dataSource, chartSetting, seriesSetting) {
		return createChartRenderer(
				rootElement,
				dataSource,
				chartSetting,
				seriesSetting,
				candleStickSchema,
				{
					_getCentralPos: function(chartItem) {
						return {
							x: chartItem.get('rectX') + (chartItem.get('rectWidth') / 2),
							y: chartItem.get('rectY') + (chartItem.get('rectHeight') / 2)
						};
					},

					/**
					 * ーソク を生成する
					 * 
					 * @memberOf candleStickRenderer
					 */
					createCandleStickDataItems: function() {
						this.chartModel.removeAll();

						if (!this.dataSource.dataModel) {
							return;
						}

						var candleStickData = [];
						var current = this.dataSource.sequence.current();
						for ( var id in this.dataSource.dataModel.items) {
							if (id >= current - this.chartSetting.get('dispDataSize')) {
								// 描画範囲のローソクは座標情報を計算する
								var dataItem = this.dataSource.dataModel.items[id];
								candleStickData.push(this.toData(dataItem));
							}
						}
						this.chartModel.create(candleStickData);
					},

					createItem: function(dataItem) {
						return this.chartModel.create(this.toData(dataItem));
					},

					/**
					 * * ロ ータを取得す
					 * 
					 * @memberOf candleStickRenderer
					 * @param {object} chart チャート情報
					 * @returns {object} ローソクの座標情報
					 */
					toData: function(chartDataItem) {
						var id = chartDataItem.get('id');
						var open = chartDataItem.get('open');
						var close = chartDataItem.get('close');
						var time = chartDataItem.get(this.dataSource.xProp);

						return $.extend(this._calcCandleYValues(chartDataItem), {
							id: id,
							rectWidth: this.chartSetting.get('dx') * 0.8,
							fill: open > close ? 'blue' : open === close ? 'black' : 'red',
							lineX: id * this.chartSetting.get('dx')
									+ this.chartSetting.get('width'),
							time: time
						});
					},

					_calcCandleYValues: function(chartDataItem) {
						var open = chartDataItem.get('open');
						var close = chartDataItem.get('close');
						var min = this.chartSetting.get('rangeMin');
						var max = this.chartSetting.get('rangeMax');
						var height = this.chartSetting.get('height');

						return {
							rectY: calcYPos(Math.max(open, close), min, max, height),
							rectHeight: open !== close ? calcYDiff(open, close, min, max, height)
									: 1,
							lineY1: calcYPos(chartDataItem.get('low'), min, max, height),
							lineY2: calcYPos(chartDataItem.get('high'), min, max, height)
						};
					},

					draw: function() {
						$(this.rootElement).empty();
						this.createCandleStickDataItems();
						if (graphicRenderer.isSvg) {
							this._showSVGCandleSticks(); // ローソクを描画
						} else {
							this._showVMLCandleSticks(); // ローソクを描画
						}
					},

					_showSVGCandleSticks: function() {
						var candleSticks = this.chartModel.toArray();
						for (var i = 0, len = candleSticks.length; i < len; i++) {
							this.appendCandleStick(candleSticks[i], this.rootElement);
						}
					},

					_appendChart: function(items) {
						if (graphicRenderer.isSvg) {
							this.appendCandleStick(items[0], this.rootElement);
						} else {
							this.updateCandleStick();
						}
					},

					appendCandleStick: function(candleStickItem, parent) {
						var $parent = $(parent);

						this._appendCandleStick(candleStickItem, $parent, '#000', {
							id: h5format(LINE_ELM_ID_FORMAT, candleStickItem.get('id')),
							'class': 'candleStickChart chartElm'
						}, candleStickItem.get('fill'), {
							id: h5format(RECT_ELM_ID_FORMAT, candleStickItem.get('id')),
							'class': 'candleStickChart chartElm'
						});
					},

					_appendHighLight: function(candleStickItem, $tooltip) {
						if (graphicRenderer.isSvg) {
							this._appendCandleStick(candleStickItem, $tooltip, 'yellow', {
								'class': 'highlight_candle',
								'stroke-width': '1px'
							}, candleStickItem.get('fill'), {
								'class': 'highlight_candle',
								stroke: 'yellow',
								'stroke-width': '2px'
							});
						} else {
							// ハイライト
							var highlightShape = graphicRenderer.createShapeElm({
								coordsize: this.COORDSIZE,
								path: this._rectPath(this._dataToRect(candleStickItem)),
								'class': 'candleStickChart'
							});
							graphicRenderer.css(highlightShape, {
								zoom: '1',
								width: this.chartSetting.get('width'),
								height: this.chartSetting.get('height')
							});

							// 塗りつぶし
							graphicRenderer.fill(highlightShape, {
								color: candleStickItem.get('fill')
							});

							// 枠線
							graphicRenderer.stroke(highlightShape, {
								color: 'yellow',
								weight: 2,
								on: true
							});

							$tooltip[0].appendChild(highlightShape);
						}
					},

					_appendCandleStick: function(candleStickItem, $parent, lineColor, lineProp,
							rectColor, rectProp) {
						graphicRenderer.appendLineElm(candleStickItem.get('lineX'), candleStickItem
								.get('lineY1'), candleStickItem.get('lineX'), candleStickItem
								.get('lineY2'), lineColor, lineProp, $parent);

						graphicRenderer.appendRectElm(candleStickItem.get('rectX'), candleStickItem
								.get('rectY'), candleStickItem.get('rectWidth'), candleStickItem
								.get('rectHeight'), rectColor, rectProp, $parent);
					},

					_chartModelChangeListener: function(ev) {
						var $root = $(this.rootElement);

						// 表示範囲が広がった時に、左端のidを探す
						for (var i = 0, len = ev.created.length; i < len; i++) {
							if (ev.created[i].get('id') < this.leftEndCandleStickId) {
								this.leftEndCandleStickId = ev.created[i].get('id');
							}
						}

						// 座標情報が変更されたときに、表示に反映する
						for (var i = 0, len = ev.changed.length; i < len; i++) {
							var changed = ev.changed[i];
							if (changed.props.rectY == null && changed.props.rectHeight == null
									&& changed.props.lineY1 == null && changed.props.lineY2 == null) {
								return;
							}

							var item = changed.target;
							var $line = $root.find('#'
									+ h5format(LINE_ELM_ID_FORMAT, item.get('id')));
							$line.attr({
								y1: item.get('lineY1'),
								y2: item.get('lineY2')
							});
							var $rect = $root.find('#'
									+ h5format(RECT_ELM_ID_FORMAT, item.get('id')));
							$rect.attr({
								y: item.get('rectY'),
								height: item.get('rectHeight')
							});
						}
					},

					// VML用

					_showVMLCandleSticks: function() {
						this.updateCandleStick();
					},

					updateCandleStick: function(newCandleStick, removeId) {
						var data = this._getShapePaths();
						this._updateHighLowShape(data);
						this._updateOpenCloseShape(data);
					},

					_getShapePaths: function() {
						var lines = [];
						var rects = {}; // fillの種類ごとに配列を持つ(1shapeにつき1色しか持てないため)
						var cdata = {};

						for ( var id in this.chartModel.items) {
							var data = this.chartModel.get(id);

							var lineSubpath = this._linePath(data); // path (m始まり, e終わり)を指定
							lines.push(lineSubpath);

							var rectType = this._getRectType(data);
							if (!rects[rectType]) {
								rects[rectType] = [];
								cdata[rectType] = [];
							}

							var pos = this._dataToRect(data); // left, top, width, height, fillを指定
							var rectSubpath = this._rectPath(pos); // rect表示のpathを取得
							rects[rectType].push(rectSubpath);
							cdata[rectType].push(pos);
						}

						return {
							lines: lines,
							rects: rects,
							data: cdata
						};
					},

					_updateHighLowShape: function(shapePaths) {
						var highlowLineShape = $(this.rootElement).find(
								'.candleStickChart.chartElm')[0];

						if (highlowLineShape == null) {
							highlowLineShape = graphicRenderer.createShapeElm({
								'class': 'candleStickChart chartElm',
								coordsize: this.COORDSIZE
							});

							graphicRenderer.css(highlowLineShape, {
								zoom: '1',
								width: this.chartSetting.get('width'),
								height: this.chartSetting.get('height')
							});

							graphicRenderer.stroke(highlowLineShape, {
								on: true,
								weight: 1
							});

							this.rootElement.appendChild(highlowLineShape);
						}

						highlowLineShape.path = shapePaths.lines.join(',');
					},

					_updateOpenCloseShape: function(shapePaths) {
						var rects = shapePaths.rects;

						// fillの種類ごとに開始・終了値の四角形を描画
						for ( var rectPaths in rects) {
							if (!rects.hasOwnProperty(rectPaths)) {
								continue;
							}

							var rectShape = $(this.rootElement).find(
									'.candleStickChart.' + rectPaths)[0];
							if (rectShape == null) {
								var rectShape = graphicRenderer.createShapeElm({
									coordsize: this.COORDSIZE,
									'class': 'candleStickChart chartElm ' + rectPaths
								});

								graphicRenderer.css(rectShape, {
									zoom: '1',
									width: this.chartSetting.get('width'),
									height: this.chartSetting.get('height')
								});

								graphicRenderer.fill(rectShape, {
									color: rectPaths
								});

								graphicRenderer.stroke(rectShape, {
									opacity: 0.01,
									on: true
								});
								this.rootElement.appendChild(rectShape);
							}
							rectShape.path = rects[rectPaths].join(' ');
						}
					},

					_getRectType: function(data) {
						return data.get('fill');
					},


					_dataToRect: function(data) {
						return {
							id: data.get('id'),
							left: data.get('rectX'),
							top: data.get('rectY'),
							width: data.get('rectWidth'),
							height: data.get('rectHeight'),
							fill: data.get('fill')
						};
					},

					_linePath: function(line) {
						var x = parseInt(line.get('lineX'));
						var y1 = parseInt(line.get('lineY1'));
						var y2 = parseInt(line.get('lineY2'));

						return h5format('m {0} {1} l {0} {2} e', x, y1, y2);
					},

					getRectPos: function(item) {
						return {
							sx: parseInt(item.get('rectX')),
							sy: parseInt(item.get('rectY')),
							ex: parseInt(item.get('rectX') + item.get('rectWidth')),
							ey: parseInt(item.get('rectY') + item.get('rectHeight'))
						};
					}
				});
	}

	/**
	 * ラインチャートレンダラ―を生成する。
	 * 
	 * @private
	 * @param {Element} rootElement このラインチャートのルート要素
	 * @param {DataSource} dataSource このラインチャートのデータソース
	 * @param {Object} chartSetting 設定
	 * @param {Object} seriesSetting この種別の設定
	 * @returns LineChartRenderer
	 */
	function createLineChartRenderer(rootElement, dataSource, chartSetting, seriesSetting) {
		return createChartRenderer(rootElement, dataSource, chartSetting, seriesSetting,
				lineSchema, {

					_getCentralPos: function(chartItem) {
						return {
							x: chartItem.get('toX'),
							y: chartItem.get('toY')
						};
					},

					getLeftEndItemId: function() {
						return this.leftEndCandleStickId;
					},

					draw: function(animate, preRendererChartModel) {
						$(this.rootElement).empty();
						this.$path = null;

						this.createLineDataItems(preRendererChartModel);

						var count = 0;
						var animateNum = this.seriesSetting.animateNum;
						if (!animate || animateNum < 1) {
							count = 1;
							animateNum = 1;
						}

						var that = this;
						function doAnimation() {
							that.appendLines(that.chartModel.toArray(), preRendererChartModel,
									count / animateNum);
							count++;
							if (count <= animateNum) {
								requestAnimationFrame(doAnimation);
							} else {
								// 描画完了時にイベントをあげる
								$(that.rootElement).trigger('finishDrawing');
							}
						}
						requestAnimationFrame(doAnimation);
					},

					_appendChart: function(elms) {
						this.appendLines();
					},

					_calcY: function(item, prop, preRendererChartModel, rate) {
						if (rate == null) {
							rate = 1;
						}
						
						var preY;
						if (!preRendererChartModel) {
							preY = this.chartSetting.get('height');
						} else {
							preY = preRendererChartModel.get(item.get('id')).get(prop);
						}

						return (1 - rate) * preY + rate * item.get(prop);
					},

					appendLines: function(lines, preRendererChartModel, rate) {
						graphicRenderer.isSvg ? this._appendLinesForSvg(lines,
								preRendererChartModel, rate) : this._appendLinesForVml();
					},

					_appendLinesForSvg: function(lines, preRendererChartModel, rate) {
						var $root = $(this.rootElement);
						var chartItems = sortById(lines || this.chartModel.toArray());

						if (!chartItems || !chartItems.length) {
							return;
						}

						var item0 = chartItems[0];
						var d = 'M' + item0.get('fromX') + ' '
								+ this._calcY(item0, 'fromY', preRendererChartModel, rate) + ' ';
						var len = chartItems.length;
						for (var i = 0; i < len; i++) {
							d += h5format(PATH_LINE_FORMAT, chartItems[i].get('toX'), this._calcY(
									chartItems[i], 'toY', preRendererChartModel, rate));
						}
						var fill = this._getFill();
						if (fill != null) {
							d += h5format(PATH_LINE_FORMAT, chartItems[len - 1].get('toX'),
									this.chartSetting.get('height'))
									+ h5format(PATH_LINE_FORMAT, item0.get('fromX'),
											this.chartSetting.get('height')) + ' Z';
						}

						if (this.$path != null) {
							this.$path.attr('d', d);
						} else {
							var attrs = {
								stroke: this.seriesSetting.color || '#000',
								'class': 'LineChart chartElm',
								'stroke-width': this.seriesSetting['stroke-width'],
								fill: fill || 'none'
							};
							var $path = $(graphicRenderer.createPathElm(d, attrs));
							// iOS7対応
							window.scrollTo(window.scrollX, window.scrollY);
							$root.append($path);
							this.$path = $path;
						}
					},

					// TODO: きっとSVG版と統合できるはず(svg/vmlレイヤーで吸収できるはず)
					_appendLinesForVml: function() {
						var $root = $(this.rootElement);
						$root.empty();

						var lineData = this.chartModel.toArray();
						var lineShape = graphicRenderer.createShapeElm();
						graphicRenderer.css(lineShape, {
							width: this.chartSetting.get('width'),
							height: this.chartSetting.get('height'),
							position: 'absolute'
						});
						var fill = this._getFill();
						graphicRenderer.stroke(lineShape, {
							on: true,
							color: this.seriesSetting.color || '#000'
						});
						if (fill) {
							graphicRenderer.fill(lineShape, fill);
						} else {
							graphicRenderer.fill(lineShape, {
								on: false
							});
						}
						lineShape.className = 'LineChart chartElm';
						lineShape.coordsize = this.COORDSIZE;

						var lineShapePath = '';

						var len = lineData.length;
						for (var i = 0; i < len; i++) {
							if (i === 0) {
								var x1 = parseInt(lineData[i].get('fromX'));
								var y1 = parseInt(lineData[i].get('fromY'));
								lineShapePath += h5format('m {0},{1} l{0}, {1}', x1, y1);
							}
							var x2 = parseInt(lineData[i].get('toX'));
							var y2 = parseInt(lineData[i].get('toY'));

							lineShapePath += h5format(',{0},{1}', x2, y2);
						}
						if (fill) {
							var firstX = parseInt(lineData[0].get('fromX'));
							var lastX = parseInt(lineData[len - 1].get('toX'));
							var height = this.chartSetting.get('height');
							lineShapePath += h5format(',{0},{1}', lastX, height);
							lineShapePath += h5format(',{0},{1}', firstX, height);
							lineShapePath += h5format(',{0},{1}', firstX, parseInt(lineData[0]
									.get('fromY')));
						}
						lineShape.path = lineShapePath + 'e';
						$root[0].appendChild(lineShape);
					},

					_getFill: function() {
						var color = this.seriesSetting.fillColor;
						if (!color) {
							return null;
						}

						if (typeof color === 'object') {
							// グラデーションの定義オブジェクト
							return graphicRenderer.gradient(color.id, color, $(this.rootElement));
						}
						if (typeof color === 'string') {
							return color;
						}
						// TODO: エラー
						return null;
					},

					createItem: function(dataItem) {
						var chartData = this.toData(dataItem);
						if (!chartData) {
							return null;
						}
						return this.chartModel.create(chartData);
					},

					createLineDataItems: function(preRendererChartModel) {
						this.chartModel.removeAll();

						if (!this.dataSource.dataModel) {
							return;
						}

						var lineData = [];
						var current = this.dataSource.sequence.current()
								- chartSetting.get('movedNum');
						var dispDataSize = this.chartSetting.get('dispDataSize');
						for ( var id in this.dataSource.dataModel.items) {
							var intId = parseInt(id);
							if (intId < current - dispDataSize || intId >= current) {
								continue;
							}

							// 描画範囲の点について座標情報を計算する
							var item = this.dataSource.dataModel.get(intId);
							var chartData = this.toData(item);
							if (chartData) {
								// y座標の点があるもののみ表示する
								lineData.push(chartData);
							}
						}
						this.chartModel.create(lineData);
					},

					// TODO: xの位置がデータに依存しない
					toData: function(currentItem) {
						var id = currentItem.get('id');
						var pre = this.dataSource.dataModel.get(id - 1);

						var min = this.chartSetting.get('rangeMin');
						var max = this.chartSetting.get('rangeMax');
						var height = this.chartSetting.get('height');

						var yProp = this.dataSource.propNames.y;
						var toY = currentItem.get(yProp);
						if (toY == null) {
							return null;
						}

						// preがnullのときは、データとしても端であり、このときはただの点を表示する
						var isPoint = pre == null || pre.get(yProp) == null;
						var fromY = isPoint ? currentItem.get(yProp) : pre.get(yProp);

						if ($.inArray(this.seriesSetting.type, STACKED_CHART_TYPES) !== -1) {
							fromY += this.dataSource.getStackedData(pre)[yProp];
							toY += this.dataSource.getStackedData(currentItem)[yProp];
						}

						var dx = this.chartSetting.get('dx');
						var toX = id * dx + this.chartSetting.get('width');

						return {
							id: id,
							fromX: !isPoint ? toX - dx : toX,
							toX: toX,
							fromY: calcYPos(fromY, min, max, height),
							toY: calcYPos(toY, min, max, height)
						};
					},

					getXCoord: function(idOrItem) {
						if (idOrItem == null) {
							return null;
						}
						var item;
						if (typeof (idOrItem.getModel) === 'function'
								&& idOrItem.getModel() === this.chartModel) {
							item = idOrItem;
						} else {
							item = this.chartModel.get(idOrItem);
						}
						return item.get('toX');
					},

					getXVal: function(idOrItem) {
						return this.dataSource.getXVal(idOrItem);
					},

					_chartModelChangeListener: function(ev) {
						// 表示範囲が広がった時に、左端のidを探す
						for (var i = 0, len = ev.created.length; i < len; i++) {
							if (ev.created[i].get('id') < this.leftEndCandleStickId) {
								this.leftEndCandleStickId = ev.created[i].get('id');
							}
						}

						// // 座標情報が変更されたときに、表示に反映する
						if (ev.changed.length > 0) {
							this.appendLines();
						}
					},

					getRectPos: function(item) {
						var sx = 0;
						var sy = 0;
						var ex = 0;
						var ey = 0;

						if (item.get('fromX') < item.get('toX')) {
							sx = item.get('fromX');
							ex = item.get('toX');
						} else {
							sx = item.get('toX');
							ex = item.get('fromX');
						}

						if (item.get('fromY') < item.get('toY')) {
							sy = item.get('fromY');
							ey = item.get('toY');
						} else {
							sy = item.get('toY');
							ey = item.get('fromY');
						}

						return {
							sx: sx,
							sy: sy,
							ex: ex,
							ey: ey
						};
					},

					_dataToRect: function(data) {
						return {
							id: data.get('id'),
							left: parseInt(data.get('fromX')),
							top: parseInt(data.get('fromY')),
							width: parseInt(data.get('toX') - data.get('fromX')),
							height: parseInt(data.get('toY') - data.get('fromY'))
						};
					},

					_appendHighLight: function() {
					// ラインチャートではハイライトする対象がない
					}
				});
	}

	function AxisRenderer(axesElm, chartSetting, axesSettings) {
		this.rootElement = axesElm;
		this.$horizLines = null;
		this.$vertLines = null;

		this.chartSetting = chartSetting;

		this.setAxesSetting(axesSettings);

		var that = this;
		function scaling(min, max) {
			if (min === Infinity || max === -Infinity) {
				// 点が存在しない場合は、rangeにnullを設定
				chartSetting.set({
					rangeMax: null,
					rangeMin: null
				});
				return;
			}
			var range;
			if (that.autoScale) {
				range = that.autoScale(min, max);
			} else {
				range = that.defaultAutoScale(min, max);
			}
			chartSetting.set(range);
		}

		scaling(chartSetting.get('minVal'), chartSetting.get('maxVal'));

		chartSetting.addEventListener('change', function(ev) {
			if (ev.props.minVal != null || ev.props.maxVal != null) {
				var minVal = ev.target.get('minVal');
				var maxVal = ev.target.get('maxVal');
				scaling(minVal, maxVal);
			}
			if (ev.props.rangeMin != null || ev.props.rangeMax != null) {
				// rangeが変更されたので、水平方向の補助線を引き直す
				that._drawHorizLines();
			}
		});
	}

	AxisRenderer.prototype = {

		defaultAutoScale: function(min, max) {
			return {
				rangeMin: min,
				rangeMax: max
			};
		},

		/**
		 * X軸のラベル領域の高さを取得する
		 * 
		 * @memberOf AxisRenderer
		 * @returns X軸のラベル領域の高さ
		 */
		getXLabelHeight: function() {
			if (!this._axesSettings.xaxis || !this._axesSettings.xaxis.height) {
				return DEFAULT_X_LABEL_HEIGHT;
			}

			return this._axesSettings.xaxis.height;
		},

		/**
		 * Y軸のラベル領域の幅を取得する
		 * 
		 * @memberOf AxisRenderer
		 * @returns Y軸のラベル領域の幅
		 */
		getYLabelWidth: function() {
			if (!this._axesSettings.yaxis || !this._axesSettings.yaxis.width) {
				return DEFAULT_Y_LABEL_WIDTH;
			}

			return this._axesSettings.yaxis.width;
		},

		/**
		 * X軸のラベル領域のマージンを取得する
		 * 
		 * @memberOf AxisRenderer
		 * @returns marginTopとmarginBottomを持つオブジェクト
		 */
		getXLabelMargin: function() {
			var marginTop = getMarginOrPadding(this._axesSettings.xaxis, 'margin', 'Top');
			if (marginTop == null) {
				marginTop = DEFAULT_X_LABEL_MARGIN_TOP;
			}

			var marginBottom = getMarginOrPadding(this._axesSettings.xaxis, 'margin', 'Bottom');
			if (marginBottom == null) {
				marginBottom = DEFAULT_X_LABEL_MARGIN_BOTTOM;
			}

			return {
				marginTop: marginTop,
				marginBottom: marginBottom
			};
		},

		/**
		 * Y軸のラベル領域のマージンを取得する
		 * 
		 * @memberOf AxisRenderer
		 * @returns marginLeftとmarginRightを持つオブジェクト
		 */
		getYLabelMargin: function() {
			var marginLeft = getMarginOrPadding(this._axesSettings.yaxis, 'margin', 'Left');
			if (marginLeft == null) {
				marginLeft = DEFAULT_Y_LABEL_MARGIN_LEFT;
			}

			var marginRight = getMarginOrPadding(this._axesSettings.yaxis, 'margin', 'Right');
			if (marginRight == null) {
				marginRight = DEFAULT_Y_LABEL_MARGIN_RIGHT;
			}

			return {
				marginLeft: marginLeft,
				marginRight: marginRight
			};
		},

		showAxisLabels: function(xLabelArray) {
			if (xLabelArray == null) {
				return;
			}
			this.$vertLines.children('.xLabel').remove();
			if (this.xLabelArray !== xLabelArray) {
				this.xLabelArray = xLabelArray;
				var that = this;
				this.xLabelArray.addEventListener('changeBefore', function(ev) {
					var $xLabelTexts = that.$vertLines.children('.xLabel');
					if ($xLabelTexts.length === 0) {
						return;
					}

					var value = ev.args[1].value;
					var index = ev.args[0];
					var orgLabel = this.get(index);
					if (ev.method !== 'set' || (orgLabel && value === orgLabel.value)) {
						return;
					}
					var label = that._getXLabel(ev.args[1], index);
					graphicRenderer.text(label, $xLabelTexts.eq(index));
				});
			}

			var dx = this.chartSetting.get('dx');
			var xInterval = (this.chartSetting.get('width') - dx)
					/ this.chartSetting.get('vertLineNum');
			var x = dx * 0.5;

			var height = this.chartSetting.get('height');
			var textY = graphicRenderer.isSvg ? height + CHARACTER_HEIGHT : height + 5;

			// ラベルの軸からのマージンを取得
			var margin = getMarginOrPadding(this._axesSettings.xaxis, 'margin', 'Top');
			if (margin == null) {
				margin = DEFAULT_X_LABEL_MARGIN_TOP;
			}
			textY += margin;

			for (var i = 0, len = this.xLabelArray.length; i < len; i++) {
				var label = this._getXLabel(this.xLabelArray.get(i), i);
				graphicRenderer.appendTextElm(label, x, textY, null, {
					'class': 'xLabel',
					'text-anchor': 'middle'
				}, this.$vertLines);
				x += xInterval;
			}
		},

		_getXLabel: function(xLabelObj, index) {
			if (!xLabelObj || !xLabelObj.item) {
				// 対象となるデータが存在しないときは空文字を表示
				return '';
			}
			return this._xLabelFormatter(xLabelObj.value, xLabelObj.item, index);
		},

		drawGridLines: function() {
			this._drawHorizLines(); // 水平方向の補助線を引く
			this._drawVertLines();
		},

		/**
		 * チャートの横の補助線を引く
		 * 
		 * @memberOf AxisRenderer
		 */
		_drawHorizLines: function() {
			if (this.$horizLines == null) {
				this.$horizLines = $(graphicRenderer.createGroupElm({
					id: 'horiz_lines'
				}));
				$(this.rootElement).prepend(this.$horizLines);
			} else {
				this.$horizLines.empty();
			}

			// 指定した数だけ分割して、横のメモリを引く
			var horizLineNum = this.chartSetting.get('horizLineNum');

			var rangeMax = this.chartSetting.get('rangeMax');
			var rangeMin = this.chartSetting.get('rangeMin');
			var width = this.chartSetting.get('width');
			var yInterval = (rangeMax - rangeMin) / horizLineNum;

			for (var i = 0; i <= horizLineNum; i++) {
				var height = this.chartSetting.get('height');
				var y = height - i * height / horizLineNum;

				if (i !== 0 && i !== horizLineNum) {
					graphicRenderer.appendLineElm(0, y, width, y, '#ccc', {
						'class': 'added'
					}, this.$horizLines);
				}

				if (rangeMax == null || rangeMin == null) {
					// 表示する点がない場合は、以下のラベルを表示する処理は行わない
					continue;
				}

				// 目盛を付ける
				var textY = graphicRenderer.isSvg ? y + 2 : y - 7;

				// ラベルの軸からのマージンを取得
				var margin = getMarginOrPadding(this._axesSettings.yaxis, 'margin', 'Right');
				if (margin == null) {
					margin = DEFAULT_Y_LABEL_MARGIN_RIGHT;
				}
				var val = yInterval * i + rangeMin;
				graphicRenderer.appendTextElm(this._yLabelFormatter(val, i), -margin, textY, null,
						{
							'class': 'added',
							'font-size': this._axesSettings.yaxis.fontSize,
							'text-anchor': 'end'
						}, this.$horizLines);
			}
		},

		/**
		 * チャートの縦の補助線を引く
		 * 
		 * @memberOf AxisRenderer
		 */
		_drawVertLines: function(renderer) {
			if (this.$vertLines == null) {
				this.$vertLines = $(graphicRenderer.createGroupElm({
					id: 'vert_lines'
				}));
			} else {
				this.$vertLines.empty();
			}

			var vertLineNum = this.chartSetting.get('vertLineNum');
			if (vertLineNum === 0) {
				return;
			}

			if (renderer == null) {
				$(this.rootElement).prepend(this.$vertLines);


				var dx = this.chartSetting.get('dx');
				var height = this.chartSetting.get('height');
				var width = this.chartSetting.get('width') - dx; // 両脇にdx/2ずつ余白を取る
				var xInterval = width / vertLineNum;

				var x = dx * 0.5;
				for (var i = 0; i <= vertLineNum; i++) {
					graphicRenderer.appendLineElm(x, 0, x, height, '#CCC', null, this.$vertLines);
					x += xInterval;
				}

				return;
			}
		},

		setAxesSetting: function(axesSettings) {
			this._axesSettings = axesSettings;
			this.chartSetting.set({
				vertLineNum: !axesSettings.xaxis.off ? axesSettings.xaxis.lineNum + 1 : 0,
				horizLineNum: axesSettings.yaxis.lineNum
			});
			this.autoScale = axesSettings.yaxis.autoScale || this.defaultAutoScale;
			this._xLabelFormatter = axesSettings.xaxis.formatter || this._xLabelDefaultFormatter;
			this._yLabelFormatter = axesSettings.yaxis.formatter || this._yLabelDefaultFormatter;
		},

		_xLabelDefaultFormatter: function(value, data, index) {
			return value.toString();
		},

		_yLabelDefaultFormatter: function(value, index) {
			return value.toString();
		}
	};

	var chartSequense = 0;

	/**
	 * 描画を行うコントローラ
	 * 
	 * @class
	 * @memberOf h5.ui.components.chart
	 * @name ChartController
	 */
	var chartController = {

		__name: 'h5.ui.components.chart.ChartController',

		chartSetting: null,

		_renderers: {},

		_rendererQueue: [],

		axisRenderer: null,

		dataSourceManager: null,

		chartId: null,

		$chart: null,

		$movingGroups: null,

		isInitDraw: false,

		isFirstDraw: true,

		tooltip: {},

		_addedCount: 0,

		__ready: function() {
			this.chartId = '__h5_chart' + chartSequense;
			chartSequense++;

			this.chartSetting = h5.core.data.createObservableItem(chartSettingsSchema);
			this.chartSetting
					.addEventListener('change', this.own(this._chartSettingChangeListener));

		},

		_chartSettingChangeListener: function(ev) {
			if (this.isInitDraw) {
				return;
			}

			if (ev.props.translateX != null) {
				graphicRenderer.setTranslate(this.$seriesGroup, ev.props.translateX.newValue, 0);
				graphicRenderer.setTranslate(this.$tooltip, ev.props.translateX.newValue, 0);
				this._updateTooltip();
			}

			if (ev.props.width != null || ev.props.height != null) {
				this._appendBorder(this.chartSetting.get('width'), this.chartSetting.get('height'));
			}
			if (ev.props.rangeMin || ev.props.rangeMax) {
				for ( var name in this._renderers) {
					this._renderers[name].updateYVal();
					if (this.tooltip.id != null) {
						this.tooltip.renderer.showToolTip(this.tooltip.id, this.$tooltip);
					}
				}
			}
		},

		/**
		 * * チャートの初期表示を行う
		 * 
		 * @memberOf h5.ui.components.chart.ChartController
		 */
		_initChart: function(firstChartRenderer) {
			this._appendBorder();
			this._initAxis(firstChartRenderer);
			var rightId = firstChartRenderer.dataSource.sequence.current() - 1;
			var paddingRight = 0;
			if (this.settings.plotSetting && this.settings.plotSetting.paddingRight) {
				paddingRight = this.settings.plotSetting.paddingRight;
			}
			// TODO: translateXの計算は共通化すべき
			this.chartSetting.set('translateX', -this.chartSetting.get('dx')
					* (rightId + paddingRight - this.chartSetting.get('movedNum')));
		},

		_initAxis: function(firstChartRenderer) {
			if (this.axisRenderer == null) {
				var axesElm = graphicRenderer.createGroupElm({
					id: 'axes'
				});
				this.$stickingGroups.append(axesElm);
				this.axisRenderer = new AxisRenderer(axesElm, this.chartSetting, this.settings.axes);
			} else {
				this.axisRenderer.setAxesSetting(this.settings.axes);
			}
			this.axisRenderer.drawGridLines();

			var xLabelArray = firstChartRenderer.getXLabelArray();
			this.axisRenderer.showAxisLabels(xLabelArray);
		},

		_appendBorder: function() {
			this.$borderGroup.empty();
			var w = this.chartSetting.get('width');
			var h = this.chartSetting.get('height');
			graphicRenderer.appendLineElm(0, h, w, h, '#000', {
				id: 'xline'
			}, this.$borderGroup);
			graphicRenderer.appendLineElm(0, 0, 0, h, '#000', {
				id: 'yline'
			}, this.$borderGroup);
			graphicRenderer.appendLineElm(0, 0, w, 0, '#000', {
				id: 'x2line'
			}, this.$borderGroup);
			graphicRenderer.appendLineElm(w, 0, w, h, '#000', {
				id: 'y2line'
			}, this.$borderGroup);
		},

		/**
		 * @memberOf h5.ui.components.chart.ChartController
		 */
		_appendChartElement: function(chartAreaWidth, chartAreaHeight, xStart, yStart) {
			var $graphicRootElm = this.$find('#' + this.chartId);
			if ($graphicRootElm != null && $graphicRootElm.length !== 0) {
				$graphicRootElm.empty();
				$graphicRootElm.attr('width', chartAreaWidth);
				$graphicRootElm.attr('height', chartAreaHeight);
			} else {
				$graphicRootElm = $(graphicRenderer.createGraphicRootElm({
					width: chartAreaWidth,
					height: chartAreaHeight,
					id: this.chartId
				}));

				$(this.rootElement).append($graphicRootElm);
			}

			this.$chart = $(graphicRenderer.createGroupElm({
				id: 'h5_chart'
			}));
			graphicRenderer.setTranslate(this.$chart, xStart, yStart);
			$graphicRootElm.append(this.$chart);

			this.$stickingGroups = $(graphicRenderer.createGroupElm({
				id: 'stickingGroups',
				'class': 'vml_absolute'
			}));
			this.$chart.append(this.$stickingGroups);

			this.$borderGroup = $(graphicRenderer.createGroupElm({
				id: 'borderGroup'
			}));
			this.$stickingGroups.append(this.$borderGroup);

			this.$chart.append(this._createMovingGroup($graphicRootElm));
		},

		_createMovingGroup: function($graphicRootElm) {
			this.$movingGroups = $(graphicRenderer.createGroupElm({
				id: 'movingGroup',
				'class': 'vml_absolute'
			}));

			// クリッピング
			if (graphicRenderer.isSvg) {
				var clipRect = graphicRenderer.createRectElm(0, 0, this.chartSetting.get('width'),
						this.chartSetting.get('height'));
				graphicRenderer.clip(this.$movingGroups, clipRect, 'moving_area_clip',
						$graphicRootElm);
			} else {
				this.$movingGroups.css('clip', 'rect(0px ' + this.chartSetting.get('width') + 'px '
						+ this.chartSetting.get('height') + 'px 0px)');
			}

			this.$tooltip = $(graphicRenderer.createGroupElm({
				id: 'tooltip',
				'font-family': 'Verdana'
			}));

			this.$movingGroups.append(this.$tooltip);

			return this.$movingGroups;
		},

		_updateChartElement: function(chartAreaWidth, chartAreaHeight, xStart, yStart) {
			var $graphicRootElm = this.$find('#' + this.chartId);
			$graphicRootElm.attr('width', chartAreaWidth);
			$graphicRootElm.attr('height', chartAreaHeight);

			graphicRenderer.setTranslate(this.$chart, xStart, yStart);

			// クリッピング
			if (graphicRenderer.isSvg) {
				graphicRenderer.attr(this.$find('#moving_area_clip').find('rect')[0], {
					width: this.chartSetting.get('width'),
					height: this.chartSetting.get('height')
				});
			} else {
				this.$movingGroups.css('clip', 'rect(0px ' + this.chartSetting.get('width') + 'px '
						+ this.chartSetting.get('height') + 'px 0px)');
			}
		},

		draw: function(settings) {
			this.isInitDraw = true;

			this.dataSourceManager = new DataSourceManager(this.chartSetting);

			// チャートのパラメータの設定
			if (settings != null) {
				this.settings = settings;

				var minVal = +Infinity;
				var maxVal = -Infinity;

				var range = settings.seriesDefault.range;
				if (range) {
					if (range.minVal != null) {
						minVal = range.minVal;
					}
					if (range.maxVal != null) {
						maxVal = range.maxVal;
					}
				}

				// TODO: axisRenderの中に移動したい
				var axesSetting = settings.axes;
				var yLabeLWidth;
				if (axesSetting && axesSetting.yaxis && axesSetting.yaxis.width) {
					yLabeLWidth = axesSetting.yaxis.width;
				} else {
					yLabeLWidth = DEFAULT_Y_LABEL_WIDTH;
				}

				if (axesSetting && axesSetting.yaxis) {
					yLabeLWidth += getMarginOrPadding(axesSetting.yaxis, 'margin', 'Right');
				}

				var xLabeLHeight;
				if (axesSetting && axesSetting.xaxis && axesSetting.xaxis.height) {
					xLabeLHeight = axesSetting.xaxis.height;
				} else {
					xLabeLHeight = DEFAULT_X_LABEL_HEIGHT;
				}

				if (axesSetting && axesSetting.xaxis) {
					xLabeLHeight += getMarginOrPadding(axesSetting.xaxis, 'margin', 'Top');
				}

				var chartSetting = settings.chartSetting;
				var plotSetting = settings.plotSetting;
				var width = chartSetting.width - yLabeLWidth
						- getMarginOrPadding(plotSetting, 'margin', 'Right')
						- getMarginOrPadding(chartSetting, 'margin', 'Left');
				var height = chartSetting.height - xLabeLHeight
						- getMarginOrPadding(plotSetting, 'margin', 'Top')
						- getMarginOrPadding(chartSetting, 'margin', 'Bottom');

				// TODO: 定義し直し(ばらす？)
				this.chartSetting.set({
					width: width,
					height: height,
					dispDataSize: settings.seriesDefault.dispDataSize,
					keepDataSize: settings.seriesDefault.keepDataSize,
					timeInterval: settings.timeInterval || 1,
					minVal: minVal,
					maxVal: maxVal,
					additionalLineColor: 'yellow'
				});

				var marginTop = getMarginOrPadding(plotSetting, 'margin', 'Top');
				if (marginTop == null) {
					marginTop = DEFAULT_CHART_MARGIN_TOP;
				}
				if (this.isFirstDraw) {
					this._appendChartElement(chartSetting.width, chartSetting.height, yLabeLWidth,
							marginTop);
				} else {
					this._updateChartElement(chartSetting.width, chartSetting.height, yLabeLWidth,
							marginTop);
				}
			}

			this._renderers = {};
			this._removeToolTip();

			// TODO: データ生成はイベントをあげるようにして、ここは同期的な書き方にしたほうがよいかもしれない
			this._createChartRenderes(this.settings).done(this.own(function() {
				this.isInitDraw = false;
				this._initChart(this._renderers[this.settings.series[0].name]); // チャート表示の初期化
				this._drawChart();// チャート情報の計算
				this.isFirstDraw = false;
			}));
		},

		beginUpdate: function() {
			this._isInUpdate = true;
		},

		endUpdate: function() {
			this._isInUpdate = false;
			this._redraw();
		},

		_createChartRenderes: function(settings) {
			if (this.$seriesGroup == null) {
				this.$seriesGroup = $(graphicRenderer.createGroupElm({
					id: 'series_group'
				}));
				this.$movingGroups.prepend(this.$seriesGroup);
			} else {
				this.$seriesGroup.empty();
			}

			return this._addSeriesWithAsync(settings.series);
		},

		_createChartRenderer: function(g, dataSource, seriesOption) {
			var name = seriesOption.name;
			switch (seriesOption.type.toLowerCase()) {
			case 'ohlc':
				this._renderers[name] = createCandleStickChartRenderer(g, dataSource,
						this.chartSetting, seriesOption);
				break;
			case 'stacked_line':
			case 'line':
				this._renderers[name] = createLineChartRenderer(g, dataSource, this.chartSetting,
						seriesOption);
				break;
			default:
				break;
			}
			return this._renderers[name];
		},

		_getPreRenderer: function(currentRenderer) {
			var series = this.settings.series;
			if (!series || series.length == 1) {
				return null;
			}
			
			var name = currentRenderer.name;
			for (var i = 0, len = series.length; i < len; i++) {
				if (name === series[i].name) {
					return this._renderers[series[i - 1].name];
				}
			}
			return null;
		},

		_drawByRenderer: function(renderer) {
			var preRenderer = this._getPreRenderer(renderer);
			var preChartModel = preRenderer ? preRenderer.chartModel : null;
			renderer.draw(true, preChartModel);
		},

		getSettings: function() {
			return this.settings;
		},

		setChartSetting: function(chartSetting) {
			var obj = {};
			if (chartSetting.width) {
				var yLabelMargin = this.axisRenderer.getYLabelMargin();
				obj.width = chartSetting.width - this.axisRenderer.getYLabelWidth()
						- yLabelMargin.marginRight - yLabelMargin.marginLeft;
			}
			if (chartSetting.height) {
				var xLabelMargin = this.axisRenderer.getXLabelMargin();
				obj.height = chartSetting.height - this.axisRenderer.getXLabelHeight()
						- xLabelMargin.marginTop - xLabelMargin.marginBottom;
			}

			this.chartSetting.set(obj);

			var firstRenderer = this._renderers[this.settings.series[0].name];
			this._initChart(firstRenderer); // チャート表示の初期化
			this._drawChart();// チャート情報の計算
		},


		_addSeriesWithAsync: function(series) {
			var promises = [];
			for (var i = 0, len = series.length; i < len; i++) {
				var seriesSettings = $.extend({}, this.settings.seriesDefault, series[i]);
				var g = graphicRenderer.createGroupElm({
					id: SERIES_PREFIX + series[i].name
				});
				if ($.inArray(series[i].type, STACKED_CHART_TYPES) === -1) {
					this.$seriesGroup.append(g);
				} else {
					this.$seriesGroup.prepend(g);
				}
				var dataSource = this.dataSourceManager.createDataSource(seriesSettings);
				this._createChartRenderer(g, dataSource, seriesSettings);
				promises.push(dataSource.getData(seriesSettings, this.chartSetting
						.get('dispDataSize'), this.chartSetting.get('keepDataSize')));
			}
			return $.when.apply($, promises);
		},

		addSeries: function(series) {
			var thisSeries = this.settings.series;
			this._addSeriesWithAsync(series).done(this.own(function() {
				for (var i = 0, len = series.length; i < len; i++) {
					thisSeries.push(series[i]);
					var renderer = this._renderers[series[i].name];
					if (this._rendererQueue.length === 0) {
						// 描画中のものがなければ描画を開始する。
						this._drawByRenderer(renderer);
					}
					this._rendererQueue.push(renderer);
				}
			}));
		},

		removeSeries: function(names) {
			var array = $.isArray(names) ? names : [names];

			var seriesSettings = [];
			for (var i = 0, len = array.length; i < len; i++) {
				$(this._renderers[array[i]].rootElement).remove();
				this.dataSourceManager.removeDataSource(array[i]);
				delete this._renderers[array[i]];
				for (var j = 0, jLen = this.settings.series.length; j < jLen; j++) {
					if (this.settings.series[j].name === array[i]) {
						seriesSettings.push(this.settings.series.splice(j, 1)[0]);
						break;
					}
				}
			}

			// 再描画
			this._drawChart();

			return $.isArray(names) ? seriesSettings : seriesSettings[0];
		},

		_drawChart: function() {
			for ( var name in this._renderers) {
				this._renderers[name].draw();
			}
		},

		_startUpdate: function(settings) {
			if (this.interval != null) {
				clearInterval(this.interval);
			}

			if (settings.url != null) {
				this.interval = setInterval(this.own(function() {
					this._updateChart(settings);
				}), 1);
			}
		},

		_updateChart: function(settings) {
			var that = this;
			this.chartLogic.getData(settings.url, true).done(function(data) {
				that.addData('', data);
			});
		},

		addData: function(data, commonData) {
			var individualSeries = [];

			for (var i = 0, len = data.length; i < len; i++) {
				var name = data[i].name;
				individualSeries.push(name);
				this._renderers[name].addData(data[i].data);
			}

			var renderers = this._renderers;
			for ( var name in renderers) {
				if ($.inArray(name, individualSeries) !== -1) {
					continue;
				}
				renderers[name].addData(commonData);
			}

			// チャートを左にスライドする
			var translateX = this.chartSetting.get('translateX');
			this.chartSetting.set('translateX', translateX - this.chartSetting.get('dx'));

			this._addedCount++;
		},



		go: function(num) {
			var movedNum = this.chartSetting.get('movedNum');
			var move = Math.min(movedNum, num);
			for ( var name in this._renderers) {
				var dataSource = this._renderers[name].dataSource;
				var rightEndId = dataSource.sequence.current() - movedNum;
				var leftEndId = rightEndId - this.chartSetting.get('dispDataSize');
				for (var i = 0; i < move; i++) {
					var item = dataSource.dataModel.get(rightEndId + i);
					this._renderers[name].updateChart(item, leftEndId, false);
				}
			}
			var translateX = this.chartSetting.get('translateX');
			this.chartSetting.set('translateX', translateX - this.chartSetting.get('dx') * move);
			this.chartSetting.set('movedNum', movedNum - move);
			return move;
		},

		back: function(num) {
			var movedNum = this.chartSetting.get('movedNum');
			for ( var name in this._renderers) {
				var dataSource = this._renderers[name].dataSource;
				var rightEndId = dataSource.sequence.current() - movedNum - 1;
				var leftEndId = rightEndId - this.chartSetting.get('dispDataSize');
				for (var i = 0; i < num; i++) {
					var item = dataSource.dataModel.get(leftEndId - i);
					this._renderers[name].updateChart(item, rightEndId, true);
				}
			}
			var translateX = this.chartSetting.get('translateX');
			this.chartSetting.set('translateX', translateX + this.chartSetting.get('dx') * num);
			this.chartSetting.set('movedNum', movedNum + num);
			return movedNum;
		},

		setSeriesDefault: function(obj) {
			if (obj.dispDataSize == null && obj.keepDataSize) {
				return;
			}

			for ( var name in obj) {
				this.chartSetting.set(name, obj[name]);
			}

			if (this.chartSetting.get('keepDataSize') < this.chartSetting.get('dispDataSize')) {
				this.chartSetting.set('dispDataSize', this.chartSetting.get('keepDataSize'));
			}

			this._redraw();
		},

		setAxesSetting: function(axesSettings) {
			$.extend(true, this.settings.axes, axesSettings);
			this._redraw();
		},

		_redraw: function() {
			if (this._isInUpdate) {
				return;
			}

			this.leftEndCandleStickId = Infinity;

			var firstRenderer = this._renderers[this.settings.series[0].name];
			this.dataSourceManager.setRange(firstRenderer.dataSource.sequence.current());
			this._initChart(firstRenderer); // チャート表示の初期化
			this._drawChart();// チャート情報の計算
		},

		'#series_group finishDrawing': function() {
			this._rendererQueue.shift();
			var renderer = this._rendererQueue[0];
			if (renderer != null) {
				this._drawByRenderer(renderer);
			}
		},

		'.chartElm mousemove': function(context, $el) {
			var seriesName = $el.parent().attr('id').slice(SERIES_PREFIX.length);
			var renderer = this._renderers[seriesName];
			var type = renderer.seriesSetting.type;

			var yLabelMargin = this.axisRenderer.getYLabelMargin();
			// 補正項
			var correct = {
				left: this.chartSetting.get('translateX') + this.axisRenderer.getYLabelWidth()
						+ yLabelMargin.marginRight + yLabelMargin.marginLeft,
				top: DEFAULT_CHART_MARGIN_TOP
			};
			var tooltipId = renderer.getTargetId(context, type, correct);


			if (tooltipId == null) {
				return;
			}

			this.tooltip.id = tooltipId;
			this.tooltip.renderer = renderer;
			renderer.showToolTip(tooltipId, this.$tooltip);
		},

		_updateTooltip: function() {
			if (!this.tooltip.renderer) {
				return;
			}
			this.tooltip.renderer.updateTooltip(this.tooltip.id, this.$tooltip);
		},

		'#movingGroup removeTooltip': function(context) {
			if (context.evArg == this.tooltip.id) {
				this._removeToolTip();
			}
		},

		_removeToolTip: function() {
			this.$tooltip.empty();
			this.tooltip.id = null;
			this.tooltip.renderer = null;
		},

		'{rootElement} click': function() {
			this.$tooltip.empty();
		}
	};

	h5.core.expose(chartController);
})(jQuery);
// ---- ListLayout ---- //
(function($) {
	'use strict';

	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================
	var BOX_CLASS = 'list-layout-box';
	var BAR_CLASS = 'list-layout-bar';
	var RENDER_WAIT_TIME = 100;

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================
	var listLayoutController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.combobox.ListLayoutController
		 */
		__name: 'h5.ui.components.combobox.ListLayoutController',


		// --- Property --- //

		_source: null,

		_rowHeight: 0,


		_scrollStrategy: null,

		_start: 0,

		_end: 0,

		_renderWaitTimerId: null,

		_loadingId: null,

		_changeSourceHandler: null,

		_initializeDeferred: null,


		// --- Private Method --- //

		_render: function() {
			var that = this;

			var start = this._start;
			var end = this._end;

			var isCached = this._source.isCached(start, end);
			var renderListEventArg = {
				start: start,
				end: end
			};

			if (isCached && this._renderWaitTimerId === null) {
				// Cache されている場合はそのまま表示する
				this._source.sliceAsync(start, end).then(function(data) {
					that._boxController.render(data);
					that._boxController.endLoad();
					that.trigger('renderList', renderListEventArg);
				});
				return;
			}

			if (this._renderWaitTimerId !== null) {
				clearTimeout(this._renderWaitTimerId);
			}

			this._boxController.beginLoad();
			that.trigger('loadDataBegin');

			this._renderWaitTimerId = setTimeout(function() {

				var timerId = that._renderWaitTimerId;

				that._source.sliceAsync(start, end).then(function(data) {
					if (timerId !== that._renderWaitTimerId) {
						return;
					}
					that._renderWaitTimerId = null;

					that._boxController.render(data);
					that._boxController.endLoad();

					that.trigger('loadDataEnd');
					that.trigger('renderList', renderListEventArg);
				});

			}, RENDER_WAIT_TIME);
		},

		_scroll: function(scrollDiff) {
			var windowSize = $(this.rootElement).height();
			var dataInfo = {
				totalCells: this._source.getTotalLength(),
				defaultCellSize: this._rowHeight
			};

			var scrollInfo = this._scrollStrategy.scroll(scrollDiff, windowSize, dataInfo);

			this._barController.setScrollPosition(scrollInfo.scrollPosition);
			this._barController.setScrollSize(scrollInfo.scrollSize);


			var index = scrollInfo.index;

			// 追記：プライベートメソッド化
			var len = this._getDispDataLength(windowSize);

			if (scrollInfo.isEnd) {
				this._start = index - len;
				this._end = index;
				this._boxController.setVerticalPositionBottom();
			} else {
				this._start = index;
				this._end = index + len;
				this._boxController.setVerticalPosition(scrollInfo.offset);
			}

			this._render();
		},

		// 追記：プライベートメソッド化
		_getDispDataLength: function(windowSize) {
			return Math.ceil(windowSize / this._rowHeight) + 1;
		},

		// --- Life Cycle Method --- //

		__construct: function() {
			this._initializeDeferred = h5.async.deferred();
		},

		__init: function() {

			// TODO: 子コントローラの parentController が null になっていて問題になる可能性あり

			var $root = $(this.rootElement);

			var $box = $('<div></div>').addClass(BOX_CLASS).css({
				height: '100%',
				float: 'left'
			}).appendTo(this.rootElement);

			var $bar = $('<div></div>').addClass(BAR_CLASS).css({
				height: '100%'
			}).appendTo(this.rootElement);


			this._boxController = h5.core.controller($box,
					h5.ui.components.virtualScroll.VirtualScrollBoxController);
			this._barController = h5.core.controller($bar,
					h5.ui.components.virtualScroll.VerticalScrollBarController);

			return this._barController.initPromise.then(function() {
				var boxWidth = $root.width() - $bar.width();
				$box.width(boxWidth);
			});
		},


		// --- Event Handler --- //

		'{rootElement} h5scroll': function(context) {

			context.event.stopPropagation();
			var info = context.evArg.verticalScroll;

			if (info.type === 'pixel') {
				this._scroll(info.diff);
			} else if (info.type === 'index') {
				this.moveIndex(info.diff);
			} else {
				var msg = '不正な type を持つ h5scroll イベントです; verticalScroll.type = {0}';
				this.throwError(msg, info.type);
			}
		},

		'{rootElement} mousewheel': function(context) {
			context.event.preventDefault();

			var diff = (context.event.wheelDelta < 0) ? 1 : -1;

			this.trigger('h5scroll', {
				verticalScroll: {
					type: 'index',
					diff: diff
				}
			});
		},

		// --- Public Method  --- //

		init: function(source, renderer, rowHeight, scrollStrategy) {

			this._source = source;
			this._scrollStrategy = scrollStrategy;

			var that = this;

			this._changeSourceHandler = this.own(function() {
				this.refresh();
			});

			this.initPromise.then(function() {
				that._boxController.init(renderer);
				that._rowHeight = rowHeight;

				that._boxController.initPromise.then(function() {
					that._scroll(0);
				});

				that._source.addEventListener('changeSource', that._changeSourceHandler);
			});

			var promises = [this.readyPromise, this._boxController];

			h5.async.when(promises).then(function() {
				that._initializeDeferred.resolve();
			});

			return this.getInitializePromise();
		},

		refresh: function() {
			this._scrollStrategy.resetPageInfo();
			this._scroll(0);
		},

		beginLoad: function() {
			this._boxController.beginLoad();
		},

		getLoadingInfoDiv: function() {
			this._boxController.getLoadingDiv();
		},

		moveIndex: function(diff) {
			var windowSize = $(this.rootElement).height();
			var scrollDiff = this._scrollStrategy.indexDiffToScrollDiff(diff, windowSize);
			this._scroll(scrollDiff);
		},

		changeSearchOptions: function(searchOptions) {
			var windowSize = $(this.rootElement).height();

			this._source.changeSearchOptions($.extend({
				cachePageSize: this._getDispDataLength(windowSize)
			}, searchOptions));
		},

		setDataSource: function(dataSource) {
			if (this._source !== null) {
				this._source.removeEventListener('changeSource', this._changeSourceHandler);

				this._source = dataSource;
				this._source.addEventListener('changeSource', this._changeSourceHandler);

				this.refresh();
			}
		},

		getInitializePromise: function() {
			return this._initializeDeferred.promise();
		}

	};

	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(listLayoutController);

})(jQuery);

(function() {

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================
	// オーバーレイ, ドロップボタン、ドロップダウンリストに適用するz-indexの開始値
	var Z_INDEX_START_VALUE = 1000;
	// ドロップダウンリストに一度に表示する件数
	var DEFAULT_MAX_ITEMS = 20;
	// ウィンドウのリサイズイベントに登録したハンドラが実行されるまでの遅延時間(ms)
	var RESIZE_EVENT_THRESHOLD = 300;
	// リスト内要素のテンプレート
	var MENU_TEMPLATE = '<ul style="list-style-type:none; margin:0; padding:0;">'
			+ '[% for (var i = 0, ilen = items.length; i < ilen; i++) { %]'
			+ '[%   var data = items[i], ret = formatter(data, i), label = (typeof ret === "string" ? ret : "&nbsp;") %]'
			+ '<li style="width:100%;" class="[%= matchedClass %] [%= activeClass %]" data-value="[%= data["value"] %]">[%:= label %]</li>'
			+ '[% } %]' + '</ul>';

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================
	/**
	 * ドロップダウンリストのリストアイテムのテキストに表示する、文字列を生成する関数を返します
	 * <p>
	 * 引数に関数(Function)を指定した場合は、テキストを生成する関数が指定されたものとして、その関数をそのまま返します。
	 * <p>
	 * それ以外の型の値が指定された場合は、valueのテキストを生成する関数を返します。
	 */
	function createListItemTextFormatter(param, controller) {
		var pattern = param;
		var c = controller;

		switch ($.type(pattern)) {
		case 'function':
			return function(aData, i) {
				return pattern.call(c, aData, i);
			};
		default:
			return function(aData) {
				if (aData == null) {
					return '';
				}

				//dataがobjectの場合は、valueのテキストを表示します。
				if ($.isPlainObject(aData)) {
					return aData["value"].toString();
				}
				return aData.toString();
			};
		}
	}
	;

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================
	/**
	 * ドロップダウンリストを制御するコントローラ
	 *
	 * @class h5.ui.components.combobox.DropDownListController
	 */
	var dropDownListControllerDef = {
		__name: 'h5.ui.components.combobox.DropDownListController',
		/** テンプレート名 */
		_templateName: 'comboboxMenu',
		/** 画面に表示されているリストアイテムに適用するクラス名 */
		_activeListClassName: 'active',
		/** 検索条件に一致したリストアイテムに適用するクラス名 */
		_matchedListClassName: 'matched',
		/** ドロップダウンボタンを包含する要素に適用するクラス名 */
		_dropdownBtnWrapClassName: 'combobox-dropdown-btn-wrapper',
		/** ドロップダウンボタンに適用するクラス名 */
		_dropdownBtnClassName: 'combobox-dropdown-btn',
		/** ドロップダウンボタンのアイコンに適用するクラス名 */
		_dropdownBtnIconClassName: 'combobox-dropdown-btn-icon',
		/** ドロップダウンリスト表示時に一緒に表示するオーバーレイの要素に適用するクラス名 */
		_dropdownMenuOverlay: 'combobox-dropdown-menu-overlay',
		/** ドロップダウンリストのハイライトする要素に適用するクラス名 */
		_dropdownMenuHighlightClassName: 'combobox-dropdown-menu-highlight',
		/** ドロップダウンリストを非表示にするクラス名 */
		_dropdownMenuVisibilityHidden: 'combobox-dropdown-menu-visibility-hidden',
		/** ドロップダウンリストを表示するクラス名 */
		_dropdownMenuVisibilityVisible: 'combobox-dropdown-menu-visibility-visible',
		/** リサイズイベントが発火するまでの遅延時間(ms) */
		_resizeEventThreshold: RESIZE_EVENT_THRESHOLD,
		/** 親要素(input要素) */
		_$parent: null,
		/** ルート要素 */
		_$root: null,
		/** body */
		_$body: null,
		/** ドロップダウンボタン要素 */
		_$btn: null,
		/** オーバーレイ要素 */
		_$overlay: null,
		/** 一回の読込みでドロップダウンに表示するアイテム数 */
		_maxItems: 0,
		/** テキストボックスに適用したスタイル情報 */
		_restoreStyles: {},
		/** リストアイテムに表示するテキストを生成する関数 */
		_listItemTextFormatter: null,
		/** 検索対象に含めるプロパティ名 */
		_searchProps: null,
		/** メニューの左枠線幅 */
		_rootLeftBorderWidth: null,
		/** メニューの右枠線幅 */
		_rootRightBorderWidth: null,
		/** リサイズタイマーID */
		_resizeTimerId: null,
		/** 仮想スクロール */
		_virtualScroll: null,
		/** postする値を格納するhidden要素 */
		_$hiddenElement: null,
		/** grid layout */
		_layout: null,
		/** grid dataSource */
		_dataSource: null,
		/** grid scrollStrategy */
		_scrollStrategy: null,
		/** データ全体の長さ */
		_dataTotalLength: null,
		/** postData */
		_postData: null,
		/** 描画されているliタグ */
		_$renderMenuList: null,
		/** 選択されているli要素 */
		_selectedLineObj: {
			$li: null,
			indexOfData: -1
		},
		/** ハイライト要素 */
		_highlightLineObj: {
			$li: null,
			indexOfData: -1,
			indexOfDom: -1
		},

		_onsubmitWrapper: null,

		__ready: function(context) {
			var args = context.args;

			// ユーザ指定パラメータ
			this._searchLabel = args.hasOwnProperty('searchLabel') ? args.searchLabel : true;
			this._listItemTextFormatter = createListItemTextFormatter(args.textFormat, this);
			this._searchProps = args.searchProps || [];
			this._maxItems = args.maxItems || DEFAULT_MAX_ITEMS;

			this.view.register(this._templateName, MENU_TEMPLATE);

			this._$root = $(this.rootElement);
			this._$body = $('body');
			this._$parent = $(context.args.parent);
			this._$hiddenElement = $(context.args.hiddenElement);

			//テキストボックスの親要素のsubmitイベントにハンドラを登録する
			this._onsubmitWrapper = this.own(this._submitEventHandler);
			this._$root.parents('form').submit(this._onsubmitWrapper);

			this._rootLeftBorderWidth = parseFloat(this._$root.css('border-left-width'));
			this._rootRightBorderWidth = parseFloat(this._$root.css('border-right-width'));

			//dataSourceの初期化
			var readyPromise = this.initDropDownList(context.args);

			//データ変更時のイベントハンドラを設定
			this._dataSource.addEventListener('changeSource', this.own(this.setDataTotalLength));

			// IE9では、テキストボックスにフォーカスが当たっている状態でスクロールバーをクリックすると
			// テキストボックスのフォーカスが外れfocusoutイベントが発生してしまう
			// そのためfocusousetは使用せず、ドロップダウンリスト表示中のみ存在する透明のオーバーレイ要素を作って擬似的にfocusoutと同じ処理を行う
			// (ただしTabキーでのフォーカス移動は、ComboBoxControllerのkeyupで対応する)
			this._$overlay = $('<div></div>').addClass(this._dropdownMenuOverlay);
			// オーバーレイ クリックイベント
			this._$overlay.click(this.own(this._overlayHitHandler));
			// ウィンドウサイズを計算してオーバーレイを表示する
			this._resizeOverlay();

			var offset = this._$parent.offset();
			//			var parentBorderStyle = this._$parent.css('border-top-style'); // IEではborder-styleだと値が取得できないのでborder-top-styleで取得する
			var parentBorderColor = this._$parent.css('border-top-color'); // IEではborder-colorだと値が取得できないのでborder-top-colorで取得する
			//			var parentTopBorder = parseFloat(this._$parent.css('border-top-width'));
			//			var parentBottomBorder = parseFloat(this._$parent.css('border-bottom-width'));
			//			var parentLeftBorder = parseFloat(this._$parent.css('border-left-width'));
			//			var parentRightBorder = parseFloat(this._$parent.css('border-right-width'));
			var btnHeight = this._$parent.outerHeight();

			// appearanceが適用されていてかつ色がデフォルトの場合は、ボタンにボーダーカラーを適用しない
			if (this._$parent.css('appearance') !== 'none'
					&& parentBorderColor.replace(/ /g, '') === 'rgb(0,0,0)') {
				parentBorderColor = '';
			}

			// ドロップダウンリスト表示用ボタンアイコン
			var $btnIcon = $('<div></div>').addClass(this._dropdownBtnIconClassName);

			// ドロップダウンリスト表示用ボタン
			this._$btn = $('<div name="combo-box-dropdown-button"></div>');
			this._$btn.addClass(this._dropdownBtnClassName);
			// テキストボックスのサイズに合わせてボタンのサイズを調整すし、ボーダーのスタイルをコピーする
			this._$btn.css({
				height: btnHeight
			//				borderStyle: parentBorderStyle,
			//				borderColor: parentBorderColor,
			// borderWidth: h5.u.str.format('{0}px {1}px {2}px {3}px', parentTopBorder,
			//		parentBottomBorder, parentLeftBorder, parentRightBorder)
			});

			var borderTopRightRadius = parseInt(this._$parent.css('border-top-right-radius'));
			var borderBottomRightRadius = parseInt(this._$parent.css('border-bottom-right-radius'));

			// テキストボックスとボタンの境界を結合するため、
			// テキストボックスの右上と右下にborder-radiusが適用されている場合はそれを解除して、ボタンの右上と右下にborder-radiusを適用する
			if (!isNaN(borderTopRightRadius) && borderTopRightRadius > 0) {
				this._$parent.css('border-top-right-radius', 0);
				this._$btn.css('border-top-right-radius', borderTopRightRadius);
				this._restoreStyles['border-top-right-radius'] = '';
			}

			if (!isNaN(borderBottomRightRadius) && borderBottomRightRadius > 0) {
				this._$parent.css('border-bottom-right-radius', 0);
				this._$btn.css('border-bottom-right-radius', borderBottomRightRadius);
				this._restoreStyles['border-bottom-right-radius'] = '';
			}

			// IEだと$().css('margin')で値が取得できないので個別に取得する
			var parentMarginTop = parseInt(this._$parent.css('margin-top'));
			var parentMarginRight = parseInt(this._$parent.css('margin-right'));
			var parentMarginBottom = parseInt(this._$parent.css('margin-bottom'));
			var parentMarginLeft = parseInt(this._$parent.css('margin-left'));
			var marginStr = h5.u.str.format('{0}px {1}px {2}px {3}px', parentMarginTop,
					parentMarginRight, parentMarginBottom, parentMarginLeft);

			// 重なっている部分のボーダーを無くす
			//this._$btn.css('border-left', 'none');
			// テキストボックスの余白と同じ余白を取る
			this._$btn.css('margin', marginStr);
			this._$btn.append($btnIcon);

			var $btnWrap = $('<div></div>').addClass(this._dropdownBtnWrapClassName);
			$btnWrap.append(this._$btn);
			this._$parent.after($btnWrap);

			// ボタンのサイズに合わせてアイコンの位置を調整する
			//			var marginTop = (btnHeight - $btnIcon.outerHeight()) / 2;
			//			$btnIcon.css('margin-top', marginTop);

			this._resizeMenu();

			return readyPromise;
		},
		__dispose: function() {
			// テキストボックスのスタイルを元に戻す
			this._$parent.css(this._restoreStyles);
		},
		__unbind: function() {
			this._$root.parents('form').unbind('submit', this._onsubmitWrapper);
		},
		/**
		 * 指定されたデータからドロップダウンリストのリストアイテムを生成します
		 *
		 * @param args
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		initDropDownList: function(args) {

			//dataSourceを作成する
			this.createDataSource(args);

			//grid strategyを取得
			this._scrollStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();

			//プルダウンを囲むdivへ grid layoutをバインドする
			this._layout = h5.core
					.controller(this.rootElement, h5.ui.components.combobox.ListLayoutController);

			//ドロップダウンリストを初期化する
			this._layout.init(this._dataSource, this.own(this.rendererFunction), 20,
					this._scrollStrategy);

			return this._layout.getInitializePromise();

		},

		/**
		 * 指定されたデータからDataSourceを初期化します
		 *
		 * @param args
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		createDataSource: function(args) {
			if (args.data) {
				//引数がdataの場合はlocalDataSourceを作成する
				this._dataSource = h5.ui.components.virtualScroll.data.createLocalDataSource(args.data);

				//フィルター設定
				if (args.filter && jQuery.isFunction(args.filter)) {
					this.setFilter(args.filter);
				} else {
					this._dataSource.setFilterFunction('value', function(arg, data) {
						return data.value.indexOf(arg) === 0;
					});
				}

			} else if (args.url) {
				//引数がurlの場合はLazyLoadDataSourceを作成する
				this._dataSource = h5.ui.components.virtualScroll.data.createLazyLoadDataSource(args.url,
						args.ajaxSettings);
				this._postData = args.postData;
			}
		},

		setFilter: function(filter) {
			if (filter && jQuery.isFunction(filter)) {
				this._dataSource.setFilterFunction('value', filter);
			}
		},

		/**
		 * 指定されたデータからDataSourceを生成し、ListLayoutへ再設定します
		 *
		 * @param args
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		refreshDataSource: function(args) {
			//dataSourceを作り直す
			this.createDataSource(args);
			//再設定
			this._layout.setDataSource(this._dataSource);
		},
		/**
		 * オーバーレイのサイズとドロップダウンリストの幅をリサイズします
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		'{window} resize': function() {
			if (this._resizeTimerId) {
				clearTimeout(this._resizeTimerId);
				this._resizeTimerId = null;
			}

			this._resizeTimerId = setTimeout(this.own(function() {
				this._resizeOverlay();
				this._resizeMenu();
			}), this._resizeEventThreshold);
		},
		/**
		 * マウス上のリストアイテムを選択状態(ハイライト)にします
		 *
		 * @param context
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		'li mouseenter': function(context, $el) {
			var $li = this._$root.find('li');
			$li.removeClass(this._dropdownMenuHighlightClassName);

			this._setHighlight($el);
		},
		/**
		 * 選択中の値をテキストボックスに反映します
		 *
		 * @param context
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		'li click': function(context, $el) {
			this.selectMenu();
			this.hideMenu();
			this._$parent.focus();
		},
		/**
		 * ドロップダウンリストの末尾に検索結果を追加(遅延表示)します
		 *
		 * @param context
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		'{rootElement} scroll': function(context, $el) {
			// IEだとスクロールバーを操作するとテキストボックスからフォーカスが外れるため、外れないようにする
			this._$parent.focus();
		},

		/**
		 * ドロップダウンリストの総数を設定する
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		setDataTotalLength: function() {
			this._dataTotalLength = this._dataSource.getTotalLength();
		},

		/**
		 * ドロップダウンリストのHTML生成関数
		 */
		rendererFunction: function($target, data) {

			var html = this.view.get(this._templateName, {
				items: data,
				matchedClass: this._matchedListClassName,
				activeClass: this._activeListClassName,
				hiliteClass: this._dropdownMenuHighlightClassName,
				formatter: this._listItemTextFormatter
			});

			$target[0].innerHTML = html;
		},

		/**
		 * 引数に指定した値と前方一致するリストアイテムを候補として表示します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		narrowDown: function() {

			//古いデータが見えないようドロップダウンリストを非表示にする
			var $list = this._$root.find('li');
			$list.addClass(this._dropdownMenuVisibilityHidden);

			//テキストボックスの入力値を検索条件に設定
			var val = this._$parent.val();
			var filterValue = {
				value: val
			};

			//postDataが存在する場合は、検索条件に追加
			if (this._postData) {
				$.extend(filterValue, this._postData);
			}
			//検索する
			this._layout.changeSearchOptions({
				filter: filterValue
			});
		},
		/**
		 * ドロップダウンリストとテキストボックスに対して以下の処理を行います
		 * <ul>
		 * <li>現在表示している最後のリストアイテムの情報を削除</li>
		 * <li>ドロップダウンリストのスクロール位置を先頭に設定する</li>
		 * <li>選択状態を解除する</li>
		 * </ul>
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		resetMenu: function() {
			this.rootElement.scrollTop = 0;
			this._removeHighlight(this._highlightLineObj.$li);
		},

		/**
		 * ドロップダウンリストを表示します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		showMenu: function() {
			this._resizeMenu();
			this._$root.show();
			this._$parent.focus();
			this._$body.append(this._$overlay);

			// ドロップボタン、ドロップダウンリスト、オーバーレイの順で要素が前面にくるようz-indexを設定する
			this._$overlay.css('z-index', Z_INDEX_START_VALUE);
			this._$parent.css('z-index', Z_INDEX_START_VALUE + 2);
			this._$root.css('z-index', Z_INDEX_START_VALUE + 3);
			this._$btn.css('z-index', Z_INDEX_START_VALUE + 4);

			delete this._restoreStyles.position;
		},
		/**
		 * ドロップダウンリストを非表示にします
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		hideMenu: function() {
			//入力値をhidden項目へ設定します。
			this.setHiddentValue(this._$parent.val());
			this._$overlay.detach();
			this._$root.hide();

			// z-indexを除去する
			this._$overlay.css('z-index', '');
			this._$parent.css('z-index', '');
			this._$root.css('z-index', '');
			this._$btn.css('z-index', '');
		},
		/**
		 * ドロップダウンリストの表示、非表示を判定します <p> true：表示 false：非表示
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		isShowMenu: function() {
			var isShowMenu;
			this._$root.is(':visible') ? isShowMenu = true : isShowMenu = false;
			return isShowMenu;
		},
		/**
		 * 現在選択中のリストアイテムの次にあるリストアイテムを選択状態にします
		 * <p>
		 * 何も選択されていない場合は先頭の要素を選択状態にします
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		highlightNext: function() {
			//選択行がある かつ 表示範囲の中にハイライト行が存在しない場合
			//次の行を先頭にするようスクロールし、ハイライトする
			if (this._highlightLineObj.$li !== null
					&& (this._dataStartIndex > this._highlightLineObj.indexOfData || this._dataEndIndex < this._highlightLineObj.indexOfData)) {

				//差分行数を求める
				var difference = this._highlightLineObj.indexOfData - this._dataStartIndex;
				if (difference > -(this._dataTotalLength)) {
					//差分が総データ数より大きい場合は、差分 + 1し次の行が先頭になるよう調整する
					difference++;
				}

				if (this._dataTotalLength > this._highlightLineObj.indexOfData) {
					//次の行をハイライトするためindexを1加算
					this._highlightLineObj.indexOfData++;
				}

				//次の行が先頭になるようスクロールする
				this._layout.moveIndex(difference);

			} else {

				//選択行が表示されているリスト内に存在する場合
				if (this._$renderMenuList.length - 1 > this._highlightLineObj.indexOfDom) {

					//ハイライトを解除
					if (this._highlightLineObj.$li !== null) {
						this._removeHighlight(this._highlightLineObj.$li);
					}

					//次の行をハイライトする
					this._highlightLineObj.indexOfDom++;
					this._setHighlight($(this._$renderMenuList[this._highlightLineObj.indexOfDom]));

				} else {
					//選択行が表示されているリストに存在しない場合

					//次の行が存在する場合
					if (this._dataTotalLength - 1 > this._highlightLineObj.indexOfData) {
						//次の行をハイライトするためindexを1加算
						this._highlightLineObj.indexOfData++;
						//1行次にスクロールする
						this._layout.moveIndex(1);
					}
				}
			}
		},


		/**
		 * 現在選択中のリストアイテムの前にあるリストアイテムを選択状態にします
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		highlightPrev: function() {

			//選択行がある かつ 表示範囲の中にハイライト行が存在しない場合
			//次の行を先頭にするようスクロールし、ハイライトする
			if (this._highlightLineObj.$li !== null
					&& (this._dataStartIndex > this._highlightLineObj.indexOfData || this._dataEndIndex < this._highlightLineObj.indexOfData)) {

				//差分行数を求める
				var difference = this._highlightLineObj.indexOfData - this._dataStartIndex;
				if (difference > -(this._dataTotalLength)) {
					//差分が総データ数より大きい場合は、差分 - 1し前の行が先頭になるよう調整する
					difference--;
				}

				if (0 < this._highlightLineObj.indexOfData) {
					//前の行をハイライトするためindexを1減算
					this._highlightLineObj.indexOfData--;
				}

				//次の行が先頭になるようスクロールする
				this._layout.moveIndex(difference);

			} else {

				//選択行が表示されているリスト内に存在する場合
				if (0 < this._highlightLineObj.indexOfDom) {

					//ハイライトを解除
					if (this._highlightLineObj.$li !== null) {
						this._removeHighlight(this._highlightLineObj.$li);
					}

					//前の行をハイライトする
					this._highlightLineObj.indexOfDom--;
					this._setHighlight($(this._$renderMenuList[this._highlightLineObj.indexOfDom]));

				} else {
					//選択行が表示されているリストに存在しない場合

					//前の行が存在場合
					if (0 < this._highlightLineObj.indexOfData) {
						//前の行をハイライトするためindexを1減算
						this._highlightLineObj.indexOfData--;
						//1行前にスクロールする
						this._layout.moveIndex(-1);
					}
				}
			}
		},

		/**
		 * ドロップダウンリスト描画範囲変更イベント
		 * <p>
		 * 描画されているliタグを取得します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		'{rootElement} renderList': function(context) {

			this._$renderMenuList = this._$root.find('li');

			var evArg = context.evArg;

			//描画範囲を設定
			this._dataStartIndex = evArg.start;
			this._dataEndIndex = evArg.end;

			//描画範囲にハイライト対象がある場合は、ハイライト処理をする
			this._searchHighlightLi();
		},
		/**
		 * 描画されているliタグでハイライト対象を検索し、該当ありの場合にハイライトします
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_searchHighlightLi: function() {

			jQuery.each(this._$renderMenuList, this.own(function(idx, li) {
				var $li = $(li);
				var dataIndex = idx + this._dataStartIndex;

				if (dataIndex === this._highlightLineObj.indexOfData) {
					this._setHighlight($li);
					return false;
				}

				var val = $li.data('value').toString();
				var parentVal = this._$parent.val();
				//テキストの入力値に完全一致するユニークな行がある場合はハイライト
				if (val === parentVal && this._$renderMenuList.length === 1) {
					this._setHighlight($li);
					this.selectMenu();
					return false;
				}
			}));
		},

		/**
		 * 選択中の値をテキストボックスに反映します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		selectMenu: function() {
			if (this._highlightLineObj.$li === null) {
				return;
			}
			// テキストボックスに表示されている値を反映する
			this._$parent.val(this._highlightLineObj.$li.text()).change();

			// hidden要素にvalueを反映する
			this.setHiddentValue(this._highlightLineObj.$li.data('value'));

			//選択要素を保持する
			this.setSelectedLi(this._highlightLineObj.$li, this._highlightLineObj.indexOfData);
		},
		/**
		 * hidden要素にvalueを反映する
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		setHiddentValue: function(value) {
			this._$hiddenElement.val(value);
		},
		/**
		 * オーバーレイ要素のサイズをウィンドウサイズに合わせます
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_resizeOverlay: function() {
			// 互換モードは考慮しない
			this._$overlay.css({
				width: document.documentElement.scrollWidth, // innerやoffsetから取得すると余分な幅ができてスクロールバーが表示されてしまうため、scrollWidthから取得する
				height: Math.max(document.documentElement.clientHeight,
						document.documentElement.scrollHeight), //ie8対策 window.innerHeight→document.documentElement.clientHeight
			});
		},
		/**
		 * ドロップダウンリストの幅をテキストボックス+ボタンの幅に合わせます
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_resizeMenu: function() {
			this._$root.width((this._$parent.outerWidth() + this._$btn.outerWidth())
					- (this._rootLeftBorderWidth + this._rootRightBorderWidth));
		},

		/**
		 * 指定した要素を選択状態にします
		 *
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_setHighlight: function($el) {
			$el.addClass(this._dropdownMenuHighlightClassName);
			this._setHighlightIndex($el);
		},
		/**
		 * ハイライト表示を除去します
		 *
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_removeHighlight: function($el) {
			if ($el) {
				$el.removeClass(this._dropdownMenuHighlightClassName);
			}
		},
		/**
		 * ドロップダウンリスト要素と 引数の要素を比較し、valueが同じ要素の表示順をhighlightIndexに保持します
		 *
		 * @param $el
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_setHighlightIndex: function($el) {

			jQuery.each(this._$renderMenuList, this.own(function(idx, li) {
				var $li = $(li);
				if ($li.data('value') === $el.data('value')) {
					this._highlightLineObj.$li = $li;
					this._highlightLineObj.indexOfDom = idx;
					this._highlightLineObj.indexOfData = this._dataStartIndex + idx;
					return false;
				}
			}));
		},
		/**
		 * オーバーレイクリックイベント ドロップダウンリストを非表示にします
		 * <p>
		 * ルート要素上でクリックされた場合は、カーソルを末尾に移動します
		 *
		 * @param ev
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_overlayHitHandler: function(ev) {
			this.hideMenu();
			// オーバーレイの裏側にある要素を取得する
			var $e = $(document.elementFromPoint(ev.pageX, ev.pageY));

			$e.is(':button') ? $e.click() : $e.focus();
		},
		/**
		 * ドロップダウンボタン押下イベント
		 * <p>
		 * ドロップダウンリストを表示または非表示にします
		 *
		 * @param event
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_dropDownBtnClickHandler: function(event) {
			this.isShowMenu() ? this.hideMenu() : this.showMenu();
			this.narrowDown();
		},
		/**
		 * 所属するformのsubmitイベント
		 * <p>
		 * コンボボックスのinput要素をformから削除します
		 *
		 * @parent event
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		_submitEventHandler: function() {
			//隠し要素にname属性を追加
			this._$hiddenElement.attr('name', this._$parent.attr('name'));
			//テキストボックスを削除
			this._$parent.remove();
		},
		/**
		 * 選択（click または enter）されたli要素のdataを返します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		getSelectedLiData: function() {
			if (this._selectedLineObj.$li !== null) {
				return this._dataSource.getCachedData(this._selectedLineObj.indexOfData);
			}
			return null;
		},
		/**
		 * 選択（click または enter）されたli要素を設定します
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		setSelectedLi: function($li, indexOfData) {
			this._selectedLineObj.$li = $li;
			this._selectedLineObj.indexOfData = indexOfData;
		},
		/**
		 * 選択した li要素 をクリアします <pr>
		 *
		 * @memberOf h5.ui.components.combobox.DropDownListController
		 */
		clearSelectedLi: function() {
			this._selectedLineObj.$li = null;
			this._selectedLineObj.indexOfData = -1;
		},

		clearHighlightLi: function() {
			if (this._highlightLineObj.$li !== null) {
				this._removeHighlight(this._highlightLineObj.$li);
			}

			this._highlightLineObj.$li = null;
			this._highlightLineObj.indexOfData = -1;
			this._highlightLineObj.indexOfDom = -1;
		}
	};

	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(dropDownListControllerDef);
})(jQuery);

(function($) {

	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================
	/**
	 * コンボボックス全体を管理するコントローラ
	 *
	 * @class h5.ui.components.combobox.ComboBoxRootController
	 */
	var comboBoxRootController = {
		__name: 'h5.ui.components.combobox.ComboBoxRootController',

		_drowDownListController: null,

		__ready: function(context) {
			this._drowDownListController = context.args.dropDownListController;
		},

		/**
		 * ドロップダウンボタン押下イベント
		 * <p>
		 * ドロップダウンリストを表示または非表示にします
		 *
		 * @param event
		 * @memberOf h5.ui.components.combobox.ComboBoxRootController
		 */
		'div[name="combo-box-dropdown-button"] click': function(event) {
			this._drowDownListController._dropDownBtnClickHandler(event);
		},

		clickComboBoxDropdownButton: function() {
			this.$find('div[name="combo-box-dropdown-button"]').trigger('click');
		}
	};
	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(comboBoxRootController);

})(jQuery);

(function($) {

	// =========================================================================
	//
	// 外部定義のインクルード
	//
	// =========================================================================

	// =========================================================================
	//
	// スコープ内定数
	//
	// =========================================================================
	//絞り込みが実行されるまでの遅延時間(ms)
	var NARROWDOUN_THRESHOLD = 100;

	// =========================================================================
	//
	// スコープ内静的プロパティ
	//
	// =========================================================================

	// =============================
	// スコープ内静的変数
	// =============================

	// =============================
	// スコープ内静的関数
	// =============================

	// =========================================================================
	//
	// メインコード（コントローラ・ロジック等）
	//
	// =========================================================================
	/**
	 * コンボボックス機能を制御するコントローラ
	 *
	 * @class h5.ui.components.combobox.ComboBoxController
	 */
	var comboBoxController = {
		__name: 'h5.ui.components.combobox.ComboBoxController',
		/** INPUT要素を包含する要素(ルート)に適用するクラス名 */
		_baseClassName: 'combobox-root',
		/** INPUT要素に適用するクラス名 */
		_comboboxInputClassName: 'combobox-input',
		/** ドロップダウンリスト要素に適用するクラス名 */
		_comboBoxMenuClassName: 'combobox-menu',
		/** ドロップダウンリストを包含する要素に適用するクラス名 */
		_comboBoxMenuWrapperClassName: 'combobox-menu-wrapper',
		/** 絞り込みの遅延時間(ms) */
		_narrowDounThreshold: NARROWDOUN_THRESHOLD,
		/** ドロップダウンリストコントローラ */
		_dropDownListController: null,
		/** 絞り込みタイマーID */
		_narrowDounId: null,
		/** jQuery化したルート要素 */
		_$input: null,
		/** コンボボックスの選択値を格納する隠し要素 */
		_$hiddenElement: null,

		init: function(context) {

			//rootElementのチェック
			if (!this._isInputElement(this.rootElement)) {
				return;
			}

			var args = context;

			this._$input = $(this.rootElement).addClass(this._comboboxInputClassName);

			var $parent = this._$input.parent();
			var $rootWrap = $('<div></div>').addClass(this._baseClassName);

			//hidden エレメントを取得する
			var $hidden = this._getHiddenElement();
			if ($hidden !== null) {
				//hidden エレメントがある場合は、そのまま使う
				this._$hiddenElement = $hidden;
			} else {
				//hidden エレメントがない場合は、作成する
				this._$hiddenElement = this._createHiddenElement();
			}

			var $menuWrap = $('<div></div>').addClass(this._comboBoxMenuWrapperClassName);
			var $menu = $('<div></div>').addClass(this._comboBoxMenuClassName).hide();

			// ドロップダウンリストがテキストボックスの真下に表示されるよう設定する
			$menu.css('top', this._$input.outerHeight());
			$menu.css('left', 0);

			//テキストボックス、hiddenタグをDIVでくるむ
			$menuWrap.append($menu);
			$rootWrap.append($menuWrap);
			$rootWrap.append(this._$input);
			$rootWrap.append(this._$hiddenElement);


			$parent.append($rootWrap);

			var dropDownParam = {
				parent: this.rootElement,
				hiddenElement: this._$hiddenElement
			};

			$.extend(dropDownParam, args);

			this._dropDownListController = h5.core.controller($menu,
					h5.ui.components.combobox.DropDownListController, dropDownParam);

			var rootComboParam = {
				dropDownListController: this._dropDownListController
			};

			this._comboboxRootController = h5.core.controller($rootWrap,
					h5.ui.components.combobox.ComboBoxRootController, rootComboParam);
			var def = h5.async.deferred();
			h5.async.when(this.readyPromise, this._dropDownListController.readyPromise,
					this._comboboxRootController.readyPromise).done(this.own(function() {
				def.resolve(this);
			}));
			this.initComboboxPromise = def.promise();
			return this.initComboboxPromise;
		},

		_getHiddenElement: function() {
			//input要素と同じname属性でtype="hidden"のinput要素を検索
			var $inputNextElement = this._$input.next('input[type="hidden"][data-name="'
					+ this._$input.attr('name') + '"]');
			if ($inputNextElement.length !== 0) {
				return $inputNextElement;
			}
			return null;
		},

		_createHiddenElement: function() {
			//コンボボックスの選択値を格納する隠しinput要素を作成
			//name属性は、テキストボックス（root）と同じにする
			return $('<input type="hidden" data-name="' + this._$input.attr("name") + '" value="'
					+ this._$input.val() + '">');
		},

		// コンボボックスにfocusしているときは、input要素からfocusoutイベントをあげないようにする。
		'{rootElement} focusout': function(context, $el) {
			// TODO: activeElementはChromeではbodyになってしまうので、要別対応
			if (this._$input.closest('.combobox-root').find(document.activeElement).size() > 0) {
				context.event.stopPropagation();
			}
		},
		/**
		 * 上下矢印キー押下されたらカーソルを移動します
		 *
		 * @param context
		 * @param $el
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		'{rootElement} keydown': function(context, $el) {
			var keyCode = context.event.which;

			if (keyCode === 9) { // shift
				this._dropDownListController.hideMenu();
				return;
			}

			if (keyCode === 38) { // arrow-up
				this._dropDownListController.highlightPrev();
				return;
			}
			if (keyCode === 40) { // arrow-down
				//メニューが非表示の場合は▼ボタンクリックと同様に動く
				if (!this._dropDownListController.isShowMenu()) {
					this._comboboxRootController.clickComboBoxDropdownButton();
				}
				this._dropDownListController.highlightNext();
				return;
			}

			if (keyCode === 13) { //enter
				context.event.preventDefault();
				return;
			}

			if (keyCode !== 38 && keyCode !== 40) {
				return;
			}
		},
		/**
		 * 入力された値と一致するリストアイテムをドロップダウンリストに表示します
		 * <p>
		 * エンターキーが押下されたら、選択中の値をテキストボックスに反映します
		 *
		 * @param context
		 * @param $el
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		'{rootElement} keyup': function(context, $el) {
			var keyCode = context.event.which;

			if (keyCode === 13) { // enter
				context.event.preventDefault();

				this._dropDownListController.selectMenu();
				this._dropDownListController.hideMenu();
				this._$input.focus();
				return;
			}

			// backspace, space, del, [a-z], [0-9], テンキー, 記号 以外のキーは受け付けないようにする
			if (!(keyCode === 8 || keyCode === 32 || keyCode === 46
					|| (48 <= keyCode && keyCode <= 57) || (65 <= keyCode && keyCode <= 90)
					|| (96 <= keyCode && keyCode <= 105) || (186 <= keyCode && keyCode <= 192)
					|| (219 <= keyCode && keyCode <= 222) || keyCode === 226)) {
				return;
			}

			// Chromeでサジェストするとドロップダウンリストのスクロールがなぜかカクつくため、一旦ドロップダウンリストを非表示にしてから検索処理を行う
			this._dropDownListController._$root.hide();

			var val = $el.val();

			if (val == null) {
				val = '';
			} else {
				// 正規表現リテラルをエスケープする
				val = val.replace(/[\\\*\+\.\?\{\}\(\)\[\]\^\$\-\|\/]/g, function(val) {
					return '\\' + val;
				});
			}

			if (this._narrowDounId) {
				clearTimeout(this._narrowDounId);
				this._narrowDounId = null;
			}

			this._narrowDounId = setTimeout(this.own(function() {

				//検索条件が変わったので全てのハイライトを削除
				this._dropDownListController.clearHighlightLi();

				//検索条件がかわったので選択要素をクリア
				this._dropDownListController.clearSelectedLi();

				//絞り込み処理実行
				this._dropDownListController.narrowDown();

				//メニュー表示し、スクロール位置を先頭にする
				this._dropDownListController.showMenu();
				this._dropDownListController.resetMenu();

			}), this._narrowDounThreshold);
		},
		/**
		 * コンボボックス機能を無効にします
		 *
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		disable: function() {
			this._$input.prop('disabled', 'disabled');
			this.disableListeners();
			this._comboboxRootController.disableListeners();
			this._dropDownListController.disableListeners();
		},
		/**
		 * コンボボックスの機能を有効にします
		 *
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		enable: function() {
			this._$input.prop('disabled', '');
			this.enableListeners();
			this._comboboxRootController.enableListeners();
			this._dropDownListController.enableListeners();
		},
		/**
		 * コンボボックスを破棄します
		 *
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		destroy: function() {
			var dropDownListController = this._dropDownListController;
			var $input = this._$input;

			this._$input.removeClass(this._comboboxInputClassName);
			this.dispose();
			dropDownListController.dispose();

			$input.siblings().remove();
			$input.unwrap();
		},
		/**
		 * 指定されたデータからドロップダウンリストのリストアイテムを再生成します
		 * <p>
		 * テキストボックスに入力がある場合は、その値で検索を実行します。
		 *
		 * @param newItems
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		refresh: function(args) {
			//ドロップダウンリスト初期化
			this._dropDownListController.refreshDataSource(args);
		},

		/**
		 * 指定した要素が入力要素かどうかチェックします
		 *
		 * @returns コンボボックスコントローラ
		 * @memberOf h5.ui.components.combobox.ComboBoxController
		 */
		_isInputElement: function(elem) {
			if (!elem) {
				return false;
			}

			var type = typeof elem;

			if (type !== 'string' && type !== 'object') {
				return false;
			}

			var $elem = $(elem);

			if (!($elem.is('input') && $elem
					.is('[type="text"], [type="tel"], [type="url"], [type="email"], [type="number"]'))) {
				return false;
			}
			return true;
		},

		getText: function() {
			return this._$input.val();
		},

		getValue: function() {
			return this._$hiddenElement.val();
		},

		setFilter: function(filter) {
			this._dropDownListController.setFilter(filter);
		},

		getSelectedItem: function() {
			var data = this._dropDownListController.getSelectedLiData();
			return data;
		}
	};

	// =========================================================================
	//
	// 外部公開
	//
	// =========================================================================
	h5.core.expose(comboBoxController);

})(jQuery);
(function() {

	var contextMenuController = {

		__name: 'h5.ui.ContextMenuController',

		_contextMenu: null,

		contextMenuExp: '',

		targetAll: true,

		__construct: function(context) {
			if (context.args) {
				var targetAll = context.args.targetAll;
				if (targetAll != undefined) {
					this.targetAll = context.args.targetAll;
				}
				var contextMenuExp = context.args.contextMenuExp;
				if (contextMenuExp != undefined) {
					this.contextMenuExp = context.args.contextMenuExp;
				}
			}
		},

		__ready: function(context) {
			var root = $(this.rootElement);
			var targetAll = root.attr('data-targetall');
			if (targetAll != undefined) {
				if (/false/i.test(targetAll)) {
					targetAll = false;
				}
				this.targetAll = !!targetAll;
			}
			var contextMenuExp = root.attr('data-contextmenuexp');
			if (contextMenuExp != undefined) {
				this.contextMenuExp = context.args.contextMenuExp;
			}
			this.close();
		},

		_getContextMenu: function(exp) {
			return this.$find('> .contextMenu' + (exp || this.contextMenuExp));
		},

		close: function(selected) {
			var $contextMenu = this.$find('> .contextMenu');

			// selectMenuItemイベントを上げる
			// 選択されたアイテムがあれば、それを引数に入れる
			// そもそもopenしていなかったらイベントは上げない
			if ($contextMenu.css('display') !== 'none') {
				this.trigger('selectMenuItem', {
					selected: selected ? selected : null
				});
			}

			if ($contextMenu.css('display') === 'none') {
				// 既にdisplay:noneなら何もしない(イベントもあげない)
				return;
			}
			$contextMenu.css({
				display: 'none'
			});
			// イベントを上げる
			this.trigger('hideCustomMenu');
		},

		_open: function(context, exp) {
			var contextMenu = this._getContextMenu(exp);

			// イベントを上げる
			// 既にopenしていたらイベントは上げない
			if (contextMenu.css('display') === 'none') {
				var e = this.trigger('showCustomMenu');
			}
			if (e.isDefaultPrevented()) {
				// preventDefaultされていたらメニューを出さない
				return;
			}

			contextMenu.css({
				display: 'block',
				visibility: 'hidden',
				left: 0,
				top: 0
			});
			var offsetParentOffset = contextMenu.offsetParent().offset();
			var left = context.event.pageX - offsetParentOffset.left;
			var top = context.event.pageY - offsetParentOffset.top;
			var outerWidth = contextMenu.outerWidth(true);
			var outerHeight = contextMenu.outerHeight(true);
			var scrollLeft = scrollPosition('Left')();
			var scrollTop = scrollPosition('Top')();
			var windowWidth = getDisplayArea('Width');
			var windowHeight = getDisplayArea('Height');
			var windowRight = scrollLeft + windowWidth;
			var windowBottom = scrollTop + windowHeight;
			var right = left + outerWidth;
			if (right > windowRight) {
				left = windowRight - outerWidth;
				if (left < scrollLeft)
					left = scrollLeft;
			}
			var bottom = top + outerHeight;
			if (bottom > windowBottom) {
				top = top - outerHeight;
				if (top < scrollTop)
					top = scrollTop;
			}

			initSubMenu(contextMenu, right, top);

			contextMenu.css({
				visibility: 'visible',
				left: left,
				top: top
			});

			function initSubMenu(menu, _right, _top) {
				menu.find('> .dropdown-submenu > .dropdown-menu').each(function() {
					var subMenu = $(this);
					var nextRight;
					var display = subMenu[0].style.display;
					subMenu.css({
						display: 'block'
					});
					var subMenuWidth = subMenu.outerWidth(true);
					if (subMenuWidth > windowRight - _right) {
						subMenu.parent().addClass('pull-left');
						nextRight = _right - subMenuWidth;
					} else {
						subMenu.parent().removeClass('pull-left');
						nextRight = _right + subMenuWidth;
					}

					var parent = subMenu.parent();
					var subMenuTop = _top + parent.position().top;
					var subMenuHeight = subMenu.outerHeight(true);
					if (subMenuHeight > windowBottom - subMenuTop) {
						subMenuTop = subMenuTop - subMenuHeight + parent.height();
						subMenu.css({
							top: 'auto',
							bottom: '0'
						});
					} else {
						subMenu.css({
							top: '0',
							bottom: 'auto'
						});
					}

					initSubMenu(subMenu, nextRight, subMenuTop);

					subMenu.css({
						display: display
					});
				});
			}

			//hifiveから流用(13470)
			function getDisplayArea(prop) {
				var compatMode = (document.compatMode !== 'CSS1Compat');
				var e = compatMode ? document.body : document.documentElement;
				return h5.env.ua.isiOS ? window['inner' + prop] : e['client' + prop];
			}

			//hifiveから流用(13455)
			function scrollPosition(propName) {
				var compatMode = (document.compatMode !== 'CSS1Compat');
				var prop = propName;

				return function() {
					// doctypeが「XHTML1.0 Transitional DTD」だと、document.documentElement.scrollTopが0を返すので、互換モードを判定する
					// http://mokumoku.mydns.jp/dok/88.html
					var elem = compatMode ? document.body : document.documentElement;
					var offsetProp = (prop === 'Top') ? 'Y' : 'X';
					return window['page' + offsetProp + 'Offset'] || elem['scroll' + prop];
				};
			}
		},

		/**
		 * コンテキストメニューを出す前に実行するフィルタ。 falseを返したらコンテキストメニューを出さない。
		 * 関数が指定された場合はその関数の実行結果、セレクタが指定された場合は右クリック時のセレクタとマッチするかどうかを返す。
		 */
		_filter: null,

		/**
		 * コンテキストメニューを出すかどうかを判定するフィルタを設定する。 引数には関数またはセレクタを指定できる。
		 * 指定する関数はcontextを引数に取り、falseを返したらコンテキストメニューを出さないような関数を指定する。
		 * セレクタを指定した場合は、右クリック時のevent.targetがセレクタにマッチする場合にコンテキストメニューを出さない。
		 *
		 * @memberOf ___anonymous46_5456
		 * @param selectorOrFunc
		 */
		setFilter: function(selectorOrFunc) {
			if (selectorOrFunc == null) {
				this._filter = null;
			} else if ($.isFunction(selectorOrFunc)) {
				// 渡された関数をthis._filterにセット
				this._filter = selectorOrFunc;
			} else if (typeof (selectorOrFunc) === 'string') {
				this._filter = function(context) {
					// targetがセレクタとマッチしたらreturn false;
					if ($(context.event.target).filter(selectorOrFunc).length) {
						return false;
					}
				};
			}
		},

		'{rootElement} contextmenu': function(context) {
			this.close();
			// _filterがfalseを返したら何もしない
			if (this._filter && this._filter(context) === false) {
				return;
			}
			if (this.targetAll) {
				context.event.preventDefault();
				context.event.stopPropagation();
				this._open(context);
			}
		},

		'{document.body} click': function(context) {
			this.close();
		},

		'{document.body} contextmenu': function(context) {
			this.close();
		},

		'.contextMenuBtn contextmenu': function(context) {
			//if(this.targetAll) return;
			context.event.preventDefault();
			context.event.stopPropagation();
			this.close();
			var current = context.event.currentTarget;
			var exp = $(current).attr('data-contextmenuexp');
			this._open(context, exp);
		},

		'> .contextMenu .dropdown-menu click': function(context) {
			context.event.stopPropagation();
			this.close();
		},

		'> .contextMenu .dropdown-submenu click': function(context) {
			context.event.stopPropagation();
		},

		'> .contextMenu contextmenu': function(context) {
			context.event.stopPropagation();
		},

		'> .contextMenu click': function(context) {
			context.event.stopPropagation();
		},

		'> .contextMenu li a click': function(context) {
			context.event.stopPropagation();
			this.close(context.event.target);
		}
	};

	h5.core.expose(contextMenuController);
})();
/*jshint jquery: true, forin: false */
/*global h5 */

// ---- EventDispatcher ---- //
(function($) {
	'use strict';

	function EventDispatcher() {
	// コンストラクタ
	}

	EventDispatcher.prototype.hasEventListener = function(type, listener) {
		if (!this.__listeners) {
			return false;
		}
		var l = this.__listeners[type];
		if (!l || !this.__listeners.hasOwnProperty(type)) {
			return false;
		}

		for (var i = 0, count = l.length; i < count; i++) {
			if (l[i] === listener) {
				return true;
			}
		}
		return false;
	};

	EventDispatcher.prototype.addEventListener = function(type, listener) {
		// 引数チェック
		if (arguments.length !== 2 || typeof type !== 'string' || !$.isFunction(listener)) {
			throw new Error('不正な引数です');
		}
		if (this.hasEventListener(type, listener)) {
			return;
		}

		if (!this.__listeners) {
			this.__listeners = {};
		}

		if (!(this.__listeners.hasOwnProperty(type))) {
			this.__listeners[type] = [];
		}

		this.__listeners[type].push(listener);
	};

	EventDispatcher.prototype.removeEventListener = function(type, listener) {
		if (!this.hasEventListener(type, listener)) {
			return;
		}

		var l = this.__listeners[type];

		for (var i = 0, count = l.length; i < count; i++) {
			if (l[i] === listener) {
				l.splice(i, 1);
				return;
			}
		}
	};

	EventDispatcher.prototype.dispatchEvent = function(event) {
		if (!this.__listeners) {
			return;
		}

		var l = this.__listeners[event.type];
		if (!l) {
			return;
		}

		if (!event.target) {
			event.target = this;
		}

		var isDefaultPrevented = false;

		event.preventDefault = function() {
			isDefaultPrevented = true;
		};

		for (var i = 0, count = l.length; i < count; i++) {
			l[i].call(event.target, event);
		}

		return isDefaultPrevented;
	};

	h5.u.obj.expose('h5.ui.components.virtualScroll.data', {

		/**
		 * @memberOf h5.ui.components.virtualScroll.data
		 */
		EventDispatcher: EventDispatcher
	});

})(jQuery);



// ----- DataSource ----- //
(function($) {
	'use strict';

	// ---- Cache ---- //

	var format = h5.u.str.format;

	var EventDispatcher = h5.ui.components.virtualScroll.data.EventDispatcher;


	// ---- Function ---- //

	var convertRange = function(start, end, totalLength) {
		var msg;
		if (start != null && typeof start !== 'number') {
			msg = '不正な引数です; start には number 型を指定してください';
			throw new Error(msg);
		}
		if (end != null && typeof end !== 'number') {
			msg = '不正な引数です; end には number 型を指定してください';
			throw new Error(msg);
		}

		var startValue = start;
		var endValue = end;

		if (totalLength == null) {
			return {
				start: 0,
				end: 0
			};
		}

		if (startValue == null) {
			startValue = 0;
		} else if (startValue < -totalLength) {
			startValue = 0;
		} else if (startValue < 0) {
			startValue = startValue + totalLength;
		}

		if (endValue == null) {
			endValue = totalLength;
		} else if (endValue < -totalLength) {
			endValue = 0;
		} else if (endValue < 0) {
			endValue = endValue + totalLength;
		}

		return {
			start: startValue,
			end: endValue
		};
	};


	// ---- LocalDataSource ---- //

	var LocalDataSource = function(baseData) {
		this._filters = {};
		this.setBaseData(baseData);
	};

	$.extend(LocalDataSource.prototype, new EventDispatcher(), {

		// --- Property --- //

		_baseData: null,

		_searched: null,

		_searchOptions: null,

		_filters: null,


		// --- Private Method --- //

		/**
		 * @memberOf h5.ui.components.virtualScroll.data.LocalDataSource
		 */
		_search: function() {
			if (!this._searchOptions) {
				this._searched = this._baseData;
				return;
			}


			var searched = this._searched = [];

			var filterOptions = this._searchOptions.filter || {};

			var len = this._baseData.length;

			for (var i = 0; i < len; i += 1) {

				var data = this._baseData[i];

				var skip = false;

				for ( var name in filterOptions) {
					var filterFunc = this._filters[name];
					if (filterFunc == null) {
						var msg = format('マッチする filter が存在しません; filterName = {0}', name);
						throw new Error(msg);
					}
					if (!filterFunc(filterOptions[name], data)) {
						skip = true;
						break;
					}
				}

				if (!skip) {
					searched.push(data);
				}
			}

			var sorts = this._searchOptions.sort;

			if (!sorts) {
				return;
			}

			searched.sort(function(x, y) {
				var len = sorts.length;

				for (var i = 0; i < len; i += 1) {
					var property = sorts[i].property;
					var isDesc = sorts[i].order === 'desc';

					if (x[property] < y[property]) {
						return isDesc ? 1 : -1;
					}
					if (y[property] < x[property]) {
						return isDesc ? -1 : 1;
					}
				}
				return 0;
			});
		},


		// --- Public Method --- //

		/**
		 * 使用するデータのリストを設定する。検索を行い、データが変更されたことを示すchangeSourceイベントをあげる。
		 *
		 * @param {Array} 使用するデータのリスト
		 * @memberOf h5.ui.components.virtualScroll.data.LocalDataSource
		 */
		setBaseData: function(baseData) {
			if (!$.isArray(baseData)) {
				var msg = format('不正な引数です; baseData = {0}', baseData);
				throw new Error(msg);
			}

			this._baseData = baseData.slice();

			this._search();
			this.dispatchEvent({
				type: 'changeSource'
			});
		},

		/**
		 * 検索条件を指定する。検索条件をセットすると、新たに検索を行い、データが変更されたことを示すchangeSourceイベントをあげる。
		 *
		 * @param {Object} searchOptions 検索条件<br>
		 * @param {Object} [searchOptions.filter] 絞込条件。絞込を行うためのキーをプロパティ名とし、そのときに使用する値をvalueとする。
		 * @param {Array} [searchOptions.sort]
		 *            ソート条件。配列内のオブジェクトは、ソート項目を指定するpropertyと、昇順、降順を表すorderを持つ。ソートは配列の前から順番に行われる。
		 * @memberOf h5.ui.components.virtualScroll.data.LocalDataSource
		 */
		changeSearchOptions: function(searchOptions) {
			if (searchOptions != null && !$.isPlainObject(searchOptions)) {
				var msg = '不正な引数です; searchOptions には object 型を指定してください';
				throw new Error(msg);
			}

			this._searchOptions = searchOptions;
			this._search();
			this.dispatchEvent({
				type: 'changeSource'
			});
		},

		getSearchOptions: function() {
			return $.extend(true, {}, this._searchOptions);
		},

		/**
		 * 絞込関数を登録する。searchOptionで指定したfilterのプロパティ名で、ここで登録した関数を使用して絞込を行う。
		 *
		 * @param {String} key 絞込のキー
		 * @param {Function} filterFunction
		 *            絞込関数。引数にsearchOptionのfilterで指定した値と、各行のデータを持つ。booleanを返し、trueの場合、絞込にマッチしたとする。
		 * @memberOf h5.ui.components.virtualScroll.data.LocalDataSource
		 */
		setFilterFunction: function(key, filterFunction) {

			// 引数チェック
			if (key == null) {
				throw new Error('不正な引数です; key は必ず指定してください');
			}
			if (typeof key !== 'string') {
				throw new Error('不正な引数です; key には string 型を指定してください');
			}
			if (filterFunction == null) {
				throw new Error('不正な引数です; filterFunction は必ず指定してください');
			}
			if (!$.isFunction(filterFunction)) {
				throw new Error('不正な引数です; filterFunction には function 型を指定してください');
			}

			// 関数の実装
			if (this._filters === null) {
				this._filters = {};
			}

			this._filters[key] = filterFunction;
		},

		/**
		 * 検索結果の総件数を返す
		 *
		 * @returns {Number} 検索結果の総件数
		 */
		getTotalLength: function() {
			return this._searched.length;
		},

		/**
		 * 指定した範囲内のデータがキャッシュされているかを返す。
		 *
		 * @param start 開始インデックス
		 * @param end 終了インデックス
		 * @returns {Boolean} キャッシュされているか否か
		 */
		isCached: function(start, end) {
			var range = convertRange(start, end, this.getTotalLength());

			if (range.end <= range.start) {
				return true;
			}
			if (this.getTotalLength() < range.end) {
				return false;
			}
			return true;
		},

		/**
		 * 指定した範囲のデータを非同期に取得する。
		 *
		 * @param {Number} start 開始インデックス
		 * @param {Number} end 終了インデックス
		 * @returns {Object} Promiseオブジェクト。resolve時に、取得した結果のリストを渡す。
		 */
		sliceAsync: function(start, end) {
			var range = convertRange(start, end, this.getTotalLength());

			var deferred = h5.async.deferred();

			var sliced = this._searched.slice(range.start, range.end);
			deferred.resolve(sliced);

			return deferred.promise();
		},

		/**
		 * 指定した範囲のデータを同期的に取得する。 cache に入っていない範囲を含む場合は例外を投げる。
		 *
		 * @param {Number} start 開始インデックス
		 * @param {Number} end 終了インデックス
		 * @returns {Object[]} 取得した結果のリスト
		 */
		sliceCachedData: function(start, end) {
			var range = convertRange(start, end, this.getTotalLength());

			if (!this.isCached(range.start, range.end)) {
				var msg = '指定した範囲にキャッシュされていないデータが含まれています; start = {0}, end = {1}';

				throw new Error(format(msg, start, end));
			}

			return this._searched.slice(range.start, range.end);
		},

		/**
		 * 指定したインデックスのデータを同期的に取得する。 cache に入っていない場合は例外を投げる。
		 *
		 * @param {Number} index インデックス
		 * @returns {Object} 取得したデータ
		 */
		getCachedData: function(index) {
			var msg;

			if (index == null) {
				msg = '不正な引数です; index は必ず指定してください';
				throw new Error(msg);
			}
			if (typeof index !== 'number') {
				msg = '不正な引数です; index には number 型を指定してください';
				throw new Error(msg);
			}
			if (Math.floor(index) !== index) {
				msg = '不正な引数です; index には整数を指定してください';
				throw new Error(msg);
			}
			if (index < 0) {
				msg = '不正な引数です; index には非負の値を指定してください';
				throw new Error(msg);
			}
			if (this.getTotalLength() <= index) {
				msg = '不正な引数です; index には totalLength 未満の値を指定してください';
				throw new Error(msg);
			}

			return this._searched[index];
		}

	});


	// ---- LazyLoadDataSource ---- //

	var LAZY_LOAD_DEFAULT_AJAX_SETTING = {
		dataType: 'json'
	};

	var LAZY_LOAD_DEFUALT_NUM_PER_PAGE = 50;

	var LazyLoadDataSource = function(url, ajaxSettings, customRequestData) {
		var msg;

		if (url == null) {
			msg = '不正な引数です; url は必ず指定してください';
			throw new Error(msg);
		}

		this._url = url;
		this._ajaxSettings = $.extend({}, ajaxSettings);
		this._customRequestData = customRequestData;
		this._cachedData = {};
	};

	$.extend(LazyLoadDataSource.prototype, new EventDispatcher(), {

		/**
		 * @memberOf h5.ui.components.virtualScroll.data.lazyLoadDataSource
		 */
		__name: 'h5.ui.components.virtualScroll.data.lazyLoadDataSource',

		// --- Property --- //

		_url: null,

		_ajaxSettings: null,

		_postData: null,

		_customRequestData: null,


		// TODO: 最適化の余地あり
		// キャッシュデータは、実データと、自分より大きいインデックスで、確実にキャッシュされているインデックスを覚えている
		_cachedData: null,

		_totalLength: 0,

		_searchOptions: null,

		_isFirstLoad: true,

		_numPerPage: LAZY_LOAD_DEFUALT_NUM_PER_PAGE,


		// --- Private Method --- //

		_search: function(start, end) {
			var that = this;

			var startPage = Math.floor(start / this._numPerPage);
			var endPage = Math.floor((end - 1) / this._numPerPage) + 1;

			var startIndex = startPage * this._numPerPage;
			var endIndex = endPage * this._numPerPage;

			var sortData = this._getSortData();

			var requestData = $.extend({}, this._customRequestData, {
				start: startIndex,
				end: endIndex,
				requireTotalCount: this._isFirstLoad
			}, sortData, this._postData);

			var settings = $.extend({}, LAZY_LOAD_DEFAULT_AJAX_SETTING, this._ajaxSettings, {
				data: requestData
			});

			return h5.ajax(this._url, settings).then(function(result) {
				that._addToCache(result.list, startIndex);

				if (that._isFirstLoad) {
					that._isFirstLoad = false;
					that._totalLength = result.totalCount;
					that.dispatchEvent({
						type: 'changeSource'
					});
				}
			});
		},

		_addToCache: function(list, startIndex) {
			var len = list.length;
			if (len === 0) {
				return;
			}
			var lastIndex = startIndex + len - 1;

			var preData = this._cachedData[startIndex - 1];
			if (preData) {
				preData.cachedIndex = lastIndex;
			}

			// 確実にキャッシュしているデータのindexを覚えさせおく
			for (var i = 0; i < len; i++) {
				var record = list[i];
				this._cachedData[i + startIndex] = {
					record: record,
					cachedIndex: lastIndex
				};
			}
		},

		// TODO: 最適化の余地あり
		_getCachedData: function(start, end) {
			var list = [];
			for (var i = start; i < end; i++) {
				var cache = this._cachedData[i];
				if (cache != null) {
					list.push(cache.record);
				}
			}
			return list;
		},

		_getSortData: function() {
			if (this._searchOptions == null) {
				return null;
			}
			if (this._searchOptions.sort == null) {
				return null;
			}

			var sortArray = this._searchOptions.sort;
			var sortLen = sortArray.length;
			if (sortLen === 0) {
				return null;
			}

			var ret = [];
			for (var i = 0; i < sortLen; i++) {
				var sort = sortArray[i];
				ret.push({
					sortKey: sort.property,
					sortOrder: sort.order
				});
			}
			if (sortLen === 1) {
				return ret[0];
			}
			return ret;
		},

		_setFilter: function(filter) {
			this._postData = filter;
		},

		_resetCache: function() {
			this._isFirstLoad = true;
			this._cachedData = {};
			this._search(0, 1);
		},

		// --- Public Method --- //

		/**
		 * 検索条件を指定する。検索条件をセットすると、新たに検索を行う。
		 *
		 * @param {Object} searchOptions 検索条件<br>
		 * @param {Object} [searchOptions.filter] 絞込条件。絞込を行うためのキーをプロパティ名とし、そのときに使用する値をvalueとする。
		 * @param {Array} [searchOptions.sort]
		 *            ソート条件。配列内のオブジェクトは、ソート項目を指定するpropertyと、昇順、降順を表すorderを持つ。ソートは配列の前から順番に行われる。
		 */
		changeSearchOptions: function(searchOptions) {
			var msg;
			if (searchOptions != null && !$.isPlainObject(searchOptions)) {
				msg = '不正な引数です; searchOptions には object 型を指定してください';
				throw new Error(msg);
			}

			this._searchOptions = searchOptions;
			if (searchOptions == null) {
				this._searchOptions = {};
			}

			if (this._searchOptions.cachePageSize != null) {
				var cachePageSize = this._searchOptions.cachePageSize;
				if (typeof cachePageSize !== 'number') {
					msg = '不正な引数です; searchOptions.cachePageSize には number 型を指定してください';
					throw new Error(msg);
				}
				if (Math.floor(cachePageSize) !== cachePageSize) {
					msg = '不正な引数です; searchOptions.cachePageSize には整数を指定してください';
					throw new Error(msg);
				}
				if (cachePageSize < 0) {
					msg = '不正な引数です; searchOptions.cachePageSize には正の数を指定してください';
					throw new Error(msg);
				}
				this._numPerPage = this._searchOptions.cachePageSize;
			} else {
				this._numPerPage = LAZY_LOAD_DEFUALT_NUM_PER_PAGE;
			}

			this._setFilter(this._searchOptions.filter);

			this._resetCache();
		},

		getSearchOptions: function() {
			return $.extend(true, {}, this._searchOptions);
		},

		setAjaxSettings: function(ajaxSettings) {
			if (ajaxSettings != null && !$.isPlainObject(ajaxSettings)) {
				var msg = '不正な引数です; ajaxSettings には object 型を指定してください';
				throw new Error(msg);
			}

			this._ajaxSettings = ajaxSettings;
			this._resetCache();
		},

		setCustomRequestData: function(customRequestData) {
			if (customRequestData != null && !$.isPlainObject(customRequestData)) {
				var msg = '不正な引数です; customRequestData には object 型を指定してください';
				throw new Error(msg);
			}

			this._customRequestData = customRequestData;
			this._resetCache();
		},

		/**
		 * 検索結果の総件数を返す
		 *
		 * @returns {Number} 検索結果の総件数
		 */
		getTotalLength: function() {
			return this._totalLength;
		},

		/**
		 * 指定した範囲内のデータがキャッシュされているかを返す。
		 *
		 * @param start 開始インデックス
		 * @param end 終了インデックス
		 * @returns {Boolean} キャッシュされているか否か
		 */
		isCached: function(start, end) {
			var range = convertRange(start, end, this._totalLength);

			if (range.end <= range.start) {
				return true;
			}

			var startData = this._cachedData[range.start];
			if (!startData) {
				return false;
			}
			// cachedIndexまでは必ずデータがキャッシュされている
			var cachedIndex = startData.cachedIndex;
			while (cachedIndex < range.end - 1) {
				var data = this._cachedData[cachedIndex];
				if (data.cachedIndex === cachedIndex) {
					// 自分のインデックスを指しているときは、それ以上のデータは存在しない
					return false;
				}
				cachedIndex = data.cachedIndex;
			}
			// endより先のインデックスを指すデータがあるので、start～end-1までキャッシュされている
			return true;
		},

		/**
		 * 指定した範囲のデータを非同期に取得する。
		 *
		 * @param {Number} start 開始インデックス
		 * @param {Number} end 終了インデックス
		 * @returns {Object} Promiseオブジェクト。resolve時に、取得した結果のリストを渡す。
		 */
		sliceAsync: function(start, end) {
			var range = convertRange(start, end, this._totalLength);

			var deferred = h5.async.deferred();

			if (this.isCached(range.start, range.end)) {
				deferred.resolve(this._getCachedData(range.start, range.end));
				return deferred.promise();
			}

			var that = this;
			this._search(range.start, range.end).done(function() {
				deferred.resolve(that._getCachedData(range.start, range.end));
			});

			return deferred.promise();
		},

		/**
		 * 指定した範囲のデータを同期的に取得する。 cache に入っていない範囲を含む場合は例外を投げる。
		 *
		 * @param {Number} start 開始インデックス
		 * @param {Number} end 終了インデックス
		 * @returns {Object[]} 取得した結果のリスト
		 */
		sliceCachedData: function(start, end) {
			var range = convertRange(start, end, this._totalLength);

			if (!this.isCached(range.start, range.end)) {
				var msg = '指定した範囲にキャッシュされていないデータが含まれています; start = {0}, end = {1}';

				throw new Error(format(msg, start, end));
			}

			return this._getCachedData(range.start, range.end);
		},

		/**
		 * 指定したインデックスのデータを同期的に取得する。 cache に入っていない場合は例外を投げる。
		 *
		 * @param {Number} index インデックス
		 * @returns {Object} 取得したデータ
		 */
		getCachedData: function(index) {
			var msg;

			if (index == null) {
				msg = '不正な引数です; index は必ず指定してください';
				throw new Error(msg);
			}
			if (typeof index !== 'number') {
				msg = '不正な引数です; index には number 型を指定してください';
				throw new Error(msg);
			}
			if (Math.floor(index) !== index) {
				msg = '不正な引数です; index には整数を指定してください';
				throw new Error(msg);
			}
			if (index < 0) {
				msg = '不正な引数です; index には非負の値を指定してください';
				throw new Error(msg);
			}
			if (this.getTotalLength() <= index) {
				msg = '不正な引数です; index には totalLength 未満の値を指定してください';
				throw new Error(msg);
			}

			if (!this.isCached(index, index + 1)) {
				msg = '指定したインデックスのデータはキャッシュされていません; index = {0}';
				throw new Error(msg, index);
			}
			return this._getCachedData(index, index + 1)[0];
		}

	});


	// ---- Expose ---- //

	var createLocalDataSource = function(baseData) {
		return new LocalDataSource(baseData);
	};

	var createLazyLoadDataSource = function(url, ajaxSettings, customRequestData) {
		return new LazyLoadDataSource(url, ajaxSettings, customRequestData);
	};

	h5.u.obj.expose('h5.ui.components.virtualScroll.data', {

		/**
		 * @memberOf h5.ui.components.virtualScroll.data
		 */
		createLocalDataSource: createLocalDataSource,

		/**
		 * 遅延取得するデータソースを生成する。指定した範囲のデータをサーバから取得する。
		 * 取得したデータはローカルにキャッシュし、取得しようとしたデータがキャッシュされていれば、サーバには通信を行わず、ローカルのデータを使用する。
		 * サーバからの取得は、実際には、指定データに前後の余裕を持たせた分だけ取得を行う。
		 *
		 * @memberOf h5.ui.components.virtualScroll.data
		 */
		createLazyLoadDataSource: createLazyLoadDataSource
	});

})(jQuery);
/*jshint browser: true, jquery: true */
/*global h5 */

// ---- ScrollBar ---- //
(function($) {
	'use strict';

	var FIRST_WIDTH = 25;
	var OUTER_DIV_CLASS_SUFFIX = '-scroll-bar-outer';
	var INNER_DIV_CLASS_SUFFIX = '-scroll-bar-inner';
	var SCROLL_EVENT_NAME = 'h5scroll';

	// ネイティブなスクロールバーの幅を計算
	var scrollBarWidth = 17;
	var requireOverflowScrollInner = false;
	$(function() {
		var $body = $('body');

		var $outer = $('<div></div>');
		$outer.css({
			visibility: 'hidden',
			height: FIRST_WIDTH,
			width: FIRST_WIDTH,
			overflow: 'scroll',
			position: 'absolute',
			top: -100
		}).appendTo($body);

		if ($outer[0].clientWidth === FIRST_WIDTH) {
			requireOverflowScrollInner = true;
		}

		var $inner = $('<div></div>');
		$inner.css({
			height: FIRST_WIDTH + 10,
			width: FIRST_WIDTH,
			overflow: 'scroll'
		}).appendTo($outer);

		var extWidth = $inner[0].clientWidth;
		scrollBarWidth = FIRST_WIDTH - extWidth;

		$outer.remove();
	});


	var verticalScrollBarController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.virtualScroll.VerticalScrollBarController
		 */
		__name: 'h5.ui.components.virtualScroll.VerticalScrollBarController',


		// --- Property --- //

		_scrollSize: 0,

		_ignoreScrollEvent: false,


		_timer: null,

		_pos: 0,


		// --- Private Method --- //

		_resizeScrollSize: function() {

			var $innerDiv = this.$find('.vertical' + INNER_DIV_CLASS_SUFFIX);

			$innerDiv.css({
				height: this._scrollSize
			});

			var $root = $(this.rootElement);
			var barSize = $root.height();
			var visibility = (this._scrollSize <= barSize) ? 'hidden' : 'visible';

			$root.css({
				visibility: visibility
			});
		},


		// --- Life Cycle Method --- //

		__init: function() {

			var $root = $(this.rootElement);

			var rootPosition = $root.css('position');

			if (rootPosition === 'static') {
				rootPosition = 'relative';
			}

			$root.css({
				overflow: 'hidden',
				width: FIRST_WIDTH,
				visibility: 'hidden',
				display: 'block',
				position: rootPosition
			});


			var $outerDiv = $('<div></div>').addClass('vertical' + OUTER_DIV_CLASS_SUFFIX).css({
				'overflow-x': 'hidden',
				'overflow-y': 'scroll',
				height: '100%',
				width: FIRST_WIDTH,
				position: 'absolute',
				right: 0
			});

			var $innerDiv = $('<div></div>').addClass('vertical' + INNER_DIV_CLASS_SUFFIX).css({
				width: '100%'
			});

			$root.append($outerDiv);
			$outerDiv.append($innerDiv);

			$root.css({
				width: scrollBarWidth
			});

			this._resizeScrollSize();
		},


		// --- Event Handler --- //

		'.vertical-scroll-bar-outer [scroll]': function(context, $el) {
			if (this._timer) {
				clearTimeout(this._timer);
			}

			var prevPos = this._pos;
			var pos = $el.scrollTop();


			if (40 < Math.abs(pos - prevPos)) {

				var ignore = this._ignoreScrollEvent;

				if (ignore) {
					this._ignoreScrollEvent = false;
				}

				if (!ignore || pos !== prevPos) {
					setTimeout(this.own(function() {
						this.trigger(SCROLL_EVENT_NAME, {
							verticalScroll: {
								type: 'pixel',
								diff: pos - prevPos
							}
						});
					}, 0));
				}

				this._pos = pos;
				return;
			}

			// IE のスムーススクロール対応

			this._timer = setTimeout(this.own(function() {
				var prevPos = this._pos;
				var pos = $el.scrollTop();

				if (!this._ignoreScrollEvent || pos !== prevPos) {
					this.trigger(SCROLL_EVENT_NAME, {
						verticalScroll: {
							type: 'pixel',
							diff: pos - this._pos
						}
					});
				}

				if (this._ignoreScrollEvent) {
					this._ignoreScrollEvent = false;
				}

				this._pos = pos;
			}), 50);
		},

		'{rootElement} keydown': function(context) {
			var event = context.event;
			var keycode = event.which;

			if (keycode === 38) {
				// 上矢印キー
				event.preventDefault();
			} else if (keycode === 40) {
				// 下矢印キー
				event.preventDefault();
			}
		},


		// --- Public Method --- //

		setScrollSize: function(size) {

			this._scrollSize = size;

			if (this.isInit) {
				this._resizeScrollSize();
			}
		},

		setBarSize: function(size) {

			$(this.rootElement).css({
				height: size
			});

			if (this.isInit) {
				this._resizeScrollSize();
			}
		},

		getScrollSize: function() {
			return this._scrollSize;
		},

		setScrollPosition: function(position) {
			this._pos = position;

			var $outer = this.$find('.vertical' + OUTER_DIV_CLASS_SUFFIX);

			if (position === $outer.scrollTop()) {
				return;
			}

			this._ignoreScrollEvent = true;
			$outer.scrollTop(position);
		}
	};


	var horizontalScrollBarController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.virtualScroll.HorizontalScrollBarController
		 */
		__name: 'h5.ui.components.virtualScroll.HorizontalScrollBarController',


		// --- Property --- //

		_scrollSize: 0,

		_ignoreScrollEvent: false,


		_timer: null,

		_pos: 0,

		// --- Private Method --- //

		_resizeScrollSize: function() {

			var $innerDiv = this.$find('.horizontal' + INNER_DIV_CLASS_SUFFIX);

			$innerDiv.css({
				width: this._scrollSize
			});

			var $root = $(this.rootElement);
			var barSize = $root.width();
			var visibility = (this._scrollSize <= barSize) ? 'hidden' : 'visible';

			$root.css({
				visibility: visibility
			});
		},


		// --- Life Cycle Method --- //

		__init: function() {

			var $root = $(this.rootElement);

			var rootPosition = $root.css('position');

			if (rootPosition === 'static') {
				rootPosition = 'relative';
			}

			$root.css({
				overflow: 'hidden',
				height: FIRST_WIDTH,
				visibility: 'hidden',
				display: 'block',
				position: rootPosition
			});

			var $outerDiv = $('<div></div>').addClass('horizontal' + OUTER_DIV_CLASS_SUFFIX).css({
				'overflow-x': 'scroll',
				'overflow-y': 'hidden',
				width: '100%',
				height: FIRST_WIDTH,
				position: 'absolute',
				bottom: 0
			});

			var $innerDiv = $('<div></div>').addClass('horizontal' + INNER_DIV_CLASS_SUFFIX).css({
				height: '100%'
			});

			$root.append($outerDiv);
			$outerDiv.append($innerDiv);

			$root.css({
				height: scrollBarWidth
			});

			this._resizeScrollSize();
		},


		// --- Event Handler --- //

		'.horizontal-scroll-bar-outer [scroll]': function(context, $el) {
			if (this._timer) {
				clearTimeout(this._timer);
			}

			var prevPos = this._pos;
			var pos = $el.scrollLeft();

			if (40 < Math.abs(pos - prevPos)) {
				if (!this._ignoreScrollEvent || pos !== prevPos) {
					this.trigger(SCROLL_EVENT_NAME, {
						horizontalScroll: {
							type: 'pixel',
							diff: pos - this._pos
						}
					});
				}
				this._pos = pos;
				return;
			}

			if (this._ignoreScrollEvent) {
				this._ignoreScrollEvent = false;
			}

			// IE のスムーススクロール対応
			this._timer = setTimeout(this.own(function() {
				var prevPos = this._pos;
				var pos = $el.scrollLeft();

				if (!this._ignoreScrollEvent || pos !== prevPos) {
					this.trigger(SCROLL_EVENT_NAME, {
						horizontalScroll: {
							type: 'pixel',
							diff: pos - this._pos
						}
					});
				}
				this._pos = pos;
			}), 50);
		},

		'{rootElement} keydown': function(context) {
			var event = context.event;
			var keycode = event.which;

			if (keycode === 37) {
				// 左矢印キー
				event.preventDefault();
			} else if (keycode === 39) {
				// 右矢印キー
				event.preventDefault();
			}
		},


		// --- Public Method --- //

		setScrollSize: function(size) {

			this._scrollSize = size;

			if (this.isInit) {
				this._resizeScrollSize();
			}
		},

		getScrollSize: function() {
			return this._scrollSize;
		},

		setBarSize: function(size) {

			$(this.rootElement).css({
				width: size
			});

			if (this.isInit) {
				this._resizeScrollSize();
			}
		},

		setScrollPosition: function(position) {
			this._pos = position;

			var $outer = this.$find('.horizontal' + OUTER_DIV_CLASS_SUFFIX);
			if (position === $outer.scrollLeft()) {
				return;
			}

			this._ignoreScrollEvent = true;
			$outer.scrollLeft(position);
		}

	};

	h5.core.expose(verticalScrollBarController);
	h5.core.expose(horizontalScrollBarController);


	h5.u.obj.expose('h5.ui.components.virtualScroll', {
		getScrollBarWidth: function() {
			return scrollBarWidth;
		},

		isRequireOverflowScrollInner: function() {
			return requireOverflowScrollInner;
		}
	});

})(jQuery);


// ---- ScrollBox ---- //

(function($) {
	'use strict';

	var RENDER_TARGET_CLASS = '-scroll-box-render-target';
	var LOADING_CLASS = '-scroll-box-loading';

	var DEFAULT_LOADING_TEXT = 'Loading...';


	var getComputedSize = function(element, styleName) {
		var sizeStyle;
		if (document.defaultView != null) {
			sizeStyle = document.defaultView.getComputedStyle(element, '')[styleName];
		} else {
			sizeStyle = element.currentStyle.height;
		}
		if (sizeStyle === '') {
			return null;
		}

		return parseInt(sizeStyle.replace(/px$/i, ''), 10);
	};

	var virtualScrollBoxController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.virtualScroll.VirtualScrollBoxController
		 */
		__name: 'h5.ui.components.virtualScroll.VirtualScrollBoxController',


		// --- Property --- //

		_renderer: null,


		_rowStart: 0,

		_rowEnd: 0,

		_columnStart: 0,

		_columnEnd: 0,

		_initializeDeferred: null,


		// --- Private Method --- //

		_getRenderTarget: function() {
			// 入れ子になる可能性もあるので children で取得する
			return $(this.rootElement).children('.virtual' + RENDER_TARGET_CLASS);
		},

		_getLoading: function() {
			return $(this.rootElement).children('.virtual' + LOADING_CLASS);
		},


		// --- Life Cycle Method --- //

		__construct: function() {
			this._initializeDeferred = this.deferred();
		},

		__init: function() {
			var $root = $(this.rootElement);

			var rootPosition = $root.css('position');

			if (rootPosition === 'static') {
				rootPosition = 'relative';
			}

			$root.css({
				overflow: 'hidden',
				position: rootPosition
			});

			// rootElement 内の HTML を取得して削除する
			var html = $root.html();
			$root.empty();

			$('<div></div>').addClass('virtual' + RENDER_TARGET_CLASS).css({
				position: 'absolute'
			}).html(html).appendTo($root);

			$('<div></div>').addClass('virtual' + LOADING_CLASS).css({
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'none'
			}).text(DEFAULT_LOADING_TEXT).appendTo($root);
		},


		// --- Event Handler --- //

		// TODO: scroll イベントハンドラ


		// --- Public Method --- //

		init: function(renderer) {
			this._renderer = renderer;

			var that = this;

			return this.readyPromise.then(function() {
				that._initializeDeferred.resolve();
			});
		},

		render: function(renderData) {
			var that = this;
			this._initializeDeferred.then(function() {
				that._renderer(that._getRenderTarget(), renderData);
			});
		},

		setVerticalPosition: function(position) {
			this._getRenderTarget().css({
				top: -position,
				bottom: ''
			});
		},

		setVerticalPositionBottom: function() {
			this._getRenderTarget().css({
				top: '',
				bottom: 1
			});
		},

		setHorizontalPosition: function(position) {
			this._getRenderTarget().css({
				left: -position,
				right: ''
			});
		},

		setHorizontalPositionRight: function() {
			this._getRenderTarget().css({
				left: '',
				right: 1
			});
		},


		getLoadingDiv: function() {
			return this._getLoading()[0];
		},

		beginLoad: function() {
			this._getRenderTarget().hide();
			this._getLoading().show();
		},

		endLoad: function() {
			this._getLoading().hide();
			this._getRenderTarget().show();
		},


		getInitializePromise: function() {
			return this._initializeDeferred.promise();
		}

	};


	var htmlScrollBoxController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.virtualScroll.HtmlScrollBoxController
		 */
		__name: 'h5.ui.components.virtualScroll.HtmlScrollBoxController',


		// --- Property --- //

		_rowSelector: null,

		_columnSelector: null,


		_rowsHeight: null,

		_columnsWidth: null,

		_rowsTop: null,

		_columnsLeft: null,


		_verticalPosition: null,

		_horizontalPosition: null,


		// --- Private Method --- //

		_getRenderTarget: function() {
			// 入れ子になる可能性もあるので children で取得する
			return $(this.rootElement).children('.html' + RENDER_TARGET_CLASS);
		},

		_updateRowsHeight: function() {
			var $renderTarget = this._getRenderTarget();

			var rowsHeight = this._rowsHeight = [];
			var rowsTop = this._rowsTop = [];

			var currentTop = 0;

			$renderTarget.find(this._rowSelector).each(function(index, el) {

				// IE では height をそのままとると結合分も加えられてしまうのでそれを避けている
				var height = getComputedSize(el, 'height');
				rowsHeight.push(height);

				rowsTop.push(currentTop);
				currentTop += height;
			});
		},

		_updateColumnsWidth: function() {
			var $renderTarget = this._getRenderTarget();

			var columnsWidth = this._columnsWidth = [];
			var columnsLeft = this._columnsLeft = [];

			var currentLeft = 0;

			$renderTarget.find(this._columnSelector).each(function(index, el) {

				var width = $(el).outerWidth();
				columnsWidth.push(width);

				columnsLeft.push(currentLeft);
				currentLeft += width;
			});
		},

		_updateCellsSize: function() {
			this._updateRowsHeight();
			this._updateColumnsWidth();
		},


		// --- Life Cycle Method --- //

		__construct: function() {
			this._verticalPosition = {
				isEnd: false,
				position: 0
			};
			this._horizontalPosition = {
				isEnd: false,
				position: 0
			};
		},

		__init: function() {
			var $root = $(this.rootElement);

			var rootPosition = $root.css('position');

			if (rootPosition === 'static') {
				rootPosition = 'relative';
			}

			$root.css({
				overflow: 'hidden',
				position: rootPosition
			});

			// rootElement 内の HTML を取得して削除する
			var html = $root.html();
			$root.empty();

			$('<div></div>').addClass('html' + RENDER_TARGET_CLASS).css({
				position: 'absolute'
			}).html(html).appendTo($root);

			this._updateCellsSize();
		},


		// --- Public Method --- //

		init: function(rowSelector, columnSelector) {
			this._rowSelector = rowSelector;
			this._columnSelector = columnSelector;

			return this.readyPromise;
		},

		render: function(data, range) {
			if (this._rowsTop == null) {
				return;
			}

			var css = {};

			if (this._verticalPosition.isEnd && range.rowStart != null) {
				css.top = '';
				css.bottom = 1;
			} else {
				css.top = this._verticalPosition.position - this._rowsTop[range.rowStart];
				css.bottom = '';
			}

			if (this._horizontalPosition.isEnd && range.columnStart != null) {
				css.left = '';
				css.right = 1;
			} else {
				css.left = this._horizontalPosition.position - this._columnsLeft[range.columnStart];
				css.right = '';
			}

			this._getRenderTarget().css(css);
		},

		setVerticalPosition: function(renderTop) {
			this._verticalPosition = {
				isEnd: false,
				position: -renderTop
			};
		},

		setVerticalPositionBottom: function() {
			this._verticalPosition = {
				isEnd: true
			};
		},

		setHorizontalPosition: function(renderLeft) {
			this._horizontalPosition = {
				isEnd: false,
				position: -renderLeft
			};
		},

		setHorizontalPositionRight: function() {
			this._horizontalPosition = {
				isEnd: true
			};
		},

		getRowsHeight: function() {
			return $.extend([], this._rowsHeight);
		},

		getColumnsWidth: function() {
			return $.extend([], this._columnsWidth);
		},


		getInitializePromise: function() {
			return this.readyPromise;
		},

		beginLoad: $.noop,

		endLoad: $.noop,

		getLoadingDiv: $.noop

	};

	h5.core.expose(virtualScrollBoxController);
	h5.core.expose(htmlScrollBoxController);

})(jQuery);


// ---- IndexBaseScrollStrategy ---- //

(function($) {
	'use strict';

	var SCROLL_SIZE_LIMIT = 500000;
	var BLOCK_SIZE = 10000;

	var IndexBaseScrollStrategy = function() {
	// コンストラクタ
	};

	$.extend(IndexBaseScrollStrategy.prototype, {

		// --- Property --- //

		_pos: 0,

		_maxIndex: null,

		_blockCells: null,

		_blocks: null,

		_blockOverlapCells: null,

		_blockIndex: null,

		_scrollSize: null,



		// --- Private Method --- //

		_setupBlock: function(dataInfo) {
			var indexes = this._maxIndex + 1;
			var scrollIndexLimit = Math.floor(SCROLL_SIZE_LIMIT / this._scrollCellSize);

			if (indexes < scrollIndexLimit) {
				this._blockCells = dataInfo.totalCells;
				this._blocks = 1;
				this._blockOverlapCells = 0;
				this._blockIndex = 0;
				this._scrollSize = (indexes - 1) * this._scrollCellSize + 1;
				return;
			}

			this._blockCells = Math.ceil(BLOCK_SIZE / this._scrollCellSize);
			this._blocks = Math.floor(indexes / this._blockCells);

			this._blockOverlapCells = Math.ceil((indexes - scrollIndexLimit) / (this._blocks - 1));

			var scrollIndexes = indexes - (this._blocks - 1) * this._blockOverlapCells;
			this._scrollSize = scrollIndexes * this._scrollCellSize + 1;
		},

		_scrollNear: function(scrollIndex) {
			var blockHeadCells = this._blockCells - this._blockOverlapCells;
			var indexInBlock = scrollIndex - (this._blockIndex * blockHeadCells);

			if (indexInBlock < 0) {
				this._pos += this._blockOverlapCells * this._scrollCellSize;
				this._blockIndex -= 1;
				indexInBlock = this._blockCells - 1;
			} else if (this._blockCells <= indexInBlock && this._blockIndex < this._blocks - 1) {
				this._pos -= this._blockOverlapCells * this._scrollCellSize;
				this._blockIndex += 1;
				indexInBlock = 0;
			}

			var index = this._blockIndex * this._blockCells + indexInBlock;

			indexInBlock = this._blockCells - 1;
			return index;
		},

		_jumpBlock: function(scrollIndex, dataInfo) {
			var blockHeadCells = this._blockCells - this._blockOverlapCells;
			this._blockIndex = Math.floor(scrollIndex / blockHeadCells);

			if (this._blocks <= this._blockIndex) {
				this._blockIndex = this._blocks - 1;
			}

			return this._scrollNear(scrollIndex, dataInfo);
		},


		// --- Public Method --- //

		scroll: function(scrollDiff, windowSize, dataInfo) {
			var windowCells = Math.ceil(windowSize / dataInfo.defaultCellSize);
			if (this._maxIndex === null) {
				this._maxIndex = dataInfo.totalCells - windowCells - 1;

				// IE8 用の計算
				this._scrollCellSize = Math.floor(windowSize / 8);
				this._setupBlock(dataInfo);
			}

			var nextPosition = this._pos + scrollDiff;

			if (nextPosition < 0) {
				nextPosition = 0;
			} else if (this._scrollSize < nextPosition) {
				nextPosition = this._scrollSize;
			}

			this._pos = nextPosition;

			var scrollIndex = Math.floor(this._pos / this._scrollCellSize);

			var index;
			if (this._blockIndex !== null && Math.abs(scrollDiff) < windowSize) {
				index = this._scrollNear(scrollIndex, dataInfo);
			} else {
				index = this._jumpBlock(scrollIndex, dataInfo);
			}

			// TODO: わかる場合は len を付ける

			var result = {
				isEnd: false,
				index: index,
				offset: 0,
				scrollPosition: this._pos,
				scrollSize: this._scrollSize + windowSize
			};

			if (this._pos === this._scrollSize && windowCells < dataInfo.totalCells) {
				result.isEnd = true;
				result.index = dataInfo.totalCells;
			}
			if (dataInfo.totalCells < windowCells) {
				result.isEnd = false;
				result.index = 0;
			}

			return result;
		},

		indexDiffToScrollDiff: function(indexDiff, windowSize) {
			return indexDiff * Math.floor(windowSize / 8);
		},

		resetPageInfo: function() {
			this._maxIndex = null;
			this._blockCells = null;
			this._blocks = null;
			this._blockOverlapCells = null;
			this._blockIndex = null;
		}

	});


	h5.u.obj.expose('h5.ui.components.virtualScroll', {
		createIndexBaseScrollStrategy: function() {
			return new IndexBaseScrollStrategy();
		}
	});

})(jQuery);


//---- PixelBaseScrollStrategy ---- //

(function($) {

	var PixelBaseScrollStrategy = function() {
	// コンストラクタ
	};

	$.extend(PixelBaseScrollStrategy.prototype, {

		// --- Property --- //

		_pos: 0,

		_cellSizeArray: null,

		_totalSize: null,

		_indexToPosArray: null,


		// --- Private Method --- //

		_posToIndex: function(pos) {

			var minIndex = 0;
			var maxIndex = this._indexToPosArray.length;
			var centerIndex;
			var centerPos;

			while (minIndex <= maxIndex) {
				centerIndex = Math.floor((minIndex + maxIndex) / 2);
				centerPos = this._indexToPosArray[centerIndex];

				if (centerPos < pos) {
					minIndex = centerIndex + 1;
				} else if (pos < centerPos) {
					maxIndex = centerIndex - 1;
				} else {
					return centerIndex;
				}
			}

			// ヒットしない場合は値が小さい方を返す
			if (maxIndex < 0) {
				return 0;
			}
			return maxIndex;
		},


		// --- Public Method --- //

		scroll: function(scrollDiff, windowSize, dataInfo) {
			var i;
			var len;

			if (this._cellSizeArray === null) {
				if (dataInfo.cellSizeArray == null) {
					throw new Error('全件取得できる場合でないと Pixel ベースのスクロールはできません');
				}
				len = dataInfo.cellSizeArray.length;
				this._cellSizeArray = dataInfo.cellSizeArray;
				this._totalSize = 0;
				this._indexToPosArray = [];

				for (i = 0; i < len; i++) {
					this._indexToPosArray.push(this._totalSize);
					this._totalSize += this._cellSizeArray[i];
				}
			}

			var scrollSize = this._totalSize - windowSize;
			if (scrollSize < 0) {
				scrollSize = 0;
			}

			var nextPosition = this._pos + scrollDiff;

			if (nextPosition < 0) {
				nextPosition = 0;
			} else if (scrollSize < nextPosition) {
				nextPosition = scrollSize;
			}

			this._pos = nextPosition;

			var index = this._posToIndex(nextPosition);
			var offset = nextPosition - this._indexToPosArray[index];

			var rangeSize = 0;
			var cellLength = this._cellSizeArray.length;
			for (i = index; i < cellLength; i++) {
				rangeSize += this._cellSizeArray[i];
				if (windowSize + offset < rangeSize) {
					break;
				}
			}

			var range = i - index + 2;
			if (cellLength <= index + range) {
				range = cellLength - index;
			}


			var result = {
				isEnd: false,
				index: index,
				length: range,
				offset: offset,
				scrollPosition: this._pos,
				scrollSize: this._totalSize
			};

			if (this._pos === scrollSize && windowSize < this._totalSize) {
				result.isEnd = true;
				result.index = dataInfo.totalCells;
			}
			if (this._totalSize < windowSize) {
				result.isEnd = false;
				result.index = 0;
			}

			return result;
		},

		indexDiffToScrollDiff: function(indexDiff, windowSize) {
			var index = this._posToIndex(this._pos);

			if (indexDiff < 0 && this._pos !== this._indexToPosArray[index]) {
				// 戻るときに現在のポジションがピッタリでない場合 index を一個ずらす
				index += 1;
			}

			var nextIndex = index + indexDiff;

			if (nextIndex < 0) {
				nextIndex = 0;
			}

			if (this._indexToPosArray.length <= nextIndex) {
				nextIndex = this._indexToPosArray.length - 1;
			}
			var nextPosition = this._indexToPosArray[nextIndex];

			var maxPosition = this._totalSize - windowSize;
			if (maxPosition < nextPosition) {
				nextPosition = maxPosition;
			}

			return nextPosition - this._pos;
		},

		resetPageInfo: function() {
			this._cellSizeArray = null;
			this._totalSize = null;
			this._indexToPosArray = null;
		}
	});


	h5.u.obj.expose('h5.ui.components.virtualScroll', {
		createPixelBaseScrollStrategy: function() {
			return new PixelBaseScrollStrategy();
		}
	});

})(jQuery);
/*jshint browser: true, jquery: true */
/*global h5 */


// ---- SingleSelector ---- //
(function($) {
	'use strict';

	var SingleSelector = function() {
		this._selectKey = null;
	};

	$.extend(SingleSelector.prototype, {

		// --- Property --- //

		_selectKey: null,


		// --- Public Method --- //

		select: function(key) {
			this._selectKey = key;
		},

		unselect: function(key) {
			if (this._selectKey === key) {
				this._selectKey = null;
			}
		},

		unselectAll: function() {
			this._selectKey = null;
		},

		isSelected: function(key) {
			return this._selectKey === key;
		},

		getSelectedKeys: function() {
			return [this._selectKey];
		}
	});

	h5.u.obj.expose('h5.ui.components.datagrid', {

		/**
		 * @memberOf h5.ui.components.datagrid
		 */
		createSingleSelector: function() {
			return new SingleSelector();
		}
	});

})(jQuery);


// ---- MultiSelector ---- //

(function($) {
	'use strict';

	var MultiSelector = function() {
		this._selectMap = {};
	};

	$.extend(MultiSelector.prototype, {

		_selectMap: null,


		// --- Public Method --- //

		select: function(key) {
			if (this._selectMap[key] == null) {
				this._selectMap[key] = true;
			}
		},

		unselect: function(key) {
			if (this._selectMap[key]) {
				delete this._selectMap[key];
			}
		},

		unselectAll: function() {
			this._selectMap = {};
		},

		isSelected: function(key) {
			return this._selectMap[key] != null;
		},

		getSelectedKeys: function() {
			return $.map(this._selectMap, function(value, key) {
				return key;
			});
		}
	});


	h5.u.obj.expose('h5.ui.components.datagrid', {

		/**
		 * @memberOf h5.ui.components.datagrid
		 */
		createMultiSelector: function() {
			return new MultiSelector();
		}
	});

})(jQuery);

// ---- PagingAdapter ---- //
(function($) {
	'use strict';

	var EventDispatcher = h5.ui.components.virtualScroll.data.EventDispatcher;

	var PagingAdapter = function(dataSource, pageSize) {
		this._source = dataSource;
		this._pageSize = pageSize;
		this._currentPage = 1;
		this._pageData = [];

		var that = this;
		this._source.addEventListener('changeSource', function(ev) {
			that.movePage(that._currentPage);
		});
	};

	$.extend(PagingAdapter.prototype, new EventDispatcher(), {

		_source: null,
		_pageSize: null,
		_pageData: null,
		_currentPage: null,

		changeSearchOptions: function(searchOptions) {
			this._source.changeSearchOptions(searchOptions);
		},

		getSearchOptions: function() {
			return this._source.getSearchOptions();
		},

		getTotalLength: function() {
			return this._pageData.length;
		},

		isCached: function(start, end) {
			return true;
		},

		sliceAsync: function(start, end) {
			var deferred = h5.async.deferred();

			var sliced = this._pageData.slice(start, end);
			deferred.resolve(sliced);

			return deferred.promise();
		},

		sliceCachedData: function(start, end) {
			return this._pageData.slice(start, end);
		},

		getCachedData: function(index) {
			return this._pageData[index];
		},

		onChangeSource: function(listener) {
			this.addEventListener('changeSource', listener);
		},

		getCurrentPage: function() {
			return this._currentPage;
		},

		getTotalPages: function() {
			var pages = Math.ceil(this._source.getTotalLength() / this._pageSize);
			if (pages <= 0) {
				return 1;
			}
			return pages;
		},

		movePage: function(pageNumber) {
			var start = (pageNumber - 1) * this._pageSize;
			var end = start + this._pageSize;


			var max = this._source.getTotalLength();
			if (max < end) {
				end = max;
			}

			if (end <= start && pageNumber !== 1) {
				throw new Error('存在しないページです');
			}

			var that = this;
			this._source.sliceAsync(start, end).then(function(data) {
				that._currentPage = pageNumber;
				that._pageData = data;
				that.dispatchEvent({
					type: 'changeSource'
				});
			});
		}
	});

	h5.u.obj.expose('h5.ui.components.datagrid', {

		/**
		 * @memberOf h5.ui.components.datagrid
		 */
		createPagingAdapter: function(dataSource, pageSize) {
			return new PagingAdapter(dataSource, pageSize);
		}
	});

})(jQuery);


// ---- GridDataConverter ---- //
(function($) {
	'use strict';

	var EventDispatcher = h5.ui.components.virtualScroll.data.EventDispatcher;


	var GridDataConverter = function(params) {
		this._source = params.dataSource;
		this._idKey = params.idKey;
		this._columns = params.columns;
		this._selector = params.selector;
		this._defaultRowHeight = params.defaultRowHeight;
		this._defaultColumnWidth = params.defaultColumnWidth;

		this._columns = [];

		this._heightMap = {};
		this._widthMap = {};
		this._sortable = {};
		this._markable = {};
		this._modified = {};
		this._markedRange = {
			rowStart: 0,
			rowEnd: 0,
			columnStart: 0,
			columnEnd: 0
		};

		for (var i = 0, len = params.columns.length; i < len; i++) {
			this._columns.push({
				key: params.columns[i]
			});
			if (params.columnsOption == null) {
				this._markable[params.columns[i]] = true;
			}
		}

		var that = this;
		if (params.columnsOption != null) {
			this._columnsHeader = {};
			$.each(params.columnsOption, function(key, option) {
				if (option.width != null) {
					that._widthMap[key] = option.width;
				}
				if (option.header != null) {
					that._columnsHeader[key] = option.header;
				}
				that._sortable[key] = !!option.sortable;
				that._markable[key] = !!option.markable;
			});
		}

		this._init();
	};


	$.extend(GridDataConverter.prototype, new EventDispatcher(), {

		// --- Property --- //


		/**
		 * @memberOf h5.ui.components.datagrid.GridDataConverter
		 */
		_source: null,

		_idKey: null,

		_columns: null,


		_selector: null,

		_heightMap: null,

		_widthMap: null,

		_sortable: null,

		_markable: null,

		_defaultRowHeight: null,

		_defaultColumnWidth: null,

		_columnsHeader: null,

		_modified: null,

		_markedRange: null,



		// --- Private Method --- //

		_dataToId: function(data) {
			if (data == null) {
				return null;
			}
			return data[this._idKey];
		},

		_cellToEditKey: function(rowId, columnId, data) {
			return this._columns[columnId].key;
		},

		_cellToSelectKey: function(rowId, columnId, data) {
			return this._dataToId(data);
		},

		_cellToHeightKey: function(rowId, data) {
			return this._dataToId(data);
		},

		_cellToWidthKey: function(columnId, data) {
			return this._columns[columnId].key;
		},

		_cellToValue: function(rowId, columnId, data) {
			if (data == null) {
				return null;
			}
			var key = this._columns[columnId].key;
			return data[key];
		},

		_range2DTo1D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var start = rowStart;
			var end = rowEnd;
			if (this._columnsHeader != null) {
				start -= 1;
				end -= 1;

				if (start < 0) {
					start = 0;
				}
			}
			return {
				start: start,
				end: end
			};
		},

		_createHeaderRow: function(columnStart, columnEnd) {

			var searchOptions = this._source.getSearchOptions();
			var sorts = {};

			if (searchOptions.sort != null) {
				$.each(searchOptions.sort, function(i, elem) {
					sorts[elem.property] = elem.order;
				});
			}

			var row = [];
			for (var i = columnStart; i < columnEnd; i += 1) {
				var key = this._columns[i].key;
				var header = key;
				if (this._columnsHeader[key] != null) {
					header = this._columnsHeader[key];
				}

				var columnId = i;
				var height = this._defaultRowHeight;

				var widthKey = this._cellToWidthKey(columnId, null);
				var width = this._defaultColumnWidth;
				if (this._widthMap.hasOwnProperty(widthKey)) {
					width = this._widthMap[widthKey];
				}

				var isSortableColumn = this._sortable[key];
				var sortOrder = null;
				if (sorts.hasOwnProperty(key)) {
					sortOrder = sorts[key];
				}

				var cellData = {
					dataId: null,
					rowId: 0,
					columnId: columnId,

					propertyName: key,
					editKey: null,
					selectKey: null,
					heightKey: null,
					widthKey: widthKey,

					selected: false,
					height: height,
					width: width,

					isHeaderRow: true,
					isSortableColumn: isSortableColumn,
					sortOrder: sortOrder,

					isMarkableCell: false,

					rowData: null,
					value: header
				};

				row.push(cellData);
			}
			return row;
		},

		_convert: function(dataArray, rowStart, rowEnd, columnStart, columnEnd) {
			var cells = [];

			var rangeHeight = 0;
			var rangeWidth = 0;

			var row;

			var i = 0;
			var rowId = rowStart;
			var len = dataArray.length;

			var markedRange = this._markedRange;

			if (this._columnsHeader != null) {
				if (rowStart === 0 && 0 < rowEnd) {
					var headerRow = this._createHeaderRow(columnStart, columnEnd);
					$.each(headerRow, function(index, headerCell) {
						if (index === 0) {
							rangeHeight += headerCell.height;
						}
						rangeWidth += headerCell.width;
					});
					cells.push(this._createHeaderRow(columnStart, columnEnd));
				}
			}

			for (; i < len; i += 1) {
				var data = dataArray[i];
				var dataId = this._dataToId(data);

				var heightKey = this._cellToHeightKey(rowId, data);
				var height = this._defaultRowHeight;
				if (this._heightMap.hasOwnProperty(heightKey)) {
					height = this._heightMap[heightKey];
				}

				var isMarkedRow = markedRange.rowStart <= rowId && rowId < markedRange.rowEnd;

				rangeHeight += height;

				row = [];

				for (var j = columnStart; j < columnEnd; j += 1) {
					var columnId = j;

					var widthKey = this._cellToWidthKey(columnId, data);
					var width = this._defaultColumnWidth;
					if (this._widthMap.hasOwnProperty(widthKey)) {
						width = this._widthMap[widthKey];
					}

					var selectKey = this._cellToSelectKey(rowId, columnId, data);
					var selected = this._selector.isSelected(selectKey);

					if (i === 0 && (0 < rowStart || this._columnsHeader == null)) {
						rangeWidth += width;
					}


					var propertyName = this._columns[j].key;
					var isSortableColumn = this._sortable[propertyName];

					var isMarkableCell = this._markable[propertyName];

					var marked = false;
					if (isMarkedRow && markedRange.columnStart <= columnId
							&& columnId < markedRange.columnEnd) {
						marked = true;
					}

					var modified = false;
					var value = this._cellToValue(rowId, columnId, data);

					if (this._modified[dataId] != null
							&& this._modified[dataId][propertyName] != null) {
						modified = true;
						value = this._modified[dataId][propertyName];
					}

					var cellData = {
						dataId: dataId,
						rowId: rowId,
						columnId: columnId,

						propertyName: propertyName,
						editKey: this._cellToEditKey(rowId, columnId, data),
						selectKey: selectKey,
						heightKey: heightKey,
						widthKey: widthKey,

						selected: selected,
						marked: marked,
						height: height,
						width: width,

						isModified: modified,
						isHeaderRow: false,
						isSortableColumn: isSortableColumn,
						isMarkableCell: isMarkableCell,

						value: value,
						rowData: data
					};

					row.push(cellData);
				}
				cells.push(row);

				rowId += 1;
			}

			return {
				cells: cells,
				rangeHeight: rangeHeight,
				rangeWidth: rangeWidth
			};
		},


		_init: function() {
			var that = this;
			this._source.addEventListener('changeSource', function(ev) {
				that.dispatchEvent(ev);
			});
		},


		// --- Public Method --- //

		sliceAsync2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);

			var that = this;

			return this._source.sliceAsync(range.start, range.end).then(function(dataArray) {
				var gridData = that._convert(dataArray, rowStart, rowEnd, columnStart, columnEnd);
				gridData.columnsWidth = that.getColumnsWidth();

				return gridData;
			});
		},

		isCached2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);
			return this._source.isCached(range.start, range.end);
		},

		sliceCachedData2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);

			var dataArray = this._source.sliceCachedData(range.start, range.end);
			var gridData = this._convert(dataArray, rowStart, rowEnd, columnStart, columnEnd);

			return gridData;
		},

		getCachedData2D: function(rowId, columnId) {
			var gridData = this.sliceCachedData2D(rowId, rowId + 1, columnId, columnId + 1);
			return gridData[0][0];
		},

		getCachedOriginData: function(rowId) {
			var range = this._range2DTo1D(rowId, rowId + 1, 0, -1);

			var dataArray = this._source.sliceCachedData(range.start, range.end);

			return dataArray[0];
		},

		isCachedAllWidth: function() {
			return true;
		},

		isCachedAllHeight: function() {
			// TODO: 実装
			return false;
		},

		getTotalRows: function() {
			var totalRows = this._source.getTotalLength();
			if (this._columnsHeader != null) {
				totalRows += 1;
			}
			return totalRows;
		},

		getTotalColumns: function() {
			return this._columns.length;
		},

		getDefaultRowHeight: function() {
			return this._defaultRowHeight;
		},

		getDefaultColumnWidth: function() {
			return this._defaultColumnWidth;
		},

		getColumnsWidth: function() {
			var result = [];

			var len = this._columns.length;
			for (var i = 0; i < len; i += 1) {
				var widthKey = this._columns[i].key;

				var columnWidth = this._defaultColumnWidth;
				if (this._widthMap.hasOwnProperty(widthKey)) {
					columnWidth = this._widthMap[widthKey];
				}

				result.push(columnWidth);
			}

			return result;
		},

		onChangeSource: function(listener) {
			this._source.onChangeSource(listener);
		},

		setHeight: function(heightKey, height) {
			if (height === this._defaultHeight) {
				delete this._heightMap[heightKey];
				return;
			}
			this._heightMap[heightKey] = height;

			// TODO: 列入れ替えもあるのでもっと良い名前を考える
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		setWidth: function(widthKey, width) {
			if (width === this._defaultWidth) {
				delete this._widthMap[widthKey];
				return;
			}
			this._widthMap[widthKey] = width;
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		selectData: function(selectKey) {
			this._selector.select(selectKey);
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		selectMultiData: function(allData) {
			for (var i = 0, len = allData.length; i < len; i++) {
				var data = allData[i];
				var selectKey = this._cellToSelectKey(null, null, data);
				this._selector.select(selectKey);
			}

			this.dispatchEvent({
				type: 'changeData'
			});
		},

		unselectData: function(selectKey) {
			this._selector.unselect(selectKey);
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		unselectAllData: function() {
			this._selector.unselectAll();
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		isSelected: function(selectKey) {
			return this._selector.isSelected(selectKey);
		},

		getSelectedDataIds: function() {
			return this._selector.getSelectedKeys();
		},

		getColumns: function() {
			return $.extend(true, [], this._columns);
		},

		setColumns: function(columns) {
			this._columns = columns;
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		editData: function(dataId, propertyName, value) {
			var objectModified = this._modified[dataId];
			if (objectModified == null) {
				objectModified = {};
				this._modified[dataId] = objectModified;
			}

			objectModified[propertyName] = value;

			this.dispatchEvent({
				type: 'changeData'
			});
		},

		getModified: function() {
			return $.extend(true, {}, this._modified);
		},

		clearModified: function() {
			this._modified = {};
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		markRange: function(rowStart, rowEnd, columnStart, columnEnd) {
			var _rowStart = rowStart;
			var _rowEnd = rowEnd;
			var _columnStart = columnStart;
			var _columnEnd = columnEnd;

			if (this.getTotalRows() < _rowEnd) {
				_rowEnd = this.getTotalRows();
			}
			if (this.getTotalColumns() < _columnEnd) {
				_columnEnd = this.getTotalColumns();
			}
			if (_rowEnd < _rowStart) {
				_rowStart = _rowEnd;
			}
			if (_columnEnd < _columnStart) {
				_columnStart = _columnEnd;
			}

			this._markedRange = {
				rowStart: _rowStart,
				rowEnd: _rowEnd,
				columnStart: _columnStart,
				columnEnd: _columnEnd
			};

			this.dispatchEvent({
				type: 'changeData'
			});
		},

		getMarkedRange: function() {
			return $.extend({}, this._markedRange);
		}

	});


	var createGridDataConverter = function(params) {
		return new GridDataConverter(params);
	};


	h5.u.obj.expose('h5.ui.components.datagrid', {

		/**
		 * @memberOf h5.ui.components.datagrid
		 */
		createGridDataConverter: createGridDataConverter

	});

})(jQuery);


//---- GridHorizontalDataConverter ---- //
(function($) {
	'use strict';

	var EventDispatcher = h5.ui.components.virtualScroll.data.EventDispatcher;


	var GridHorizontalDataConverter = function(params) {
		this._source = params.dataSource;
		this._idKey = params.idKey;
		this._selector = params.selector;
		this._defaultRowHeight = params.defaultRowHeight;
		this._defaultColumnWidth = params.defaultColumnWidth;

		this._rows = [];

		this._heightMap = {};
		this._widthMap = {};
		this._sortable = {};
		this._markable = {};
		this._modified = {};

		this._markedRange = {
			rowStart: 0,
			rowEnd: 0,
			columnStart: 0,
			columnEnd: 0
		};

		for (var i = 0, len = params.rows.length; i < len; i++) {
			this._rows.push({
				key: params.rows[i]
			});
		}

		var that = this;
		if (params.rowsOption != null) {
			this._rowsHeader = {};
			$.each(params.rowsOption, function(key, option) {
				if (option.height != null) {
					that._heightMap[key] = option.height;
				}
				if (option.header != null) {
					that._rowsHeader[key] = option.header;
				}
				that._sortable[key] = !!option.sortable;
				that._markable[key] = !!option.markable;
			});
		}

		this._init();
	};


	$.extend(GridHorizontalDataConverter.prototype, new EventDispatcher(), {

		// --- Property --- //


		/**
		 * @memberOf h5.ui.components.datagrid.GridHorizontalDataConverter
		 */
		_source: null,

		_idKey: null,

		_rows: null,


		_selector: null,

		_heightMap: null,

		_widthMap: null,

		_sortable: null,

		_markable: null,

		_defaultRowHeight: null,

		_defaultColumnWidth: null,

		_rowsHeader: null,

		_modified: null,

		_markedRange: null,



		// --- Private Method --- //

		_dataToId: function(data) {
			if (data == null) {
				return null;
			}
			return data[this._idKey];
		},

		_cellToEditKey: function(rowId, columnId, data) {
			return this._rows[rowId].key;
		},

		_cellToSelectKey: function(rowId, columnId, data) {
			return this._dataToId(data);
		},

		_cellToHeightKey: function(rowId, data) {
			return this._rows[rowId].key;
		},

		_cellToWidthKey: function(columnId, data) {
			return this._dataToId(data);
		},

		_cellToValue: function(rowId, columnId, data) {
			if (data == null) {
				return null;
			}
			var key = this._rows[rowId].key;
			return data[key];
		},

		_range2DTo1D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var start = columnStart;
			var end = columnEnd;
			if (this._rowsHeader != null) {
				start -= 1;
				end -= 1;

				if (start < 0) {
					start = 0;
				}
			}
			return {
				start: start,
				end: end
			};
		},

		_createHeaderColumn: function(rowStart, rowEnd) {

			var searchOptions = this._source.getSearchOptions();
			var sorts = {};

			if (searchOptions.sort != null) {
				$.each(searchOptions.sort, function(i, elem) {
					sorts[elem.property] = elem.order;
				});
			}

			var markedRange = this._markedRange;
			var isMarkedColumn = markedRange.columnStart <= 0 && 0 < markedRange.columnEnd;

			var column = [];
			for (var i = rowStart; i < rowEnd; i += 1) {
				var key = this._rows[i].key;
				var header = key;
				if (this._rowsHeader[key] != null) {
					header = this._rowsHeader[key];
				}

				var rowId = i;
				var width = this._defaultColumnWidth;

				var heightKey = this._cellToHeightKey(rowId, null);
				var height = this._defaultRowHeight;
				if (this._heightMap.hasOwnProperty(heightKey)) {
					height = this._heightMap[heightKey];
				}

				var isSortableColumn = this._sortable[key];
				var sortOrder = null;
				if (sorts.hasOwnProperty(key)) {
					sortOrder = sorts[key];
				}

				var marked = false;
				if (isMarkedColumn && markedRange.rowStart <= rowId && rowId < markedRange.rowEnd) {
					marked = true;
				}

				var cellData = {
					dataId: null,
					rowId: rowId,
					columnId: 0,

					propertyName: key,
					editKey: null,
					selectKey: null,
					heightKey: heightKey,
					widthKey: null,

					selected: false,
					height: height,
					width: width,

					isHeaderRow: true,
					isSortableColumn: isSortableColumn,
					sortOrder: sortOrder,

					isMarkableCell: false,
					marked: marked,

					columnData: null,
					value: header
				};

				column.push([cellData]);
			}
			return column;
		},

		_convert: function(dataArray, rowStart, rowEnd, columnStart, columnEnd) {
			var cells = [];

			var rangeHeight = 0;
			var rangeWidth = 0;

			var i = 0;
			var columnId = columnStart;
			var len = dataArray.length;

			if (this._rowsHeader != null) {
				if (columnStart === 0 && 0 < columnEnd) {
					var headerColumn = this._createHeaderColumn(rowStart, rowEnd);
					$.each(headerColumn, function(index, headerRow) {
						var headerCell = headerRow[0];
						if (index === 0) {
							rangeWidth += headerCell.width;
						}
						rangeHeight += headerCell.height;
					});
					for (i = rowStart; i < rowEnd; i += 1) {
						cells.push(headerColumn[i - rowStart]);
					}
				} else {
					for (i = rowStart; i < rowEnd; i += 1) {
						cells.push([]);
					}
				}
			}

			for (i = 0; i < len; i += 1) {
				var data = dataArray[i];
				var dataId = this._dataToId(data);

				var widthKey = this._cellToWidthKey(columnId, data);
				var width = this._defaultColumnWidth;
				if (this._widthMap.hasOwnProperty(widthKey)) {
					width = this._widthMap[widthKey];
				}

				rangeWidth += width;

				var markedRange = this._markedRange;
				var isMarkedColumn = markedRange.columnStart <= columnId
						&& columnId < markedRange.columnEnd;

				for (var j = rowStart; j < rowEnd; j += 1) {
					var rowId = j;

					var heightKey = this._cellToHeightKey(rowId, data);
					var height = this._defaultColumnHeight;
					if (this._heightMap.hasOwnProperty(heightKey)) {
						height = this._heightMap[heightKey];
					}

					var selectKey = this._cellToSelectKey(rowId, columnId, data);
					var selected = this._selector.isSelected(selectKey);

					if (i === 0 && (0 < columnStart || this._rowsHeader == null)) {
						rangeHeight += height;
					}


					var propertyName = this._rows[j].key;
					var isSortableColumn = this._sortable[propertyName];

					var isMarkableCell = this._markable[propertyName];

					var marked = false;
					if (isMarkedColumn && markedRange.rowStart <= rowId
							&& rowId < markedRange.rowEnd) {
						marked = true;
					}

					var modified = false;
					var value = this._cellToValue(rowId, columnId, data);

					if (this._modified[dataId] != null
							&& this._modified[dataId][propertyName] != null) {
						modified = true;
						value = this._modified[dataId][propertyName];
					}

					var cellData = {
						dataId: dataId,
						rowId: rowId,
						columnId: columnId,

						propertyName: propertyName,
						editKey: this._cellToEditKey(rowId, columnId, data),
						selectKey: selectKey,
						heightKey: heightKey,
						widthKey: widthKey,

						selected: selected,
						marked: marked,
						height: height,
						width: width,

						isModified: modified,
						isHeaderRow: false,
						isSortableColumn: isSortableColumn,
						isMarkableCell: isMarkableCell,

						value: value,
						rowData: data
					};

					cells[j - rowStart].push(cellData);
				}

				columnId += 1;
			}

			return {
				cells: cells,
				rangeHeight: rangeHeight,
				rangeWidth: rangeWidth
			};
		},


		_init: function() {
			var that = this;
			this._source.addEventListener('changeSource', function(ev) {
				that.dispatchEvent(ev);
			});
		},


		// --- Public Method --- //

		sliceAsync2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);

			var that = this;

			return this._source.sliceAsync(range.start, range.end).then(function(dataArray) {
				var gridData = that._convert(dataArray, rowStart, rowEnd, columnStart, columnEnd);
				gridData.rowsHeight = that.getRowsHeight();

				return gridData;
			});
		},

		isCached2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);
			return this._source.isCached(range.start, range.end);
		},

		sliceCachedData2D: function(rowStart, rowEnd, columnStart, columnEnd) {
			var range = this._range2DTo1D(rowStart, rowEnd, columnStart, columnEnd);

			var dataArray = this._source.sliceCachedData(range.start, range.end);
			var gridData = this._convert(dataArray, rowStart, rowEnd, columnStart, columnEnd);

			return gridData;
		},

		getCachedData2D: function(rowId, columnId) {
			var gridData = this.sliceCachedData2D(rowId, rowId + 1, columnId, columnId + 1);
			return gridData[0][0];
		},

		getCachedOriginData: function(rowId) {
			var range = this._range2DTo1D(rowId, rowId + 1, 0, -1);

			var dataArray = this._source.sliceCachedData(range.start, range.end);

			return dataArray[0];
		},

		isCachedAllWidth: function() {
			return false;
		},

		isCachedAllHeight: function() {
			return true;
		},

		getTotalRows: function() {
			return this._rows.length;
		},

		getTotalColumns: function() {
			var totalColumns = this._source.getTotalLength();
			if (this._rowsHeader != null) {
				totalColumns += 1;
			}
			return totalColumns;
		},

		getDefaultRowHeight: function() {
			return this._defaultRowHeight;
		},

		getDefaultColumnWidth: function() {
			return this._defaultColumnWidth;
		},

		getRowsHeight: function() {
			var result = [];

			var len = this._rows.length;
			for (var i = 0; i < len; i += 1) {
				var heightKey = this._rows[i].key;

				var rowHeight = this._defaultRowHeight;
				if (this._heightMap.hasOwnProperty(heightKey)) {
					rowHeight = this._heightMap[heightKey];
				}

				result.push(rowHeight);
			}

			return result;
		},

		onChangeSource: function(listener) {
			this._source.onChangeSource(listener);
		},

		setHeight: function(heightKey, height) {
			if (height === this._defaultHeight) {
				delete this._heightMap[heightKey];
				return;
			}
			this._heightMap[heightKey] = height;

			// TODO: 列入れ替えもあるのでもっと良い名前を考える
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		setWidth: function(widthKey, width) {
			if (width === this._defaultWidth) {
				delete this._widthMap[widthKey];
				return;
			}
			this._widthMap[widthKey] = width;
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		selectData: function(selectKey) {
			this._selector.select(selectKey);
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		unselectData: function(selectKey) {
			this._selector.unselect(selectKey);
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		unselectAllData: function() {
			this._selector.unselectAll();
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		isSelected: function(selectKey) {
			return this._selector.isSelected(selectKey);
		},

		getSelectedDataIds: function() {
			return this._selector.getSelectedKeys();
		},

		getRows: function() {
			return $.extend(true, [], this._rows);
		},

		setRows: function(rows) {
			this._rows = rows;
			this.dispatchEvent({
				type: 'changeCellSize'
			});
		},

		editData: function(dataId, propertyName, value) {
			var objectModified = this._modified[dataId];
			if (objectModified == null) {
				objectModified = {};
				this._modified[dataId] = objectModified;
			}

			objectModified[propertyName] = value;

			this.dispatchEvent({
				type: 'changeData'
			});
		},

		getModified: function() {
			return $.extend(true, {}, this._modified);
		},

		clearModified: function() {
			this._modified = {};
			this.dispatchEvent({
				type: 'changeData'
			});
		},

		markRange: function(rowStart, rowEnd, columnStart, columnEnd) {
			var _rowStart = rowStart;
			var _rowEnd = rowEnd;
			var _columnStart = columnStart;
			var _columnEnd = columnEnd;

			if (this.getTotalRows() < _rowEnd) {
				_rowEnd = this.getTotalRows();
			}
			if (this.getTotalColumns() < _columnEnd) {
				_columnEnd = this.getTotalColumns();
			}
			if (_rowEnd < _rowStart) {
				_rowStart = _rowEnd;
			}
			if (_columnEnd < _columnStart) {
				_columnStart = _columnEnd;
			}

			this._markedRange = {
				rowStart: _rowStart,
				rowEnd: _rowEnd,
				columnStart: _columnStart,
				columnEnd: _columnEnd
			};

			this.dispatchEvent({
				type: 'changeData'
			});
		},

		getMarkedRange: function() {
			return $.extend({}, this._markedRange);
		}

	});


	var createGridHorizontalDataConverter = function(params) {
		return new GridHorizontalDataConverter(params);
	};


	h5.u.obj.expose('h5.ui.components.datagrid', {

		/**
		 * @memberOf h5.ui.components.datagrid
		 */
		createGridHorizontalDataConverter: createGridHorizontalDataConverter

	});

})(jQuery);


// ---- GridLayout ---- //

(function($) {
	'use strict';

	var VERTICAL_SCROLL_BAR_CLASS = 'grid-vertical-scroll-bar';
	var HORIZONTAL_SCROLL_BAR_CLASS = 'grid-horizontal-scroll-bar';

	var HEADER_TOP_LEFT_CELLS_CLASS = 'grid-header-top-left-cells';
	var HEADER_ROWS_CLASS = 'grid-header-rows';
	var HEADER_COLUMNS_CLASS = 'grid-header-columns';
	var MAIN_BOX_CLASS = 'grid-main-box';
	var COPY_TARGET_CLASS = 'grid-copy-target';

	var RENDER_WAIT_TIME = 100;
	var KEYDOWN_WAIT_TIME = 100;

	var createRenderer = function(defaultFormatter, formatters) {

		return function($target, gridData) {
			if (gridData == null) {
				return;
			}
			var tableWidth = gridData.rangeWidth + 1;

			var html = '<table style="table-layout: fixed; border-collapse: collapse; ';
			html += 'width: ' + tableWidth + 'px;';
			html += '">';

			var rowSize = gridData.cells.length;
			var columnSize = 0;
			if (0 < gridData.cells.length) {
				columnSize = gridData.cells[0].length;
			}

			for (var i = 0; i < rowSize; i += 1) {
				var row = gridData.cells[i];
				if (row == null || row[0] == null) {
					continue;
				}

				var height = row[0].height;

				html += '<tr style="height:' + height + 'px;">';

				for (var j = 0; j < columnSize; j += 1) {
					var cell = row[j];
					var width = cell.width;

					var divHeight = height - 1;
					var divWidth = width - 1;

					html += '<td class="';

					if (cell.selected) {
						html += 'grid-selected ';
					}
					if (cell.marked) {
						html += 'grid-marked ';
					}
					if (cell.isHeaderRow) {
						html += 'grid-header ';
					}

					html += '" ';

					html += 'data-h5-dyn-grid-row-id="' + cell.rowId + '" ';
					html += 'data-h5-dyn-grid-column-id="' + cell.columnId + '" ';
					html += 'data-h5-dyn-grid-data-id="' + cell.dataId + '" ';
					html += 'data-h5-dyn-grid-property-name="' + cell.propertyName + '" ';
					html += 'data-h5-dyn-grid-edit-key="' + cell.editKey + '" ';
					html += 'data-h5-dyn-grid-select-key="' + cell.selectKey + '" ';
					html += 'data-h5-dyn-grid-height-key="' + cell.heightKey + '" ';
					html += 'data-h5-dyn-grid-width-key="' + cell.widthKey + '" ';
					html += 'data-h5-dyn-grid-is-header-row="' + cell.isHeaderRow + '" ';
					html += 'data-h5-dyn-grid-is-sortable-column="' + cell.isSortableColumn + '" ';
					html += 'data-h5-dyn-grid-is-markable-cell="' + cell.isMarkableCell + '" ';
					html += 'data-h5-dyn-grid-is-modified-cell="' + cell.isModified + '" ';
					html += 'data-h5-dyn-grid-sort-order="' + cell.sortOrder + '" ';

					// TODO: cellData から td の属性 data-h5-dyn-grid-custom-xxx を追加する仕組み

					html += 'style="padding: 0;';
					html += ' width:' + divWidth + 'px;';
					html += ' border-width: 1px;';

					html += '">';
					html += '<div class="grid-cell-frame" style="overflow: hidden;';
					html += ' height:' + divHeight + 'px;';
					html += ' width:' + divWidth + 'px;';


					html += '">';

					var formatter = formatters[cell.propertyName];
					if (formatter == null) {
						formatter = defaultFormatter;
					}
					var cellHtml = formatter(cell);

					html += cellHtml;
					html += '</div>';
					html += '</td>';
				}

				html += '</tr>';
			}

			html += '</table>';

			$target[0].innerHTML = html;
		};
	};


	var gridLayoutController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.GridLayoutController
		 */
		__name: 'h5.ui.components.datagrid.GridLayoutController',


		// --- Property --- //

		_converter: null,

		_headerRows: 0,

		_headerColumns: 0,

		_headerTopLeftCellsHtml: null,

		_verticalScrollStrategy: null,

		_horizontalScrollStrategy: null,

		_knownRowsHeight: null,

		_knownColumnsWidth: null,

		_rowSelector: null,

		_columnSelector: null,


		_mainHeight: 0,

		_mainWidth: 0,


		_initializeDeferred: null,

		_setRendererDeferred: null,


		_renderPromise: null,

		_renderWaitTimerId: null,

		_ignoreKeydown: false,


		// --- Private Method --- //

		_getCopyText: function() {
			var range = this._converter.getMarkedRange();
			var copyData = this._converter.sliceCachedData2D(range.rowStart, range.rowEnd,
					range.columnStart, range.columnEnd);

			var copyText = $.map(copyData.cells, function(row) {
				return $.map(row, function(cell) {
					if (cell.value == null) {
						return '';
					}
					return String(cell.value);
				}).join('\t');
			}).join('\n');
			return copyText;
		},

		_preventDefaultKeydownEvent: function(event) {
			var keycode = event.which;
			if (37 <= keycode && keycode <= 40) {
				event.preventDefault();
			}
		},

		_triggerKeydownEvent: function(event) {
			var keycode = event.which;
			var isCtrl = false;
			if (event.ctrlKey) {
				isCtrl = true;
			}

			if (isCtrl && keycode === 67) {
				var $textArea = this.$find('.' + COPY_TARGET_CLASS).find('textarea');
				$textArea.val(this._getCopyText());
				$textArea.select();
				setTimeout(function() {
					$textArea.select();
				}, 0);
				return;
			}

			if (keycode === 37) { // arrow-left

				this.trigger('h5scroll', {
					horizontalScroll: {
						type: 'index',
						diff: -1
					}
				});

				return;
			}

			if (keycode === 38) { // arrow-up

				this.trigger('h5scroll', {
					verticalScroll: {
						type: 'index',
						diff: -1
					}
				});

				return;
			}

			if (keycode === 39) { // arrow-right

				this.trigger('h5scroll', {
					horizontalScroll: {
						type: 'index',
						diff: 1
					}
				});

				return;
			}

			if (keycode === 40) { // arrow-down

				this.trigger('h5scroll', {
					verticalScroll: {
						type: 'index',
						diff: 1
					}
				});

				return;
			}
		},

		_createBoxController: function(className, headerProperty) {
			var $root = $(this.rootElement);
			var $target = $root.children('.' + className);

			var controller;

			if ($target.length === 0 && typeof headerProperty !== 'string') {
				$target = $('<div></div>').addClass(className).appendTo($root);
				controller = h5.core.controller($target,
						h5.ui.components.virtualScroll.VirtualScrollBoxController);

				var that = this;
				this._setRendererDeferred.then(function() {
					controller.init(that._renderer);
				});

			} else {
				if ($target.length === 0) {
					$target = $('<div></div>');
					$target.addClass(className).html(headerProperty).appendTo($root);
				}
				controller = h5.core.controller($target,
						h5.ui.components.virtualScroll.HtmlScrollBoxController);

				controller.init(this._rowSelector, this._columnSelector);
			}

			return controller;
		},

		_refreshBoxPosition: function() {
			this._verticalBarController.initPromise.then(this.own(function() {
				var $root = $(this.rootElement);
				var $headerCells = $root.children('.' + HEADER_TOP_LEFT_CELLS_CLASS);
				var $headerRows = $root.children('.' + HEADER_ROWS_CLASS);
				var $headerColumns = $root.children('.' + HEADER_COLUMNS_CLASS);
				var $mainBox = $root.children('.' + MAIN_BOX_CLASS);
				var $verticalBar = $root.children('.' + VERTICAL_SCROLL_BAR_CLASS);
				var $horizontalBar = $root.children('.' + HORIZONTAL_SCROLL_BAR_CLASS);

				var scrollBarWidth = $verticalBar.width();

				var rootHeight = $root.height();
				var rootWidth = $root.width();

				var renderHeight = 0;
				var renderWidth = 0;

				if (this._converter.getColumnsWidth != null) {
					var columnsWidth = this._converter.getColumnsWidth();
					$.each(columnsWidth, function(i, width) {
						renderWidth += width;
					});

					renderHeight = this._converter.getTotalRows()
							* this._converter.getDefaultRowHeight();

					if (typeof this._headerColumns === 'number') {
						this._headerWidth = 1;

						for (var i = 0; i < this._headerColumns; i++) {
							this._headerWidth += columnsWidth[i];
						}
					}
				} else {
					var rowsHeight = this._converter.getRowsHeight();
					$.each(rowsHeight, function(i, height) {
						renderHeight += height;
					});

					renderWidth = this._converter.getTotalColumns()
							* this._converter.getDefaultColumnWidth();

					if (typeof this._headerRows === 'number') {
						this._headerHeight = 1;

						for (var i = 0; i < this._headerRows; i++) {
							this._headerHeight += rowsHeight[i];
						}
					}
				}

				// TODO: headerHeight の更新


				var headerHeight = this._headerHeight;
				var headerWidth = this._headerWidth;

				var mainHeight = rootHeight - headerHeight + 1;
				var mainWidth = rootWidth - headerWidth + 1;

				if (rootHeight <= renderHeight) {
					mainWidth -= scrollBarWidth;

					if (rootWidth - scrollBarWidth <= renderWidth) {
						mainHeight -= scrollBarWidth;
					}
				} else {
					if (rootWidth <= renderWidth) {
						mainHeight -= scrollBarWidth;
					}
				}

				this._mainHeight = mainHeight;
				this._mainWidth = mainWidth;

				var mainLeft = (0 < headerWidth) ? headerWidth - 1 : 0;
				var mainTop = (0 < headerHeight) ? headerHeight - 1 : 0;

				// TODO: バーが表現できない場合に列が消えたりする
				if (mainHeight < 0) {
					this.log.warn('ヘッダ行が描画領域に入りきりません');
				}
				if (mainWidth < 0) {
					this.log.warn('ヘッダ列が描画領域に入りきりません');
				}

				$headerCells.css({
					height: headerHeight,
					width: headerWidth,
					'z-index': 3
				});

				$headerRows.css({
					left: mainLeft,
					height: headerHeight,
					width: mainWidth,
					'z-index': 2
				});

				$headerColumns.css({
					top: mainTop,
					height: mainHeight,
					width: headerWidth,
					'z-index': 2
				});

				$mainBox.css({
					top: mainTop,
					left: mainLeft,
					height: mainHeight,
					width: mainWidth
				});

				$verticalBar.css({
					top: mainTop,
					height: mainHeight
				});

				$horizontalBar.css({
					left: mainLeft,
					width: mainWidth
				});
			}));
		},

		_setKnownHeightAndWidth: function(gridData) {
			if (gridData == null) {
				return;
			}

			if (this._knownColumnsWidth == null && this._knownRowsHeight == null) {
				return;
			}

			var that = this;

			if (this._knownColumnsWidth) {
				gridData.columnsWidth = this._knownColumnsWidth;
			}

			$.each(gridData.cells, function(i, row) {
				$.each(row, function(j, cell) {
					if (that._knownColumnsWidth != null) {
						cell.width = that._knownColumnsWidth[cell.columnId];
					}
					if (that._knownRowsHeight != null) {
						cell.height = that._knownRowsHeight[cell.rowId];
					}
				});
			});
		},

		_endRender: function(rowStart, rowEnd, columnStart, columnEnd) {
			this._mainBoxController.endLoad();
			this._headerColumnsController.endLoad();
			this._headerRowsController.endLoad();
			this.trigger('renderGrid', {
				rowStart: rowStart,
				rowEnd: rowEnd,
				columnStart: columnStart,
				columnEnd: columnEnd
			});
			$(this.rootElement).focus();
		},

		_renderHeader: function(rowStart, rowEnd, columnStart, columnEnd) {

			// ヘッダ行のレンダリング
			var headerRowsData = null;
			if (typeof this._headerRows === 'number' && 0 < this._headerRows) {
				headerRowsData = this._converter.sliceCachedData2D(0, this._headerRows,
						columnStart, columnEnd);
			}

			this._setKnownHeightAndWidth(headerRowsData);

			var headerRowsRange = {
				columnStart: columnStart,
				columnEnd: columnEnd
			};

			if (typeof this._headerRows === 'number') {
				headerRowsRange.rowStart = 0;
				headerRowsRange.rowEnd = this._headerRows;
			}

			this._headerRowsController.render(headerRowsData, headerRowsRange);


			// ヘッダ列のレンダリング
			var headerColumnsData = null;
			if (typeof this._headerColumns === 'number' && 0 < this._headerColumns) {
				headerColumnsData = this._converter.sliceCachedData2D(rowStart, rowEnd, 0,
						this._headerColumns);
			}

			this._setKnownHeightAndWidth(headerColumnsData);

			var headerColumnsRange = {
				rowStart: rowStart,
				rowEnd: rowEnd
			};

			if (typeof this._headerColumns === 'number') {
				headerColumnsRange.columnStart = 0;
				headerColumnsRange.columnEnd = this._headerColumns;
			}

			this._headerColumnsController.render(headerColumnsData, headerColumnsRange);


			// 左上ヘッダのレンダリング
			var headerRows = this._headerRows;
			var headerColumns = this._headerColumns;
			if (this._headerTopLeftCellsHtml == null && 0 < headerColumns && 0 < headerRows) {

				var headerCellsData = this._converter.sliceCachedData2D(0, headerRows, 0,
						headerColumns);


				this._setKnownHeightAndWidth(headerCellsData);

				var headerCellsRange = {
					rowStart: 0,
					rowEnd: headerRows,
					columnStart: 0,
					columnEnd: headerColumns
				};

				this._headerTopLeftCellsController.render(headerCellsData, headerCellsRange);
			}
		},

		_render: function() {
			var that = this;

			var msg;
			if (this._knownRowsHeight != null) {
				var knownHeaderRows = this._knownRowsHeight.length;
				var dataRows = this._converter.getTotalRows();
				if (knownHeaderRows !== dataRows) {
					msg = 'ヘッダの行数（{0}行）とデータの行数（{1}行）が一致しません';
					this.throwError(msg, knownHeaderRows, dataRows);
				}
			}
			if (this._knownColumnsWidth != null) {
				var knownHeaderColumns = this._knownColumnsWidth.length;
				var dataColumns = this._converter.getTotalColumns();
				if (knownHeaderColumns !== dataColumns) {
					msg = 'ヘッダの列数（{0}列）とデータの列数（{1}列）が一致しません';
					this.throwError(msg, knownHeaderColumns, dataColumns);
				}
			}


			var rowStart = this._rowStart;
			var rowEnd = this._rowEnd;
			var columnStart = this._columnStart;
			var columnEnd = this._columnEnd;

			if (typeof this._headerRows === 'number') {
				rowStart += this._headerRows;
				rowEnd += this._headerRows;
			}
			if (typeof this._headerColumns === 'number') {
				columnStart += this._headerColumns;
				columnEnd += this._headerColumns;
			}

			var isCached = this._converter.isCached2D(rowStart, rowEnd, columnStart, columnEnd);

			// cache されている場合はそのまま表示する
			if (isCached && this._renderWaitTimerId == null) {
				var cachedData = this._converter.sliceCachedData2D(rowStart, rowEnd, columnStart,
						columnEnd);

				that._renderPromise = that._renderPromise.then(function() {
					that._setKnownHeightAndWidth(cachedData);
					that._mainBoxController.render(cachedData, {
						rowStart: rowStart,
						rowEnd: rowEnd,
						columnStart: columnStart,
						columnEnd: columnEnd
					});

					that._renderHeader(rowStart, rowEnd, columnStart, columnEnd);
					that._endRender(rowStart, rowEnd, columnStart, columnEnd);
				});
				return;
			}

			if (this._renderWaitTimerId != null) {
				clearTimeout(this._renderWaitTimerId);
			}

			this._mainBoxController.beginLoad();
			if (this._converter.getColumns != null) {
				this._headerColumnsController.beginLoad();
			} else {
				this._headerRowsController.beginLoad();
			}
			this.trigger('loadDataBegin');

			this._renderWaitTimerId = setTimeout(function() {

				// データの読み込み
				var loadPromise = that._converter.sliceAsync2D(rowStart, rowEnd, columnStart,
						columnEnd);

				// 前のレンダリングとデータ読み込みの双方を待つ
				// TODO: reject 時の復帰をうまくやる
				that._renderPromise = h5.async.when(loadPromise, that._renderPromise);

				// データのレンダリング
				that._renderPromise = that._renderPromise.then(function(gridData) {
					that._setKnownHeightAndWidth(gridData);

					that._mainBoxController.render(gridData, {
						rowStart: rowStart,
						rowEnd: rowEnd,
						columnStart: columnStart,
						columnEnd: columnEnd
					});
				});

				// ヘッダのレンダリング & 後処理
				that._renderPromise = that._renderPromise.then(function() {
					that._renderHeader(rowStart, rowEnd, columnStart, columnEnd);
					that.trigger('loadDataEnd');
					that._endRender(rowStart, rowEnd, columnStart, columnEnd);
				});

				that._renderWaitTimerId = null;
			}, RENDER_WAIT_TIME);
		},

		_scroll: function(verticalDiff, horizontalDiff) {
			var $mainBox = $(this._mainBoxController.rootElement);
			var windowHeight = $mainBox.height();
			var windowWidth = $mainBox.width();

			var defaultRowHeight = this._converter.getDefaultRowHeight();
			var defaultColumnWidth = this._converter.getDefaultColumnWidth();

			var rowsHeight;

			var totalRows = this._converter.getTotalRows();
			if (typeof this._headerRows === 'number') {
				totalRows -= this._headerRows;
			}

			var totalColumns = this._converter.getTotalColumns();
			if (typeof this._headerColumns === 'number') {
				totalColumns -= this._headerColumns;
			}


			var i;

			if (this._knownRowsHeight != null) {
				rowsHeight = this._knownRowsHeight;
			} else {
				if (this._converter.getRowsHeight != null) {
					rowsHeight = this._converter.getRowsHeight();
				} else {
					rowsHeight = [];
					for (i = 0; i < totalRows; i++) {
						rowsHeight.push(defaultRowHeight);
					}
				}
			}

			var vScrollInfo = this._verticalScrollStrategy.scroll(verticalDiff, windowHeight, {
				totalCells: totalRows,
				defaultCellSize: defaultRowHeight,
				cellSizeArray: rowsHeight
			});

			var columnsWidth;
			if (this._knownColumnsWidth != null) {
				columnsWidth = this._knownColumnsWidth;
			} else {
				if (this._converter.getColumnsWidth != null) {
					columnsWidth = this._converter.getColumnsWidth();
				} else {
					columnsWidth = [];
					for (i = 0; i < totalColumns; i++) {
						columnsWidth.push(defaultColumnWidth);
					}
				}
			}
			if (typeof this._headerColumns === 'number') {
				columnsWidth = columnsWidth.slice(this._headerColumns);
			}

			var hScrollInfo = this._horizontalScrollStrategy.scroll(horizontalDiff, windowWidth, {
				totalCells: totalColumns,
				defaultCellSize: defaultColumnWidth,
				cellSizeArray: columnsWidth
			});

			this._verticalBarController.setScrollPosition(vScrollInfo.scrollPosition);
			this._verticalBarController.setScrollSize(vScrollInfo.scrollSize);

			this._horizontalBarController.setScrollPosition(hScrollInfo.scrollPosition);
			this._horizontalBarController.setScrollSize(hScrollInfo.scrollSize);

			var vIndex = vScrollInfo.index;
			var hIndex = hScrollInfo.index;

			var vLen = vScrollInfo.length;
			var hLen = hScrollInfo.length;

			if (vLen == null) {
				vLen = Math.ceil(windowHeight / defaultRowHeight) + 1;
			}

			if (totalRows < vLen) {
				this._rowStart = 0;
				this._rowEnd = totalRows;
				this._mainBoxController.setVerticalPosition(0);
				this._headerColumnsController.setVerticalPosition(0);
			} else if (vScrollInfo.isEnd) {
				this._rowStart = vIndex - vLen;
				this._rowEnd = vIndex;
				this._mainBoxController.setVerticalPositionBottom();
				this._headerColumnsController.setVerticalPositionBottom();
			} else {
				this._rowStart = vIndex;
				this._rowEnd = vIndex + vLen;
				this._mainBoxController.setVerticalPosition(vScrollInfo.offset);
				this._headerColumnsController.setVerticalPosition(vScrollInfo.offset);
			}
			if (totalRows < this._rowEnd) {
				this._rowEnd = totalRows;
			}

			if (totalColumns < hLen) {
				this._columnStart = 0;
				this._columnEnd = totalColumns;
				this._mainBoxController.setHorizontalPosition(0);
				this._headerRowsController.setHorizontalPosition(0);
			}
			if (hScrollInfo.isEnd) {
				this._columnStart = hIndex - hLen;
				this._columnEnd = hIndex;
				this._mainBoxController.setHorizontalPositionRight();
				this._headerRowsController.setHorizontalPositionRight();
			} else {
				this._columnStart = hIndex;
				this._columnEnd = hIndex + hLen;
				this._mainBoxController.setHorizontalPosition(hScrollInfo.offset);
				this._headerRowsController.setHorizontalPosition(hScrollInfo.offset);
			}

			// TODO: length が返ってきており同じ範囲だったら renderer 呼ばない
			this._render();

			// TODO: slice
		},

		_initializeChildControllers: function() {
			var $root = $(this.rootElement);

			var rootPosition = $root.css('position');

			if (rootPosition === 'static') {
				rootPosition = 'relative';
			}

			if ($root.attr('tabindex') == null) {
				$root.attr('tabindex', -1);
			}
			$root.css({
				position: rootPosition,
				overflow: 'hidden',
				outline: 'none'
			});


			this._headerTopLeftCellsController = this._createBoxController(
					HEADER_TOP_LEFT_CELLS_CLASS, this._headerTopLeftCellsHtml);
			var $headerCells = $(this._headerTopLeftCellsController.rootElement);
			$headerCells.css({
				position: 'absolute',
				top: 0,
				left: 0
			});


			this._headerRowsController = this._createBoxController(HEADER_ROWS_CLASS,
					this._headerRows);
			var $headerRows = $(this._headerRowsController.rootElement);
			$headerRows.css({
				position: 'absolute',
				top: 0
			});


			this._headerColumnsController = this._createBoxController(HEADER_COLUMNS_CLASS,
					this._headerColumns);
			var $headerColumns = $(this._headerColumnsController.rootElement);
			$headerColumns.css({
				position: 'absolute',
				left: 0
			});

			this._initializeDeferred.then(this.own(function() {
				var headerColumnsLoadingDiv = this._headerColumnsController.getLoadingDiv();
				if (headerColumnsLoadingDiv != null) {
					$(headerColumnsLoadingDiv).text('');
				}
				var headerRowsLoadingDiv = this._headerRowsController.getLoadingDiv();
				if (headerRowsLoadingDiv != null) {
					$(headerRowsLoadingDiv).text('');
				}
			}));


			this._mainBoxController = this._createBoxController(MAIN_BOX_CLASS);
			var $mainBox = $(this._mainBoxController.rootElement);
			$mainBox.css({
				position: 'absolute'
			});


			var $verticalBar = $('<div></div>').addClass(VERTICAL_SCROLL_BAR_CLASS).css({
				position: 'absolute',
				right: 0
			}).appendTo(this.rootElement);
			this._verticalBarController = h5.core.controller($verticalBar,
					h5.ui.components.virtualScroll.VerticalScrollBarController);

			var $horizontalBar = $('<div></div>').addClass(HORIZONTAL_SCROLL_BAR_CLASS).css({
				position: 'absolute',
				bottom: 0
			}).appendTo(this.rootElement);
			this._horizontalBarController = h5.core.controller($horizontalBar,
					h5.ui.components.virtualScroll.HorizontalScrollBarController);

			var offset = $root.offset();
			var $copyTarget = $('<div></div>').addClass(COPY_TARGET_CLASS).css({
				position: 'fixed',
				top: -offset.top - 1000,
				left: -offset.left - 1000
			}).appendTo($root);

			$('<textarea></textarea>').css({
				width: '1px',
				height: '1px',
				overflow: 'hidden',
				opacity: 0
			}).appendTo($copyTarget);


			this._refreshBoxPosition();
		},


		// --- Life Cycle Method --- //

		__construct: function() {
			this._initializeDeferred = h5.async.deferred();
			this._setRendererDeferred = h5.async.deferred();

			var deferred = h5.async.deferred();
			deferred.resolve();
			this._renderPromise = deferred.promise();
		},


		// --- Event Handler --- //

		'{rootElement} h5scroll': function(context) {
			context.event.stopPropagation();

			var vInfo = context.evArg.verticalScroll;
			var hInfo = context.evArg.horizontalScroll;

			var msg;

			var $mainBox = $(this._mainBoxController.rootElement);

			var vDiff = 0;
			if (vInfo) {
				if (vInfo.type === 'pixel') {
					vDiff = vInfo.diff;
				} else if (vInfo.type === 'index') {
					var height = $mainBox.height();
					vDiff = this._verticalScrollStrategy.indexDiffToScrollDiff(vInfo.diff, height);
				} else {
					msg = '不正な type を持つ h5scroll イベントです; verticalScroll.type = {0}';
					this.throwError(msg, vInfo.type);
				}
			}

			var hDiff = 0;
			if (hInfo) {
				if (hInfo.type === 'pixel') {
					hDiff = hInfo.diff;
				} else if (hInfo.type === 'index') {
					var width = $mainBox.width();
					hDiff = this._horizontalScrollStrategy.indexDiffToScrollDiff(hInfo.diff, width);
				} else {
					msg = '不正な type を持つ h5scroll イベントです; horizontalScroll.type = {0}';
					this.throwError(msg, hInfo.type);
				}
			}
			this._scroll(vDiff, hDiff);
		},

		'{rootElement} mousewheel': function(context) {
			context.event.preventDefault();

			var diff = (context.event.wheelDelta < 0) ? 1 : -1;

			this.trigger('h5scroll', {
				verticalScroll: {
					type: 'index',
					diff: diff
				}
			});
		},

		'{rootElement} keydown': function(context) {
			var event = context.event;

			this._preventDefaultKeydownEvent(event);

			if (this._ignoreKeydown) {
				return;
			}

			this._triggerKeydownEvent(event);

			var that = this;

			this._ignoreKeydown = true;
			setTimeout(function() {
				that._ignoreKeydown = false;

			}, KEYDOWN_WAIT_TIME);
		},

		'{rootElement} h5gridMoveColumn': function(context) {
			context.event.stopPropagation();

			var evArg = context.evArg;

			var from = evArg.from;
			var to = evArg.to;

			var columns = this._converter.getColumns();
			var fromColumn = columns.splice(from, 1)[0];

			if (from < to) {
				to -= 1;
			}

			columns.splice(to, 0, fromColumn);
			this._converter.setColumns(columns);
		},

		'td mousedown': function(context, $el) {
			if (!$el.data('h5DynGridIsMarkableCell')) {
				return;
			}
			var rowId = $el.data('h5DynGridRowId');
			var columnId = $el.data('h5DynGridColumnId');

			this._converter.markRange(rowId, rowId + 1, columnId, columnId + 1);
			setTimeout(this.own(function() {
				$(this.rootElement).focus();
			}), 0);
		},

		// TODO 範囲選択実装



		// --- Public Method --- //

		init: function(params) {

			this._converter = params.converter;
			this._verticalScrollStrategy = params.verticalScrollStrategy;
			this._horizontalScrollStrategy = params.horizontalScrollStrategy;
			this._headerRows = params.headerRows;
			this._headerColumns = params.headerColumns;
			this._headerTopLeftCellsHtml = params.headerTopLeftCellsHtml;
			this._renderer = createRenderer(params.defaultFormatter, params.formatters);

			// TODO: ない場合もOKにしたい
			this._headerHeight = params.headerHeight;
			this._headerWidth = params.headerWidth;

			this._knownRowsHeight = params.allRowsHeight;
			this._rowSelector = params.rowSelector;
			this._columnSelector = params.columnSelector;

			var that = this;

			this._setRendererDeferred.resolve();


			this.initPromise.then(function() {

				that._initializeChildControllers();

				var childrenPromissList = [that._mainBoxController.getInitializePromise(),
						that._headerRowsController.getInitializePromise(),
						that._headerColumnsController.getInitializePromise(),
						that._headerTopLeftCellsController.getInitializePromise(),
						that._verticalBarController.readyPromise,
						that._horizontalBarController.readyPromise];

				h5.async.when(childrenPromissList).then(function() {

					// TODO: リファクタリング
					if (that._headerRowsController.getColumnsWidth) {
						that._knownColumnsWidth = that._headerRowsController.getColumnsWidth();
					}
					if (that._headerColumnsController.getRowsHeight) {
						that._knownRowsHeight = that._headerColumnsController.getRowsHeight();
					}

					that._verticalScrollStrategy.resetPageInfo();
					that._horizontalScrollStrategy.resetPageInfo();

					that._initializeDeferred.resolve();

					that._scroll(0, 0);
				});

				that._converter.addEventListener('changeSource', function() {
					that.trigger('changeSource');
					that._refreshBoxPosition();
					that.refresh();
				});

				that._converter.addEventListener('changeData', function() {
					that._scroll(0, 0);
				});

				that._converter.addEventListener('changeCellSize', function() {
					that._refreshBoxPosition();
					that.refresh();
				});
			});

			return this.getInitializePromise();
		},

		refresh: function() {
			this._verticalScrollStrategy.resetPageInfo();
			this._horizontalScrollStrategy.resetPageInfo();
			this._scroll(0, 0);
		},

		beginLoad: function() {
			this._mainBoxController.beginLoad();
			this._headerColumnsController.beginLoad();
		},

		getInitializePromise: function() {
			return this._initializeDeferred.promise();
		},

		resize: function() {
			this._refreshBoxPosition();
			this.refresh();
		}
	};

	h5.core.expose(gridLayoutController);

})(jQuery);


// ---- D&D によるリサイズ ---- //

(function($) {
	'use strict';

	var RESIZABLE_BAR_CLASS = 'resizable-bar';
	var RESIZE_MARKER_CLASS = 'resize-marker';
	var RESIZE_MARKER_COLOR = '#888';

	var resizeColumnWidthTableController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.ResizeColumnWidthTableController
		 */
		__name: 'h5.ui.components.datagrid.ResizeColumnWidthTableController',


		// --- Property --- //

		_columnWidthKey: null,

		_minX: null,

		_startX: null,

		_posX: null,

		_minWidth: 20,

		_maxWidth: 500,


		// --- Private Method --- //

		_appendResizableBar: function() {

			var $headerRows = this.$find('.grid-header-top-left-cells, .grid-header-rows');
			$headerRows.find('td, th').each(function() {
				var $target = $(this).children('div');

				$target.wrapInner('<div></div>');
				var $wrap = $target.children('div');
				var width = parseInt($target[0].style.width.replace('px', ''), 10);
				$wrap.css({
					height: '100%',
					width: width - 4,
					float: 'left'
				});

				var $resizableBar = $('<div></div>');

				$resizableBar.addClass(RESIZABLE_BAR_CLASS).css({
					cursor: 'col-resize',
					float: 'right',
					height: '100%',
					width: 4
				});

				$wrap.after($resizableBar);
			});
		},


		// --- Life Cycle Method --- //

		__init: function() {
			var $root = $(this.rootElement);

			if ($root.css('position') === 'static') {
				$root.css({
					position: 'relative'
				});
			}

			var $resizeMarker = $('<div></div>');
			$resizeMarker.addClass(RESIZE_MARKER_CLASS).css({
				position: 'absolute',
				'background-color': RESIZE_MARKER_COLOR,
				top: 0,
				height: '100%',
				width: 2,
				'z-index': 10
			}).hide();

			$root.append($resizeMarker);
		},


		// --- Event Handler --- //

		'{rootElement} renderGrid': function() {
			this._appendResizableBar();
		},

		'.resizable-bar h5trackstart': function(context, $el) {
			context.event.stopPropagation();

			var $root = $(this.rootElement);
			var $resizeMarker = $(this.rootElement).children('.' + RESIZE_MARKER_CLASS);
			var $cell = $el.closest('td');

			this._columnWidthKey = $cell.attr('data-h5-dyn-grid-width-key');
			this._startX = $cell.offset().left;
			this._minX = this._startX + this._minWidth;
			this._maxX = this._startX + this._maxWidth;

			var posX = $cell.offset().left + $cell.outerWidth();
			if (posX < this._minX) {
				posX = this._minX;
			}
			if (this._maxX < posX) {
				posX = this._maxX;
			}

			this._posX = posX;
			var left = posX - $root.offset().left;

			$resizeMarker.css({
				left: left
			}).show();
		},

		'.resizable-bar h5trackmove': function(context) {
			var $resizeMarker = $(this.rootElement).children('.' + RESIZE_MARKER_CLASS);

			var pageX = context.event.pageX;
			if (pageX < this._minX) {
				pageX = this._minX;
			}
			if (this._maxX < pageX) {
				pageX = this._maxX;
			}

			this._posX = pageX;

			var left = pageX - $(this.rootElement).offset().left;

			$resizeMarker.css({
				left: left
			});
		},

		'.resizable-bar h5trackend': function(context) {
			var $resizeMarker = $(this.rootElement).children('.' + RESIZE_MARKER_CLASS);
			$resizeMarker.hide();

			var width = this._posX - this._startX;
			if (width < this._minWidth) {
				width = this._minWidth;
			}
			if (this._maxWidth < width) {
				width = this._maxWidth;
			}

			width = Math.floor(width);

			this.trigger('changeColumnWidth', {
				widthKey: this._columnWidthKey,
				width: width
			});

			this._columnWidthKey = null;
			this._minX = null;
			this._startX = null;
			this._posX = null;
		},


		// --- Public Method --- //

		setMinWidth: function(minWidth) {
			this._minWidth = minWidth;
		},

		setMaxWidth: function(maxWidth) {
			this._maxWidth = maxWidth;
		}
	};


	h5.core.expose(resizeColumnWidthTableController);

})(jQuery);


// ---- ソートを操作する UI ---- //
(function($) {
	'use strict';

	var SORT_ICONS_CLASS = 'grid-sort-icons';
	var SORT_ASC_ICON_CLASS = 'grid-sort-icon-asc';
	var SORT_DESC_ICON_CLASS = 'grid-sort-icon-desc';
	var SORT_ICON_SORTING_CLASS = 'grid-sort-icon-sorting';

	var DEFAULT_SORTABLE_ICON_COLOR = '#BBB';
	var DEFAULT_SORTING_ICON_COLOR = '#666';

	var sortTableController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.SortTableController
		 */
		__name: 'h5.ui.components.datagrid.SortTableController',


		// --- Property --- //

		_sortableIconColor: DEFAULT_SORTABLE_ICON_COLOR,

		_sortingIconColor: DEFAULT_SORTING_ICON_COLOR,


		// --- Private Method --- //

		_appendSortIcon: function() {
			var that = this;

			var $headerRows = this.$find('.grid-header-top-left-cells, .grid-header-rows');
			$headerRows.find('td, th').each(function() {
				var $cell = $(this);

				var sortable = $cell.data('h5DynGridIsSortableColumn');

				if (!sortable) {
					return;
				}

				var sortOrder = $cell.data('h5DynGridSortOrder');
				var $target = $(this).find('div.grid-cell');

				var $sortIcons = $('<div></div>');
				$sortIcons.addClass(SORT_ICONS_CLASS).css({
					display: 'inline-block',
					'vertical-align': 'middle'
				});

				var $ascIcon = $('<div></div>');
				$ascIcon.addClass(SORT_ASC_ICON_CLASS).css({
					height: 0,
					width: 0,
					'border-style': 'solid',
					'border-top-style': 'hidden',
					'border-left-width': '6px',
					'border-left-color': 'transparent',
					'border-right-width': '6px',
					'border-right-color': 'transparent',
					'border-bottom-width': '6px',
					'border-bottom-color': that._sortableIconColor
				});

				var $descIcon = $('<div></div>');
				$descIcon.addClass(SORT_DESC_ICON_CLASS).css({
					height: 0,
					width: 0,
					'margin-left': '1px',
					'border-style': 'solid',
					'border-top-width': '5px',
					'border-top-color': that._sortableIconColor,
					'border-left-width': '5px',
					'border-left-color': 'transparent',
					'border-right-width': '6px',
					'border-right-color': 'transparent',
					'border-bottom-style': 'hidden'
				});

				if (sortOrder === 'asc') {
					$ascIcon.addClass(SORT_ICON_SORTING_CLASS).css({
						'border-bottom-color': that._sortingIconColor
					});
				} else if (sortOrder === 'desc') {
					$descIcon.addClass(SORT_ICON_SORTING_CLASS).css({
						'border-top-color': that._sortingIconColor
					});
				}

				$target.append($sortIcons);
				$sortIcons.append($ascIcon);
				$sortIcons.append($('<div style="height: 2px;"></div>'));
				$sortIcons.append($descIcon);
			});
		},

		// --- Life Cycle Method --- //

		// --- Event Handler --- //

		'{rootElement} renderGrid': function() {
			this._appendSortIcon();
		},

		// ソート
		'td[data-h5-dyn-grid-is-header-row="true"][data-h5-dyn-grid-is-sortable-column="true"] click': function(
				context, $el) {
			var key = $el.data('h5DynGridPropertyName');
			var currentOrder = $el.data('h5DynGridSortOrder');

			// TODO: イベントを投げる仕組みにする
			if (currentOrder == null) {
				this.parentController.sort(key, false);
			} else if (currentOrder === 'asc') {
				this.parentController.sort(key, true);
			} else {
				this.parentController.sort();
			}
		},


		// --- Public Method --- //

		setSortableIconColor: function(color) {
			this._sortableIconColor = color;
		},

		setSortingIconColor: function(color) {
			this._sortingIconColor = color;
		}
	};

	h5.core.expose(sortTableController);

})(jQuery);


// ---- MoveColumnController ---- //

(function($) {
	'use strict';


	var TRACKING_COLUMN_CLASS = 'tracking-column';
	var INSERT_ICON_CLASS = 'column-insert-icon';


	var moveColumnController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.MoveColumnController
		 */
		__name: 'h5.ui.components.datagrid.MoveColumnController',


		// --- Property --- //

		_isMoving: false,

		_gridHeader: null,

		_selectedColumnId: null,

		_columnsPosArray: null,

		_trackmoveColumnId: null,


		// --- Private Method --- //

		_updateColumnsPosArray: function() {
			var $td = this.$find('.grid-header-rows tr td');

			this._columnsPosArray = $td.map(function(i, elem) {
				var $elem = $(elem);
				return {
					left: $elem.offset().left,
					width: $elem.width(),
					id: $elem.data('h5DynGridColumnId')
				};
			}).get();
		},

		_getClosestColumnId: function(pageX) {
			var posArray = this._columnsPosArray;

			for (var i = 0, len = posArray.length; i < len; i++) {
				var pos = posArray[i];

				if (pageX < pos.left + pos.width / 2) {
					return pos.id;
				}
			}

			return posArray[posArray.length - 1].id + 1;
		},

		_findInsertIcon: function() {
			return $('.' + INSERT_ICON_CLASS);
		},

		_findColumnHeader: function(columnId) {
			var selector = '.grid-header[data-h5-dyn-grid-column-id=' + columnId + ']';
			return this.$find(selector);
		},

		_findCellFrame: function(columnId) {
			var selector = 'td[data-h5-dyn-grid-column-id=' + columnId + '] .grid-cell-frame';
			return this.$find(selector);
		},

		_moveColumn: function(targetColumnId) {
			this.trigger('h5gridMoveColumn', {
				from: this._selectedColumnId,
				to: targetColumnId
			});
		},


		// --- Life Cycle Method --- //

		__init: function() {
			if (this._findInsertIcon().length !== 0) {
				return;
			}

			var $insertIcon = $('<div></div>');
			$insertIcon.addClass(INSERT_ICON_CLASS).css({
				display: 'none',
				height: 0,
				width: 0,
				'margin-left': '1px',
				'border-style': 'solid',
				'border-top-width': '6px',
				'border-left-width': '6px',
				'border-left-color': 'transparent',
				'border-right-width': '6px',
				'border-right-color': 'transparent',
				'border-bottom-style': 'hidden'
			});

			$insertIcon.appendTo(document.body);
		},

		// --- Event Handler --- //

		'.grid-header h5trackstart': function(context, $el) {
			if ($el.closest('.grid-header-top-left-cells').length !== 0) {
				return;
			}
			this._selectedColumnId = $el.data('h5DynGridColumnId');
			this._trackmoveColumnId = null;
			this._updateColumnsPosArray();
		},

		'.grid-header h5trackmove': function(context) {
			this._isMoving = true;
			this._findCellFrame(this._selectedColumnId).addClass(TRACKING_COLUMN_CLASS);

			var targetColumnId = this._getClosestColumnId(context.event.pageX);

			if (this._trackmoveColumnId !== null && targetColumnId === this._trackmoveColumnId) {
				return;
			}

			this._trackmoveColumnId = targetColumnId;

			var $el = this._findColumnHeader(targetColumnId);
			var offset = $el.offset();

			if ($el.length === 0) {
				// 最後列にカラムを移動させるケース
				$el = this._findColumnHeader(targetColumnId - 1);

				offset = $el.offset();
				offset.left += $el.width();
			}

			this._findInsertIcon().offset({
				left: offset.left - 6,
				top: offset.top - 6
			}).show();
		},

		'.grid-header h5trackend': function(context) {
			this._findInsertIcon().offset({
				left: 0,
				top: 0
			}).hide();

			this._findCellFrame(this._selectedColumnId).removeClass(TRACKING_COLUMN_CLASS);

			if (this._selectedColumnId === null) {
				return;
			}

			if (!this._isMoving) {
				return;
			}
			this._isMoving = false;

			var columnId = this._getClosestColumnId(context.event.pageX);
			this._moveColumn(columnId);
		},

		'{rootElement} renderGrid': function() {
			this._findInsertIcon().hide();
			this._findCellFrame(this._selectedColumnId).removeClass(TRACKING_COLUMN_CLASS);
			this._isMoving = false;
			this._trackmoveColumnId = null;
		}
	};

	h5.core.expose(moveColumnController);

})(jQuery);


// ---- 初期化に関する共通の値や関数 ---- //

(function($) {
	'use strict';

	var wrapScrollFormatter = function(formatterFunction) {
		return function(cellData) {
			var scrollBarWidth = h5.ui.components.virtualScroll.getScrollBarWidth();
			var requireScrollInner = h5.ui.components.virtualScroll.isRequireOverflowScrollInner();

			var scrollHeight = cellData.height + scrollBarWidth;
			var scrollWidth = cellData.width + scrollBarWidth;

			var html = '<div style="';
			if (!requireScrollInner) {
				html += ' overflow: scroll;';
			}
			html += ' width: ' + scrollWidth + 'px;';
			html += ' height: ' + scrollHeight + 'px;';
			html += '">';
			html += '<div class="grid-cell" style="';
			if (requireScrollInner) {
				html += ' overflow: scroll;';
			}
			html += '">';
			html += formatterFunction(cellData);
			html += '</div>';
			html += '</div>';

			return html;
		};
	};

	var DEFAULT_FORMATTER = function(cellData) {
		if (cellData.value == null) {
			return '';
		}
		return h5.u.str.escapeHtml(cellData.value);
	};

	var COMMON_DEFAULT_INIT_PARAMS = {
		defaultFormatter: DEFAULT_FORMATTER,
		verticalScrollStrategy: 'pixel',
		horizontalScrollStrategy: 'pixel',
		defaultColumnWidth: 100
	};

	var validateCommonInitParams = function(params) {
		var msgHeader = '初期パラメータが不正です: ';
		var msg;

		// -- 必須パラメータ -- //

		// idKey のチェック
		if (params.idKey == null) {
			this.throwError(msgHeader + 'idKey は必ず指定してください');
		}
		if (typeof params.idKey !== 'string') {
			msg = 'idKey は string 型である必要があります; idKey = {0}';
			this.throwError(msgHeader + msg, params.idKey);
		}

		// columns のチェック
		//		if (params.columns == null) {
		//			this.throwError(msgHeader + 'columns は必ず指定してください');
		//		}
		//		if (!$.isArray(params.columns)) {
		//			msg = 'columns は Array 型である必要があります; columns = {0}';
		//			this.throwError(msgHeader + msg, params.columns);
		//		}
		//
		//
		//		var columnPropertyNames = {};
		//
		//		for (var i = 0, len = params.columns.length; i < len; i++) {
		//			var column = params.columns[i];
		//			if (typeof column !== 'object') {
		//				msg = 'columns の要素は object 型である必要があります; columns[{0}] = {1}';
		//				this.throwError(msgHeader + msg, i, column);
		//			}
		//
		//			// columns[i].propertyName のチェック
		//			if (column.propertyName == null) {
		//				msg = 'columns の要素は propertyName を持つ必要があります; columns[{0}] = {1}';
		//				this.throwError(msgHeader + msg, i, column);
		//			}
		//			if (typeof column.propertyName !== 'string') {
		//				msg = 'columns の要素の propertyName は string 型である必要があります; columns[{0}].propertyName = {1}';
		//				this.throwError(msgHeader + msg, i, column.propertyName);
		//			}
		//
		//			if (columnPropertyNames[column.propertyName]) {
		//				msg = 'columns の要素の propertyName はそれぞれ一意である必要があります; 重複のある propertyName = {0}';
		//				this.throwError(msgHeader + msg, column.propertyName);
		//			}
		//			columnPropertyNames[column.propertyName] = true;
		//
		//			// columns[i].formatter のチェック
		//			if (column.formatter != null && !$.isFunction(column.formatter)) {
		//				msg = 'columns の要素の formatter は function 型である必要があります; columns[{0}].formatter = {1}';
		//				this.throwError(msgHeader + msg, i, column.formatter);
		//			}
		//		}


		// -- 共通なオプショナルなパラメータ -- //

		// defaultFormatter のチェック
		if (!$.isFunction(params.defaultFormatter)) {
			msg = 'defaultFormatter は function 型である必要があります; defaultFormatter = {0}';
			this.throwError(msgHeader + msg, params.defaultFormatter);
		}


		// verticalScrollStrategy のチェック
		var verticalScrollStrategy = params.verticalScrollStrategy;
		if (verticalScrollStrategy !== 'pixel' && verticalScrollStrategy !== 'index') {
			msg = 'verticalScrollStrategy は \'pixel\' または \'index\' である必要があります; verticalScrollStrategy = {0}';
			this.throwError(msgHeader + msg, verticalScrollStrategy);
		}

		// horizontalScrollStrategy のチェック
		var horizontalScrollStrategy = params.horizontalScrollStrategy;
		if (horizontalScrollStrategy !== 'pixel' && horizontalScrollStrategy !== 'index') {
			msg = 'horizontalScrollStrategy は \'pixel\' または \'index\' である必要があります; horizontalScrollStrategy = {0}';
			this.throwError(msgHeader + msg, horizontalScrollStrategy);
		}

		// defaultColumnWidth のチェック
		var defaultColumnWidth = params.defaultColumnWidth;
		if (typeof defaultColumnWidth !== 'number') {
			msg = 'defaultColumnWidth は number 型である必要があります; defaultColumnWidth = {0}';
			this.throwError(msgHeader + msg, defaultColumnWidth);
		}
		if (defaultColumnWidth !== Math.floor(defaultColumnWidth)) {
			msg = 'defaultColumnWidth は整数である必要があります; defaultColumnWidth = {0}';
			this.throwError(msgHeader + msg, defaultColumnWidth);
		}
		if (defaultColumnWidth <= 0) {
			msg = 'defaultColumnWidth は正の数である必要があります; defaultColumnWidth = {0}';
			this.throwError(msgHeader + msg, defaultColumnWidth);
		}

		// -- 元データに関するパラメータ -- //

		// url, data のチェック
		if (params.url == null && params.data == null) {
			this.throwError(msgHeader + 'url と data のどちらかは必ず指定してください');
		}
		if (params.url != null && params.data != null) {
			this.throwError(msgHeader + 'url と data は同時に指定できません');
		}

		if (params.url != null && typeof params.url !== 'string') {
			msg = 'url は string 型である必要があります; url = {0}';
			this.throwError(msgHeader + msg, params.url);
		}
		if (params.data != null && !$.isArray(params.data)) {
			msg = 'data は Array 型である必要があります; data = {0}';
			this.throwError(msgHeader + msg, params.data);
		}

		// ajaxSettings のチェック
		if (params.url == null && params.ajaxSettings != null) {
			msg = 'ajaxSetting は url と合わせて設定する必要があります';
			this.throwError(msgHeader + msg);
		}
		if (params.ajaxSettings != null && typeof params.ajaxSettings !== 'object') {
			msg = 'ajaxSettings は object 型である必要があります; ajaxSettings = {0}';
			this.throwError(msgHeader + msg, params.ajaxSettings);
		}

		// requestData のチェック
		if (params.url == null && params.requestData != null) {
			msg = 'requestData は url と合わせて設定する必要があります';
			this.throwError(msgHeader + msg);
		}
	};


	h5.u.obj.expose('h5.ui.components.datagrid.init', {
		COMMON_DEFAULT_INIT_PARAMS: COMMON_DEFAULT_INIT_PARAMS,
		wrapScrollFormatter: wrapScrollFormatter,
		validateCommonInitParams: validateCommonInitParams
	});

})(jQuery);


// ---- ComplexHeaderGridController ---- //

(function($) {
	'use strict';

	var COMMON_DEFAULT_INIT_PARAMS = h5.ui.components.datagrid.init.COMMON_DEFAULT_INIT_PARAMS;

	var COMPLEX_HEADER_DEFAULT_INIT_PARAMS = {
		rowSelector: 'tr:gt(0)',
		columnSelector: 'tr:eq(0) > td'
	};


	var complexHeaderGridController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.ComplexHeaderGridController
		 */
		__name: 'h5.ui.components.datagrid.ComplexHeaderGridController',


		// --- Property --- //

		_params: null,

		_dataSource: null,

		_converter: null,

		_htmlHeaders: null,

		_gridLayoutController: h5.ui.components.datagrid.GridLayoutController,


		// --- Private Method --- //

		_makeGridParams: function(params) {
			return $.extend(true, {}, COMPLEX_HEADER_DEFAULT_INIT_PARAMS,
					COMMON_DEFAULT_INIT_PARAMS, params, this._htmlHeaders);
		},


		_validateInitParams: function(params) {

			// 共通のチェック
			h5.ui.components.datagrid.init.validateCommonInitParams(params);

			var msgHeader = '初期パラメータが不正です: ';
			var msg;


			// ヘッダ関連
			if (params.headerRowsHtml == null) {
				msg = 'headerRowsHtml は必ず指定してください（HTML上で指定する場合は class="grid-header-rows" の div 要素を直下に置く）';
				this.throwError(msgHeader + msg);
			}
			if (params.headerColumnsHtml == null) {
				msg = 'headerColumnsHtml は必ず指定してください（HTML上で指定する場合は class="grid-header-columns" の div 要素を直下に置く）';
				this.throwError(msgHeader + msg);
			}
			if (params.headerTopLeftCellsHtml == null) {
				msg = 'headerTopLeftCellsHtml は必ず指定してください（HTML上で指定する場合は class="grid-header-top-left-cells" の div 要素を直下に置く）';
				this.throwError(msgHeader + msg);
			}

			// セレクタに関連
			if (typeof params.rowSelector !== 'string') {
				msg = 'rowSelector は string 型である必要があります; rowSelector = {0}';
				this.throwError(msgHeader + msg, params.rowSelector);
			}
			if (typeof params.columnSelector !== 'string') {
				msg = 'columnSelector は string 型である必要があります; columnSelector = {0}';
				this.throwError(msgHeader + msg, params.columnSelector);
			}
		},

		_initializeChildControllers: function() {
			var params = this._params;

			if (params.url != null) {
				// TODO: ajaxSetting, postData
				this._dataSource = h5.ui.components.virtualScroll.data
						.createLazyLoadDataSource(params.url);
			} else {
				this._dataSource = h5.ui.components.virtualScroll.data
						.createLocalDataSource(params.data);
			}

			var idKey = params.idKey;
			var rowHeight = 20;
			var defaultColumnWidth = params.defaultColumnWidth;

			var selector = h5.ui.components.datagrid.createMultiSelector();

			var columns = [];
			var formatters = {};
			var options = {};
			for (var i = 0, len = params.columns.length; i < len; i++) {
				var column = params.columns[i];
				columns.push(column.propertyName);

				if (column.formatter != null) {
					var formatter = h5.ui.components.datagrid.init
							.wrapScrollFormatter(column.formatter);
					formatters[column.propertyName] = formatter;
				}

				var option = {};

				var markable = !!column.markable;
				if (column.markable == null) {
					markable = true;
				}
				option.markable = markable;

				options[column.propertyName] = option;
			}

			this._converter = h5.ui.components.datagrid.createGridDataConverter({
				dataSource: this._dataSource,
				idKey: idKey,
				columns: columns,
				defaultRowHeight: rowHeight,
				defaultColumnWidth: defaultColumnWidth,
				selector: selector,
				columnsOption: null
			});

			var defaultFormatter = h5.ui.components.datagrid.init
					.wrapScrollFormatter(params.defaultFormatter);

			var vStrategy;
			if (params.verticalScrollStrategy === 'pixel') {
				vStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				vStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			var hStrategy;
			if (params.horizontalScrollStrategy === 'pixel') {
				hStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				hStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}


			var $headerRows = $('<div><div>');
			$headerRows.addClass('grid-header-rows').html(params.headerRowsHtml);
			$headerRows.appendTo(this.rootElement);
			var headerHeight = $headerRows.children().outerHeight();
			$headerRows.remove();

			var $headerColumns = $('<div></div>');
			$headerColumns.addClass('grid-header-columns').html(params.headerColumnsHtml);
			$headerColumns.appendTo(this.rootElement);
			var headerWidth = $headerColumns.children().outerWidth();
			$headerColumns.remove();


			var that = this;

			return this.readyPromise.then(function() {
				return that._gridLayoutController.readyPromise;
			}).then(function() {
				var promise = that._gridLayoutController.init({
					defaultFormatter: defaultFormatter,
					formatters: formatters,
					converter: that._converter,
					verticalScrollStrategy: vStrategy,
					horizontalScrollStrategy: hStrategy,
					headerRows: params.headerRowsHtml,
					headerColumns: params.headerColumnsHtml,
					headerTopLeftCellsHtml: params.headerTopLeftCellsHtml,
					rowSelector: params.rowSelector,
					columnSelector: params.columnSelector,
					headerHeight: headerHeight,
					headerWidth: headerWidth
				});

				that._dataSource.changeSearchOptions({});

				return promise;
			});
		},


		// --- Life Cycle Method --- //

		__init: function() {
			this._htmlHeaders = {};

			var $headerRows = $(this.rootElement).children('div.grid-header-rows');
			var $headerColumns = $(this.rootElement).children('div.grid-header-columns');
			var $headerTopLeftCells = $(this.rootElement)
					.children('div.grid-header-top-left-cells');

			if ($headerRows.length !== 0) {
				if ($headerRows.length !== 1) {
					this.throwError('div.grid-header-rows 要素が2個以上あります');
				}
				this._htmlHeaders.headerRowsHtml = $headerRows.html();
				$headerRows.remove();
			}

			if ($headerColumns.length !== 0) {
				if ($headerColumns.length !== 1) {
					this.throwError('div.grid-header-columns 要素が2個以上あります');
				}
				this._htmlHeaders.headerColumnsHtml = $headerColumns.html();
				$headerColumns.remove();
			}

			if ($headerTopLeftCells.length !== 0) {
				if ($headerTopLeftCells.length !== 1) {
					this.throwError('div.grid-header-top-left-cells 要素が2個以上あります');
				}
				this._htmlHeaders.headerTopLeftCellsHtml = $headerTopLeftCells.html();
				$headerTopLeftCells.remove();
			}
		},

		__ready: function() {
			return this._gridLayoutController.readyPromise;
		},


		__dispose: function() {
			$(this.rootElement).remove();
		},


		// --- Public Method --- //

		/**
		 * ComplexHeaderGridController を初期化する。
		 * <p>
		 * 初期化パラメータの詳細は以下の通り
		 * </p>
		 * <dl>
		 * <dt><strong>必須なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{string} idKey: 各データの dataId が格納されているプロパティ名</li>
		 * <li>{Array.&lt;{propertyName: string, formatter: function(object): string}&gt;} columns:
		 * 各列の情報を並べたオブジェクト</li>
		 * <li>{Array.&lt;object&gt;} data: データの配列
		 * </ul>
		 * </dd>
		 * <dt><strong>省略可能なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{undefined|function(object): string} [defaultFormatter]: デフォルトのフォーマッタ関数</li>
		 * <li>{string=} [verticalScrollStrategy='pixel']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{number=} [defaultColumnWidth=100]: デフォルトの列幅
		 * <li>{string=} [headerRowsHtml] ヘッダ行（右上）を表現する HTML 文字列</li>
		 * <li>{string=} [headerColumnsHtml]: ヘッダ列（左下）を表現する HTML 文字列</li>
		 * <li>{string=} [headerTopLeftCellsHtml]: ヘッダの左上部分を表現する HTML 文字列</li>
		 * <li>{string=} [rowSelector='tr:gt(0)']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [columnSelector='tr:eq(0) > td']: 横のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * </ul>
		 * </dd>
		 * </dl>
		 * 
		 * @param {object} initParams 初期化パラメータ
		 * @return {Promise} 初期化完了を表す Promise オブジェクト
		 */
		init: function(initParams) {
			var that = this;

			return this.initPromise.then(function() {

				// デフォルト値のセット + HTML の解釈
				var params = that._makeGridParams(initParams);

				// パラメータチェック
				that._validateInitParams(params);

				// パラメータのセット
				that._params = params;

				// 子コントローラの初期化
				return that._initializeChildControllers();
			});
		}

	};

	h5.core.expose(complexHeaderGridController);

})(jQuery);


// ---- PagingGridController ---- //

(function($) {
	'use strict';

	var COMMON_DEFAULT_INIT_PARAMS = h5.ui.components.datagrid.init.COMMON_DEFAULT_INIT_PARAMS;

	var pagingGridController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.PagingGridController
		 */
		__name: 'h5.ui.components.datagrid.PagingGridController',


		// --- Property --- //

		_params: null,

		_sortable: null,

		_dataSource: null,

		_pagingSource: null,

		_converter: null,

		_gridLayoutController: h5.ui.components.datagrid.GridLayoutController,

		_resizeColumnWidthTableController: h5.ui.components.datagrid.ResizeColumnWidthTableController,

		_sortTableController: h5.ui.components.datagrid.SortTableController,

		_moveColumnController: h5.ui.components.datagrid.MoveColumnController,


		// --- Private Method --- //

		_makeGridParams: function(params) {
			return $.extend(true, {}, COMMON_DEFAULT_INIT_PARAMS, {
				enableMultiRowSelect: true,
				headerColumns: 0,
				gridHeight: 'auto',
				gridWidth: 'auto',

				enableChangeColumnWidthUI: true,
				minColumnWidth: 20,
				maxColumnWidth: 500,

				enableSortUI: true,
				sortableIconColor: '#BBB',
				sortingIconColor: '#666',

				enableMoveColumnUI: true
			}, params);
		},


		_validateInitParams: function(params) {

			// 共通のチェック
			h5.ui.components.datagrid.init.validateCommonInitParams(params);

			var msgHeader = '初期パラメータが不正です: ';
			var msg;

			// columns の追加パラメータチェック
			for (var i = 0, len = params.columns.length; i < len; i++) {
				var column = params.columns[i];

				// columns[i].width のチェック
				if (column.width != null) {

					if (typeof column.width !== 'number') {
						msg = 'columns の要素の width は number 型である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
					if (column.width !== Math.floor(column.width)) {
						msg = 'columns の要素の width は整数である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
					if (column.width <= 0) {
						msg = 'columns の要素の width は正の数である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
				}

				if (column.sortable != null && typeof column.sortable !== 'boolean') {
					msg = 'columns の要素の sortable は boolean 型である必要があります; columns[{0}].sortable = {1}';
					this.throwError(msgHeader + msg, i, column.sortable);
				}
			}

			// pageSize
			if (params.pageSize == null) {
				msg = 'pageSize は必ず指定してください';
				this.throwError(msgHeader + msg);
			}
			if (typeof params.pageSize !== 'number') {
				msg = 'pageSize は number 型である必要があります; pageSize = {0}';
				this.throwError(msgHeader + msg, params.pageSize);
			}
			if (params.pageSize !== Math.floor(params.pageSize)) {
				msg = 'pageSize は整数である必要があります; pageSize = {0}';
				this.throwError(msgHeader + msg, params.pageSize);
			}
			if (params.pageSize <= 0) {
				msg = 'pageSize は正の数である必要があります; pageSize = {0}';
				this.throwError(msgHeader + msg, params.pageSize);
			}

			// rowHeight
			if (params.rowHeight == null) {
				msg = 'rowHeight は必ず指定してください';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (typeof params.rowHeight !== 'number') {
				msg = 'rowHeight は number 型である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (params.rowHeight !== Math.floor(params.rowHeight)) {
				msg = 'rowHeight は整数である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (params.rowHeight <= 0) {
				msg = 'rowHeight は正の数である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}

			// enableMultiSelect のチェック
			if (typeof params.enableMultiRowSelect !== 'boolean') {
				msg = 'enableMultiRowSelect は boolean 型である必要があります; enableMultiRowSelect = {0}';
				this.throwError(msgHeader + msg, params.enableMultiRowSelect);
			}

			// headerColumns のチェック
			if (typeof params.headerColumns !== 'number') {
				msg = 'headerColumns は number 型である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}
			if (params.headerColumns !== Math.floor(params.headerColumns)) {
				msg = 'headerColumns は整数である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}
			if (params.headerColumns < 0) {
				msg = 'headerColumns は非負の数である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}

			// gridHeight のチェック
			if (params.gridHeight !== 'auto') {
				if (typeof params.gridHeight !== 'number') {
					msg = 'gridHeight は \'auto\' または number 型である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
				if (params.gridHeight !== Math.floor(params.gridHeight)) {
					msg = 'gridHeight に number 型を指定する場合は整数である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
				if (params.gridHeight <= 0) {
					msg = 'gridHeight に number 型を指定する場合は正の数である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
			}

			// gridWidth のチェック
			if (params.gridWidth !== 'auto') {
				if (typeof params.gridWidth !== 'number') {
					msg = 'gridWidth は \'auto\' または number 型である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
				if (params.gridWidth !== Math.floor(params.gridWidth)) {
					msg = 'gridWidth に number 型を指定する場合は整数である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
				if (params.gridWidth <= 0) {
					msg = 'gridWidth に number 型を指定する場合は正の数である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
			}

			// enableChangeColumnWidthUI
			if (typeof params.enableChangeColumnWidthUI !== 'boolean') {
				msg = 'enableChangeColumnWidthUI は boolean 型である必要があります; enableChangeColumnWidthUI = {0}';
				this.throwError(msgHeader + msg, params.enableChangeColumnWidthUI);
			}

			// minColumnWidth
			if (typeof params.minColumnWidth !== 'number') {
				msg = 'minColumnWidth は number 型である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}
			if (params.minColumnWidth !== Math.floor(params.minColumnWidth)) {
				msg = 'minColumnWidth は整数である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}
			if (params.minColumnWidth < 5) {
				msg = 'minColumnWidth は 5 より大きい数値である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}

			// maxColumnWidth
			if (typeof params.maxColumnWidth !== 'number') {
				msg = 'maxColumnWidth は number 型である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}
			if (params.maxColumnWidth !== Math.floor(params.maxColumnWidth)) {
				msg = 'maxColumnWidth は整数である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}
			if (params.maxColumnWidth <= params.minColumnWidth) {
				msg = 'maxColumnWidth は minColumnWidth より大きい値である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}

			// enableSortUI
			if (typeof params.enableSortUI !== 'boolean') {
				msg = 'enableSortUI は boolean 型である必要があります; enableSortUI = {0}';
				this.throwError(msgHeader + msg, params.enableSortUI);
			}

			// sortableIconColor
			if (typeof params.sortableIconColor !== 'string') {
				msg = 'sortableIconColor は string 型である必要があります; sortableIconColor = {0}';
				this.throwError(msgHeader + msg, params.sortableIconColor);
			}

			// sortingIconColor
			if (typeof params.sortingIconColor !== 'string') {
				msg = 'sortingIconColor は string 型である必要があります; sortingIconColor = {0}';
				this.throwError(msgHeader + msg, params.sortingIconColor);
			}
		},

		_initializeChildControllers: function() {
			var params = this._params;

			if (params.url != null) {
				this._dataSource = h5.ui.components.virtualScroll.data.createLazyLoadDataSource(
						params.url, params.ajaxSettings, params.requestData);
			} else {
				this._dataSource = h5.ui.components.virtualScroll.data
						.createLocalDataSource(params.data);
			}


			var idKey = params.idKey;
			var rowHeight = params.rowHeight;
			var defaultColumnWidth = params.defaultColumnWidth;

			var selector;
			if (params.enableMultiRowSelect) {
				selector = h5.ui.components.datagrid.createMultiSelector();
			} else {
				selector = h5.ui.components.datagrid.createSingleSelector();
			}

			this._pagingSource = h5.ui.components.datagrid.createPagingAdapter(this._dataSource,
					params.pageSize);

			var headerRows = 1;
			var headerColumns = params.headerColumns;
			var headerTopLeftCellsHtml = null;
			var headerHeight = params.rowHeight + 1;
			var headerWidth = 1;

			var gridHeight = params.rowHeight * (params.pageSize + 1) + 1;
			var gridWidth = 1;

			var scrollBarWidth = h5.ui.components.virtualScroll.getScrollBarWidth();
			gridHeight += scrollBarWidth;
			gridWidth += scrollBarWidth;

			var columns = [];
			var formatters = {};
			var columnsOption = {};

			this._sortable = {};

			for (var i = 0, len = params.columns.length; i < len; i++) {
				var column = params.columns[i];
				columns.push(column.propertyName);

				if (column.formatter != null) {
					var formatter = h5.ui.components.datagrid.init
							.wrapScrollFormatter(column.formatter);
					formatters[column.propertyName] = formatter;
				}
				var option = {};

				if (column.width != null) {
					option.width = column.width;
				}

				if (column.header != null) {
					option.header = column.header;
				}

				var sortable = !!column.sortable;
				this._sortable[column.propertyName] = sortable;
				option.sortable = sortable;

				var markable = !!column.markable;
				if (column.markable == null) {
					markable = true;
				}
				option.markable = markable;

				columnsOption[column.propertyName] = option;

				// width 計算
				var width = (column.width != null) ? column.width : params.defaultColumnWidth;

				gridWidth += width;
				if (i < headerColumns) {
					headerWidth += width;
				}
			}

			if (params.gridHeight !== 'auto') {
				gridHeight = params.gridHeight + scrollBarWidth;
			}
			if (params.gridWidth !== 'auto') {
				gridWidth = params.gridWidth + scrollBarWidth;
			}

			this._converter = h5.ui.components.datagrid.createGridDataConverter({
				dataSource: this._pagingSource,
				idKey: idKey,
				columns: columns,
				defaultRowHeight: rowHeight,
				defaultColumnWidth: defaultColumnWidth,
				selector: selector,
				columnsOption: columnsOption
			});

			var defaultFormatter = h5.ui.components.datagrid.init
					.wrapScrollFormatter(params.defaultFormatter);

			var vStrategy;
			if (params.verticalScrollStrategy === 'pixel') {
				vStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				vStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			var hStrategy;
			if (params.horizontalScrollStrategy === 'pixel') {
				hStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				hStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			if (!params.enableChangeColumnWidthUI) {
				this._resizeColumnWidthTableController.disableListeners();
			}
			this._resizeColumnWidthTableController.setMinWidth(params.minColumnWidth);
			this._resizeColumnWidthTableController.setMaxWidth(params.maxColumnWidth);

			if (!params.enableSortUI) {
				this._sortTableController.disableListeners();
			}

			this._sortTableController.setSortableIconColor(params.sortableIconColor);
			this._sortTableController.setSortingIconColor(params.sortingIconColor);

			if (!params.enableMoveColumnUI) {
				this._moveColumnController.disableListeners();
			}

			var that = this;

			return this.readyPromise.then(function() {
				return that._gridLayoutController.readyPromise;
			}).then(function() {

				var $root = $(that.rootElement);
				$root.css('height', gridHeight);
				$root.css('width', gridWidth);

				var promise = that._gridLayoutController.init({
					defaultFormatter: defaultFormatter,
					formatters: formatters,
					converter: that._converter,
					verticalScrollStrategy: vStrategy,
					horizontalScrollStrategy: hStrategy,
					headerRows: headerRows,
					headerColumns: headerColumns,
					headerTopLeftCellsHtml: headerTopLeftCellsHtml,
					headerHeight: headerHeight,
					headerWidth: headerWidth
				});

				that._pagingSource.changeSearchOptions({});

				return promise;
			});
		},


		// --- Life Cycle Method --- //

		__ready: function() {
			return this._gridLayoutController.readyPromise;
		},


		__dispose: function() {
			$(this.rootElement).remove();
		},


		// --- Event Handler --- //

		'{rootElement} changeColumnWidth': function(context) {
			var evArg = context.evArg;
			this.setColumnWidth(evArg.widthKey, evArg.width);
		},


		// --- Public Method --- //

		/**
		 * ComplexHeaderGridController を初期化する。
		 * <p>
		 * 初期化パラメータの詳細は以下の通り
		 * </p>
		 * <dl>
		 * <dt><strong>必須なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{string} idKey: 各データの dataId が格納されているプロパティ名</li>
		 * <li>{Array.&lt;{propertyName: string, formatter: function(object): string, width:
		 * number=, header: *, sortable: boolean}&gt;} columns: 各列の情報を並べたオブジェクト</li>
		 * </ul>
		 * <li>{number} pageSize: 1ページ内に表示するデータ数</li>
		 * <li>{number} rowHeight: 各行の高さ</li>
		 * </dd>
		 * <dt><strong>元データ指定用パラメータ（data と url のどちらか一方を必ず指定する）</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{Array&lt;object&gt;=} [data]: データの配列</li>
		 * <li>{string=} [url]: データ取得先のサーバのURL</li>
		 * <li>{object=} [ajaxSettings]: データ取得の際の ajax 通信の設定（$.ajax に渡すオブジェクト）</li>
		 * <li>{object=} [requestData]: データ取得の際にリクエストに付けるデータ</li>
		 * </ul>
		 * </dd>
		 * <dt><strong>省略可能なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{undefined|function(object): string} [defaultFormatter]: デフォルトのフォーマッタ関数</li>
		 * <li>{boolean=} [enableMultiSelect=true]: 複数行を選択可能とするか否か</li>
		 * <li>{string=} [verticalScrollStrategy='pixel']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{number=} [defaultColumnWidth=100]: デフォルトの列幅
		 * <li>{string=} [headerRowsHtml] ヘッダ行（右上）を表現する HTML 文字列</li>
		 * <li>{string=} [headerColumnsHtml]: ヘッダ列（左下）を表現する HTML 文字列</li>
		 * <li>{string=} [headerTopLeftCellsHtml]: ヘッダの左上部分を表現する HTML 文字列</li>
		 * <li>{string=} [rowSelector='tr:gt(0)']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [columnSelector='tr:eq(0) > td']: 横のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{number=} [headerColumns=0]: 固定する列数</li>
		 * <li>{undefined|number|string} [gridHeight='auto']: グリッド全体の高さ</li>
		 * <li>{undefined|number|string} [gridWidth='auto']: グリッド全体の幅</li>
		 * <li>{boolean=} [enableChangeColumnWidthUI=true]: 列幅変更のためのUIを有効にするか</li>
		 * <li>{number=} [minColumnWidth=20]: UI で操作する際の最小の列幅</li>
		 * <li>{number=} [maxColumnWidth=500]: UI で操作する際の最大の列幅</li>
		 * <li>{boolean=} [enableSortUI=true]: ソートのためのUIを有効にするか</li>
		 * <li>{string=} [sortableIconColor='#BBB']: ソート可能なことを表現する矢印アイコンの色</li>
		 * <li>{string=} [sortingIconColor='#666']: 現在ソート中であることを表現する矢印アイコンの色</li>
		 * </ul>
		 * </dd>
		 * </dl>
		 * 
		 * @param {object} initParams 初期化パラメータ
		 * @return {Promise} 初期化完了を表す Promise オブジェクト
		 */
		init: function(initParams) {
			var that = this;

			return this.initPromise.then(function() {

				// デフォルト値のセット + HTML の解釈
				var params = that._makeGridParams(initParams);

				// パラメータチェック
				that._validateInitParams(params);

				// パラメータのセット
				that._params = params;

				// 子コントローラの初期化
				return that._initializeChildControllers();
			});
		},

		/**
		 * 行を選択します。
		 * 
		 * @param {*} dataId 選択したい行の dataId
		 */
		selectData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			this._converter.selectData(dataId);
		},

		/**
		 * 全ての行を選択します。
		 */
		selectAllData: function() {
			var length = this._dataSource.getTotalLength();
			var allData = this._dataSource.sliceCachedData(0, length);

			this._converter.selectMultiData(allData);
		},

		/**
		 * 行の選択を解除します。
		 * 
		 * @param {*} dataId 選択を解除したい行の dataId
		 */
		unselectData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			this._converter.unselectData(dataId);
		},

		/**
		 * 全ての行の選択を解除します。
		 */
		unselectAllData: function() {
			this._converter.unselectAllData();
		},

		/**
		 * 行の選択状態を取得します。
		 * 
		 * @return {boolean} 選択されていれば true、そうでなければ false
		 */
		isSelectedData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			return this._converter.isSelectedData(dataId);
		},

		/**
		 * 選択されているすべての行の dataId を取得します。
		 * 
		 * @return {Array.<*>} 選択されているすべての行の dataId の配列
		 */
		getSelectedDataIds: function() {
			return this._converter.getSelectedDataIds();
		},

		/**
		 * ページを移動します。
		 * 
		 * @param {number} pageNumber 移動先のページ番号
		 */
		movePage: function(pageNumber) {
			var msg;

			if (pageNumber == null) {
				this.throwError('pageNumber を指定してください');
			}
			if (typeof pageNumber !== 'number') {
				msg = 'pageNumber には number 型を指定してください; pageNumber = {0}';
				this.throwError(msg, pageNumber);
			}
			if (pageNumber !== Math.floor(pageNumber)) {
				msg = 'pageNumber には整数を指定してください; pageNumber = {0}';
				this.throwError(msg, pageNumber);
			}
			if (pageNumber <= 0) {
				msg = 'pageNumber には正の値を指定してください; pageNumber = {0}';
				this.throwError(msg, pageNumber);
			}

			this._gridLayoutController.beginLoad();
			this._converter.markRange(0, 0, 0, 0);
			this._pagingSource.movePage(pageNumber);
		},

		/**
		 * 現在のページ番号を取得します。
		 * 
		 * @return {number} 現在のページ番号
		 */
		getCurrentPage: function() {
			return this._pagingSource.getCurrentPage();
		},

		getTotalPages: function() {
			return this._pagingSource.getTotalPages();
		},

		/**
		 * ソートします。
		 * 
		 * @param {string=} propertyName ソートするプロパティ名（指定しなかった場合はソートの解除）
		 * @param {boolean=} [isDesc=false] ソート順が降順であるか否か（降順の場合 true、デフォルトは false）
		 */
		sort: function(propertyName, isDesc) {
			var msg;

			if (propertyName == null) {

				this._gridLayoutController.beginLoad();
				this._dataSource.changeSearchOptions({});

			} else {
				if (typeof propertyName !== 'string') {
					msg = 'propertyname は string 型を指定してください; propertyName = {0}';
					this.throwError(msg, propertyName);
				}

				if (isDesc != null && typeof isDesc !== 'boolean') {
					msg = 'isDesc は boolean 型を指定してください; isDesc = {0}';
					this.throwError(msg, isDesc);
				}

				if (!this._sortable[propertyName]) {
					msg = 'sortable でない列はソートできません; propertyName = {0}';
					this.throwError(msg, propertyName);
				}


				this._gridLayoutController.beginLoad();

				var order = isDesc ? 'desc' : 'asc';
				this._dataSource.changeSearchOptions({
					sort: [{
						property: propertyName,
						order: order
					}]
				});
			}
		},

		/**
		 * リクエストデータを変更します。
		 * 
		 * @param {object} requestData リクエストデータ
		 */
		changeRequestData: function(requestData) {
			if (this._params.url == null) {
				var msg = '初期化パラメータに url を設定していない場合はこのメソッドは利用できません';
				this.throwError(msg);
			}

			this._dataSource.setCustomRequestData(requestData);
		},

		/**
		 * 列の幅を変更します。
		 * 
		 * @param {string} widthKey 変更したい列の widthKey
		 * @param {number} width 列幅
		 */
		setColumnWidth: function(widthKey, width) {
			this._converter.setWidth(widthKey, width);
		},

		/**
		 * rowId からデータオブジェクトを取得します。 キャッシュされていない rowId を指定すると例外を投げます。
		 * 
		 * @param {number} rowId 行ID
		 */
		getCachedData: function(rowId) {
			var msg;

			if (rowId == null) {
				this.throwError('rowId を指定してください');
			}
			if (typeof rowId !== 'number') {
				msg = 'rowId には number 型を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			if (rowId !== Math.floor(rowId)) {
				msg = 'rowId には整数を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			if (rowId < 0) {
				msg = 'rowId には非負の値を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			return this._converter.getCachedOriginData(rowId);
		}
	};

	h5.core.expose(pagingGridController);

})(jQuery);


// ---- ScrollGridController ---- //

(function($) {
	'use strict';

	var COMMON_DEFAULT_INIT_PARAMS = h5.ui.components.datagrid.init.COMMON_DEFAULT_INIT_PARAMS;

	var scrollGridController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.ScrollGridController
		 */
		__name: 'h5.ui.components.datagrid.ScrollGridController',


		// --- Property --- //

		_params: null,

		_sortable: null,

		_dataSource: null,

		_converter: null,

		_gridLayoutController: h5.ui.components.datagrid.GridLayoutController,

		_resizeColumnWidthTableController: h5.ui.components.datagrid.ResizeColumnWidthTableController,

		_sortTableController: h5.ui.components.datagrid.SortTableController,

		_moveColumnController: h5.ui.components.datagrid.MoveColumnController,


		// --- Private Method --- //

		_makeGridParams: function(params) {
			return $.extend(true, {}, COMMON_DEFAULT_INIT_PARAMS, {
				enableMultiRowSelect: true,
				headerColumns: 0,
				gridWidth: 'auto',
				gridHeight: 'auto',

				enableChangeColumnWidthUI: true,
				minColumnWidth: 20,
				maxColumnWidth: 500,

				enableSortUI: true,
				sortableIconColor: '#BBB',
				sortingIconColor: '#666',

				enableMoveColumnUI: true
			}, params);
		},


		_validateInitParams: function(params) {

			// 共通のチェック
			h5.ui.components.datagrid.init.validateCommonInitParams(params);

			var msgHeader = '初期パラメータが不正です: ';
			var msg;

			// columns の追加パラメータチェック
			for (var i = 0, len = params.columns.length; i < len; i++) {
				var column = params.columns[i];

				// columns[i].width のチェック
				if (column.width != null) {

					if (typeof column.width !== 'number') {
						msg = 'columns の要素の width は number 型である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
					if (column.width !== Math.floor(column.width)) {
						msg = 'columns の要素の width は整数である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
					if (column.width <= 0) {
						msg = 'columns の要素の width は正の数である必要があります; columns[{0}].width = {1}';
						this.throwError(msgHeader + msg, i, column.width);
					}
				}

				if (column.sortable != null && typeof column.sortable !== 'boolean') {
					msg = 'columns の要素の sortable は boolean 型である必要があります; columns[{0}].sortable = {1}';
					this.throwError(msgHeader + msg, i, column.sortable);
				}
			}


			// rowHeight
			if (params.rowHeight == null) {
				msg = 'rowHeight は必ず指定してください';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (typeof params.rowHeight !== 'number') {
				msg = 'rowHeight は number 型である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (params.rowHeight !== Math.floor(params.rowHeight)) {
				msg = 'rowHeight は整数である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}
			if (params.rowHeight <= 0) {
				msg = 'rowHeight は正の数である必要があります; rowHeight = {0}';
				this.throwError(msgHeader + msg, params.rowHeight);
			}

			// enableMultiSelect のチェック
			if (typeof params.enableMultiRowSelect !== 'boolean') {
				msg = 'enableMultiRowSelect は boolean 型である必要があります; enableMultiRowSelect = {0}';
				this.throwError(msgHeader + msg, params.enableMultiRowSelect);
			}

			// headerColumns のチェック
			if (typeof params.headerColumns !== 'number') {
				msg = 'headerColumns は number 型である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}
			if (params.headerColumns !== Math.floor(params.headerColumns)) {
				msg = 'headerColumns は整数である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}
			if (params.headerColumns < 0) {
				msg = 'headerColumns は非負の数である必要があります; headerColumns = {0}';
				this.throwError(msgHeader + msg, params.headerColumns);
			}

			// gridHeight のチェック
			if (params.gridHeight !== 'auto' && params.gridHeight !== 'css') {
				if (typeof params.gridHeight !== 'number') {
					msg = 'gridHeight は  number 型である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
				if (params.gridHeight !== Math.floor(params.gridHeight)) {
					msg = 'gridHeight は整数である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
				if (params.gridHeight <= 0) {
					msg = 'gridHeight は正の数である必要があります; gridHeight = {0}';
					this.throwError(msgHeader + msg, params.gridHeight);
				}
			}

			// gridWidth のチェック
			if (params.gridWidth !== 'auto' && params.gridWidth !== 'css') {
				if (typeof params.gridWidth !== 'number') {
					msg = 'gridWidth は \'auto\' または number 型である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
				if (params.gridWidth !== Math.floor(params.gridWidth)) {
					msg = 'gridWidth に number 型を指定する場合は整数である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
				if (params.gridWidth <= 0) {
					msg = 'gridWidth に number 型を指定する場合は正の数である必要があります; gridWidth = {0}';
					this.throwError(msgHeader + msg, params.gridWidth);
				}
			}

			// enableChangeColumnWidthUI
			if (typeof params.enableChangeColumnWidthUI !== 'boolean') {
				msg = 'enableChangeColumnWidthUI は boolean 型である必要があります; enableChangeColumnWidthUI = {0}';
				this.throwError(msgHeader + msg, params.enableChangeColumnWidthUI);
			}

			// minColumnWidth
			if (typeof params.minColumnWidth !== 'number') {
				msg = 'minColumnWidth は number 型である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}
			if (params.minColumnWidth !== Math.floor(params.minColumnWidth)) {
				msg = 'minColumnWidth は整数である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}
			if (params.minColumnWidth < 5) {
				msg = 'minColumnWidth は 5 より大きい数値である必要があります; minColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.minColumnWidth);
			}

			// maxColumnWidth
			if (typeof params.maxColumnWidth !== 'number') {
				msg = 'maxColumnWidth は number 型である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}
			if (params.maxColumnWidth !== Math.floor(params.maxColumnWidth)) {
				msg = 'maxColumnWidth は整数である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}
			if (params.maxColumnWidth <= params.minColumnWidth) {
				msg = 'maxColumnWidth は minColumnWidth より大きい値である必要があります; maxColumnWidth = {0}';
				this.throwError(msgHeader + msg, params.maxColumnWidth);
			}

			// enableSortUI
			if (typeof params.enableSortUI !== 'boolean') {
				msg = 'enableSortUI は boolean 型である必要があります; enableSortUI = {0}';
				this.throwError(msgHeader + msg, params.enableSortUI);
			}

			// sortableIconColor
			if (typeof params.sortableIconColor !== 'string') {
				msg = 'sortableIconColor は string 型である必要があります; sortableIconColor = {0}';
				this.throwError(msgHeader + msg, params.sortableIconColor);
			}

			// sortingIconColor
			if (typeof params.sortingIconColor !== 'string') {
				msg = 'sortingIconColor は string 型である必要があります; sortingIconColor = {0}';
				this.throwError(msgHeader + msg, params.sortingIconColor);
			}

		},

		_initializeChildControllers: function() {

			var params = this._params;

			if (params.url != null) {
				this._dataSource = h5.ui.components.virtualScroll.data.createLazyLoadDataSource(
						params.url, params.ajaxSettings, params.requestData);
			} else {
				this._dataSource = h5.ui.components.virtualScroll.data
						.createLocalDataSource(params.data);
			}

			var idKey = params.idKey;
			var rowHeight = params.rowHeight;
			var defaultColumnWidth = params.defaultColumnWidth;

			var selector;
			if (params.enableMultiRowSelect) {
				selector = h5.ui.components.datagrid.createMultiSelector();
			} else {
				selector = h5.ui.components.datagrid.createSingleSelector();
			}

			var headerRows = 1;
			var headerColumns = params.headerColumns;
			var headerTopLeftCellsHtml = null;
			var headerHeight = params.rowHeight + 1;
			var headerWidth = 1;

			var scrollBarWidth = h5.ui.components.virtualScroll.getScrollBarWidth();
			var gridHeight = params.gridHeight + scrollBarWidth;

			var gridWidth = 1;

			gridWidth += scrollBarWidth;

			var columns = [];
			var formatters = {};
			var columnsOption = {};

			this._sortable = {};

			for (var i = 0, len = params.columns.length; i < len; i++) {
				var column = params.columns[i];
				columns.push(column.propertyName);

				if (column.formatter != null) {
					var formatter = h5.ui.components.datagrid.init
							.wrapScrollFormatter(column.formatter);
					formatters[column.propertyName] = formatter;
				}
				var option = {};

				if (column.width != null) {
					option.width = column.width;
				}

				if (column.header != null) {
					option.header = column.header;
				}

				var sortable = !!column.sortable;
				this._sortable[column.propertyName] = sortable;
				option.sortable = sortable;

				var markable = !!column.markable;
				if (column.markable == null) {
					markable = true;
				}
				option.markable = markable;

				columnsOption[column.propertyName] = option;

				// width 計算
				var width = (column.width != null) ? column.width : params.defaultColumnWidth;

				gridWidth += width;
				if (i < headerColumns) {
					headerWidth += width;
				}
			}

			if (params.gridWidth !== 'auto') {
				gridWidth = params.gridWidth + scrollBarWidth;
			}

			this._converter = h5.ui.components.datagrid.createGridDataConverter({
				dataSource: this._dataSource,
				idKey: idKey,
				columns: columns,
				defaultRowHeight: rowHeight,
				defaultColumnWidth: defaultColumnWidth,
				selector: selector,
				columnsOption: columnsOption
			});

			var defaultFormatter = h5.ui.components.datagrid.init
					.wrapScrollFormatter(params.defaultFormatter);

			var vStrategy;
			if (params.verticalScrollStrategy === 'pixel') {
				vStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				vStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			var hStrategy;
			if (params.horizontalScrollStrategy === 'pixel') {
				hStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				hStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			if (!params.enableChangeColumnWidthUI) {
				this._resizeColumnWidthTableController.disableListeners();
			}
			this._resizeColumnWidthTableController.setMinWidth(params.minColumnWidth);
			this._resizeColumnWidthTableController.setMaxWidth(params.maxColumnWidth);

			if (!params.enableSortUI) {
				this._sortTableController.disableListeners();
			}

			this._sortTableController.setSortableIconColor(params.sortableIconColor);
			this._sortTableController.setSortingIconColor(params.sortingIconColor);

			if (!params.enableMoveColumnUI) {
				this._moveColumnController.disableListeners();
			}

			var that = this;

			return this.readyPromise.then(function() {
				return that._gridLayoutController.readyPromise;
			}).then(function() {

				var $root = $(that.rootElement);
				if (params.gridHeight !== 'css') {
					$root.css('height', gridHeight);
				}
				if (params.gridWidth !== 'css') {
					$root.css('width', gridWidth);
				}

				var promise = that._gridLayoutController.init({
					defaultFormatter: defaultFormatter,
					formatters: formatters,
					converter: that._converter,
					verticalScrollStrategy: vStrategy,
					horizontalScrollStrategy: hStrategy,
					headerRows: headerRows,
					headerColumns: headerColumns,
					headerTopLeftCellsHtml: headerTopLeftCellsHtml,
					headerHeight: headerHeight,
					headerWidth: headerWidth
				});

				that._dataSource.changeSearchOptions({});

				return promise;
			});
		},


		// --- Life Cycle Method --- //

		__ready: function() {
			return this._gridLayoutController.readyPromise;
		},


		__dispose: function() {
			$(this.rootElement).remove();
		},


		// --- Event Handler --- //

		'{rootElement} changeColumnWidth': function(context) {
			var evArg = context.evArg;
			this.setColumnWidth(evArg.widthKey, evArg.width);
		},


		// --- Public Method --- //

		/**
		 * ComplexHeaderGridController を初期化する。
		 * <p>
		 * 初期化パラメータの詳細は以下の通り
		 * </p>
		 * <dl>
		 * <dt><strong>必須なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{string} idKey: 各データの dataId が格納されているプロパティ名</li>
		 * <li>{Array.&lt;{propertyName: string, formatter: function(object): string, width:
		 * number=, header: *, sortable: boolean}&gt;} columns: 各列の情報を並べたオブジェクト</li>
		 * <li>{number} rowHeight: 各行の高さ</li>
		 * <li>{number} gridHeight: グリッド全体の高さ</li>
		 * </ul>
		 * </dd>
		 * <dt><strong>元データ指定用パラメータ（data と url のどちらか一方を必ず指定する）</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{Array&lt;object&gt;=} [data]: データの配列</li>
		 * <li>{string=} [url]: データ取得先のサーバのURL</li>
		 * <li>{object=} [ajaxSettings]: データ取得の際の ajax 通信の設定（$.ajax に渡すオブジェクト）</li>
		 * <li>{object=} [requestData]: データ取得の際にリクエストに付けるデータ</li>
		 * </ul>
		 * </dd>
		 * <dt><strong>省略可能なパラメータ</strong></dt>
		 * <dd>
		 * <ul>
		 * <li>{undefined|function(object): string} [defaultFormatter]: デフォルトのフォーマッタ関数</li>
		 * <li>{boolean=} [enableMultiSelect=true]: 複数行を選択可能とするか否か</li>
		 * <li>{string=} [verticalScrollStrategy='pixel']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{string=} [horizontalScrollStrategy='pixel']: 横のスクロール方法（'pixel' と 'index'
		 * のどちらかを指定する）</li>
		 * <li>{number=} [defaultColumnWidth=100]: デフォルトの列幅
		 * <li>{string=} [headerRowsHtml] ヘッダ行（右上）を表現する HTML 文字列</li>
		 * <li>{string=} [headerColumnsHtml]: ヘッダ列（左下）を表現する HTML 文字列</li>
		 * <li>{string=} [headerTopLeftCellsHtml]: ヘッダの左上部分を表現する HTML 文字列</li>
		 * <li>{string=} [rowSelector='tr:gt(0)']: 縦のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{string=} [columnSelector='tr:eq(0) > td']: 横のスクロール方法（'pixel' と 'index' のどちらかを指定する）</li>
		 * <li>{number=} [headerColumns=0]: 固定する列数</li>
		 * <li>{undefined|number|string} [gridWidth='auto']: グリッド全体の幅</li>
		 * <li>{boolean=} [enableChangeColumnWidthUI=true]: 列幅変更のためのUIを有効にするか</li>
		 * <li>{number=} [minColumnWidth=20]: UI で操作する際の最小の列幅</li>
		 * <li>{number=} [maxColumnWidth=500]: UI で操作する際の最大の列幅</li>
		 * <li>{boolean=} [enableSortUI=true]: ソートのためのUIを有効にするか</li>
		 * <li>{string=} [sortableIconColor='#BBB']: ソート可能なことを表現する矢印アイコンの色</li>
		 * <li>{string=} [sortingIconColor='#666']: 現在ソート中であることを表現する矢印アイコンの色</li>
		 * </ul>
		 * </dd>
		 * </dl>
		 * 
		 * @param {object} initParams 初期化パラメータ
		 * @return {Promise} 初期化完了を表す Promise オブジェクト
		 */
		init: function(initParams) {
			var that = this;

			return this.initPromise.then(function() {

				// デフォルト値のセット + HTML の解釈
				var params = that._makeGridParams(initParams);

				// パラメータチェック
				that._validateInitParams(params);

				// パラメータのセット
				that._params = params;

				// 子コントローラの初期化
				return that._initializeChildControllers();
			});
		},

		/**
		 * 行を選択します。
		 * 
		 * @param {*} dataId 選択したい行の dataId
		 */
		selectData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			this._converter.selectData(dataId);
		},

		/**
		 * 全ての行を選択します。
		 */
		selectAllData: function() {
			var length = this._dataSource.getTotalLength();
			var allData = this._dataSource.sliceCachedData(0, length);

			this._converter.selectMultiData(allData);
		},

		/**
		 * 行の選択を解除します。
		 * 
		 * @param {*} dataId 選択を解除したい行の dataId
		 */
		unselectData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			this._converter.unselectData(dataId);
		},

		/**
		 * 全ての行の選択を解除します。
		 */
		unselectAllData: function() {
			this._converter.unselectAllData();
		},

		/**
		 * 行の選択状態を取得します。
		 * 
		 * @return {boolean} 選択されていれば true、そうでなければ false
		 */
		isSelectedData: function(dataId) {
			if (dataId == null) {
				this.throwError('dataId を指定してください');
			}

			return this._converter.isSelected(dataId);
		},

		/**
		 * 選択されているすべての行の dataId を取得します。
		 * 
		 * @return {Array.<*>} 選択されているすべての行の dataId の配列
		 */
		getSelectedDataIds: function() {
			return this._converter.getSelectedDataIds();
		},

		/**
		 * ソートします。
		 * 
		 * @param {string=} propertyName ソートするプロパティ名（指定しなかった場合はソートの解除）
		 * @param {boolean=} [isDesc=false] ソート順が降順であるか否か（降順の場合 true、デフォルトは false）
		 */
		sort: function(propertyName, isDesc) {
			var msg;

			if (propertyName == null) {

				this._gridLayoutController.beginLoad();
				this._dataSource.changeSearchOptions({});

			} else {
				if (typeof propertyName !== 'string') {
					msg = 'propertyname は string 型を指定してください; propertyName = {0}';
					this.throwError(msg, propertyName);
				}

				if (isDesc != null && typeof isDesc !== 'boolean') {
					msg = 'isDesc は boolean 型を指定してください; isDesc = {0}';
					this.throwError(msg, isDesc);
				}

				if (!this._sortable[propertyName]) {
					msg = 'sortable でない列はソートできません; propertyName = {0}';
					this.throwError(msg, propertyName);
				}

				this._gridLayoutController.beginLoad();

				var order = isDesc ? 'desc' : 'asc';
				this._dataSource.changeSearchOptions({
					sort: [{
						property: propertyName,
						order: order
					}]
				});
			}
		},

		/**
		 * リクエストデータを変更する
		 * 
		 * @param {object} requestData リクエストデータ
		 */
		changeRequestData: function(requestData) {
			if (this._params.url == null) {
				var msg = '初期化パラメータに url を設定していない場合はこのメソッドは利用できません';
				this.throwError(msg);
			}

			this._dataSource.setCustomRequestData(requestData);
		},

		/**
		 * 列の幅を変更する
		 * 
		 * @param widthKey 変更したい列の widthKey
		 * @param width 列幅
		 */
		setColumnWidth: function(widthKey, width) {
			this._converter.setWidth(widthKey, width);
		},

		/**
		 * rowId からデータオブジェクトを取得します。 キャッシュされていない rowId を指定すると例外を投げます。
		 * 
		 * @param {number} rowId 行ID
		 */
		getCachedData: function(rowId) {
			var msg;

			if (rowId == null) {
				this.throwError('rowId を指定してください');
			}
			if (typeof rowId !== 'number') {
				msg = 'rowId には number 型を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			if (rowId !== Math.floor(rowId)) {
				msg = 'rowId には整数を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			if (rowId < 0) {
				msg = 'rowId には非負の値を指定してください; rowId = {0}';
				this.throwError(msg, rowId);
			}
			return this._converter.getCachedOriginData(rowId);
		},

		resize: function() {
			this._gridLayoutController.resize();
		},

		getColumns: function() {
			return this._converter.getColumns();
		},

		setColumns: function(columns) {
			this._converter.setColumns(columns);
		},

		editData: function(dataId, propertyName, value) {
			this._converter.editData(dataId, propertyName, value);
		},

		getModified: function() {
			return this._converter.getModified();
		},

		clearModified: function() {
			this._converter.clearModified();
		}
	};

	h5.core.expose(scrollGridController);

})(jQuery);



//---- HorizontalScrollGridController ---- //

(function($) {
	'use strict';

	var COMMON_DEFAULT_INIT_PARAMS = h5.ui.components.datagrid.init.COMMON_DEFAULT_INIT_PARAMS;

	var horizontalScrollGridController = {

		// --- Setting --- //

		/**
		 * @memberOf h5.ui.components.datagrid.HorizontalScrollGridController
		 */
		__name: 'h5.ui.components.datagrid.HorizontalScrollGridController',


		// --- Property --- //

		_params: null,

		_sortable: null,

		_dataSource: null,

		_converter: null,

		_gridLayoutController: h5.ui.components.datagrid.GridLayoutController,


		// --- Private Method --- //

		_makeGridParams: function(params) {
			return $.extend(true, {}, COMMON_DEFAULT_INIT_PARAMS, {
				headerRows: 0,
				defaultRowHeight: 100
			}, params);
		},


		_validateInitParams: function(params) {

			// 共通のチェック
			h5.ui.components.datagrid.init.validateCommonInitParams(params);

			var msgHeader = '初期パラメータが不正です: ';
			var msg;

			// rows の追加パラメータチェック
			for (var i = 0, len = params.rows.length; i < len; i++) {
				var row = params.rows[i];

				// rows[i].height のチェック
				if (row.height != null) {

					if (typeof row.height !== 'number') {
						msg = 'rows の要素の height は number 型である必要があります; rows[{0}].height = {1}';
						this.throwError(msgHeader + msg, i, row.height);
					}
					if (row.height !== Math.floor(row.height)) {
						msg = 'rows の要素の height は整数である必要があります; rows[{0}].height = {1}';
						this.throwError(msgHeader + msg, i, row.height);
					}
					if (row.height <= 0) {
						msg = 'rows の要素の height は正の数である必要があります; rows[{0}].height = {1}';
						this.throwError(msgHeader + msg, i, row.height);
					}
				}
			}


			// columnWidth
			if (params.columnWidth == null) {
				msg = 'columnWidth は必ず指定してください';
				this.throwError(msgHeader + msg, params.columnWidth);
			}
			if (typeof params.columnWidth !== 'number') {
				msg = 'columnWidth は number 型である必要があります; columnWidth = {0}';
				this.throwError(msgHeader + msg, params.columnWidth);
			}
			if (params.columnWidth !== Math.floor(params.columnWidth)) {
				msg = 'columnWidth は整数である必要があります; columnWidth = {0}';
				this.throwError(msgHeader + msg, params.columnWidth);
			}
			if (params.columnWidth <= 0) {
				msg = 'columnWidth は正の数である必要があります; columnWidth = {0}';
				this.throwError(msgHeader + msg, params.columnWidth);
			}

			// headerRows のチェック
			if (typeof params.headerRows !== 'number') {
				msg = 'headerRows は number 型である必要があります; headerRows = {0}';
				this.throwError(msgHeader + msg, params.headerRows);
			}
			if (params.headerRows !== Math.floor(params.headerRows)) {
				msg = 'headerRows は整数である必要があります; headerRows = {0}';
				this.throwError(msgHeader + msg, params.headerRows);
			}
			if (params.headerRows < 0) {
				msg = 'headerRows は非負の数である必要があります; headerRows = {0}';
				this.throwError(msgHeader + msg, params.headerRows);
			}

		},

		_initializeChildControllers: function() {
			var params = this._params;

			if (params.url != null) {
				this._dataSource = h5.ui.components.virtualScroll.data.createLazyLoadDataSource(
						params.url, params.ajaxSettings, params.requestData);
			} else {
				this._dataSource = h5.ui.components.virtualScroll.data
						.createLocalDataSource(params.data);
			}

			var idKey = params.idKey;
			var columnWidth = params.columnWidth;
			var defaultRowHeight = params.defaultRowHeight;

			var selector = h5.ui.components.datagrid.createSingleSelector();

			var headerRows = params.headerRows;
			var headerColumns = 1;
			var headerTopLeftCellsHtml = null;
			var headerHeight = 1;
			var headerWidth = params.columnWidth + 1;

			var rows = [];
			var formatters = {};
			var rowsOption = {};

			this._sortable = {};

			for (var i = 0, len = params.rows.length; i < len; i++) {
				var row = params.rows[i];
				rows.push(row.propertyName);

				if (row.formatter != null) {
					var formatter = h5.ui.components.datagrid.init
							.wrapScrollFormatter(row.formatter);
					formatters[row.propertyName] = formatter;
				}
				var option = {};

				if (row.height != null) {
					option.height = row.height;
				}

				if (row.header != null) {
					option.header = row.header;
				}

				rowsOption[row.propertyName] = option;

				// height 計算
				var height = (row.height != null) ? row.height : params.defaultRowHeight;

				if (i < headerRows) {
					headerHeight += height;
				}
			}

			this._converter = h5.ui.components.datagrid.createGridHorizontalDataConverter({
				dataSource: this._dataSource,
				idKey: idKey,
				rows: rows,
				defaultRowHeight: defaultRowHeight,
				defaultColumnWidth: columnWidth,
				selector: selector,
				rowsOption: rowsOption
			});

			var defaultFormatter = h5.ui.components.datagrid.init
					.wrapScrollFormatter(params.defaultFormatter);

			var vStrategy;
			if (params.verticalScrollStrategy === 'pixel') {
				vStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				vStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			var hStrategy;
			if (params.horizontalScrollStrategy === 'pixel') {
				hStrategy = h5.ui.components.virtualScroll.createPixelBaseScrollStrategy();
			} else {
				hStrategy = h5.ui.components.virtualScroll.createIndexBaseScrollStrategy();
			}

			var that = this;

			return this.readyPromise.then(function() {
				return that._gridLayoutController.readyPromise;
			}).then(function() {

				var promise = that._gridLayoutController.init({
					defaultFormatter: defaultFormatter,
					formatters: formatters,
					converter: that._converter,
					verticalScrollStrategy: vStrategy,
					horizontalScrollStrategy: hStrategy,
					headerRows: headerRows,
					headerColumns: headerColumns,
					headerTopLeftCellsHtml: headerTopLeftCellsHtml,
					headerHeight: headerHeight,
					headerWidth: headerWidth
				});

				that._dataSource.changeSearchOptions({});

				return promise;
			});
		},


		// --- Life Cycle Method --- //

		__ready: function() {
			return this._gridLayoutController.readyPromise;
		},


		__dispose: function() {
			$(this.rootElement).remove();
		},


		// --- Event Handler --- //


		// --- Public Method --- //

		init: function(initParams) {
			var that = this;

			return this.initPromise.then(function() {

				// デフォルト値のセット + HTML の解釈
				var params = that._makeGridParams(initParams);

				// パラメータチェック
				that._validateInitParams(params);

				// パラメータのセット
				that._params = params;

				// 子コントローラの初期化
				return that._initializeChildControllers();
			});
		},

		/**
		 * リクエストデータを変更する
		 * 
		 * @param {object} requestData リクエストデータ
		 */
		changeRequestData: function(requestData) {
			if (this._params.url == null) {
				var msg = '初期化パラメータに url を設定していない場合はこのメソッドは利用できません';
				this.throwError(msg);
			}

			this._dataSource.setCustomRequestData(requestData);
		},


		resize: function() {
			this._gridLayoutController.resize();
		},

		getRows: function() {
			return this._converter.getRows();
		},

		setRows: function(rows) {
			this._converter.setRows(rows);
		},

		editData: function(dataId, propertyName, value) {
			this._converter.editData(dataId, propertyName, value);
		},

		getModified: function() {
			return this._converter.getModified();
		},

		clearModified: function() {
			this._converter.clearModified();
		}
	};

	h5.core.expose(horizontalScrollGridController);

})(jQuery);
(function() {
	var DATA_STATE = 'state';
	var EVENT_STATE_CHANGE = 'state-change';
	var selectBoxController = {
		__name: 'h5.ui.container.StateBox',
		_currentState: null,
		__init: function() {
			// data-stateが指定されているもののうち、最初以外を隠す
			var $stateBoxes = this._getAllStateBoxes();
			this.setState($stateBoxes.data(DATA_STATE));

			//FIXME ルートエレメントからこのコントローラを辿れるようにjQuery.dataを使って覚えさせておく
			// (getControllers()を使ったDOM->Controllerの特定は子コントローラの場合にできないため)
			$(this.rootElement).data('h5controller-statebox-instance', this);
		},
		setState: function(state) {
			if (this._currentState === state) {
				return;
			}
			var $target = this._getStateBoxByState(state);
			if (!$target.length) {
				this.log.warn('指定されたstateの要素はありません。{}', state);
				return;
			}
			var $stateBoxes = this.$find('>*[data-' + DATA_STATE + ']');
			$stateBoxes.css('display', 'none');
			$target.css('display', 'block');
			this._currentState = state;
			this.trigger(EVENT_STATE_CHANGE, state);
		},
		getState: function() {
			return this._currentState;
		},
		getContentsSize: function() {
			var $current = this._getStateBoxByState(this._currentState);
			// TODO outerWidth/Heightかどうかはオプション？
			return {
				width: $current.outerWidth(),
				height: $current.outerHeight()
			};
		},
		_getAllStateBoxes: function() {
			return this.$find('>[data-' + DATA_STATE + ']');
		},
		_getStateBoxByState: function(state) {
			return this.$find('>[data-' + DATA_STATE + '="' + state + '"]');
		}
	};
	h5.core.expose(selectBoxController);
})();

(function() {
	/** データ属性名：ボックスが隠れているかどうか */
	var DATA_HIDDEN = 'dividedbox-boxhidden';

	/** クラス名：サイズの自動調整設定 */
	var CLASS_AUTO_SIZE = 'autoSize';

	/** クラス名：垂直区切り設定 */
	var CLASS_VERTICAL = 'vertical';

	/** dividedBoxによって位置を管理されているboxかどうか(動的に追加される要素についても位置計算時のこのクラスが追加される) */
	var CLASS_MANAGED = 'dividedbox-managed';

	/** クラス名：水平区切り設定 */
	var CLASS_HORIZONTAL = 'horizontal';

	/** クラス名: dividedBoxのルートに追加するクラス名 */
	var CLASS_ROOT = 'dividedBox';

	/** クラス名：サイズ固定 */
	var CLASS_FREEZE_SIZE = 'freezeSize';

	/** イベント名：ボックスのサイズが変更されたときに上げるイベント */
	var EVENT_BOX_SIZE_CHANGE = 'boxSizeChange';

	var dividedBoxController = {

		__name: 'h5.ui.container.DividedBox',

		_dividerPos: {
			left: 0.5,
			top: 0.5
		},

		_type: null,

		_prev: null,

		_prevStart: null,

		_next: null,

		_nextEnd: null,

		_root: null,

		_lastAdjustAreaWH: null,

		_l_t: '',

		_w_h: '',

		_outerW_H: '',

		_scrollW_H: '',

		_lastPos: null,

		__init: function(context) {
			var root = this._root = $(this.rootElement);
			var type = this._type = root.hasClass(CLASS_VERTICAL) ? 'y' : 'x';

			// 要素内の空のテキストノードを削除
			this._cleanWhitespace(root[0]);

			root.addClass(CLASS_ROOT);
			if (type === 'x') {
				root.addClass(CLASS_HORIZONTAL);
			}

			var w_h = this._w_h = (type === 'x') ? 'width' : 'height';
			this._l_t = (type === 'x') ? 'left' : 'top';

			var outerW_H = this._outerW_H = w_h === 'width' ? 'outerWidth' : 'outerHeight';
			this._scrollW_H = w_h === 'width' ? 'scrollWidth' : 'scrollHeight';

			// サイズ固定が指定されているボックスは、dividedBox適用時のサイズに固定
			if (root.hasClass(CLASS_FREEZE_SIZE)) {
				root.width(root.width());
				root.height(root.height());
			}

			this._lastAdjustAreaWH = root[w_h]();
			var rootPosition = root.css('position');
			if (rootPosition === 'static' || !rootPosition) {
				// ルートがposition:staticまたは指定無しの場合はposition:relativeを設定
				root.css('position', 'relative');
				if (h5.env.ua.isOpera) {
					root.css({
						'top': 0,
						'left': 0
					});
				}
			}

			// ボックスのサイズがオートのものについてサイズ計算
			var autoSizeBoxCouunt = 0;
			var autoSizeBoxAreaWH = root[w_h]();

			var $boxes = this._getBoxes();
			$boxes.each(this.ownWithOrg(function(orgThis) {
				var $box = $(orgThis);
				if ($box.hasClass(CLASS_AUTO_SIZE)) {
					autoSizeBoxCouunt++;
				} else {
					autoSizeBoxAreaWH -= $box[outerW_H](true);
				}
			}));

			if (autoSizeBoxCouunt) {
				var autoSizeBoxWH = autoSizeBoxAreaWH / autoSizeBoxCouunt;
				$boxes.each(this.ownWithOrg(function(orgThis) {
					var $box = $(orgThis);
					if ($box.hasClass(CLASS_AUTO_SIZE)) {
						this._setOuterSize($box, w_h, autoSizeBoxWH);
					}
				}));
			}

			// リフレッシュ
			this.refresh();
		},

		/**
		 * ボックスとdividerの位置を最適化します
		 *
		 * @memberOf h5.ui.container.DividedBox
		 */
		refresh: function() {
			var type = this._type;

			// ボックスにクラスCLASS_MANAGEDを追加
			// ボックス間に区切り線がない場合は挿入
			this._getBoxes().addClass(CLASS_MANAGED).filter(':not(.divider) + :not(.divider)')
					.each(function() {
						$(this).before('<div class="divider"></div>');
					});

			//主に、新たに配置した区切り線とその前後のボックスの設定(既存も調整)
			this._getDividers().each(
					this.ownWithOrg(function(orgThis) {
						var $divider = $(orgThis);
						var isVisibleDivider = $divider.css('display') !== 'none';
						var $prev = this._getPrevBoxByDivider($divider);
						var $next = this._getNextBoxByDivider($divider);

						var nextZIndex = $next.css('z-index');
						if (!nextZIndex || nextZIndex === 'auto') {
							nextZIndex = 0;
						}

						// dividerの位置調整
						var dividerTop = (type === 'y' && $prev.length) ? $prev.position().top
								+ $prev.outerHeight(true) : 0;
						var dividerLeft = (type === 'x' && $prev.length) ? $prev.position().left
								+ $prev.outerWidth(true) : 0;
						$divider.css({
							cursor: (type === 'x') ? 'col-resize' : 'row-resize',
							top: dividerTop,
							left: dividerLeft,
							position: 'absolute',
							'z-index': nextZIndex + 1
						});
						var nextTop = (type === 'y') ? dividerTop
								+ (isVisibleDivider ? $divider.outerHeight(true) : 0) : 0;
						var nextLeft = (type === 'x') ? dividerLeft
								+ (isVisibleDivider ? $divider.outerWidth(true) : 0) : 0;
						// dividerの次の要素の調整
						$next.css({
							top: nextTop,
							left: nextLeft,
							position: 'absolute'
						});
						var dividerHandler = $divider.find('.dividerHandler');
						if (dividerHandler.length === 0) {
							$divider.append('<div style="height:50%;"></div>');
							dividerHandler = $('<div class="dividerHandler"></div>');
							$divider.append(dividerHandler);
						}
						dividerHandler.css({
							'margin-top': -dividerHandler.height() / 2
						});
						if (type === 'y') {
							dividerHandler.css({
								'margin-left': 'auto',
								'margin-right': 'auto'
							});
						} else {
							dividerHandler.css({
								'margin-left': ($divider.width() - dividerHandler.outerWidth()) / 2
							});
						}
					}));

			//以上の配置を元にルート要素サイズに合わせて再配置
			this._adjust();
		},

		/**
		 * ボックスの追加
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {Integer} index 何番目に追加するか
		 * @param {DOM|jQuery} box
		 */
		insert: function(index, box) {
			var root = this._root;
			var type = this._type;
			var l_t = this._l_t;
			var t_l = l_t === 'left' ? 'top' : 'left';
			var w_h = this._w_h;
			var outerW_H = this._outerW_H;

			var $target = this._getBoxElement(index);
			var $divider = $('<div class="divider"></div>');

			// 追加したボックスにクラスCLASS_MANAGEDを追加
			var $box = $(box);
			$box.addClass(CLASS_MANAGED);

			$target.after($box);
			$target.after($divider);

			var targetWH = $target[w_h](true) - $divider[outerW_H](true) - $box[outerW_H](true);

			var mbpSize = this._getMBPSize($target, w_h);
			if (targetWH <= mbpSize) {
				targetWH = mbpSize + 1;
			}
			this._setOuterSize($target, w_h, targetWH);
			//jQueryが古いと以下のようにする必要があるかもしれない。1.8.3だと以下で動作しない。何かのオブジェクトが返ってくる。
			//divider.css(l_t, target.position()[l_t] + target[outerW_H]({margin:true}));
			$divider.css(l_t, $target.position()[l_t] + $target[outerW_H](true));
			$divider.css(t_l, $divider.position()[t_l]);
			$divider.css('position', 'absolute');
			$divider.css('cursor', (type === 'x') ? 'col-resize' : 'row-resize');

			$box.css(l_t, $divider.position()[l_t] + $divider[outerW_H](true));
			$box.css(t_l, 0);
			$box.css('position', 'absolute');

			var $nextDivider = this._getNextDividerByBox($box);
			var distance = 0;
			if ($nextDivider.length) {
				distance = $nextDivider.position()[l_t] - $box.position()[l_t];
			} else {
				distance = root[w_h]() - $box.position()[l_t];
			}
			var boxOuterWH = $box[outerW_H](true);
			if (distance < boxOuterWH) {
				this._setOuterSize($box, w_h, distance);
			}

			var $dividerHandler = $('<div class="dividerHandler"></div>');
			$divider.append('<div style="height:50%;"></div>');
			$dividerHandler = $('<div class="dividerHandler"></div>');
			$divider.append($dividerHandler);
			$dividerHandler.css({
				'margin-top': -$dividerHandler.height() / 2
			});
			if (type === 'y') {
				$dividerHandler.css({
					'margin-left': 'auto',
					'margin-right': 'auto'
				});
			} else {
				$dividerHandler.css({
					'margin-left': ($divider.width() - $dividerHandler.width()) / 2
				});
			}

			this._triggerBoxSizeChange();
		},

		/**
		 * ボックスの最小化
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Object} opt {@link h5.ui.container.DividedBox#resize}のオプションと同じです
		 */
		minimize: function(box, opt) {
			this.resize(box, 0, opt);
		},

		/**
		 * ボックスの最大化
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Object} opt {@link h5.ui.container.DividedBox#resize}のオプションと同じです
		 */
		maximize: function(box, opt) {
			this.resize(box, $(this.rootElement)[this._w_h](), $.extend({}, opt, {
				partition: 0.5
			}));
		},

		/**
		 * ボックスの中身の大きさを自動取得し、そのサイズにリサイズします
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Object} opt {@link h5.ui.container.DividedBox#resize}のオプションと同じです
		 */
		fitToContents: function(box, opt) {
			this.resize(box, null, opt);
		},

		/**
		 * {@link h5.ui.container.DividedBox#hide}で非表示にしたボックスを表示します
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Object} opt {@link h5.ui.container.DividedBox#resize}のオプションと同じです
		 */
		show: function(box, opt) {
			// hide状態のボックスを表示
			var $box = this._getBoxElement(box);
			if (!$box.length || !$box.data(DATA_HIDDEN)) {
				return;
			}
			$box.data(DATA_HIDDEN, false);
			// 指定されたindexのボックスの両隣のdividerを表示する
			var $prevDivider = this._getPrevDividerByBox($box);
			var $nextDivider = this._getNextDividerByBox($box);
			if ($prevDivider.length) {
				this.showDivider($prevDivider);
			} else if ($nextDivider.length) {
				this.showDivider($nextDivider, true);
			}

			// コンテンツの大きさにリサイズ
			this.fitToContents(box, opt);
		},

		/**
		 * ボックスを非表示にします
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Object} opt {@link h5.ui.container.DividedBox#resize}のオプションと同じです
		 */
		hide: function(box, opt) {
			var $box = this._getBoxElement(box);
			if (!$box.length) {
				return;
			}
			// 指定されたindexの左(上)側ボックスのどちらか片方のdividerを非表示にする
			// 右(下)側にdividerのあるboxの場合、そのdividerは隠されたboxを無視して動作するdividerとして動作する
			// 左(上)端のボックスでdividerが右(下)にしかない場合はそのdividerを非表示にする
			var $prevDivider = this._getPrevDividerByBox($box);
			var $nextDivider = this._getNextDividerByBox($box);
			if ($prevDivider.length) {
				this.hideDivider($prevDivider);
			} else if ($nextDivider) {
				this.hideDivider($nextDivider, true);
			}

			// 0にリサイズ
			this.resize(box, 0, opt);

			$box.data(DATA_HIDDEN, true);
		},

		/**
		 * ボックスのサイズ変更を行います
		 *
		 * @param {index|DOM|jQuery|String} box boxのindexまたはbox要素またはセレクタ
		 * @param {Integer} size リサイズするサイズ
		 * @param {Object} opt リサイズオプション
		 * @param {Number} [opt.partition=0]
		 *            <p>
		 *            左右(上下)にdividerがある場合、resize時に左右(上下)のdividerが動く割合を0.0～1.0を指定します。
		 *            </p>
		 *            <p>
		 *            0.0を指定した場合(デフォルト)は左(上)のdividerを固定して右(下)のdividerの位置が変更されます。
		 *            </p>
		 *            <p>
		 *            左右(上下)のどちらかにしかdividerが無い場合はこのオプションは無視されてresize時に位置が変更されるdividerは自動で決定されます。
		 *            </p>
		 */
		resize: function(box, size, opt) {
			var opt = opt || {};
			var partition = parseFloat(opt.partition) || 0;

			var w_h = this._w_h;
			var outerW_H = this._outerW_H;

			var $targetBox = this._getBoxElement(box);

			// partitionに合わせて両サイドのdividerを動かす
			// dividerがそもそも片方にしか無い場合はpartitionに関係なくその1つのdividerを動かす
			var $prevDivider = this._getPrevDividerByBox($targetBox);
			var $nextDivider = this._getNextDividerByBox($targetBox);

			if (!$prevDivider.length && !$nextDivider.length) {
				// dividerが無い場合は何もしない
				return;
			}

			if (size == null) {
				// nullの場合は中身の要素を設定
				// 中身がはみ出ている場合はscrollWidth|Heigthで取得できる
				// 中身が小さい場合は取得できないが、StateBoxの場合は取得できる

				// FIXME StateBoxが子コントローラだった場合はgetControllers()で取得できないので、data属性を使って取得
				var stateBox = $targetBox.data('h5controller-statebox-instance');
				if (stateBox && stateBox.getContentsSize) {
					size = stateBox.getContentsSize()[w_h];
				} else {
					size = $targetBox[0][this._scrollW_H];
				}
			}


			var totalMove = size - $targetBox[outerW_H]();
			if (!$prevDivider.length) {
				partition = 0;
			} else if (!$nextDivider.length) {
				partition = 1;
			}
			var prevMove = -totalMove * partition;
			var nextMove = totalMove + prevMove;

			if (prevMove) {
				this._move(prevMove, $prevDivider);
			}
			if (nextMove) {
				this._move(nextMove, $nextDivider);
			}
		},

		/**
		 * dividerのトラック操作開始時イベントハンドラ
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param context
		 */
		'> .divider h5trackstart': function(context) {
			var l_t = this._l_t;
			var outerW_H = this._outerW_H;

			var divider = $(context.event.currentTarget);
			var prev = this._getPrevBoxByDivider(divider);
			var next = this._getNextBoxByDivider(divider);
			this._lastPos = divider.position();
			this._prevStart = prev.position()[l_t];
			this._nextEnd = next.position()[l_t] + next[outerW_H](true) - divider[outerW_H](true);
		},

		/**
		 * dividerのトラック操作中イベントハンドラ
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param context
		 */
		'> .divider h5trackmove': function(context) {
			context.event.preventDefault();
			var divider = $(context.event.currentTarget);
			var l_t = this._l_t;
			var move = (l_t === 'left') ? context.event.dx : context.event.dy;
			if (move === 0)
				return;
			this._move(move, divider, this._prevStart, this._nextEnd, this._lastPos, true);
			this._lastPos = divider.position();
		},

		/**
		 * dividerのトラック操作終了イベントハンドラ
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param context
		 */
		'> .divider h5trackend': function(context) {
			// キャッシュした値のクリア
			this._lastPos = null;
			this._prevStart = null;
			this._nextEnd = null;
		},

		/**
		 * 指定されたdividerを非表示にする
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} dividerのindexまたはdivider要素またはセレクタ
		 * @param {Boolean} [fixPrev=false]
		 *            dividerを非表示にするとき、divider分の幅をどちらのボックスで埋めるか。左(上)で埋める場合はtrueを指定。
		 */
		hideDivider: function(divider, fixPrev) {
			var $divider = this._getDividerElement(divider);
			if ($divider.css('display') === 'none') {
				return;
			}
			var w_h = this._w_h;
			var l_t = this._l_t;
			var dividerWH = $divider[w_h]();
			$divider.css('display', 'none');
			this.refresh();
		},

		/**
		 * 指定されたdividerを表示する
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} dividerのindexまたはdivider要素またはセレクタ
		 * @param {Boolean} [fixPrev=false]
		 *            dividerを表示するとき、divider分の幅をどちらのボックスがずらすか。左(上)をずらす場合はtrueを指定。
		 */
		showDivider: function(divider, fixPrev) {
			var $divider = this._getDividerElement(divider);
			if ($divider.css('display') === 'block') {
				return;
			}
			$divider.css('display', 'block');
			this.refresh();
		},

		/**
		 * dividerを動かす
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @param {Integer} move 移動量
		 * @param {DOM|jQuery} divider divider
		 * @param {Integer} prevStart 左(上)の移動限界位置(指定しない場合は_move内で計算)
		 * @param {Integer} nextStart 右(下)の移動限界位置(指定しない場合は_move内で計算)
		 * @param {Object} lastPost 移動前の位置(指定しない場合は_move内で計算)
		 * @param {Boolean} isTrack トラック操作による呼び出しかどうか
		 */
		_move: function(move, divider, prevStart, nextEnd, lastPos, isTrack) {
			if (move === 0) {
				return;
			}
			var $divider = $(divider);
			var l_t = this._l_t;
			var w_h = this._w_h;
			var outerW_H = this._outerW_H;
			var $prev = this._getPrevBoxByDivider($divider);
			var $next = this._getNextBoxByDivider($divider);
			if (prevStart == null) {
				// 第3引数が未指定ならprevStart,nextEnd,lastPosはdividerから計算する
				// (トラック操作の場合はキャッシュしてある値を渡しているので計算する必要はない)
				var isVisibleDivider = $divider.css('display') === 'block';
				if (isVisibleDivider) {
					lastPos = $divider.position();
				} else {
					// 非表示の場合はboxの位置を基にする
					lastPos = $next.position();
				}
				prevStart = $prev.length ? $prev.position()[l_t] : $divider.position()[l_t];
				nextEnd = $next.length ? ($next.position()[l_t] + $next[outerW_H](true) - (isVisibleDivider ? $divider[outerW_H]
						(true)
						: 0))
						: $divider.position()[l_t];
			}
			var moved = lastPos[l_t] + move;
			if (moved <= prevStart + 1) {
				move = prevStart - lastPos[l_t];
				if (move <= -1 && isTrack)
					return;
			} else if (moved >= nextEnd - 1) {
				move = nextEnd - lastPos[l_t];
				if (move >= 1 && isTrack) {
					return;
				}
			}

			moved = lastPos[l_t] + move;

			var prevWH = $prev[w_h]() + move;
			if (prevWH < 0) {
				prevWH = 0;
				move = -$prev[w_h]();
			}

			var nextWH = $next[w_h]() - move;
			if (nextWH < 0) {
				nextWH = 0;
			}

			$divider.css(l_t, moved);
			$next[w_h](nextWH);
			$prev[w_h](prevWH);
			$next.css(l_t, '+=' + move);

			this._triggerBoxSizeChange();
		},

		/**
		 * 位置の調整を行う
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 */
		_adjust: function() {
			var l_t = this._l_t;
			var w_h = this._w_h;
			var root = this._root;
			var outerW_H = this._outerW_H;

			var adjustAreaWH = root[w_h]();

			// 各ボックスの割合を保って、ボックスの幅を今の表示幅に合わせる
			var $dividers = this._getDividers();
			$dividers.each(this.ownWithOrg(function(orgThis) {
				var $divider = $(orgThis);
				var isDisplayNone = $divider.css('display') === 'none';
				$divider.css('display', 'block');
				var $next = this._getNextBoxByDivider($divider);
				if ($next.length) {
					var dividerLT = $divider.position()[l_t];
					var per = dividerLT / this._lastAdjustAreaWH;
					var nextDivideLT = Math.round(adjustAreaWH * per);
					var move = nextDivideLT - dividerLT;

					$divider.css(l_t, '+=' + move);
					$next.css(l_t, ($next.position()[l_t] + move));
				}
				if (isDisplayNone) {
					$divider.css('display', 'none');
				}
			}));

			var $boxes = this._getBoxes();
			$boxes.each(this.ownWithOrg(function(orgThis, index) {
				var $box = $(orgThis);
				if ($box.data(DATA_HIDDEN)) {
					return;
				}
				var $prev = this._getPrevDividerByBox($box);
				var $next = this._getNextDividerByBox($box);
				var outerSize = 0;
				// 非表示の場合はいったん表示する(位置取得のため)
				var isPrevDisplayNone = $prev.css('display') === 'none';
				var isNextDisplayNone = $next.css('display') === 'none';
				$prev.css('display', 'block');
				$next.css('display', 'block');
				if (!$prev.length) {
					outerSize = $next.position()[l_t];
				} else if (!$next.length) {
					outerSize = adjustAreaWH - $prev.position()[l_t]
							- (isPrevDisplayNone ? 0 : $prev[outerW_H](true));
				} else {
					outerSize = $next.position()[l_t] - $prev.position()[l_t]
							- (isPrevDisplayNone ? 0 : $prev[outerW_H](true));
				}
				// 表示にしたdividerを元に戻す
				if (isPrevDisplayNone) {
					$prev.css('display', 'none');
				}
				if (isNextDisplayNone) {
					$next.css('display', 'none');
				}
				// 計算したサイズを設定
				this._setOuterSize($box, w_h, outerSize);
			}));
			this._lastAdjustAreaWH = adjustAreaWH;
		},

		/**
		 * 要素のouterWidthまたはouterHeightがouterSizeになるようにサイズを設定する
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @param {jQuery} $el
		 * @param {String} w_h 'width'または'height'
		 * @param {Integer} outerSize
		 */
		_setOuterSize: function($el, w_h, outerSize) {
			$el[w_h](outerSize - this._getMBPSize($el, w_h));
		},

		/**
		 * 要素のマージン+ボーダー+パディングの値を計算する
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @param {jQuery} $el
		 * @param {String} w_h 'width'または'height'
		 */
		_getMBPSize: function(element, w_h) {
			var outerW_H = w_h === 'width' ? 'outerWidth' : 'outerHeight';
			return element[outerW_H](true) - element[w_h]();
		},

		/**
		 * エレメント内のホワイトスペース(===空のTEXT_NODE)を削除
		 * <p>
		 * prototype.js v1.5.0のElement.cleanWhitespace()相当のことを行っている
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @param {DOM} element
		 */
		_cleanWhitespace: function(element) {
			var node = element.firstChild;
			while (node) {
				var nextNode = node.nextSibling;
				if (node.nodeType === 3 && !/\S/.test(node.nodeValue))
					element.removeChild(node);
				node = nextNode;
			}
			return element;
		},

		/**
		 * 全てのボックスについて、boxSizeChangeイベントをあげる
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 */
		_triggerBoxSizeChange: function() {
			this._getBoxes().each(function() {
				$(this).trigger(EVENT_BOX_SIZE_CHANGE);
			});
		},

		/**
		 * 全てのボックスを取得
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getBoxes: function() {
			// ルート要素直下の要素(divider以外)
			// ただし、動的に追加された要素でかつposition:absoluteのものは除く
			// (動的に追加された要素でもposition:absoluteでなければ新規boxとして位置計算の対象にする
			return this.$find('> :not(.divider)').filter(function() {
				return $(this).hasClass(CLASS_MANAGED) || $(this).css('position') !== 'absolute';
			});
		},

		/**
		 * 全てのdividerを取得
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getDividers: function() {
			return this.$find('> .divider');
		},

		/**
		 * indexからdividerを返す。DOM,jQueryが渡された場合はdivider要素ならそれを$()でラップして返す
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} dividerのindexまたはdivider要素またはセレクタ
		 * @returns {jQuery} divider要素。該当するものが無い場合は空jQuery
		 */
		_getDividerElement: function(divider) {
			var $dividers = this._getDividers();
			if (typeof divider === 'number') {
				return $dividers.eq(divider);
			}
			return $dividers.filter(divider).eq(0);
		},


		/**
		 * indexからボックスを返す。DOM,jQueryが渡された場合はdivider要素ならそれを$()でラップして返す
		 *
		 * @memberOf h5.ui.container.DividedBox
		 * @param {index|DOM|jQuery|String} ボックスのindexまたはボックス要素またはセレクタ
		 * @returns {jQuery}
		 */
		_getBoxElement: function(box) {
			var $boxes = this._getBoxes();
			if (typeof box === 'number') {
				return $boxes.eq(box);
			}
			return $boxes.filter(box).eq(0);
		},

		/**
		 * 指定されたdividerの前のボックスを返す
		 * <p>
		 * ただし非表示のボックスは除いてその前のボックスを返す
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getPrevBoxByDivider: function(divider) {
			var $divider = $(divider);
			var $box = $divider.prevAll('.' + CLASS_MANAGED + ':first');
			// hidden状態ならその前のboxを返す。
			// 無い場合は空のjQueryオブジェクトを返す
			if ($box.length && $box.data(DATA_HIDDEN)) {
				return this._getPrevBoxByDivider($box.prev());
			}
			return $box;
		},

		/**
		 * 指定されたdividerの次のボックスを返す
		 * <p>
		 * ただし非表示のボックスは除く
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getNextBoxByDivider: function(divider) {
			var $divider = $(divider);
			var $box = $divider.nextAll('.' + CLASS_MANAGED + ':first');
			// hidden状態ならその次のboxを返す。
			// 無い場合は空のjQueryオブジェクトを返す
			if ($box.length && $box.data(DATA_HIDDEN)) {
				return this._getNextBoxByDivider($box.next());
			}
			return $box;
		},

		/**
		 * 指定されたボックスの前のdividerを返す
		 * <p>
		 * ただし非表示のdividerは除いてその前のdividerを返す
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getPrevDividerByBox: function(box) {
			var $box = $(box);
			var $divider = $box.prevAll('.divider:first');
			// dividerの前にボックスがない(先頭要素)、またはdividerの前のボックスがhiddenなら
			// dividerは無効なので空jQueryを返す
			if ($divider.length
					&& (!$divider.prevAll('.' + CLASS_MANAGED).length || $divider.prevAll(
							'.' + CLASS_MANAGED + ':first').data(DATA_HIDDEN))) {
				return $();
			}
			return $divider;
		},

		/**
		 * 指定されたボックスの次のdividerを返す
		 * <p>
		 * ただし非表示のdividerは除いてその次のdividerを返す
		 * </p>
		 *
		 * @private
		 * @memberOf h5.ui.container.DividedBox
		 * @returns {jQuery}
		 */
		_getNextDividerByBox: function(box) {
			var $box = $(box);
			var $divider = $box.nextAll('.divider:first');
			// 次のボックスがhiddenならその次のdividerを返す
			if ($divider.length && $divider.next().data(DATA_HIDDEN)) {
				return this._getNextDividerByBox($divider.next());
			}
			return $divider;
		}
	};

	h5.core.expose(dividedBoxController);
})();
(function($) {

	var EDGE_SCROLL_INTERVAL = 16;

	var EDGE_SCROLL_VALUE = 10;

	var RANGE_THRESHOLD_LEN = 4;
	var RANGE_IN = '_in_';
	var RANGE_OUT = '_out_';

	function getEdgePosition(element, pageX, pageY, borderWidth) {
		var $el = $(element);

		var offset = $el.offset();
		var ex = offset.left;
		var ey = offset.top;
		var ew = $el.outerWidth();
		var eh = $el.outerHeight();

		var rangeX = getRange(pageX, [ ex, ex + borderWidth,
				ex + ew - borderWidth, ex + ew ]);
		var rangeY = getRange(pageY, [ ey, ey + borderWidth,
				ey + eh - borderWidth, ey + eh ]);

		if (isOutOfRange(rangeX) || isOutOfRange(rangeY)) {
			return null;
		}

		var dir;

		switch (rangeY) {
		case 0:
			dir = 'n';
			break;
		case 2:
			dir = 's';
			break;
		default:
			dir = '';
			break;
		}

		switch (rangeX) {
		case 0:
			dir += 'w';
			break;
		case 1:
			// 内部(の可能性がある)
			if (rangeY === 1) {
				dir = RANGE_IN;
			} else if (rangeY !== 0 && rangeY !== 2) {
				dir = RANGE_OUT;
			}
			break;
		case 2:
			dir += 'e';
			break;
		default:
			dir = RANGE_OUT;
			break;
		}

		return dir;
	}

	function isOutOfRange(range) {
		if (range < 0 || range >= RANGE_THRESHOLD_LEN) {
			return true;
		}
		return false;
	}

	function getRange(val, thresholds) {
		if (val < thresholds[0]) {
			return -1;
		}

		var i = 0;
		var len = thresholds.length - 1;

		for (; i < len; i++) {
			if (val < thresholds[i + 1]) {
				return i;
			}
		}

		if (val === thresholds[len]) {
			return len - 2;
		}

		return len - 1;
	}

	var MSG_NO_SUCH_NODE = '指定されたノードは存在しません。nodeId={0}';

	var DRAG_MODE_NONE = 0;
	var DRAG_MODE_NODE = 1;
	var DRAG_MODE_SCROLL = 2;
	var DRAG_MODE_SELECT = 3;

	var TMPL_DRAG_SELECT_OVERLAY = '<div class="dragSelectOverlay"></div>';

	function wrapInArray(val) {
		return $.isArray(val) ? val : [ val ];
	}

	function isIncluded(containerRegion, containedRegion) {
		if (containedRegion.left >= containerRegion.left
				&& containedRegion.right <= containerRegion.right
				&& containedRegion.top >= containerRegion.top
				&& containedRegion.bottom <= containerRegion.bottom) {
			return true;
		}
		return false;
	}

	function PriorityQueueBase(rank) {
		if (rank === undefined) {
			throw new Error('優先度の数を指定してください');
		}

		this.rank = rank;

		this.queues = [];
		for ( var i = 0; i < rank; i++) {
			this.queues[i] = [];
		}
	}

	PriorityQueueBase.prototype.add = function(rank, var_args) {
		// 一度に大量にaddするならpushで一括で渡した方が速い
		var items = h5.u.obj.argsToArray(arguments);
		items.shift();
		Array.prototype.push.apply(this.queues[rank], items);
	};

	PriorityQueueBase.prototype.peek = function(rank) {
		if (rank === undefined) {
			// rankが指定されない場合、もっとも優先度の高い要素を返す
			for ( var i = 0; i < this.rank; i++) {
				if (this.queues[i].length == 0) {
					continue;
				}
				return this.queues[i][0];
			}
			return undefined;
		} else {
			// rankが指定された場合は、そのrankの中で最初の要素を返す
			if (this.queues[rank].length == 0) {
				return undefined;
			}
			return this.queues[rank][0];
		}
	};

	PriorityQueueBase.prototype.poll = function(rank) {
		if (rank === undefined) {
			// rankが指定されない場合、もっとも優先度の高い要素を返す
			for ( var i = 0; i < this.rank; i++) {
				if (this.queues[i].length == 0) {
					continue;
				}
				return this.queues[i].shift();
			}
			return undefined;
		} else {
			// rankが指定された場合は、そのrankの中で最初の要素を返す
			if (this.queues[rank].length == 0) {
				return undefined;
			}
			return this.queues[rank].shift();
		}
	};

	PriorityQueueBase.prototype.count = function(rank) {
		if (rank === undefined) {
			var count = 0;
			for ( var i = 0; i < this.rank; i++) {
				count += this.queues[i].length;
			}
			return count;
		}
		return this.queues[rank].length;
	};

	PriorityQueueBase.prototype.remove = function(rank) {

	};

	PriorityQueueBase.prototype.clear = function(rank) {
		if (rank === undefined) {
			for ( var i = 0; i < this.rank; i++) {
				this.queues[i] = [];
			}
		} else {
			this.queues[rank] = [];
		}
	};

	/**
	 * @class
	 * @name h5.ui.components.graph.RendererQueue
	 */
	function RendererQueue() {
		this.queue = [];
		for (var i = 0; i < this.rank; i++) {
			this.queue[i] = [];
		}
	}
	RendererQueue.prototype = new PriorityQueueBase(5);
	RendererQueue.IMMEDIATE = 0;
	RendererQueue.HIGHEST = 1;
	RendererQueue.HIGH = 2;
	RendererQueue.MEDIUM = 3;
	RendererQueue.LOW = 4;

	/**
	 * @memberOf RendererQueue
	 * @param var_args
	 *            「即時実行」優先度キューに入れる要素。可変長引数。
	 */
	RendererQueue.prototype.addImmediate = function(var_args) {
		var args = h5.u.obj.argsToArray(arguments);
		args.unshift(RendererQueue.IMMEDIATE);
		this.add.apply(this, args);
	};

	/**
	 * @memberOf RendererQueue
	 * @param var_args
	 *            「最高」優先度キューに入れる要素。可変長引数。
	 */
	RendererQueue.prototype.addHighest = function(var_args) {
		var args = h5.u.obj.argsToArray(arguments);
		args.unshift(RendererQueue.HIGHEST);
		this.add.apply(this, args);
	};

	/**
	 * @memberOf RendererQueue
	 * @param var_args
	 *            「高」優先度キューに入れる要素。可変長引数。
	 */
	RendererQueue.prototype.addHigh = function(var_args) {
		var args = h5.u.obj.argsToArray(arguments);
		args.unshift(RendererQueue.HIGH);
		this.add.apply(this, args);
	};

	/**
	 * @memberOf RendererQueue
	 * @param var_args
	 *            「普通」優先度キューに入れる要素。可変長引数。
	 */
	RendererQueue.prototype.addMedium = function(var_args) {
		var args = h5.u.obj.argsToArray(arguments);
		args.unshift(RendererQueue.MEDIUM);
		this.add.apply(this, args);
	};

	/**
	 * @memberOf RendererQueue
	 * @param var_args
	 *            「低」優先度キューに入れる要素。可変長引数。
	 */
	RendererQueue.prototype.addLow = function(var_args) {
		var args = h5.u.obj.argsToArray(arguments);
		args.unshift(RendererQueue.LOW);
		this.add.apply(this, args);
	};

	function getIEVersion() {
		var appver = navigator.appVersion.toLowerCase();
		if (appver.indexOf('msie') > -1) {
			return parseInt(appver.replace(/.*msie[ ]/, '').match(/^[0-9]+/));
		} else {
			return -1;
		}
	}

	/**
	 * プロパティを作成する。 ES5のObject.definePropertyが使用できない場合は 非標準の__defineGetter__,
	 * __defineSetter__を使用する。 どちらも使用できない場合は例外を発生させる。 参考：
	 * http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
	 */
	function defineProperty(obj, prop, desc) {
		var ieVer = getIEVersion();
		var isIE = ieVer == -1 ? false : true;
		var isES5Compliant = Object.defineProperty
				&& (!isIE || (isIE && (ieVer >= 9))); // TODO
		// Safari5.0も対応していないのではじく必要あり

		if (isES5Compliant) {
			Object.defineProperty(obj, prop, desc);
		} else if (Object.prototype.__defineGetter__) {
			if ('get' in desc) {
				obj.__defineGetter__(prop, desc.get);
			}
			if ('set' in desc) {
				obj.__defineSetter__(prop, desc.set);
			}
			if ('value' in desc) {
				obj[prop] = desc.value;
			}
		} else {
			throw new Error('defineProperty: プロパティを作成できません');
		}
	}

	/**
	 * ノードを二つ引数にとり、その位置を比較する関数。 ノードのソート時に使用します
	 * この関数を使ってソートすると、インデックスの小さい方がx座標が小さくなる。
	 *
	 * @private
	 * @param {node}
	 *            n1
	 * @param {node}
	 *            n2
	 * @return {number} n1とn2のx座標の差。同じ場合はy座標の差を返します
	 */
	function nodePositionComparer(n1, n2) {
		if (n1 === n2) {
			return 0;
		}
		var def = n1.layoutPos.x - n2.layoutPos.x;
		if (def === 0) {
			def = n1.layoutPos.y - n2.layoutPos.y;
		}
		return def;
	}

	function nodePositionComparerByYAxis(n1, n2) {
		return def = n1.layoutPos.y - n2.layoutPos.y;
	}

	/***************************************************************************
	 * @class
	 * @name h5.ui.components.graph.primitive.ObjectPool
	 **************************************************************************/
	function ObjectPool() {
		this.instanceCreator = null;
		this.preferredReserveSize = 30;
		this.instanceCreatorArgsArray = null;
		this.reserved = [];
		this.active = {};
		this.lastInstanceId = 0;
		this.activeSize = 0;
	}

	/**
	 * オブジェクトプールを作成します。
	 *
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 * @param poolParam
	 *            オブジェクトプールのパラメータ。preferredReserveSizeで予備インスタンスの保持数を指定可能
	 * @param instanceCreatorFunction
	 *            インスタンスを生成し返す関数。オブジェクトを返す必要があります。
	 * @param instanceCreatorFunctionArgsArray
	 *            instanceCreatorFunctionに渡す引数。配列で指定します。
	 * @returns {___pool0}
	 */
	ObjectPool.create = function(poolParam, instanceCreatorFunction,
			instanceCreatorFunctionArgsArray) {
		if ((poolParam != null) && !$.isPlainObject(poolParam)) {
			throw new Error(
					'poolParamがオブジェクトではありません。パラメータを指定する必要がない場合はnullを指定してください。');
		}

		if (!instanceCreatorFunction) {
			throw new Error('インスタンス生成関数を指定してください。');
		}

		var pool = new ObjectPool();

		// パラメータの設定
		if (poolParam) {
			if (poolParam.preferredReserveSize) {
				pool.preferredReserveSize = poolParam.preferredReserveSize;
			}
		}

		// インスタンス生成関数の設定
		pool.instanceCreator = instanceCreatorFunction;
		if (instanceCreatorFunctionArgsArray) {
			pool.instanceCreatorArgsArray = instanceCreatorFunctionArgsArray;
		}

		return pool;
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.borrowObject = function() {
		var instance;
		if (this.reserved.length > 0) {
			instance = this.reserved.pop();
		} else {
			instance = this.instanceCreator.apply(null,
					this.instanceCreatorArgsArray);
			// TODO プロパティ名が固定
			defineProperty(instance, '_piid', {
				value : this.lastInstanceId++
			});
		}

		this.active[instance._piid] = instance;
		this.activeSize++;

		return instance;
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.returnObject = function(obj) {
		var piid = this.active[obj._piid];
		if (!piid) {
			return;
		}

		delete this.active[obj._piid];
		this.activeSize--;

		if (this.reserved.length < this.preferredReserveSize) {
			this.reserved.push(obj);
		}
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.clearReserved = function() {
		this.reserved = [];
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.clearActive = function() {
		this.active = {};
		this.activeSize = 0;
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.clearAll = function() {
		this.clearReserved();
		this.clearActive();
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.getReservedSize = function() {
		return this.reserved.length;
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.ObjectPool
	 */
	ObjectPool.prototype.getActiveSize = function() {
		return this.activeSize;
	};

	/***************************************************************************
	 * @class
	 * @name h5.ui.components.graph.primitive.EventDispatcher
	 **************************************************************************/
	function EventDispatcher(target) {
		if (target) {
			this._eventTarget = target;
			var that = this;

			target.hasEventListener = function(type, listener) {
				that.hasEventListener(type, listener);
			};
			target.addEventListener = function(type, listener) {
				that.addEventListener(type, listener);
			};
			target.removeEventListener = function(type, listener) {
				that.removeEventListener(type, listener);
			};
			target.dispatchEvent = function(event) {
				that.dispatchEvent(event);
			};
		}
	}

	/**
	 * @memberOf h5.ui.components.graph.primitive.EventDispatcher
	 * @param type
	 * @param listener
	 * @returns {Boolean}
	 */
	EventDispatcher.prototype.hasEventListener = function(type, listener) {
		if (!this._eventListeners) {
			return false;
		}
		var l = this._eventListeners[type];
		if (!l) {
			return false;
		}

		for ( var i = 0, count = l.length; i < count; i++) {
			if (l[i] === listener) {
				return true;
			}
		}
		return false;

	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.EventDispatcher
	 * @param type
	 * @param listener
	 */
	EventDispatcher.prototype.addEventListener = function(type, listener) {
		if (this.hasEventListener(type, listener)) {
			return;
		}

		if (!this._eventListeners) {
			this._eventListeners = {};
		}

		if (!(type in this._eventListeners)) {
			this._eventListeners[type] = [];
		}

		this._eventListeners[type].push(listener);
	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.EventDispatcher
	 * @param type
	 * @param lisntener
	 */
	EventDispatcher.prototype.removeEventListener = function(type, lisntener) {
		if (!this.hasEventListener(type, listener)) {
			return;
		}

		var l = this._eventListeners[type];

		for ( var i = 0, count = l.length; i < count; i++) {
			if (l[i] === listener) {
				l.splice(i, 1);
				return;
			}
		}

	};

	/**
	 * @memberOf h5.ui.components.graph.primitive.EventDispatcher
	 * @param event
	 */
	EventDispatcher.prototype.dispatchEvent = function(event) {
		if (!this._eventListeners) {
			return;
		}
		var l = this._eventListeners[event.type];
		if (!l) {
			return;
		}

		if (!event.target) {
			event.target = this._eventTarget ? this._eventTarget : this;
		}

		for ( var i = 0, count = l.length; i < count; i++) {
			l[i].call(event.target, event);
		}
	};

	/**
	 * オブジェクトプロキシ
	 */
	function createDataItemProxy(obj) {
		if (typeof obj != 'object') {
			// typeofによる判定は簡易なものだが、$.isPlainObjectだと
			// プロトタイプチェーンを持つオブジェクトの判定結果がfalseになるためここでは使用しない
			throw new Error('引数にはObjectを指定してください。');
		}

		var schema = obj.getModel().schema;

		var proxyValue = {};

		return {
			original : obj,
			get : function() {
				if (arguments.length === 0) {
					var retValues = obj.get();
					$.extend(retValues, proxyValue);
					return retValues;
				} else {
					var key = arguments[0];
					if (key in schema) {
						return obj.get(key);
					} else {
						return proxyValue[key];
					}
				}
			},

			set : function() {
				if (arguments.length === 2) {
					var key = arguments[0];
					var value = arguments[1];
					if (key in schema) {
						var orgValue = obj.set.call(obj, key, value);
					} else {
						proxyValue[key] = value;
					}
					return;
				}

				// オリジナルのスキーマが持つプロパティはオリジナルにsetし、持たないものはプロキシが受け取る
				var forOrig = {};
				for ( var prop in schema) {
					if (prop in obj) {
						forOrig[prop] = obj[prop];
					} else {
						proxyValue[prop] = obj[prop];
					}
				}

				obj.set.apply(obj, forOrig);
			}
		};
	}

	/**
	 * @class
	 * @name GraphData
	 */
	function GraphData() {
		this._nodeModel = null;
		this._edgeModel = null;

		this._fromNodeIdKey = 'from';
		this._toNodeIdKey = 'to';

		/*
		 * ノードIDをキー、{ from: [edges], to: [edges] } というオブジェクトを値とするオブジェクト
		 */
		this._relatedEdges = {};

		var that = this;

		this._nodeModel_itemsChangeListener = function(event) {
			that._handleNodeItemsChange(event);
		}

		this._edgeModel_itemsChangeListener = function(event) {
			that._handleEdgeItemsChange(event);
		}
	}

	GraphData.prototype = new EventDispatcher();
	$.extend(GraphData.prototype, {
		getNodeModel : function() {
			return this._nodeModel;
		},

		/**
		 * @memberOf GraphData
		 */
		setNodeModel : function(nodeModel) {
			if (this._nodeModel) {
				this._nodeModel.removeEventListener('itemsChange',
						this._nodeModel_itemsChangeListener);
			}

			this._nodeModel = nodeModel;

			if (nodeModel) {
				nodeModel.addEventListener('itemsChange',
						this._nodeModel_itemsChangeListener);
			}
		},

		getEdgeModel : function() {
			return this._edgeModel;
		},

		setEdgeModel : function(edgeModel) {
			if (this._edgeModel) {
				this._edgeModel.removeEventListener('itemsChange',
						this._edgeModel_itemsChangeListener);
			}

			this._edgeModel = edgeModel;

			if (edgeModel) {
				edgeModel.addEventListener('itemsChange',
						this._edgeModel_itemsChangeListener);
			}
		},

		setFromNodeIdKey : function(key) {
			this._fromNodeIdKey = key;
		},

		setToNodeIdKey : function(key) {
			this._toNodeIdKey = key;
		},

		getEndpointNodeId : function(edgeId) {
			var e = this._edgeModel.get(edgeId);

			if (!e) {
				return null;
			}

			return {
				fromId : e.get(this._fromNodeIdKey),
				toId : e.get(this._toNodeIdKey)
			};
		},

		getRelatedEdges : function(nodeId) {
			if (!(nodeId in this._relatedEdges)) {
				return null;
			}
			return this._relatedEdges[nodeId];
		},

		removeRelatedEdges : function(nodeId) {
			var edges = this.getRelatedEdges(nodeId);
			if (!edges) {
				return;
			}

			var edgeArray;
			if (!edges.from) {
				edgeArray = edges.to;
			} else if (!edges.to) {
				edgeArray = edges.from;
			} else {
				edgeArray = edges.from.concat(edges.to);
			}

			for ( var i = edgeArray.length - 1; i >= 0; i--) {
				this._edgeModel.remove(edgeArray[i]);
			}
		},

		_handleNodeItemsChange : function(event) {
			var created = event.created;
			for ( var i = 0, len = created.length; i < len; i++) {
				this._addNode(created[i]);
			}

			var changed = event.changed;
			for ( var i = 0, len = changed.length; i < len; i++) {
				this._changeNode(changed[i]);
			}

			var removed = event.removed;
			for ( var i = 0, len = removed.length; i < len; i++) {
				this._removeNode(removed[i]);
			}
		},

		_handleEdgeItemsChange : function(event) {
			var created = event.created;
			for ( var i = 0, len = created.length; i < len; i++) {
				this._addEdge(created[i]);
			}

			var removed = event.removed;
			for ( var i = 0, len = removed.length; i < len; i++) {
				this._removeEdge(removed[i]);
			}
		},

		_addNode : function(node) {
			var ev = {
				type : 'nodeAdd',
				node : node
			};
			this.dispatchEvent(ev);
		},

		_changeNode : function(event) {
			var ev = {
				type : 'nodeChange',
				node : event.target,
				props : event.props
			};
			this.dispatchEvent(ev);
		},

		_removeNode : function(node) {
			var ev = {
				type : 'nodeRemove',
				node : node
			};
			this.dispatchEvent(ev);
		},

		_addEdge : function(edge) {
			var fromNodeId = edge.get(this._fromNodeIdKey);
			if (!this._relatedEdges[fromNodeId]) {
				this._relatedEdges[fromNodeId] = {};
			}
			if (!this._relatedEdges[fromNodeId].from) {
				this._relatedEdges[fromNodeId].from = [];
			}
			this._relatedEdges[fromNodeId].from.push(edge);

			var toNodeId = edge.get(this._toNodeIdKey);
			if (!this._relatedEdges[toNodeId]) {
				this._relatedEdges[toNodeId] = {};
			}
			if (!this._relatedEdges[toNodeId].to) {
				this._relatedEdges[toNodeId].to = [];
			}
			this._relatedEdges[toNodeId].to.push(edge);

			var ev = {
				type : 'edgeAdd',
				edge : edge
			};
			this.dispatchEvent(ev);
		},

		_removeEdge : function(edge) {
			var edgeIdKey = this._edgeModel._idKey;

			var removingEdgeId = edge.get(edgeIdKey);

			var fromNodeId = edge.get(this._fromNodeIdKey);
			var fromEdges = this._relatedEdges[fromNodeId].from;
			for ( var i = 0, count = fromEdges.length; i < count; i++) {
				if (fromEdges[i].get(edgeIdKey) == removingEdgeId) {
					fromEdges.splice(i, 1);
					break;
				}
			}

			var toNodeId = edge.get(this._toNodeIdKey);
			var toEdges = this._relatedEdges[toNodeId].to;
			for ( var i = 0, count = toEdges.length; i < count; i++) {
				if (toEdges[i].get(edgeIdKey) == removingEdgeId) {
					toEdges.splice(i, 1);
					break;
				}
			}

			var ev = {
				type : 'edgeRemove',
				edge : edge
			};
			this.dispatchEvent(ev);
		}
	});

	function createGraphData() {
		return new GraphData();
	}

	h5.u.obj.expose('h5.ui.components.graph.primitive', {
		RendererQueue : RendererQueue
	});

	h5.u.obj.expose('h5.ui.components.graph.model', {
		ObjectPool : ObjectPool,
		createGraphData : createGraphData
	});

	/* -------------------------------------------------------------------- */

	// TODO jquery.svgを使う、あるいは汎用ヘルパー関数にする
	function createSvgElement(tagName, attributes) {
		var element = document.createElementNS('http://www.w3.org/2000/svg',
				tagName);

		if (attributes === undefined) {
			return element;
		}

		for ( var attr in attributes) {
			element.setAttribute(attr, attributes[attr]);
		}
		return element;
	}

	function getInsertionIndex(array, target, compareFunc, start, end) {
		var len = array.length;

		if (len == 0) {
			return 0;
		}

		if (start === undefined) {
			start = 0;
		}
		if (end === undefined) {
			end = len - 1;
		}

		if (end <= start) {
			if (compareFunc(target, array[start]) < 0) {
				return start;
			}
			return start + 1;
		}

		var mid = start + ((end - start) >>> 1);

		var comp = compareFunc(target, array[mid]);

		if (comp == 0) {
			return mid + 1;
		} else if (comp < 0) {
			return getInsertionIndex(array, target, compareFunc, start, mid - 1);
		} else {
			return getInsertionIndex(array, target, compareFunc, mid + 1, end);
		}
	}

	function sortedInsert(array, target, compareFunc) {
		array.splice(getInsertionIndex(array, target, compareFunc), 0, target);
	}

	/**
	 * オブジェクトのキーを列挙し、配列で返します。
	 */
	function enumKeys(obj) {
		// TODO
		// Object.keys()の方が、プロパティ数が多い場合には、for-inループより（hasOwnPropertyのチェックをしていなくても）高速
		return Object.keys(obj);
	}

	var RENDERER_QUEUE_IMMEDIATE = h5.ui.components.graph.primitive.RendererQueue.IMMEDIATE;

	var defaultLayerRenderer = [ {
		name : 'div',
		type : 'div'
	} ];

	var DEFAULT_TYPICAL_NODE_WIDTH = 50;
	var DEFAULT_TYPICAL_NODE_HEIGHT = 100;
	var DEFAULT_NODE_CLASSNAME = "default_node";

	var defaultNodeRenderer = {
		/**
		 * デフォルトのノードのサイズ
		 */
		typicalSize : {
			width : DEFAULT_TYPICAL_NODE_WIDTH,
			height : DEFAULT_TYPICAL_NODE_HEIGHT
		},

		/**
		 * ノードの揃え位置を返します。
		 *
		 * @returns "r" 右揃え、 "l" 左揃え、 "c" 中央揃え
		 */
		getAlignment : function(context) {
			var nodeValue = context.vnode.get();
			return nodeValue.alignment;
		},

		/**
		 * ノードのレイアウト座標を返します。
		 *
		 * @param vnode
		 * @returns {Object} x,yプロパティをからなるノードのレイアウト座標
		 */
		getLayoutPos : function(context) {
			return {
				x : context.node.get('x'),
				y : context.node.get('y')
			};
		},

		/**
		 * ノードのビューを返します。
		 *
		 * @returns {Object} レイヤ名をキー名、DOM要素を値としたオブジェクト
		 */
		createView : function(context) {
			var div = document.createElement('div');
			$(div).addClass(DEFAULT_NODE_CLASSNAME);
			return {
				div : div
			};
		},

		/**
		 * ノードの振る舞いを記述します。
		 */
		behavior : {
			onbind : function(context) {
				var nodeValue = context.vnode.get(); // ノードの値を一旦ただのオブジェクトとして取得
				var view = context.view;
				var str = nodeValue.id;
				if (str.length >= 19) {
					str = str.substring(0, 18) + "...";
				}
				$(view.div).html(str);
			},

			onunbind : function(context) {
				$(context.view.div).html("");
			},

			ondataupdate : function(context) {
			},
		}
	}

	var DEFAULT_EDGE_STYRE_PROPERTY = {
		round : {
			radius : 5
		},
		arrow : {
			lineLength : 10,
			arrowStyle : 'nofilled'
		}
	};

	var DEFAULT_ERROR_VALUE = 0.1;
	var formatStr = h5.u.str.format;
	/***************************************************************************
	 * @name DefaultEdgeRenderer
	 **************************************************************************/
	var defaultEdgeRenderer = {

		/**
		 * [0]はメインの線、[1]は矢尻の進行方向左の線、[2]は進行方向右の線
		 *
		 * @memberOf ___anonymous25997_26837
		 * @param hasArrowhead
		 * @returns エッジのビューノード
		 */
		createView : function(context) {
			var g = createSvgElement('g');

			var mainLine = createSvgElement('path', {
				class : 'edge',
				d : "M 0 0"
			});
			g.appendChild(mainLine);

			var startArrow = createSvgElement('path', {
				class : 'edge fromPointArrow',
				display : 'none'
			});
			g.appendChild(startArrow);
			var endArrow = createSvgElement('path', {
				class : 'edge endPointArrow',
				display : 'none'
			});
			g.appendChild(endArrow);

			var startRound = createSvgElement('circle', {
				class : 'edge fromPointCircle',
				cx : '0',
				cy : '0',
				r : DEFAULT_EDGE_STYRE_PROPERTY.round.radius,
				display : 'none'
			});
			g.appendChild(startRound);
			var endRound = createSvgElement('circle', {
				class : 'edge endPointCircle',
				cx : '0',
				cy : '0',
				r : DEFAULT_EDGE_STYRE_PROPERTY.round.radius,
				display : 'none'
			});
			g.appendChild(endRound);

			var startDiamond = createSvgElement('path', {
				class : 'edge fromPointDiamond',
				display : 'none'
			});
			g.appendChild(startDiamond);
			var endDiamond = createSvgElement('path', {
				class : 'edge endPointDiamond',
				display : 'none'
			});
			g.appendChild(endDiamond);

			var startRect = createSvgElement('path', {
				class : 'edge fromPointRect',
				display : 'none'
			});
			g.appendChild(startRect);
			var endRect = createSvgElement('path', {
				class : 'edge endPointRect',
				display : 'none'
			});
			g.appendChild(endRect);

			return g;
		},

		behavior : {
			/**
			 *
			 */
			_edgeTypeMap : {
				circle : function(context) {
					var circle;
					var center;
					if (context.isFrom) {
						circle = context.view.childNodes[3];
						center = context.through[0];
					} else {
						circle = context.view.childNodes[4];
						center = context.through[context.through.length - 1];
					}
					$(circle).attr({
						cx : center.x,
						cy : center.y,
						display : 'inline'
					});
				},
				circleFill : function(context) {
					var circle;
					if (context.isFrom) {
						circle = context.view.childNodes[3];
					} else {
						circle = context.view.childNodes[4];
					}
					this._edgeTypeMap['circle'].call(this, context);
					this._addClass(circle, 'fill')
				},
				arrowhead : function(context) {
					var endArrow;
					if (context.isFrom) {
						endArrow = context.view.childNodes[1];
					} else {
						endArrow = context.view.childNodes[2];
					}
					var lastIndex = context.through.length - 1;
					var path = context.through;

					var sin;
					if (context.lineLen !== 0) {
						if (path.length === 2) {
							sin = context.vy / context.lineLen;
						} else {
							var baseLen = 0;
							if (context.isFrom) {
								baseLen = this._calcEuclideanDist(path[0],
										path[1]);
								sin = (path[1].y - path[0].y) / baseLen;
								context.vx = path[1].x - path[0].x;
							} else {
								for ( var idx = path.length - 1; baseLen === 0
										&& idx > 0; idx--) {
									baseLen = this._calcEuclideanDist(
											path[lastIndex], path[idx - 1]);
								}
								sin = (path[lastIndex].y - path[lastIndex - 1].y)
										/ baseLen;
								context.vx = path[lastIndex].x
										- path[lastIndex - 1].x;
							}
						}
					} else {
						sin = context.vy
								/ this._calcEuclideanDist(
										context.fromNode.layoutPos,
										context.toNode.layoutPos);
					}
					var th = (context.vx > 0) ? Math.asin(sin) + Math.PI
							: -Math.asin(sin);

					var arrowPoint;
					if (path.length >= 2
							|| context.visibleEdgeLen < DEFAULT_ERROR_VALUE) {
						if (context.isFrom) {
							arrowPoint = {
								x : path[0].x,
								y : path[0].y
							}
						} else {
							arrowPoint = {
								x : path[lastIndex].x,
								y : path[lastIndex].y
							}
						}
					} else {
						arrowPoint = {
							x : path[0].x,
							y : path[0].y
						}
						th = th - Math.PI;
					}

					var len = 10;
					var pi6 = Math.PI / 6;
					var direction = 1;
					if (context.isFrom) {
						direction = -1;
					}
					var hx1 = arrowPoint.x + direction * len
							* Math.cos(th - pi6);
					var hy1 = arrowPoint.y + direction * len
							* Math.sin(th - pi6);
					var hx2 = arrowPoint.x + direction * len
							* Math.cos(th + pi6);
					var hy2 = arrowPoint.y + direction * len
							* Math.sin(th + pi6);

					var propArray = new Array();
					propArray.push(formatStr('M {0} {1}', hx1, hy1));
					propArray.push(formatStr('L {0} {1}', arrowPoint.x,
							arrowPoint.y));
					propArray.push(formatStr('L {0} {1}', hx2, hy2));
					$(endArrow).attr({
						d : propArray.join(" "),
						display : 'inline'
					});
				},
				arrowheadFill : function(context) {
					this._edgeTypeMap['arrowhead'].call(this, context);
					var endArrow;
                    if (context.isFrom) {
                        endArrow = context.view.childNodes[1];
                    } else {
                        endArrow = context.view.childNodes[2];
                    }
					this._addClass(endArrow, 'fill')
				},
				diamond : function(context) {
					var edgeDiamond;
					if (context.isFrom) {
						edgeDiamond = context.view.childNodes[5];
					} else {
						edgeDiamond = context.view.childNodes[6];
					}
					var lastIndex = context.through.length - 1;
					var path = context.through;

					var sin;
					if (context.lineLen !== 0) {
						if (path.length === 2) {
							sin = context.vy / context.lineLen;
						} else {
							var baseLen = 0;
							for ( var idx = path.length - 1; baseLen === 0
									&& idx > 0; idx--) {
								baseLen = this._calcEuclideanDist(
										path[lastIndex], path[idx - 1]);
							}
							sin = (path[lastIndex].y - path[lastIndex - 1].y)
									/ baseLen;
							context.vx = path[lastIndex].x
									- path[lastIndex - 1].x;
						}
					} else {
						sin = context.vy
								/ this._calcEuclideanDist(
										context.fromNode.layoutPos,
										context.toNode.layoutPos);
					}
					var th = (context.vx > 0) ? Math.asin(sin) + Math.PI
							: -Math.asin(sin);

					var arrowPoint;
					if (path.length >= 2
							|| context.visibleEdgeLen < DEFAULT_ERROR_VALUE) {
						if (context.isFrom) {
							arrowPoint = {
								x : path[0].x,
								y : path[0].y
							}
						} else {
							arrowPoint = {
								x : path[lastIndex].x,
								y : path[lastIndex].y
							}
						}
					} else {
						arrowPoint = {
							x : path[0].x,
							y : path[0].y
						}
						th = th - Math.PI;
					}

					var len = 10;
					var pi6 = Math.PI / 6;
					var direction = 1;
					if (context.isFrom) {
						direction = -1
					}
					var hx1 = arrowPoint.x + direction * len
							* Math.cos(th - pi6);
					var hy1 = arrowPoint.y + direction * len
							* Math.sin(th - pi6);
					var hx2 = arrowPoint.x + direction * len
							* Math.cos(th + pi6);
					var hy2 = arrowPoint.y + direction * len
							* Math.sin(th + pi6);

					var propArray = new Array();
					propArray.push(formatStr('M {0} {1}', hx1, hy1));
					propArray.push(formatStr('L {0} {1}', arrowPoint.x,
							arrowPoint.y));
					propArray.push(formatStr('L {0} {1}', hx2, hy2));
					if (context.isFrom) {
						propArray.push(formatStr('L {0} {1}', arrowPoint.x + 2
								* len * Math.cos(th - Math.PI), arrowPoint.y
								+ 2 * len * Math.sin(th - Math.PI)))
					} else {
						propArray.push(formatStr('L {0} {1}', arrowPoint.x - 2
								* len * Math.cos(th - Math.PI), arrowPoint.y
								- 2 * len * Math.sin(th - Math.PI)))
					}
					propArray.push(formatStr('Z'));
					$(edgeDiamond).attr({
						d : propArray.join(" "),
						display : 'inline'
					});
				},
				diamondFill : function(context) {
					this._edgeTypeMap['diamond'].call(this, context);
					var edgeDiamond;
					if (context.isFrom) {
						edgeDiamond = context.view.childNodes[5];
					} else {
						edgeDiamond = context.view.childNodes[6];
					}
					this._addClass(edgeDiamond, 'fill')
				},
				rect : function(context) {
					var edgeDiamond;
					if (context.isFrom) {
						edgeDiamond = context.view.childNodes[7];
					} else {
						edgeDiamond = context.view.childNodes[8];
					}
					var lastIndex = context.through.length - 1;
					var path = context.through;

					var sin;
					if (context.lineLen !== 0) {
						if (path.length === 2) {
							sin = context.vy / context.lineLen;
						} else {
							var baseLen = 0;
							for ( var idx = path.length - 1; baseLen === 0
									&& idx > 0; idx--) {
								baseLen = this._calcEuclideanDist(
										path[lastIndex], path[idx - 1]);
							}
							sin = (path[lastIndex].y - path[lastIndex - 1].y)
									/ baseLen;
							context.vx = path[lastIndex].x
									- path[lastIndex - 1].x;
						}
					} else {
						sin = context.vy
								/ this._calcEuclideanDist(
										context.fromNode.layoutPos,
										context.toNode.layoutPos);
					}
					var th = (context.vx > 0) ? Math.asin(sin) + Math.PI
							: -Math.asin(sin);

					var arrowPoint;
					if (path.length >= 2
							|| context.visibleEdgeLen < DEFAULT_ERROR_VALUE) {
						if (context.isFrom) {
							arrowPoint = {
								x : path[0].x,
								y : path[0].y
							}
						} else {
							arrowPoint = {
								x : path[lastIndex].x,
								y : path[lastIndex].y
							}
						}
					} else {
						arrowPoint = {
							x : path[0].x,
							y : path[0].y
						}
						th = th - Math.PI;
					}

					var len = 10;
					var pi2 = Math.PI / 2;
					var direction = 1;
					if (context.isFrom) {
						direction = -1
					}

					var v1 = {
						x : arrowPoint.x + direction * (len / 2)
								* Math.cos(th - pi2),
						y : arrowPoint.y + direction * (len / 2)
								* Math.sin(th - pi2)
					};
					var v2 = {
						x : arrowPoint.x + direction * (len / 2)
								* Math.cos(th + pi2),
						y : arrowPoint.y + direction * (len / 2)
								* Math.sin(th + pi2)
					};
					var v3 = {
						x : arrowPoint.x + direction * len * Math.cos(th)
								+ direction * (len / 2) * Math.cos(th + pi2),
						y : arrowPoint.y + direction * len * Math.sin(th)
								+ direction * (len / 2) * Math.sin(th + pi2)
					};
					var v4 = {
						x : arrowPoint.x + direction * len * Math.cos(th)
								+ direction * (len / 2) * Math.cos(th - pi2),
						y : arrowPoint.y + direction * len * Math.sin(th)
								+ direction * (len / 2) * Math.sin(th - pi2)
					};

					var propArray = new Array();
					propArray.push(formatStr('M {0} {1}', v1.x, v1.y));
					propArray.push(formatStr('L {0} {1}', v2.x, v2.y));
					propArray.push(formatStr('L {0} {1}', v3.x, v3.y));
					propArray.push(formatStr('L {0} {1}', v4.x, v4.y));
					propArray.push(formatStr('Z'));
					$(edgeDiamond).attr({
						d : propArray.join(" "),
						display : 'inline'
					});
				},
				rectFill : function(context) {
					this._edgeTypeMap['rect'].call(this, context);
					var edgeRect;
					if (context.isFrom) {
						edgeRect = context.view.childNodes[7];
					} else {
						edgeRect = context.view.childNodes[8];
					}
					this._addClass(edgeRect, 'fill')
				}
			},

			_addClass : function(object, className) {
				var currentClass = $(object).attr('class');
				var classArray = currentClass.split(" ");
				var flag = true;
				for ( var j = 0, len = classArray.length; j < len; j++) {
					if (classArray[j] === className) {
						flag = false;
						break;
					}
				}
				if (flag) {
					classArray.push(className);
				}
				$(object).attr('class', classArray.join(" "));

			},

			/**
			 * 注目してるノード(focusNode)が、注目しているエッジと交わる点の座標を計算する。
			 *
			 * @returns エッジと端点ノードが交わる点
			 */
			_getCrossPos : function(focusNodeCenter, focusNodeSize,
					oppositNodeCenter) {
				// エッジと座標軸との角度の計算
				var vx = focusNodeCenter.x - oppositNodeCenter.x;
				var vy = focusNodeCenter.y - oppositNodeCenter.y;
				var lineLen = Math
						.pow((Math.pow(vx, 2) + Math.pow(vy, 2)), 0.5);
				var sin = vy / lineLen;

				// ノードの対角線と座標軸との角度の計算
				var diagonalHeight = focusNodeSize.height / 2;
				var diagonalLen = Math.pow((Math.pow((focusNodeSize.width / 2),
						2) + Math.pow(diagonalHeight, 2)), 0.5);
				var diagonalSin = diagonalHeight / diagonalLen;

				// ノードの外周とエッジとの交点の座標値の計算
				var x;
				var y;
				var tan = Math.pow((Math.pow(sin, 2) / (1 - Math.pow(sin, 2))),
						0.5);
				if (Math.abs(sin) > diagonalSin) { // ノードの上面か下面に交点ができる
					if (vy < 0) { // 下面に交点がある
						y = focusNodeCenter.y + diagonalHeight;
					} else { // 上面に交点がある
						y = focusNodeCenter.y - diagonalHeight;
					}
					if (vx < 0) { // 第1,4象限に交点ができる
						x = focusNodeCenter.x + (diagonalHeight / tan);
					} else { // 第2,3象限に交点ができる
						x = focusNodeCenter.x - (diagonalHeight / tan);
					}
				} else { // ノードの右面か左面に交点ができる
					if (vx > 0) { // 左面に交点ができる
						x = focusNodeCenter.x - (focusNodeSize.width / 2);
					} else { // 右面に交点ができる
						x = focusNodeCenter.x + (focusNodeSize.width / 2);
					}
					if (vy < 0) {
						y = focusNodeCenter.y
								+ ((focusNodeSize.width / 2) * tan);
					} else {
						y = focusNodeCenter.y
								- ((focusNodeSize.width / 2) * tan);
					}
				}

				return {
					x : x,
					y : y
				}
			},
			/**
			 * 二つの座標の距離を計算する
			 *
			 * @returns 指定した二つの座標のユークリッド距離
			 */
			_calcEuclideanDist : function(point1, point2) {
				return Math.pow((Math.pow(point1.x - point2.x, 2) + Math.pow(
						point1.y - point2.y, 2)), 0.5);
			},

			/**
			 * 指定したノードの中心の座標を計算する
			 *
			 * @returns ノードの中心の座標
			 */
			_getNodeCenterPos : function(node, nodeSize) {
				return {
					x : node.layoutPos.x + (nodeSize.width / 2),
					y : node.layoutPos.y + (nodeSize.height / 2)
				}
			},

			_getNodeSize : function(controller, nodeId) {
				var nodeSize = controller.getNodeSize(nodeId);
				if (!nodeSize) {
					nodeSize = controller.getNodeRenderer().typicalSize;
				}
				return nodeSize;
			},

			_createLoopPath : function(node, nodeSize) {
				var path = new Array();
				path.push({
					x : node.x + (nodeSize.width / 2) + 10,
					y : node.y
				});
				path.push({
					x : node.x + (nodeSize.width / 2) + 10,
					y : node.y - (nodeSize.height / 2) - 10
				});
				path.push({
					x : node.x,
					y : node.y - (nodeSize.height / 2) - 10
				});

				return path;
			},

			_getShiftSide : function (nodeSize, side) {
				if (side === "left") {
					return -(nodeSize.width / 2);
				} else if (side === "right") {
					return nodeSize.width / 2
				} else {
					return 0;
				}
			},

			_getShiftHeith : function (nodeSize, height) {
				if (height === "upper") {
					return -(nodeSize.height / 2);
				} else if (height === "bottom") {
					return nodeSize.height / 2;
				} else {
					return 0;
				}
			},

			_analyzeAlign : function (str) {
				var subStr = str.substring(0, 2);
				var side;
				if (subStr.indexOf('l') >= 0) {
					side = "left";
				} else if (subStr.indexOf('c') >= 0) {
					side = "center";
				} else if (subStr.indexOf('r') >= 0) {
					side = "right";
				}

				var height;
				if (subStr.indexOf('u') >= 0) {
					height = "upper";
				} else if (subStr.indexOf('m') >= 0) {
					height = "middle";
				} else if (subStr.indexOf('b') >= 0) {
					height = "bottom";
				}

				return {
					side : side,
					height : height
				}
			},

			onbind : function(context) {
				var renderController = context.controller;
				var fromNode = context.fromVnode;
				var toNode = context.toVnode;
				var view = context.view;
				var vedge = context.vedge;
				// ノードがないならエッジも描画しない
				if (!toNode || !fromNode) {
					return;
				}
				var isSameNode = false;
				if (fromNode.id === toNode.id) {
					isSameNode = true;
				}

				// エッジの先頭点から終端点までの配列
				var path = null;
				var through = vedge.get('through');
				if (through || through !== null || through !== undefined) {
					path = Array.apply(null, through);
				} else {
					path = new Array();
				}

				var fromNodeSize = this._getNodeSize(renderController,
						fromNode.id);
				var toNodeSize = this._getNodeSize(renderController, toNode.id);

				var fromNodeCenter = this._getNodeCenterPos(fromNode,
						fromNodeSize);
				var toNodeCenter = this._getNodeCenterPos(toNode, toNodeSize);

				// 違うノードで、座標が完全に一致している場合は、何も表示しない
				if (!isSameNode && toNodeCenter.x === fromNodeCenter.x
						&& toNodeCenter.y === fromNodeCenter.y) {
					return;
				}

				if (path.length === 0) {
					if (isSameNode) {
						path = this._createLoopPath(fromNodeCenter,
								fromNodeSize);
						var secondPoint = path[0];
						var lastPoint = path[2];
					} else {
						var secondPoint = toNodeCenter;
						var lastPoint = fromNodeCenter;
					}
				} else {
					var secondPoint = through[0];
					var lastPoint = through[through.length - 1];
				}

				var fromParam = vedge.get('paramFrom');
				var start = {x:0, y:0};
				if (!fromParam || !fromParam.position) {
					start = this._getCrossPos(fromNodeCenter, fromNodeSize,
								secondPoint);
				} else {
					var fromPointPos;
					if (fromParam.position) {
						fromPointPos = this._analyzeAlign(fromParam.position);
					}
					if (fromPointPos.side) {
						start.x = fromNodeCenter.x + this._getShiftSide(fromNodeSize, fromPointPos.side);
						if (fromPointPos.height) {
							start.y = fromNodeCenter.y + this._getShiftHeith(fromNodeSize, fromPointPos.height);
						} else {
							start.y = fromNodeCenter.y;
						}
					} else if (fromPointPos.height) {
						start.x = fromNodeCenter.x;
						start.y = fromNodeCenter.y + this._getShiftHeith(fromNodeSize, fromPointPos.height);
					}
				}

				var toParam = vedge.get('paramTo');
				var end = {x:0, y:0};
				if (!toParam || !toParam.position) {
					end = this._getCrossPos(toNodeCenter, toNodeSize, lastPoint);
				} else {
					var toPointPos;
					if (toParam.position) {
						toPointPos = this._analyzeAlign(toParam.position);
					}
					if (toPointPos.side) {
						end.x = toNodeCenter.x + this._getShiftSide(toNodeSize, toPointPos.side);
						if (toPointPos.height) {
							end.y = toNodeCenter.y + this._getShiftHeith(toNodeSize, toPointPos.height);
						} else {
							end.y = toNodeCenter.y;
						}
					} else if (toPointPos.height) {
						end.x = toNodeCenter.x;
						end.y = toNodeCenter.y + this._getShiftHeith(toNodeSize, toPointPos.height);
					}
				}
				// ここでエッジの先頭点から終端点までの配列が完成
				path.unshift(start);
				path.push(end);

				var vx = end.x - start.x;
				var vy = end.y - start.y;

				var lineLen = 0;
				for ( var i = 0, len = path.length - 1; i < len; i++) {
					lineLen += this._calcEuclideanDist(path[i + 1], path[i]);
				}

				var fromNodeInnerLen = this._calcEuclideanDist(fromNodeCenter,
						start);
				var toNodeInnerLen = this._calcEuclideanDist(end, toNodeCenter);
				var nodeDist = this._calcEuclideanDist(fromNodeCenter,
						toNodeCenter);

				var visibleEdgeLen = Math.abs(lineLen + fromNodeInnerLen
						+ toNodeInnerLen - nodeDist);

				if (toParam) {
					var shapeTo = toParam.shape;
					if (shapeTo && this._edgeTypeMap[shapeTo]) {
						// Mapから取り出して、指定されたものを実施
						this._edgeTypeMap[shapeTo].call(this, {
							view : view,
							through : path,
							isFrom : false,
							visibleEdgeLen : visibleEdgeLen,
							lineLen : lineLen,
							vx : vx,
							vy : vy,
							fromNode : fromNode,
							toNode : toNode
						});
					} else {
						// デフォルトの矢尻を設定
						this._edgeTypeMap["arrowhead"].call(this, {
							view : view,
							through : path,
							isFrom : false,
							visibleEdgeLen : visibleEdgeLen,
							lineLen : lineLen,
							vx : vx,
							vy : vy,
							fromNode : fromNode,
							toNode : toNode
						});
					}
				}

				if (fromParam) {
					var shapeFrom = fromParam.shape;
					if (shapeFrom && this._edgeTypeMap[shapeFrom]) {
						// Mapから取り出して、処理を行う
						this._edgeTypeMap[shapeFrom].call(this, {
							view : view,
							through : path,
							isFrom : true,
							visibleEdgeLen : visibleEdgeLen,
							lineLen : lineLen,
							vx : vx,
							vy : vy,
							fromNode : fromNode,
							toNode : toNode
						});
					}// デフォルトではエッジの元は何もセットしない
				}

				// エッジのメイン部分を作成
				var mainLine = view.childNodes[0];
				if (path != null || visibleEdgeLen < DEFAULT_ERROR_VALUE
						|| isSameNode) {
					var propArray = new Array();
					propArray.push(formatStr('M {0} {1}', start.x, start.y));
					if (path.length > 2) {
						for ( var i = 1, len = path.length - 1; i < len; i++) {
							propArray.push(formatStr('L {0} {1}', path[i].x,
									path[i].y));
						}
						var point2end = this._calcEuclideanDist(path[i - 1],
								end);
						var point2center = this._calcEuclideanDist(path[i - 1],
								toNodeCenter);
						if ((toParam && toParam.position) || point2end <= point2center) {
							propArray
									.push(formatStr('L {0} {1}', end.x, end.y));
						}
					} else {
						propArray.push(formatStr('L {0} {1}', end.x, end.y));
					}
					mainLine.setAttribute('d', propArray.join(" "));
				} else {
					mainLine.setAttribute('d', "M 0 0");
				}

				var customClass = vedge.get('customClass');
				if (customClass) {
					for ( var i = 0, len = context.view.childNodes.length; i < len; i++) {
						this._addClass(context.view.childNodes[i], customClass)
					}
				}
			},

			onunbind : function(context) {
				var mainLine = context.view.childNodes[0];
				mainLine.setAttribute('d', "M 0 0");
				mainLine.setAttribute('class', 'edge');

				var startPath = context.view.childNodes[1];
				startPath.setAttribute('class', 'edge fromPointArrow');
				startPath.setAttribute('display', 'none');

				var endPath = context.view.childNodes[2];
				endPath.setAttribute('class', 'edge endPointArrow');
				endPath.setAttribute('display', 'none');

				var startCircle = context.view.childNodes[3];
				startCircle.setAttribute('class', 'edge fromPointCircle');
				startCircle.setAttribute('display', 'none');

				var endCircle = context.view.childNodes[4];
				endCircle.setAttribute('class', 'edge endPointCircle');
				endCircle.setAttribute('display', 'none');

				var startDiamond = context.view.childNodes[5];
				startCircle.setAttribute('class', 'edge fromPointDiamond');
				startCircle.setAttribute('display', 'none');

				var endDiamond = context.view.childNodes[6];
				endCircle.setAttribute('class', 'edge endPointDiamond');
				endCircle.setAttribute('display', 'none');

				var startRect = context.view.childNodes[7];
				startCircle.setAttribute('class', 'edge fromPointRect');
				startCircle.setAttribute('display', 'none');

				var endRect = context.view.childNodes[8];
				endCircle.setAttribute('class', 'edge endPointRect');
				endCircle.setAttribute('display', 'none');
			},

			onnodemove : function(context) {
				this.onbind(context);
			}

		}
	};

	/***************************************************************************
	 * @name h5.ui.components.graph.GraphController
	 * @namespace
	 **************************************************************************/
	var graphRenderController = {
		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		__name : 'h5.ui.components.graph.GraphController',

		/**
		 * グラフの描画（可視）領域のサイズが変更されたときに発生するイベント。
		 * 可視領域サイズベースなので、DOM要素の大きさが変わらなくても、setScale()等で 拡大率が変更された場合にもイベントが発生する。
		 *
		 */
		EVENT_RESIZE : 'graphResize',

		/**
		 * 描画領域がスクロールした場合に発生するイベント。 ユーザー操作によるスクロールに加え、scrollTo, scrollBy,
		 * setScaleなどのメソッド呼び出しによる スクロール処理の場合も発生する。
		 */
		EVENT_SCROLL : 'graphScroll',

		/**
		 * setScale()によって拡大率が変更されたときに発生するイベント。
		 */
		EVENT_SCALE : 'graphScale',

		/**
		 * ノードの移動時に発生するイベント。
		 */
		EVENT_NODE_MOVE : 'nodeMove',

		EVENT_NODE_DRAG_BEGIN : 'nodeDragBegin',

		EVENT_NODE_DRAG_END : 'nodeDragEnd',

		/**
		 * ノードをクリックした
		 */
		EVENT_NODE_CLICK : 'nodeClick',

		EVENT_NODE_DBLCLICK : 'nodeDblclick',

		/**
		 * エッジをクリックした
		 */
		EVENT_EDGE_CLICK : 'edgeClick',

		EVENT_EDGE_DBLCLICK : 'edgeDblclick',

		EVENT_NODE_ENTER : 'nodeEnter',

		EVENT_NODE_LEAVE : 'nodeLeave',

		EVENT_EDGE_ENTER : 'edgeEnter',

		EVENT_EDGE_LEAVE : 'edgeLeave',

		EVENT_NODE_SELECT : 'nodeSelect',

		EVENT_NODE_UNSELECT : 'nodeUnselect',

		_MAX_COMMAND_PER_LOOP : 200,

		_LAYER_SCROLL_MODE_NONE : 0,
		_LAYER_SCROLL_MODE_X : 1,
		_LAYER_SCROLL_MODE_Y : 2,
		_LAYER_SCROLL_MODE_XY : 3,

		_LAYER_NAME_EDGE : 'internalEdgeLayer',

		_PREPROCESS_EVENT_NAMES : [ 'mousedown', 'mousemove', 'mouseup',
				'mousewheel', 'touchstart', 'touchmove', 'touchend',
				'touchcancel' ],

		/**
		 * trueにすると、ユーザー操作でグラフ全体がスクロールできるようになります。 デフォルトはtrueです。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		isEnableScreenDrag : true,

		/**
		 * trueにすると、ユーザー操作で特定のノードを選んでスクロールできるようになります。 デフォルトはtrueです。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		isEnableNodeDrag : true,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root : null,

		/**
		 * { (レイヤ名): (ルートエレメント) } が入っている
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_layerRootElementMap : {},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_edgeLayerElement : null,

		_edgeLayerScrollMode : 3,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_layerRenderers : null,

		/**
		 * createView(Function), getLayoutPos(Function), behavior(Object)を持つ
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_nodeRenderer : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_nodeViewPool : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_nodeBehaviorPool : null,

		/**
		 * createView(Function), behavior(Object)を持つ
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_edgeRenderer : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_edgeViewPool : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_edgeBehaviorPool : null,

		// TODO Node:Viewをm:n (m:1でよい？？)にできるようにする
		// nodeToViewMappingFunction: null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_rendererQueue : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_vnodes : {},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_vedges : {},

		/**
		 * 表示領域の物理サイズ
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_rootSize : null, // _setRootでセット

		/**
		 * 表示領域の論理サイズ。 _rootSizeとは異なり、拡大率(scale)の影響を考慮する。
		 */
		_visibleLayoutRect : {
			x : 0,
			y : 0,
			width : 0,
			height : 0,
			scale : 1
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_nodeSortArray : null,

		/**
		 * キー：ノードID、値：{node: vnode, view: nodeView, behavior: behavior} なオブジェクト
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_visibleNodes : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_visibleEdges : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_showDirection : true,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_delegateHandlerMap : {},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_requestAnimationFrame : null,

		_nodeIdKey : null,

		_edgeIdKey : null,

		_callbackData : {},

		/**
		 * UpdateViewの実処理を行う必要があるかどうか。
		 * updateViewが呼ばれるとtrueになり、_updateViewで実際にアップデートされるとfalseになる。<br>
		 * TODO 処理キューの仕組みを入れるとキューの操作で解決できるかもしれないが、ひとまずこれで対応。
		 */
		_isUpdateViewPending : false,

		_isDrawEdgesPending : false,

		_reservedFuncArray : [],

		_lastGestureScale : 1,

		_dragMode : DRAG_MODE_NONE,

		/**
		 * ドラッグ完了後のclickイベントでノードのselect/unselectの挙動を制御するためのフラグ
		 * (clickハンドラ内で必ずfalseにセットされる)
		 */
		_isDragged : false,

		_dragTargetNode : null,

		/**
		 * 前回のマウスイベントでのマウスポジション。clientXY基準。
		 * screenXYを使うと、WebDriverでのテスト時に値がゼロになってしまうので使用しない。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_lastMousePosition : null,

		/**
		 * ドラッグ選択モード中、最後のドラッグで選択されたノードリスト。
		 * ドラッグが完了するとクリアされる。これにより、エクスプローラでshiftを押しながら 選択した時のような挙動になる。
		 */
		_lastSelectedNodes : [],

		/**
		 * ドラッグオーバーレイを削除します。
		 */
		_$dragSelectOverlay : null,

		/**
		 * ドラッグ開始時の座標(クライアント座標)です。
		 */
		_dragStartMousePosition : null,

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_isDragging : false,

		/**
		 * ドラッグ開始時点のノードのレイアウト座標を保持。 { x, y }
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_nodeDragBeginPos : null,

		/**
		 * エッジ付近にカーソルがある場合の自動スクロールタイマー
		 */
		_dragNodeEdgeScrollTimerId : null,

		_isFirstDragMove : false,

		_inited : false,

		_getVnodeById : function(id) {
			return this._vnodes[id];
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		__construct : function(context) {
			this._requestAnimationFrame = (window.requestAnimationFrame
					|| window.webkitRequestAnimationFrame
					|| window.mozRequestAnimationFrame
					|| window.msRequestAnimationFrame
					|| window.oRequestAnimationFrame || (function(
					timeoutCallback) {
				window.setTimeout(timeoutCallback, 0);
			}));

			var Pool = h5.ui.components.graph.model.ObjectPool;
			var that = this;
			this._nodeBehaviorPool = Pool.create(null, function() {
				return $.extend({}, that._nodeRenderer.behavior);
			});

			this._edgeBehaviorPool = Pool.create(null, function() {
				return $.extend({}, that._edgeRenderer.behavior);
			});

			this._nodeViewPool = Pool.create(null, function() {
				return that._nodeRenderer.createView({
					data : that._callbackData
				});
			});

			this._edgeViewPool = Pool.create(null, function(showDirection) {
				// TODO showDirectionをエッジのcreateViewのタイミングで渡されても困る？？
				return that._edgeRenderer.createView({
					showDirection : showDirection,
					data : that._callbackData
				});
			}, [ this._showDirection ]);

			if (!this._edgeRenderer) {
				this._edgeRenderer = defaultEdgeRenderer;
			}

			if (!this._nodeRenderer) {
				this._nodeRenderer = defaultNodeRenderer;
			}

			if (!this._layerRenderers) {
				this._layerRenderers = defaultLayerRenderer;
			}

			new EventDispatcher(this);
			this._rendererQueue = new h5.ui.components.graph.primitive.RendererQueue();

		},

		__init : function(context) {
			this._setRoot(this.rootElement);
			this.init();
		},

		__ready : function(context) {
			this.init();
		},

		init : function() {
			// 必要なパラメータが揃うまでは何もしない
			if (this._inited || !this._graph || !this._nodeRenderer
					|| !this._edgeRenderer || !this._layerRenderers
					|| !this._root) {
				return;
			}

			this._inited = true;

			// TODO 先に既存のビューをクリアする必要がある
			// 一旦クリア
			this._vnodes = {};
			this._vedges = {};

			this._nodeSortArray = [];
			this._visibleNodes = {};
			this._visibleEdges = {};

			var graph = this._graph;

			this._nodeIdKey = graph._nodeModel._idKey;
			this._edgeIdKey = graph._edgeModel._idKey;

			var nodeModel = graph._nodeModel;
			for ( var keys = enumKeys(nodeModel.items), i = 0, count = keys.length; i < count; i++) {
				var vn = this._createVNode(nodeModel.items[keys[i]]);
				this._nodeSortArray.push(vn);
			}

			this._nodeSortArray.sort(nodePositionComparer);

			var edgeModel = graph._edgeModel;
			for ( var keys = enumKeys(edgeModel.items), i = 0, len = keys.length; i < len; i++) {
				this._createVedge(edgeModel.items[keys[i]]);
			}

			// グラフデータの変更を検知するハンドラをgraphにバインド
			this._bindGraphHandlers();

			// レイヤを作成
			this._createLayers();

			// Node,Edgeのビヘイビアのイベントリスナーを登録
			this._registerBehaviorEventDelegates();

			this._bindRootHandlers();

			// 直ちに描画
			this.updateView(true);
		},

		addCallbackData : function(key, value) {
			this._callbackData[key] = value;
		},

		removeCallbackData : function(key) {
			if (key in this._callbackData) {
				delete this._callbackData[key];
			}
		},

		/**
		 * グラフデータをセットします。 初期化処理が行われ、グラフが描画されます。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param graph
		 */
		setGraphData : function(graph) {
			this._graph = graph;
			this.init();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setShowDirection : function(showDirection) {
			this._showDirection = showDirection;
		},

		/**
		 * 指定されたidを持つノードが画面に表示されるようにスクロールします。 ノードは画面中央に表示されます。
		 * 指定されたノードが存在しない場合は何も行いません。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param nodeId
		 */
		scrollIntoView : function(nodeId) {
			var vnode = this._vnodes[nodeId];
			if (!vnode) {
				return;
			}

			var x = vnode.layoutPos.x;
			var y = vnode.layoutPos.y;

			this._scrollTo(x, y); // イベントを出さずにスクロール
			this._updateView(); // ノードを可視領域内に持ってきたうえで即時描画（サイズ取得のため）

			var nodeSize = this.getNodeSize(nodeId);

			var cx = vnode.layoutPos.x + (nodeSize.width / 2)
					- (this._visibleLayoutRect.width / 2);

			var cy = vnode.layoutPos.y + (nodeSize.height / 2)
					- (this._visibleLayoutRect.height / 2);

			this.scrollTo(cx, cy); // こちらはイベントを出してスクロール
		},

		/**
		 * ノードの表示上のサイズを返します。
		 */
		getNodeSize : function(nodeId) {
			var visibleNode = this.getNodeView(nodeId);

			if (!visibleNode) {
				return null;
			}

			var nodeView = visibleNode.view;

			var maxW = 0, maxH = 0;

			// TODO drawNodeとコード重複
			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				var nodeLayerView = nodeView[layerName];

				if (!nodeLayerView) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				var layerRect = nodeLayerView.getBoundingClientRect();
				maxW = Math.max(maxW, layerRect.width);
				maxH = Math.max(maxH, layerRect.height);
			}

			var scale = this.getScale();

			return {
				width : maxW / scale,
				height : maxH / scale
			};
		},

		getScale : function() {
			return this._visibleLayoutRect.scale;
		},

		/**
		 * 指定された座標が原点（左上）の位置にくるようにグラフ全体をスクロールします。X軸は右が正、Y軸は下が正です。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param x
		 *            {Number} X座標
		 * @param y
		 *            {Number} Y座標
		 */
		scrollTo : function(layoutX, layoutY) {
			var scrollArg = {
				newScrollPos : {
					x : layoutX,
					y : layoutY
				},
				currentScrollPos : {
					x : this._visibleLayoutRect.x,
					y : this._visibleLayoutRect.y
				}
			};
			this.trigger(this.EVENT_SCROLL, scrollArg);
			// TODO isDefaultPreventedチェック

			this._scrollTo(layoutX, layoutY);
		},

		_scrollTo : function(layoutX, layoutY) {
			var oldScrollPos = {
				x : this._visibleLayoutRect.x,
				y : this._visibleLayoutRect.y
			};

			this._visibleLayoutRect.x = layoutX;
			this._visibleLayoutRect.y = layoutY;

			var scrollCtx = {
				controller : this,
				oldScrollPos : oldScrollPos,
				newScrollPos : this._visibleLayoutRect,
				data : this._callbackData,
				size : this._rootSize
			};

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				var layerScrMode = this._layerRootElementMap[layerName].scrollMode;

				if (layerScrMode == this._LAYER_SCROLL_MODE_NONE) {
					continue;
				}

				var layerOldScrollPos = {
					x : oldScrollPos.x,
					y : oldScrollPos.y
				};

				var layerNewScrollPos = {
					x : layoutX,
					y : layoutY
				};

				switch (layerScrMode) {
				case this._LAYER_SCROLL_MODE_X:
					layerOldScrollPos.y = 0;
					layerNewScrollPos.y = 0;
					break;
				case this._LAYER_SCROLL_MODE_Y:
					layerOldScrollPos.x = 0;
					layerNewScrollPos.x = 0;
					break;
				// XYモードの場合はx,yどちらも動く
				}

				scrollCtx.layerOldScrollPos = layerOldScrollPos;
				scrollCtx.layerNewScrollPos = layerNewScrollPos;

				var layerElem = this._layerRootElementMap[layerName].rootElement;

				var hasOnscrollFunc = false;
				if (renderer.behavior && renderer.behavior.onscroll) {
					hasOnscrollFunc = true;
				}

				// TODO もう少し整理できそう
				var doDefault = true;
				if (renderer.type == 'svg') {
					if (hasOnscrollFunc) {
						scrollCtx.layerRootElement = layerElem.childNodes[0];
						doDefault = renderer.behavior.onscroll(scrollCtx);
						if (doDefault === undefined) {
							doDefault = true;
						}
					}
					if (doDefault) {
						this._setSvgTransform(layerElem.childNodes[0],
								-layerNewScrollPos.x, -layerNewScrollPos.y);
					}
				} else {
					if (hasOnscrollFunc) {
						scrollCtx.layerRootElement = layerElem;
						doDefault = renderer.behavior.onscroll(scrollCtx);
						if (doDefault === undefined) {
							doDefault = true;
						}
					}
					if (doDefault) {
						this._setDivTransform(layerElem, -layerNewScrollPos.x,
								-layerNewScrollPos.y);
					}
				}
			}

			if (this._edgeLayerScrollMode != this._LAYER_SCROLL_MODE_NONE) {
				var ex = -layoutX;
				var ey = -layoutY;

				switch (this._edgeLayerScrollMode) {
				case this._LAYER_SCROLL_MODE_X:
					ey = 0;
					break;
				case this._LAYER_SCROLL_MODE_Y:
					ex = 0;
					break;
				// XYモードの場合はx,yどちらも動く
				}

				// TODO 仮処理
				this._setSvgTransform(this._edgeLayerElement.childNodes[0], ex,
						ey);
			}

			this.updateView();
		},

		/**
		 * 指定された座標量分だけグラフ全体をスクロールします。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param x
		 *            {Number} スクロールするX座標量
		 * @param y
		 *            {Number} スクロールするY座標量
		 */
		scrollBy : function(layoutX, layoutY) {
			this.scrollTo(this._visibleLayoutRect.x + layoutX,
					this._visibleLayoutRect.y + layoutY);
		},

		/**
		 * 現在の可視領域（レイアウト座標ベース）を取得します。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @returns {Object} {x, y, width, height, scale}からなるオブジェクト
		 */
		getVisibleLayoutRect : function() {
			return this._visibleLayoutRect;
		},

		_getLayoutPosFromScreenOffset : function(x, y) {
			var scale = this.getScale();
			var lx = this._visibleLayoutRect.x + x / scale;
			var ly = this._visibleLayoutRect.y + y / scale;
			return {
				x : lx,
				y : ly
			};
		},

		/**
		 * グラフ全体の拡大率を設定します。1の場合に 座標値＝ピクセル座標 となります。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param scale
		 *            {Number} 拡大率
		 * @param layoutCenterX
		 *            拡大の中心X座標(指定されなければ画面の中心)
		 * @param layoutCenterY
		 *            拡大の中心Y座標(指定されなければ画面の中心)
		 */
		setScale : function(scale, layoutCenterX, layoutCenterY) {
			if (this._visibleLayoutRect.scale == scale) {
				return;
			}

			var oldScale = this._visibleLayoutRect.scale;

			var newScale = scale;
			if (scale < 0) {
				newScale = 0.01;
			}

			if (layoutCenterX === undefined) {
				layoutCenterX = this._visibleLayoutRect.width / 2
						+ this._visibleLayoutRect.x;
			}
			if (layoutCenterY === undefined) {
				layoutCenterY = this._visibleLayoutRect.height / 2
						+ this._visibleLayoutRect.y;
			}

			var oldRect = {
				width : this._visibleLayoutRect.width,
				height : this._visibleLayoutRect.height
			};

			this._visibleLayoutRect.scale = newScale;
			this._visibleLayoutRect.width = this._rootSize.width / newScale;
			this._visibleLayoutRect.height = this._rootSize.height / newScale;

			var gapXRatio = (layoutCenterX - this._visibleLayoutRect.x)
					/ oldRect.width;
			var gapYRatio = (layoutCenterY - this._visibleLayoutRect.y)
					/ oldRect.height;

			var dx = (this._visibleLayoutRect.width - oldRect.width)
					* gapXRatio;
			var dy = (this._visibleLayoutRect.height - oldRect.height)
					* gapYRatio;

			this.scrollBy(-dx, -dy);

			// TODO updateRootSizeとコード重複
			var resizeArg = {
				oldSize : oldRect,
				newSize : {
					width : this._visibleLayoutRect.width, // TODO 高速化
					height : this._visibleLayoutRect.height
				}
			};
			this.trigger(this.EVENT_RESIZE, resizeArg);

			this._resizeLayers(oldRect, this._visibleLayoutRect);

			var scaleArg = {
				newScale : newScale,
				oldScale : oldScale,
				layoutVisibleRect : this._visibleLayoutRect
			};
			this.trigger(this.EVENT_SCALE, scaleArg);

			this.updateView();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_setRoot : function(element) {
			this._root = element;
			var $root = $(this._root);
			$root.css({
				overflow : 'hidden',
				position : 'relative',
				backgroundColor : '#ffffff'
			});

			this._rootSize = {};
			this._visibleLayoutRect = {
				x : 0,
				y : 0,
				width : 0,
				height : 0,
				scale : 1
			};
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setLayerRenderers : function(renderer) {
			this._layerRenderers = renderer;
			this.init();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setNodeRenderer : function(renderer) {
			this._nodeRenderer = renderer;
			this.init();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setEdgeRenderer : function(renderer) {
			this._edgeRenderer = renderer;
			this.init();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setNodeVisible : function(nodeId, isVisible) {
			var vnode = this._vnodes[nodeId];
			if (!vnode) {
				return;
			}

			// TODO falseの場合は入れなくてよい（!!で判定するようにすべきか）
			if (vnode.isVisible === undefined) {
				vnode.isVisible = true;
			}

			// TODO 可視範囲かどうかチェックする必要あり

			if (vnode.isVisible == isVisible) {
				return;
			} else if (!vnode.isVisible && isVisible) {
				// 今まで非表示だったが表示するよう変更されたとき
				this._addCommandHigh(this._drawNode, vnode);
			} else if (vnode.isVisible && !isVisible) {
				// 今まで表示だったが非表示にするよう変更されたとき
				this._addCommandHigh(this._removeNode, vnode);
			}

			vnode.isVisible = isVisible;
			this._doCommandLoop();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		setEdgeVisible : function(edgeId, isVisible) {
			// TODO エッジを個別に非表示
		},

		/**
		 * 指定されたノードIDのビューオブジェクトを返します。
		 * ノードが可視範囲に存在しない場合（＝ビューオブジェクトが存在しない場合）はnullを返します。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 * @param nodeId
		 *            ノードID
		 * @returns ビューオブジェクト（{node, view, behavior} の3つの要素を持つオブジェクト）
		 */
		getNodeView : function(nodeId) {
			var r = this._visibleNodes[nodeId];
			if (!r) {
				return null;
			}

			return r;
		},

		getNodePosition : function(nodeId) {
			var vnode = this._getVnodeById(nodeId);
			if (!vnode) {
				return null;
			}

			var node = vnode.get();
			var align = node.align;

			if (align === 'r') {
				var nodeSize = this.getNodeSize(vnode[this._nodeIdKey]);
				return vnode.layoutPos + nodeSize.width;
			}
			return vnode.layoutPos;
		},

		getNodeRenderer : function() {
			return this._nodeRenderer;
		},

		getEdgeRenderer : function() {
			return this._edgeRenderer;
		},

		/**
		 * ビューを更新します。通常はこのメソッドを呼ぶ必要はありません。
		 * （ノードやエッジの追加・削除、ウィンドウのリサイズ時は、必要に応じて自動的にビューを更新します。）
		 * 描画領域のサイズを内部的に変更した場合にのみ呼び出すようにしてください。
		 *
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		updateView : function(immediate) {
			if (immediate === true) {
				this._isUpdateViewPending = true;
				this._updateView();
				return;
			}

			if (this._isUpdateViewPending) {
				return;
			}

			this._isUpdateViewPending = true;
			this._doAtNextFrame(this._updateView);
		},

		_doAtNextFrame : function(func, args) {
			if (this._reservedFuncArray.length == 0) {
				var that = this;
				this._requestAnimationFrame.call(window, function() {
					that._doReservedFunc();
				});
			}

			this._reservedFuncArray.push([ func, args ]);
		},

		_doReservedFunc : function() {
			for ( var i = 0, count = this._reservedFuncArray.length; i < count; i++) {
				var reserved = this._reservedFuncArray.shift();
				reserved[0].apply(this, reserved[1]);
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_registerBehaviorEventDelegates : function() {
			var that = this;
			var bindBehaviorHandlers = function(behavior, selectorPrefix) {
				if (!behavior) {
					return;
				}

				if (!selectorPrefix) {
					selectorPrefix = '';
				}

				for ( var prop in behavior) {
					var func = behavior[prop];
					var lastIndex = $.trim(prop).lastIndexOf(' ');

					if (lastIndex != -1 && $.isFunction(func)) {
						var selector = selectorPrefix
								+ $.trim(prop.substring(0, lastIndex));
						var eventName = $.trim(prop.substring(lastIndex + 1,
								prop.length));
						that._registerEventDelegate(eventName, selector, func);
					}
				}
			};

			bindBehaviorHandlers(this._nodeRenderer.behavior);
			bindBehaviorHandlers(this._edgeRenderer.behavior, '.'
					+ this._LAYER_NAME_EDGE + ' ');
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_registerEventDelegate : function(eventName, selector, func) {
			if (!this._delegateHandlerMap[eventName]) {
				$(this._root).bind(eventName,
						$.proxy(this._root_delegatedHandler, this));
			}

			// リスナーのマップに追加
			if (!this._delegateHandlerMap) {
				this._delegateHandlerMap = {};
			}
			if (!this._delegateHandlerMap[eventName]) {
				this._delegateHandlerMap[eventName] = {};
			}
			this._delegateHandlerMap[eventName][selector] = func;
		},

		_containsNode : function(container, contained) {
			// SVGにネイティブ対応しているブラウザであればcompareDocumentPositionは利用可能と考えてよい
			return !!(container.compareDocumentPosition(contained) & Node.DOCUMENT_POSITION_CONTAINED_BY);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root_delegatedHandler : function(event) {
			// 必ず、いずれか1つ以上のリスナーがこのイベントを監視している

			var currentVisibility = [];

			// TODO エッジのレイヤもinitLayerでlayersに積んでしまう？？

			// エッジレイヤを含めたすべてのレイヤのルートエレメントを集める
			// インデックスが若いほうが前にあるレイヤ（よってエッジレイヤが一番最初）
			var layerRootElements = [ this._edgeLayerElement ];
			var layerNames = [ this._LAYER_NAME_EDGE ];
			for ( var i = this._layerRenderers.length - 1; i >= 0; i--) {
				layerRootElements
						.push(this._layerRootElementMap[this._layerRenderers[i].name].rootElement);
				layerNames.push(this._layerRenderers[i].name);
			}

			var eventCtx = {
				controller : this,
				event : event,
				data : this._callbackData
			};

			var isFired = false;
			for ( var i = 0, count = layerRootElements.length; i < count; i++) {
				var layerElem = layerRootElements[i];
				var layerName = layerNames[i];

				currentVisibility.push(layerElem.style.visibility);

				var target = document.elementFromPoint(event.clientX,
						event.clientY);

				// IEはレイヤーを重ねても（前のレイヤの透明部分の場合）マウスイベントが後ろのレイヤで発生する。
				// また、IEはSVGノードでcontainsメソッドを持たないが、jQuery(Sizzle)のcontainsは
				// SVGノードの場合に誤判定してしまう。
				// これらのことから、自前でcompareDocumentPosition()を使って
				// レイヤーの子要素であるかどうかを判定する。(このメソッドはSVGノードであっても正しく親子を判定する。)
				// Firefox, Chromeの場合は、レイヤーを重ねると前のレイヤでしかイベントが発生しないので、
				// targetがレイヤ自身の場合（＝そのレイヤの透明部分をクリックした場合）は
				// 結果がfalseとなり、直ちに次のレイヤの処理に移る。
				var isTargetContainedByLayer = this._containsNode(layerElem,
						target);

				if (isTargetContainedByLayer) {
					for ( var selector in this._delegateHandlerMap[event.type]) {
						// touchイベントの場合はtouchesを見ないとダメ
						// if(isTouchEvent(event.type)) {
						// var oe = event.originalEvent.touches[0];
						// var t = document.elementFromPoint(oe.clientX,
						// oe.clientY);
						// console.log(t.nodeName);
						// }

						// TODO 警告が出るが正しく動く(jQueryWTPのせい)
						if ($(target).is(selector)) {
							// ヒットした要素に対応するvnodeとviewを取得しコンテキストに設定
							var visibleObj;
							if (layerName == this._LAYER_NAME_EDGE) {
								visibleObj = this._elementToVisibleEdge(target);
								eventCtx.vedge = visibleObj.edge;
							} else {
								visibleObj = this._elementToVisibleNode(target,
										layerName);
								eventCtx.vnode = visibleObj.node;
							}
							eventCtx.view = visibleObj.view;

							// イベントターゲットを差し替える
							event.target = target;
							event.currentTarget = target;
							event.srcElement = target;

							// TODO
							// ハンドラ実行中に例外が発生すると、途中まで行ったvisibility:hiddenが復帰しなくなる。try-catch等方法考える。
							this._delegateHandlerMap[event.type][selector]
									.call(this._nodeRenderer.behavior, eventCtx);
							isFired = true;
							break;
						}
					}
				}

				layerElem.style.visibility = 'hidden';

				if (isFired) {
					break;
				}
			}

			for ( var i = 0, count = currentVisibility.length; i < count; i++) {
				layerRootElements[i].style.visibility = currentVisibility
						.shift();
			}
		},

		_elementToVisibleNode : function(elem, layerName) {
			var layerNames = [];
			var targetLayerCount = 0;
			if (layerName) {
				layerNames.push(layerName);
				targetLayerCount = 1;
			} else {
				var layerRenderer = this._layerRenderers;
				targetLayerCount = layerRenderer.length;
				for ( var i = targetLayerCount - 1; i >= 0; i--) {
					layerNames.push(layerRenderer[i].name);
				}
			}

			var visibles = this._visibleNodes;
			for ( var key in visibles) {
				var visible = visibles[key];

				for ( var i = 0; i < targetLayerCount; i++) {
					var layerView = visible.view[layerNames[i]];
					if (layerView
							&& ((layerView === elem) || this._containsNode(
									layerView, elem))) {
						return visible;
					}
				}
			}
			return null;
		},

		_elementToVisibleEdge : function(elem) {
			var visibles = this._visibleEdges;
			for ( var key in visibles) {
				var visible = visibles[key];
				var visibleView = visible.view;
				if ((visibleView === elem)
						|| this._containsNode(visibleView, elem)) {
					return visible;
				}
			}
			return null;
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_createVNode : function(node) {
			var id = node.get(this._nodeIdKey);
			var vnode = createDataItemProxy(node);

			var ctx = {
				controller : this,
				node : node,
				data : this._callbackData
			};
			var layoutPos = this._nodeRenderer.getLayoutPos(ctx);

			if (!layoutPos) {
				throw new Error(
						'ノードレンダラのgetLayoutPos()でレイアウト座標オブジェクトが返されませんでした。');
			}

			if (!isFinite(layoutPos.x) || !isFinite(layoutPos.y)) {
				throw new Error(h5.u.str.format('ノードID = {0} のレイアウト座標が不正です。',
						id));
			}

			// TODO vnodeにnodeのidをコピーする必要はない？？
			vnode[this._nodeIdKey] = id;

			vnode.layoutPos = layoutPos;
			this._vnodes[id] = vnode;

			return vnode;
		},

		_createVedge : function(edge) {
			var vedge = createDataItemProxy(edge);
			this._vedges[edge.get(this._edgeIdKey)] = vedge;
			return vedge;
		},

		_removeVedge : function(vedge) {
			var edgeId = vedge.get(this._edgeIdKey);
			delete this._vedges[edgeId];
			return vedge;
		},

		getLayoutRect : function() {
			// nodeSortArrayは常にxの小さい順にソートされている
			var xarray = this._nodeSortArray;
			var yarray = xarray.slice(0);

			// インデックスが小さい方がyの値が小さいようにソート
			yarray.sort(nodePositionComparerByYAxis);

			var left = xarray[0].layoutPos.x;
			var right = xarray[xarray.length - 1].layoutPos.x;
			var top = yarray[0].layoutPos.y;
			var bottom = yarray[yarray.length - 1].layoutPos.y;

			return {
				x : left,
				y : top,
				width : right - left,
				height : bottom - top
			};
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_bindRootHandlers : function() {
			var $root = $(this._root);

			// TODO windowへのバインドは一度だけでよい
			$(window).bind('resize', $.proxy(this._window_resizeHandler, this));

			$root.bind('mousedown', $.proxy(this._root_mousedownHandler, this));
			$root.bind('mousemove', $.proxy(this._root_mousemoveHandler, this));
			$(window).bind('mouseup',
					$.proxy(this._window_mouseupHandler, this));

			$root.bind('click', $.proxy(this._root_clickHandler, this));

			$root.bind('dblclick', $.proxy(this._root_dblclickHandler, this));

			// TODO タッチサポートがある場合だけバインド
			$root.bind('touchstart', $
					.proxy(this._root_touchstartHandler, this));
			$root.bind('touchmove', $.proxy(this._root_touchmoveHandler, this));
			$(window).bind('touchend',
					$.proxy(this._window_touchendHandler, this));
			$(window).bind('touchcancel',
					$.proxy(this._window_touchcancelHandler, this));

			$root.bind('gesturestart', $.proxy(this._root_gesturestartHandler,
					this));
			$root.bind('gesturechange', $.proxy(
					this._root_gesturechangeHandler, this));

			// TODO Firefox対応(DOMMouseScroll)
			$root.bind('mousewheel', $
					.proxy(this._root_mousewheelHandler, this));
		},

		_root_gesturestartHandler : function(event) {
			event.preventDefault();
			this._lastGestureScale = event.originalEvent.scale;
		},

		_root_gesturechangeHandler : function(event) {
			event.preventDefault();
			var newScale = this.getScale()
					+ (event.originalEvent.scale - this._lastGestureScale);
			this.setScale(newScale);
			this._lastGestureScale = event.originalEvent.scale;
		},

		_root_mousewheelHandler : function(event) {
			// 下に回すとwheelDeltaはマイナス

			event.preventDefault();

			// TODO どの操作でどうするかは要検討
			if (event.shiftKey) {
				// シフトキーが押されていたら拡大縮小
				var ds = 0.1;
				if (event.originalEvent.wheelDelta < 0) {
					ds *= -1;
				}

				var rootOffset = $(this.rootElement).offset();
				var cx = event.originalEvent.pageX - rootOffset.left;
				var cy = event.originalEvent.pageY - rootOffset.top;

				var scaleCenter = this._getLayoutPosFromScreenOffset(cx, cy);

				this.setScale(this._visibleLayoutRect.scale + ds,
						scaleCenter.x, scaleCenter.y);
				return;
			}

			// スクロールする
			var dy = 40;
			if (event.originalEvent.wheelDelta < 0) {
				dy *= -1;
			}
			this.scrollBy(0, dy);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_window_resizeHandler : function(event) {
			if (!this._root) {
				return;
			}

			var $root = $(this._root);
			var w = $root.innerWidth();
			var h = $root.innerHeight();

			if ((this._rootSize.width != w) || (this._rootSize.height != h)) {
				this.updateView();
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_isNode : function(event) {
			if (event.target !== this._root) {
				return true;
			}
			return false;
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_getActualTarget : function(event) {
			return this._getActualTargetAt(event.clientX, event.clientY);
		},

		_getActualTargetAt : function(clientX, clientY) {
			// TODO elementToVisibleで判定までやって、そのあとハンドラをクリックするようにするのがよさそう
			// delegatedHandlerと処理を統合すべき

			var currentVisibility = [];

			var layerRootElements = [ this._edgeLayerElement ];
			for ( var i = this._layerRenderers.length - 1; i >= 0; i--) {
				layerRootElements
						.push(this._layerRootElementMap[this._layerRenderers[i].name].rootElement);
			}

			var layerName = null;
			var isEdgeElement = false;
			var actualTarget = null;
			for ( var i = 0, count = layerRootElements.length; i < count; i++) {
				var layerElem = layerRootElements[i];

				var target = document.elementFromPoint(clientX, clientY);

				// IEはレイヤーを重ねても（前のレイヤの透明部分の場合）マウスイベントが後ろのレイヤで発生する。
				// また、IEはSVGノードでcontainsメソッドを持たないが、jQuery(Sizzle)のcontainsは
				// SVGノードの場合に誤判定してしまう。
				// これらのことから、自前でcompareDocumentPosition()を使って
				// レイヤーの子要素であるかどうかを判定する。(このメソッドはSVGノードであっても正しく親子を判定する。)
				// Firefox, Chromeの場合は、レイヤーを重ねると前のレイヤでしかイベントが発生しないので、
				// targetがレイヤ自身の場合（＝そのレイヤの透明部分をクリックした場合）は
				// 結果がfalseとなり、直ちに次のレイヤの処理に移る。
				var isTargetContainedByLayer = this._containsNode(layerElem,
						target);

				if (!isTargetContainedByLayer) {
					currentVisibility.push(layerElem.style.visibility);
					layerElem.style.visibility = 'hidden';
					continue;
				}

				// ノードまたはエッジにヒットした

				actualTarget = target;

				if (layerElem === this._edgeLayerElement) {
					isEdgeElement = true;
				} else {
					layerName = this._layerRenderers[count - i - 1].name;
				}

				break;
			}

			for ( var i = 0, count = currentVisibility.length; i < count; i++) {
				layerRootElements[i].style.visibility = currentVisibility
						.shift();
			}

			if (!actualTarget) {
				return null;
			}

			var visible;
			if (isEdgeElement) {
				visible = this._elementToVisibleEdge(actualTarget);
			} else {
				visible = this._elementToVisibleNode(actualTarget, layerName);
			}

			if (!visible) {
				// レイヤーに（ノード・エッジ以外の）独自要素がある場合に
				// 「クリックされた要素はいずれかのレイヤーの子要素だったが、
				// しかしノードでもエッジでもない」という場合が存在しうる。
				// そのため、visibleが返ってこなかった場合はターゲットなしとしてnullを返す。
				return null;
			}

			var ret = {
				targetElement : actualTarget,
				isEdge : isEdgeElement, // エッジでなければ必ずノード(本当はtype等にすべきかもしれないが、現状ではノードかエッジのみ)
				visible : visible
			};
			return ret;
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root_mousedownHandler : function(event) {
			if (!this.isEnableScreenDrag && !this.isEnableNodeDrag) {
				return;
			}

			event.preventDefault();

			this._prepareDrag(event);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root_mousemoveHandler : function(event) {
			if (!this._isDragging) {
				this._handleEnterLeave(event);
				return;
			}

			event.preventDefault();

			this._drag(event);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_window_mouseupHandler : function(event) {
			if (!this._isDragging) {
				return;
			}
			this._endDrag(event);
		},

		_root_clickHandler : function(event) {
			if (this._isDragged) {
				// ドラッグ直後のclickイベントは無視する
				this._isDragged = false;
				return;
			}

			var actual = this._getActualTarget(event);

			var isExclusive = !event.ctrlKey;

			if (!actual) {
				// actualがnullということは、エッジ・ノードもクリックされていない

				if (isExclusive) {
					// 排他的操作の場合、全選択ノードを解除
					this.unselectNodeAll();
				}

				return;
			}

			var evName, arg;
			if (actual.isEdge) {
				evName = this.EVENT_EDGE_CLICK;
				arg = {
					edge : actual.visible.edge,
					view : actual.visible.view,
					fromNode : actual.visible.fromNode, // from, toもvnode
					toNode : actual.visible.toNode
				};
			} else {
				evName = this.EVENT_NODE_CLICK;
				arg = {
					vnode : actual.visible.node,
					view : actual.visible.view
				};
			}

			this.trigger(evName, arg);

			if (!actual.isEdge) {
				var nodeId = actual.visible.node.get(this._nodeIdKey);

				if (isExclusive) {
					this.selectNode(nodeId, isExclusive);
				} else {
					this.toggleSelectNode(nodeId);
				}
			}
		},

		_root_dblclickHandler : function(event) {
			var actual = this._getActualTarget(event);

			if (!actual) {
				// actualがnullということは、エッジ・ノードもクリックされていない
				return;
			}

			var evName, arg;
			if (actual.isEdge) {
				evName = this.EVENT_EDGE_DBLCLICK;
				arg = {
					edge : actual.visible.edge,
					view : actual.visible.view,
					fromNode : actual.visible.fromNode, // from, toもvnode
					toNode : actual.visible.toNode
				};
			} else {
				evName = this.EVENT_NODE_DBLCLICK;
				arg = {
					vnode : actual.visible.node,
					view : actual.visible.view
				};
			}

			this.trigger(evName, arg);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root_touchstartHandler : function(event) {
			if (!this.isEnableScreenDrag) { // TODO isEnableNodeDragも判定する必要あり
				return;
			}

			event.preventDefault();
			this._prepareDrag(event.originalEvent.touches[0]);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_root_touchmoveHandler : function(event) {
			if (!this._isDragging) {
				return;
			}
			event.preventDefault();
			this._drag(event.originalEvent.touches[0]);

		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_window_touchendHandler : function(event) {
			if (!this._isDragging) {
				return;
			}

			this._endDrag(event);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_window_touchcancelHandler : function(event) {
			if (!this._isDragging) {
				return;
			}

			this._endDrag(event);
		},

		_lastEnterSrc : null,

		/**
		 * ノードのホバーイベントを起こします。 (エッジも対応可能ですが、現時点ではノードのみを対象にしています。
		 * エッジを対象にするとヒット判定を領域的に判定するのが難しくなるため、 将来的なAPI互換性のため対応を保留しています。)
		 */
		_handleEnterLeave : function(event) {
			var actual = this._getActualTarget(event);

			if (actual && actual.isEdge) {
				// エッジは「ノードのない位置」扱いとする
				actual = null;
			}

			if (this._lastEnterSrc && !actual) {
				// ノード上からノードのない位置に移動した
				this._triggerNodeEnterLeaveEvent(this.EVENT_NODE_LEAVE,
						this._lastEnterSrc);
			} else if (this._lastEnterSrc
					&& this._lastEnterSrc.visible !== actual.visible) {
				// 別のノードに移動した
				this._triggerNodeEnterLeaveEvent(this.EVENT_NODE_LEAVE,
						this._lastEnterSrc);
				this._triggerNodeEnterLeaveEvent(this.EVENT_NODE_ENTER, actual);
			} else if (!this._lastEnterSrc && actual) {
				// ノードのない位置からノード上に移動した
				this._triggerNodeEnterLeaveEvent(this.EVENT_NODE_ENTER, actual);
			}
			// mousemove前後で同じノードだった、またはノードのない位置での移動だった＝何もしない

			this._lastEnterSrc = actual;
		},

		_triggerNodeEnterLeaveEvent : function(evName, src) {
			arg = {
				vnode : src.visible.node,
				view : src.visible.view
			};
			this.trigger(evName, arg);
		},

		moveNodeTo : function(nodeId, layoutX, layoutY, fix) {
			var vnode = this._getVnodeById(nodeId);

			var dx = layoutX - vnode.layoutPos.x;
			var dy = layoutY - vnode.layoutPos.y;
			this.moveNodeBy(vnode.get(this._nodeIdKey), dx, dy, fix);
		},

		/**
		 * @param fix
		 *            デフォルト：true
		 */
		moveNodeBy : function(nodeId, dLayoutX, dLayoutY, fix) {
			var vnode = this._getVnodeById(nodeId);

			var oldLayoutX = vnode.layoutPos.x;
			var oldLayoutY = vnode.layoutPos.y;

			vnode.layoutPos.x += dLayoutX;
			vnode.layoutPos.y += dLayoutY;

			this._updateVisibleNodePos(this.getNodeView(nodeId));

			var relatedEdges = this._graph.getRelatedEdges(nodeId);
			this._updateVisibleEdgePos(relatedEdges);

			if (fix !== false) {
				this._nodeSortArray.splice($
						.inArray(vnode, this._nodeSortArray), 1);
				sortedInsert(this._nodeSortArray, vnode, nodePositionComparer);
			}

			var layoutPos = vnode.layoutPos;

			var nodeMoveArg = {
				vnode : vnode,
				layoutX : layoutPos.x,
				layoutY : layoutPos.y,
				oldLayoutX : oldLayoutX,
				oldLayoutY : oldLayoutY
			};
			this.trigger(this.EVENT_NODE_MOVE, nodeMoveArg);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_prepareDrag : function(event) {
			this._lastMousePosition = {
				x : event.clientX,
				y : event.clientY
			};

			this._dragStartMousePosition = {
				x : event.clientX,
				y : event.clientY
			};

			this._isDragging = true;

			var actualTarget = this._getActualTarget(event);
			if (actualTarget && !actualTarget.isEdge) {
				this._dragTargetNode = actualTarget.visible;
				if (this._dragTargetNode) {
					var dragTargetVnode = this._dragTargetNode.node;

					this._isFirstDragMove = true;

					this._dragMode = DRAG_MODE_NODE;
					this._nodeDragBeginPos = {
						x : dragTargetVnode.layoutPos.x,
						y : dragTargetVnode.layoutPos.y
					};
				}
			} else if (event.shiftKey) {
				this._dragMode = DRAG_MODE_SELECT;
				this._$dragSelectOverlay = $(TMPL_DRAG_SELECT_OVERLAY);

				this._lastSelectedNodes = [];

				var rootOffset = $(this.rootElement).offset();
				var overlayTop = event.pageY - rootOffset.top;
				var overlayLeft = event.pageX - rootOffset.left;

				this._$dragSelectOverlay.css({
					top : overlayTop,
					left : overlayLeft,
					width : 0,
					height : 0
				}).appendTo(this.rootElement);
			} else {
				this._dragMode = DRAG_MODE_SCROLL;
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_drag : function(event) {
			// マウス座標＝"見た目"での移動量が必要なので、ここでscaleを計算する
			var dx = (event.clientX - this._lastMousePosition.x)
					/ this._visibleLayoutRect.scale;
			var dy = (event.clientY - this._lastMousePosition.y)
					/ this._visibleLayoutRect.scale;

			this._lastMousePosition.x = event.clientX;
			this._lastMousePosition.y = event.clientY;

			if (this._dragMode === DRAG_MODE_NODE) {
				this._dragNode(event, dx, dy);
			} else if (this._dragMode === DRAG_MODE_SCROLL) {
				this.scrollBy(-dx, -dy);
			} else if (this._dragMode === DRAG_MODE_SELECT) {
				this._dragSelect(event);
			}

			// 一度でもmousemoveが起きたら、ドラッグがあったとする
			this._isDragged = true;
		},

		_dragNode : function(event, dx, dy) {
			if (this._isFirstDragMove) {
				// 最初のムーブが起きたときに初めてNODE_DRAG_BEGINイベントを出す
				// mousedownのタイミングではBEGINしないようにする
				this._isFirstDragMove = false;

				var evArg = {
					vnode : this._dragTargetNode.node,
					beginLayoutPos : this._nodeDragBeginPos
				};
				this.trigger(this.EVENT_NODE_DRAG_BEGIN, evArg);
			}

			var edgePos = getEdgePosition(this.rootElement, event.pageX,
					event.pageY, 15);

			if (edgePos === RANGE_OUT) {
				// 外部の場合は何もしない
				return;
			}

			// エッジ付近の場合も、マウス位置に追従するようにノードを動かす
			this.moveNodeBy(this._dragTargetNode.node.get(this._nodeIdKey), dx,
					dy, false);

			if (edgePos === RANGE_IN) {
				// 内部＝自動エッジスクロール停止
				this._endContinuousEdgeScroll();
			} else {
				// 自動エッジスクロールを開始
				this._beginContinuousEdgeScroll(edgePos);
			}
		},

		_endContinuousEdgeScroll : function() {
			if (this._dragNodeEdgeScrollTimerId) {
				clearInterval(this._dragNodeEdgeScrollTimerId);
				this._dragNodeEdgeScrollTimerId = null;
			}
		},

		_beginContinuousEdgeScroll : function(edgePos) {
			var dx = 0, dy = 0;

			if (edgePos.indexOf('n') !== -1) {
				dy = -EDGE_SCROLL_VALUE;
			} else if (edgePos.indexOf('s') !== -1) {
				dy = EDGE_SCROLL_VALUE;
			}

			if (edgePos.indexOf('w') !== -1) {
				dx = -EDGE_SCROLL_VALUE;
			} else if (edgePos.indexOf('e') !== -1) {
				dx = EDGE_SCROLL_VALUE;
			}

			var that = this;
			var nodeId = this._dragTargetNode.node.get(this._nodeIdKey);

			function edgeScroll() {
				that.scrollBy(dx, dy);
				that.moveNodeBy(nodeId, dx, dy, false);
			}

			edgeScroll();

			if (this._dragNodeEdgeScrollTimerId) {
				clearInterval(this._dragNodeEdgeScrollTimerId);
			}

			this._dragNodeEdgeScrollTimerId = setInterval(edgeScroll,
					EDGE_SCROLL_INTERVAL);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_endDrag : function(context) {
			if (this._dragMode === DRAG_MODE_NODE && !this._isFirstDragMove) {
				// isFirstDragMoveがfalse ＝ 一度以上mousemoveが起きた
				// ＝ドラッグ操作が起きた、ということ
				// ドラッグが何も行われていなければ、再ソートは不要

				// ノードのドラッグだったらノードの位置順のソートを再呼び出しする。
				// nodeSortArrayドラッグしていたノードを外して、再挿入する。
				this._nodeSortArray.splice($.inArray(this._dragTargetNode.node,
						this._nodeSortArray), 1);
				sortedInsert(this._nodeSortArray, this._dragTargetNode.node,
						nodePositionComparer);

				var dragTargetVnode = this._dragTargetNode.node;

				var ev = {
					vnode : dragTargetVnode,
					beginLayoutPos : {
						x : this._nodeDragBeginPos.x,
						y : this._nodeDragBeginPos.y
					},
					endLayoutPos : {
						x : dragTargetVnode.layoutPos.x,
						y : dragTargetVnode.layoutPos.y
					}
				};
				this.trigger(this.EVENT_NODE_DRAG_END, ev);

				this._nodeDragBeginPos = null;
			} else if (this._dragMode === DRAG_MODE_SELECT) {
				this._$dragSelectOverlay.remove();
				this._$dragSelectOverlay = null;
			}

			this._endContinuousEdgeScroll();

			this._dragStartMousePosition = null;
			this._isDragging = false;
			this._dragMode = DRAG_MODE_NONE;
			this._lastSelectedNodes = [];
			this._isFirstDragMove = false;
			this._dragTargetNode = null;
			this._lastMousePosition = null;
		},

		_dragSelect : function(event) {
			var region = this._getDragSelectRegion(event);

			var layoutTopLeft = this._getLayoutPosFromScreenOffset(region.x,
					region.y);
			var layoutBottomRight = this._getLayoutPosFromScreenOffset(region.x
					+ region.width, region.y + region.height);

			var x = layoutTopLeft.x;
			var y = layoutTopLeft.y;
			var width = layoutBottomRight.x - x;
			var height = layoutBottomRight.y - y;

			var selectedNodes = this._getNodesInRegion(x, y, width, height,
					false);

			var unselectNodes = this._lastSelectedNodes;

			for ( var i = 0, len = selectedNodes.length; i < len; i++) {
				var node = selectedNodes[i];

				this.selectNode(node.get(this._nodeIdKey));

				var idx = $.inArray(node, unselectNodes);
				if (idx !== -1) {
					unselectNodes[idx] = null;
				}
			}

			for ( var i = 0, len = unselectNodes.length; i < len; i++) {
				var unselectNode = unselectNodes[i];
				if (unselectNode) {
					this.unselectNode(unselectNode.get(this._nodeIdKey));
				}
			}

			this._lastSelectedNodes = selectedNodes;

			// 内部処理でエラーが起きたときにオーバーレイ表示が更新されないよう、表示更新は最後に行う
			this._$dragSelectOverlay.css({
				top : region.y,
				left : region.x,
				width : region.width,
				height : region.height
			});
		},

		_getDragSelectRegion : function(event) {
			var rootOffset = $(this.rootElement).offset();
			var ry = event.pageY - rootOffset.top; // r = relative
			var rx = event.pageX - rootOffset.left;

			var dx = rx - this._dragStartMousePosition.x;
			var dy = ry - this._dragStartMousePosition.y;

			var x, y, w, h;

			if (dx < 0) {
				x = rx;
				w = -dx;
			} else {
				x = this._dragStartMousePosition.x;
				w = dx;
			}

			if (dy < 0) {
				y = ry;
				h = -dy;
			} else {
				y = this._dragStartMousePosition.y;
				h = dy;
			}

			return {
				x : x,
				y : y,
				width : w,
				height : h
			};
		},

		_updateVisibleNodePos : function(visibleNode) {
			if (!visibleNode) {
				return;
			}

			var nodeView = visibleNode.view;
			var layoutX = visibleNode.node.layoutPos.x;
			var layoutY = visibleNode.node.layoutPos.y;

			var vnode = visibleNode.node;
			var alignment;
			if (this._nodeRenderer.getAlignment) {
				var alignment = this._nodeRenderer.getAlignment({vnode: vnode});
			}
			var nodeSize;
			if (alignment === 'r') {
				nodeSize = this.getNodeSize(vnode[this._nodeIdKey]);
			}

			// TODO drawNodeとコード重複
			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				if (!nodeView[layerName]) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				if (renderer.type == 'svg') {
					this._setTranslate(nodeView[layerName], layoutX, layoutY);
				} else {
					// divの場合
					$(nodeView[layerName]).css({
						// TODO このあたりの設定はどこに持たせるか再考
						position : 'absolute',
						left : layoutX,
						top : layoutY
					});
				}
			}
		},

		_updateVisibleEdgePos : function(edges) {
			if (!edges || (!edges.from && !edges.to)) {
				return;
			}

			var that = this;

			// TODO 関数を外部に出すべきか
			var fireNodeMove = function(edgeArray) {
				for ( var i = 0, count = edgeArray.length; i < count; i++) {
					var edge = edgeArray[i];
					var edgeId = edge.get(that._edgeIdKey);

					var endpoint = that._graph.getEndpointNodeId(edgeId);

					endpoint.fromId;

					var fromVnode = that._vnodes[edge
							.get(that._graph._fromNodeIdKey)]; // that._vnodes[endpoint.fromId];
					// //that._vnodes[edge.get(this._graph._fromNodeIdKey)];
					var toVnode = that._vnodes[edge
							.get(that._graph._toNodeIdKey)]; // that._vnodes[edge.get(this._graph._toNodeIdKey)];
					// //
					// that._vnodes[endpoint.toId];

					if (edgeId in that._visibleEdges) {
						var visibleEdge = that._visibleEdges[edgeId];

						var fromEdgeCtx = {
							controller : that,
							fromVnode : fromVnode,
							toVnode : toVnode,
							vedge : visibleEdge.edge,
							view : visibleEdge.view,
							data : that._callbackData
						};

						if (visibleEdge.behavior
								&& visibleEdge.behavior.onnodemove) {
							visibleEdge.behavior.onnodemove(fromEdgeCtx);
						}
					}
				}
			};

			if (edges.from) {
				fireNodeMove(edges.from);
			}

			if (edges.to) {
				fireNodeMove(edges.to);
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_bindGraphHandlers : function() {
			var that = this;

			this._graph.addEventListener('nodeAdd', function(event) {
				that._graph_nodeAddHandler(event);
			});
			this._graph.addEventListener('nodeChange', function(event) {
				that._graph_nodeChangeHandler(event);
			});
			this._graph.addEventListener('nodeRemove', function(event) {
				that._graph_nodeRemoveHandler(event);
			});
			this._graph.addEventListener('edgeAdd', function(event) {
				that._graph_edgeAddHandler(event);
			});
			this._graph.addEventListener('edgeChange', function(event) {
				that._graph_edgeChangeHandler(event);
			});
			this._graph.addEventListener('edgeRemove', function(event) {
				that._graph_edgeRemoveHandler(event);
			});
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_nodeAddHandler : function(event) {
			var node = event.node;
			var vn = this._createVNode(node);
			sortedInsert(this._nodeSortArray, vn, nodePositionComparer);

			// TODO ここでアップデートするのは負荷が高いのでvisibleRangeを見てdrawNodeするのがよい
			this.updateView();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_nodeChangeHandler : function(event) {
			var nodeId = event.node.get(this._nodeIdKey);

			if (nodeId in this._visibleNodes) {
				var visibleNode = this._visibleNodes[nodeId];
				if (visibleNode.behavior && visibleNode.behavior.ondataupdate) {
					var ctx = {
						controller : this,
						vnode : visibleNode.node,
						view : visibleNode.view,
						data : this._callbackData
					};
					visibleNode.behavior.ondataupdate(ctx);
				}
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_nodeRemoveHandler : function(event) {
			var nodeIdKey = this._nodeIdKey;

			var nodeId = event.node.get(nodeIdKey);

			// TODO 高速化の余地あり
			for ( var i = 0, count = this._nodeSortArray.length; i < count; i++) {
				if (this._nodeSortArray[i][nodeIdKey] == nodeId) {
					this._nodeSortArray.splice(i, 1);
					break;
				}
			}

			if (nodeId in this._visibleNodes) {
				var visibleNode = this._visibleNodes[nodeId];
				this._removeNode(visibleNode.node);
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_edgeAddHandler : function(event) {
			var edge = event.edge;

			var vedge = this._createVedge(edge);

			if (this._isDrawEdgesPending) {
				return;
			}
			this._isDrawEdgesPending = true;

			var that = this;
			this._doAtNextFrame(function() {
				that._isDrawEdgesPending = false;
				// TODO 高速化の余地あり
				that._drawEdges();
			});
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_edgeChangeHandler : function(event) {
			// 現状ではエッジの変更通知イベントはない
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_graph_edgeRemoveHandler : function(event) {
			var vedge = this._vedges[event.edge.get(this._edgeIdKey)];

			if (!vedge) {
				return;
			}

			this._removeVisibleEdge(vedge);
			this._removeVedge(vedge);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_createLayers : function() {
			if (!this._layerRenderers) {
				// TODO
				// this.throwError()メソッド等あるとよいかもしれない(ControllerErrorクラスでエラーを投げる等)
				throw new Error('レイヤレンダラが指定されていません。最低１つ以上のレイヤが必要です。');
			}

			var that = this;

			var createLayer = function(type, name) {
				switch (type) {
				case 'svg':
					var svg = createSvgElement('svg', {
						width : '100%',
						height : '100%',
						class : name
					}); // TODO width, heightを100%にするべきか

					svg.style.position = 'absolute';
					svg.style.top = '0px';
					svg.style.left = '0px';

					var g = createSvgElement('g');
					svg.appendChild(g);

					return svg;
				case 'div':
					var div = document.createElement('div');
					$div = $(div);
					// TODO このあたりの設定はどこに持たせるか再考
					$div.css({
						position : 'absolute',
						top : 0,
						left : 0,
						width : '100%',
						height : '100%',
						'-webkit-transform-origin' : '0% 0%', // CSS3
						// Transformのデフォルトは中心なのでSVGに合わせて左上にする
						'-moz-transform-origin' : '0% 0%',
						'-ms-transform-origin' : '0% 0%',
					});
					$div.addClass(name);
					return div;
				default:
					throw new Error('レイヤのtypeはsvg,divのどちらかを指定してください。');
				}
			};

			var scrModeToVal = function(mode) {
				switch (mode) {
				case 'x':
					return that._LAYER_SCROLL_MODE_X;
				case 'y':
					return that._LAYER_SCROLL_MODE_Y;
				case 'none':
					return that._LAYER_SCROLL_MODE_NONE;
				default:
					return that._LAYER_SCROLL_MODE_XY;
				}
			};

			var initCtx = {
				controller : this,
				data : this._callbackData,
				size : this._rootSize
			};

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var elem = createLayer(renderer.type, renderer.name);

				var scrMode = scrModeToVal(renderer.scrollMode);

				this._layerRootElementMap[renderer.name] = {
					rootElement : elem,
					scrollMode : scrMode
				};
				this._root.appendChild(elem);

				if (renderer.behavior && renderer.behavior.oninit) {
					if (renderer.type == 'svg') {
						initCtx.layerRootElement = elem.childNodes[0];
						renderer.behavior.oninit(initCtx);
					} else {
						// divの場合
						initCtx.layerRootElement = elem;
						renderer.behavior.oninit(initCtx);
					}
				}
			}

			this._edgeLayerScrollMode = scrModeToVal(this._edgeRenderer.scrollMode);

			// エッジ用のレイヤは固定的に一番上に配置
			this._edgeLayerElement = createLayer('svg', this._LAYER_NAME_EDGE);
			this._root.appendChild(this._edgeLayerElement);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_updateRootSize : function() {
			var $root = $(this._root);

			var w = $root.innerWidth();
			var h = $root.innerHeight();

			if ((this._rootSize.width != w) || (this._rootSize.height != h)) {
				var oldW = this._visibleLayoutRect.width;
				var oldH = this._visibleLayoutRect.height;

				this._rootSize.width = w;
				this._rootSize.height = h;

				this._visibleLayoutRect.width = w
						/ this._visibleLayoutRect.scale;
				this._visibleLayoutRect.height = h
						/ this._visibleLayoutRect.scale;

				var oldSize = {
					width : oldW,
					height : oldH
				};

				var resizeArg = {
					oldSize : oldSize,
					newSize : {
						width : this._visibleLayoutRect.width, // TODO 高速化
						height : this._visibleLayoutRect.height
					}
				};
				this.trigger(this.EVENT_RESIZE, resizeArg);

				this._resizeLayers(oldSize, this._visibleLayoutRect);
			}
		},

		_resizeLayers : function(oldSize, newSize) {
			// TODO newSizeは、Rect（x,y,w,h）になる予定

			var layerRenderers = this._layerRenderers;

			if (!layerRenderers || (layerRenderers.length == 0)) {
				return;
			}

			var resizeCtx = {
				controller : this,
				oldSize : oldSize,
				newSize : newSize,
				data : this._callbackData
			};

			// TODO scrollToとコード少し重複

			for ( var i = 0, count = layerRenderers.length; i < count; i++) {
				var renderer = layerRenderers[i];
				var layerElem = this._layerRootElementMap[renderer.name].rootElement;

				if (!renderer.behavior || !renderer.behavior.onresize) {
					continue;
				}

				// TODO もう少し整理できそう
				if (renderer.type == 'svg') {
					resizeCtx.layerRootElement = layerElem.childNodes[0];
				} else {
					resizeCtx.layerRootElement = layerElem;
				}

				renderer.behavior.onresize(resizeCtx);
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_updateView : function() {
			// this.log.debug('_updateView called');

			if (!this._isUpdateViewPending) {
				// updateViewが予約されていたものの、
				// そのあと何かのタイミングですでにアップデートが行われたので再度計算する必要がない
				return;
			}

			this._isUpdateViewPending = false;

			this._updateRootSize();

			var margin = this._rootSize.width / this._visibleLayoutRect.scale;

			// 可視範囲を計算
			var startLayoutX = this._visibleLayoutRect.x
					- this._nodeRenderer.typicalSize.width
					/ this._visibleLayoutRect.scale - margin;
			var startLayoutY = this._visibleLayoutRect.y
					- this._nodeRenderer.typicalSize.height
					/ this._visibleLayoutRect.scale - margin;

			var endLayoutX = startLayoutX + this._visibleLayoutRect.width
					+ this._nodeRenderer.typicalSize.width
					/ this._visibleLayoutRect.scale + margin * 2;
			var endLayoutY = startLayoutY + this._visibleLayoutRect.height
					+ this._nodeRenderer.typicalSize.height
					/ this._visibleLayoutRect.scale + margin * 2;

			// this.log.debug('sx={0},sy={1},ex={2},ey={3}', startLayoutX,
			// startLayoutY, endLayoutX,
			// endLayoutY);

			var addNodeArray = [];

			var alreadyAddedNodeMap = {};

			var nodeIdKey = this._nodeIdKey;

			// TODO 高速化の余地あり
			for ( var i = 0, count = this._nodeSortArray.length; i < count; i++) {
				var node = this._nodeSortArray[i];
				var viewPos = node.layoutPos;

				var viewX = viewPos.x;
				if (viewX < startLayoutX) {
					continue;
				} else if (viewX > endLayoutX) {
					break;
				}

				var viewY = viewPos.y;
				var isNodeVisible = (node.isVisible === undefined)
						|| node.isVisible;
				if ((startLayoutY <= viewY) && (viewY <= endLayoutY)
						&& isNodeVisible) {
					if (node.get(nodeIdKey) in this._visibleNodes) {
						alreadyAddedNodeMap[node.get(nodeIdKey)] = null;
					} else {
						addNodeArray.push(node);
					}
				}
			}

			var recyclingVisibleNodes = [];

			for ( var vnkey in this._visibleNodes) {
				var visibleNode = this._visibleNodes[vnkey];
				if (!(visibleNode.node.get(nodeIdKey) in alreadyAddedNodeMap)) {
					var vn = this._removeNode(visibleNode.node, true);
					recyclingVisibleNodes.push(vn);
					// this.log.debug('node recycled');
				}
			}

			var actualRemoveCount = recyclingVisibleNodes.length
					- addNodeArray.length;
			if (actualRemoveCount > 0) {
				for ( var i = 0; i < actualRemoveCount; i++) {
					this._removeVisibleNode(recyclingVisibleNodes.shift());
				}
			}

			for ( var i = 0, count = addNodeArray.length
					- recyclingVisibleNodes.length; i < count; i++) {
				recyclingVisibleNodes.push(this._createVisibleNode());
				// this.log.debug('node created');
			}

			for ( var i = 0, count = addNodeArray.length; i < count; i++) {
				this._addCommand(this._drawNode, addNodeArray[i],
						recyclingVisibleNodes[i]);
			}

			// TODO エッジを消す処理が必要（今はどんどんノードが増えていく）
			this._addCommandLow(this._drawEdges);

			this._doCommandLoop();
		},

		_createVisibleNode : function() {
			var view = this._nodeViewPool.borrowObject();
			var behavior = this._nodeBehaviorPool.borrowObject();

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				if (!view[layerName]) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				var layerElem = this._layerRootElementMap[layerName].rootElement;

				if (renderer.type == 'svg') {
					layerElem.childNodes[0].appendChild(view[layerName]);
				} else {
					layerElem.appendChild(view[layerName]);
				}
			}

			return {
				view : view,
				behavior : behavior
			};
		},

		_removeVisibleNode : function(visibleNode) {
			var nodeView = visibleNode.view;
			var behavior = visibleNode.behavior;

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				if (!nodeView[layerName]) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				var layerElem = this._layerRootElementMap[layerName].rootElement;

				if (renderer.type == 'svg') {
					layerElem.childNodes[0].removeChild(nodeView[layerName]);
				} else {
					// divの場合
					layerElem.removeChild(nodeView[layerName]);
				}
			}

			this._nodeViewPool.returnObject(nodeView);
			this._nodeBehaviorPool.returnObject(behavior);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_drawNode : function(vnode, visibleNode) {
			var useRecycledVisibleNode = !!visibleNode;

			var nodeView, behavior;

			if (useRecycledVisibleNode) {
				nodeView = visibleNode.view;
				behavior = visibleNode.behavior;
			} else {
				nodeView = this._nodeViewPool.borrowObject();
				behavior = this._nodeBehaviorPool.borrowObject();
			}

			var nodeId = vnode[this._nodeIdKey];

			this._visibleNodes[nodeId] = {
				node : vnode,
				view : nodeView,
				behavior : behavior
			};

			var layoutPos = vnode.layoutPos;

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;

				if (!nodeView[layerName]) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				var layerElem = this._layerRootElementMap[layerName].rootElement;

				if (renderer.type == 'svg') {
					if (!useRecycledVisibleNode) {
						layerElem.childNodes[0]
								.appendChild(nodeView[layerName]);
					}
				} else {
					// divの場合
					if (!useRecycledVisibleNode) {
						layerElem.appendChild(nodeView[layerName]);
					}
					$(nodeView[layerName]).css({
							position : 'absolute'
					});
				}
			}

			// console.log('node added = ' + vnode.id);

			// TODO 警告が出るが実際には問題なく動作する
			if ($.isFunction(behavior.onbind)) {
				var ctx = {
					controller : this,
					vnode : vnode,
					view : nodeView,
					data : this._callbackData
				};
				behavior.onbind(ctx);
			}

			var alignment;
			if (this._nodeRenderer.getAlignment) {
				alignment = this._nodeRenderer.getAlignment({vnode: vnode});
			}
			var nodeSize;
			if (alignment === 'r') {
				nodeSize = this.getNodeSize(nodeId);
			}

			for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
				var renderer = this._layerRenderers[i];
				var layerName = renderer.name;
				if (!nodeView[layerName]) {
					// このレイヤに対応するビューが存在しない場合はスキップ
					// 背景レイヤなどの場合にここに来る
					continue;
				}

				if (renderer.type == 'svg') {
					if (alignment === 'r') {
						layoutPos.x -= nodeSize.width
						this._setTranslate(nodeView[layerName], layoutPos.x,
								layoutPos.y);
						vnode.layoutPos = layoutPos;
					} else {
						this._setTranslate(nodeView[layerName], layoutPos.x,
								layoutPos.y);
					}
				} else {
					if (alignment === 'r') {
						var nodeSize = this.getNodeSize(nodeId);
						layoutPos.x -= nodeSize.width
						$(nodeView[layerName]).css({
							// TODO このあたりの設定はどこに持たせるか再考
							top : layoutPos.y,
							left : layoutPos.x
						});
						vnode.layoutPos = layoutPos;
					} else {
						$(nodeView[layerName]).css({
							// TODO このあたりの設定はどこに持たせるか再考
							top : layoutPos.y,
							left : layoutPos.x
						});
					}
				}
			}

			if (this.isSelectedNode(nodeId)) {
				if ($.isFunction(behavior.onselect)) {
					var ctx = {
						controller : this,
						vnode : vnode,
						view : nodeView,
						data : this._callbackData
					};
					behavior.onselect(ctx);
				}
			} else {
				if ($.isFunction(behavior.onunselect)) {
					var ctx = {
						controller : this,
						vnode : vnode,
						view : nodeView,
						data : this._callbackData
					};
					behavior.onunselect(ctx);
				}
			}
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_removeNode : function(vnode, isUnbindOnly) {
			var visibleNode = this._visibleNodes[vnode[this._nodeIdKey]];
			var nodeView = visibleNode.view;
			var behavior = visibleNode.behavior;

			if ($.isFunction(behavior.onunbind)) {
				var unbindCtx = {
					controller : this,
					vnode : vnode,
					view : nodeView,
					data : this._callbackData
				};
				behavior.onunbind(unbindCtx);
			}

			if (!isUnbindOnly) {
				for ( var i = 0, count = this._layerRenderers.length; i < count; i++) {
					var renderer = this._layerRenderers[i];
					var layerName = renderer.name;

					if (!nodeView[layerName]) {
						// このレイヤに対応するビューが存在しない場合はスキップ
						// 背景レイヤなどの場合にここに来る
						continue;
					}

					var layerElem = this._layerRootElementMap[layerName].rootElement;

					if (renderer.type == 'svg') {
						layerElem.childNodes[0]
								.removeChild(nodeView[layerName]);
					} else {
						// divの場合
						layerElem.removeChild(nodeView[layerName]);
					}
				}

				this._nodeViewPool.returnObject(nodeView);
				this._nodeBehaviorPool.returnObject(behavior);
			}

			delete this._visibleNodes[vnode[this._nodeIdKey]];
			visibleNode.node = null;

			for ( var visibleEdgeKey in this._visibleEdges) {
				var visibleEdge = this._visibleEdges[visibleEdgeKey];
				var e = visibleEdge.edge;
				var endpoint = this._graph.getEndpointNodeId(visibleEdgeKey);

				// TODO 現在は、「両方のノードが可視範囲から外れたらエッジも消す」としている。そのため、
				// 可視範囲を横切るエッジが描画されない。
				if (!(endpoint.fromId in this._visibleNodes)
						&& !(endpoint.toId in this._visibleNodes)) {
					this._removeVisibleEdge(e);
				}
			}

			return visibleNode;
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_drawEdges : function() {
			// TODO これ自体を_addCommandLowで実行している

			for ( var edgeKey in this._vedges) {
				var vedge = this._vedges[edgeKey];

				if (edgeKey in this._visibleEdges) {
					// すでに描画済みだったらスキップ
					continue;
				}

				var endpoint = this._graph.getEndpointNodeId(edgeKey);

				if ((endpoint.fromId in this._visibleNodes)
						|| (endpoint.toId in this._visibleNodes)) {
					this._addCommand(this._drawEdge, vedge);
				}
			}

			this._doCommandLoop();
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_drawEdge : function(edge) {
			if (edge.get(this._edgeIdKey) in this._visibleEdges) {
				// すでに指定されたエッジが描画されている場合は直ちに終了
				return;
			}

			var view = this._edgeViewPool.borrowObject();

			var behavior = this._edgeBehaviorPool.borrowObject();

			this._edgeLayerElement.childNodes[0].appendChild(view);

			var endpoint = this._graph.getEndpointNodeId(edge
					.get(this._edgeIdKey));
			var fromVnode = this._vnodes[endpoint.fromId];
			var toVnode = this._vnodes[endpoint.toId];

			this._visibleEdges[edge.get(this._edgeIdKey)] = {
				edge : edge,
				fromNode : fromVnode,
				toNode : toVnode,
				view : view,
				behavior : behavior
			};

			var ctx = {
				controller : this,
				vedge : edge,
				fromVnode : fromVnode,
				toVnode : toVnode,
				view : view,
				data : this._callbackData
			};
			behavior.onbind(ctx);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_removeVisibleEdge : function(edge) {
			var visibleEdge = this._visibleEdges[edge.get(this._edgeIdKey)];

			if (visibleEdge === undefined) {
				// 他のノードを取り除いたタイミングでエッジが取り除かれていればただちに終了
				return;
			}

			var fromNode = this._vnodes[edge.get(this._graph._fromNodeIdKey)];
			var toNode = this._vnodes[edge.get(this._graph._toNodeIdKey)];

			if (visibleEdge.behavior && visibleEdge.behavior.onunbind) {
				var unbindCtx = {
					controller : this,
					edge : edge,
					fromNode : fromNode,
					toNode : toNode,
					view : visibleEdge.view,
					data : this._callbackData
				};
				visibleEdge.behavior.onunbind(unbindCtx);
			}

			this._edgeLayerElement.childNodes[0].removeChild(visibleEdge.view);

			this._edgeViewPool.returnObject(visibleEdge.view);
			this._edgeBehaviorPool.returnObject(visibleEdge.behavior);
			delete this._visibleEdges[edge.get(this._edgeIdKey)];
		},

		_setSvgTransform : function(target, tx, ty, scale) {
			var x = tx, y = ty, s = scale;
			var scrollPos = this._visibleLayoutRect;
			if (tx === null) {
				x = scrollPos.x;
			}
			if (ty === null) {
				y = scrollPos.y;
			}
			if (scale === null || scale === undefined) {
				s = this._visibleLayoutRect.scale;
			}

			var transform = h5.u.str.format('scale({0}) translate({1},{2})', s,
					x, y);
			target.setAttribute('transform', transform);
		},

		_setDivTransform : function(target, tx, ty, scale) {
			var x = tx, y = ty, s = scale;
			var scrollPos = this._visibleLayoutRect;
			if (tx === null) {
				x = scrollPos.x;
			}
			if (ty === null) {
				y = scrollPos.y;
			}
			if (scale === null || scale === undefined) {
				s = this._visibleLayoutRect.scale;
			}

			var transform = h5.u.str.format(
					'scale({0}) translate({1}px,{2}px)', s, x, y);
			target.style.webkitTransform = transform;
			target.style.MozTransform = transform;
			target.style.msTransform = transform;
			target.style.msTransformOrigin = '(0,0)';
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_setTranslate : function(target, tx, ty, scale) {
			var translate = h5.u.str.format('translate({0},{1}) ', tx, ty);
			target.setAttribute('transform', translate);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_addCommandHigh : function(cmd) {
			this._rendererQueue.addHigh(h5.u.obj.argsToArray(arguments));
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_addCommand : function(cmd) {
			this._rendererQueue.addMedium(h5.u.obj.argsToArray(arguments));
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_addCommandLow : function(cmd) {
			this._rendererQueue.addLow(h5.u.obj.argsToArray(arguments));
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_executeCommand : function(cmd) {
			// FIXME cmdがundefinedの場合がある。根本原因の調査の必要あり
			if (!cmd) {
				return;
			}

			var func = cmd.shift();
			func.apply(this, cmd);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_executeImmediateCommands : function() {
			var immediateCount = this._rendererQueue
					.count(RENDERER_QUEUE_IMMEDIATE);
			for ( var i = 0; i < immediateCount; i++) {
				var cmd = this._rendererQueue.queues[RENDERER_QUEUE_IMMEDIATE][i];
				this._executeCommand(cmd);
			}
			this._rendererQueue.clear(RENDERER_QUEUE_IMMEDIATE);
		},

		/**
		 * @memberOf h5.ui.components.graph.GraphController
		 */
		_doCommandLoop : function() {
			// 即時実行レベルのコマンドはすべて実行
			this._executeImmediateCommands();

			var count = this._rendererQueue.count();
			if (count > this._MAX_COMMAND_PER_LOOP) {
				count = this._MAX_COMMAND_PER_LOOP;
			}

			for ( var i = 0; i < count; i++) {
				var cmd = this._rendererQueue.poll();
				this._executeCommand(cmd);
			}

			var hasMoreCommand = true;
			if (this._rendererQueue.count() == 0) {
				hasMoreCommand = false;
			}

			if (hasMoreCommand) {
				var that = this;
				setTimeout(function() {
					that._doCommandLoop();
				}, 0);
			} else {
				// this.renderDeferred.resolve();
			}
		},

		getNodeAt : function(clientX, clientY) {
			var actual = this._getActualTargetAt(clientX, clientY);

			if (!actual || actual.isEdge) {
				// actualがnullということは、エッジ・ノードもクリックされていない
				return null;
			}

			return {
				vnode : actual.visible.node,
				view : actual.visible.view
			};
		},

		getEdgeAt : function(clientX, clientY) {
			var actual = this._getActualTargetAt(clientX, clientY);

			if (!actual || !actual.isEdge) {
				// actualがnullということは、エッジ・ノードどちらもクリックされていない
				return null;
			}

			return {
				edge : actual.visible.edge,
				fromNode : actual.visible.fromNode,
				toNode : actual.visible.toNode,
				view : actual.visible.view
			};
		},

		_selectedNodeIds : [],

		getSelectedNodes : function() {
			var ret = [];
			var ids = this._selectedNodeIds;
			for ( var i = 0, len = ids.length; i < len; i++) {
				ret.push(this._getVnodeById(ids[i]));
			}
			return ret;
		},

		isSelectedNode : function(nodeId) {
			return $.inArray(nodeId, this._selectedNodeIds) !== -1;
		},

		toggleSelectNode : function(nodeId) {
			if (this.isSelectedNode(nodeId)) {
				this.unselectNode(nodeId);
			} else {
				this.selectNode(nodeId);
			}
		},

		/**
		 * @param isExclusive
		 *            デフォルトはfalse
		 */
		selectNode : function(nodeId, isExclusive) {
			if (this.isSelectedNode(nodeId)) {
				if (isExclusive) {
					var selIds = this._selectedNodeIds.slice(0);
					var idx = $.inArray(nodeId, selIds);
					selIds.splice(idx, 1);
					for ( var i = 0, len = selIds.length; i < len; i++) {
						this.unselectNode(selIds[i]);
					}
				}

				return;
			}

			var vnode = this._getVnodeById(nodeId);

			if (!vnode) {
				this.log.debug(MSG_NO_SUCH_NODE, nodeId);
				return;
			}

			if (isExclusive === true) {
				this.unselectNodeAll();
			}

			this._selectedNodeIds.push(nodeId);

			var visibleNode = this._visibleNodes[nodeId];
			if (visibleNode.behavior && visibleNode.behavior.onselect) {
				var ctx = {
					controller : this,
					vnode : visibleNode.node,
					view : visibleNode.view,
					data : this._callbackData
				};
				visibleNode.behavior.onselect(ctx);
			}

			this.trigger(this.EVENT_NODE_SELECT, {
				vnodes : [ vnode ]
			});
		},

		unselectNode : function(nodeId) {
			var idx = $.inArray(nodeId, this._selectedNodeIds);

			if (idx === -1) {
				return;
			}

			this._selectedNodeIds.splice(idx, 1);

			var vnode = this._getVnodeById(nodeId);

			var visibleNode = this._visibleNodes[nodeId];
			if (visibleNode && visibleNode.behavior
					&& visibleNode.behavior.onunselect) {
				var ctx = {
					controller : this,
					vnode : visibleNode.node,
					view : visibleNode.view,
					data : this._callbackData
				};
				visibleNode.behavior.onunselect(ctx);
			}

			this.trigger(this.EVENT_NODE_UNSELECT, {
				vnodes : [ vnode ]
			});
		},

		unselectNodeAll : function() {
			var unselectedNodes = this.getSelectedNodes();

			if (unselectedNodes.length === 0) {
				return;
			}

			var unselectedNodeIds = this._selectedNodeIds.slice(0);

			this._selectedNodeIds = [];

			for ( var i = 0, len = unselectedNodeIds.length; i < len; i++) {
				var nodeId = unselectedNodeIds[i];
				var visibleNode = this._visibleNodes[nodeId];
				if (visibleNode && visibleNode.behavior
						&& visibleNode.behavior.onunselect) {
					var ctx = {
						controller : this,
						vnode : visibleNode.node,
						view : visibleNode.view,
						data : this._callbackData
					};
					visibleNode.behavior.onunselect(ctx);
				}
			}

			this.trigger(this.EVENT_NODE_UNSELECT, {
				vnodes : unselectedNodes
			});
		},

		_getNodesInRegion : function(layoutX, layoutY, width, height,
				includeHidden) {

			// 可視範囲を計算
			var startLayoutX = layoutX;
			var startLayoutY = layoutY;
			var endLayoutX = startLayoutX + width;
			var endLayoutY = startLayoutY + height;

			var containerRegion = {
				left : startLayoutX,
				top : startLayoutY,
				right : endLayoutX,
				bottom : endLayoutY
			};

			var nodeIdKey = this._nodeIdKey;

			var ret = [];

			var nodeRegion = {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			};

			// TODO 高速化の余地あり(y軸方向で事前にソートしておいて二分検索)
			for ( var i = 0, count = this._nodeSortArray.length; i < count; i++) {
				var node = this._nodeSortArray[i];
				var viewPos = node.layoutPos;

				var viewX = viewPos.x;

				if (viewX < startLayoutX) {
					continue;
				} else if (viewX > endLayoutX) {
					break;
				}

				var viewY = viewPos.y;

				if (includeHidden !== true && (node.isVisible === false)) {
					// hiddenなものは含めないように指定されていて
					// ノードが非表示状態ならスキップ
					continue;
				}

				nodeRegion.left = viewX;
				nodeRegion.top = viewY;

				var nodeSize = this.getNodeSize(node.get(nodeIdKey));
				if (nodeSize) {
					nodeRegion.right = viewX + nodeSize.width;
					nodeRegion.bottom = viewY + nodeSize.height;
				} else {
					nodeRegion.right = viewX;
					nodeRegion.bottom = viewY;
				}

				if (isIncluded(containerRegion, nodeRegion)) {
					ret.push(node);
				}
			}

			return ret;
		}
	};

	h5.core.expose(graphRenderController);

})(jQuery);
(function() {
	/** くっつく距離 */
	var MAGNET_DIST = 30;

	/** グループ化の時に表示するbox-shadowのスタイル */
	var SHADOW_STYLE = '0 0 50px #0f0';

	/** box-shadowを表示する時間(ms) 'fast'などjQuery.animateで指定可能な文字列も指定可能 */
	var SHADOW_DURATION = 500;

	/** マグネットコンテナのロケールを保持する属性名。ロケールが等しい、または未指定同士の場合のみくっつき、ロケールが違う者同士はくっつかない。 */
	var DATA_MAG_LAYER_ID = 'data-h5mag-layer-id';

	/**
	 * くっつく場所の定数
	 */
	var MAGNET_PLACE = {
		NONE: 0,
		TOP: 1,
		RIGHT: 2,
		BOTTOM: 3,
		LEFT: 4,
		PILED: 5
	};

	/**
	 * コントローラ
	 *
	 * @name h5.ui.components.MagnetContainer.MagnetController
	 */
	var controller = {
		/**
		 * 設定項目
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		config: {
			/**
			 * マグネットコンテナの対象外にする要素。$().is(ignorePatter)で判定するため、セレクタもDOM要素も指定可能
			 */
			ignorePattern: null,

			/**
			 * コンテナにくっついている要素に重なるようにドラッグした時に入れ替えを行うかどうか。
			 * <p>
			 * デフォルトfalse。入れ替えを行わない場合は、既にくっついている場所にはくっつかない。
			 * </p>
			 */
			replaceMode: false,

			/**
			 * コンテナにくっついている要素に重なるようにドラッグした時に重ねるかどうか
			 * <p>
			 * replaceModeの設定より優先される
			 * </p>
			 */
			pileMode: true
		},
		/**
		 * コントローラ名
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		__name: 'h5.ui.components.MagnetContainer.MagnetController',

		/**
		 * くっついた時のアニメーション再生中かどうか
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		isAnimating: false,

		/**
		 * くっついている間に移動した量
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		storeEvent: {
			x: 0,
			y: 0
		},
		/**
		 * くっつける時に移動した量
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		storeMagnetDist: {
			x: 0,
			y: 0
		},

		/**
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 */
		__ready: function(context) {
			// rootElement直下の要素であっても、コンテナとして扱わない要素(selectorやDOMなど$().isで判定できるもの)を登録
			// (context.evArgで渡した場合はここで設定するが、バインド済みのコントローラに設定してもよい)
			if (context.evArg && context.evArg.ignorePattern) {
				this.ignorePattern = context.evArg.ignorePattern;
			}
		},

		/**
		 * コンテナドラッグ開始
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'>div h5trackstart': function(context, $target) {
			if ($target.hasClass('h5mag-groupContainer') || $target.is(this.ignorePattern)) {
				return;
			}
			var isTrigger = context.evArg && context.evArg.triggerForGroupCheck;
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();
			var pos = $target.position();
			var dragInfo = {};

			$target.data('h5mag-draginfo', dragInfo);
			if (!isTrigger) {
				// イベントを上げる
				$target.trigger('h5mag-trackstart', event);
				// position:absoluteに変更
				if ($target.css('position') !== 'absolute') {
					$target.css({
						top: parseInt(pos.top),
						left: parseInt(pos.left),
						position: 'absolute'
					});
				}
				// 元あった場所を覚えておく。
				// 他の要素と入れ替えがあった時に、ドラッグ中の要素が元あった場所と入れ替えるため
				dragInfo.originalPos = {
					left: pos.left,
					top: pos.top
				};
			}

			// 自分以外のコンテナの位置と大きさを取得してキャッシュしておく。
			// move時の隣接判定ではキャッシュした情報を使うようにする(高速化のため)
			var containerMapList = [];
			var that = this;
			// ロケールの取得
			var layer = $target.attr(DATA_MAG_LAYER_ID);
			$(this.rootElement.children).each(
					function() {
						var $this = $(this);
						if ($this.hasClass('h5mag-groupContainer') || $target.is(this)
								|| $this.is(that.ignorePattern)
								|| $this.attr(DATA_MAG_LAYER_ID) !== layer) {
							// グループ要素、ターゲット自身、ignorePattern、ロケール違いの場合はくっつく対象にならない
							return;
						}
						var pos = $this.position();
						var height = $this.height();
						var width = $this.width();
						containerMapList.push({
							$container: $this,
							top: pos.top,
							left: pos.left,
							height: height,
							width: width
						});
					});

			dragInfo.containerMapList = containerMapList;

			this.storeMagnetDist.x = 0;
			this.storeMagnetDist.y = 0;
			this.storeEvent.x = 0;
			this.storeEvent.y = 0;

			$target.addClass('magnetDragging');
		},
		/**
		 * コンテナドラッグ
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'>div h5trackmove': function(context, $target) {
			if ($target.hasClass('h5mag-groupContainer') || $target.is(this.ignorePattern)) {
				return;
			}
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();

			var isTrigger = context.evArg && context.evArg.triggerForGroupCheck;
			// トリガされたものじゃないならイベントを上げる
			if (!isTrigger) {
				$target.trigger('h5mag-trackmove', event);
			}

			// triggerされたときはundefinedなので0に差し替え
			var eventX = event.dx || 0;
			var eventY = event.dy || 0;

			var dragInfo = $target.data('h5mag-draginfo');
			dragInfo.isMoved = true;
			var containerMapList = dragInfo.containerMapList;
			// くっつくくらい近いのがあればくっつける
			var result = this._getNearTarget($target, this.storeEvent.x + eventX, this.storeEvent.y
					+ eventY, containerMapList);

			var dist = result.dist;
			if (result.count) {
				if (dragInfo.isMagnetting) {
					// 引き続きくっついている場合、移動量だけ覚えておいて何もしない
					this.storeEvent.x += eventX;
					this.storeEvent.y += eventY;
				} else {
					// 今新たにくっついた場合
					this.storeEvent = {
						x: eventX,
						y: eventY
					};
					this.storeMagnetDist.x = dist.x + eventX;
					this.storeMagnetDist.y = dist.y + eventY;

					// くっつくように移動
					this._moveTarget($target, {
						dx: this.storeMagnetDist.x,
						dy: this.storeMagnetDist.y
					});

					// h5trackendで結果を使用するため、$targetに覚えさせておく。
					dragInfo.magnetResult = result;
					dragInfo.isMagnetting = true;

					// 既にその場所にくっついているものがあったら、場所を移動
					var $already = result.$already;
					if ($already && this.config.replaceMode) {
						var originalPos = dragInfo.originalPos;
						$already.css({
							top: originalPos.top,
							left: originalPos.left
						});
						var targetPos = $target.position();
						dragInfo.originalPos = {
							top: targetPos.top,
							left: targetPos.left
						};
						// グループから$ターゲットを引きはがす
						this._removeTargetFromMagnetGroup($already.attr('data-h5mag-group-id'),
								$already);

						// 入れ替えのあったコンテナについて、h5trackstart/endを呼び、グループ化の計算をさせる
						if (this.config.replaceMode) {
							var evArg = {
								triggerForGroupCheck: true
							};
							$already.trigger('h5trackstart', evArg);
							$already.trigger('h5trackmove', evArg);
							$already.trigger('h5trackend', evArg);
						}
						// キャッシュした位置情報の再計算
						for ( var i = 0, l = containerMapList.length; i < l; i++) {
							var $container = containerMapList[i].$container;
							if ($container.is($already)) {
								var map = containerMapList[i];
								var pos = $already.position();
								map.top = pos.top;
								map.left = pos.left;
							}

						}

					}
				}
			} else if (dragInfo.isMagnetting) {
				// くっついていたけど離れた場合
				// くっついていた間に移動した分と、くっつくときに動いた分、と今回のイベントの分、移動する。

				this._moveTarget($target, {
					dx: this.storeEvent.x - this.storeMagnetDist.x + eventX,
					dy: this.storeEvent.y - this.storeMagnetDist.y + eventY
				});

				// アニメーションを停止
				this._stopChainAnimate($target);

				this.storeEvent.x = 0;
				this.storeEvent.y = 0;
				this.storeMagnetDist.x = 0;
				this.storeMagnetDist.y = 0;
				dragInfo.isMagnetting = false;

				// グループから$ターゲットを引きはがす
				var $removeChildren = this._removeTargetFromMagnetGroup($target
						.attr('data-h5mag-group-id'), $target);

				// 離れたらイベントを上げる
				// TODO 元々くっついていた場所、グループなどをイベントに入れる
				$target.trigger('unmagnet', $removeChildren);
			} else {
				// くっついていない場合
				dragInfo.isMagnetting = false;
				this._moveTarget($target, {
					dx: eventX,
					dy: eventY
				});
			}
		},
		/**
		 * コンテナドラッグ終了
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'>div h5trackend': function(context, $target) {
			if ($target.hasClass('h5mag-groupContainer') || $target.is(this.ignorePattern)) {
				return;
			}
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();

			// リセット
			$target.removeClass('magnetDragging');
			// $target.css('z-index', 1);
			this.storeEvent.x = 0;
			this.storeEvent.y = 0;
			this.storeMagnetDist.x = 0;
			this.storeMagnetDist.y = 0;

			var dragInfo = $target.data('h5mag-draginfo');
			$target.data('h5mag-draginfo', null);

			var isTrigger = context.evArg && context.evArg.triggerForGroupCheck;

			if (!dragInfo.isMoved) {
				// 動いていないなら何もしない
				return;
			}

			// ターゲットが属していたグループを削除
			// (入れ替え時に作られたグループで$targetが属してしまった場合)
			this._removeMagnetGroup($target.attr('data-h5mag-group-id'));

			if (dragInfo && dragInfo.isMagnetting) {
				// くっついた方向にくっついたコンテナを覚えさせておく
				var $attachContainers = null;
				var magnetResult = dragInfo.magnetResult;
				if (magnetResult[MAGNET_PLACE.PILED]) {
					// TODO 挙動を設定もしくはイベントハンドラの戻り値で変えられるようにする
					// 重なった時は、重ねられた要素のグループは変更せず、動かした方の要素もグループに属させない
					// イベントを上げる
					if (!isTrigger) {
						this._chainAnimate($target).done(function() {
							$target.trigger('piled', {
								$target: $target,
								$piled: magnetResult[MAGNET_PLACE.PILED]
							});
						});
					}
				} else {
					for ( var place = MAGNET_PLACE.TOP, l = MAGNET_PLACE.PILED; place <= l; place++) {
						var $adj = magnetResult[place];
						if ($adj) {
							$attachContainers = $attachContainers ? $attachContainers.add($adj)
									: $adj;
							$target.data('h5mag-adj-' + place, $adj);
							$adj.data('h5mag-adj-' + ((place + 1) % 4 + 1), $target);
							// くっついたコンテナが既存のグループに属していればそれを削除
							this._removeMagnetGroup($adj.attr('data-h5mag-group-id'));
						}
					}

					// 新しくグループの作成
					$groupChildren = this._createMagnetGroup($target);
					// くっついた時のアニメーションを実行
					this
							._chainAnimate($target)
							.done(
									function() {
										// アニメーションが終わってからくっついたイベントを上げる
										for ( var place = MAGNET_PLACE.TOP, l = MAGNET_PLACE.LEFT; place <= l; place++) {
											var $adj = magnetResult[place];
											if ($adj) {
												$adj.trigger('magnet', {
													$target: $target,
													place: place,
													$group: $groupChildren,
													MAGNET_PLACE: MAGNET_PLACE
												});
											}
										}
									});
				}
			}

			// イベントを上げる
			if (!isTrigger) {
				$target.trigger('h5mag-trackend', event);
			}
		},

		/**
		 * グループドラッグ開始
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'.h5mag-groupContainer h5trackstart': function(context, $target) {
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();

			// イベントを上げる
			$target.trigger('h5mag-trackstart', event);
			// TODO グループで連結
		},

		/**
		 * グループドラッグ
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'.h5mag-groupContainer h5trackmove': function(context, $target) {
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();

			// イベントを上げる
			$target.trigger('h5mag-trackmove', event);

			var groupId = $target.data('h5mag-group-id');
			var dx = event.dx;
			var dy = event.dy;
			var $groupElements = this.$find('[data-h5mag-group-id="' + groupId + '"]');
			$groupElements.each(function() {
				var $this = $(this);
				var pos = $this.position();
				$this.css({
					top: pos.top + dy,
					left: pos.left + dx
				});
			});

			// TODO グループで連結
		},

		/**
		 * グループドラッグ終了
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'.h5mag-groupContainer h5trackend': function(context, $target) {
			var event = context.event;
			event.preventDefault();
			event.stopPropagation();
			// イベントを上げる
			$target.trigger('h5mag-trackend', event);
			// TODO グループで連結
		},

		/**
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'>div magnet': function(context, $target) {
		// くっついたイベント
		},

		/**
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param context
		 * @param $target
		 */
		'>div unmagnet': function(context, $target) {
		// はなれたイベント
		},

		/**
		 * ターゲットの移動
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param $target
		 * @param dPos
		 */
		_moveTarget: function($target, dPos) {
			var pos = $target.position();
			$target.css({
				left: pos.left + dPos.dx,
				top: pos.top + dPos.dy
			});
		},

		/**
		 * くっつくくらい近いターゲットを返す
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param $target
		 * @param moveX 現在の$targetのx座標にmoveXの値を加えて計算
		 * @param moveY 現在の$targetのy座標にmoveYの値を加えて計算
		 * @param containerMapList 判定対象のコンテナの位置情報の配列
		 * @returns {Object} {count:くっつく数, [1～4]: くっつく対象(jQuery)}
		 */
		_getNearTarget: function($target, moveX, moveY, containerMapList) {
			// 複数にくっつく場合は複数要素列挙する。
			// (複数にくっつく===ret.distが全く同じな複数方向へのくっつきがある)
			var position = $target.position();
			var x = position.left + moveX;
			var y = position.top + moveY;
			var ret = {
				count: 0
			};
			var detectionDist = MAGNET_DIST;
			for ( var i = 0, l = containerMapList.length; i < l; i++) {
				var $container = containerMapList[i].$container;
				var map = containerMapList[i];

				// x軸の差
				var dx = map.left - x;
				// y軸の差
				var dy = map.top - y;

				var place = MAGNET_PLACE.NONE;

				if (Math.abs(dx) <= detectionDist && Math.abs(dy) <= detectionDist) {
					// 重なった場合
					// $targetと同じ位置にくっつく
					place = MAGNET_PLACE.PILED;
					if (!ret.dist) {
						ret.dist = {
							x: dx,
							y: dy
						};
					}
				} else if (Math.abs(dx) <= detectionDist) {
					// 縦にくっつくかどうかの判定
					if (dy < 0 && Math.abs(map.height + dy) <= detectionDist) {
						// $targetの上と$containerの下がくっつく
						place = MAGNET_PLACE.TOP;
						if (!ret.dist) {
							ret.dist = {
								x: dx,
								y: map.height + dy
							};
						}
					} else if (dy >= 0 && Math.abs(dy - $target.height()) <= detectionDist) {
						// $targetの下と$containerの上がくっつく
						place = MAGNET_PLACE.BOTTOM;
						if (!ret.dist) {
							ret.dist = {
								x: dx,
								y: dy - map.height
							};
						}
					}
				} else if (Math.abs(dy) <= detectionDist) {
					// 横にくっつくかどうかの判定
					if (dx < 0 && Math.abs(map.width + dx) <= detectionDist) {
						// $targetの左と$containerの右がくっつく
						place = MAGNET_PLACE.LEFT;
						if (!ret.dist) {
							ret.dist = {
								x: map.width + dx,
								y: dy
							};
						}
					} else if (dx >= 0 && Math.abs(dx - $target.width()) <= detectionDist) {
						// $targetの右と$containerの左がくっつく
						place = MAGNET_PLACE.RIGHT;
						if (!ret.dist) {
							ret.dist = {
								x: dx - map.width,
								y: dy
							};
						}
					}
				}
				if (place) {
					// 既にその場所にくっついている要素を取得
					// 重ねる時は、いくつでも重なっていいのでこの判定はしない(重ねるモードの時は入れ替えも起きない)
					if (!ret.$already && !this.config.pileMode) {
						var $already = $container.data('h5mag-adj-' + ((place + 1) % 4 + 1));
						if ($already && $already[0] !== $target[0]) {
							ret.$already = $already;
						}
					}

					if (ret.$already && !this.config.replaceMode) {
						// 既にその場にくっついている要素がある場合で入れ替えモードでない場合は、そこにはくっつかない。
						// (入れ替えモードでない場合は既にある場所とはくっつかない)
						continue;
					}
					// くっつく場所が見つかったら、くっつけるように移動した時に他にもくっつくかどうかを探索する。
					// x,yを移動して、距離を０にして探索。
					if (!ret.count) {
						x += ret.dist.x;
						y += ret.dist.y;
						detectionDist = 0;
					}
					ret.count++;

					// 結果の格納
					ret[place] = $container;
				}
			}
			return ret;
		},

		/**
		 * $targetから連結するすべてのコンテナを取得
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param $target
		 */
		_enumerate: function($target) {
			var $groupElements = null;
			function enumerate($elm) {
				for ( var place = MAGNET_PLACE.TOP, l = MAGNET_PLACE.LEFT; place <= l; place++) {
					var $adj = $elm.data('h5mag-adj-' + place);
					if ($adj) {
						if ($groupElements && $groupElements.filter($adj).length) {
							continue;
						}
						$groupElements = $groupElements ? $groupElements.add($adj) : $adj;
						enumerate($adj);
					}
				}
			}
			enumerate($target);
			return $groupElements;
		},

		/**
		 * $targetが連結しているコンテナについて、グループを作成
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param var_args 可変長のjQueryオブジェクト
		 */
		_createMagnetGroup: function($target) {
			var $groupChildren = this._enumerate($target);
			var oldGroupIds = [];
			if ($groupChildren) {
				$groupChildren.each(function() {
					var $this = $(this);
					// position:absoluteに変更
					if ($this.css('position') !== 'absolute') {
						var pos = $this.position();
						$this.css({
							top: parseInt(pos.top),
							left: parseInt(pos.left),
							position: 'absolute',
						});
						if (!$this.css('z-index')) {
							$this.css('z-index', 1);
						}
					}

					var groupId = $this.attr('data-h5mag-group-id');
					if (groupId && $.inArray(groupId, oldGroupIds) !== -1) {
						oldGroupIds.push(groupId);
					}
				});
				for ( var i = 0, l = oldGroupIds.length; i < l; i++) {
					this._removeMagnetGroup(oldGroupIds[i]);
				}
			}

			if (!$groupChildren) {
				return;
			}

			var groupId = new Date().getTime();

			// data-h5mag-group-id属性にgroupIdを追加
			$groupChildren.attr('data-h5mag-group-id', groupId);

			// グループの要素を覆う四角形の座標を取得
			var wrapperRect = this._getWrapperRect($groupChildren);

			// グループを動かすハンドル要素の追加
			this._addGroupWrap(wrapperRect.top, wrapperRect.left, groupId, wrapperRect, $target
					.attr(DATA_MAG_LAYER_ID));

			return $groupChildren;
		},
		/**
		 * 連結解除されたコンテナについて、コンテナの連結情報を削除
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 */
		_removeMagnetGroup: function(groupId) {
			if (!groupId) {
				return;
			}
			this.$find('.h5mag-groupContainer[data-h5mag-group-id="' + groupId + '"]').remove();
			this.$find('.h5mag-groupContainer[data-h5mag-group-id="' + groupId + '"]').remove();
			return this.$find('>div[data-h5mag-group-id="' + groupId + '"]').removeAttr(
					'data-h5mag-group-id');
		},
		/**
		 * 既存のグループから指定されたコンテナを引きはがす。 引きはがされたときに、グループを再編成する(全部バラバラになったらグループは無くなる)
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param groupId
		 * @param $target
		 */
		_removeTargetFromMagnetGroup: function(groupId, $target) {
			// グループの削除
			this._removeMagnetGroup(groupId);

			var $adjs = null;
			// 隣接コンテナ情報の削除
			for ( var place = MAGNET_PLACE.TOP, l = MAGNET_PLACE.LEFT; place <= l; place++) {
				var $adj = $target.data('h5mag-adj-' + place);
				if (!$adj) {
					continue;
				}
				// くっついていたコンテナのadjを削除
				$adj.data('h5mag-adj-' + ((place + 1) % 4 + 1), null);
				// $targetのadjを削除
				$target.data('h5mag-adj-' + place, null);
				$adjs = $adjs ? $adjs.add($adj) : $adj;
			}

			// $targetが抜けることでできる新しいグループを計算する
			if ($adjs) {
				var that = this;
				var $created = null;
				$adjs.each(function() {
					// グループの作成
					if ($created == null) {
						$created = that._createMagnetGroup($(this));
						return;
					}
					if ($created.filter(this).length) {
						return;
					}
					$created = $created.add(that._createMagnetGroup($(this)));
				});
			}
		},
		/**
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param top
		 * @param left
		 * @param groupId
		 */
		_addGroupWrap: function(top, left, groupId, rect, layer) {
			var $wrap = $('<div></div>');
			$wrap.attr('data-h5mag-group-id', groupId);
			$wrap.addClass('h5mag-groupContainer');
			$wrap.addClass('h5mag-groupWrap');
			if (layer) {
				$wrap.attr(DATA_MAG_LAYER_ID, layer);
			}

			$wrap.css({
				top: rect.top - 8,
				left: rect.left - 8,
				height: 16 + rect.bottom - rect.top,
				width: 16 + rect.right - rect.left
			});
			$(this.rootElement).append($wrap);

			var $handle = $('<div></div>');
			$handle.attr('data-h5mag-group-id', groupId);
			$handle.addClass('h5mag-groupContainer');
			$handle.addClass('h5mag-groupHandle');
			$handle.data('rect', rect);
			$(this.rootElement).append($handle);
			$handle.css({
				top: rect.top - 8,
				left: rect.right + 8 - $handle.outerWidth()
			});
		},

		/**
		 * グループの要素を覆う四角形の座標を取得
		 *
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param $children
		 */
		_getWrapperRect: function($children) {
			// 左上と右下の座標を取得
			var wrapperRect = {
				top: Infinity,
				left: Infinity,
				right: -Infinity,
				bottom: -Infinity
			};

			$children.each(function() {
				// コンテナ要素を覆うエリアを計算
				var $this = $(this);
				var pos = $this.position();
				wrapperRect.top = Math.min(pos.top, wrapperRect.top);
				wrapperRect.left = Math.min(pos.left, wrapperRect.left);
				wrapperRect.right = Math.max(pos.left + $this.width(), wrapperRect.right);
				wrapperRect.bottom = Math.max(pos.top + $this.height(), wrapperRect.bottom);
			});
			return wrapperRect;
		},

		/**
		 * @memberOf h5.ui.components.MagnetContainer.MagnetController
		 * @param $target
		 * @returns {Promise}
		 */
		_chainAnimate: function($target, $animated, dfd) {
			if (!dfd) {
				dfd = h5.async.deferred();
				// アニメーションを途中でストップ可能にするため、$targetにdfdを持たせる
				$target.data('h5mag-animation-deferred', dfd);
				this.isAnimating = true;
			}
			// 次のアニメーション要素を取得
			var $next = null;
			$target.each(function() {
				var $this = $(this);
				for ( var place = MAGNET_PLACE.TOP, l = MAGNET_PLACE.LEFT; place <= l; place++) {
					var $adj = $this.data('h5mag-adj-' + place);
					if ($animated && $animated.filter($adj).length || $target.filter($adj).length) {
						// 既にアニメーション済みの要素だったら何もしない
						continue;
					}
					if ($next) {
						$next = $next.add($adj);
					} else {
						$next = $adj;
					}
				}
			});

			// アニメーションする要素を最初に取得しておいて、
			// completeを待ってから次へ連鎖するのではなく、complete前に次のアニメーションを実行する

			// アニメーションを実行するときは手前に出す
			$target.css({
				boxShadow: '0 0 0',
				zIndex: 3
			});
			$target.addClass('h5mag-chainAnimate');
			var count = 0;
			$target.animate({
				boxShadow: SHADOW_STYLE
			}, {
				duration: SHADOW_DURATION,
				complete: function() {
					count++;
					if (count !== $target.length) {
						// $targetが複数ある時は、全部終わるまで待つ
						return;
					}
					$target.removeClass('h5mag-chainAnimate');
					$target.css({
						boxShadow: '',
						zIndex: 1
					});
				}
			});
			if (!$next || dfd.state() !== 'pending') {
				this.isAnimating = false;
				dfd.resolve();
			} else {
				// アニメーションが済んだものを$animatedに追加
				if (!$animated) {
					$animated = $target;
				} else {
					$animated = $animated.add($target);
				}
				var that = this;
				setTimeout(function() {
					that._chainAnimate($next, $animated, dfd);
				}, SHADOW_DURATION / 2);
			}
			return dfd.promise();
		},

		_stopChainAnimate: function($target) {
			var dfd = $target.data('h5mag-animation-deferred');
			if (!dfd) {
				return;
			}
			this.animation = false;
			this.$find('.h5mag-chainAnimate').css('box-shadow', '0 0 0');
			this.$find('.h5mag-chainAnimate').removeClass('h5mag-chainAnimate');
			dfd.reject();
		}
	};

	h5.core.expose(controller);
})();
(function($) {

	/** ポップアップのヘッダ */
	var POPUP_HEADER_TEMPLATE_ID = 'header-template-id';
	h5.core.view.register(POPUP_HEADER_TEMPLATE_ID, '<div class="popupHeader"><h1></h1><div class="popupCloseBtn btn btn-danger"><span class="icon-remove">[%= h5.env.ua.isIE && h5.env.ua.browserVersion < 9 ? "×" : ""  %]</span></div></div>');

	/** ポップアップのコンテンツ */
	var POPUP_CONTENTS = '<div class="popupContents">';
	/** オーバレイのクラス */
	var CLASS_OVERLAY = 'h5PopupOverlay';

	/** ポップアップの位置指定文字列 */
	var POSITION_CONSTRAINT = {
		top: 'top',
		mid: 'mid',
		bottom: 'bottom',
		left: 'left',
		center: 'center',
		right: 'right'
	};

	var popupGroupMap = {};

	// 開いた順にポップアップのグループ名を保持する配列
	var popupGroupOrderArray = [];

	var popupDefaultParam = {
		position: 'absolute',
		draggable: false,
		header: true
	};

	var popupDefaultPositon = {
		top: 'mid',
		left: 'center',
		position: {}
	};

	/**
	 * ポップアップをドラッグ可能にするためのコントローラ
	 */
	var draggableController = {
		_popup: null,
		_$target: null,
		_preX: 0,
		_preY: 0,
		/**
		 * 内部使用のためexposeはしていない
		 */
		__name: 'h5.ui.popupManager._draggableController',
		__construct: function(context) {
			this._popup = context.args.popup;
			this._popup.promise.done(this.own(function() {
				// closeされたらdispose
				this.dispose();
			}));
		},

		'.popupDragger h5trackstart': function() {
			this._$target = $(this.rootElement);
			var pos = this._$target.offset();
			this._preX = pos.left;
			this._preY = pos.top;
		},
		'.popupDragger h5trackmove': function(context) {
			var dx = context.event.dx;
			var dy = context.event.dy;
			this._$target.css({
				left: this._preX += dx,
				top: this._preY += dy
			});
		},
		'.popupDragger h5trackend': function() {

		}

	};

	/**
	 * 引数が文字列かどうかを判定します。(hifiveから引用)
	 *
	 * @private
	 * @param {Any} target 値
	 * @returns {boolean} 文字列ならtrue、そうでないならfalse
	 */
	function isString(target) {
		return typeof target === 'string';
	}

	function parseHTML(str, context, keepScripts) {
		if ($.parseHTML) {
			return $.parseHTML(str, context, keepScripts)[0];
		}
		return $(str)[0];
	}

	function removeGroupOrder(group) {
		var thisIndex = $.inArray(group, popupGroupOrderArray);
		if (thisIndex !== -1) {
			popupGroupOrderArray.splice(thisIndex, 1);
		}
	}

	function movePopup(target, position) {
		var bw = $(window).width();
		var bh = $(window).height();

		var $target = $(target);

		var cw = $target.outerWidth();
		var ch = $target.outerHeight();

		position = position || $.extend({}, popupDefaultPositon);

		var hMargin = 0;
		var vMargin = 0;
		if (position.position.top) {
			hMargin = position.position.top;
		} else if (position.top === POSITION_CONSTRAINT.mid) {
			hMargin = (bh - ch) / 2;
		} else if (position.top === POSITION_CONSTRAINT.top) {
			hMargin = 0;
		} else if (position.bottom = POSITION_CONSTRAINT.bottom) {
			hMargin = bh - ch;
		}

		if (position.position.left) {
			vMargin = position.position.left;
		} else if (position.left === POSITION_CONSTRAINT.center) {
			vMargin = (bw - cw) / 2;
		} else if (position.left === POSITION_CONSTRAINT.left) {
			vMargin = 0;
		} else if (position.left = POSITION_CONSTRAINT.right) {
			vMargin = bw - cw;
		}
		var scrollX = $(window).scrollLeft();
		var scrollY = $(window).scrollTop();
		$target.css({
			left: scrollX + vMargin,
			top: scrollY + hMargin
		});
	}

	function popupCloseHandler(event, args) {
		var popup = event.data;
		if (popup) {
			// トリガーで引数が渡されたらcloseに渡す
			popup.close(args);
		}
	}

	function showOverlay() {
		// すでに表示済みなら何もしない
		if ($('.' + CLASS_OVERLAY).length) {
			return;
		}
		var overlay = $('<div>').addClass(CLASS_OVERLAY);
		$(document.body).append(overlay);
			// bodyの大きさがwindowより小さかったらwindowに合わせる
		overlay.css({
			width: Math.max($(document.body).innerWidth(), $(window).width()),
			height: Math.max($(document.body).innerHeight(), $(window).height())
		});
	}

	function removeOverlay() {
		$('.' + CLASS_OVERLAY).remove();
	}

	function Popup(rootElement, group, title, contents, controller, option) {
		this.rootElement = rootElement;
		this.group = group;

		this._isShowing = false;
		var $root = $(rootElement);

		if (option.header === true) {
			this.header = parseHTML(h5.core.view.get(POPUP_HEADER_TEMPLATE_ID));
			$root.append(this.header);
			// TODO この形式は1.6で動かない
			// ポップアップの閉じるボタンが押された時のイベントハンドラ
			$root.one('click', '.popupCloseBtn', this, popupCloseHandler);
		}

		this.contents = parseHTML(POPUP_CONTENTS);
		$root.append(this.contents);

		this._controller = null;

		// titleが指定されていればsetTitle
		if (title) {
			this.setTitle(title);
		}

		// contentsまたはcontrollerが指定されていればsetContentsする
		this.setContents(contents, controller);

		this._position = $.extend(true, {}, popupDefaultPositon);

		this._deferred = h5.async.deferred();
		this.promise = this._deferred.promise();

		if (option.draggable === true) {
			// ポップアップをドラッグ可能にする。
			// ヘッダ部分がデフォルトでドラッグ可能であるが、
			// popupDraggerクラスが指定されている要素がコンテンツにあればその要素からでもドラッグできる
			$root.find('.popupHeader').addClass('popupDragger');

			// ドラッグ用のコントローラをバインドする
			h5.core.controller(this.rootElement, draggableController, {
				popup: this
			});
		}
	}

	$.extend(Popup.prototype,
			{
				show: function(option) {
					if (this._isShowing) {
						return;
					}
					this._isShowing = true;
					option = option || {};

					// 表示の順序を更新する
					removeGroupOrder(this.group);
					popupGroupOrderArray.push(this.group);

					// オーバレイの表示(デフォルトは表示、falseが指定されていたら非表示)
					this._overlay = option.overlay !== false;
					if (this._overlay) {
						showOverlay();
						// 他のポップアップからcurrentクラスを外す
						for (var group in popupGroupMap) {
							if (group === this.group) {
								// 開こうとしているポップアップは無視する
								continue;
							}
							var p = popupGroupMap[group];
							$(p.rootElement).removeClass('current');
							p._current = false;
						}
					}

					var $root = $(this.rootElement);
					$root.addClass('current');
					this._current = true;
					$root.css('visibility', 'visible');
					this.refresh();

					// イベントをあげる
					$(this.rootElement).trigger('popupOpened', this);
				},

				hide: function() {
					if (!this._isShowing) {
						return;
					}
					this._isShowing = false;

					$(this.rootElement).css('visibility', 'hidden');

					// overlayの上に表示するポップアップにcurrentクラスを付ける
					for (var i = popupGroupOrderArray.length- 1; i >= 0; i--) {
						var p = popupGroupMap[popupGroupOrderArray[i]];
						if (p._isShowing) {
							if (p._current) {
								break;
							}

							$(p.rootElement).addClass('current');
							p._current = true;
							if (p._overlay) {
								break;
							}
						}

						if (i === 0) {
							// すべてoverlay = falseならばオーバーレイを除去する
							removeOverlay();
						}
					}
				},

				close: function(args) {
					this.hide();

					// イベントをあげる(要素を削除する前じゃないとイベントが拾われない)
					$(this.rootElement).trigger('popupClosed', args);

					// ポップアップを削除
					$(this.rootElement).remove();

					// コントローラのdispose
					this._disposeContentsController();

					// リーク対策
					this.rootElement = null;
					this.contents = null;

					delete popupGroupMap[this.group];
					removeGroupOrder(this.group);

					// プロミスから登録されたdoneハンドラを実行
					this._deferred.resolve(args);
				},

				getSize: function() {
					var $root = $(this.rootElement);
					var w = $root.innerWidth();
					var h = $root.innerHeight();
					return {
						width: w,
						height: h
					};
				},

				setTitle: function(title) {
					$(this.header).find('h1').text(title);
				},

				getTitle: function() {
					return $(this.header).find('h1').text();
				},

				setContentsSize: function(width, height) {
					$(this.contents).css({
						width: width,
						height: height
					});
				},

				getContentsSize: function() {
					var $contents = $(this.contents);
					return {
						width: $contents.widht(),
						height: $contents.height()
					};
				},

				setContents: function(contents, controller) {
					// コントローラをアンバインド
					this._disposeContentsController();
					// コンテンツをセット
					if (isString(contents)) {
						// contentsが文字列の場合はhtmlで追加
						$(this.contents).html(contents);
					} else if (contents
							&& (contents instanceof $ || typeof contents.nodeType === 'number')) {
						// コンテンツがjQueryオブジェクトまたはDOMオブジェクトの場合はappend
						$(this.contents).html($(contents).clone());
					}
					$(this.contents).html(contents);
					if (this._isShowing) {
						this.refresh();
					}
					// コントローラが渡されたらコンテンツ部分にバインド
					// (コントローラはsetContentsを使ってのみセットできる。setContentsControllerは用意していない)
					if (controller) {
						this._controller = h5.core.controller(this.contents, controller, {
							popup: this
						});
					}
				},

				getContents: function() {
					return $(this.contents);
				},

				setPosition: function(constraint, options) {
					// 位置の指定
					if (constraint) {
						var tmp = constraint.split('-');
						var top,left;
						if (tmp.length === 1) {
							if (tmp[0] == POSITION_CONSTRAINT.top
									|| tmp[0] == POSITION_CONSTRAINT.mid
									|| tmp[0] == POSITION_CONSTRAINT.bottom) {
								top = tmp[0];
								left = POSITION_CONSTRAINT.center;
							} else {
								left = tmp[0];
								top = POSITION_CONSTRAINT.mid;
							}
						} else {
							top = tmp[0];
							left = tmp[1];
						}
						this._position.top = top;
						this._position.left = left;
					}
					if (options) {
						$.extend(this._position.position, options, options);
					}

					if (this._isShowing) {
						this.refresh();
					}
				},

				refresh: function() {
					movePopup(this.rootElement, this._position);
				},

				_disposeContentsController: function() {
					// 内部のコントローラを全てdisposeする
					// disposeでPromiseが返ってきたら、removeはdispose完了後にする。
					var controllers = h5.core.controllerManager.getControllers(this.rootElement, {
						deep: true
					});
					for ( var i = 0, len = controllers.length; i < len; i++) {
						controllers[i].dispose();
					}
					this._controller = null;
				}
			});

	/**
	 * ポップアップを作成します。作成した時点では表示されません。<br>
	 * 同じグループのポップアップは同時に1つだけ存在します。 (同一グループのものを開くと、現在開いているものが消えます。)
	 *
	 * @param {String} group グループ名
	 * @param {String} title タイトル名
	 * @param {String} [contents] ポップアップに表示するコンテンツ
	 * @param {Controller} [controller] コンテンツにバインドするコントローラ
	 * @param {String} [param] オプションパラメータ
	 */
	function createPopup(group, title, contents, controller, param) {
		var actualParam = $.extend({}, popupDefaultParam, param);

		// z-indexはcssで指定してある
		var elem = $('<div class="h5Popup">').css({
			position: actualParam.position,
			visibility: 'hidden'
		})[0];
		$(document.body).append(elem);
		var p = new Popup(elem, group, title, contents, controller, actualParam);

		if (isString(group)) {
			var lastPopup = popupGroupMap[group];
			if (lastPopup) {
				lastPopup.close();
				removeGroupOrder(this.group);
			}
			popupGroupMap[group] = p;
		}

		return p;
	}

	function getPopup(group) {
		return popupGroupMap[group];
	}

	h5.u.obj.expose('h5.ui.popupManager', {
		createPopup: createPopup,
		getPopup: getPopup
	});
})(jQuery);
(function() {
	var PREFER_VIEWER_BROWSERPLUGIN = 'browserplugin';
	var PREFER_VIEWER_PDFJS = 'pdfjs';

	/**
	 * コントローラ
	 *
	 * @name h5.ui.components.pdf.PdfController
	 */
	var controller = {
		/**
		 * コントローラ名
		 *
		 * @memberOf h5.ui.components.pdf.PdfController
		 */
		__name: 'h5.ui.components.pdf.PdfController',

		/**
		 * 現在表示中のpdfオブジェクト
		 */
		_pdf: null,

		/**
		 * 現在表示中のページオブジェクト
		 * <p>
		 * _pdf内のページを表す
		 * </p>
		 */
		_page: null,

		/**
		 * 表示スケール
		 */
		_scale: 1,

		/**
		 * 初期化処理
		 *
		 * @memberOf h5.ui.components.pdf.PdfController
		 * @param {Object} context コンテキスト
		 */
		__ready: function(context) {
			var $root = $(this.rootElement);
			// デフォルト
			var preferViewer = $root.data('prefer-viewr') || PREFER_VIEWER_BROWSERPLUGIN;
			var url = $root.data('url');

			if (preferViewer === PREFER_VIEWER_BROWSERPLUGIN && this._hasPDFPlugin()) {
				// ブラウザプラグインでの表示指定かつpdf表示プラグインがある場合はobject要素で表示
				var $object = $('<object></object>');
				$object.attr({
					data: url,
					type: 'application/pdf',
					// 幅、高さはrootに合わせる
					width: $root.width(),
					height: $root.height()
				});
				$root.append($object);

				return;
			}

			// pdfjs指定でPDFJSが読み込まれていなかったらエラー
			if (!window.PDFJS) {
				this.throwError('pdf.jsライブラリが読み込まれていません');
			}

			// 表示するcanvasの作成
			var canvas = document.createElement('canvas');
			this.canvas = canvas;
			// 幅、高さはrootに合わせる
			canvas.width = $root.width();
			canvas.height = $root.height();
			$root.append(canvas);
			this._scale = parseFloat($root.data('scale')) || this._scale;
			if (url) {
				return this.loadPdfDocument(url, preferViewer);
			}
		},

		_hasPDFPlugin: function() {
			// ActiveXObjectがある場合は先にそれを使って判定
			try {
				// ActiveXObjectは直接参照してもundefinedだが、constructorを持つ(IE)
				// そのためActiveXObjectが存在するかどうかの判定はできないのでtry-catchでconstructorにアクセスして確認している
				ActiveXObject.constructor;

				// IEの場合
				function getActiveXObject(name) {
					try {
						return new ActiveXObject(name);
					} catch (e) {
						return;
					}
				}
				if (getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl')) {
					return true;
				}
			} catch (e) {
				// エラーの場合はnavigator.pluginsで判定
			}
			// ActiveXObjectが無いまたはActiveXObjectでpdfプラグインが無い場合はnavigator.pluginsで判定
			var plugins = navigator.plugins;
			return !!(plugins['Chrome PDF Viewer'] || plugins['Adobe Acrobat'] || plugins['WebKit built-in PDF']);
		},

		/**
		 * pdfのロード
		 *
		 * @param url
		 * @param preferViewer
		 * @param [scale=1]
		 * @returns
		 */
		loadPdfDocument: function(url, preferViewer) {
			var dfd = h5.async.deferred();
			PDFJS.getDocument(url).then(this.own(function(pdf) {
				this._pdf = pdf;
				// 1ページ目を取得
				this.getPage(1).done(function() {
					dfd.resolve();
				});
			}));
			return dfd.promise();
		},

		/**
		 * 指定されたindex(1始まり)のページを表示
		 */
		getPage: function(index) {
			if (!this._pdf) {
				this.throwError('PDFドキュメントがロードされていません。loadPdfDocumentを先に呼ぶ必要があります。');
			}
			var dfd = h5.async.deferred();
			this._pdf.getPage(index).then(this.own(function(page) {
				this._page = page;
				// 描画
				page.render({
					canvasContext: this.canvas.getContext('2d'),
					viewport: page.getViewport(this._scale)
				});
				dfd.resolve();
			}));
			return dfd.promise();
		},

		/**
		 * 次のページ
		 */
		nextPage: function() {
			var page = this._page;
			if (!page) {
				return;
			}
			var current = page.pageIndex;
			var numPages = this._pdf.numPages;
			if (numPages <= current + 1) {
				// 次のページが無い
				return;
			}
			this.getPage(current + 2);
		},

		/**
		 * 前のページ
		 */
		prevPage: function() {
			var page = this._page;
			if (!page) {
				return;
			}
			var current = page.pageIndex;
			if (current < 1) {
				// 前のページが無い
				return;
			}
			this.getPage(current);
		},

		/**
		 * 拡大・縮小
		 */
		zoom: function(val) {
			var page = this._page;
			if (!page) {
				return;
			}
			this._scale += val;
			page.render({
				canvasContext: this.canvas.getContext('2d'),
				viewport: page.getViewport(this._scale)
			});
		},

	//		fotToContents: function(){
	//			var page = this._page;
	//			if (!page) {
	//				return;
	//			}
	//			// ページに合わせてcanvasを設定
	//			var viewport = page.getViewport(1);
	//			var canvas = this.canvas;
	//			canvas.height = viewport.height;
	//			canvas.width = viewport.width;
	//		}
	};
	h5.core.expose(controller);
})();
$(function() {

	var logger = h5.log.createLogger('ReplaceBoxController');

	var replaceBoxController = {

		__name: 'h5.ui.container.ReplaceBoxController',

		_easing: 'linear',

		_duration: 400,

		transitionName: 'slideLeft',

		_transition: {
			slideLeft: function(root, current, next, option) {
				this._slide(root, current, next, option, 'left');
			},
			slideRight: function(root, current, next, option) {
				this._slide(root, current, next, option, 'right');
			},
			slideUp: function(root, current, next, option) {
				this._slide(root, current, next, option, 'up');
			},
			slideDown: function(root, current, next, option) {
				this._slide(root, current, next, option, 'down');
			},
			pushLeft: function(root, current, next, option) {
				this._slide(root, current, next, option, 'left', 'push');
			},
			pushRight: function(root, current, next, option) {
				this._slide(root, current, next, option, 'right', 'push');
			},
			pushUp: function(root, current, next, option) {
				this._slide(root, current, next, option, 'up', 'push');
			},
			pushDown: function(root, current, next, option) {
				this._slide(root, current, next, option, 'down', 'push');
			},
			_slide: function(root, current, next, option, direction, style) {
				var _option = this._wrapOption(root, current, next, option);
				var position = current.position();
				var left,top,pLeft,pTop;
				left = pLeft = position.left;
				top = pTop = position.top;
				switch (direction) {
				case 'left':
					left += root.width();
					pLeft -= root.width();
					break;
				case 'right':
					left -= root.width();
					pLeft += root.width();
					break;
				case 'up':
					top += root.height();
					pTop -= root.height();
					break;
				case 'down':
					top -= root.height();
					pTop += root.height();
					break;
				}
				var zIndex = current.css('z-index');
				if (!zIndex || zIndex == 'auto')
					zIndex = 0;

				moveElement(next, {
					left: left,
					top: top,
					'z-index': zIndex + 1,
					visibility: 'visible'
				}, _option);

				moveElementWithAnimate(next, {
					left: position.left,
					top: position.top
				}, _option);
				if (style == 'push') {
					moveElementWithAnimate(current, {
						left: pLeft,
						top: pTop
					}, $.extend(true, _option, {
						complete: null
					}));
				}
			},
			openLeft: function(root, current, next, option) {
				this._open(root, current, next, option, 'left');
			},
			openRight: function(root, current, next, option) {
				this._open(root, current, next, option, 'right');
			},
			openUp: function(root, current, next, option) {
				this._open(root, current, next, option, 'up');
			},
			openDown: function(root, current, next, option) {
				this._open(root, current, next, option, 'down');
			},
			_open: function(root, current, next, option, direction, style) {
				var _option = this._wrapOption(root, current, next, option);
				var zIndex = current.css('z-index');
				if (!zIndex || zIndex == 'auto')
					zIndex = 0;
				current.css({
					'z-index': zIndex + 1
				});
				var position = current.position();
				moveElement(next, {
					left: position.left,
					top: position.top,
					'z-index': zIndex,
					visibility: 'visible'
				});
				var left = position.left,top = position.top;
				switch (direction) {
				case 'left':
					left -= root.width();
					break;
				case 'right':
					left += root.width();
					break;
				case 'up':
					top -= root.height();
					break;
				case 'down':
					top += root.height();
					break;
				}
				moveElementWithAnimate(current, {
					left: left,
					top: top
				}, _option);
			},
			fade: function(root, current, next, option) {
				var _option = this._wrapOption(root, current, next, option);
				var zIndex = current.css('z-index');
				if (!zIndex || zIndex == 'auto')
					zIndex = 0;
				current.css({
					'z-index': zIndex + 1
				});
				var position = current.position();
				next.css({
					left: position.left,
					top: position.top,
					'z-index': zIndex,
					visibility: 'visible'
				});
				animate(current, {
					opacity: 0
				}, _option);
			},
			_wrapOption: function(root, current, next, option) {
				var _option = $.extend(true, {}, option || {});
				var zIndex = current.css('z-index');
				var position = current.css('position');
				var width = current[0].style.width;
				var height = current[0].style.height;
				var _complete = _option.completeCallback;
				var isTransform = _option.isTransform;
				_option.complete = function() {
					current.remove(); //イベントハンドラも消える。
					next.css('z-index', zIndex);
					if (!isTransform) {
						next[0].style.width = width;
						next[0].style.height = height;
					}
					next.css('position', position);
					if (_complete)
						_complete(current, next);
					root.trigger('replaceBoxComplete', {
						old: current,
						current: next
					});
				};
				next.css({
					display: 'block',
					position: 'absolute',
					width: current.width(),
					height: current.height(),
					'margin-top': current.css('margin-top'),
					'margin-right': current.css('margin-right'),
					'margin-bottom': current.css('margin-bottom'),
					'margin-left': current.css('margin-left'),
					visivility: 'hidden'
				}).appendTo(root);
				// IEで対象要素が消える事象の対応
				if (h5.env.ua.isIE) {
					var currentTop = current.css('top');
					if (!currentTop || currentTop == 'auto')
						current.css('top', '0px');
					var currentLeft = current.css('left');
					if (!currentLeft || currentLeft == 'auto')
						current.css('left', '0px');
				}
				this._relativize(current);
				return _option;
			},

			_relativize: function(jqelm) {
				var position = jqelm.css('position');
				if (position == 'static' || !position) {
					jqelm.css('position', 'relative');
					if (h5.env.ua.isOpera) {
						jqelm.css({
							'top': 0,
							'left': 0
						});
					}
				}
			}
		},

		isTransition: null,

		//デフォルトはfalse。trueにした場合、対象要素の横幅は固定値に限定。%指定、無指定不可。
		//trueにして%指定、無指定の場合、置換後の要素は置換前要素の最後のサイズ固定になる。
		isTransform: false,

		__init: function(context) {
			var root = $(this.rootElement);
			this._relativize(root);
			root.css({
				overflow: 'hidden'
			});
		},

		__ready: function() {
			var root = $(this.rootElement);

			var isTransition = root.attr('data-istransition');
			if (isTransition != undefined) {
				this.isTransition = !!isTransition;
			}

			var isTransform = root.attr('data-istransform');
			if (isTransform != undefined) {
				this.isTransform = !!isTransform;
			}
		},

		replace: function(next, option) {
			var _option = $.extend(true, {
				duration: this._duration,
				easing: this._easing,
				transition: this.transitionName,
				isTransition: this.isTransition,
				isTransform: this.isTransform
			}, option);
			next = $(next);
			var current = this.$find('> *').eq(0);
			var root = $(this.rootElement);
			if ($.isFunction(_option.transition)) {
				_option.transition(root, current, next, _option);
			} else {
				this._transition[_option.transition](root, current, next, _option);
			}
		},

		_relativize: function(jqelm) {
			var position = jqelm.css('position');
			if (position == 'static' || !position) {
				jqelm.css('position', 'relative');
				if (h5.env.ua.isOpera) {
					jqelm.css({
						'top': 0,
						'left': 0
					});
				}
			}
		}
	};

	h5.core.expose(replaceBoxController);

});
var PageLoadLogic = {
	__name: 'h5.ui.components.screen.PageLoadLogic',
	load: function(url) {
		return h5.ajax(url);
	}
};
h5.core.expose(PageLoadLogic);
(function() {
	var ScreenController = {
		/**
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		__name: 'h5.ui.components.screen.ScreenController',

		/**
		 * PageLoadLogic
		 * <p>
		 * PageLoadLogic.jsを呼んでいない場合はundefined
		 * </p>
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		_pageLoadLogic: h5.u.obj.ns('h5.ui.components.screen').PageLoadLogic,

		/**
		 * アニメーション中かどうか
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		_isAnimation: false,

		/**
		 * スクロールラッパー要素
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		_$scrollingBase: null,

		/**
		 * トラック操作中のスクリーン幅(高さ)
		 */
		_screenWH: 0,

		/**
		 * 縦スクロールかどうか。デフォルトはfalseで横スクロール
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		isVertical: false,

		/**
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		__ready: function(context) {
			// 縦か横かを取得
			this.isVertical = context.args.isVertical;

			// screen内に配置されているDOMをコンテンツとして設定
			var $contents = this.$find('>*');
			$contents.css({
				display: 'none'
			}).addClass('h5screenContent');

			// コンテンツが最低1ページ以上になるようにする
			// TODO 後から追加する場合など、バインド時に無い場合の対応。
			if ($contents.length === 0) {
				throw new Error('コンテンツは最低1ページは必要です');
			}
			// ページ数が2以下の場合は3ページ以上になるよう繰り返す
			// TODO ループしない場合や、コントローラがバインドされているページなどクローンしても意味ないものの場合は繰り返す必要ない
			if ($contents.length < 3) {
				// コンテンツにインデックスを振って、どれがどのクローンかわかるようにする
				$contents.each(function(i) {
					$(this).attr('data-h5screenCloneIndex', '' + i);
				});
				while (this.$find('>*').length < 3) {
					$(this.rootElement).append($contents.clone().addClass('clone'));
				}
				$contents = this.$find('>*');
			}

			// 先頭のコンテンツをカレントとして設定
			var $current = $contents.eq(0);
			$current.addClass('current').css('display', 'block');

			// スクロール用のDOMを作成
			this._$scrollingBase = $('<div class="scrollingBase"></div>').css({
				display: 'block',
				left: 0,
				margin: 0,
				padding: 0,
				position: 'relative'
			});
			this._$scrollingBase.append($contents);
			$(this.rootElement).append(this._$scrollingBase);

			// 準備ができたら表示
			$(this.rootElement).css('visibility', 'visible');
		},

		/**
		 * アニメーションをスタートする。
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		startAnimation: function(nextOrPrev) {
			if (this._isAnimation) {
				return;
			}
			var outerWH = this.isVertical ? 'outerHeight' : 'outerWidth';

			// スクリーン幅を取得
			var screenWH = $(this.rootElement)[outerWH]();
			var $current = this.$find('.h5screenContent.current');
			// 左右(上下)のコンテンツを表示。無ければ反対端から持ってくる。
			var $prev = null;
			if (nextOrPrev !== 'next') {
				$prev = $current.prev();
				if (!$prev.length) {
					// コンテンツ数がページ数を超えていれば、左側の要素は右端から持ってくる
					// (TODO loopする場合のみ)
					$prev = this.$find('.h5screenContent:last');
					this._$scrollingBase.prepend($prev);
				}
				$prev.css('display', 'block');
			}
			var $next = null;
			if (nextOrPrev !== 'prev') {
				$next = $current.next();
				if (!$next.length) {
					// コンテンツ数がページ数を超えていれば、右側の要素は左端から持ってくる
					$next = this.$find('.h5screenContent:first');
					this._$scrollingBase.append($next);
				}
				$next.css('display', 'block');
			}

			// display;blockにしてから幅(高さ)を取得
			var currentWH = $current[outerWH]();
			var prevWH = $prev ? $prev[outerWH]() : 0;
			var nextWH = $next ? $next[outerWH]() : 0;

			// scrollingBaseの幅(高さ)を設定
			if (this.isVertical) {
				this._$scrollingBase.css({
					height: prevWH + currentWH + nextWH,
					top: -prevWH
				});
			} else {
				this._$scrollingBase.css({
					width: prevWH + currentWH + nextWH,
					left: -prevWH
				});
			}

			// current,prev,nextの位置調整
			// 幅(高さ)を一時的に固定。固定しないとscrollingBaseの幅によって可変になってしまうため
			$current.add($prev).add($next).css('position', 'absolute');
			if (this.isVertical) {
				$current.css({
					left: 0,
					top: prevWH,
					height: currentWH
				});

				if ($prev) {
					$prev.css({
						left: 0,
						top: 0,
						height: prevWH
					});
				}
				if ($next) {
					$next.css({
						left: 0,
						top: prevWH + currentWH,
						height: nextWH
					});
				}
			} else {
				$current.css({
					top: 0,
					left: prevWH,
					width: currentWH
				});

				if ($prev) {
					$prev.css({
						left: 0,
						top: 0,
						width: prevWH
					});
				}
				if ($next) {
					$next.css({
						top: 0,
						left: prevWH + currentWH,
						width: nextWH
					});
				}
			}

			// scrollingBaseの高さ(幅)を設定。横スクロールなら高さ、縦スクロールなら幅を設定する。
			// screenに高さが設定されていない(position:absoluteの要素しか中にない場合に高さが0になっている)場合は一時的に高さを固定にする
			if (!this.isVertical && !$(this.rootElement).height()) {
				this._$scrollingBase.css({
					height: Math.max(($prev ? $prev.outerHeight() : 0), $current.outerHeight(),
							($next ? $next.outerHeight() : 0))
				});
			}
			if (this.isVertical && !$(this.rootElement).width()) {
				this._$scrollingBase.css({
					width: Math.max(($prev ? $prev.outerWidth() : 0), $current.outerWidth(),
							($next ? $next.outerWidth() : 0))
				});
			}

			this._isAnimation = true;
			$(this.rootElement).addClass(
					'inOperation ' + (this.isVertical ? 'vertical' : 'horizonal'));
			this._animationDfd = h5.async.deferred();
		},
		/**
		 * アニメーションをストップする
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		stopAnimation: function() {
			// ダミーを削除
			this.$find('.h5screenContent.dummy').remove();
			// カレント以外非表示
			var $content = this.$find('.h5screenContent');
			$content.css({
				display: 'none',
				position: '',
				width: '',
				top: '',
				left: ''
			});
			$content.css(this.isVertical ? 'height' : 'width', '');

			var $current = this.$find('.h5screenContent.current');
			$current.css({
				display: 'block'
			});
			// scrollingBaseの位置と幅と高さ調整
			var ltProp = this.isVertical ? 'top' : 'left';
			var lt = parseInt(this._$scrollingBase.css(ltProp));
			this._$scrollingBase.css({
				left: 0,
				top: 0,
				width: '',
				height: '',
				overflow: 'visible'
			});
			this._$scrollingBase.children().each(function() {
				$(this).css(ltProp, parseInt($(this).css(ltProp)) + lt);
			});

			this._isAnimation = false;
			$(this.rootElement).removeClass('inOperation');
			$(this.rootElement).removeClass(this.isVertical ? 'vertical' : 'horizonal');
			this._animationDfd.resolve();
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenController
		 * @param {Number} position 移動先の位置
		 * @param {String|Number} duration アニメーション速度
		 * @returns promise
		 */
		slide: function(position, duration) {
			var dfd = h5.async.deferred();
			this._$scrollingBase.animate((this.isVertical ? {
				top: position
			} : {
				left: position
			}), duration, null, function() {
				dfd.resolve();
			});
			return dfd.promise();
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		track: function(d) {
			var leftOrTop = this.isVertical ? 'top' : 'left';
			this._$scrollingBase.css(leftOrTop, parseInt(this._$scrollingBase.css(leftOrTop)) + d);
		},

		/**
		 * 右に1ページ移動
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 * @returns promise
		 */
		next: function() {
			return this._pageSlide('next');
		},

		/**
		 * 左に1ページ移動
		 *
		 * @memberOf h5.ui.components.screen.ScreenController
		 * @returns promise
		 */
		prev: function() {
			return this._pageSlide('prev');
		},

		/**
		 * ページ移動
		 *
		 * @param {String} nextOrPrev 'next'または'prev'
		 * @returns promise
		 */
		_pageSlide: function(nextOrPrev) {
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				var dfd = h5.async.deferred();
				this._animationDfd.done(this.own(function() {
					this._pageSlide(nextOrPrev).done(function() {
						dfd.resolve();
					});
				}));
				return dfd.promise();
			}
			// スクロールする量を、startAnimationする前に取得する(スクロールバーが表示される前)
			var scrollAmount = nextOrPrev === 'prev' ? 0
					: -$(this.rootElement)[this.isVertical ? 'innerHeight' : 'innerWidth']();
			this.startAnimation(nextOrPrev);
			return this.slide(scrollAmount).done(this.own(function() {
				// カレントの入れ替え
				var $current = this.$find('.h5screenContent.current').removeClass('current');
				$current[nextOrPrev]().addClass('current').removeClass('dummy');
				this.stopAnimation();
			}));
		},

		/**
		 * ページをロード
		 *
		 * @param {String} url
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		load: function(url) {
			if (!url) {
				return;
			}
			if (!this._pageLoadLogic) {
				throw new Error('コンテンツのロード機能を使用するにはPageLoadLogic.jsが必要です');
			}
			// ロード開始時のカレントを覚えておく
			var $current = this.$find('.h5screenContent.current');
			// ページのロード
			var promise = this._pageLoadLogic.load(url).done(
					this.own(function(data) {
						var $target = $current;
						// cloneしたものがあればそこにもロード結果を反映する
						var cloneIndex = $current.attr('data-h5screencloneindex');
						if (cloneIndex != null) {
							$target = $target.add($current.parent().find(
									'[data-h5screencloneindex="' + cloneIndex + '"]'));
						}
						$target.html(data).addClass('loaded');
					}));
			this.indicator({
				target: $current,
				promises: promise
			}).show();
		},

		/**
		 * ページを追加
		 *
		 * @param {jQuery} $elm
		 * @returns {Promise}
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		add: function($elm) {
			var dfd = h5.async.deferred();
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				this._animationDfd.done(this.own(function() {
					this.add($elm).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}

			// カレントの後ろに追加する
			var $current = this.$find('.h5screenContent.current');
			// コンテンツ化
			this._translateContents($elm);
			$current.after($elm);

			// 循環しない場合で、最後の要素だった場合はクラスを入れ替える
			if (!this._circulation && $current.hasClass('h5screenLastContent')) {
				$current.removeClass('h5screenLastContent');
				$elm.addClass('h5screenLastContent');
			}
			return dfd.resolve().promise();
		},

		/**
		 * 指定されたページの箇所に移動
		 *
		 * @param {jQuery} $elm
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		move: function($target) {
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				var dfd = h5.async.deferred();
				this._animationDfd.done(this.own(function() {
					this.move($target).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}
			var dfd = h5.async.deferred();
			var $current = this.$find('.h5screenContent.current');
			if ($target[0] === $current[0]) {
				// 指定されたターゲットが現在のページなら何もしない
				return dfd.resolve().promise();
			}

			$target.css('display', 'block');
			$current.css('display', 'none');
			$target.css({
				top: 0,
				left: 0
			});
			// カレントの入れ替え
			$current.removeClass('current');
			$target.addClass('current').removeClass('dummy');
			return dfd.resolve().promise();
		},

		/**
		 * ページを削除
		 *
		 * @param {jQuery} $elm
		 * @memberOf h5.ui.components.screen.ScreenController
		 */
		remove: function($elm) {
			var dfd = h5.async.deferred();
			if ($.inArray($elm[0], this.$find('.h5screenContent')) === -1) {
				var e = new Error('削除する要素はスクリーン内のコンテンツ要素を指定してください');
				throw e;
				return dfd.reject(e).promise();
			}
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				this._animationDfd.done(this.own(function() {
					this.remove($elm).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}

			if (this.$find('.h5screenContent').length < 2) {
				// 1つしかない場合は削除でない
				return dfd.reject().promise();
			}

			var $current = this.$find('.h5screenContent.current');
			if ($elm[0] === $current[0]) {
				// カレントを削除するときは移動してから削除する
				var promise = null;
				if (!this._circulation && $current.hasClass('h5screenFirstContent')) {
					// 次のページへ移動
					promise = this.next().done(function() {
						$current.next().addClass('h5screenFirstContent');
					});
				} else {
					// 前のページへ移動
					promise = this.prev().done(function() {
						if ($current.hasClass('h5screenLastContent')) {
							$current.prev().addClass('h5screenLastContent');
						}
					});
				}
				// 移動してから削除
				promise.done(this.own(function() {
					// コントローラのdispose
					this._disposeContentsController($elm).done(function() {
						// 要素の削除
						$elm.remove();
						dfd.resolve();
					});
				}));
				return dfd.promise();
			}

			// カレント以外の要素が削除対象の場合
			if ($elm.hasClass('h5screenFirstContent')) {
				// クラスの入れかえ
				$elm.next().addClass('h5screenFirstContent');
			}
			if ($elm.hasClass('h5screenLastContent')) {
				// クラスの入れかえ
				$elm.prev().addClass('h5screenLastContent');
			}
			this._disposeContentsController($elm).done(function() {
				$elm.remove();
				dfd.resolve();
			});

			return dfd.promise();
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenController
		 * @param $elm
		 * @returns promise
		 */
		_disposeContentsController: function($elm) {
			// 内部のコントローラを全てdisposeする
			// disposeでPromiseが返ってきたら、removeはdispose完了後にする。
			var controllers = h5.core.controllerManager.getControllers($elm, {
				deep: true
			});
			var promises = [];
			for (var i = 0, len = controllers.length; i < len; i++) {
				promises.push(controllers[i].dispose());
			}
			return h5.async.when(promises);
		}
	};
	h5.core.expose(ScreenController);
})();

(function() {
	var ScreenUIController = {
		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		__name: 'h5.ui.components.screen.ScreenUIController',

		/**
		 * 指でスライドするときの、スライド距離と移動距離のレート(移動距離/スライド距離)
		 *
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		_slideRate: 1,

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		_screenController: h5.ui.components.screen.ScreenController,

		/**
		 * trackstart時のスクリーン幅を覚えておく
		 *
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		_screenWH: 0,

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		__ready: function(context) {
			// コントローラのパラメータで渡されたナビゲーションコントローラをバインドします
			var navigationController = context.args.navigationController;
			this._navController = h5.core.controller(context.args.navigationRootElement
					|| this.rootElement, navigationController, $.extend({}, context.args, {
				$screen: this.$find('.screen')
			}));
		},

		/**
		 * スクリーンがアニメーション中かどうかを返す
		 *
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		isAnimation: function() {
			return this._screenController._isAnimation;
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		__meta: {
			_screenController: {
				rootElement: '.screen'
			}
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} loadPage': function(context) {
			this._loadPage(context);
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 * @param url
		 */
		_loadPage: function(context) {
			if (!context.evArg || !context.evArg.url || !context.evArg.force
					&& this.$find('.h5screenContent.current').hasClass('loaded')) {
				// url指定が無ければロードしない
				// forceオプション無しかつ、すでにコンテンツが読み込まれているなら何もしない
				// forceの指定があれば読み込み済みであろうと強制的に再ロードする
				return;
			}
			this._screenController.load(context.evArg.url);
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} nextPage': function(context) {
			var $current = this.$find('.h5screenContent.current');
			this._screenController.next().always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						var isResolved = promise.state() === 'resolved';
						if (!$current.hasClass('current')) {
							this._callNavigationCallback('change', [
									this.$find('.h5screenContent.current'), $current]);
						}
						if (isResolved) {
							this._loadPage(context);
						}
					}));
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} prevPage': function(context) {
			var $current = this.$find('.h5screenContent.current');
			this._screenController.prev().always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						var isResolved = promise.state() === 'resolved';
						if (!$current.hasClass('current')) {
							this._callNavigationCallback('change', [
									this.$find('.h5screenContent.current'), $current]);
						}
						if (isResolved) {
							this._loadPage(context);
						}
					}));
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} movePage': function(context) {
			var $current = this.$find('.h5screenContent.current');
			var $target = $(context.evArg.target);
			this._screenController.move($target);
			// ナビゲーションコントローラに通知

			if (!$current.hasClass('current')) {
				this._callNavigationCallback('change', [this.$find('.h5screenContent.current'),
						$current]);
			}

			this._loadPage(context);
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} screenTrackstart': function(context) {
			if (this._screenController._isAnimation) {
				return;
			}
			var trackSize = context.evArg.trackSize;
			this._screenWH = this.$find('.screen')[this._screenController.isVertical ? 'height'
					: 'width']();
			this._slideRate = this._screenWH / trackSize;
			this._screenController.startAnimation();
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} screenTrackmove': function(context) {
			var d = context.evArg.dist * this._slideRate;
			if (d === 0) {
				return;
			}
			this._screenController.track(d);
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 */
		'{rootElement} screenTrackend': function(context) {
			var $current = this.$find('.h5screenContent.current');
			var $newCurrent = null;
			var page = context.evArg.page;
			var url = context.evArg.url;
			var changed = false;
			var slideDist;
			if (page === 'current') {
				$newCurrent = $current;
				slideDist = -this._screenWH;
			} else {
				changed = true;
				$newCurrent = $current[page]();
				$current.removeClass('current');
				$newCurrent.addClass('current');
				slideDist = (page === 'next' ? -2 : 0) * this._screenWH;
			}
			this._screenController.slide(slideDist, 'fast').done(this.own(function() {
				this._screenController.stopAnimation();

				if (changed) {
					// ナビゲーションコントローラに通知
					this._callNavigationCallback('change', [$newCurrent, $current]);

					// ロード
					if (!$newCurrent.hasClass('loaded') || context.evArg.force) {
						this._screenController.load(url);
					}
				}
			}));
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 * @param context
		 */
		'{rootElement} addPage': function(context) {
			var $elm = context.evArg.element;
			this._screenController.add($elm).always(this.ownWithOrg(function(promise) {
				// ナビゲーションコントローラに通知
				this._callNavigationCallback('add', [$elm, promise.state() === 'resolved']);
			}));
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 * @param context
		 */
		'{rootElement} removePage': function(context) {
			var $current = this.$find('.h5screenContent.current');
			var $elm = context.evArg.element;
			this._screenController.remove($elm).always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						this._callNavigationCallback('remove', [$elm,
								promise.state() === 'resolved']);
						// 現在のページが変更されていたらchangeで通知
						if (!$current.hasClass('current')) {
							this._callNavigationCallback('change', [
									this.$find('.h5screenContent.current'), $current]);
						}
					}));
		},

		/**
		 * @memberOf h5.ui.components.screen.ScreenUIController
		 * @param context
		 */
		_callNavigationCallback: function(event, args) {
			if (this._navController) {
				$(this._navController.rootElement).trigger('screen' + event, args);
			}
		}
	};

	h5.core.expose(ScreenUIController);
})();
$(function() {

	var logger = h5.log.createLogger('TabbableController');

	var tabbableController = {
		__name: 'TabbableController',

		__ready: function() {

		},

		'.nav-tabs a click': function(context) {
			context.event.preventDefault();
			var cur = $(context.event.currentTarget);
			var tabName = cur.attr('data-tab-name');
			var target = this.$find('[data-tab-name="' + tabName + '"]');
			this.$find('.nav-tabs > *').removeClass('active');
			cur.closest('.nav-tabs > *').addClass('active');
			this.$find('.tab-pane').removeClass('active');
			this.$find('.tab-pane').filter(target).addClass('active');
		}
	};
	$('.tabbable').each(function() {
		h5.core.controller(this, tabbableController);
	});


});
(function() {

	var ROW_NUM = 2; // 行数(ダミー)
	var COL_NUM = 2; // 列数(ダミー)

	var columnsController = {
		__name: 'h5.ui.components.tileContainer.tileContainerController',

		$dummyColumn: $('<div class="dummy-column">'),

		$columns: [],

		columnSize: 0,

		$currentTarget: null,

		dummyIndex: null,

		/**
		 * カラム移動が強制的にキャンセルされたかどうか
		 */
		forceCanceled: false,

		/**
		 * カラムが移動可能かどうか。 __ready実行後に移動可能にする
		 */
		ableToMove: false,

		__ready: function(context) {
			$(this.rootElement).append(this.$dummyColumn);

			// 保存済みのカラムの順序があればそれを使う
			var order = h5.ui.components.tileContainer.columnOrder;

			var check = false;
			// カラムの順序のカラムの名前があっているかどうかチェック
			if (order
					&& order.length === $(this.rootElement).children(':not(.dummy-column)').length) {
				check = true;
				for (var i = 0, l = order.length; i < l; i++) {
					if (this.$find('#' + order[i]).length === 0) {
						check = false;
						break;
					}
				}
			}

			if (check) {
				// 保存されているカラム順が正しいカラム名だったら
				// その通りの順序に並び替える
				for (var i = 0, l = order.length; i < l; i++) {
					this.$columns.push($(this.rootElement).find('#' + order[i]));
					this.columnSize++;
				}
			} else {
				// $columnsに現在の状態を追加
				var that = this;
				$(this.rootElement).children(':not(.dummy-column)').each(function() {
					that.$columns.push($(this));
					$(this).css('z-index', '0');
					that.columnSize++;
				});
			}

			this.moveColumns();
			this.ableToMove = true;
		},

		_getSize: function($column) {
			var classArray = $column.attr('class').split(' ');
			var size = 1;
			for (var i = 0, l = classArray.length; i < l; i++) {
				if (h5.u.str.startsWith(classArray[i], 'column')) {
					size = Math.max(parseInt(classArray[i].slice(6) || 1), size);
				}
			}
			return size;
		},

		/**
		 * 設定を保存ボタンから呼ばれるイベント カラムの位置を保存する
		 */
		'{rootElement} _save': function(context) {
			var order = [];
			for (var i = 0, len = this.$columns.length; i < len; i++) {
				order.push(this.$columns[i].attr('id'));
			}
			training.common.data.columnOrder = order;
		},

		'.header h5trackstart': function(context) {
			if (!this.ableToMove) {
				return;
			}

			this.forceCanceled = false;
			context.event.preventDefault();

			this.$currentTarget = $(context.event.target).parent();
			var marginLeft = parseInt(this.$currentTarget.css('margin-left'));
			var marginTop = parseInt(this.$currentTarget.css('margin-top'));

			this.$currentTarget.css('z-index', 1);
			this.$currentTarget.addClass('dragging');

			this.$dummyColumn.toggle();

			this.currentTargetSize = this._getSize(this.$currentTarget);
			this.$dummyColumn.addClass('column');
			this.$dummyColumn.addClass('column' + this.currentTargetSize);

			this.$dummyColumn.css({
				width: this.$currentTarget.width(),
				height: this.$currentTarget.height(),
				left: this.$currentTarget.offset().left - marginLeft,
				top: this.$currentTarget.offset().top - marginTop
			});

			// dummyColumnを配列内の対象と置き換える
			this._setDummyIndex();
		},

		_setDummyIndex: function() {
			for (var i = 0, len = this.$columns.length; i < len; i++) {
				if (this.$columns[i][0] === this.$currentTarget[0]) {
					this.$columns[i] = this.$dummyColumn;
					this.dummyIndex = i;
					break;
				}
			}

		},

		'.header h5trackmove': function(context) {
			if (!this.ableToMove) {
				return;
			}
			if (this.forceCanceled) {
				return;
			}
			context.event.preventDefault();

			var dx = context.event.dx;
			var dy = context.event.dy;
			var offset = this.$currentTarget.offset();
			var marginLeft = parseInt(this.$currentTarget.css('margin-left'));
			var marginTop = parseInt(this.$currentTarget.css('margin-top'));

			this.move(offset.left + dx - marginLeft, offset.top + dy - marginTop);
		},

		'.header h5trackend': function(context) {
			if (!this.ableToMove) {
				return;
			}

			this.$columns[this.dummyIndex] = this.$currentTarget;
			this.moveColumns();

			this.$currentTarget.css('z-index', 0);
			this.$dummyColumn.removeClass('column');
			this.$dummyColumn.removeClass('column' + this.currentTargetSize);
			this.$dummyColumn.css('display', 'none');
		},

		/**
		 * 指定された位置へ移動
		 *
		 * @param x x座標
		 * @param y y座標
		 * @memberOf h5.ui.components.tileContainer.tileContainerController
		 */
		move: function(x, y) {
			// 移動中のカラムをマウスに追従させる
			this.$currentTarget.css({
				left: x,
				top: y
			});

			// カラムが2つ未満なら何もしない
			if (this.columnSize < 2) {
				return;
			}

			// 移動中のカラムと一番近いカラム(のインデックス)を取得する
			var currentCenter = this.getCenter(this.$currentTarget);
			var d = Infinity;
			var targetIndex;
			for (var j = 0, l = this.$columns.length; j < l; j++) {
				// 移動中のカラムの中心位置と各カラムの中心位置との距離を計測して、最小値をとる
				var center = this.getCenter(this.$columns[j]);
				var tempD = Math.pow(currentCenter.x - center.x, 2)
						+ Math.pow(currentCenter.y - center.y, 2);
				if (d > tempD) {
					d = tempD;
					targetIndex = j;
				}
			}

			if (targetIndex === this.dummyIndex) {
				return;
			}

			// 配列内のdummyColumnを現在の位置へ移動する
			this.$columns.splice(this.dummyIndex, 1);
			this.$columns.splice(targetIndex, 0, this.$dummyColumn);

			// カラムを今の順番で移動させる
			var dummyIndex = this.dummyIndex;
			this.dummyIndex = targetIndex;
			if (dummyIndex > targetIndex) {
				this.moveColumns(targetIndex, dummyIndex);
			} else {
				this.moveColumns(dummyIndex, targetIndex);
			}
		},

		/**
		 * カラムの移動終了時の処理
		 *
		 * @memberOf h5.ui.components.tileContainer.tileContainerController
		 */
		moveColumns: function(from, to) {
			var offset = $(this.rootElement).offset();
			var left = offset.left;
			var top = offset.top;
			// var width = $('body').width();

			if (from === undefined) {
				from = 0;
			}
			if (to === undefined) {
				to = this.$columns.length - 1;
			}

			var rowSize = 0;
			var height = 0;
			for (var i = 0, len = this.$columns.length; i < len; i++) {
				var $div = this.$columns[i];
				var size = this._getSize($div);
				if (rowSize + size > ROW_NUM) {
					// はみ出たとき
					// 当てはまるものを探しにいく
					for (var j = i; j < len; j++) {
						var $jthColumn = this.$columns[j];
						var tempSize = this._getSize($jthColumn);
						if (rowSize + tempSize > ROW_NUM) {
							continue;
						}
						// i番目とj番目を入れ替える
						this.$columns[j] = $div;
						$div = $jthColumn;
						this.$columns[i] = $jthColumn;
						size = tempSize;
						if (this.dummyIndex === i) {
							this.dummyIndex = j;
						} else if (this.dummyIndex === j) {
							this.dummyIndex = i;
						}
						break;
					}
				}
				$div.css({
					left: left,
					top: top
				});
				height = Math.max(height, $div.outerHeight()
						+ Math.round(parseFloat($div.css('margin-top')))
						+ Math.round(parseFloat($div.css('margin-bottom'))));

				left += $div.outerWidth() + Math.round(parseFloat($div.css('margin-left')))
						+ Math.round(parseFloat($div.css('margin-right')));

				rowSize += size;

				if (rowSize === ROW_NUM) {
					left = offset.left;
					top += height;
					rowSize = 0;
					height = 0;
				}
			}
		},

		getCenter: function($target) {
			var offset = $target.offset();

			return {
				x: offset.left + $target.width() / 2,
				y: offset.top + $target.height() / 2
			};
		}
	};
	h5.core.expose(columnsController);
})();

})(jQuery);
