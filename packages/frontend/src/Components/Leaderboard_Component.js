import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FirstPositionImg from '../images/FirstPosition.png';
import SecondPositionImg from '../images/SecondPosition.png';
import ThirdPositionImg from '../images/ThirdPosition.png';

export default function leaderboard({ Ranking }) {
    return (
        <div id="profile">
            {Item(Ranking)}
        </div>
    );
}

function getImageByIndex(index) {
    if (index === 1) {
        return SecondPositionImg;
    } else if (index === 2) {
        return ThirdPositionImg;
    }
    return FirstPositionImg;
}

function getImageStyleByIndex(index) {
    if (index === 0) {
        return { width: '45%' }; 
    } else if (index === 1) {
        return { width: '35%' }; 
    }
    return { width: '30%' }; 
}

function Item(data) {
    return (
        <>
           <div className='row'>
           {data.map((value, index) => (
                <div className=" p-2 mb-3 mx-auto my-auto col-lg-4" key={index}>
                    <img
                        className="card-img-top mx-auto"
                        src={getImageByIndex(index)}
                        alt="Card image cap"
                        style={getImageStyleByIndex(index)} 
                    />
                    <div className="card-body">
                        <strong><h3>{value.username}</h3></strong>
                        <h5 className="card-title"><strong>{value.time}</strong> Segundos</h5>
                        <p className="card-text">Correctas: <strong>{value.score}</strong></p>
                    </div>
                    <hr className='mx-auto' style={{ width: '50%' }} />
                </div>
            ))}
            </div>
        </>
    );
}
