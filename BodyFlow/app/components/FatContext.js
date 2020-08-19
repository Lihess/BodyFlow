
// https://jhmdevdiary.tistory.com/10
import React from 'react';
import { readSizeByPartsLatestF } from '../backend/Read';

const FatContext = React.createContext({
    fatPercent : null,
    getFatPercent : () => {},
    setFatPercent : () => {}
})

export class FatProvider extends React.Component {
    state = {
        fatPercent : null,
        setFatPercent : this.setFatPercent
    }

    componentDidMount(){
        readSizeByPartsLatestF(result => {
            this.setState({ 
                fatPercent : result,
                setFatPercent : this.setFatPercent
            })   
        })
    }

    setFatPercent = () => {
        readSizeByPartsLatestF(result => {
            this.setState({ fatPercent : result }) 
            console.log('this.state.fatPercent : ', this.state.fatPercent)
        })
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