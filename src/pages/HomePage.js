import React from 'react';

import Page from './Page';

export default class HomePage extends React.Component {
    render(){
        return (
                <Page history={this.props.history}>
                    <div>So far so good</div>
                </Page>
        );
    }
}