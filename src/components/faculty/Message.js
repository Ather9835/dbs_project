import React from 'react'

export default function Message( {faculty} ) {

    const { facultyName } = faculty

    return (
        <div id="display-message-container">
            <h3>Welcome {facultyName}</h3>
            <hr />
            <br />
        </div>
    )
}
