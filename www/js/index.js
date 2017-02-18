(function($) {
	var REGIST_URL = 'regist';

  /**
   * 日報画面用ロジック定義
   */
	var reportLogic = {
		/**
		 * ロジック名
		 *
		 * @memberOf itpro.sample.report.logic.ReportLogic
		 */
		__name: 'itpro.sample.report.logic.ReportLogic',

		register: function(reportData) {
			return h5.ajax(REGIST_URL, {
				type: 'post',
        data: JSON.stringify(reportData)
			});
		}
	};

	h5.core.expose(reportLogic);
})(jQuery);

(function($) {
	var HAS_ERROR_INPUT = 'has-error';
	var utils = itpro.sample.report.utils;
	/**
   * 日報画面用コントローラ定義
	 *
	 * @name itpro.sample.report.controller.ReportController
	 */
	var reportController = {
		/**
		 * コントローラ名
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		__name: 'itpro.sample.report.controller.ReportController',

		_reportLogic: itpro.sample.report.logic.ReportLogic,
		/**
		 * ユーザ情報
		 */
		_userInfo: null,
		/**
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		__ready: function() {
			// ユーザID,ユーザ名を追加
			this._userInfo = utils.getLoginUserInfo();
			this.$find('.userName').text(this._userInfo.id);
			this.$find('.realName').text(this._userInfo.name);
			this._$msg = this.$find('.report-content').find('.msg');
			this._$indicator = this.$find('.indicator-wrap');

      //this._setDafaultWorkTime();

			// コントローラバインド時にトップへスクロールして、タイトルバーを隠す(モバイル用)
			h5.ui.scrollToTop();

			var req = utils.getRequestParameters();
			if (req.date) {
				// リクエストパラメータに日付が指定されていれば日付を設定
				this.$find('input[name="reportDate"]').val(utils.formatDateWithHyphen(new Date(req.date)));
				return;
			}

			// 日付が指定されていない場合は今日の日報
			this.$find('input[name="reportDate"]').val(utils.formatDateWithHyphen(new Date()));
		},
		
		/**
		 * inputとtextarea要素のfocusoutイベントで入力内容の検証をします
		 *
		 * @memberOf itpro.sample.report.controller.ReportControlle
		 */
		'input, textarea focusout': function(context, $el) {
			var value = $el.val();
			var name = $el.attr('name');
			if (name == 'img') {
				return;
			}

			var $formGroup = $el.parents('.form-group');
			if (value == null || value == '') {
				// 入力内容が空のとき
				if ($formGroup.hasClass(HAS_ERROR_INPUT)) {
					// すでにエラーが表示されていれば何もしない
					return;
				}
				// Bootstrapのクラス(has-error)を使って入力項目を強調
				$formGroup.addClass(HAS_ERROR_INPUT);
				// ページの先頭のmsgクラスの要素にメッセージを追加
				var label = $formGroup.find('label').text();
				var $p = $('<p data-itpro-input-name="' + name + '">');
				//$p.append('<strong>' + label + 'が入力されていません' + '</strong>');
				$p.append('<strong>' + '日記が入力されていません' + '</strong>');
    			this._$msg.append($p);
			} else {
				// 入力されているとき
                // 入力項目を強調するクラスを除去(ついていなければ何もしない
				$formGroup.removeClass(HAS_ERROR_INPUT);
				// メッセージを削除
				this._$msg.find('p[data-itpro-input-name="' + name + '"]').remove();
			}
			// エラーメッセージがあればメッセージ領域を表示
			if (this._$msg.children().length != 0) {
				this._$msg.show();
			} else {
				this._$msg.hide();
			}
		},

    /**
     * 写真を選択したときにプレビューを表示する
     * 
     * @memberOf itpro.sample.report.controller.ReportController
     */
		'input[name="img"] change': function(context, $el) {
			// input要素からファイルを取得
			var $imgPreview = this.$find('.img-preview');
			$imgPreview.show();

			var file = $el[0].files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				$imgPreview.find('img').attr('src', e.target.result);
			};
			reader.readAsDataURL(file);
		},

		/**
		 * 日報をサーバに登録する
		 *
     * @memberOf itpro.sample.report.controller.ReportController
		 */
		'.register click': function(context, $el) {
      // submitイベントのデフォルトの挙動（画面の遷移）をキャンセル
			context.event.preventDefault();

			// 送信データを生成し、サーバーに送信
			var reportData = this._createReport();
			var promise = this._reportLogic.register(reportData).done(this.own(function(data) {
				// 成功時のメッセージを表示
				alert('日記を書き込みました！');
			}));

			this.indicator({
				message: '書き込み中...',
				promises: promise
			}).show();
		},

    	/**
		 * 日報をサーバに登録する
		 *
     * @memberOf itpro.sample.report.controller.ReportController
		 */
		'.cancel click': function(context, $el) {
      // submitイベントのデフォルトの挙動（画面の遷移）をキャンセル
			context.event.preventDefault();
			this.$find('textarea[name="comment"]').val('');
		},

		/**
		 * レポートオブジェクトを作成
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 * @returns Object
		 */
		_createReport: function() {
			var reportDate = this.$find('input[name="reportDate"]').val();
			var startTime = this.$find('input[name="startTime"]').val();
			var endTime = this.$find('input[name="endTime"]').val();

			var $section = this.$find('.section');
			var sectionId = $section.find('input[name="sectionId"]').val();
			var category = $section.find('input[name="category"]').val();
			var title = $section.find('input[name="title"]').val();
			var comment = $section.find('textarea[name="comment"]').val();
			var section = new itpro.sample.report.Section(sectionId, category, title, comment);

			return {
				userInfo: this._userInfo,
				reportDate: reportDate,
				startTime: startTime,
				endTime: endTime,
				section: section
			};
		},
		/**
		 * デフォルトの勤務時間を設定する
		 *
		 * @memberOf itpro.sample.report.controller.ReportController
		 */
		_setDafaultWorkTime: function() {
			// 9:00～現在時刻をデフォルトの勤務時間として設定
			this.$find('input[name="startTime"]').val('09:00');
			this.$find('input[name="endTime"]').val(utils.formatTime(new Date()));
		}
	};
	// 名前空間 itpro.sample.report.controller に ReportController を配置
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	// 公開されているコントローラを、操作対象となるHTML要素に割り当てる
  h5.core.controller(document.body, itpro.sample.report.controller.ReportController);
});
