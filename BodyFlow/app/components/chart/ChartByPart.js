import React from 'react';
import { Dimensions, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, LineSegment} from "victory-native";
// https://formidable.com/open-source/victory/docs/victory-line
import { readSizeByPartsLimit7, readSizeByPartsAll } from '../../backend/Read';

const { width: screenWidth } = Dimensions.get('window');
const strokeDasharray = "10, 5";

export default class ChartByPart extends React.Component {
    state = {
        part : this.props.part,
        period : this.props.period,
        data : []
    }

     // props 값이 변경된 경우 state 값 변경
    // componentWillRecivedProps 에서 getDerivedStateFromProps로 변경됨.
    // 안에는 this 사용 불가. 변경할 state가 있다면 객체 형태로 반환
    static getDerivedStateFromProps = (nextProps, prevState) => {
        if((nextProps.part != prevState.part) || (nextProps.period != prevState.period)) {
            return { part : nextProps.part, period : nextProps.period };
        }
        else return null;
    }

    componentDidMount = () => {
        this.state.period == 'lately' ?
            readSizeByPartsLimit7(this.state.part, result => {
                this.setState({data : result})
            }) 
            : readSizeByPartsAll(this.state.part, result => {
                this.setState({data : result})
            })
    }

    render() {
        const dataLen = this.state.data.length
        const dataStartLast = dataLen ? [this.state.data[0], this.state.data[dataLen - 1]] : []
        const dateStartLast = dataLen ? [this.state.data[0]['date'], this.state.data[dataLen - 1]['date']] : []
        
        return (
            <VictoryChart 
                height={250}
                padding={{ top: 0, bottom: 50, right: 10, left: 10 }} 
                domainPadding={{ y : 40, x : screenWidth / 8 * 0.6}} 
                domain={this.state.period == 'lately' ? { x : [1, 7] } : null}>

                {/* y축 */}
                <VictoryAxis dependentAxis style={{axis : {strokeWidth : 2}}}/>

                {/* x축 */}
                <VictoryAxis
                    style={{
                       grid:{stroke:'#c4c4c4'},
                       axis : {strokeWidth : 2},
                       tickLabels : { fontWeight : '800', padding : 4}
                    }}
                    tickFormat = {(date) =>  
                        /* total일때 처음과 마지막 날짜만 표기 */
                        dateStartLast.indexOf(date) == -1 && this.state.period == 'total' ? '' : `${date}`.replace(/\-/g, '.').substring(5, 10)}
                    gridComponent={
                        this.state.period == 'lately' ?
                            <View>
                                <LineSegment x1={14 + screenWidth / 8 * 1} x2={14 + screenWidth / 8 * 1} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={18 + screenWidth / 8 * 2} x2={18 + screenWidth / 8 * 2} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={22 + screenWidth / 8 * 3} x2={22 + screenWidth / 8 * 3} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={24 + screenWidth / 8 * 4} x2={24 + screenWidth / 8 * 4} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={28 + screenWidth / 8 * 5} x2={28 + screenWidth / 8 * 5} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                                <LineSegment x1={32 + screenWidth / 8 * 6} x2={32 + screenWidth / 8 * 6} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            </View>
                            : <View/>
                    }/> 

                {/* 선 차트 */}
                <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31", strokeWidth: 3 },
                    }} 
                    data={dataLen ? this.state.data : []}
                    x={"date"}
                    y={"sizeByPart"}/> 

                {/* 선 차트에서 각 데이터를 표시하는 점 */}
                <VictoryScatter 
                    style = {{
                        data : {stroke : '#c43a31',strokeWidth: 3, fill : '#c43a31'},
                        labels : {fill : '#c43a31', fontWeight : '800'}
                    }} 
                    size = {5} 
                    data={dataLen ? (this.state.period == 'total' ? dataStartLast : this.state.data) : []}
                    x={'date'}
                    y={'sizeByPart'}
                    labels={({ datum }) => `${datum["sizeByPart"]}`}  />
            </VictoryChart>
    );
  }
}