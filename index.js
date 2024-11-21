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

  // Check if the "medias" section exists and contains valid media URLs
  if (data.medias && data.medias.length > 0) {
    const media = data.medias[0]; // Extract the first media
    const mediaURL = media.url; // Media URL
    const mediaType = media.type; // Media type (video or image)

    // Clear previous results
    document.getElementById("result").innerHTML = "";

    if (mediaType === "video") {
      // If it's a video, display the video tag
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
        .addEventListener("click", () => downloadMedia(mediaURL, "video"));
    } else if (mediaType === "image") {
      // If it's an image, display the image tag with a check for URL
      const imgTag = document.createElement("img");
      imgTag.id = "image-preview";
      imgTag.src = mediaURL;
      imgTag.alt = "Image from URL";
      imgTag.style.maxWidth = "100%"; // Add style to make the image responsive
      imgTag.style.height = "auto";

      document.getElementById("result").innerHTML = `
        <h3>Image Preview:</h3>
      `;
      document.getElementById("result").appendChild(imgTag);

      // Add download button for image
      document.getElementById("result").innerHTML += `
        <br>
        <button id="download-btn">Download Image</button>
      `;

      // Add functionality to download the image
      document
        .getElementById("download-btn")
        .addEventListener("click", () => downloadMedia(mediaURL, "image"));
    } else {
      document.getElementById("result").innerText = "Unsupported media type.";
    }
  } else {
    document.getElementById("result").innerText =
      "No media found in the response.";
  }
} catch (error) {
  console.error(error);
  document.getElementById("result").innerText = "Error fetching data.";
}

// Function to download media (video or image)
function downloadMedia(mediaURL, type) {
  const anchor = document.createElement("a");
  anchor.href = mediaURL;
  anchor.target = "_blank";

  // Set file name based on type (video or image)
  const fileName =
    type === "video" ? "downloaded_video.mp4" : "downloaded_image.jpg";
  anchor.download = fileName;

  // Trigger download
  anchor.click();
}

})
