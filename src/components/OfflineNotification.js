import React from 'react'
import './OfflineNotification.css'

function OfflineNotification() {
    return (
        <div className='offline-notif'>
            <span className="offline-dot"></span>
            <span>Your are offline</span>
        </div>
    )
}

export default OfflineNotification