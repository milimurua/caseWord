async function loadProfileData() {
    try {
        const response = await fetch('../registro/thing.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let email = document.cookie.split("=")[1];
        console.log(email);
        
        const data = await response.json();
        
        console.log('Fetched Data:', data);
        
        let profileData;
        
        for(let i = 0; i <= data.length; i++) {
            if (data[i].email === email) {
                profileData = data[i];
                i = data.length;
            }
        }

        if (profileData.dni) {
            document.getElementById('dni').placeholder = profileData.dni;
        } else {
            console.warn('DNI not found in data');
        }

        if (profileData.email) {
            document.getElementById('email').placeholder = profileData.email;
        } else {
            console.warn('Email not found in data');
        }

        if (profileData.phone) {
            document.getElementById('mobile').placeholder = profileData.phone;
        } else {
            console.warn('Phone not found in data');
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

window.onload = loadProfileData;