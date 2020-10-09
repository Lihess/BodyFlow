
// https://jhmdevdiary.tistory.com/10
import React from 'react';
import { readSizeByPartsLatestF, readUserInfoLatest, readWaistToday } from '../backend/Read';
import { createSizeByPart } from '../backend/Create';

const FatContext = React.createContext({
    fatPercent : null,
    height : null,
    gender : null,
    waist : null,
    setFatPercent : () => {},
    setFatPercentHG : () => {},
    setFatPercentW : () => {}
})

export class FatProvider extends React.Component {
    componentDidMount(){
        readSizeByPartsLatestF(result => {
            this.setState({ 
                fatPercent : result
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

    // 체지방률을 다시 set. 이때, chart page에서 허리사이즈를 수정했을 수도 있으므로 새로 계산함
    setFatPercent = () => {
        if (this.state.height && this.state.gender){
            readWaistToday(result => {
                if (result){
                    const fatPercent = ((this.state.gender == 'M' ? 64 : 76) - (20 * (this.state.height / result))).toFixed(1)
                    this.setState({
                        fatPercent : fatPercent,
                        waist : result
                    })
                
                    createSizeByPart(null, '체지방률', fatPercent);
                }
            })
        }
    }

    // 계산 후 DB에 저장
    setFatPercentHG = (height, gender) => {
        this.setState({
            height : height,
            gender : gender
        })

        if (this.state.waist) {
            const fatPercent = ((gender == 'M' ? 64 : 76) - (20 * (height / this.state.waist))).toFixed(1)
            this.setState({ fatPercent : fatPercent })
            createSizeByPart(null, '체지방률', fatPercent);
        }
    }

    // 계산 후 DB에 저장
    setFatPercentW = (waist) => {
        this.setState({ waist : waist })

        if (this.state.height && this.state.gender){
            const fatPercent = ((this.state.gender == 'M' ? 64 : 76) - (20 * (this.state.height / waist))).toFixed(1)
            this.setState({ fatPercent : fatPercent })

            createSizeByPart(null, '체지방률', fatPercent);
        }
    }

    state = {
        fatPercent : null,
        height : null,
        gender : null,
        waist : null,
        setFatPercent :  this.setFatPercent,
        setFatPercentHG :  this.setFatPercentHG,
        setFatPercentW : this.setFatPercentW
    }

    render(){
        return(
            <FatContext.Provider value={this.state}>
                {this.props.children}
            </FatContext.Provider>
        )
    }
}

export const FatConsumer = FatContext.Consumer;