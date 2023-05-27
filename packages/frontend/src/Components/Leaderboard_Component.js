import React from 'react'

export default function leaderboard({ Ranking }) {
    return (
        <div id="profile">
            {Item(Ranking)}
        </div>
    )
}

function Item(data) {
    return (
        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <div className="info">
                                <h3 className='name text-dark'>{value.username}</h3>
                                <span>{value.time} segundos</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>correctas: {value.score}</span>
                        </div>
                    </div>
                )
                )
            }
        </>
    );
}