import React from 'react';
import { StyleSheet, Dimensions, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, LineSegment} from "victory-native";
// https://formidable.com/open-source/victory/docs/victory-line
import { Svg, Line } from 'react-native-svg';
import { readSizeByPartsLimit8 } from '../../backend/Read';

const { width: screenWidth } = Dimensions.get('window');

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
                padding={{ top: 0, bottom: 50, right: 30, left: 10 }} 
                domainPadding={30} 
                domain={{ x : [1, 6] }}>
                <VictoryAxis dependentAxis />
                {/* victoryChart의 BAckgrounComponent를 이용해서 뒤에 스타일추가하기 */}
                <VictoryAxis
                offsetX={40}
                
                    padding={30}
                    style={{
                       grid: { stroke: 'orange' },
                        ticks: {stroke: "grey", size: 5, paddingRight : 80},
                        tickLabels : {borderRight : 'red', borderWidth : 2}
                    }}
                    tickFormat = {(date) => `${date}`.replace(/\-/g, '.').substring(2, 10)}
                    gridComponent={
                        <View>
                            <LineSegment x1={10 + screenWidth / 7 * 1} x2 = {10 + screenWidth / 7 * 1} y1={10} y2={200} style={{stroke:'red'}}/>
                            <LineSegment x1={13 + screenWidth / 7 * 2} x2 = {13 + screenWidth / 7 * 2} y1={10} y2={200} style={{stroke:'red'}}/>
                            <LineSegment x1={13 + screenWidth / 7 * 3} x2 = {13 + screenWidth / 7 * 3} y1={10} y2={200} style={{stroke:'red'}}/>
                            <LineSegment x1={13 + screenWidth / 7 * 4} x2 = {13 + screenWidth / 7 * 4} y1={10} y2={200} style={{stroke:'red'}}/>
                            <LineSegment x1={13 + screenWidth / 7 * 5} x2 = {13 + screenWidth / 7 * 5} y1={10} y2={200} style={{stroke:'red'}}/>
                            <LineSegment x1={13 + screenWidth / 7 * 6} x2 = {13 + screenWidth / 7 * 6} y1={10} y2={200} style={{stroke:'red'}}/>
                        </View>
                    }/> 
                <VictoryLine 
                    style={{
                        data: { stroke: "#c43a31", strokeWidth: 3 },
                    }}      
                    data={[
                        {
                           "date": "2020-08-18",
                           "sizeByPart": 77,
                         },
                         {
                           "date": "2020-08-19",
                           "sizeByPart": 77,
                         },
                         {
                           "date": "2020-08-20",
                           "sizeByPart": 75,
                         },{
                           "date": "2020-08-25",
                           "sizeByPart": 75,
                         },{
                           "date": "2020-08-04",
                           "sizeByPart": 75,
                         },{
                           "date": "2020-08-14",
                           "sizeByPart": 75,
                         },
                   ]}
                    x={"date"}
                    y={"sizeByPart"}/> 
                <VictoryScatter 
                    style = {{data : {stroke : '#c43a31',strokeWidth: 3, fill : '#c43a31'}}} 
                    size = {5} 
                    data={[
                         {
                            "date": "2020-08-18",
                            "sizeByPart": 77,
                          },
                          {
                            "date": "2020-08-19",
                            "sizeByPart": 77,
                          },
                          {
                            "date": "2020-08-20",
                            "sizeByPart": 75,
                          },{
                            "date": "2020-08-25",
                            "sizeByPart": 75,
                          },{
                            "date": "2020-08-04",
                            "sizeByPart": 75,
                          },{
                            "date": "2020-08-14",
                            "sizeByPart": 75,
                          },
                    ]}
                    x={'date'}
                    y={'sizeByPart'}/>
            </VictoryChart>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});