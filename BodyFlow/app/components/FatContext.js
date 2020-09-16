
// https://jhmdevdiary.tistory.com/10
import React from 'react';
import { readSizeByPartsLatestF, readUserInfoLatest, readWaistToday } from '../backend/Read';
import { createSizeByPart } from '../backend/Create';

const FatContext = React.createContext({
    fatPercent : null,
    height : null,
    gender : null,
    waist : null,
    setFatPercentHG : () => {},
    setFatPercentW : () => {}
})

export class FatProvider extends React.Component {
    state = {
        fatPercent : null,
        height : null,
        gender : null,
        waist : null,
        setFatPercentHG : this.setFatPercentHG,
        setFatPercentW : this.setFatPercentW
    }

    componentDidMount(){
        readSizeByPartsLatestF(result => {
            this.setState({ 
                fatPercent : result,
                setFatPercentHG : this.setFatPercentHG,
                setFatPercentW : this.setFatPercentW
            })   
        })
        readUserInfoLatest(result => {
            if (result)
                this.setState({
                    height : result.height,
                    gender : result.gender
                })
        })
        readWaistToday(result => {
            if (result)
                this.setState({ waist : result })
        })
    }

    // SQLite의 삽입 속도가 느려서.... 계산해서 출력하는걸로
    setFatPercentHG = (height, gender) => {
        if (this.state.waist) {
            const fatPercent = ((gender == 'M' ? 64 : 76) - (20 * (height / this.state.waist))).toFixed(1)
            this.setState({
                fatPercent : fatPercent,
                height : height,
                gender : gender
            })

            createSizeByPart(null, '체지방률', fatPercent);
        }
    }

    // SQLite의 삽입 속도가 느려서.... 계산해서 출력하는걸로
    setFatPercentW = (waist) => {
        console.log('dd')
        if (this.state.height && this.state.gender){
            const fatPercent = ((this.state.gender == 'M' ? 64 : 76) - (20 * (this.state.height / waist))).toFixed(1)
            this.setState({
                fatPercent : fatPercent,
                waist : waist
            })

            createSizeByPart(null, '체지방률', fatPercent);
        }
    }

    render(){
        console.log(this.state)
        return(
            <FatContext.Provider value={this.state}>
                {this.props.children}
            </FatContext.Provider>
        )
    }
}

export const FatConsumer = FatContext.Consumer;