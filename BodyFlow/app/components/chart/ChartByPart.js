import React from 'react';
import { Dimensions, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, LineSegment} from "victory-native";
// https://formidable.com/open-source/victory/docs/victory-line
import { readSizeByPartsLimit8 } from '../../backend/Read';

const { width: screenWidth } = Dimensions.get('window');
const strokeDasharray = "10, 5";

export default class ChartByPart extends React.Component {
    state = {
        part : this.props.part,
        data : []
    }

    componentDidMount = () => {
        readSizeByPartsLimit8(this.state.part, result => {
            this.setState({data : result})
        })
    }

    render() {
        return (
            <VictoryChart 
                height={250}
                padding={{ top: 0, bottom: 50, right: 10, left: 10 }} 
                domainPadding={{ y : 40, x : screenWidth / 8 * 0.6}} 
                domain={{ x : [1, 7] }}>
                <VictoryAxis dependentAxis style={{axis : {strokeWidth : 2}}}/>
                {/* victoryChart의 BAckgrounComponent를 이용해서 뒤에 스타일추가하기 */}
                <VictoryAxis
                    style={{
                       grid:{stroke:'#c4c4c4'},
                       axis : {strokeWidth : 2},
                       tickLabels : { fontWeight : '800', padding : 4}
                    }}
                    tickFormat = {(date) => `${date}`.replace(/\-/g, '.').substring(5, 10)}
                    gridComponent={
                        <View>
                            <LineSegment x1={14 + screenWidth / 8 * 1} x2={14 + screenWidth / 8 * 1} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            <LineSegment x1={18 + screenWidth / 8 * 2} x2={18 + screenWidth / 8 * 2} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            <LineSegment x1={22 + screenWidth / 8 * 3} x2={22 + screenWidth / 8 * 3} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            <LineSegment x1={24 + screenWidth / 8 * 4} x2={24 + screenWidth / 8 * 4} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            <LineSegment x1={28 + screenWidth / 8 * 5} x2={28 + screenWidth / 8 * 5} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                            <LineSegment x1={32 + screenWidth / 8 * 6} x2={32 + screenWidth / 8 * 6} y1={10} y2={200} style={{stroke:'#c4c4c4', strokeWidth: 2, strokeDasharray}}/>
                        </View>
                    }/> 
                <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31", strokeWidth: 3 },
                    }} 
                    data={this.state.data.length ? this.state.data : []}
                    x={"date"}
                    y={"sizeByPart"}/> 
                <VictoryScatter 
                    style = {{
                        data : {stroke : '#c43a31',strokeWidth: 3, fill : '#c43a31'},
                        labels : {fill : '#c43a31', fontWeight : '800'}
                    }} 
                    size = {5} 
                    data={this.state.data.length ? this.state.data : []}
                    x={'date'}
                    y={'sizeByPart'}
                    labels={({ datum }) => `${datum["sizeByPart"]}`}  />
            </VictoryChart>
    );
  }
}