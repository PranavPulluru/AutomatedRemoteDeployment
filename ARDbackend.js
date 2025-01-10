
        var map = L.map('map').setView([29.60002955947736, -95.62156366961919], 11);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
        var towerIcon = L.icon({
            iconUrl: './OperationalTower.png',
            iconSize:     [38, 38], // size of the icon
        });
        var sugarlandLatLng = L.latLng(29.60002955947736, -95.62156366961919);
        var sugarlandMarker = L.marker(sugarlandLatLng, {icon: towerIcon}).addTo(map); //Sugarland
        
        var richmondLatLng = L.latLng(29.590476553522176, -95.75957941040164);
        var RichmondMarker = L.marker(richmondLatLng, {icon: towerIcon}).addTo(map);
        
        var rosenbergLatLng = L.latLng(29.624505007149242, -95.55770564030195);
        var RosenbergMarker = L.marker(rosenbergLatLng, {icon: towerIcon}).addTo(map);

        var missouriLatLng = L.latLng(29.565395609608192, -95.8097045301883);
        var MissouriMarker = L.marker(missouriLatLng, {icon: towerIcon}).addTo(map);

        var fbLatLng = L.latLng(29.541671185304164, -95.44712814967775);
        var fbMarker = L.marker(fbLatLng, {icon: towerIcon}).addTo(map);

        var bellaireLatLng = L.latLng(29.606764600635785, -95.48374924403083);
        var bellaireMarker = L.marker(bellaireLatLng, {icon: towerIcon}).addTo(map);

        var fresnoLatLng = L.latLng(29.711111712155045, -95.464308642362);
        var fresnoMarker = L.marker(fresnoLatLng, {icon: towerIcon}).addTo(map);

        var barkerLatLng = L.latLng(29.75658875345844, -95.62414060509961);
        var barkerMarker = L.marker(barkerLatLng, {icon: towerIcon}).addTo(map);

        var latlngs = [
            
        ]
        


        var WarehouseIcon = L.icon({
            iconUrl: './Warehouse.png',
            iconSize:     [58, 58], // size of the icon
        });
        var warehouseMarker = L.marker([29.7837291181062, -95.95769877539799], {icon: WarehouseIcon}).addTo(map);


        // Function to calculate a new LatLng by moving a specific distance in the given direction
        function calculateNewLatLng(startLatLng, distance, bearing) {
            var lat = startLatLng.lat;
            var lng = startLatLng.lng;
    
            var R = 6371e3; // Earth's radius in meters
            var φ1 = lat * Math.PI / 180;
            var λ1 = lng * Math.PI / 180;
    
            // Convert bearing from degrees to radians
            var θ = bearing * Math.PI / 180;
    
            var φ2 = Math.asin(Math.sin(φ1) * Math.cos(distance / R) + Math.cos(φ1) * Math.sin(distance / R) * Math.cos(θ));
            var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(distance / R) * Math.cos(φ1), Math.cos(distance / R) - Math.sin(φ1) * Math.sin(φ2));
    
            // Convert back to degrees
            φ2 = φ2 * 180 / Math.PI;
            λ2 = λ2 * 180 / Math.PI;
    
            return L.latLng(φ2, λ2);
        }
        
        var damagedCellMarker;
        var stormMarker;

        // Script for adding storm video overlay and damaged cell tower marker on map where the user clicks
        // Clicking on the map creates a storm video overlay and if a tower exists in the vicinity, it will be marked
        // as damaged
        map.on('click', onMapClick);

        function onMapClick(e) {
            var geojsonFeature = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                        "type": "Point",
                        "coordinates": [e.latlng.lat, e.latlng.lng]
                }
            }

            const popupContent = `
                <form id="popupForm">
                    <label for="Cell Radius">Cell radius:</label>
                    <input type="number" id="input1" name="input1"><br><br>

                    <label for="input2">Terrestrial Config ID:</label>
                    <input type="number" id="input2" name="input2"><br><br>

                    <label for="input3">User Density per sqkm:</label>
                    <input type="number" id="input3" name="input3"><br><br>

                    <button type="button" id="submitBtn">Submit</button>
                </form>
            `;
            

            L.popup()
                .setLatLng(e.latlng)
                .setContent(popupContent)
                .openOn(map);

            // Add a click event listener to the button
            
            submitBtn.addEventListener("click", () => {
            // Get the values from the input fields
            const CellRadius = input1.value;
            const ConfigID = input2.value;
            const UserDensity = input3.value;
            

            // Log the values or use them as needed
            console.log("Cell Radius:", CellRadius);
            console.log("Input 2 Value:", ConfigID);
            console.log("User Density: ", UserDensity);
            
            map.closePopup();

            document.getElementById('submitBtn').addEventListener('click', () => {
                // Retrieve and convert input values to integers
                const cellRadius = parseInt(document.getElementById('cellRadius').value, 10);
                const terrestrialConfigId = parseInt(document.getElementById('terrestrialConfigId').value, 10);
                const userDensity = parseInt(document.getElementById('userDensity').value, 10);

                // Validate inputs to ensure they are integers
                if (isNaN(cellRadius) || isNaN(terrestrialConfigId) || isNaN(userDensity)) {
                    alert('Please enter valid integer values for all fields.');
                    return;
            }

                const uavsByCoverage = Math.ceil(cellRadius / droneMaxCoverage);
                const uavsByUserDensity = Math.ceil(userDensity / supported_UEs);
        
                // Find the larger number
                const requiredUAVs = Math.max(uavsByCoverage, uavsByUserDensity);
        
                // Display the result in a popup
                alert(`Number of required UAVs is ${requiredUAVs}`);

            });


            setTimeout(() => {
                L.polyline([[29.7837291181062, -95.95769877539799], e.latlng], {
                    color: 'blue',  // Line color
                    weight: 4,      // Line thickness
                    opacity: 0.7,   // Line opacity
                    dashArray: '5, 10' // Optional: Dashed line style
                }).addTo(map);
            }, 100);    
            
            setTimeout(() => {
                damagedCellMarker.remove();
                stormMarker.remove();
                var droneTower = L.icon({
                    iconUrl: './drone.jpeg',
                    iconSize:     [38, 38], // size of the icon
                });
                L.marker([e.latlng.lat, e.latlng.lng], {icon: droneTower}).addTo(map);
            }, 1900);






            });



            // Take the point clicked as starting point (Latitude, Longitude)
            // Calculate video bounds at a distance in meters for the movement
            var distance = 5000; // 5 km
            // Calculate new coordinates for Southwest (bearing = 225 degrees)
            var southwestLatLng = calculateNewLatLng(e.latlng, distance, 225);

            // Calculate new coordinates for Northeast (bearing = 45 degrees)
            var northeastLatLng = calculateNewLatLng(e.latlng, distance, 45);


            var videoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Complete_2021_Hurricane_Season_%28SVS4982_-_hurr2021_4K_cpc_1080p30_3%29.webm',
           // videoBounds = [[29.512265503972777, -95.70189598446174], [29.687148956532006, -95.59379304301338]];
            videoBounds = [[southwestLatLng.lat, southwestLatLng.lng], [northeastLatLng.lat, northeastLatLng.lng]];
            stormMarker = L.videoOverlay(videoUrl, videoBounds , {opacity: 0.7, autoplay: true, muted:true,  loop: true}).addTo(map);

            var selectedMarker = warehouseMarker;
            if(e.latlng.distanceTo(sugarlandLatLng)< 1000){
                selectedMarker = sugarlandMarker;
            }
            else if(e.latlng.distanceTo(richmondLatLng)< 1000){
                selectedMarker = RichmondMarker;
            }
            else if(e.latlng.distanceTo(rosenbergLatLng)< 1000){
                selectedMarker = RosenbergMarker;
            }
            else if(e.latlng.distanceTo(missouriLatLng)< 1000){
                selectedMarker = MissouriMarker;
            }
            else if(e.latlng.distanceTo(fbLatLng)< 1000){
                selectedMarker = fbMarker;
            }
            else if(e.latlng.distanceTo(bellaireLatLng)< 1000){
                selectedMarker = bellaireMarker;
            }
            else if(e.latlng.distanceTo(fresnoLatLng)< 1000){
                selectedMarker = fresnoMarker;
            }
            else if(e.latlng.distanceTo(barkerLatLng)< 1000){
                selectedMarker = barkerMarker;
            }
            if (selectedMarker != warehouseMarker)
            {
                selectedMarker.remove();
                var towerIcon2 = L.icon({
                    iconUrl: './DamagedCellTower.png',
                    iconSize:     [38, 38], // size of the icon
                });
                var damagedCellMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: towerIcon2}).addTo(map); //Sugarland
                //var sugarlandMarker2 = L.marker([29.60002955947736, -95.62156366961919], {icon: towerIcon2}).addTo(map); //Sugarland
                
        

                
        
            }
            





        }
 