import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';
import { Line } from "react-chartjs";
import { style } from '../commonStyles';
import Paper from 'material-ui/Paper/Paper';
import BookIcon from 'material-ui/svg-icons/action/book';
import ListIcon from 'material-ui/svg-icons/av/featured-play-list';
import PrintIcon from 'material-ui/svg-icons/action/print';
import PersonIcon from 'material-ui/svg-icons/social/person';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let chartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0,188,212,0.3)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        let chartOptions = {
            responsive: true
          };
        return(
            <MuiThemeProvider>
            <div>
                <TopBar history={this.props.history}/>
                <LeftDrawer/>
                <div className="container-fluid">
                <h1 className="col-md-12 ">Dashboard</h1>
                <div className="">
                    <div className="col-md-3 no-pd-lft">
                    <Link to="/book" >
                        <Paper style={style.statsPaperStyle} zDepth={4} className="text-center">
                            <BookIcon style={style.saveIcon}/>
                            <h2>{ `80 Books`}</h2>
                        </Paper>
                        </Link>
                    </div>
                    <div className="col-md-3 no-pd-lft">
                    <Link to="/categories" >
                        <Paper style={style.statsPaperStyle} zDepth={4} className="text-center">
                            <ListIcon style={style.saveIcon}/>
                            <h2>{ `10 Categories`}</h2>
                        </Paper>
                        </Link>
                    </div>
                    <div className="col-md-3 no-pd-lft">
                    <Link to="/publications" >
                        <Paper style={style.statsPaperStyle} zDepth={4} className="text-center">
                            <PrintIcon style={style.saveIcon}/>
                            <h2>{ `15 Publication`}</h2>
                        </Paper>
                        </Link>
                    </div>
                    <div className="col-md-3 no-pd-lft">
                    <Link to="/authors" >
                        <Paper style={style.statsPaperStyle} zDepth={4} className="text-center">
                            <PersonIcon style={style.saveIcon}/>
                            <h2>{ `20 authors`}</h2>
                        </Paper>
                        </Link>
                    </div>
                </div>
               
                <div className="col-md-12">
                <Paper style={style.graphPaperStyle} zDepth={4}>
                    <Line data={chartData} options={chartOptions}   />
                </Paper>
                </div>
               
                    </div>
               
                <Footer />   
            </div>
        </MuiThemeProvider>
        )
    }
}