// Delete.js
// Delete 관련 쿼리를 모아놓은 파일.
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bodyFlow.db');

const deletePhoto = async(date, ornu) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM photo WHERE date=? AND photo_ornu=?',
            [date, ornu],
            () => { 
                tx.executeSql(
                    'SELECT * FROM photo ORDER BY date DESC, photo_ornu',
                    [],
                    (tx, {rows}) => { 
                        const photo = []
                        
                        // 날짜별로 사진의 경로를 배열로 만들어서 반환함
                        if(rows['_array'].length){
                            rows['_array'].map((row, i) => {
                                (i == 0) || (rows['_array'][i-1].date != row.date) ?
                                    photo.push({date : row.date, paths : [row.path]}) : photo[photo.length -1].paths.push(row.path)
                                })
                        }
                        
                        console.log('!!', rows); 
                    }
                )
            }
        );
    })
}

export { deletePhoto };