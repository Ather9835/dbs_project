import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default function Options({ faculty }) {

    const { facultyCourseList: courses } = faculty

    return (
        <div id="options-container">
            <span>Select a course to update attendance or assign grades</span>
            <div className="options-box">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Update attendance
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            courses.map(courseName => (
                                <Dropdown.Item href="#">{courseName}</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="options-box">
                <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Assign grades
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {
                            courses.map(courseName => (
                                <Dropdown.Item href="#">{courseName}</Dropdown.Item>
                            ))
                        }
                        </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
