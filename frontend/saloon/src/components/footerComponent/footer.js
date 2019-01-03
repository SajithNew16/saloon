import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small blue pt-4">
        <div style={{ marginBottom: 0 }}>
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Comcast</h5>
                <p>
                  Here you can use rows and columns here to organize your footer
                  content.
                </p>
              </div>
              <hr className="clearfix w-100 d-md-none pb-3" />
              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Contact Us</h5>

                <ul className="list-unstyled">
                  <li>comcast@gmail.com</li>
                  <li>041-2322465</li>
                  <li>071-252465</li>
                  <li>081-2422465</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
