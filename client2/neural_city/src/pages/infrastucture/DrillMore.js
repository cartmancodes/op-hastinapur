import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WardTable from '../../Components/Tables/WardTable';
import InsightTable from '../../Components/Tables/InsightsTable';
function DrillMore() {
    const [alignment, setAlignment] = React.useState('ward');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <div className='px-5 py-3 w-full'>
            <div className='w-full mb-2 flex items-center justify-between'>
                <div>
                    <h1 className='text-xl font-semibold'>Granular Insights: Area, Edge, and Point Data</h1>
                </div>
            </div>
            <div className='mb-5'>
                <ToggleButtonGroup
                    size='small'
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="ward">Area-wise</ToggleButton>
                    <ToggleButton value="edge">Edge-wise</ToggleButton>
                    <ToggleButton value="point">Point-wise</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <InsightTable/>
        </div>
    )
}

export default DrillMore