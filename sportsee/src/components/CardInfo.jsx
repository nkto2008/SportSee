import React from 'react';
import '../assets/components/cardInfo.scss';
import energyIcon from '../assets/icons/energy.svg';
import proteinsIcon from '../assets/icons/proteins.svg';
import carbsIcon from '../assets/icons/carbs.svg';
import fatsIcon from '../assets/icons/fats.svg';

const CardInfo = ({ type, value }) => {
    let className = "";
    let mesure = "";
    let iconSrc = "";

    switch (type) {
        case 'Calories':
            className = "energy";
            mesure = "kCal";
            iconSrc = energyIcon;
            break;
        case 'Protéines':
            className = "proteins";
            mesure = "g";
            iconSrc = proteinsIcon;
            break;
        case 'Glucides':
            className = "carbs";
            mesure = "g";
            iconSrc = carbsIcon;
            break;
        case 'Lipides':
            className = "fats";
            mesure = "g";
            iconSrc = fatsIcon;
            break;
        default:
            break;
    }

    return (
        <div className={`card-info`}>
            <div className={`container-img ${className}`}>
                <img src={iconSrc} alt={`${type} icon`} />
            </div>
            <div className='details'>
                <h2>{value}{mesure}</h2>
                <p>{type}</p>
            </div>
        </div>
    );
};

export default CardInfo;