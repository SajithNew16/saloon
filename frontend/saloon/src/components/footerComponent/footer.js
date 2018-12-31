import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
           
            <footer className="page-footer font-small blue pt-4">
              <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Footer Content</h5>
                        <p>Here you can use rows and columns here to organize your footer content.</p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3"/>
                    <div className="col-md-3 mb-md-0 mb-3">
            
                       
                        <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled">
                                <li>
                                    Link 1
                                </li>
                                <li>
                                    Link 2
                                </li>
                                <li>
                                    Link 3
                                </li>
                                <li>
                                    Link 4
                                </li>
                            </ul>

                    </div>
                </div>
              </div>
            </footer>
        );
    }
}

export default Footer;
