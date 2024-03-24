import React from 'react';

const DataNotAvailable = () => {
    return (
        <div className="p-4 flex justify-center items-center bg-gray-100">
            <div>
                <h1 className="text-3xl font-bold mb-4">No Data Available</h1>
                <p className="text-gray-600">Sorry, there is no data available at the moment.</p>
            </div>
        </div>
    );
};

export default DataNotAvailable;
