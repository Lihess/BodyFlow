import React from 'react';
import { StyleSheet, View, TouchableHighlightBase } from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryTheme } from "victory-native";
// https://formidable.com/open-source/victory/docs/victory-line
import { readSizeByPartsLimit8 } from '../../backend/Read';


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
            <VictoryChart domainPadding={25} >
                {/* victoryChart의 BAckgrounComponent를 이용해서 뒤에 스타일추가하기 */}
                <VictoryAxis tickFormat = {(date) => `${date}`.replace(/\-/g, '.').substring(2, 10)}/>
                <VictoryScatter
                    style = {{data : {fill : '#c43a31'}}} 
                    size = {7} 
                    data={this.state.data ? this.state.data : []}
                    x={'date'}
                    y={'sizeByPart'}/>
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}      
                    data={this.state.data ? this.state.data : []}
                    x={"date"}
                    y={"sizeByPart"}/> 
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