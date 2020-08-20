
// https://jhmdevdiary.tistory.com/10
import React from 'react';
import { readSizeByPartsLatestF, readUserInfoLatest, readWaistToday } from '../backend/Read';

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
            if (result != null)
                this.setState({
                    height : result.height,
                    gender : result.gender
                })
        })
        readWaistToday(result => {
            if (result != null)
                this.setState({ waist : result })
        })
    }

    // SQLite의 삽입 속도가 느려서.... 계산해서 출력하는걸로
    setFatPercentHG = (height, gender) => {
        if (this.state.waist != null) {
            const fatPercent = (gender == 'M' ? 64 : 76) - (20 * (height / this.state.waist))
            this.setState({
                fatPercent : fatPercent.toFixed(1),
                height : height,
                gender : gender
            })
        }
    }

    // SQLite의 삽입 속도가 느려서.... 계산해서 출력하는걸로
    setFatPercentW = (waist) => {
        if (this.state.height != null && this.state.gender != null){
            const fatPercent = (this.state.gender == 'M' ? 64 : 76) - (20 * (this.state.height / waist))
            this.setState({
                fatPercent : fatPercent.toFixed(1),
                waist : waist
            })
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