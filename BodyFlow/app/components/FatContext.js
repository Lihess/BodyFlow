
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
    state = {
        fatPercent : null,
        height : null,
        gender : null,
        waist : null,
        setFatPercent : this.setFatPercent,
        setFatPercentHG : this.setFatPercentHG,
        setFatPercentW : this.setFatPercentW
    }

    componentDidMount(){
        readSizeByPartsLatestF(result => {
            this.setState({ 
                fatPercent : result,
                setFatPercent : this.setFatPercent,
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

    // 계산 후 DB에 저장
    setFatPercentW = (waist) => {
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
        return(
            <FatContext.Provider value={this.state}>
                {this.props.children}
            </FatContext.Provider>
        )
    }
}

export const FatConsumer = FatContext.Consumer;