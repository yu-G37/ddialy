// データーベースの作成
function createDB() {
    var db = window.openDatabase("Database", "1.0", "db_diary", 200000);
    if(db.version == ""){
        // データベースが存在しないならば作成するよ
        db.transaction(createTable, errorCB, successCB);
    }
}

// テーブルの作成
function createTable(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS TestTable');
    tx.executeSql('CREATE TABLE IF NOT EXISTS diary (id unique, date, detail, img_path)');
    tx.executeSql('INSERT INTO diary (id, date, detail) VALUES (1, 20170219, "あいうえお")');
}

// Success Callback
function successCB() {
    var db = window.openDatabase("Database", "1.0", "db_diary", 200000);
    db.transaction(queryDB, errorCB);
}

// Query
function queryDB(tx) {
    tx.executeSql('SELECT * FROM diary', [], querySuccess, errorCB);
}

// Query Success Callback
function querySuccess(tx, results) {
    var len = results.rows.length;
    var text = "";
    for (var i=0; i<len; i++){
        text += "row = " + i + " ID = " + results.rows.item(i).id + " Data = " + results.rows.item(i).date+"<br/>";
    }
    document.getElementById("content").innerHTML = text;
}

// Error Callback
function errorCB(err) {
    alert("Error occured while executing SQL: " + err.code);
}

// テーブルの削除
function dropTable() {
    var db = window.openDatabase("Database", "1.0", "db_diary", 200000);
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS diary');
    }, 
    function(err) {
        alert("error: " + err.message);
    },
    function() {
        document.getElementById("content").innerHTML = "";
    });
}