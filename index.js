document.getElementById("search-btn").addEventListener("click", async () => {
  const userURL = document.getElementById("search-url").value;

  if (!userURL) {
    document.getElementById("result").innerText = "Please enter a valid URL.";
    return;
  }

  const url =
    "https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "d2c36d5db0mshb580f4a81f45ff8p1e64e2jsn5c16674ef5ed",
      "x-rapidapi-host": "social-download-all-in-one.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: userURL, // Dynamically set the user's URL
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse the response as JSON

    // Check if the "medias" section exists and contains a valid video URL
    if (data.medias && data.medias.length > 0) {
      const mediaURL = data.medias[0].url; // Extract the first video URL

      document.getElementById("result").innerHTML = `
        <h3>Video Preview:</h3>
        <video id="video-preview" controls>
          <source src="${mediaURL}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <br>
        <button id="download-btn">Download Video</button>
      `;

      // Add functionality to download the video
      document
        .getElementById("download-btn")
        .addEventListener("click", () => downloadVideo(mediaURL));
    } else {
      document.getElementById("result").innerText =
        "No video URL found in the response.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "Error fetching data.";
  }
});

// Function to download the video
function downloadVideo(videoURL) {
  const anchor = document.createElement("a");
  anchor.href = videoURL;
  anchor.target = "_blank";
  anchor.download = "downloaded_video.mp4"; // Default file name
  anchor.click();
}
