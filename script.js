console.log("BloodConnect JavaScript is working!");

// ---------------- DONOR REGISTRATION ----------------

const donorForm = document.getElementById("donor-form");
const donorListContainer = document.getElementById("donor-list-container");

const donors = [];

let editingDonorId = null;


// ---------------- REGISTER / UPDATE DONOR ----------------

donorForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("donor-name").value.trim();
    const email = document.getElementById("donor-email").value.trim();
    const bloodGroup = document.getElementById("blood-group").value;
    const phone = document.getElementById("donor-phone").value.trim();
    const availability =
        document.getElementById("donor-availability").value;

    // Validate form

    if (
        name === "" ||
        email === "" ||
        bloodGroup === "" ||
        phone === "" ||
        availability === ""
    ) {
        alert("Please fill in all donor details.");
        return;
    }

    // Create donor object

    const donor = {
        name: name,
        email: email,
        blood_group: bloodGroup,
        phone: phone,
        availability: availability
    };

    try {

        let response;

        // ---------------- UPDATE EXISTING DONOR ----------------

        if (editingDonorId !== null) {

            response = await fetch(
                `http://127.0.0.1:5000/api/donors/${editingDonorId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(donor)
                }
            );

        }

        // ---------------- REGISTER NEW DONOR ----------------

        else {

            response = await fetch(
                "http://127.0.0.1:5000/api/donors",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(donor)
                }
            );
        }

        const result = await response.json();

        // ---------------- CHECK RESPONSE ----------------

        if (!response.ok) {

            alert(
                result.error ||
                "Failed to save donor."
            );

            return;
        }

        // ---------------- SUCCESS MESSAGE ----------------

        if (editingDonorId !== null) {

            alert("Donor updated successfully!");

            editingDonorId = null;

        } else {

            alert("Donor registered successfully!");
        }

        // Clear form

        donorForm.reset();

        // Reload donors from database

        loadDonors();

    } catch (error) {

        console.error(
            "Backend connection error:",
            error
        );

        alert(
            "Could not connect to the BloodConnect server."
        );
    }

});


// ---------------- DISPLAY DONORS ----------------

function displayDonors() {

    donorListContainer.innerHTML = "";

    if (donors.length === 0) {

        donorListContainer.innerHTML =
            '<p class="no-donors">No donors registered yet.</p>';

        return;
    }

    donors.forEach(function (donor, index) {

        const donorCard = document.createElement("div");

        donorCard.className = "donor-card";

        donorCard.innerHTML = `

            <div class="donor-info">

                <h3>${donor.name}</h3>

                <p>Email: ${donor.email}</p>

                <p>Phone: ${donor.phone}</p>

                <p>Availability: ${donor.availability}</p>

            </div>

            <div>

                <span class="blood-group-badge">
                    ${donor.bloodGroup}
                </span>

                <button
                    class="edit-button"
                    onclick="editDonor(${index})">
                    Edit
                </button>

                <button
                    class="remove-button"
                    onclick="removeDonor(${index})">
                    Remove
                </button>

            </div>

        `;

        donorListContainer.appendChild(donorCard);
    });
}


// ---------------- EDIT DONOR ----------------

function editDonor(index) {

    const donor = donors[index];

    if (!donor) {
        return;
    }

    // Store database ID

    editingDonorId = donor.id;

    // Put donor information into form

    document.getElementById("donor-name").value =
        donor.name;

    document.getElementById("donor-email").value =
        donor.email;

    document.getElementById("blood-group").value =
        donor.bloodGroup;

    document.getElementById("donor-phone").value =
        donor.phone;

    document.getElementById("donor-availability").value =
        donor.availability;

    // Scroll to registration form

    window.scrollTo({
        top: document.getElementById("donate").offsetTop,
        behavior: "smooth"
    });
}


// ---------------- REMOVE DONOR ----------------

async function removeDonor(index) {

    const donor = donors[index];

    if (!donor) {
        return;
    }

    const confirmed = confirm(
        `Remove ${donor.name} from the donor list?`
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/api/donors/${donor.id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {

            alert(
                result.error ||
                "Failed to remove donor."
            );

            return;
        }

        alert("Donor removed successfully.");

        // Reload donor list from database

        loadDonors();

    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Could not connect to the BloodConnect server."
        );
    }
}


// ---------------- LOAD DONORS ----------------

async function loadDonors() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/donors"
        );

        const donorData = await response.json();

        // Clear current array

        donors.length = 0;

        // Add database records to array

        donorData.forEach(function (donor) {

            donors.push({

                id: donor.id,

                name: donor.name,

                email: donor.email,

                bloodGroup: donor.blood_group,

                phone: donor.phone,

                availability: donor.availability

            });

        });

        // Display updated donors

        displayDonors();

    } catch (error) {

        console.error(
            "Could not load donors:",
            error
        );
    }
}


// ---------------- INITIAL LOAD ----------------

loadDonors();