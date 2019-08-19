import React from 'react';

import Toast from 'react-bootstrap/Toast'

import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import '../css/Page.css';


export default class Page extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: 'n0350204',
            showSidebar: true,
            showToast: true
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {

    }

    toggleSidebar() {
        this.setState({ showSidebar: !this.state.showSidebar });
    }

    render() {
        return (
            <div className='page'>
                <NavBar toggleSidebar={this.toggleSidebar} showSidebar={this.state.showSidebar}/>




                <div className='toast-container'>
                    {this.state.showToast && <Toast show={this.state.showToast} onClose={() => this.setState({ showToast: false })}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>}
                    {this.state.showToast && <Toast show={this.state.showToast} onClose={() => this.setState({ showToast: false })}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>}
                </div>



                {this.state.showSidebar && <div className='sidebar-container inline-container'><Sidebar history={this.props.history}/></div>}
                <div className='main-content-container inline-container'>{this.props.children}</div>
            </div>
        );
    }
}