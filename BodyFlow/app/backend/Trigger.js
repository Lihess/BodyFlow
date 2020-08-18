// Trigger.js
// expo-sqlite의 트리거에서는 변수가 선언되지 않아 구현하는 트리거 대용 함수들
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('bodyFlow.db');

// 허리 사이즈 추가 기입 시, 체지방률을 계산하여 삽입하는 트리거
const sizeByPartInsertTR = (date, part, size) => {
    if(part == '허리'){
        // 가장 최근에 입력된 사용자의 키와 성별을 불러옴
        db.transaction(tx => {
            tx.executeSql(
                'SELECT height, gender FROM user_info ORDER BY date DESC LIMIT 1',
                [],
                (tx, { rows }) => {
                    const height = rows["_array"][0].height; 
                    const gender = rows["_array"][0].gender;
                    // 성별에 따라 다른 수식 사용
                    const fatPercent = (gender == 'M' ? 64 : 76) - (20 * (height / size));

                    db.transaction(tx => {
                        tx.executeSql(
                            'INSERT OR REPLACE INTO size_by_part (date, part, size) VALUES (?, ?, ?);', [date, '체지방률', fatPercent.toFixed(1)]
                        )
                    })
                },
            )
        });

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM size_by_part;', [], 
                (tx, result) => console.log('result on insert: ', result),
                (tx, err) => console.log('error on insert: ', err)
            );
        })
    }
}

// 허리 사이즈 추가 기입 시, 체지방률을 계산하여 삽입하는 트리거
const userInfoInsertTR = ( height, gender) => {
    // 가장 최근에 입력된 사용자의 키와 성별을 불러옴
    db.transaction(tx => {
        tx.executeSql(
            'SELECT size FROM size_by_part WHERE (date = date(\'now\')) AND (part = ?)', ['허리'],
            (tx, { rows }) => { 
                const size = rows["_array"][0].size;

                const fatPercent = (gender == 'M' ? 64 : 76) - (20 * (height / size));
 
                db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR REPLACE INTO size_by_part VALUES (date(\'now\'), ?, ?);', ['체지방률', fatPercent]
                    )
                })      
            }
        )
    });
    
    // 확인용
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM size_by_part;', [], 
            (tx, result) => console.log('result on insert: ', result),
            (tx, err) => console.log('error on insert: ', err)
        );
    })
}

export { sizeByPartInsertTR, userInfoInsertTR };