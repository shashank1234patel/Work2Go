const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const location = document.getElementById("location").value;
    const skills = document.getElementById("skills").value;
    const jobType = document.getElementById("jobType").value;
    const availability = document.getElementById("availability").value;

    const { data, error } = await supabaseClient
        .from("profiles")
        .insert([
            {
                name: name,
                phone: phone,
                email: email,
                age: age,
                location: location,
                skills: skills,
                job_type: jobType,
                availability: availability
            }
        ]);

    if (error) {
        console.error(error);
        alert("Profile was not saved.");
    } else {
        alert("Profile saved successfully!");
        profileForm.reset();
    }
});