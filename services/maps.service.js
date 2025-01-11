const axios = require('axios')
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.POSITION_STACK_API;
    const url = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.data && response.data.data.length > 0) {
            const location = response.data.data[0];
            return {
                latitude: location.latitude,
                longitude: location.longitude
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination coordinates are required');
    }

    const apiKey = process.env.POSITION_STACK_API;

    try {
        // First, get coordinates for both origin and destination if they're addresses
        let originCoords = typeof origin === 'string' ? 
            await module.exports.getAddressCoordinate(origin) : origin;
        let destCoords = typeof destination === 'string' ? 
            await module.exports.getAddressCoordinate(destination) : destination;

        // Calculate distance using Haversine formula
        const R = 6371; // Earth's radius in km
        const dLat = toRad(destCoords.latitude - originCoords.latitude);
        const dLon = toRad(destCoords.longitude - originCoords.longitude);
        const lat1 = toRad(originCoords.latitude);
        const lat2 = toRad(destCoords.latitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        // Estimate time assuming average speed of 50 km/h
        const estimatedTime = (distance / 50) * 3600; // Convert to seconds

        return {
            distance: {
                text: `${distance.toFixed(2)} km`,
                value: Math.round(distance * 1000) // Convert to meters for consistency
            },
            duration: {
                text: formatDuration(estimatedTime),
                value: Math.round(estimatedTime)
            }
        };
    } catch (err) {
        console.error(err);
        throw new Error('Unable to calculate distance and time');
    }
}

// Helper function to convert degrees to radians
function toRad(degrees) {
    return degrees * Math.PI / 180;
}

// Helper function to format duration
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
    }
    return `${minutes} min`;
}


module.exports.getAutoCompleteSuggestions = async(input)=>{

}



module.exports.getCaptainsRadius = async(latitude,longitude,radius)=>{
    
}