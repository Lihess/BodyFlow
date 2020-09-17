// Delete.js
// Delete 관련 쿼리를 모아놓은 파일.
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bodyFlow.db');

const deletePhoto = async(date, ornu) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM photo WHERE date=? AND photo_ornu=?',
            [date, ornu]
        );
    })
}

export { deletePhoto };