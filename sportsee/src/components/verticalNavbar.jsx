import React from 'react';
import '../assets/components/verticalNavbar.scss';
import {ReactComponent as Zen}  from '../assets/icons/zen.svg';
import { ReactComponent as Bike}  from '../assets/icons/bike.svg';
import { ReactComponent as Swim}  from '../assets/icons/swim.svg';
import { ReactComponent as Weight}  from '../assets/icons/weight.svg';


function VerticalNavbar() {
    return (
        <nav id="vertical-navbar">
            <ul className=''>
                <li>
                    <a href='#'>
                        <div>
                            <Zen className="logo" />
                        </div>
                    </a>

                </li>
                <li>
                    <a href='#'>
                        <div>
                            <Swim className="logo" />
                        </div>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <div>
                            <Bike className="logo" />
                        </div>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <div>
                            <Weight className="logo" />
                        </div>
                    </a>
                </li>
            </ul>
            <p className='copyright'>Copyright, SportSee 2020</p>
        </nav>
    );
};

export default VerticalNavbar;
