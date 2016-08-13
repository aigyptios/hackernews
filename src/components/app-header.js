import React from 'react';

export default class AppHeader extends React.Component {
    render() {
        return (
            <div className="header">
                <h1 className="header__heading">Hacker News</h1>
                <div className="header__navlist">
                    <ul className="navlist">
                        {
                            this.props.links.map((link, i) =>
                                <li
                                    key={i}
                                    className={link.text === this.props.news ? "navlist__link--active" : "navlist__link"}
                                    onClick={link.load}>
                                    <a href="#">{link.text}</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
