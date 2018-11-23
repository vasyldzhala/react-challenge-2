import React, { Component } from 'react';
import Table from './Table';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default class DataComparison extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.optionsToShow = {};
    }

    componentWillReceiveProps(nextProps) {
        const itemsToShow = nextProps.options.series
            .map( series => ({ name: series.name, show: false }));
        this.setState({itemsToShow: itemsToShow});
    };

    onClickHandler (event) {
        const {target} = event;
        if ( target.type === 'checkbox' ) {
            const itemsToShow = [...this.state.itemsToShow];
            itemsToShow.find(el => (el.name === target.name)).show = target.checked;
            this.optionsToShow = Object.assign({}, this.props.options);
            this.optionsToShow.series = this.optionsToShow.series
                .filter( s =>  itemsToShow.find( i => (i.name === s.name)).show);

            this.setState({itemsToShow: itemsToShow});
        }
    }

    render() {
        return (
            <div onClick = {event => this.onClickHandler(event)}>
                <Table
                    data = {this.props.data}
                    dataStructure = {this.props.dataStructure}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={Object.assign(this.optionsToShow, this.props.defaultOptions)}
                />
            </div>
        )
    }
}