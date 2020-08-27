import React from 'react';
import { Dimensions, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, LineSegment} from "victory-native";
// https://formidable.com/open-source/victory/docs/victory-line
import { cmToinch } from '../ChangeUnit'

const { width: screenWidth } = Dimensions.get('window');
const strokeDasharray = "10, 5";

const ChartByPart = ({data, period, unit}) => {
        const dataLen = data.length
        const dataStartLast = dataLen ? [data[0], data[dataLen - 1]] : []
        const dateStartLast = dataLen ? [data[0]['date'], data[dataLen - 1]['date']] : []

        return (
            <VictoryChart 
                height={280}
                padding={{ top: 10, bottom: 50, right: 10, left: 10 }} 
                domainPadding={{ y : 40, x : screenWidth / 8 * 0.6}}
                domain={period == 'lately' ? { x : [1, 7] } : null}>
                {/* 최근 데이터를 불러올 경우, 7개만 표기되도록 */}

                {/* y축 */}
                <VictoryAxis dependentAxis style={{axis : {strokeWidth : 2}}}/>

                {/* x축 */}
                <VictoryAxis
                    style={{
                       grid:{stroke:'#c4c4c4'},
                       axis : {strokeWidth : 2},
                       tickLabels : { fontWeight : '800', padding : 4}
                    }}
                    tickFormat={(date) =>  
                        /* total일때 처음과 마지막 날짜만 표기 */
                        dateStartLast.indexOf(date) == -1 && period == 'total' ? '' : `${date}`.replace(/\-/g, '.').substring(5, 10)}
                    gridComponent={
                        /* 최근인 경우, 데이터가 7개임을 명시하기 위한 grid 추가 */
                        period == 'lately' ?
                            <View>
                                <LineSegment x1={14 + screenWidth / 8 * 1} x2={14 + screenWidth / 8 * 1} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={18 + screenWidth / 8 * 2} x2={18 + screenWidth / 8 * 2} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={22 + screenWidth / 8 * 3} x2={22 + screenWidth / 8 * 3} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={26 + screenWidth / 8 * 4} x2={26 + screenWidth / 8 * 4} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={30 + screenWidth / 8 * 5} x2={30 + screenWidth / 8 * 5} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={34 + screenWidth / 8 * 6} x2={34 + screenWidth / 8 * 6} y1={10} y2={230} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={screenWidth - 10} x2={screenWidth - 10} y1={10} y2={230} style={{stroke:'black', strokeWidth: 2}}/>
                                <LineSegment x1={10} x2={screenWidth - 10} y1={10} y2={10} style={{stroke:'black', strokeWidth: 2}}/>
                            </View>
                            : <View>
                                <LineSegment x1={screenWidth - 10} x2={screenWidth - 10} y1={10} y2={230} style={{stroke:'black', strokeWidth: 2}}/>
                                <LineSegment x1={10} x2={screenWidth - 10} y1={10} y2={10} style={{stroke:'black', strokeWidth: 2}}/>
                            </View>
                    }/> 

                {/* 선 차트 */}
                <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31", strokeWidth: 3 },
                    }} 
                    data={dataLen ? data : []}
                    x={"date"}
                    y={"sizeByPart"}/> 

                {/* 선 차트에서 각 데이터를 표시하는 점 */}
                <VictoryScatter 
                    style = {{
                        data : {stroke : '#c43a31',strokeWidth: 3, fill : '#c43a31'},
                        labels : {fill : '#c43a31', fontWeight : '800'}
                    }} 
                    size = {5} 
                    data={/* total일때 처음과 마지막 날짜만 표기 */
                         dataLen ? (period == 'total' ? dataStartLast : data) : []}
                    x={'date'}
                    y={'sizeByPart'}
                    labels={({ datum }) => unit == 'cm' ? `${datum["sizeByPart"]}` : `${cmToinch(datum["sizeByPart"])}` }/>
            </VictoryChart>
    );
}

export default ChartByPart;