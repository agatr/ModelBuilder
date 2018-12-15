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
                                <li><a href="">Creators</a></li>
                                <li><a href="">Technology</a></li>
                                <li><a href="">Contribute</a></li>
                                <li><a href="">Github</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__links__help">
                        <h4>HELP</h4>
                        <div>
                            <ul>
                                <li><a href="">FAQ</a></li>
                                <li><a href="">Forum</a></li>
                                <li><a href="">Ask a question</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__links__contact">
                        <h4>CONTACT</h4>
                        <div>
                            <ul>
                                <li><a href="">Contact Us</a></li>
                                <li><a href="">Facebook</a></li>
                                <li><a href="">Google</a></li>
                                <li><a href="">Twitter</a></li>
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