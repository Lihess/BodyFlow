// Read.js
// Read 관련 쿼리를 모아놓은 파일.
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bodyFlow.db');

// 가장 최근 날짜에 기록된 size 반환
const readSizeByPartsLatest = (callback) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT part, size FROM (SELECT * FROM size_by_part ORDER BY date DESC) GROUP BY part',
                [],
                (tx, {rows}) => { 
                    const sizeParts = {'어깨' : null, '윗가슴' : null, '팔뚝' : null,
                                        '허리' : null, '엉덩이' : null, '허벅지' : null, '종아리' : null}
                
                    if (rows['_array'] != null)
                        rows['_array'].map(row =>
                            sizeParts[row.part] = row.size
                        )

                    callback(sizeParts)
                },
                (tx, err) => { console.log('err: ', err) }
            )
    })
}

// 가장 최근 날짜에 기록된 size 중  체중, 체지방률만 반환
const readSizeByPartsLatestW = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT size FROM size_by_part WHERE part = \'체중\' ORDER BY date DESC LIMIT 1',
            [],
            (tx, {rows}) => { 
                const sizeParts = {'체중' : null, '체지방률' : null}
                
                if (rows['_array'] != null)
                    rows['_array'].map(row =>
                        sizeParts[row.part] = row.size
                    )
                callback(sizeParts)
            },
            (tx, err) => { console.log('err: ', err) }
        )
    })
}

// 가장 최근 날짜에 기록된 size 중 체지방률만 반환
const readSizeByPartsLatestF = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT size FROM size_by_part WHERE part = \'체지방률\' ORDER BY date DESC LIMIT 1',
            [],
            (tx, {rows}) => { callback(rows['_array'][0].size) },
            (tx, err) => { console.log('err: ', err) }
        )
    })
}

// 가장 최근 사용자 정보 반환
const readUserInfoLatest = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT height, gender FROM user_info ORDER BY date DESC LIMIT 1',
            [],
            (tx, { rows }) => { callback(rows["_array"][0]) },
        )
    });
}

// 오늘 기입한 허리 사이즈 반환
const readWaistToday = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT size FROM size_by_part WHERE (date = date(\'now\')) AND (part = \'허리\')',
            [],
            (tx, { rows }) => { callback(rows["_array"][0].size) },
        )
    });
}

export {readSizeByPartsLatest, readSizeByPartsLatestW, readSizeByPartsLatestF
        , readUserInfoLatest, readWaistToday};