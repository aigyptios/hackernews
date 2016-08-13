import React from 'react';

export default class NewsViewer extends React.Component {
    render() {
        return (
            <div className="viewer">
                <section className="viewer__content">
                    <iframe src={this.props.url} width="100%" height="100%"/>
                </section>
            </div>
        )
    }
}
