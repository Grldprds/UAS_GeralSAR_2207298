import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHospitalUser } from 'react-icons/fa';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-success"> 
                        <div>
                            <a href="/users" className="navbar-brand">
                                <FaHospitalUser className="mr-2" /> 
                                Aplikasi Manajemen Pasien
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
