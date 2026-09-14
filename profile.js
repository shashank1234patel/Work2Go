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

    console.log("Sending profile to Supabase...");

    const { data, error } = await supabaseClient
        .from("profiles")
        .insert({
            name: name,
            phone: phone,
            email: email,
            age: Number(age),
            location: location,
            skills: skills,
            job_type: jobType,
            availability: availability
        })
        .select();

    if (error) {
        console.error("SUPABASE ERROR:", error);
        alert("Error: " + error.message);
        return;
    }

    console.log("Saved:", data);
    alert("✅ Profile saved successfully!");
});