import React, { Component } from 'react';
import http from './components/http';
import DataComparison from './components/DataComparison';

export default class App extends Component {
    constructor () {
        super();
        this.data = [];
        this.state = {
            isDataLoaded: false
        }
    }

    cast = [
        { Title: 'Alien', Year: '1979'},
        { Title: 'The Terminator', Year: '1984'},
        { Title: 'Armageddon', Year: '1998'},
        { Title: 'The Matrix', Year: '1999'},
        { Title: 'Avatar', Year: '2009'}
    ];

    dataStructure = [
        { key: 'imdbID', name: 'imdbID', title: 'imdbID' },
        { key: 'Title', name: 'Title', title: 'Title' },
        { key: 'Year', name: 'Year', title: 'Year' },
        { key: 'Director', name: 'Director', title: 'Director'},
        { key: 'imdbVotes', name: 'imdbVotes', title: 'imdbVotes'},
        { key: 'imdbRating', name: 'imdbRating', title: 'imdb', compare: true, ratio: 10 },
        { key: 'Ratings0', name: 'Ratings0', title: 'Internet Movie DB', compare:true, ratio: 10 },
        { key: 'Ratings1', name: 'Ratings1', title: 'Rotten Tomatoes', compare:true, ratio: 1 },
        { key: 'Ratings2', name: 'Ratings2', title: 'Metacritic', compare:true, ratio: 1 }
    ];

    baseUrl = 'http://www.omdbapi.com/?apikey=147c5a62';

    getUrls = (baseUrl, cast) => {
      return cast.map( item => `${baseUrl}&t=${item.Title}&y=${item.Year}`);
    };

    getRatings = resp => {
      const ratings = {};
      resp.Ratings.forEach( (r, idx) => ratings[`Ratings${idx}`] = r.Value );
      return ratings;
    };

    defaultOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Compare movies ratings'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Data Comparison'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        }
    };

    setOptions = () => {
        const getCategoriesValue = (value) => this.dataStructure.slice().filter(item =>item.compare).map(item => item[value]);
        const options = {
            xAxis: {
                categories: getCategoriesValue('title')
            },
            series: this.data.map( item => {
                const ratioArr = getCategoriesValue('ratio');
                return {
                    name: item.Title,
                    data: getCategoriesValue('name').map( (cat, idx) => parseFloat(item[cat]) * ratioArr[idx])
                };
            })
        };
        this.options = options;
    };

    componentDidMount() {
        http(this.getUrls(this.baseUrl, this.cast)).then(resp => {
            this.data = resp.map(item => {
                return Object.assign(item, this.getRatings(item));
            });
            this.setOptions();
            this.setState({
                isDataLoaded: true
            });
        });
    }

    render() {
        return (
            <div>
                <DataComparison
                    data = {this.data}
                    dataStructure = {this.dataStructure}
                    options = {this.options}
                    defaultOptions = {this.defaultOptions}
                />
            </div>
        )
    }
}

