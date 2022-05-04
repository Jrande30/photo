import React from 'react';

export default function InfobarItem({name, active, handleClick}){
    return(
        <div>
            <button className={`infobar-item ${active ? 'active' : ''}`} onClick={handleClick}>{name}</button>
        </div>
    )
}