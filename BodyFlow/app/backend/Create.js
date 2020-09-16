// Create.js
// Create 관련 쿼리를 모아놓은 파일.
import * as SQLite from 'expo-sqlite';
import { sizeByPartInsertTR, userInfoInsertTR } from './Trigger';

const db = SQLite.openDatabase('bodyFlow.db');

// 앱을 킬때 모두 생성해야 하므로~!
const createTables = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS size_by_part ( date	TEXT NOT NULL, part TEXT NOT NULL, size REAL NOT NULL, PRIMARY KEY(date, part));',
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS user_info ( date TEXT NOT NULL, height REAL NOT NULL, gender TEXT NOT NULL, PRIMARY KEY(date));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS photo ( date TEXT NOT NULL, photo_ornu INTEGER NOT NULL, path VARCHAR(255) NOT NULL, PRIMARY KEY(date, photo_ornu));'
        );
    });
}

// size_by_part insert
const createSizeByPart = (date, part, size) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT OR REPLACE INTO size_by_part VALUES (?, ?, ?);', [date, part, size],
        );
    })

    // 트리거
    sizeByPartInsertTR(date, part, size);
}

// user_info insert
const createUserInfo = (height, gender) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT OR REPLACE INTO user_info VALUES (date(\'now\'), ?, ?);', [height, gender]
        );
    })

    userInfoInsertTR(height, gender)
}

// insert photo. 
const createPhoto = (path, ornu) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO photo VALUES (date(\'now\'), ?, ?)',
            [ornu, path]
        )
    })
}

export {createTables, createSizeByPart, createUserInfo, createPhoto}