import React, { useState } from 'react'
import Stream from './Stream'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import UnverifiedChallans from './UnverifiedChallans';
import ArchieveChallan from './ArchieveChallan';
function Traffic() {
    const [alignment, setAlignment] = useState("all");
    return (
        <div className='flex flex-col sm:p-2 w-full h-[100vh] space-y-2 sm:space-y-0'>
            <div className='flex items-center'>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    aria-label="Platform"
                >
                    <ToggleButton value="streaming" disabled onClick={() => setAlignment("streaming")}>Streaming</ToggleButton>
                    <ToggleButton value="all" onClick={() => setAlignment("Unverified")}>All Challans</ToggleButton>
                    <ToggleButton value="archives" onClick={() => setAlignment("archives")}>Archieves</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {alignment === 'streaming' ? <Stream></Stream> :
                alignment === 'Unverified' ? <UnverifiedChallans></UnverifiedChallans> :
                    <ArchieveChallan></ArchieveChallan>
            }
        </div>

    )
}

export default Traffic