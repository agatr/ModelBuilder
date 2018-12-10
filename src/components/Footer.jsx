import React from "react";

export class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer className="footer">
                <div className="footer__links">
                    <div className="footer__links__product">
                        <h4>MODEL BUILDER</h4>
                        <div>
                            <ul>
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__links__help">
                        <h4>HELP</h4>
                        <div>
                            <ul>
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__links__contact">
                        <h4>CONTACT</h4>
                        <div>
                            <ul>
                                <li><a href="">Link 1</a></li>
                                <li><a href="">Link 2</a></li>
                                <li><a href="">Link 3</a></li>
                                <li><a href="">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <p>2018 © Model Builder</p>
                </div>
            </footer>
        )
    }
}