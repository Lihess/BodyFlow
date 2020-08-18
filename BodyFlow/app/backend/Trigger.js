// Trigger.js
// expo-sqlite의 트리거에서는 변수가 선언되지 않아 구현하는 트리거 대용 함수들
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('bodyFlow.db');

// 허리 사이즈 추가 기입 시, 체지방률을 계산하여 삽입하는 트리거
const sizeByPartInsertTR = (date, part, size) => {
    let height, gender = null;

    if(part == '허리'){
        // 가장 최근에 입력된 사용자의 키와 성별을 불러옴
        db.transaction(tx => {
            tx.executeSql(
                'SELECT height, gender FROM (SELECT * FROM user_info ORDER BY date DESC) WHERE row_number = 1;',
                [],
                (tx, { rows }) => {height = rows.height; gender = rows.gender;},
                (tx, err) => console.log('error: ', err)
            )
        });

        if (height != null && gender != null) {
            // 성별에 따라 계산식을 다르게 적용
            const fatPercent = (gender == 'M' ? 64 : 76) - (20 * (heigt / size));

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT OR REPLACE INTO size_by_part (date, part, size) VALUES (?, ?, ?);', [date, '체지방률', fatPercent],
                    (tx, result) => console.log('result on insert: ', result),
                    (tx, err) => console.log('error on insert: ', err)
                )
            })

            // 확인용
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM size_by_part;', [], 
                    (tx, result) => console.log('result on insert: ', result),
                    (tx, err) => console.log('error on insert: ', err)
                );
            })
        }
    }
}

// 허리 사이즈 추가 기입 시, 체지방률을 계산하여 삽입하는 트리거
const userInfoInsertTR = (date, height, gender) => {
    let size = null;

    if(part == '허리'){
        // 가장 최근에 입력된 사용자의 키와 성별을 불러옴
        db.transaction(tx => {
            tx.executeSql(
                'SELECT size FROM size_by_part WHERE (date = ?) AND (part = ?)',
                [date, '허리'],
                (tx, { rows }) => { size = rows.size },
                (tx, err) => console.log('error: ', err)
            )
        });

        if (size != null) {
            // 성별에 따라 계산식을 다르게 적용
            const fatPercent = (gender == 'M' ? 64 : 76) - (20 * (height / size));

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT OR REPLACE INTO size_by_part (date, part, size) VALUES (?, ?, ?);', [date, '체지방률', fatPercent],
                    (tx, result) => console.log('result on insert: ', result),
                    (tx, err) => console.log('error on insert: ', err)
                )
            })

            // 확인용
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM size_by_part;', [], 
                    (tx, result) => console.log('result on insert: ', result),
                    (tx, err) => console.log('error on insert: ', err)
                );
            })
        }
    }
}

export { sizeByPartInsertTR, userInfoInsertTR };